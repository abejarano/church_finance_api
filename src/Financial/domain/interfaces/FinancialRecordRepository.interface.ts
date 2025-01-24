import { FinanceRecord } from '../FinanceRecord'
import { Criteria, Paginate } from '../../../Shared/domain'

export interface IFinancialRecordRepository {
  upsert(financialRecord: FinanceRecord): Promise<void>

  list(criteria: Criteria): Promise<Paginate<FinanceRecord>>
}
