import { GenericException, HttpStatus } from "@/Shared/domain"
import domainResponse from "@/Shared/helpers/domainResponse"
import {
  AccountType,
  ConceptType,
  CostCenter,
  FinancialConcept,
  FinancialRecordQueueRequest,
  FinancialRecordRequest,
  FinancialRecordSource,
  FinancialRecordStatus,
  FinancialRecordType,
} from "../../../domain"
import {
  CancelFinancialRecord,
  FindAvailabilityAccountByAvailabilityAccountId,
  FindCostCenterByCostCenterId,
  FindFinancialConceptByChurchIdAndFinancialConceptId,
} from "@/Financial/applications"
import { QueueService, StorageGCP } from "@/Shared/infrastructure"
import { FinancialYearMongoRepository } from "@/ConsolidatedFinancial/infrastructure"
import {
  AvailabilityAccountMongoRepository,
  FinanceRecordMongoRepository,
  FinancialConceptMongoRepository,
  FinancialConfigurationMongoRepository,
} from "../../persistence"
import { Response } from "express"
import { FinancialRecordCreate } from "@/Financial/applications/financeRecord/FinancialRecordCreate"
import { toFinancialRecordType } from "@/Financial/domain/mappers"

export const FinancialRecordController = async (
  request: FinancialRecordRequest & { createdBy: string },
  res: Response
) => {
  try {
    const financialConcept =
      await new FindFinancialConceptByChurchIdAndFinancialConceptId(
        FinancialConceptMongoRepository.getInstance()
      ).execute(request.churchId, request.financialConceptId)

    const availabilityAccount = await searchAvailabilityAccount(
      request,
      financialConcept
    )

    let costCenter: CostCenter = undefined

    if (
      financialConcept.getType() === ConceptType.DISCHARGE &&
      !request.costCenterId
    ) {
      res.status(HttpStatus.BAD_REQUEST).send({
        costCenterId: {
          message: "Deve selecionar um centro de custos.",
          rule: "required",
        },
      })
      return
    }
    if (
      financialConcept.getType() === ConceptType.DISCHARGE &&
      request.costCenterId
    ) {
      costCenter = await new FindCostCenterByCostCenterId(
        FinancialConfigurationMongoRepository.getInstance()
      ).execute(request.churchId, request.costCenterId)
    }

    let financialRecordType = FinancialRecordType.INCOME

    financialRecordType = toFinancialRecordType(financialConcept.getType())

    await new FinancialRecordCreate(
      FinancialYearMongoRepository.getInstance(),
      FinanceRecordMongoRepository.getInstance(),
      StorageGCP.getInstance(process.env.BUCKET_FILES),
      QueueService.getInstance()
    ).handle({
      ...request,
      costCenter,
      financialConcept,
      financialRecordType,
      availabilityAccount,
      status: FinancialRecordStatus.CLEARED,
      source: FinancialRecordSource.MANUAL,
    } as FinancialRecordQueueRequest)

    res.status(HttpStatus.CREATED).send({
      message: "successful financial record registration",
    })
  } catch (e) {
    if (request.voucher) {
      await StorageGCP.getInstance(process.env.BUCKET_FILES).deleteFile(
        request.voucher
      )
    }

    return domainResponse(e, res)
  }
}

const searchAvailabilityAccount = async (
  request: FinancialRecordRequest,
  financialConcept: FinancialConcept
) => {
  const account = await new FindAvailabilityAccountByAvailabilityAccountId(
    AvailabilityAccountMongoRepository.getInstance()
  ).execute(request.availabilityAccountId)

  if (account.getType() === AccountType.INVESTMENT) {
    throw new GenericException(
      `Selected availability account does not allow this ${financialConcept.getName()}`
    )
  }

  return account
}

export const CancelFinancialRecordController = async (
  req: { financialRecordId: string; churchId: string; createdBy: string },
  res: Response
) => {
  try {
    await new CancelFinancialRecord(
      FinancialYearMongoRepository.getInstance(),
      FinanceRecordMongoRepository.getInstance(),
      AvailabilityAccountMongoRepository.getInstance(),
      QueueService.getInstance()
    ).execute(req)

    res.status(HttpStatus.OK).send({
      message: "successful financial record cancellation",
    })
  } catch (e) {
    domainResponse(e, res)
  }
}
