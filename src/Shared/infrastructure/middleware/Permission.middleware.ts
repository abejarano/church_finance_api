import { HttpStatus } from "../../domain";
import { ProfileMongoRepository } from "../../../SecuritySystem/infrastructure";
import { UserAuthDTO } from "../../../SecuritySystem/domain";
import { ValidateActionInSystem } from "../../../SecuritySystem/applications";
import { logger } from "../index";
import jwt = require("jsonwebtoken");

export const PermissionMiddleware = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. Token not provided." });
  }

  try {
    req["user"] = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ message: "Invalid token." });
  }

  const user: UserAuthDTO = req["user"] as UserAuthDTO;

  let URL = `${req.url}`.split("?")[0].replace(/\/$/, "");

  for (const urlKey in req.params) {
    URL = URL.replace(`/${req.params[urlKey]}`, "");
  }

  logger.info(`Usuario: ${user.email} - perfil:`, user.profileId);
  logger.info(`URL: ${URL} - METHOD: ${req.method.toUpperCase()}`);

  if (user.isSuperuser) {
    logger.info(`Usuario: ${user.email} es superusuario`);
    return;
  }

  try {
    await new ValidateActionInSystem(
      ProfileMongoRepository.getInstance(),
    ).execute(user.profileId, URL, req.method.toUpperCase());
    return;
  } catch (e) {}

  return res.status(HttpStatus.FORBIDDEN).send({
    message: "Acceso denegado. No tiene permisos para realizar esta acción.",
  });
};
