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
import FinancialRecordValidator from "../validators/FinancialRecord.validator";
import { FinancialRecordController } from "../controllers/FinancialRecord.controller";

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

financeRoute.post(
  "/financial-record",
  [PermissionMiddleware, FinancialRecordValidator],
  async (req, res) => {
    await FinancialRecordController(
      { ...req.body, churchId: req["user"].churchId, file: req?.files?.file },
      res,
    );
  },
);

export default financeRoute;
