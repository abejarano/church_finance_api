import { Router } from "express";
import { OnlineContributionController } from "../controllers/OnlineContribution.controller";
import { ContributionRequest } from "../../../domain";
import { FilterContributionsRequest } from "../../../domain/requests/FilterContributions.request";

const memberOnlineContributionsRoutes: Router = Router();

memberOnlineContributionsRoutes.post(
  "/online-contributions",
  async (req, res) => {
    await OnlineContributionController.onlineContributions(
      req.body as ContributionRequest,
      res,
    );
  },
);

memberOnlineContributionsRoutes.get(
  "/online-contributions",
  async (req, res) => {
    await OnlineContributionController.listOnlineContributions(
      req.query as unknown as FilterContributionsRequest,
      res,
    );
  },
);
