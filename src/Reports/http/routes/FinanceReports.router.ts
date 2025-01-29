import { Router } from "express"
import { TithesController } from "../controllers/Tithes.controller"
import { PermissionMiddleware } from "../../../Shared/infrastructure"
import { MonthlyTithesRequest } from "../../requests"

const reportFinanceRouter = Router()

reportFinanceRouter.get(
  "/monthly-tithes",
  PermissionMiddleware,
  async (req, res) => {
    await TithesController(req.query as unknown as MonthlyTithesRequest, res)
  }
)

export default reportFinanceRouter
