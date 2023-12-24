import { OnlineContributionsType } from "../enums/OnlineContributionsType.enum";
import { OnlineContributionsStatus } from "../enums/OnlineContributionsStatus.enum";

export type ContributionRequest = {
  memberId: string;
  type: OnlineContributionsType;
  status: OnlineContributionsStatus;
  amount: number;
  bankTransferReceipt: string;
};
