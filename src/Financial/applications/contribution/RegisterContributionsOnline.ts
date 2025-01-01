import {
  ContributionRequest,
  FinancialConcept,
  IOnlineContributionsRepository,
  OnlineContributions,
} from "../../domain";
import { AmountValueObject, IStorageService } from "../../../Shared/domain";
import { Member } from "../../../Church/domain";

export class RegisterContributionsOnline {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
    private readonly storageService: IStorageService,
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
      await this.storageService.uploadFile(
        contributionRequest.bankTransferReceipt,
      ),
      contributionRequest.observation,
      contributionRequest.bankId,
    );

    await this.contributionRepository.upsert(contribution);
  }
}
