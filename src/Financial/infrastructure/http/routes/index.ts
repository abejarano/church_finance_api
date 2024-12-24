import { Router } from "express";
import financialConfigurationRoute from "./FinancialConfiguration.routes";
import memberContributionsRoutes from "./mobileApp/MemberContribution.routes";
import financeRoute from "./Finance.route";

const financialRouter = Router();

financialRouter.use("/member-contributions", memberContributionsRoutes);
financialRouter.use("/configuration", financialConfigurationRoute);
financialRouter.use("/admin", financeRoute);

export default financialRouter;
