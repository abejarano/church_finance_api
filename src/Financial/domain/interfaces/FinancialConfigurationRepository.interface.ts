import { CostCenter } from "../CostCenter";
import { Bank } from "../Bank";
import { FinancialConcept } from "../FinancialConcept";
import { ConceptType } from "../enums/ConcepType.enum";
import { AvailabilityAccount } from "../AvailabilityAccount";

export interface IFinancialConfigurationRepository {
  findBankByBankId(bankId: string): Promise<Bank>;

  findCostCenterByCostCenterId(
    costCenterId: string,
    churchId: string,
  ): Promise<CostCenter>;

  findFinancialConceptsByChurchIdAndTypeConcept(
    churchId: string,
    typeConcept: ConceptType,
  ): Promise<FinancialConcept[]>;

  findFinancialConceptsByChurchId(
    churchId: string,
  ): Promise<FinancialConcept[]>;

  findFinancialConceptByChurchIdAndFinancialConceptId(
    churchId: string,
    financialConceptId: string,
  ): Promise<FinancialConcept | undefined>;

  upsertBank(bank: Bank): Promise<void>;

  upsertCostCenter(costCenter: CostCenter): Promise<void>;

  upsertFinancialConcept(concept: FinancialConcept): Promise<void>;

  searchBanksByChurchId(churchId: string): Promise<Bank[]>;

  searchCenterCostsByChurchId(churchId: string): Promise<CostCenter[]>;

  upsertAvailabilityAccount(
    availabilityAccount: AvailabilityAccount,
  ): Promise<void>;

  findAvailabilityAccountByAvailabilityAccountId(
    availabilityAccountId: string,
  ): Promise<AvailabilityAccount>;

  searchAvailabilityAccountsByChurchId(
    churchId: string,
  ): Promise<AvailabilityAccount[]>;
}
