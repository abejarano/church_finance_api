import { AggregateRoot, IdentifyEntity } from "../../shared";
import { ConceptType } from "./enums/ConcepType.enum";

export class FinanceConcept extends AggregateRoot {
  private id?: string;
  private financeConceptId: string;
  private name: string;
  private description: string;
  private active: boolean;
  private type: ConceptType;
  private createdAt: Date;

  static create(
    name: string,
    description: string,
    active: boolean,
    type: ConceptType,
  ): FinanceConcept {
    const concept: FinanceConcept = new FinanceConcept();
    concept.financeConceptId = IdentifyEntity.get();
    concept.name = name;
    concept.description = description;
    concept.active = active;
    concept.type = type;
    concept.createdAt = new Date();
    return concept;
  }

  static fromPrimitives(plainData: any): FinanceConcept {
    const concept: FinanceConcept = new FinanceConcept();
    concept.id = plainData.id;
    concept.financeConceptId = plainData.financeConceptId;
    concept.name = plainData.name;
    concept.description = plainData.description;
    concept.active = plainData.active;
    concept.type = plainData.type;
    concept.createdAt = plainData.createdAt;
    return concept;
  }

  getId(): string {
    return this.id;
  }

  disable(): void {
    this.active = false;
  }

  toPrimitives(): any {
    return {
      financeConceptId: this.financeConceptId,
      name: this.name,
      description: this.description,
      active: this.active,
      type: this.type,
      createdAt: this.createdAt,
    };
  }
}
