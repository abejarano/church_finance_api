import { User } from "../User";
import { Criteria, Paginate } from "../../../shared/domain";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;

  findByUserId(userId: string): Promise<User | undefined>;

  upsert(user: User): Promise<void>;

  fetchCriteria(payload: Criteria): Promise<Paginate<User>>;
}
