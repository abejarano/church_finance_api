import { User } from "../user";
import { PermissionDTO } from "../types/permission.type";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  upsert(user: User): Promise<void>;
  searchPermissionByURLModuleOptionAndUserId(
    userId: string,
    url: string,
  ): Promise<PermissionDTO>;
}
