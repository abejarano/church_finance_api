import { CostCenter, IFinancialConfigurationRepository } from "../../../domain";

export class FindCostCenterByChurchId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(churchId: string): Promise<CostCenter[]> {
    return await this.financialConfigurationRepository.searchCenterCostsByChurchId(
      churchId,
    );
  }
}
