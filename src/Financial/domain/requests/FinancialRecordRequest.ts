import { MoneyLocation } from "../enums/MoneyLocation.enum";
import { TypeBankingOperation } from "../../../MovementBank/domain";

export type FinancialRecordQueueRequest = {
  financialConceptId: string;
  churchId: string;
  amount: number;
  date: Date;
  moneyLocation: MoneyLocation;
  voucher?: string;
};

export type FinancialRecordRequest = {
  bankId: string;
  file?: any;
  bankingOperation?: TypeBankingOperation;
} & FinancialRecordQueueRequest;
