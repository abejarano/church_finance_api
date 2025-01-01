import { FinancialMonth } from "../FinancialMonth";

export interface IFinancialYearRepository {
  upsertFinancialMonth(financialYear: FinancialMonth): Promise<void>;

  findById(financialMonthId: string): Promise<FinancialMonth | undefined>;

  findByMonthAndYear(
    month: number,
    year: number,
    churchId: string,
  ): Promise<FinancialMonth | undefined>;
}
