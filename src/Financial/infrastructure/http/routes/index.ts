import { Router } from "express";
import financialConfigurationRoute from "./FinancialConfiguration.routes";
import memberContributionsRoutes from "./MemberContribution.routes";

const financialRouter = Router();

financialRouter.use("/member-contributions", memberContributionsRoutes);
financialRouter.use("/configuration", financialConfigurationRoute);

export default financialRouter;
