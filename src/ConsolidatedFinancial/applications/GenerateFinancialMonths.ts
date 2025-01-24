import { FinancialMonth, IFinancialYearRepository } from '../domain'

export class GenerateFinancialMonths {
  constructor(
    private readonly financialYearRepository: IFinancialYearRepository,
  ) {}

  async execute(args: { churchId: string; year: number }): Promise<void> {
    for (let i = 1; i <= 12; i++) {
      const financialMonth = FinancialMonth.create(args.churchId, i, args.year)
      await this.financialYearRepository.upsertFinancialMonth(financialMonth)
    }
  }
}
