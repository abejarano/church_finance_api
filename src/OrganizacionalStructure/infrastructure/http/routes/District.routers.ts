import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { DistrictController } from "../controllers/District.controller";
import districtValidator from "../validators/District.validator";
import { DistrictPaginateRequest } from "../requests/DistrictPaginate.request";
import { DistrictStructureType } from "../../../domain";

const districtRoute = async (fastify: FastifyInstance) => {
  const createOrUpdateOptions: RouteShorthandOptions = {
    preHandler: districtValidator,
  };

  fastify.post("/", createOrUpdateOptions, async (request, reply) => {
    await DistrictController.createOrUpdate(
      request.body as DistrictStructureType,
      reply,
    );
  });

  fastify.get("/", async (request, reply) => {
    const params = request.query as DistrictPaginateRequest;
    await DistrictController.search(params, reply);
  });

  fastify.get("/:districtId", async (request, reply) => {
    const { districtId } = request.params as any;

    await DistrictController.findByDistrictId(districtId, reply);
  });
};

export default districtRoute;
