import { CreateOrUpdateUser, MakeLogin } from '../../../applications'
import { UserMongoRepository } from '../../persistence/UserMongoRepository'
import { PasswordAdapter } from '../../adapters/Password.adapter'
import { AuthTokenAdapter } from '../../adapters/AuthToken.adapter'
import { HttpStatus } from '../../../../Shared/domain'
import { logger } from '../../../../Shared/infrastructure'
import domainResponse from '../../../../Shared/helpers/domainResponse'
import { CreateUserRequest, FilterUserRequest } from '../../../domain'
import { FetchAllUsers } from '../../../applications/finder/FetchAllUsers'

export type userLoginPayload = {
  email: string
  password: string
}

export class UserController {
  static async login(payload: userLoginPayload, res) {
    try {
      const [user, dataToken] = await new MakeLogin(
        UserMongoRepository.getInstance(),
        new PasswordAdapter(),
        new AuthTokenAdapter(),
      ).execute(payload.email, payload.password)

      const responseUser = user.toPrimitives()

      delete responseUser.password

      res.status(HttpStatus.OK).send({
        ...responseUser,
        token: dataToken,
      })
    } catch (e) {
      logger.error(`login error`, e)
      domainResponse(e, res)
    }
  }

  static async createOrUpdateUser(payload: CreateUserRequest, res) {
    try {
      const user = await new CreateOrUpdateUser(
        UserMongoRepository.getInstance(),
        new PasswordAdapter(),
      ).execute(payload)

      const response = user.toPrimitives()
      delete response.password

      res.status(HttpStatus.OK).json({
        message: 'Usuario actualizado',
        data: response,
      })
    } catch (e) {
      logger.error(`create usuario error`, e)
      domainResponse(e, res)
    }
  }

  static async fetchAllUser(req: FilterUserRequest, res) {
    try {
      const result = await new FetchAllUsers(
        UserMongoRepository.getInstance(),
      ).execute(req)

      res.status(HttpStatus.OK).send({
        data: result,
      })
    } catch (e) {
      logger.error(`fetch all user error`, e)
      domainResponse(e, res)
    }
  }
}
