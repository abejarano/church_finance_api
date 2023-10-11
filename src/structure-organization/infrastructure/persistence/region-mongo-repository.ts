import { IRegionRepository } from "../../domain/interfaces/region-repository.interface";
import { Region } from "../../domain/region";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure/mongodb";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../shared";

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

  async pageRegionsByDistrictId(
    districtId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<Region>> {
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
}
