import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import { Church, ChurchDTO, IChurchRepository } from "../../domain";
import { Criteria, Paginate } from "../../../Shared/domain";

export class ChurchMongoRepository
  extends MongoRepository<Church>
  implements IChurchRepository
{
  private static instance: ChurchMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): ChurchMongoRepository {
    if (ChurchMongoRepository.instance) {
      return ChurchMongoRepository.instance;
    }
    ChurchMongoRepository.instance = new ChurchMongoRepository();
    return ChurchMongoRepository.instance;
  }

  collectionName(): string {
    return "churches";
  }

  async findById(churchId: string): Promise<Church | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ churchId: churchId });

    if (!result) {
      return undefined;
    }
    return Church.fromPrimitives({ id: result._id.toString(), ...result });
  }

  async upsert(church: Church): Promise<void> {
    await this.persist(church.getId(), church);
  }

  async list(criteria: Criteria): Promise<Paginate<ChurchDTO>> {
    const result: ChurchDTO[] = await this.searchByCriteria<ChurchDTO>(
      criteria,
      ["financialConcepts", "members"],
    );
    return this.buildPaginate<ChurchDTO>(result);
  }
}
