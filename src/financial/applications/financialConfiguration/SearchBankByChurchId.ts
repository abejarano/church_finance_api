import { Bank, IFinancialConfigurationRepository } from "../../domain";

export class SearchBankByChurchId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(churchId: string): Promise<Bank[]> {
    return this.financialConfigurationRepository.searchBanksByChurchId(
      churchId,
    );
  }
}
