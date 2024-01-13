import { Profile } from "../Profile";
import { OptionModuleDTO } from "../types/option-module.type";

export interface IProfileRepository {
  upsert(user: Profile): Promise<void>;

  findByProfileId(profileId: string): Promise<Profile | undefined>;

  list(): Promise<Profile[]>;

  searchPermissionByURLModuleOptionAndProfileId(
    profileId: string[],
    url: string,
    action: string,
  ): Promise<OptionModuleDTO>;

  findByProfileIds(profileIds: string[]): Promise<Profile[]>;
}
