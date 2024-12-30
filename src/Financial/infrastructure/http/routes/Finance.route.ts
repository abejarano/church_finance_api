import { Router } from "express";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";
import {
  listOnlineContributionsController,
  UpdateContributionStatusController,
} from "../controllers/OnlineContribution.controller";
import {
  FilterContributionsRequest,
  OnlineContributionsStatus,
} from "../../../domain";

const financeRoute = Router();

financeRoute.get("/contributions", PermissionMiddleware, async (req, res) => {
  let filter = {
    ...(req.query as unknown as FilterContributionsRequest),
  };

  if (req["user"].isSuperuser && filter.churchId === undefined) {
    delete filter.churchId;
  } else {
    filter.churchId = req["user"].churchId;
  }

  console.log(`Filtering contributions with: ${JSON.stringify(filter)}`);

  await listOnlineContributionsController(filter, res);
});

financeRoute.patch(
  "/contributions/:contributionId/status/:status",
  PermissionMiddleware,
  async (req, res) => {
    const { contributionId, status } = req.params;

    await UpdateContributionStatusController(
      contributionId,
      status as OnlineContributionsStatus,
      res,
    );
  },
);

export default financeRoute;
