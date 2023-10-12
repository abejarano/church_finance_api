import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import { IProfileRepository, PermissionDTO, Profile } from "../../domain";

export class ProfileMongoRepository
  extends MongoRepository<Profile>
  implements IProfileRepository
{
  private static instance: ProfileMongoRepository;
  static getInstance(): ProfileMongoRepository {
    if (!ProfileMongoRepository.instance) {
      ProfileMongoRepository.instance = new ProfileMongoRepository();
    }
    return ProfileMongoRepository.instance;
  }

  constructor() {
    super(MongoClientFactory.createClient());
  }
  collectionName(): string {
    return "profiles";
  }

  async upsert(profile: Profile): Promise<void> {
    await this.persist(profile.getId(), profile);
  }

  async findByProfileId(profileId: string): Promise<Profile | undefined> {
    const collection = await this.collection();
    const result = await collection.findOne({ profileId });
    if (!result) return undefined;

    return Profile.fromPrimitives({ ...result, id: result._id });
  }

  async list(): Promise<Profile[]> {
    const collection = await this.collection();
    const result = await collection.find().toArray();
    return result.map((item) =>
      Profile.fromPrimitives({ ...item, id: item._id }),
    );
  }
}
