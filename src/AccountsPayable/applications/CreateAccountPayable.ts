import { Logger } from "@/Shared/adapter"
import {
  AccountPayable,
  AccountPayableRequest,
  IAccountPayableRepository,
} from "@/AccountsPayable/domain"

export class CreateAccountPayable {
  private logger = Logger(CreateAccountPayable.name)

  constructor(
    private readonly accountPayableRepository: IAccountPayableRepository
  ) {}

  async execute(args: AccountPayableRequest) {
    this.logger.info(`Start Create Account Payable`, args)

    const accountPayable = AccountPayable.create(args)

    await this.accountPayableRepository.upsert(accountPayable)

    this.logger.info(`CreateAccountPayable finish`)
  }
}
