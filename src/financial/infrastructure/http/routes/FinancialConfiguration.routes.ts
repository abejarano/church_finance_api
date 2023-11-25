import { Router } from "express";
import { FinancialConfigurationController } from "../controllers/FinancialConfiguration.controller";

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

export default financialConfigurationRoute;
