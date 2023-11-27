import { Router } from "express";
import { FinancialConfigurationController } from "../controllers/FinancialConfiguration.controller";
import bankValidator from "../validators/Bank.validator";
import bankBRValidator from "../validators/BankBR.validator";

const financialConfigurationRoute: Router = Router();

financialConfigurationRoute.post("/cost-center", async (req, res) => {
  await FinancialConfigurationController.createOrUpdateCostCenter(
    req.body,
    res,
  );
});

financialConfigurationRoute.get(
  "/cost-center/:costCenterId",
  async (req, res) => {
    await FinancialConfigurationController.findCostCenterByCostCenterId(
      req.params.costCenterId,
      res,
    );
  },
);

//TODO sera necesario crear endpoint por pais para el registro de banco?
financialConfigurationRoute.post(
  "/bank",
  [bankValidator, bankBRValidator],
  async (req, res) => {
    await FinancialConfigurationController.createOrUpdateBank(req.body, res);
  },
);

financialConfigurationRoute.get("/bank/:bankId", async (req, res) => {
  await FinancialConfigurationController.findBankByBankId(
    req.params.bankId,
    res,
  );
});

export default financialConfigurationRoute;
