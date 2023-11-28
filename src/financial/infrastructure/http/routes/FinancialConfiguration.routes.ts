import { Router } from "express";
import { FinancialConfigurationController } from "../controllers/FinancialConfiguration.controller";
import bankValidator from "../validators/Bank.validator";
import bankBRValidator from "../validators/BankBR.validator";
import { ConceptType } from "../../../domain/enums/ConcepType.enum";

const financialConfigurationRoute: Router = Router();

financialConfigurationRoute.post("/cost-center", async (req, res) => {
  await FinancialConfigurationController.createOrUpdateCostCenter(
    req.body,
    res,
  );
});

financialConfigurationRoute.get("/cost-center/:churchId", async (req, res) => {
  await FinancialConfigurationController.findCostCenterByChurchId(
    req.params.churchId,
    res,
  );
});

//TODO sera necesario crear endpoint por pais para el registro de banco?
financialConfigurationRoute.post(
  "/bank",
  [bankValidator, bankBRValidator],
  async (req, res) => {
    await FinancialConfigurationController.createOrUpdateBank(req.body, res);
  },
);

financialConfigurationRoute.get("/bank/:churchId", async (req, res) => {
  await FinancialConfigurationController.listBankByChurchId(
    req.params.churchId,
    res,
  );
});

financialConfigurationRoute.get("/bank/data/:bankId", async (req, res) => {
  await FinancialConfigurationController.findBankByBankId(
    req.params.bankId,
    res,
  );
});

financialConfigurationRoute.get(
  "/financial-concepts/:churchId/:typeConcept",
  async (req, res) => {
    await FinancialConfigurationController.findFinancialConceptsByChurchIdAndTypeConcept(
      req.params.churchId,
      req.params.typeConcept as ConceptType,
      res,
    );
  },
);

export default financialConfigurationRoute;
