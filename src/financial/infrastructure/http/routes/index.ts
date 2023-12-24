import { Router } from "express";
import memberContributionsRoutes from "./MemberContribution.routes";
import financialConfigurationRoute from "./FinancialConfiguration.routes";

const financialRouter: Router = Router();

financialRouter.use("/member-contributions", memberContributionsRoutes);
financialRouter.use("/configuration", financialConfigurationRoute);

export default financialRouter;
