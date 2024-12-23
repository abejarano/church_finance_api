import {
  listOnlineContributionsController,
  onlineContributionsController,
} from "../../controllers/OnlineContribution.controller";
import {
  ContributionRequest,
  FilterContributionsRequest,
} from "../../../../domain";
import { AppAuthMiddleware } from "../../../../../Shared/infrastructure";
import { FastifyInstance } from "fastify";
import ContributionValidator from "../../validators/Contribution.validator";
import fastifyMultipart from "fastify-multipart";

const memberContributionsRoutes = async (fastify: FastifyInstance) => {
  fastify.register(fastifyMultipart);

  fastify
    .post(
      "/",
      {
        preValidation: ContributionValidator,
      },
      async (req, res) => {
        await onlineContributionsController(
          {
            ...(req.body as ContributionRequest),
            bankTransferReceipt: req.files["file"],
            memberId: req["member"].memberId,
          },
          res,
        );
      },
    )
    .addHook("preValidation", AppAuthMiddleware);

  fastify.get("/", async (req, res) => {
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
