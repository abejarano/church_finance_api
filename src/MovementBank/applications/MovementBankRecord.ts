import {
  IMovementBankRepository,
  MovementBank,
  MovementBankRequest,
} from '../domain'
import { IQueue } from '../../Shared/domain'
import { IFinancialConfigurationRepository } from '../../Financial/domain/interfaces'
import { logger } from '../../Shared/infrastructure'

export class MovementBankRecord implements IQueue {
  constructor(
    private readonly movementBankRepository: IMovementBankRepository,
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
  ) {}

  async handle(args: MovementBankRequest): Promise<void> {
    logger.info(`MovementBankRecord`, args)
    const bank = await this.financialConfigurationRepository.findBankByBankId(
      args.bankId,
    )

    const movementBank = MovementBank.create(
      args.amount,
      args.bankingOperation,
      args.concept,
      bank,
    )

    await this.movementBankRepository.upsert(movementBank)
  }
}
