import { Router } from "express";
import { MemberController } from "../controllers/Member.controller";

const memberRoute: Router = Router();

memberRoute.post("/", async (req, res) => {
  await MemberController.createOrUpdate(req.body, res);
});

memberRoute.get("/", async (req, res) => {
  res.send("memberRoute");
});

memberRoute.get("/:memberId", async (req, res) => {
  res.send("memberRoute");
});

export default memberRoute;
