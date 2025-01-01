import {
  ContributionRequest,
  FinancialConcept,
  MoneyLocation,
  OnlineContributions,
} from "../../domain";
import {
  AmountValueObject,
  IQueueService,
  IStorageService,
  QueueName,
} from "../../../Shared/domain";
import { Member } from "../../../Church/domain";
import { IFinancialYearRepository } from "../../../ConsolidatedFinancial/domain";
import {
  MovementBankRequest,
  TypeBankingOperation,
} from "../../../MovementBank/domain";
import { FinancialMonthValidator } from "../../../ConsolidatedFinancial/FinancialMonthValidator";
import { IOnlineContributionsRepository } from "../../domain/interfaces";
import { FinancialRecordRequest } from "../../domain/requests/FinancialRecord.request";
import { logger } from "../../../Shared/infrastructure";

export class RegisterContributionsOnline {
  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
    private readonly storageService: IStorageService,
    private readonly queueService: IQueueService,
    private readonly financialYearRepository: IFinancialYearRepository,
  ) {}

  async execute(
    contributionRequest: ContributionRequest,
    member: Member,
    financialConcept: FinancialConcept,
  ) {
    logger.info(`RegisterContributionsOnline`);
    await new FinancialMonthValidator(this.financialYearRepository).validate(
      member.getChurchId(),
    );

    const voucher = await this.storageService.uploadFile(
      contributionRequest.bankTransferReceipt,
    );

    const contribution: OnlineContributions = OnlineContributions.create(
      AmountValueObject.create(contributionRequest.amount),
      member,
      financialConcept,
      voucher,
      contributionRequest.observation,
      contributionRequest.bankId,
    );

    await this.contributionRepository.upsert(contribution);

    const movementBank: MovementBankRequest = {
      amount: contributionRequest.amount,
      bankingOperation: TypeBankingOperation.DEPOSIT,
      concept: financialConcept.getName(),
      bankId: contributionRequest.bankId,
    };

    this.queueService.dispatch(QueueName.MovementBankRecord, movementBank);

    const financialRecord: FinancialRecordRequest = {
      financialConcept: financialConcept.toPrimitives(),
      amount: contributionRequest.amount,
      churchId: member.getChurchId(),
      date: new Date(),
      moneyLocation: MoneyLocation.BANK,
      voucher,
    };

    this.queueService.dispatch(
      QueueName.RegisterFinancialRecord,
      financialRecord,
    );
  }
}
