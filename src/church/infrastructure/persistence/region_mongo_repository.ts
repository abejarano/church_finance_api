import { IRegionRepository } from "../../domain/interfaces/region_repository.interface";
import { Region } from "../../domain/region";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure/mongodb";

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
}
