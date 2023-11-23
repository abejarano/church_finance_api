import { Filters } from "./filters";
import { Order } from "./order";

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: number;
  readonly offset?: number;

  constructor(filters: Filters, order: Order, limit: number, offset?: number) {
    this.filters = filters;
    this.order = order;
    this.limit = Number(limit);
    this.offset = offset !== undefined ? (offset - 1) * limit : undefined;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
