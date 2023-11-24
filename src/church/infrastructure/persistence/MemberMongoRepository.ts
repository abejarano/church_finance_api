import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { IMemberRepository, Member } from "../../domain";
import { Criteria, Paginate } from "../../../shared";
import * as console from "console";
import { Region } from "../../../structure-organization";

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
    const documents = await this.searchByCriteriaWithProjection<any>(
      criteria,
      "members",
    );

    const listMembers = [];

    for (const d of documents) {
      for (const m of d.members) {
        listMembers.push({
          ...m,
          church: { name: d.name, churchId: d.churchId },
          region: d.region,
        });
      }
    }

    const agg = [
      {
        $project: {
          numberOfRegions: { $size: "$members" },
        },
      },
    ];

    const collection = await this.collection();
    const r = await collection.aggregate(agg).toArray();
    let count = 0;
    if (r.length > 0) {
      count = r[0].numberOfRegions;
    }

    const skip = (criteria.offset - 1) * criteria.limit;
    const hasNextPage: boolean = skip * criteria.limit < count;

    return {
      nextPag: !hasNextPage ? Number(skip) + 2 : null,
      count: count,
      results: listMembers as Member[],
    };
  }
}
