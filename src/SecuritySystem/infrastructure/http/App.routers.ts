import { AppController } from "./controllers/App.controller";
import { Router } from "express";

const appRouters = Router();

appRouters.post("/login", async (req, res) => {
  await AppController.loginApp(req.body as any, res);
});

export default appRouters;
