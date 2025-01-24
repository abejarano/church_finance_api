import {
  GenericException,
  HttpStatus,
  QueueName,
} from "../../../../Shared/domain"
import domainResponse from "../../../../Shared/helpers/domainResponse"
import {
  AccountType,
  ConceptType,
  CostCenter,
  FinancialConcept,
  FinancialRecordRequest,
} from "../../../domain"
import { RegisterFinancialRecord } from "../../../applications/financeRecord/RegisterFinancialRecord"
import { QueueBullService, StorageGCP } from "../../../../Shared/infrastructure"
import { FinancialYearMongoRepository } from "../../../../ConsolidatedFinancial/infrastructure"
import {
  AvailabilityAccountMongoRepository,
  FinanceRecordMongoRepository,
  FinancialConfigurationMongoRepository,
} from "../../persistence"
import {
  MovementBankRequest,
  TypeBankingOperation,
} from "../../../../MovementBank/domain"
import {
  FindAvailabilityAccountByAvailabilityAccountId,
  FindCostCenterByCostCenterId,
  FindFinancialConceptByChurchIdAndFinancialConceptId,
} from "../../../applications"
import { Response } from "express"

export const FinancialRecordController = async (
  request: FinancialRecordRequest,
  res: Response
) => {
  try {
    if (request.file) {
      request.voucher = await StorageGCP.getInstance(
        process.env.BUCKET_FILES
      ).uploadFile(request.file)
    }

    const availabilityAccount = await searchAvailabilityAccount(request)

    let costCenter: CostCenter = undefined

    const financialConcept = await searchFinancialConcept(request)

    if (
      financialConcept.getType() === ConceptType.DISCHARGE &&
      request.costCenterId
    ) {
      costCenter = await new FindCostCenterByCostCenterId(
        FinancialConfigurationMongoRepository.getInstance()
      ).execute(request.churchId, request.costCenterId)
    }

    await new RegisterFinancialRecord(
      FinancialYearMongoRepository.getInstance(),
      FinanceRecordMongoRepository.getInstance(),
      FinancialConfigurationMongoRepository.getInstance(),
      AvailabilityAccountMongoRepository.getInstance()
    ).handle(request, financialConcept, costCenter)

    if (availabilityAccount.getType() === AccountType.BANK) {
      await recordMovementBank(request, financialConcept)
    }

    if (costCenter) {
      QueueBullService.getInstance().dispatch(
        QueueName.UpdateCostCenterMaster,
        {
          churchId: request.churchId,
          amount: request.amount,
          costCenterId: costCenter.getCostCenterId(),
        }
      )
    }

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

const searchAvailabilityAccount = async (request: FinancialRecordRequest) => {
  const availabilityAccount =
    await new FindAvailabilityAccountByAvailabilityAccountId(
      AvailabilityAccountMongoRepository.getInstance()
    ).execute(request.availabilityAccountId)

  if (availabilityAccount.getType() === AccountType.BANK) {
    if (!request.bankId) {
      throw new GenericException("The bank id field is mandatory.")
    }
  }

  return availabilityAccount
}

const searchFinancialConcept = async (request: FinancialRecordRequest) => {
  const financialConcept =
    await new FindFinancialConceptByChurchIdAndFinancialConceptId(
      FinancialConfigurationMongoRepository.getInstance()
    ).execute(request.churchId, request.financialConceptId)

  if (
    financialConcept.getType() === ConceptType.DISCHARGE &&
    request.costCenterId === undefined
  ) {
    throw new GenericException("The cost center field is mandatory.")
  }

  return financialConcept
}

const recordMovementBank = async (
  request: FinancialRecordRequest,
  financialConcept: FinancialConcept
) => {
  const movementBank: MovementBankRequest = {
    amount: request.amount,
    bankingOperation: TypeBankingOperation.DEPOSIT,
    concept: financialConcept.getName(),
    bankId: request.bankId,
  }

  QueueBullService.getInstance().dispatch(
    QueueName.MovementBankRecord,
    movementBank
  )

  QueueBullService.getInstance().dispatch(
    QueueName.UpdateAvailabilityAccountBalance,
    {
      availabilityAccountId: request.availabilityAccountId,
      amount: request.amount,
      operationType:
        financialConcept.getType() === ConceptType.INCOME
          ? "MONEY_IN"
          : "MONEY_OUT",
    }
  )
}
