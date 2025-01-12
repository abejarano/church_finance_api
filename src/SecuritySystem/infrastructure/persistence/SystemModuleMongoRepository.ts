import { MongoRepository } from "../../../Shared/infrastructure";
import {
  ISystemModuleRepository,
  OptionModuleDTO,
  SystemModule,
} from "../../domain";

export class SystemModuleMongoRepository
  extends MongoRepository<SystemModule>
  implements ISystemModuleRepository
{
  private static instance: SystemModuleMongoRepository;

  constructor() {
    super();
  }

  static getInstance(): SystemModuleMongoRepository {
    if (!SystemModuleMongoRepository.instance) {
      SystemModuleMongoRepository.instance = new SystemModuleMongoRepository();
    }
    return SystemModuleMongoRepository.instance;
  }

  collectionName(): string {
    return "bk_system_modules";
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

  async upsert(systemModule: SystemModule): Promise<void> {
    await this.persist(systemModule.getId(), systemModule);
  }

  async delete(systemModuleId: string): Promise<void> {
    const collection = await this.collection();
    const result = await collection.deleteMany({ systemModuleId });
  }

  async upsertOptionModule(systemModule: SystemModule): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      { churchId: systemModule.getSystemModuleId() },
      { $set: { options: systemModule.getOptionModule() } },
      { upsert: true },
    );
  }

  async findByOptionModuleByOptionIds(
    optionIds: string[],
  ): Promise<OptionModuleDTO[]> {
    const collection = await this.collection<{
      options: OptionModuleDTO[];
    }>();

    const result = await collection
      .find(
        {
          "options.optionModuleId": {
            $in: optionIds,
          },
        },
        {
          projection: {
            _id: 0,
            options: {
              $filter: {
                input: "$options",
                as: "option",
                cond: {
                  $in: ["$$option.optionModuleId", optionIds],
                },
              },
            },
          },
        },
      )
      .toArray();

    if (result.length === 0) {
      return [];
    }

    let options = [];
    for (const item of result) {
      for (const itemElement of item.options) {
        options.push(itemElement);
      }
    }

    return options;
  }

  private async buildList(filter: {}) {
    const collection = await this.collection();
    const result = await collection.find(filter).toArray();

    return result.map((item) =>
      SystemModule.fromPrimitives({ ...item, id: item._id }),
    );
  }
}
