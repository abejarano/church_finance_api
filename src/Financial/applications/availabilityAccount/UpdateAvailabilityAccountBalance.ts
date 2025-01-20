import { IQueue } from "../../../Shared/domain";
import {
  IAvailabilityAccountMasterRepository,
  IFinancialConfigurationRepository,
} from "../../domain/interfaces";
import {
  AvailabilityAccount,
  UpdateAvailabilityAccountBalanceRequest,
} from "../../domain";
import { logger } from "../../../Shared/infrastructure";
import { UpdateAvailabilityAccountMaster } from "./UpdateAvailabilityAccountMaster";

export class UpdateAvailabilityAccountBalance implements IQueue {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly availabilityAccountMasterRepository: IAvailabilityAccountMasterRepository,
  ) {}

  async handle(args: UpdateAvailabilityAccountBalanceRequest): Promise<void> {
    logger.info(`UpdateAvailabilityAccountBalance`, args);
    const account: AvailabilityAccount =
      await this.financialConfigurationRepository.findAvailabilityAccountByAvailabilityAccountId(
        args.availabilityAccountId,
      );

    if (args.operationType === "MONEY_IN") {
      account.increaseBalance(Number(args.amount));
    } else {
      account.decreaseBalance(Number(args.amount));
    }

    await this.financialConfigurationRepository.upsertAvailabilityAccount(
      account,
    );

    logger.info(`UpdateAvailabilityAccountBalance finish`, account);

    await new UpdateAvailabilityAccountMaster(
      this.availabilityAccountMasterRepository,
    ).execute(account, Number(args.amount), args.operationType);
  }
}
