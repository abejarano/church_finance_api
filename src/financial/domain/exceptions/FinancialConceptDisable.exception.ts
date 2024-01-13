import { DomainException } from "../../../shared/domain";

export class FinancialConceptDisable extends DomainException {
  name = "FINANCIAL_CONCEPT_DISABLE";
  message = "Financial concept is disable";
}
