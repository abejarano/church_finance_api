import { IFinanceRecordDTO, MoneyLocation } from "../../../domain"
import { Expose, Type } from "class-transformer"

class FinancialConceptDTO {
  @Expose()
  financialConceptId: string

  @Expose()
  name: string
}

export class FinanceRecordDTO implements IFinanceRecordDTO {
  @Expose()
  amount: number

  @Expose()
  date: string

  @Expose()
  @Type(() => FinancialConceptDTO)
  financialConcept: FinancialConceptDTO

  @Expose()
  financialRecordId: string

  @Expose()
  moneyLocation: MoneyLocation
}
