import { Request, Response, Router } from "express";
import ministerValidator from "../validators/Mininister.validator";
import { MinisterController } from "../controllers/Minister.controller";
import { MinisterPaginateRequest } from "../requests/MinisterPaginate.request";

const ministerRoute: Router = Router();

ministerRoute.post(
  "/",
  ministerValidator,
  async (req: Request, res: Response): Promise<void> => {
    await MinisterController.createOrUpdate(req.body, res);
  },
);

ministerRoute.get("/", async (req: Request, res: Response): Promise<void> => {
  const params = req.query as unknown as MinisterPaginateRequest;
  await MinisterController.search(params, res);
});

ministerRoute.get(
  "/:ministerDni",
  async (req: Request, res: Response): Promise<void> => {
    await MinisterController.findByDNI(req.params.ministerDni, res);
  },
);

export default ministerRoute;
