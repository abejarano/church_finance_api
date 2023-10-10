import { Member } from "src/church/domain/member";
import { Criteria, Paginate } from "src/shared";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure/mongodb";
import { IMemberRepository } from "../../domain/interfaces/member_repository.interface";

export class MemberMongoRepository
  extends MongoRepository<any>
  implements IMemberRepository
{
  // singleton
  private static instance: MemberMongoRepository;

  public static getInstance(): MemberMongoRepository {
    if (MemberMongoRepository.instance) {
      return MemberMongoRepository.instance;
    }
    MemberMongoRepository.instance = new MemberMongoRepository();
    return MemberMongoRepository.instance;
  }

  constructor() {
    super(MongoClientFactory.createClient());
  }

  collectionName(): string {
    return "churches";
  }

  findById(memberId: string): Promise<Member> {
    throw new Error("Method not implemented.");
  }
  upsert(member: Member): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async paginate(
    criteria: Criteria,
    page: number,
    perPage: number,
  ): Promise<Paginate<Member>> {
    const members = await this.searchByCriteriaWithProjection<Member>(
      criteria,
      "members",
    );

    return this.buildPaginate<Member>(members);
  }
}
