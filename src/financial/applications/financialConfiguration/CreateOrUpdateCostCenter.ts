import {
  BankNotFound,
  CostCenter,
  IFinancialConfigurationRepository,
} from "../../domain";
import { CostCenterRequest } from "../../infrastructure/http/requests/CostCenter.request";

export class CreateOrUpdateCostCenter {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(costCenter: CostCenterRequest) {
    if (!costCenter.costCenterId) {
      await this.create(costCenter);
      return;
    }
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
  }
}
