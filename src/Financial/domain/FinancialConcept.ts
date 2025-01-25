import { AggregateRoot } from "../../Shared/domain"
import { ConceptType } from "./enums/ConcepType.enum"
import { Church } from "../../Church/domain"
import { IdentifyEntity } from "../../Shared/adapter"
import { DateBR } from "../../Shared/helpers"

export class FinancialConcept extends AggregateRoot {
  private id?: string
  private financialConceptId: string
  private name: string
  private description: string
  private active: boolean
  private type: ConceptType
  private churchId: string
  private createdAt: Date

  static create(
    name: string,
    description: string,
    active: boolean,
    type: ConceptType,
    church: Church
  ): FinancialConcept {
    const concept: FinancialConcept = new FinancialConcept()
    concept.financialConceptId = IdentifyEntity.get()
    concept.name = name
    concept.description = description
    concept.active = active
    concept.type = type
    concept.churchId = church.getChurchId()
    concept.createdAt = DateBR()
    return concept
  }

  static fromPrimitives(plainData: any, churchId: string): FinancialConcept {
    const concept: FinancialConcept = new FinancialConcept()
    concept.id = plainData.id
    concept.financialConceptId = plainData.financialConceptId
    concept.name = plainData.name
    concept.description = plainData.description
    concept.active = plainData.active
    concept.type = plainData.type
    concept.createdAt = plainData.createdAt
    concept.churchId = churchId
    return concept
  }

  getfinancialConceptId(): string {
    return this.financialConceptId
  }

  getId(): string {
    return this.id
  }

  isDisable(): boolean {
    return !this.active
  }

  disable(): void {
    this.active = false
  }

  enable(): void {
    this.active = true
  }

  getType(): ConceptType {
    return this.type
  }

  getChurchId(): string {
    return this.churchId
  }

  getName(): string {
    return this.name
  }

  toPrimitives(): any {
    return {
      financialConceptId: this.financialConceptId,
      name: this.name,
      description: this.description,
      active: this.active,
      type: this.type,
      createdAt: this.createdAt,
    }
  }
}
