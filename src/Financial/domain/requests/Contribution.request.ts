export type ContributionRequest = {
  memberId: string;
  amount: number;
  bankTransferReceipt: any;
  financialConceptId: string;
  availabilityAccountId: string;
  month: string;
  observation?: string;
  bankId: string;
};
