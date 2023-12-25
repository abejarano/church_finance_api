import { FastifyInstance } from "fastify";
import districtRoute from "./District.routers";
import ministerRoute from "./Minister.routers";
import regionRoute from "./Region.routers";

const structureOrganizationRoute = async (fastify: FastifyInstance) => {
  fastify.register(districtRoute, {
    prefix: "/district",
  });

  fastify.register(ministerRoute, {
    prefix: "/minister",
  });
  fastify.register(regionRoute, {
    prefix: "/region",
  });
};

export default structureOrganizationRoute;
