import { UserApp } from "../user-app";

export interface IUserAppRepository {
  upsert(user: UserApp): Promise<void>;
  findByEmail(email: string): Promise<UserApp | undefined>;
}
