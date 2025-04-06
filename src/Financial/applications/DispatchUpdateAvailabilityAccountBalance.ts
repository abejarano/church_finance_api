import { Logger } from "@/Shared/adapter"
import { IQueueService, QueueName } from "@/Shared/domain"
import { AccountType, AvailabilityAccount, TypeOperationMoney } from "../domain"
import { TypeBankingOperation } from "@/MovementBank/domain"

export class DispatchUpdateAvailabilityAccountBalance {
  private logger = Logger(DispatchUpdateAvailabilityAccountBalance.name)

  constructor(private readonly queueService: IQueueService) {}

  execute(params: {
    availabilityAccount: AvailabilityAccount
    operationType: TypeOperationMoney
    concept: string
    amount: number
    createdAt?: Date
  }) {
    this.logger.info(`DispatchUpdateAvailabilityAccountBalance`, params)

    const { createdAt, concept, operationType, availabilityAccount, amount } =
      params

    this.queueService.dispatch(QueueName.UpdateAvailabilityAccountBalance, {
      availabilityAccountId: availabilityAccount.getAvailabilityAccountId(),
      amount: amount,
      operationType: operationType,
    })

    if (availabilityAccount.getType() === AccountType.BANK) {
      this.queueService.dispatch(QueueName.MovementBankRecord, {
        amount: amount,
        bankingOperation:
          operationType === TypeOperationMoney.MONEY_OUT
            ? TypeBankingOperation.WITHDRAWAL
            : TypeBankingOperation.DEPOSIT,
        concept: concept,
        bankId: availabilityAccount.getSource().bankId,
        createdAt: createdAt,
      })
    }

    this.logger.info(`finished process`)
  }
}
