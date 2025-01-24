import { IAvailabilityAccountMasterRepository } from "../../domain/interfaces"
import { AvailabilityAccount, AvailabilityAccountMaster } from "../../domain"
import IdentifyAvailabilityAccountMaster from "../helpers/MasterBalanceIdentifier"
import { logger } from "../../../Shared/infrastructure"

export class UpdateAvailabilityAccountMaster {
  constructor(
    private readonly availabilityAccountMasterRepository: IAvailabilityAccountMasterRepository
  ) {}

  async execute(
    account: AvailabilityAccount,
    amount: number,
    operationType: "MONEY_IN" | "MONEY_OUT"
  ) {
    logger.info(`UpdateAvailabilityAccountMaster`, account)
    const identifyAvailabilityAccountMaster = IdentifyAvailabilityAccountMaster(
      account.getAvailabilityAccountId()
    )

    logger.info(
      `Search AvailabilityAccountMaster ${identifyAvailabilityAccountMaster}`
    )

    let accountMaster = await this.availabilityAccountMasterRepository.one(
      identifyAvailabilityAccountMaster
    )

    if (!accountMaster) {
      logger.info(
        `AvailabilityAccountMaster ${identifyAvailabilityAccountMaster} not found`
      )
      accountMaster = AvailabilityAccountMaster.create(account)
    }

    accountMaster.updateMaster(Number(amount), operationType)

    await this.availabilityAccountMasterRepository.upsert(accountMaster)

    logger.info(`UpdateAvailabilityAccountMaster finish`, accountMaster)
  }
}
