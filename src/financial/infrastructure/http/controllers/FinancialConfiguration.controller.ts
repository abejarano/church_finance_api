import domainResponse from "../../../../shared/helpers/domainResponse";
import { CostCenterRequest } from "../requests/CostCenter.request";
import { Response } from "express";
import { CreateOrUpdateCostCenter } from "../../../applications/financialConfiguration/CreateOrUpdateCostCenter";
import { FinancialConfigurationMongoRepository } from "../../persistence/FinancialConfigurationMongoRepository";
import { HttpStatus } from "../../../../shared";
import { FindCostCenterByCostCenterId } from "../../../applications/financialConfiguration/FindCostCenterByCostCenterId";

export class FinancialConfigurationController {
  static async findCostCenterByCostCenterId(
    costCenterId: string,
    res: Response,
  ) {
    try {
      const costCenter = await new FindCostCenterByCostCenterId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(costCenterId);

      res.status(HttpStatus.OK).json({ data: costCenter });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async createOrUpdateCostCenter(
    costCenter: CostCenterRequest,
    res: Response,
  ) {
    try {
      await new CreateOrUpdateCostCenter(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(costCenter);

      if (!costCenter.costCenterId) {
        res
          .status(HttpStatus.CREATED)
          .json({ message: "Registered cost center" });
        return;
      }

      res.status(HttpStatus.OK).json({ message: "Updated cost center" });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
