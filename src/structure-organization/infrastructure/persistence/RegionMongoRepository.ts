import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../shared";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { IRegionRepository, Region } from "../../domain";

export class RegionMongoRepository
  extends MongoRepository<any>
  implements IRegionRepository
{
  private static instance: RegionMongoRepository;

  private constructor() {
    super(MongoClientFactory.createClient());
  }

  public static getInstance(): RegionMongoRepository {
    if (!RegionMongoRepository.instance) {
      RegionMongoRepository.instance = new RegionMongoRepository();
    }

    return RegionMongoRepository.instance;
  }

  collectionName(): string {
    return "districts";
  }

  async findById(regionId: string): Promise<Region> {
    const collection = await this.collection();
    const result = await collection.findOne({ "regions.regionId": regionId });

    if (!result) {
      return undefined;
    }

    return Region.fromPrimitives({ ...result, district: result });
  }

  async upsert(region: Region): Promise<void> {
    const collection = await this.collection();

    await collection.updateOne(
      { districtId: region.getDistrict().getDistrictId() },
      { $push: { regions: region.toPrimitives() } },
      { upsert: true },
    );
  }

  async listRegionsByDistrictId(
    districtId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<Region>> {
    if (districtId) {
      const filterDistrictId: Map<string, string> = new Map([
        ["field", "districtId"],
        ["operator", Operator.EQUAL],
        ["value", districtId],
      ]);

      const criteria: Criteria = new Criteria(
        Filters.fromValues([filterDistrictId]),
        Order.fromValues("createdAt", OrderTypes.DESC),
        perPage,
        page,
      );

      let document = await this.searchByCriteriaWithProjection<Region>(
        criteria,
        "regions",
      );

      return this.buildPaginate<Region>(document);
    }

    const skip = (page - 1) * perPage;
    const agg = [
      {
        $project: {
          _id: 0,
          district: 0,
          regions: {
            $slice: [skip, Number(perPage)],
          },
        },
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

    const pipeline = [
      {
        $unwind: "regions", // Separa cada objeto en la lista en documentos individuales
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 }, // Cuenta los documentos resultantes
        },
      },
    ];

    const countResult = await collection.aggregate(pipeline).toArray();
    let count = 0;
    if (countResult.length > 0) {
      count = result[0].total;
    }

    const hasNextPage: boolean = skip * perPage < count;
    return {
      nextPag: !hasNextPage ? Number(skip) + 2 : null,
      count: count,
      results: result as Region[],
    };
  }
}
