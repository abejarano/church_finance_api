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

  upsert(OnlineContributions: OnlineContributions): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByCriteria(criteria: Criteria): Promise<Paginate<OnlineContributions>> {
    throw new Error("Method not implemented.");
  }

  findByMemberId(memberId: string): Promise<Paginate<OnlineContributions>> {
    throw new Error("Method not implemented.");
  }
}
