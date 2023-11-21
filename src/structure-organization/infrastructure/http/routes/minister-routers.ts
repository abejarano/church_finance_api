import { Request, Response, Router } from "express";
import districtValidator from "../validators/district.validator";
import { DistrictController } from "../controllers/update-or-create-district.controller";

const ministerRoute: Router = Router();

ministerRoute.post(
  "/minister",
  districtValidator,
  async (req: Request, res: Response): Promise<void> => {
    await DistrictController.createOrUpdate(req.body, res);
  },
);

export default ministerRoute;
