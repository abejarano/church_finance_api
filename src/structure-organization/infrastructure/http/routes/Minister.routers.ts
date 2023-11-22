import { Request, Response, Router } from "express";
import ministerValidator from "../validators/Mininister.validator";
import { MinisterController } from "../controllers/Minister.controller";

const ministerRoute: Router = Router();

ministerRoute.post(
  "/minister",
  ministerValidator,
  async (req: Request, res: Response): Promise<void> => {
    await MinisterController.createOrUpdate(req.body, res);
  },
);

ministerRoute.post(
  "/minister/:ministerId",
  async (req: Request, res: Response): Promise<void> => {
    await MinisterController.findById(req.params.ministerId, res);
  },
);

export default ministerRoute;
