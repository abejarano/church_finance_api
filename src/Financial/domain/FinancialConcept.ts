import { AggregateRoot } from "../../Shared/domain";
import { ConceptType } from "./enums/ConcepType.enum";
import { Church } from "../../Church/domain";
import { IdentifyEntity } from "../../Shared/adapter";

export class FinancialConcept extends AggregateRoot {
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
  ): FinancialConcept {
    const concept: FinancialConcept = new FinancialConcept();
    concept.financeConceptId = IdentifyEntity.get();
    concept.name = name;
    concept.description = description;
    concept.active = active;
    concept.type = type;
    concept.churchId = church.getChurchId();
    concept.createdAt = new Date();
    return concept;
  }

  static fromPrimitives(plainData: any, churchId: string): FinancialConcept {
    const concept: FinancialConcept = new FinancialConcept();
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

  getFinanceConceptId(): string {
    return this.financeConceptId;
  }

  getId(): string {
    return this.id;
  }

  isDisable(): boolean {
    return !this.active;
  }

  disable(): void {
    this.active = false;
  }

  enable(): void {
    this.active = true;
  }

  getType(): ConceptType {
    return this.type;
  }

  getChurchId(): string {
    return this.churchId;
  }

  getName(): string {
    return this.name;
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
