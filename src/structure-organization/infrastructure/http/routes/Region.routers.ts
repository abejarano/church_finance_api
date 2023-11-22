import { Request, Response, Router } from "express";
import { RegionController } from "../controllers/Region.controller";

const regionRoute: Router = Router();

regionRoute.post("/", async (req: Request, res: Response): Promise<void> => {
  await RegionController.createOrUpdate(req.body, res);
});

regionRoute.get(
  "/:regionId",
  async (req: Request, res: Response): Promise<void> => {
    res.send("regionRoute");
  },
);

export default regionRoute;
