import {
  CreateProfileRequest,
  IProfileRepository,
  ISystemModuleRepository,
  OptionModuleDTO,
  Profile,
  UserGroupNotFound,
} from "../../domain";

export class CreateOrUpdateProfile {
  constructor(
    private readonly moduleRepository: ISystemModuleRepository,
    private readonly profileRepository: IProfileRepository,
  ) {}

  async execute(profileRequest: CreateProfileRequest): Promise<Profile> {
    if (profileRequest.profileId) {
      return await this.updateProfile(profileRequest);
    }

    const createProfile: Profile = Profile.create(
      profileRequest.name,
      await this.getPermission(profileRequest),
    );

    await this.profileRepository.upsert(createProfile);

    return createProfile;
  }

  private async updateProfile(
    profileRequest: CreateProfileRequest,
  ): Promise<Profile> {
    const profile: Profile = await this.profileRepository.findByProfileId(
      profileRequest.profileId,
    );
    if (!profile) {
      throw new UserGroupNotFound();
    }

    profile.setPermission(await this.getPermission(profileRequest));
    await this.profileRepository.upsert(profile);

    return profile;
  }

  private async getPermission(
    profileRequest: CreateProfileRequest,
  ): Promise<OptionModuleDTO[]> {
    const optionsModule: OptionModuleDTO[] =
      await this.moduleRepository.findByOptionModuleByOptionIds(
        profileRequest.optionModuleIds,
      );

    const detailOptionModule = (optionModuleId: string): OptionModuleDTO => {
      return optionsModule.find((o) => {
        return o.optionModuleId === optionModuleId;
      });
    };

    return profileRequest.optionModuleIds
      .map((optionModuleId: string) => {
        const optionDetail: OptionModuleDTO =
          detailOptionModule(optionModuleId);
        if (optionDetail) {
          return optionDetail;
        }
      })
      .filter((o) => o != undefined);
  }
}
