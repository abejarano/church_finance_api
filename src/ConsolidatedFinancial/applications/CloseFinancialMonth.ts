import { IQueue } from "../../Shared/domain"
import {
  IFinancialYearRepository,
  UpdateFinancialMonthRequest,
} from "../domain"

export class CloseFinancialMonth implements IQueue {
  constructor(
    private readonly financialYearRepository: IFinancialYearRepository
  ) {}

  async handle(args: UpdateFinancialMonthRequest): Promise<void> {
    const financialMonth = await this.financialYearRepository.findById(
      args.financialMonthId
    )

    if (!financialMonth) {
      throw new Error("Financial month not found")
    }

    if (args.closed) {
      financialMonth.close()
    } else {
      financialMonth.open()
    }

    await this.financialYearRepository.upsertFinancialMonth(financialMonth)
  }
}
