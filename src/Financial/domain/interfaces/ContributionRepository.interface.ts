import { OnlineContributions } from "../OnlineContributions";
import { Criteria, Paginate } from "../../../Shared/domain";

export interface IOnlineContributionsRepository {
  upsert(contribution: OnlineContributions): Promise<void>;

  findByCriteria(criteria: Criteria): Promise<Paginate<OnlineContributions>>;

  findByMemberId(memberId: string): Promise<Paginate<OnlineContributions>>;
}
