import { IFinancialRecordRepository } from "../Financial/domain/interfaces"
import { IChurchRepository } from "../Church/domain"
import { FindChurchById } from "../Church/applications"
import { MonthlyTithesRequest } from "./requests"
import { Logger } from "../Shared/adapter"

export class MonthlyTithes {
  private logger = Logger("MonthlyTithes")

  constructor(
    private readonly financialRecordRepository: IFinancialRecordRepository,
    private readonly churchRepository: IChurchRepository
  ) {}

  async execute(params: MonthlyTithesRequest) {
    this.logger.info(`MonthlyTithes Report`, params)

    await new FindChurchById(this.churchRepository).execute(params.churchId)

    return await this.financialRecordRepository.titheList(params)
  }
}
