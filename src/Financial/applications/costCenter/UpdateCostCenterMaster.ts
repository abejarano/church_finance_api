import {
  ICostCenterMasterRepository,
  IFinancialConfigurationRepository,
} from "../../domain/interfaces"
import { logger } from "../../../Shared/infrastructure"
import { CostCenter, CostCenterMaster } from "../../domain"
import MasterBalanceIdentifier from "../helpers/MasterBalanceIdentifier"
import { IQueue } from "../../../Shared/domain"

export class UpdateCostCenterMaster implements IQueue {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly costCenterMasterRepository: ICostCenterMasterRepository
  ) {}

  async handle(args: {
    churchId: string
    costCenterId: string
    amount: number
  }) {
    const { churchId, costCenterId, amount } = args

    logger.info(`UpdateCostCenterMaster`, {
      churchId,
      costCenterId,
      amount,
    })

    const identify = MasterBalanceIdentifier(costCenterId)

    const costCenter: CostCenter =
      await this.financialConfigurationRepository.findCostCenterByCostCenterId(
        costCenterId,
        churchId
      )

    let costCenterMaster = await this.costCenterMasterRepository.one(identify)

    if (!costCenterMaster) {
      costCenterMaster = CostCenterMaster.create(costCenter)
    }

    costCenterMaster.updateMaster(amount)

    await this.costCenterMasterRepository.upsert(costCenterMaster)

    logger.info(`UpdateCostCenterMaster finish`, costCenterMaster)
  }
}
