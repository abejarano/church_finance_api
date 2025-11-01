import {
  ContributionNotFound,
  FinancialRecordSource,
  FinancialRecordStatus,
  FinancialRecordType,
  OnlineContributions,
  OnlineContributionsStatus,
  TypeOperationMoney,
} from "../../domain"
import { IOnlineContributionsRepository } from "../../domain/interfaces"
import { Logger } from "../../../Shared/adapter"
import { TypeBankingOperation } from "../../../MovementBank/domain"
import { IQueueService } from "../../../Shared/domain"
import { DispatchCreateFinancialRecord } from "../DispatchCreateFinancialRecord"
import { DateBR } from "../../../Shared/helpers"
import { DispatchUpdateAvailabilityAccountBalance } from "../DispatchUpdateAvailabilityAccountBalance"

export class UpdateContributionStatus {
  private logger = Logger("UpdateContributionStatus")

  constructor(
    private readonly contributionRepository: IOnlineContributionsRepository,
    private readonly queueService: IQueueService
  ) {}

  async execute(
    contributionId: string,
    status: OnlineContributionsStatus,
    createdBy: string
  ): Promise<void> {
    this.logger.info(
      `UpdateContributionStatus contributionId: ${contributionId}, status: ${status}`
    )

    const contribution: OnlineContributions =
      await this.contributionRepository.findById(contributionId)

    if (!contribution) {
      this.logger.info(`Contribution with id ${contributionId} not found`)
      throw new ContributionNotFound()
    }

    contribution.updateStatus(status)
    await this.contributionRepository.upsert(contribution)

    this.logger.info(`Contribution with id ${contributionId} updated`)

    if (contribution.getStatus() !== OnlineContributionsStatus.PROCESSED) {
      return
    }

    new DispatchUpdateAvailabilityAccountBalance(this.queueService).execute({
      availabilityAccount: contribution.getAvailabilityAccount(),
      operationType: TypeBankingOperation.DEPOSIT
        ? TypeOperationMoney.MONEY_IN
        : TypeOperationMoney.MONEY_OUT,
      concept: contribution.getFinancialConcept().getName(),
      amount: contribution.getAmount(),
    })

    new DispatchCreateFinancialRecord(this.queueService).execute({
      financialConcept: contribution.getFinancialConcept(),
      amount: contribution.getAmount(),
      churchId: contribution.getMember().getChurchId(),
      date: DateBR(),
      createdBy,
      financialRecordType: FinancialRecordType.INCOME,
      source: FinancialRecordSource.AUTO,
      status: FinancialRecordStatus.RECONCILED,
      availabilityAccount: contribution.getAvailabilityAccount(),
      voucher: contribution.getBankTransferReceipt(),
      description: contribution.getFinancialConcept().getName(),
    })
  }
}
