import { FinanceRecord } from "../FinanceRecord";
import { Criteria, Paginate } from "../../../Shared/domain";
import { IFinanceRecordDTO } from "./FinanceRecordDTO.interface";

export interface IFinancialRecordRepository {
  upsert(financialRecord: FinanceRecord): Promise<void>;

  list(criteria: Criteria): Promise<Paginate<IFinanceRecordDTO>>;
}
