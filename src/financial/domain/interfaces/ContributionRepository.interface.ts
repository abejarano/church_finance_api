import { OnlineContributions } from "../OnlineContributions";
import { Criteria, Paginate } from "../../../shared/domain";

export interface IOnlineContributionsRepository {
  upsert(OnlineContributions: OnlineContributions): Promise<void>;
  findByCriteria(criteria: Criteria): Promise<Paginate<OnlineContributions>>;
  findByMemberId(memberId: string): Promise<Paginate<OnlineContributions>>;
}
