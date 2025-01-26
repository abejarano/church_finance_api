import { ConceptType } from "../../domain"
import { ChurchNotFound, IChurchRepository } from "../../../Church/domain"
import { IFinancialConceptRepository } from "../../domain/interfaces"

export class FindFinancialConceptsByChurchIdAndTypeConcept {
  constructor(
    private readonly financialConceptRepository: IFinancialConceptRepository,
    private readonly churchRepository: IChurchRepository
  ) {}

  async execute(churchId: string, typeConcept?: ConceptType) {
    const church = await this.churchRepository.one(churchId)
    if (!church) {
      throw new ChurchNotFound()
    }

    if (typeConcept) {
      return await this.financialConceptRepository.findFinancialConceptsByChurchIdAndTypeConcept(
        churchId,
        typeConcept
      )
    }
    return await this.financialConceptRepository.findFinancialConceptsByChurchId(
      churchId
    )
  }
}
