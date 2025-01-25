import { IFinancialYearRepository } from "../../../ConsolidatedFinancial/domain"
import { IQueue } from "../../../Shared/domain"
import { FinanceRecord } from "../../domain/FinanceRecord"
import { FinancialMonthValidator } from "../../../ConsolidatedFinancial/FinancialMonthValidator"
import {
  IAvailabilityAccountRepository,
  IFinancialConfigurationRepository,
  IFinancialRecordRepository,
} from "../../domain/interfaces"
import {
  AvailabilityAccountNotFound,
  CostCenter,
  FinancialConcept,
  FinancialRecordQueueRequest,
} from "../../domain"
import { FindFinancialConceptByChurchIdAndFinancialConceptId } from "../financialConfiguration/finders/FindFinancialConceptByChurchIdAndFinancialConceptId"
import { logger } from "../../../Shared/infrastructure"

export class RegisterFinancialRecord implements IQueue {
  constructor(
    private readonly financialYearRepository: IFinancialYearRepository,
    private readonly financialRecordRepository: IFinancialRecordRepository,
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly availabilityAccountRepository: IAvailabilityAccountRepository
  ) {}

  async handle(
    args: FinancialRecordQueueRequest,
    financialConcept?: FinancialConcept,
    costCenter?: CostCenter
  ): Promise<void> {
    logger.info(`RegisterFinancialRecord`, args)

    await new FinancialMonthValidator(this.financialYearRepository).validate(
      args.churchId
    )

    const availabilityAccount =
      await this.availabilityAccountRepository.findAvailabilityAccountByAvailabilityAccountId(
        args.availabilityAccountId
      )

    if (!availabilityAccount) {
      throw new AvailabilityAccountNotFound()
    }

    if (!financialConcept) {
      logger.info(
        `Searching financial concept by churchId: ${args.churchId} and financialConceptId: ${args.financialConceptId}`
      )
      financialConcept =
        await new FindFinancialConceptByChurchIdAndFinancialConceptId(
          this.financialConfigurationRepository
        ).execute(args.churchId, args.financialConceptId)
    }

    const financialRecord = FinanceRecord.create({
      financialConcept: FinancialConcept.fromPrimitives(
        financialConcept,
        args.churchId
      ),
      churchId: args.churchId,
      amount: args.amount,
      date: new Date(args.date),
      availabilityAccount,
      description: args.description,
      voucher: args.voucher,
      costCenter,
    })

    await this.financialRecordRepository.upsert(financialRecord)
  }
}
