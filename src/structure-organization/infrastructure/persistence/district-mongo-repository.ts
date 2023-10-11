import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure/mongodb";
import { District } from "../../domain/district";
import { IDistrictRepository } from "../../domain/interfaces/district_repository.interface";
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../shared";

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

  async pageDistrictsByStateId(
    stateId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<District>> {
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

    let document = await this.searchByCriteria<District>(criteria, ["regions"]);

    return this.buildPaginate<District>(document);
  }

  async upsert(district: District): Promise<void> {
    await this.persist(district.getId(), district);
  }
}
