import { Router } from "express";
import { ChurchController } from "../controllers/Church.controller";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";

const churchRoute: Router = Router();

churchRoute.post("/", async (req, res) => {
  await ChurchController.createOrUpdate(req.body, res);
});

churchRoute.get("/", async (req, res) => {
  const params = req.query as unknown as ChurchPaginateRequest;
  await ChurchController.list(params, res);
});

churchRoute.get("/:churchId", async (req, res) => {
  res.status(200).json({});
});

export default churchRoute;
