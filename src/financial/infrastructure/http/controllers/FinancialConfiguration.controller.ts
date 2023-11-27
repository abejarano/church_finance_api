import domainResponse from "../../../../shared/helpers/domainResponse";
import { CostCenterRequest } from "../../../domain";
import { Response } from "express";
import { CreateOrUpdateCostCenter } from "../../../applications/financialConfiguration/CreateOrUpdateCostCenter";
import { FinancialConfigurationMongoRepository } from "../../persistence/FinancialConfigurationMongoRepository";
import { HttpStatus } from "../../../../shared";
import { FindCostCenterByCostCenterId } from "../../../applications/financialConfiguration/FindCostCenterByCostCenterId";
import { BankRequest } from "../../../domain/requests/Bank.request";
import { ChurchMongoRepository } from "../../../../church/infrastructure";
import { CreateOrUpdateBank } from "../../../applications/financialConfiguration/CreateOrUpdateBank";
import { FinBankByBankId } from "../../../applications/financialConfiguration/FinBankByBankId";

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

  static async createOrUpdateBank(request: BankRequest, res: Response) {
    try {
      await new CreateOrUpdateBank(
        FinancialConfigurationMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(request);

      if (!request.bankId) {
        res.status(HttpStatus.CREATED).json({ message: "Registered bank" });
      } else {
        res.status(HttpStatus.OK).json({ message: "Updated bank" });
      }
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findBankByBankId(bankId: string, res: Response) {
    try {
      const bank = await new FinBankByBankId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(bankId);

      res.status(HttpStatus.OK).json({ data: bank });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
