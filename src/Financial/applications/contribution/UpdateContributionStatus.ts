import { ContributionNotFound, OnlineContributionsStatus } from "../../domain";
import { IOnlineContributionsRepository } from "../../domain/interfaces";

export class UpdateContributionStatus {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
  ) {}

  async execute(contributionId: string, status: OnlineContributionsStatus) {
    const contribution =
      await this.contributionRepository.findById(contributionId);

    if (!contribution) {
      throw new ContributionNotFound();
    }

    contribution.updateStatus(status);
    await this.contributionRepository.upsert(contribution);
  }
}
