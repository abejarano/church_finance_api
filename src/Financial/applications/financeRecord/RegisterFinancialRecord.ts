import { IFinancialYearRepository } from "../../../ConsolidatedFinancial/domain";
import { IQueue } from "../../../Shared/domain";
import { FinanceRecord } from "../../domain/FinanceRecord";
import { FinancialMonthValidator } from "../../../ConsolidatedFinancial/FinancialMonthValidator";
import {
  IFinancialConfigurationRepository,
  IFinancialRecordRepository,
} from "../../domain/interfaces";
import {
  AvailabilityAccountNotFound,
  FinancialConcept,
  FinancialRecordQueueRequest,
} from "../../domain";
import { FindFinancialConceptByChurchIdAndFinancialConceptId } from "../financialConfiguration/finders/FindFinancialConceptByChurchIdAndFinancialConceptId";
import { logger } from "../../../Shared/infrastructure";

export class RegisterFinancialRecord implements IQueue {
  constructor(
    private readonly financialYearRepository: IFinancialYearRepository,
    private readonly financialRecordRepository: IFinancialRecordRepository,
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async handle(
    args: FinancialRecordQueueRequest,
    financialConcept?: FinancialConcept,
  ): Promise<void> {
    logger.info(`RegisterFinancialRecord`, args);

    await new FinancialMonthValidator(this.financialYearRepository).validate(
      args.churchId,
    );

    const availabilityAccount =
      await this.financialConfigurationRepository.findAvailabilityAccountByAvailabilityAccountId(
        args.availabilityAccountId,
      );

    if (!availabilityAccount) {
      throw new AvailabilityAccountNotFound();
    }

    if (!financialConcept) {
      financialConcept =
        await new FindFinancialConceptByChurchIdAndFinancialConceptId(
          this.financialConfigurationRepository,
        ).execute(args.churchId, args.financialConceptId);
    }

    const financialRecord = FinanceRecord.create(
      FinancialConcept.fromPrimitives(financialConcept, args.churchId),
      args.churchId,
      args.amount,
      new Date(args.date),
      availabilityAccount,
      args.description,
      args.voucher,
    );

    await this.financialRecordRepository.upsert(financialRecord);
  }
}
