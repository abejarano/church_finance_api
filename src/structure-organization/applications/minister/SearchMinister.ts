import { IMinisterRepository, Minister } from "../../domain";
import { MinisterPaginateRequest } from "../../infrastructure/http/requests/MinisterPaginate.request";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../shared/domain";

export class SearchMinister {
  constructor(private readonly ministerRepository: IMinisterRepository) {}

  async execute(request: MinisterPaginateRequest): Promise<Paginate<Minister>> {
    return await this.ministerRepository.list(this.prepareCriteria(request));
  }

  private prepareCriteria(request: MinisterPaginateRequest): Criteria {
    const filters = [];

    if (request.districtId) {
      filters.push(
        new Map([
          ["field", "region.district.districtId"],
          ["operator", Operator.EQUAL],
          ["value", request.districtId],
        ]),
      );
    }

    if (request.regionId) {
      filters.push(
        new Map([
          ["field", "region.regionId"],
          ["operator", Operator.EQUAL],
          ["value", request.regionId],
        ]),
      );
    }

    return new Criteria(
      Filters.fromValues(filters),
      Order.fromValues("name", OrderTypes.DESC),
      request.perPage,
      request.page,
    );
  }
}
