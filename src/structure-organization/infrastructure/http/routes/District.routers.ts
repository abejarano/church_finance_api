import { Request, Response, Router } from "express";
import { DistrictController } from "../controllers/District.controller";
import districtValidator from "../validators/District.validator";
import { DistrictPaginateRequest } from "../requests/DistrictPaginate.request";

const districtRoute: Router = Router();

districtRoute.post(
  "/",
  districtValidator,
  async (req: Request, res: Response): Promise<void> => {
    await DistrictController.createOrUpdate(req.body, res);
  },
);

districtRoute.get("/", async (req: Request, res: Response): Promise<void> => {
  const params = req.query as unknown as DistrictPaginateRequest;
  await DistrictController.search(params, res);
});

districtRoute.get(
  "/:districtId",
  async (req: Request, res: Response): Promise<void> => {
    await DistrictController.findByDistrictId(req.params.districtId, res);
  },
);

export default districtRoute;
