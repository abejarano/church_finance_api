import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { ValidateActionInSystem } from "../../../security-system/applications/validate-action-in-system";
import { UserMongoRepository } from "../../../security-system/infrastructure";
import { ActionInSystem, UserAuthDTO } from "../../../security-system/domain";

export const PermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: UserAuthDTO = req["user"] as UserAuthDTO;

  const action = req.header("x-action");
  const URL = req.header("x-origin");

  if (!user.isStaff) {
    return res.status(HttpStatus.FORBIDDEN).json({
      message: "Acesso negado. Você não tem permissão para executar esta ação.",
    });
  }

  if (user.isSuperuser) {
    return next();
  }

  if (
    await new ValidateActionInSystem(UserMongoRepository.getInstance()).execute(
      user.userId,
      URL,
      action as ActionInSystem,
    )
  ) {
    return next();
  }

  return res.status(HttpStatus.FORBIDDEN).json({
    message: "Acesso negado. Você não tem permissão para executar esta ação.",
  });
};
