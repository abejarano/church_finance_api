import { OnlineContributionsStatus } from "../enums/OnlineContributionsStatus.enum";

export type FilterContributionsRequest = {
  financeConceptId: string;
  status: OnlineContributionsStatus;
  memberId: string;
  churchId: string;
  startDate: Date;
  endDate: Date;
  page: number;
  perPage: number;
};
