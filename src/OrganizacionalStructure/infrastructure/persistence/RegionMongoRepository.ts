import { Paginate } from "../../../Shared/domain";
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
    let filter = {};
    if (districtId) {
      filter = { districtId };
    }

    const skip = (page - 1) * perPage;

    const collection = await this.collection();

    const result = await collection
      .find(filter)
      .project({
        regions: {
          $slice: [Number(skip), Number(perPage)],
        },
      })
      .toArray();

    if (result.length === 0) {
      return {
        nextPag: null,
        totalRecord: 0,
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
      totalRecord: count,
      results: result[0].regions.map((region) =>
        Region.fromPrimitives({ ...region, district: { ...result[0] } }),
      ),
    };
  }

  async findAll(): Promise<Region[]> {
    const collection = await this.collection();
    const result = await collection.find().toArray();
    return result.map((item) =>
      Region.fromPrimitives({ id: item._id.toString(), ...item }),
    );
  }
}
