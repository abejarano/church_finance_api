import { DebtorType } from "../enums/DebtorType.enum"
import { Installments } from "@/Shared/domain"
import { AccountReceivableType } from "@/AccountsReceivable/domain"

export interface ICreateAccountReceivable {
  debtor: {
    debtorType: DebtorType
    debtorDNI?: string
    name: string
    phone: string
    email: string
    address: string
  }
  accountReceivableId?: string
  churchId: string
  description: string
  amountTotal: number
  amountPaid?: number
  amountPending?: number
  installments?: Installments[]
  type: AccountReceivableType
}
