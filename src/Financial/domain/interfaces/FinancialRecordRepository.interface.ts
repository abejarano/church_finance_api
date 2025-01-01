import { FinancialRecord } from "../FinancialRecord";

export interface IFinancialRecordRepository {
  upsert(financialRecord: FinancialRecord): Promise<void>;
}
