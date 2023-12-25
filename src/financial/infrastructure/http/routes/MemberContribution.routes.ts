import { Router } from "express";
import { OnlineContributionController } from "../controllers/OnlineContribution.controller";
import { ContributionRequest } from "../../../domain";
import { FilterContributionsRequest } from "../../../domain/requests/FilterContributions.request";
import { AppAuthMiddleware } from "../../../../shared/infrastructure";
import ContributionValidator from "../validators/Contribution.validator";

const memberContributionsRoutes: Router = Router();

memberContributionsRoutes.post(
  "/",
  [AppAuthMiddleware, ContributionValidator],
  async (req, res) => {
    await OnlineContributionController.onlineContributions(
      {
        ...(req.body as ContributionRequest),
        memberId: req["member"].memberId,
      },
      res,
    );
  },
);

memberContributionsRoutes.get("/", async (req, res) => {
  await OnlineContributionController.listOnlineContributions(
    req.query as unknown as FilterContributionsRequest,
    res,
  );
});

export default memberContributionsRoutes;
