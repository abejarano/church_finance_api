import { Paginate } from "../../../../shared/domain";
import { OnlineContributions } from "../../../domain";

export default (list: Paginate<OnlineContributions>) => ({
  count: list.count,
  nextPag: list.nextPag,
  results: list.results.map((item: any) => ({
    amount: item.amount,
    status: item.status,
    createdAt: item.createdAt,
    bankTransferReceipt: item.bankTransferReceipt,
    type: item.type,
  })),
});
