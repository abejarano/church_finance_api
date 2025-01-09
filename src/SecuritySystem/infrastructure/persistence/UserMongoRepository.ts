import { MongoRepository } from "../../../Shared/infrastructure";
import { IUserRepository, User } from "../../domain";
import { Criteria, Paginate } from "../../../Shared/domain";

export class UserMongoRepository
  extends MongoRepository<User>
  implements IUserRepository
{
  private static instance: UserMongoRepository;

  constructor() {
    super();
  }

  static getInstance(): UserMongoRepository {
    if (!UserMongoRepository.instance) {
      UserMongoRepository.instance = new UserMongoRepository();
    }
    return UserMongoRepository.instance;
  }

  collectionName(): string {
    return "bk_users";
  }

  async upsert(user: User): Promise<void> {
    await this.persist(user.getId(), user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ email });
    if (!result) return undefined;

    return User.fromPrimitives({ ...result, id: result._id.toString() });
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ userId });
    if (!result) return undefined;

    return User.fromPrimitives({ ...result, id: result._id.toString() });
  }

  async fetchCriteria(payload: Criteria): Promise<Paginate<User>> {
    const documents = await this.searchByCriteria<User>(payload);
    return this.buildPaginate<User>(documents);
  }
}
