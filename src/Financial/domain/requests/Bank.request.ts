import { TypeBankAccount } from '../enums/TypeBankAccount.enum'

export type BankRequest = {
  bankId?: string
  accountType: TypeBankAccount
  active: boolean
  name: string
  tag: string
  addressInstancePayment: string
  bankInstruction: any
  churchId: string
}
