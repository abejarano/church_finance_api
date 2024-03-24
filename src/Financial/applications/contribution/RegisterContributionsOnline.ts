import {
  ContributionRequest,
  FinancialConcept,
  IOnlineContributionsRepository,
  OnlineContributions,
} from "../../domain";
import { AmountValueObject } from "../../../Shared/domain";
import { Member } from "../../../Church/domain";

export class RegisterContributionsOnline {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
  ) {}

  async execute(
    contributionRequest: ContributionRequest,
    member: Member,
    financialConcept: FinancialConcept,
  ) {
    const contribution: OnlineContributions = OnlineContributions.create(
      contributionRequest.type,
      AmountValueObject.create(contributionRequest.amount),
      member,
      financialConcept,
      contributionRequest.bankTransferReceipt,
    );

    await this.contributionRepository.upsert(contribution);
  }
}
