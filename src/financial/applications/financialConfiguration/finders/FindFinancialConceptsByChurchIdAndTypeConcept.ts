import {
  ConceptType,
  IFinancialConfigurationRepository,
} from "../../../domain";
import { ChurchNotFound, IChurchRepository } from "../../../../church/domain";

export class FindFinancialConceptsByChurchIdAndTypeConcept {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(churchId: string, typeConcept: ConceptType) {
    const church = await this.churchRepository.findById(churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    return await this.financialConfigurationRepository.findFinancialConceptsByChurchIdAndTypeConcept(
      churchId,
      typeConcept,
    );
  }
}
