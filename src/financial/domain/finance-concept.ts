import { AggregateRoot } from "../../shared";
import { ConceptType } from "./enums/concept-type.enum";

export class FinanceConcept extends AggregateRoot {
  private id?: string;
  private financeConceptId: string;
  private name: string;
  private description: string;
  private active: boolean;
  private type: ConceptType;
  private createdAt: Date;
  getId(): string {
    return "";
  }

  toPrimitives(): any {}
}
