import { IFinancialYearRepository } from "../../ConsolidatedFinancial/domain";
import { IQueue } from "../../Shared/domain";
import { FinancialRecord } from "../domain/FinancialRecord";
import { FinancialMonthValidator } from "../../ConsolidatedFinancial/FinancialMonthValidator";
import {
  IFinancialConfigurationRepository,
  IFinancialRecordRepository,
} from "../domain/interfaces";
import { FinancialConcept, FinancialRecordQueueRequest } from "../domain";
import { FindFinancialConceptByChurchIdAndFinancialConceptId } from "./financialConfiguration/finders/FindFinancialConceptByChurchIdAndFinancialConceptId";
import { logger } from "../../Shared/infrastructure";

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

    if (!financialConcept) {
      financialConcept =
        await new FindFinancialConceptByChurchIdAndFinancialConceptId(
          this.financialConfigurationRepository,
        ).execute(args.churchId, args.financialConceptId);
    }

    const financialRecord = FinancialRecord.create(
      FinancialConcept.fromPrimitives(financialConcept, args.churchId),
      args.churchId,
      args.amount,
      new Date(args.date),
      args.moneyLocation,
      args.voucher,
    );

    await this.financialRecordRepository.upsert(financialRecord);
  }
}
