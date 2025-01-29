import { Response } from "express"
import { ChangePassword, MakeLogin } from "../../../applications"
import { UserMongoRepository } from "../../persistence/UserMongoRepository"
import { PasswordAdapter } from "../../adapters/Password.adapter"
import { AuthTokenAdapter } from "../../adapters/AuthToken.adapter"
import domainResponse from "../../../../Shared/helpers/domainResponse"

export const ChangePasswordController = async (
  req: {
    email: string
    newPassword: string
    oldPassword: string
  },
  res: Response
) => {
  try {
    await new MakeLogin(
      UserMongoRepository.getInstance(),
      new PasswordAdapter(),
      new AuthTokenAdapter()
    ).execute(req.email, req.oldPassword)

    await new ChangePassword(
      UserMongoRepository.getInstance(),
      new PasswordAdapter()
    ).execute(req.email, req.newPassword)

    res.status(200).send({
      message: "Senha alterada com sucesso",
    })
  } catch (e) {
    domainResponse(e, res)
  }
}
