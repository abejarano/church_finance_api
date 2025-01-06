import { MoneyLocation } from "../enums/MoneyLocation.enum";

export type FilterFinanceRecordRequest = {
  financialConceptId?: string;
  moneyLocation?: MoneyLocation;
  churchId: string;
  startDate?: Date;
  endDate?: Date;
  page: number;
  perPage: number;
};
