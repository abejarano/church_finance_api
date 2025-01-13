import { Router } from "express";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";
import {
  listOnlineContributionsController,
  onlineContributionsController,
  UpdateContributionStatusController,
} from "../controllers/OnlineContribution.controller";
import {
  ContributionRequest,
  FilterContributionsRequest,
  FilterFinanceRecordRequest,
  OnlineContributionsStatus,
} from "../../../domain";
import FinancialRecordValidator from "../validators/FinancialRecord.validator";
import { FinancialRecordController } from "../controllers/FinancialRecord.controller";
import { FinanceRecordListController } from "../controllers/FinanceRecordList.controller";
import ContributionValidator from "../validators/Contribution.validator";

const financeRoute = Router();

financeRoute.post(
  "/contributions",
  [PermissionMiddleware, ContributionValidator],
  async (req, res) => {
    await onlineContributionsController(
      {
        ...(req.body as ContributionRequest),
        bankTransferReceipt: req.files.file,
      },
      res,
    );
  },
);

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

financeRoute.get(
  "/financial-record",
  PermissionMiddleware,
  async (req, res) => {
    const params = req.query as unknown as FilterFinanceRecordRequest;
    await FinanceRecordListController(params, res);
  },
);

export default financeRoute;
