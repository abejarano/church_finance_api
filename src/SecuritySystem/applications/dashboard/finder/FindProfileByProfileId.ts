import { IProfileRepository } from "../../../domain";

export class FindProfileByProfileId {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string) {
    return await this.profileRepository.findByProfileId(profileId);
  }
}
