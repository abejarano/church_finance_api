import domainResponse from "../../../../Shared/helpers/domainResponse";
import { BankRequest, ConceptType, CostCenterRequest } from "../../../domain";
import {
  CreateOrUpdateBank,
  CreateOrUpdateCostCenter,
  FinBankByBankId,
  FindCostCenterByChurchId,
  FindFinancialConceptsByChurchIdAndTypeConcept,
  SearchBankByChurchId,
} from "../../../applications";
import { FinancialConfigurationMongoRepository } from "../../persistence/FinancialConfigurationMongoRepository";
import { HttpStatus } from "../../../../Shared/domain";
import { ChurchMongoRepository } from "../../../../Church/infrastructure";

export class FinancialConfigurationController {
  static async findCostCenterByChurchId(churchId: string, res) {
    try {
      const costCenter = await new FindCostCenterByChurchId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).send({ data: costCenter });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async createOrUpdateCostCenter(costCenter: CostCenterRequest, res) {
    try {
      await new CreateOrUpdateCostCenter(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(costCenter);

      if (!costCenter.costCenterId) {
        res
          .status(HttpStatus.CREATED)
          .send({ message: "Registered cost center" });
        return;
      }

      res.status(HttpStatus.OK).send({ message: "Updated cost center" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async createOrUpdateBank(request: BankRequest, res) {
    try {
      await new CreateOrUpdateBank(
        FinancialConfigurationMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(request);

      if (!request.bankId) {
        res.status(HttpStatus.CREATED).send({ message: "Registered bank" });
      } else {
        res.status(HttpStatus.OK).send({ message: "Updated bank" });
      }
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findBankByBankId(bankId: string, res) {
    try {
      const bank = await new FinBankByBankId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(bankId);

      res.status(HttpStatus.OK).send({ data: bank });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findFinancialConceptsByChurchIdAndTypeConcept(
    churchId: string,
    res,
    typeConcept?: ConceptType,
  ) {
    try {
      const financial = await new FindFinancialConceptsByChurchIdAndTypeConcept(
        FinancialConfigurationMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(churchId, typeConcept);

      res.status(HttpStatus.OK).send(financial);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async listBankByChurchId(churchId: string, res) {
    try {
      const bank = await new SearchBankByChurchId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).send(bank);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
