import { Router } from "express"

import { PermissionMiddleware } from "@/Shared/infrastructure"
import {
  CreateAccountReceivableController,
  ListAccountReceivableController,
  PayAccountReceivableController,
} from "@/AccountsReceivable/infrastructure/http/controllers"
import { FilterAccountReceivableRequest } from "@/AccountsReceivable/domain"
import PayAccountReceivableValidator from "@/AccountsReceivable/infrastructure/http/validators/PayAccountReceivable.validator"
import { AmountValue } from "@/Shared/domain"

const accountReceivableRoutes = Router()

accountReceivableRoutes.post("/", PermissionMiddleware, async (req, res) => {
  await CreateAccountReceivableController(req.body, res)
})

accountReceivableRoutes.get("", PermissionMiddleware, async (req, res) => {
  await ListAccountReceivableController(
    { ...(req.query as unknown as FilterAccountReceivableRequest) },
    res
  )
})

accountReceivableRoutes.post(
  "/pay",
  [PermissionMiddleware, PayAccountReceivableValidator],
  async (req, res) => {
    await PayAccountReceivableController(
      {
        ...req.body,
        amount: AmountValue.create(req.body.amount),
        file: req?.files?.file,
      },
      res
    )
  }
)

export default accountReceivableRoutes
