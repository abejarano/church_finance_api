import { Request, Response, Router } from "express";
import { RegionController } from "../controllers/Region.controller";
import { RegionPaginateRequest } from "../requests/RegionPaginate.request";

const regionRoute: Router = Router();

regionRoute.post("/", async (req: Request, res: Response): Promise<void> => {
  await RegionController.createOrUpdate(req.body, res);
});

regionRoute.get("/", async (req: Request, res: Response): Promise<void> => {
  const params = req.query as unknown as RegionPaginateRequest;
  await RegionController.search(params, res);
});

regionRoute.get(
  "/:regionId",
  async (req: Request, res: Response): Promise<void> => {
    res.send("regionRoute");
  },
);

export default regionRoute;
