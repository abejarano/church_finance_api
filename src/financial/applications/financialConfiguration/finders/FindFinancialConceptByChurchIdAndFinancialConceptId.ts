import { IFinancialConfigurationRepository } from "../../../domain";
import { logger } from "../../../../shared/infrastructure";

export class FindFinancialConceptByChurchIdAndFinancialConceptId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async execute(churchId: string, financialConceptId: string) {
    const financialConcept =
      await this.financialConfigurationRepository.findFinancialConceptByChurchIdAndFinancialConceptId(
        churchId,
        financialConceptId,
      );

    if (!financialConcept) {
      logger.error(`Financial concept not found`);
      throw new Error("Financial concept not found");
    }

    logger.info(`Financial concept found`);

    return financialConcept;
  }
}
