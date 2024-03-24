import {
  BankNotFound,
  CostCenter,
  CostCenterNotFound,
  CostCenterRequest,
  IFinancialConfigurationRepository,
} from "../../domain";

export class CreateOrUpdateCostCenter {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(costCenterRequest: CostCenterRequest) {
    if (!costCenterRequest.costCenterId) {
      await this.create(costCenterRequest);
      return;
    }

    const costCenter =
      await this.financialConfigurationRepository.findCostCenterByCostCenterId(
        costCenterRequest.costCenterId,
      );

    if (!costCenter) {
      throw new CostCenterNotFound();
    }

    if (costCenterRequest.active) {
      costCenter.enable();
    } else {
      costCenter.disable();
    }

    const bank = await this.findBankById(costCenterRequest.bankId);

    costCenter.setName(costCenterRequest.name);
    costCenter.setBank(bank);

    await this.financialConfigurationRepository.upsertCostCenter(costCenter);
  }

  private async findBankById(bankId: string) {
    const bank =
      await this.financialConfigurationRepository.findBankByBankId(bankId);
    if (!bank) {
      throw new BankNotFound();
    }
    return bank;
  }

  private async create(costCenterRequest: CostCenterRequest) {
    const bank = await this.findBankById(costCenterRequest.bankId);

    const costCenter = CostCenter.create(
      costCenterRequest.active,
      costCenterRequest.name,
      bank,
    );

    await this.financialConfigurationRepository.upsertCostCenter(costCenter);
  }
}
