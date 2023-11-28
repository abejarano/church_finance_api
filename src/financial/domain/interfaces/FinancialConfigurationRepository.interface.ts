import { CostCenter } from "../CostCenter";
import { Bank } from "../Bank";
import { FinanceConcept } from "../FinanceConcept";

export interface IFinancialConfigurationRepository {
  findBankByBankId(bankId): Promise<Bank>;

  findCostCenterByCostCenterId(costCenterId: string): Promise<CostCenter>;

  upsertBank(bank: Bank): Promise<void>;

  upsertCostCenter(costCenter: CostCenter): Promise<void>;

  upsertFinancialConcept(concept: FinanceConcept): Promise<void>;

  searchBanksByChurchId(churchId: string): Promise<Bank[]>;

  searchCenterCostsByChurchId(churchId: string): Promise<CostCenter[]>;
}
