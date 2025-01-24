import { logger } from "../../../../Shared/infrastructure"
import { IFinancialConfigurationRepository } from "../../../domain/interfaces"
import { GenericException } from "../../../../Shared/domain"

export class FindFinancialConceptByChurchIdAndFinancialConceptId {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository
  ) {}

  async execute(churchId: string, financialConceptId: string) {
    const financialConcept =
      await this.financialConfigurationRepository.findFinancialConceptByChurchIdAndFinancialConceptId(
        churchId,
        financialConceptId
      )

    if (!financialConcept) {
      logger.error(`Financial concept not found`)
      throw new GenericException("Financial concept not found")
    }

    return financialConcept
  }
}
