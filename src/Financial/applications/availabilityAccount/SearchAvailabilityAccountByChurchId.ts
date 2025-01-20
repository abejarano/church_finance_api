import { IFinancialConfigurationRepository } from "../../domain/interfaces";
import { AvailabilityAccount } from "../../domain";

export class SearchAvailabilityAccountByChurchId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(churchId: string): Promise<AvailabilityAccount[]> {
    return this.financialConfigurationRepository.searchAvailabilityAccountsByChurchId(
      churchId,
    );
  }
}
