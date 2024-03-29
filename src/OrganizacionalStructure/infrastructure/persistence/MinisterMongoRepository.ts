import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import { IMinisterRepository, Minister } from "../../domain";
import { Church } from "../../../Church/domain";
import { Criteria, Paginate } from "../../../Shared/domain";

export class MinisterMongoRepository
  extends MongoRepository<Minister>
  implements IMinisterRepository
{
  private static instance: MinisterMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): MinisterMongoRepository {
    if (!MinisterMongoRepository.instance) {
      MinisterMongoRepository.instance = new MinisterMongoRepository();
    }
    return MinisterMongoRepository.instance;
  }

  collectionName(): string {
    return "ministers";
  }

  async assignChurch(church: Church): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      { _id: church.getMinister().getId },
      { $set: { churchId: church.getChurchId() } },
    );
  }

  async findByDni(dni: string): Promise<Minister | undefined> {
    return await this.buildMinister({ dni });
  }

  async findById(ministerId: string): Promise<Minister | undefined> {
    return await this.buildMinister({ ministerId });
  }

  async list(criteria: Criteria): Promise<Paginate<Minister>> {
    const documents: Minister[] =
      await this.searchByCriteria<Minister>(criteria);
    return this.buildPaginate<Minister>(documents);
  }

  async upsert(minister: Minister): Promise<void> {
    await this.persist(minister.getId(), minister);
  }

  private async buildMinister(filter: {}): Promise<Minister> {
    const collection = await this.collection();
    const result = await collection.findOne(filter);
    if (!result) return undefined;

    return Minister.fromPrimitives({ id: result._id.toString(), ...result });
  }

  public async allActive() {
    const collection = await this.collection();
    const result = await collection.find().toArray();
    console.log(result);
    return result.map((minister) =>
      Minister.fromPrimitives({ id: minister._id.toString(), ...minister }),
    );
  }
}
