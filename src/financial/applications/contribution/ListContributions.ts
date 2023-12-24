import { IOnlineContributionsRepository } from "../../domain";
import { FilterContributionsRequest } from "../../domain/requests/FilterContributions.request";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
} from "../../../shared/domain";

export class ListContributions {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
  ) {}

  async execute(filter: FilterContributionsRequest) {
    return this.contributionRepository.findByCriteria(
      this.prepareFilter(filter),
    );
  }

  private prepareFilter(reqFilters: FilterContributionsRequest) {
    const filters = [];

    if (reqFilters.startDate && !reqFilters.endDate) {
      filters.push(
        new Map<string, string | Date>([
          ["field", "createdAt"],
          ["operator", Operator.GTE],
          ["value", reqFilters.startDate],
        ]),
      );
    }

    if (reqFilters.endDate && !reqFilters.startDate) {
      filters.push(
        new Map<string, string | Date>([
          ["field", "createdAt"],
          ["operator", Operator.LTE],
          ["value", reqFilters.endDate],
        ]),
      );
    }

    if (reqFilters.startDate && reqFilters.endDate) {
      filters.push(
        new Map<string, string | any>([
          ["field", "createdAt"],
          ["operator", Operator.DATE_RANGE],
          [
            "value",
            {
              startDate: reqFilters.startDate,
              endDate: reqFilters.endDate,
            },
          ],
        ]),
      );
    }

    if (reqFilters.status) {
      filters.push(
        new Map([
          ["field", "status"],
          ["operator", Operator.EQUAL],
          ["value", reqFilters.status],
        ]),
      );
    }

    return new Criteria(
      Filters.fromValues(filters),
      Order.fromValues("createdAt", OrderTypes.DESC),
      reqFilters.perPage,
      reqFilters.page,
    );
  }
}
