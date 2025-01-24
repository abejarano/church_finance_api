import { CostCenter } from '../../domain'
import { IFinancialConfigurationRepository } from '../../domain/interfaces'

export class SearchCostCenterByChurchId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(churchId: string): Promise<CostCenter[]> {
    return await this.financialConfigurationRepository.searchCenterCostsByChurchId(
      churchId,
    )
  }
}
