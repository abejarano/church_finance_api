import { ChurchStatus } from "../../../domain";

export type ChurchPaginateRequest = {
  perPage: number;
  page: number;
  regionId: string;
  status: ChurchStatus;
};
