import { Router } from "express";
import { AppController } from "./controllers/App.controller";

const appRouters = Router();

appRouters.post("/login", async (req, res) => {
  await AppController.loginApp(req.body, res);
});

export default appRouters;
