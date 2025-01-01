import { IFinancialYearRepository } from "../../ConsolidatedFinancial/domain";
import { IQueue } from "../../Shared/domain";
import { FinancialRecord } from "../domain/FinancialRecord";
import { FinancialMonthValidator } from "../../ConsolidatedFinancial/FinancialMonthValidator";
import { IFinancialRecordRepository } from "../domain/interfaces";
import { FinancialRecordRequest } from "../domain/requests/FinancialRecord.request";
import { FinancialConcept } from "../domain";

export class RegisterFinancialRecord implements IQueue {
  constructor(
    private readonly financialYearRepository: IFinancialYearRepository,
    private readonly financialRecordRepository: IFinancialRecordRepository,
  ) {}

  async handle(args: FinancialRecordRequest): Promise<void> {
    await new FinancialMonthValidator(this.financialYearRepository).validate(
      args.churchId,
    );
    const financialRecord = FinancialRecord.create(
      FinancialConcept.fromPrimitives(args.financialConcept, args.churchId),
      args.churchId,
      args.amount,
      args.date,
      args.moneyLocation,
      args.voucher,
    );

    await this.financialRecordRepository.upsert(financialRecord);
  }
}
