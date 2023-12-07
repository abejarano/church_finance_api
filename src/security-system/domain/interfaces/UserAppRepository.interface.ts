import { UserApp } from "../UserApp";

export interface IUserAppRepository {
  upsert(user: UserApp): Promise<void>;

  findByEmail(email: string): Promise<UserApp | undefined>;
}
