import { MoneyLocation } from "../enums/MoneyLocation.enum"

export interface IFinanceRecordDTO {
  amount: number
  date: string
  financialConcept: {
    financialConceptId: string
    name: string
  }
  financialRecordId: string

  moneyLocation: MoneyLocation
}
