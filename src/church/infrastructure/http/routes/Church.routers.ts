import { Router } from "express";
import { ChurchController } from "../controllers/Church.controller";

const churchRoute: Router = Router();

churchRoute.post("/", async (req, res) => {
  await ChurchController.createOrUpdate(req.body, res);
});

churchRoute.get("/", async (req, res) => {
  res.status(200).json({});
});

churchRoute.get("/:churchId", async (req, res) => {
  res.status(200).json({});
});

export default churchRoute;
