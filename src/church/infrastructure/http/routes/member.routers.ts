import { Router } from "express";
import { MemberController } from "../controllers/Member.controller";
import { MemberPaginateRequest } from "../requests/MemberPaginate.request";

const memberRoute: Router = Router();

memberRoute.post("/", async (req, res) => {
  await MemberController.createOrUpdate(req.body, res);
});

memberRoute.get("/list", async (req, res) => {
  const params = req.query as unknown as MemberPaginateRequest;
  await MemberController.list(params, res);
});

memberRoute.get("/:memberId", async (req, res) => {
  res.send("memberRoute detail");
});

export default memberRoute;
