import { Router } from "express";
import ContributionValidator from "../validators/Contribution.validator";
import {
  listOnlineContributionsController,
  onlineContributionsController,
} from "../controllers/OnlineContribution.controller";
import {
  ContributionRequest,
  FilterContributionsRequest,
} from "../../../domain";
import { AppAuthMiddleware } from "../../../../Shared/infrastructure";

const memberContributionsRoutes = Router();

memberContributionsRoutes.post(
  "/",
  [AppAuthMiddleware, ContributionValidator],
  async (req, res) => {
    await onlineContributionsController(
      {
        ...(req.body as ContributionRequest),
        bankTransferReceipt: req.files.file,
        memberId: req["member"].memberId,
      },
      res,
    );
  },
);

memberContributionsRoutes.get("/", AppAuthMiddleware, async (req, res) => {
  await listOnlineContributionsController(
    {
      ...(req.query as unknown as FilterContributionsRequest),
      memberId: req["member"].memberId,
    },
    res,
  );
});

export default memberContributionsRoutes;
