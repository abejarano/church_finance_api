import { Router } from "express";
import { OnlineContributionController } from "../controllers/OnlineContribution.controller";
import { ContributionRequest } from "../../../domain";
import { FilterContributionsRequest } from "../../../domain/requests/FilterContributions.request";

const memberContributionsRoutes: Router = Router();

memberContributionsRoutes.post("/", async (req, res) => {
  await OnlineContributionController.onlineContributions(
    req.body as ContributionRequest,
    res,
  );
});

memberContributionsRoutes.get("/", async (req, res) => {
  await OnlineContributionController.listOnlineContributions(
    req.query as unknown as FilterContributionsRequest,
    res,
  );
});

export default memberContributionsRoutes;
