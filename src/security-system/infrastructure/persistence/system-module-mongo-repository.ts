import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { ISystemModuleRepository, SystemModule } from "../../domain";

export class SystemModuleMongoRepository
  extends MongoRepository<SystemModule>
  implements ISystemModuleRepository
{
  constructor() {
    super(MongoClientFactory.createClient());
  }

  collectionName(): string {
    return "system-modules";
  }

  findModuleBySystemModuleId(systemModuleId: string): Promise<SystemModule> {
    return Promise.resolve(undefined);
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
}
