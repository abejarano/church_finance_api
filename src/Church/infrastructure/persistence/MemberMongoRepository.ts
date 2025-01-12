import { MongoRepository } from "../../../Shared/infrastructure";
import { IMemberRepository, Member } from "../../domain";
import { Criteria, Paginate } from "../../../Shared/domain";

export class MemberMongoRepository
  extends MongoRepository<any>
  implements IMemberRepository
{
  private static instance: MemberMongoRepository;

  constructor() {
    super();
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

  async findById(memberId: string): Promise<Member | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne<any>(
      {
        "members.memberId": memberId,
      },
      { projection: { "members.$": 1, churchId: 1 } },
    );

    if (result === null || result.members.length === 0) {
      return undefined;
    }

    return Member.fromPrimitives({
      id: result._id.toString(),
      churchId: result.churchId,
      ...result.members[0],
    });
  }

  async upsert(member: Member): Promise<void> {
    const collection = await this.collection();
    // Paso 1: Elimina el objeto existente del array (si existe)
    await collection.updateOne(
      { churchId: member.getChurchId() },
      { $pull: { members: { memberId: member.getMemberId() } } },
    );

    // Paso 2: Añade el nuevo objeto al array
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
          numberOfMembers: { $size: "$members" },
        },
      },
    ];

    const collection = await this.collection();
    const r = await collection.aggregate(agg).toArray();
    let count = 0;
    if (r.length > 0) {
      count = r[0].numberOfMembers;
    }

    const skip = (criteria.offset! - 1) * criteria.limit!;
    const hasNextPage: boolean = skip * criteria.limit! < count;

    return {
      nextPag: !hasNextPage ? Number(skip) + 2 : null,
      count,
      results: listMembers as Member[],
    };
  }

  async findByDni(dni: string): Promise<Member | undefined> {
    const collection = await this.collection<{
      members: Member[];
    }>();

    const result = await collection.findOne(
      { "members.dni": dni },
      { projection: { "members.$": 1 } },
    );

    if (result === null || result.members.length === 0) {
      return undefined;
    }

    return Member.fromPrimitives({
      id: result._id.toString(),
      ...result.members[0],
    });
  }
}
