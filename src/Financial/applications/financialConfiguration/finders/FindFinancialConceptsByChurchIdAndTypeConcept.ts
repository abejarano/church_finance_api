import { ConceptType } from "../../../domain";
import { ChurchNotFound, IChurchRepository } from "../../../../Church/domain";
import { IFinancialConfigurationRepository } from "../../../domain/interfaces";

export class FindFinancialConceptsByChurchIdAndTypeConcept {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(churchId: string, typeConcept?: ConceptType) {
    const church = await this.churchRepository.findById(churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    if (typeConcept) {
      return await this.financialConfigurationRepository.findFinancialConceptsByChurchIdAndTypeConcept(
        churchId,
        typeConcept,
      );
    }
    return await this.financialConfigurationRepository.findFinancialConceptsByChurchId(
      churchId,
    );
  }
}
