import {
  BankNotFound,
  IFinancialConfigurationRepository,
} from "../../../domain";

export class FinBankByBankId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(bankId: string) {
    const bank =
      await this.financialConfigurationRepository.findBankByBankId(bankId);

    if (!bank) throw new BankNotFound();

    return bank;
  }
}
