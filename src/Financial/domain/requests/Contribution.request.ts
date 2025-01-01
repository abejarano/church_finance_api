import { OnlineContributionsType } from "../enums/OnlineContributionsType.enum";

export type ContributionRequest = {
  memberId: string;
  type: OnlineContributionsType;
  amount: number;
  bankTransferReceipt: any;
  financeConceptId: string;
  month: string;
  observation: string;
  bankId: string;
};
