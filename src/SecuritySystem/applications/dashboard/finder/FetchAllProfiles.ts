import { IProfileRepository, Profile } from "../../../domain";

export class FetchAllProfiles {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(): Promise<Profile[]> {
    return await this.profileRepository.list();
  }
}
