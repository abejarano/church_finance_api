import { MinisterRequest } from '../../../domain'
import { AssignChurch, RegisterOrUpdateMinister } from '../../../applications'
import { HttpStatus } from '../../../../Shared/domain'
import domainResponse from '../../../../Shared/helpers/domainResponse'
import { MinisterMongoRepository } from '../../persistence/MinisterMongoRepository'
import { ChurchMongoRepository } from '../../persistence/ChurchMongoRepository'

export class MinisterController {
  static async createOrUpdate(request: MinisterRequest, res) {
    try {
      await new RegisterOrUpdateMinister(
        MinisterMongoRepository.getInstance(),
      ).execute(request)

      res.status(HttpStatus.CREATED).send({
        message: 'Registered minister',
      })
    } catch (e) {
      domainResponse(e, res)
    }
  }

  static async assignChurch(
    payload: { churchId: string; ministerId: string },
    res,
  ) {
    try {
      await new AssignChurch(
        MinisterMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(payload.ministerId, payload.churchId)

      res.status(HttpStatus.OK).send({ message: 'Assigned church' })
    } catch (e) {
      domainResponse(e, res)
    }
  }
}
