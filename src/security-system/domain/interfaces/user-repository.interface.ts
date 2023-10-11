import { User } from "../user";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  upsert(user: User): Promise<void>;
}
