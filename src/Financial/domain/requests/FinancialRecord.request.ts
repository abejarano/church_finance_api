import { TypeBankingOperation } from '../../../MovementBank/domain'

export type FinancialRecordQueueRequest = {
  financialConceptId: string
  churchId: string
  amount: number
  date: Date
  availabilityAccountId: string
  voucher?: string
  description?: string
}

export type FinancialRecordRequest = {
  bankId: string
  file?: any
  bankingOperation?: TypeBankingOperation
  costCenterId?: string
} & FinancialRecordQueueRequest
