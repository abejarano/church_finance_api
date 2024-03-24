import { ChurchController } from "../controllers/Church.controller";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";
import { FastifyInstance } from "fastify";
import { ChurchRequest } from "../requests/Church.request";

const churchRoute = async (fastify: FastifyInstance) => {
  fastify.post("/", async (req, res) => {
    await ChurchController.createOrUpdate(req.body as ChurchRequest, res);
  });

  fastify.get("/", async (req, res) => {
    const params = req.query as unknown as ChurchPaginateRequest;
    await ChurchController.list(params, res);
  });

  fastify.get("/:churchId", async (req, res) => {
    const { churchId } = req.params as any;
    await ChurchController.findByChurchId(churchId, res);
  });
};

export default churchRoute;
