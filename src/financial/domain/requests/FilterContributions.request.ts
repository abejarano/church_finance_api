import { OnlineContributionsType } from "../enums/OnlineContributionsType.enum";
import { OnlineContributionsStatus } from "../enums/OnlineContributionsStatus.enum";

export type FilterContributionsRequest = {
  type: OnlineContributionsType;
  status: OnlineContributionsStatus;
  churchId: string;
  startDate: Date;
  endDate: Date;
  page: number;
  perPage: number;
};
