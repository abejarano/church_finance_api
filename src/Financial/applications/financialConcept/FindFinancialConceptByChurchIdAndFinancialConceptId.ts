import { logger } from "../../../Shared/infrastructure"
import { IFinancialConceptRepository } from "../../domain/interfaces"
import { GenericException } from "../../../Shared/domain"

export class FindFinancialConceptByChurchIdAndFinancialConceptId {
  constructor(
    private readonly financialConceptRepository: IFinancialConceptRepository
  ) {}

  async execute(churchId: string, financialConceptId: string) {
    const financialConcept =
      await this.financialConceptRepository.findFinancialConceptByChurchIdAndFinancialConceptId(
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
