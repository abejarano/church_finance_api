import {
  CostCenter,
  CostCenterNotFound,
  IFinancialConfigurationRepository,
} from "../../domain";

export class FindCostCenterByCostCenterId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(costCenterId: string): Promise<CostCenter> {
    const costCenter =
      await this.financialConfigurationRepository.findCostCenterByCostCenterId(
        costCenterId,
      );
    if (!costCenter) {
      throw new CostCenterNotFound();
    }

    return costCenter;
  }
}
