import {
  FilterContributionsRequest,
  IOnlineContributionsRepository,
} from "../../domain";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
} from "../../../Shared/domain";

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
          ["value", new Date(reqFilters.startDate)],
        ]),
      );
    }

    if (reqFilters.endDate && !reqFilters.startDate) {
      filters.push(
        new Map<string, string | Date>([
          ["field", "createdAt"],
          ["operator", Operator.LTE],
          ["value", new Date(reqFilters.endDate)],
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

    if (reqFilters.type) {
      filters.push(
        new Map([
          ["field", "type"],
          ["operator", Operator.EQUAL],
          ["value", reqFilters.type],
        ]),
      );
    }

    if (reqFilters.memberId) {
      filters.push(
        new Map([
          ["field", "member.memberId"],
          ["operator", Operator.EQUAL],
          ["value", reqFilters.memberId],
        ]),
      );
    }

    if (reqFilters.churchId) {
      filters.push(
        new Map([
          ["field", "churchId"],
          ["operator", Operator.EQUAL],
          ["value", reqFilters.churchId],
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
