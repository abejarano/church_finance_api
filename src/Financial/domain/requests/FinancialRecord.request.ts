import { MoneyLocation } from "../enums/MoneyLocation.enum";
import { ConceptType } from "../enums/ConcepType.enum";

export type FinancialRecordRequest = {
  financialConcept: {
    financeConceptId: string;
    name: string;
    description: string;
    active: boolean;
    type: ConceptType;
    createdAt: Date;
  };
  churchId: string;
  amount: number;
  date: Date;
  moneyLocation: MoneyLocation;
  voucher: string;
};
