import { Router } from 'express'
import { PermissionMiddleware } from '../../../../Shared/infrastructure'
import { FilterFinanceRecordRequest } from '../../../domain'
import FinancialRecordValidator from '../validators/FinancialRecord.validator'
import { FinancialRecordController } from '../controllers/FinancialRecord.controller'
import { FinanceRecordListController } from '../controllers/FinanceRecordList.controller'

const financialRecordRoutes = Router()

financialRecordRoutes.post(
  '/financial-record',
  [PermissionMiddleware, FinancialRecordValidator],
  async (req, res) => {
    await FinancialRecordController(
      {
        ...req.body,
        churchId: req['user'].churchId,
        file: req?.files?.file,
      },
      res,
    )
  },
)

financialRecordRoutes.get(
  '/financial-record',
  PermissionMiddleware,
  async (req, res) => {
    const params = req.query as unknown as FilterFinanceRecordRequest
    await FinanceRecordListController(params, res)
  },
)

export default financialRecordRoutes
