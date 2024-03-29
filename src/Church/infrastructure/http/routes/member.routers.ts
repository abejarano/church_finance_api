import { MemberController } from "../controllers/Member.controller";
import { MemberPaginateRequest } from "../requests/MemberPaginate.request";
import { FastifyInstance } from "fastify";
import { MemberRequest } from "../requests/Member.request";
import { PermissionMiddleware } from "../../../../Shared/infrastructure/middleware/Permission.middleware";

const memberRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      await MemberController.createOrUpdate(req.body as MemberRequest, res);
    },
  );

  fastify.get(
    "/list",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      const params = req.query as unknown as MemberPaginateRequest;
      await MemberController.list(params, res);
    },
  );

  fastify.get(
    "/:memberId",
    {
      preHandler: PermissionMiddleware,
    },
    async (req, res) => {
      const { memberId } = req.params as any;
      await MemberController.findById(memberId, res);
    },
  );
};

export default memberRoute;
