import { Router } from "express";

const securitySystemRouter = Router();

securitySystemRouter.get("/users", (req, res) => {
  res.json({ message: "Hello World!" });
});

securitySystemRouter.post("/users", (req, res) => {
  res.json({ message: "Hello World!" });
});

securitySystemRouter.post("/system-modules", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default securitySystemRouter;
