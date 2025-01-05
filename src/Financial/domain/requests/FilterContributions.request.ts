import { OnlineContributionsStatus } from "../enums/OnlineContributionsStatus.enum";

export type FilterContributionsRequest = {
  financialConceptId: string;
  status: OnlineContributionsStatus;
  memberId: string;
  churchId: string;
  startDate: Date;
  endDate: Date;
  page: number;
  perPage: number;
};
