import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { IMemberRepository, Member } from "../../domain";
import { Criteria, Paginate } from "../../../shared";

export class MemberMongoRepository
  extends MongoRepository<any>
  implements IMemberRepository
{
  private static instance: MemberMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  public static getInstance(): MemberMongoRepository {
    if (MemberMongoRepository.instance) {
      return MemberMongoRepository.instance;
    }
    MemberMongoRepository.instance = new MemberMongoRepository();
    return MemberMongoRepository.instance;
  }

  collectionName(): string {
    return "churches";
  }

  async findById(memberId: string): Promise<Member> {
    const collection = await this.collection();
    const result = await collection.findOne<Member>(
      {
        "members.memberId": memberId,
      },
      { projection: { "members.$": 1 } },
    );

    return Member.fromPrimitives(result);
  }
  async upsert(member: Member): Promise<void> {
    const collection = await this.collection();

    await collection.updateOne(
      { churchId: member.getChurchId() },
      { $push: { members: member.toPrimitives() } },
      { upsert: true },
    );
  }

  async list(criteria: Criteria): Promise<Paginate<Member>> {
    const members = await this.searchByCriteriaWithProjection<Member>(
      criteria,
      "members",
    );

    return this.buildPaginate<Member>(members);
  }
}
