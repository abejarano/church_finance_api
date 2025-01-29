import { Router } from "express"
import { PermissionMiddleware } from "../../../../Shared/infrastructure"
import ContributionValidator from "../validators/Contribution.validator"
import {
  listOnlineContributionsController,
  onlineContributionsController,
  UpdateContributionStatusController,
} from "../controllers/OnlineContribution.controller"
import {
  ContributionRequest,
  FilterContributionsRequest,
  OnlineContributionsStatus,
} from "../../../domain"

const financeContribution = Router()

financeContribution.post(
  "",
  [PermissionMiddleware, ContributionValidator],
  async (req, res) => {
    await onlineContributionsController(
      {
        ...(req.body as ContributionRequest),
        bankTransferReceipt: req.files.file,
      },
      res
    )
  }
)

financeContribution.get("", PermissionMiddleware, async (req, res) => {
  let filter = {
    ...(req.query as unknown as FilterContributionsRequest),
  }

  if (req["user"].isSuperuser && filter.churchId === undefined) {
    delete filter.churchId
  } else {
    filter.churchId = req["user"].churchId
  }

  await listOnlineContributionsController(filter, res)
})

financeContribution.patch(
  "/:contributionId/status/:status",
  PermissionMiddleware,
  async (req, res) => {
    const { contributionId, status } = req.params

    await UpdateContributionStatusController(
      contributionId,
      status as OnlineContributionsStatus,
      res
    )
  }
)

export default financeContribution
