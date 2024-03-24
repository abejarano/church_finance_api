import { OnlineContributionsType } from "../enums/OnlineContributionsType.enum";

export type ContributionRequest = {
  memberId: string;
  type: OnlineContributionsType;
  amount: number;
  bankTransferReceipt: string;
  financeConceptId: string;
};
