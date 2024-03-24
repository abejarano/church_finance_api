import { IWorldRepository, States } from "../../domain";
import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";

export class WorldMongoRepository
  extends MongoRepository<any>
  implements IWorldRepository
{
  private static instance: WorldMongoRepository;
  static getInstance(): WorldMongoRepository {
    if (!WorldMongoRepository.instance) {
      WorldMongoRepository.instance = new WorldMongoRepository();
    }
    return WorldMongoRepository.instance;
  }
  constructor() {
    super(MongoClientFactory.createClient());
  }
  private collectName: string = "states";

  collectionName(): string {
    return this.collectName;
  }

  async findStateById(stateId: string): Promise<States> {
    const collection = await this.collection();
    const result = await collection.findOne({ stateId: stateId });
    if (!result) {
      return undefined;
    }

    return States.fromPrimitives({ ...result, id: result._id });
  }
}
