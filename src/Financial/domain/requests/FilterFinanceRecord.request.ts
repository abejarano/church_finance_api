export type FilterFinanceRecordRequest = {
  financialConceptId?: string;
  availabilityAccountId?: string;
  churchId: string;
  startDate?: Date;
  endDate?: Date;
  page: number;
  perPage: number;
};
