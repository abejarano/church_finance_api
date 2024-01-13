import memberContributionsRoutes from "./mobileApp/MemberContribution.routes";
import financialConfigurationRoute from "./mobileApp/FinancialConfiguration.routes";
import { FastifyInstance } from "fastify";

const financialRouter = async (fastify: FastifyInstance) => {
  fastify.register(memberContributionsRoutes, {
    prefix: "/member-contributions",
  });
  fastify.register(financialConfigurationRoute, { prefix: "/configuration" });
};
export default financialRouter;
