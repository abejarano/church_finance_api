import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../Shared/domain";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
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
    const result = await collection.findOne(
      {
        "regions.regionId": regionId,
      },
      {
        projection: {
          _id: 1,
          name: 1,
          stateId: 1,
          districtId: 1,
          createdAt: 1,
          "regions.$": 1,
        },
      },
    );

    if (!result) {
      return undefined;
    }

    return Region.fromPrimitives({
      ...result.regions[0],
      district: { id: result._id.toString(), ...result },
    });
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

      let document = await this.searchByCriteriaWithProjection<any>(
        criteria,
        "regions",
      );

      if (document.length === 0) {
        return {
          nextPag: null,
          count: 0,
          results: [],
        };
      }

      return this.buildPaginate<Region>(document[0].regions);
    }

    const skip = (page - 1) * perPage;

    const collection = await this.collection();

    const result = await collection
      .find({})
      .project({
        _id: 0,
        district: 0,
        name: 0,
        stateId: 0,
        districtId: 0,
        createdAt: 0,
        regions: {
          $slice: [Number(skip), Number(perPage)],
        },
      })
      .toArray();

    if (!result) {
      return {
        nextPag: null,
        count: 0,
        results: [],
      };
    }

    const agg = [
      {
        $project: {
          numberOfRegions: { $size: "$regions" },
        },
      },
    ];

    const r = await collection.aggregate(agg).toArray();

    let count = 0;
    if (r.length > 0) {
      count = r[0].numberOfRegions;
    }

    const hasNextPage: boolean = skip * perPage < count;
    return {
      nextPag: !hasNextPage ? Number(skip) + 2 : null,
      count: count,
      results: result[0].regions as Region[],
    };
  }
}
