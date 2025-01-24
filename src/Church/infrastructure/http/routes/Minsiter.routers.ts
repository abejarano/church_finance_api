import { Router } from 'express'
import { PermissionMiddleware } from '../../../../Shared/infrastructure'
import AssignChurchValidator from '../validators/AssignChurch.validator'
import { MinisterController } from '../controllers/Minister.controller'
import { MinisterRequest } from '../../../domain'
import MinisterValidator from '../validators/Mininister.validator'

const ministerRoute = Router()

ministerRoute.post(
  '/',
  [PermissionMiddleware, MinisterValidator],
  async (req, res): Promise<void> => {
    await MinisterController.createOrUpdate(req.body as MinisterRequest, res)
  },
)

ministerRoute.post(
  '/assign-church',
  [PermissionMiddleware, AssignChurchValidator],
  async (req, res): Promise<void> => {
    await MinisterController.assignChurch(
      req.body as { churchId: string; ministerId: string },
      res,
    )
  },
)

export default ministerRoute
