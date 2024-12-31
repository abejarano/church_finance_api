import { IFinancialConfigurationRepository } from "../../domain";

export class ListBank {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  //async execute(): Promise<Bank[]> {}
}
