import { AggregateRoot } from "../../shared/domain";
import { ConceptType } from "./enums/ConcepType.enum";
import { Church } from "../../church/domain";
import { IdentifyEntity } from "../../shared/adapter";

export class FinanceConcept extends AggregateRoot {
  private id?: string;
  private financeConceptId: string;
  private name: string;
  private description: string;
  private active: boolean;
  private type: ConceptType;
  private churchId: string;
  private createdAt: Date;

  static create(
    name: string,
    description: string,
    active: boolean,
    type: ConceptType,
    church: Church,
  ): FinanceConcept {
    const concept: FinanceConcept = new FinanceConcept();
    concept.financeConceptId = IdentifyEntity.get();
    concept.name = name;
    concept.description = description;
    concept.active = active;
    concept.type = type;
    concept.churchId = church.getChurchId();
    concept.createdAt = new Date();
    return concept;
  }

  static fromPrimitives(plainData: any, churchId: string): FinanceConcept {
    const concept: FinanceConcept = new FinanceConcept();
    concept.id = plainData.id;
    concept.financeConceptId = plainData.financeConceptId;
    concept.name = plainData.name;
    concept.description = plainData.description;
    concept.active = plainData.active;
    concept.type = plainData.type;
    concept.createdAt = plainData.createdAt;
    concept.churchId = churchId;
    return concept;
  }

  getId(): string {
    return this.id;
  }

  disable(): void {
    this.active = false;
  }

  enable(): void {
    this.active = true;
  }

  getChurchId(): string {
    return this.churchId;
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
