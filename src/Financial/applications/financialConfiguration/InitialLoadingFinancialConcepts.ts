import { ConceptType, FinancialConcept } from "../../domain";
import {
  Church,
  ChurchNotFound,
  IChurchRepository,
} from "../../../Church/domain";
import * as conceptBase from "../../../fixtures/conceptBaseBR.json";
import { IQueue } from "../../../Shared/domain";
import { IFinancialConfigurationRepository } from "../../domain/interfaces";

export class InitialLoadingFinancialConcepts implements IQueue {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async handle(churchId: string): Promise<void> {
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
