import { MemberController } from "../controllers/Member.controller";
import { MemberPaginateRequest } from "../requests/MemberPaginate.request";
import { FastifyInstance } from "fastify";
import { MemberRequest } from "../requests/Member.request";

const memberRoute = async (fastify: FastifyInstance) => {
  fastify.post("/", async (req, res) => {
    await MemberController.createOrUpdate(req.body as MemberRequest, res);
  });

  fastify.get("/list", async (req, res) => {
    const params = req.query as unknown as MemberPaginateRequest;
    await MemberController.list(params, res);
  });

  fastify.get("/:memberId", async (req, res) => {
    const { memberId } = req.params as any;
    await MemberController.findById(memberId, res);
  });
};

export default memberRoute;
