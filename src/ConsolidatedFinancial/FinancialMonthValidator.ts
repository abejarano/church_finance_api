import { IFinancialYearRepository } from "./domain"
import { FinancialMonthIsClosed } from "./domain/exceptions"

import { Logger } from "../Shared/adapter"

export class FinancialMonthValidator {
  private logger = Logger("FinancialMonthValidator")

  constructor(
    private readonly financialYearRepository: IFinancialYearRepository
  ) {}

  async validate(churchId: string) {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    return

    const financialMonth =
      await this.financialYearRepository.findByMonthAndYear(
        currentMonth,
        currentYear,
        churchId
      )

    if (!financialMonth) {
      this.logger.info(`Financial month not found`, financialMonth)
      throw new Error("Financial month not found")
    }

    if (financialMonth.isClosed()) {
      throw new FinancialMonthIsClosed()
    }
  }
}
