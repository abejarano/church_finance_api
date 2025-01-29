import { FinanceRecord } from "../FinanceRecord"
import { Criteria, Paginate } from "../../../Shared/domain"
import { MonthlyTithesRequest } from "../../../Reports/requests"

export interface IFinancialRecordRepository {
  upsert(financialRecord: FinanceRecord): Promise<void>

  fetch(criteria: Criteria): Promise<Paginate<FinanceRecord>>

  titheList(
    filter: MonthlyTithesRequest
  ): Promise<{ total: number; tithesOfTithes: number; records: any[] }>
}
