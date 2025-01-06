import { FilterFinanceRecordRequest } from "../../domain";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../Shared/domain";
import { IFinancialRecordRepository } from "../../domain/interfaces";
import { FinanceRecord } from "../../domain/FinanceRecord";

export class SearchFinanceRecord {
  constructor(
    private readonly financialRecordRepository: IFinancialRecordRepository,
  ) {}

  async execute(
    request: FilterFinanceRecordRequest,
  ): Promise<Paginate<FinanceRecord>> {
    return await this.financialRecordRepository.list(
      this.prepareCriteria(request),
    );
  }

  private prepareCriteria(request: FilterFinanceRecordRequest) {
    const filters = [];

    if (request.churchId) {
      filters.push(
        new Map([
          ["field", "churchId"],
          ["operator", Operator.EQUAL],
          ["value", request.churchId],
        ]),
      );
    }

    if (request.financialConceptId) {
      filters.push(
        new Map([
          ["field", "financialConceptId"],
          ["operator", Operator.EQUAL],
          ["value", request.financialConceptId],
        ]),
      );
    }

    if (request.moneyLocation) {
      filters.push(
        new Map([
          ["field", "moneyLocation"],
          ["operator", Operator.EQUAL],
          ["value", request.moneyLocation],
        ]),
      );
    }

    if (request.startDate && !request.endDate) {
      filters.push(
        new Map<string, string | Date>([
          ["field", "date"],
          ["operator", Operator.GTE],
          ["value", new Date(request.startDate)],
        ]),
      );
    }

    if (!request.startDate && request.endDate) {
      filters.push(
        new Map<string, string | Date>([
          ["field", "date"],
          ["operator", Operator.LTE],
          ["value", new Date(request.endDate)],
        ]),
      );
    }

    if (request.startDate && request.endDate) {
      filters.push(
        new Map<string, string | any>([
          ["field", "date"],
          ["operator", Operator.DATE_RANGE],
          [
            "value",
            {
              startDate: request.startDate,
              endDate: request.endDate,
            },
          ],
        ]),
      );
    }

    return new Criteria(
      Filters.fromValues(filters),
      Order.fromValues("date", OrderTypes.DESC),
      request.perPage,
      request.page,
    );
  }
}
