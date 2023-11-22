import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../shared";
import { District, IDistrictRepository } from "../../domain";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";

export class DistrictMongoRepository
  extends MongoRepository<District>
  implements IDistrictRepository
{
  private static instance: DistrictMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): DistrictMongoRepository {
    if (!DistrictMongoRepository.instance) {
      DistrictMongoRepository.instance = new DistrictMongoRepository();
    }
    return DistrictMongoRepository.instance;
  }

  collectionName(): string {
    return "districts";
  }

  async findById(districtId: string): Promise<District | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ districtId });

    if (!result) {
      return undefined;
    }

    return District.fromPrimitives({ id: result._id.toString(), ...result });
  }

  async listDistrictsByStateId(
    stateId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<District>> {
    if (stateId) {
      const filterStateId: Map<string, string> = new Map([
        ["field", "stateId"],
        ["operator", Operator.EQUAL],
        ["value", stateId],
      ]);

      const criteria: Criteria = new Criteria(
        Filters.fromValues([filterStateId]),
        Order.fromValues("createdAt", OrderTypes.DESC),
        perPage,
        page,
      );

      const document = await this.searchByCriteria<District>(criteria);
      return this.buildPaginate<District>(document);
    }

    const skip = (page - 1) * perPage;
    const agg = [
      {
        $project: {
          _id: 0,
          regions: 0,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(perPage),
      },
    ];
    const collection = await this.collection();

    const result = await collection.aggregate(agg).toArray();

    if (!result) {
      return {
        nextPag: null,
        count: 0,
        results: [],
      };
    }

    const count = await collection.countDocuments();

    const hasNextPage: boolean = skip * perPage < count;
    return {
      nextPag: !hasNextPage ? Number(skip) + 2 : null,
      count: count,
      results: result as District[],
    };
  }

  async upsert(district: District): Promise<void> {
    await this.persist(district.getId(), district);
  }
}
