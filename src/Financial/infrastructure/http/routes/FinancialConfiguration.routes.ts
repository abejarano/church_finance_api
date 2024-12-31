import { Router } from "express";
import { FinancialConfigurationController } from "../controllers/FinancialConfiguration.controller";
import bankValidator from "../validators/Bank.validator";
import bankBRValidator from "../validators/BankBR.validator";
import { BankRequest, ConceptType, CostCenterRequest } from "../../../domain";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";

const financialConfigurationRoute = Router();

financialConfigurationRoute.post(
  "/cost-center",
  PermissionMiddleware,
  async (req, res) => {
    await FinancialConfigurationController.createOrUpdateCostCenter(
      req.body as CostCenterRequest,
      res,
    );
  },
);

financialConfigurationRoute.get("/cost-center/:churchId", async (req, res) => {
  const { churchId } = req.params as any;
  await FinancialConfigurationController.findCostCenterByChurchId(
    churchId,
    res,
  );
});

//TODO sera necesario crear endpoint por pais para el registro de banco?
financialConfigurationRoute.post(
  "/bank",
  [PermissionMiddleware, bankValidator, bankBRValidator],
  async (req, res) => {
    await FinancialConfigurationController.createOrUpdateBank(
      req.body as BankRequest,
      res,
    );
  },
);

financialConfigurationRoute.get("/bank/:churchId", async (req, res) => {
  const { churchId } = req.params as any;
  await FinancialConfigurationController.listBankByChurchId(churchId, res);
});

financialConfigurationRoute.get("/bank/data/:bankId", async (req, res) => {
  const { bankId } = req.params as any;
  await FinancialConfigurationController.findBankByBankId(bankId, res);
});

financialConfigurationRoute.get(
  "/financial-concepts/:churchId/:typeConcept?",
  async (req, res) => {
    const { churchId, typeConcept } = req.params as any;
    const typeConcepts = typeConcept ? typeConcept : undefined;
    await FinancialConfigurationController.findFinancialConceptsByChurchIdAndTypeConcept(
      churchId,
      res,
      typeConcept as ConceptType,
    );
  },
);

export default financialConfigurationRoute;
