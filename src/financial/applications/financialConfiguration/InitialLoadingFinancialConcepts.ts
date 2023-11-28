import {
  FinancialConcept,
  IFinancialConfigurationRepository,
} from "../../domain";
import {
  Church,
  ChurchNotFound,
  IChurchRepository,
} from "../../../church/domain";
import * as conceptBase from "../../../fixtures/conceptBase.json";
import { ConceptType } from "../../domain/enums/ConcepType.enum";

export class InitialLoadingFinancialConcepts {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(churchId: string): Promise<void> {
    console.log(`Crear conceptos financieros para la iglesia ${churchId}`);
    const church: Church = await this.churchRepository.findById(churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    for (const c of conceptBase) {
      await this.financialConfigurationRepository.upsertFinancialConcept(
        FinancialConcept.create(
          c.name,
          c.description,
          c.active,
          c.type as ConceptType,
          church,
        ),
      );
    }
  }
}
