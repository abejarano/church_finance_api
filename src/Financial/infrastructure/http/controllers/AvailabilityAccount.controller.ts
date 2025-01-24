import { AvailabilityAccountRequest } from '../../../domain'
import {
  CreateOrUpdateAvailabilityAccount,
  SearchAvailabilityAccountByChurchId,
} from '../../../applications'
import { AvailabilityAccountMongoRepository } from '../../persistence'
import { HttpStatus } from '../../../../Shared/domain'
import domainResponse from '../../../../Shared/helpers/domainResponse'
import { Response } from 'express'

export const createOrUpdateAvailabilityAccount = async (
  request: AvailabilityAccountRequest,
  res: Response,
) => {
  try {
    await new CreateOrUpdateAvailabilityAccount(
      AvailabilityAccountMongoRepository.getInstance(),
    ).execute(request)

    if (!request.availabilityAccountId) {
      res.status(HttpStatus.CREATED).send({
        message: 'Registered availability account',
      })
      return
    }

    res.status(HttpStatus.OK).send({
      message: 'Updated availability account',
    })
  } catch (e) {
    domainResponse(e, res)
  }
}

export const listAvailabilityAccountByChurchId = async (
  churchId: string,
  res: Response,
) => {
  try {
    const availabilityAccount = await new SearchAvailabilityAccountByChurchId(
      AvailabilityAccountMongoRepository.getInstance(),
    ).execute(churchId)

    res.status(HttpStatus.OK).send(availabilityAccount)
  } catch (e) {
    domainResponse(e, res)
  }
}
