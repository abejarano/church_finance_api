import { Request, Response, Router } from "express";
import { DistrictController } from "./controllers/update-or-create-district.controller";
import districtValidator from "./validators/district.validator";
import { DistrictPaginateRequest } from "./requests/district-paginate.request";

const structureOrganizationRoute: Router = Router();

structureOrganizationRoute.post(
  "/district",
  districtValidator,
  async (req: Request, res: Response): Promise<void> => {
    await DistrictController.createOrUpdate(req.body, res);
  },
);

structureOrganizationRoute.get(
  "/district",
  async (req: Request, res: Response): Promise<void> => {
    const params = req.query as unknown as DistrictPaginateRequest;
    await DistrictController.search(params, res);
  },
);

structureOrganizationRoute.get(
  "/district/:districtId",
  async (req: Request, res: Response): Promise<void> => {
    await DistrictController.findByDistrictId(req.params.districtId, res);
  },
);

export default structureOrganizationRoute;
