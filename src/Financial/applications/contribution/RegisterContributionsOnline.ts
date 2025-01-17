import {
  AvailabilityAccount,
  ContributionRequest,
  FinancialConcept,
  FinancialRecordQueueRequest,
  OnlineContributions,
} from "../../domain"
import {
  AmountValueObject,
  IQueueService,
  IStorageService,
  QueueName,
} from "../../../Shared/domain"
import { Member } from "../../../Church/domain"
import { IFinancialYearRepository } from "../../../ConsolidatedFinancial/domain"
import { FinancialMonthValidator } from "../../../ConsolidatedFinancial/applications"
import { IOnlineContributionsRepository } from "../../domain/interfaces"
import { Logger } from "../../../Shared/adapter"
import {
  MovementBankRequest,
  TypeBankingOperation,
} from "../../../MovementBank/domain"
import { DateBR } from "../../../Shared/helpers"

export class RegisterContributionsOnline {
  private logger = Logger("RegisterContributionsOnline")

  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
    private readonly storageService: IStorageService,
    private readonly queueService: IQueueService,
    private readonly financialYearRepository: IFinancialYearRepository
  ) {}

  async execute(
    contributionRequest: ContributionRequest,
    availabilityAccount: AvailabilityAccount,
    member: Member,
    financialConcept: FinancialConcept
  ) {
    this.logger.info(
      `RegisterContributionsOnline contributionRequest: ${JSON.stringify(contributionRequest)} member: ${member.getName()} financialConcept: ${financialConcept.getName()}`
    )

    await new FinancialMonthValidator(this.financialYearRepository).validate(
      member.getChurchId()
    )

    const voucher = await this.storageService.uploadFile(
      contributionRequest.bankTransferReceipt
    )

    const contribution: OnlineContributions = OnlineContributions.create(
      AmountValueObject.create(contributionRequest.amount),
      member,
      financialConcept,
      voucher,
      contributionRequest.observation,
      contributionRequest.bankId
    )

    await this.contributionRepository.upsert(contribution)

    const movementBank: MovementBankRequest = {
      amount: contributionRequest.amount,
      bankingOperation: TypeBankingOperation.DEPOSIT,
      concept: financialConcept.getName(),
      bankId: contributionRequest.bankId,
    }

    this.queueService.dispatch(QueueName.MovementBankRecord, movementBank)

    const financialRecord: FinancialRecordQueueRequest = {
      financialConceptId: financialConcept.getFinancialConceptId(),
      amount: contributionRequest.amount,
      churchId: member.getChurchId(),
      date: DateBR(),
      availabilityAccountId: availabilityAccount.getAvailabilityAccountId(),
      voucher,
    }

    this.queueService.dispatch(
      QueueName.RegisterFinancialRecord,
      financialRecord
    )
  }
}
