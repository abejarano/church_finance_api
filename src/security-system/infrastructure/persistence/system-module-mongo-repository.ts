import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { ISystemModuleRepository, SystemModule } from "../../domain";
import { ObjectId } from "mongodb";

export class SystemModuleMongoRepository
  extends MongoRepository<SystemModule>
  implements ISystemModuleRepository
{
  private static instance: SystemModuleMongoRepository;
  static getInstance(): SystemModuleMongoRepository {
    if (!SystemModuleMongoRepository.instance) {
      SystemModuleMongoRepository.instance = new SystemModuleMongoRepository();
    }
    return SystemModuleMongoRepository.instance;
  }

  constructor() {
    super(MongoClientFactory.createClient());
  }

  collectionName(): string {
    return "system_modules";
  }

  async findModuleBySystemModuleId(
    systemModuleId: string,
  ): Promise<SystemModule | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ systemModuleId: systemModuleId });

    if (!result) return undefined;

    return SystemModule.fromPrimitives({
      ...result,
      id: result._id.toString(),
    });
  }

  async listByActive(): Promise<SystemModule[]> {
    return await this.buildList({ isActive: true });
  }

  async listByDisable(): Promise<SystemModule[]> {
    return await this.buildList({ isActive: false });
  }

  async list(): Promise<SystemModule[]> {
    return await this.buildList({});
  }

  private async buildList(filter: {}) {
    const collection = await this.collection();
    const result = await collection.find(filter).toArray();

    return result.map((item) =>
      SystemModule.fromPrimitives({ ...item, id: item._id }),
    );
  }

  async upsert(systemModule: SystemModule): Promise<void> {
    await this.persist(systemModule.getId(), systemModule);
  }

  async delete(systemModuleId: string): Promise<void> {
    const collection = await this.collection();
    const result = await collection.deleteMany({ systemModuleId });
  }
}
