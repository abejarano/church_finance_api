import { Request, Response, Router } from "express";
import { UpdateOrCreateDistrictController } from "./controllers/update-or-create-district.controller";
import { DistrictStructureType } from "../../domain/types/district-structure.type";
import districtValidator from "./validators/district.validator";

const structureOrganizationRoute: Router = Router();

structureOrganizationRoute.post(
  "/district",
  districtValidator,
  async (req: Request, res: Response): Promise<void> => {
    await UpdateOrCreateDistrictController.handle(req.body, res);
  },
);

export default structureOrganizationRoute;
