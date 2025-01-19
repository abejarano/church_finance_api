import domainResponse from "../../../../Shared/helpers/domainResponse";
import {
  AvailabilityAccountRequest,
  BankRequest,
  ConceptType,
  CostCenterRequest,
} from "../../../domain";
import {
  CreateOrUpdateAvailabilityAccount,
  CreateOrUpdateBank,
  FinBankByBankId,
  FindCostCenterByChurchId,
  FindFinancialConceptsByChurchIdAndTypeConcept,
  SearchAvailabilityAccountByChurchId,
  SearchBankByChurchId,
} from "../../../applications";
import { FinancialConfigurationMongoRepository } from "../../persistence";
import { HttpStatus } from "../../../../Shared/domain";
import {
  ChurchMongoRepository,
  MemberMongoRepository,
} from "../../../../Church/infrastructure";
import {
  CreateCostCenter,
  UpdateCostCenter,
} from "../../../applications/financialConfiguration";

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

  static async createCostCenter(costCenter: CostCenterRequest, res) {
    try {
      await new CreateCostCenter(
        FinancialConfigurationMongoRepository.getInstance(),
        MemberMongoRepository.getInstance(),
      ).execute(costCenter);

      res
        .status(HttpStatus.CREATED)
        .send({ message: "Registered cost center" });
      return;
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async updateCostCenter(costCenter: CostCenterRequest, res) {
    try {
      await new UpdateCostCenter(
        FinancialConfigurationMongoRepository.getInstance(),
        MemberMongoRepository.getInstance(),
      ).execute(costCenter);

      res
        .status(HttpStatus.CREATED)
        .send({ message: "Registered cost center" });
      return;
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

  static async listAvailabilityAccountByChurchId(churchId: string, res) {
    try {
      const availabilityAccount = await new SearchAvailabilityAccountByChurchId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).send(availabilityAccount);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async createOrUpdateAvailabilityAccount(
    request: AvailabilityAccountRequest,
    res,
  ) {
    try {
      await new CreateOrUpdateAvailabilityAccount(
        FinancialConfigurationMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(request);

      if (!request.availabilityAccountId) {
        res
          .status(HttpStatus.CREATED)
          .send({ message: "Registered availability account" });
        return;
      }

      res
        .status(HttpStatus.OK)
        .send({ message: "Updated availability account" });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
