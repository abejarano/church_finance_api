import { Criteria, Paginate } from "src/shared/domain";
import {
  IOnlineContributionsRepository,
  OnlineContributions,
} from "../../domain";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";

export class OnlineContributionsMongoRepository
  extends MongoRepository<OnlineContributions>
  implements IOnlineContributionsRepository
{
  private static instance: OnlineContributionsMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): OnlineContributionsMongoRepository {
    if (!OnlineContributionsMongoRepository.instance) {
      OnlineContributionsMongoRepository.instance =
        new OnlineContributionsMongoRepository();
    }
    return OnlineContributionsMongoRepository.instance;
  }

  collectionName(): string {
    return "contributions_sent";
  }

  async upsert(contribution: OnlineContributions): Promise<void> {
    await this.persist(contribution.getId(), contribution);
  }

  async findByCriteria(
    criteria: Criteria,
  ): Promise<Paginate<OnlineContributions>> {
    const documents =
      await this.searchByCriteria<OnlineContributions>(criteria);
    return this.buildPaginate<OnlineContributions>(documents);
  }

  async findByMemberId(
    memberId: string,
  ): Promise<Paginate<OnlineContributions>> {
    throw new Error("Method not implemented.");
  }
}
