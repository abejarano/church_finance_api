import { MongoRepository } from "../../../Shared/infrastructure";
import { IUserAppRepository, UserApp } from "../../domain";

export class UserAppMongoRepository
  extends MongoRepository<UserApp>
  implements IUserAppRepository
{
  private static instance: UserAppMongoRepository;

  constructor() {
    super();
  }

  static getInstance(): UserAppMongoRepository {
    if (!UserAppMongoRepository.instance) {
      UserAppMongoRepository.instance = new UserAppMongoRepository();
    }
    return UserAppMongoRepository.instance;
  }

  collectionName(): string {
    return "users_app";
  }

  async upsert(user: UserApp): Promise<void> {
    await this.persist(user.getId(), user);
  }

  async findByEmail(email: string): Promise<UserApp | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ email });

    if (!result) {
      return undefined;
    }

    return UserApp.fromPrimitives({ id: result._id.toString(), ...result });
  }
}
