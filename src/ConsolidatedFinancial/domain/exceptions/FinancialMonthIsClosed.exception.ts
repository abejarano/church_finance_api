import { DomainException } from '../../../Shared/domain'

export class FinancialMonthIsClosed extends DomainException {
  name = 'FINANCIAL_MONTH_CLOSED'
  message = 'The financial month is closed'
}
