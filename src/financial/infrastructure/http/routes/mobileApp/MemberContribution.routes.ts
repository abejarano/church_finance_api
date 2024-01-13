import {
  listOnlineContributionsController,
  onlineContributionsController,
} from "../../controllers/OnlineContribution.controller";
import {
  ContributionRequest,
  FilterContributionsRequest,
} from "../../../../domain";
import { AppAuthMiddleware } from "../../../../../shared/infrastructure";
import { FastifyInstance } from "fastify";
import ContributionValidator from "../../validators/Contribution.validator";

const memberContributionsRoutes = async (fastify: FastifyInstance) => {
  fastify
    .post("/", async (req, res) => {
      await onlineContributionsController(
        {
          ...(req.body as ContributionRequest),
          memberId: req["member"].memberId,
        },
        res,
      );
    })
    .addHook("preValidation", AppAuthMiddleware)
    .addHook("preValidation", ContributionValidator);

  fastify.get("/", { preHandler: AppAuthMiddleware }, async (req, res) => {
    await listOnlineContributionsController(
      {
        ...(req.query as unknown as FilterContributionsRequest),
        memberId: req["member"].memberId,
      },
      res,
    );
  });
};

export default memberContributionsRoutes;
