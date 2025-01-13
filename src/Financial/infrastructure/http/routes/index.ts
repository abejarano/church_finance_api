import { Router } from "express";
import financialConfigurationRoute from "./FinancialConfiguration.routes";
import financeRoute from "./Finance.route";

const financialRouter = Router();

financialRouter.use("/configuration", financialConfigurationRoute);
financialRouter.use("/", financeRoute);

export default financialRouter;
