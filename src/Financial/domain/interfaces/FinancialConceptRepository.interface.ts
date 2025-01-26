import { FinancialConcept } from "../FinancialConcept"
import { ConceptType } from "../enums/ConcepType.enum"

export interface IFinancialConceptRepository {
  findFinancialConceptByChurchIdAndFinancialConceptId(
    churchId: string,
    financialConceptId: string
  ): Promise<FinancialConcept | undefined>

  findFinancialConceptsByChurchId(churchId: string): Promise<FinancialConcept[]>

  findFinancialConceptsByChurchIdAndTypeConcept(
    churchId: string,
    typeConcept: ConceptType
  ): Promise<FinancialConcept[]>

  upsert(financialConcept: FinancialConcept): Promise<void>
}
