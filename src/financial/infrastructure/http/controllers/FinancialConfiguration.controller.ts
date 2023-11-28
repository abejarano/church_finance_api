import domainResponse from "../../../../shared/helpers/domainResponse";
import { CostCenterRequest } from "../../../domain";
import { Response } from "express";
import {
  CreateOrUpdateBank,
  CreateOrUpdateCostCenter,
  FinBankByBankId,
  FindCostCenterByChurchId,
  FindFinancialConceptsByChurchIdAndTypeConcept,
  SearchBankByChurchId,
} from "../../../applications";
import { FinancialConfigurationMongoRepository } from "../../persistence/FinancialConfigurationMongoRepository";
import { HttpStatus } from "../../../../shared/domain";
import { BankRequest } from "../../../domain/requests/Bank.request";
import { ChurchMongoRepository } from "../../../../church/infrastructure";
import { ConceptType } from "../../../domain/enums/ConcepType.enum";

export class FinancialConfigurationController {
  static async findCostCenterByChurchId(churchId: string, res: Response) {
    try {
      const costCenter = await new FindCostCenterByChurchId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(churchId);

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

  static async findFinancialConceptsByChurchIdAndTypeConcept(
    churchId: string,
    typeConcept: ConceptType,
    res: Response,
  ) {
    try {
      const financial = await new FindFinancialConceptsByChurchIdAndTypeConcept(
        FinancialConfigurationMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(churchId, typeConcept);

      res.status(HttpStatus.OK).json(financial);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async listBankByChurchId(churchId: string, res: Response) {
    try {
      const bank = await new SearchBankByChurchId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).json(bank);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
