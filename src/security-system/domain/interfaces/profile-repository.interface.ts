import { Profile } from "../profile";
import { PermissionDTO } from "../types/permission.type";

export interface IProfileRepository {
  upsert(user: Profile): Promise<void>;
  findByProfileId(profileId: string): Promise<Profile | undefined>;
  list(): Promise<Profile[]>;
  // searchPermissionByURLModuleOptionAndProfileId(
  //   profileId: string,
  //   url: string,
  // ): Promise<PermissionDTO>;
}
