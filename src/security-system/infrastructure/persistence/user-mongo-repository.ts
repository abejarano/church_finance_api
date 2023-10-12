import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { IUserRepository, PermissionDTO, User } from "../../domain";

export class UserMongoRepository
  extends MongoRepository<User>
  implements IUserRepository
{
  private static instance: UserMongoRepository;
  static getInstance(): UserMongoRepository {
    if (!UserMongoRepository.instance) {
      UserMongoRepository.instance = new UserMongoRepository();
    }
    return UserMongoRepository.instance;
  }

  constructor() {
    super(MongoClientFactory.createClient());
  }
  collectionName(): string {
    return "users";
  }

  async upsert(user: User): Promise<void> {
    await this.persist(user.getId(), user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ email });
    if (!result) return undefined;
    return User.fromPrimitives({ ...result, id: result._id });
  }

  async searchPermissionByURLModuleOptionAndUserId(
    userId: string,
    url: string,
  ): Promise<PermissionDTO> {
    const collection = await this.collection();
    return await collection.findOne<PermissionDTO>(
      { userId, "permission.optionModule.URL": url },
      { projection: { permission: 1 } },
    );
  }
}
