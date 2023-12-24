import {
  ContributionRequest,
  IOnlineContributionsRepository,
  OnlineContributions,
} from "../../domain";
import { AmountValueObject } from "../../../shared/domain";
import { Member } from "../../../church/domain";

export class RegisterContributionsOnline {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
  ) {}

  async execute(contributionRequest: ContributionRequest, member: Member) {
    const contribution: OnlineContributions = OnlineContributions.create(
      contributionRequest.type,
      contributionRequest.status,
      AmountValueObject.create(contributionRequest.amount),
      member,
      contributionRequest.bankTransferReceipt,
    );

    await this.contributionRepository.upsert(contribution);
  }
}
