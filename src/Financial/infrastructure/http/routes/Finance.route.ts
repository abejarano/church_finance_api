import { Router } from "express";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";
import { listOnlineContributionsController } from "../controllers/OnlineContribution.controller";
import { FilterContributionsRequest } from "../../../domain";

const financeRoute = Router();

financeRoute.get("/", PermissionMiddleware, async (req, res) => {
  let filter = {
    ...(req.query as unknown as FilterContributionsRequest),
    churchId: req["churchId"].churchId,
  };

  if (req["user"].isSuperuser) {
    delete filter.churchId;
  }

  await listOnlineContributionsController(filter, res);
});

export default financeRoute;
