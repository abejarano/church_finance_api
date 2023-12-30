import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";

import appRouters from "./security-system/infrastructure/http/App.routers";
import churchRouters from "./church/infrastructure/http/routes/Church.routers";
import memberRouters from "./church/infrastructure/http/routes/member.routers";
import financialRouter from "./financial/infrastructure/http/routes";
import structureOrganizationRoute from "./structure-organization/infrastructure/http/routes";
import { HttpStatus } from "./shared/domain";

const start = async () => {
  const fastify = Fastify({
    logger: false,
  });

  fastify.register(cors, {
    origin: "*",
    preflight: false,
    optionsSuccessStatus: HttpStatus.ACCEPTED,
  });

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  fastify.register(appRouters, { prefix: "/api/v1/app" });
  fastify.register(churchRouters, { prefix: "/api/v1/church" });
  fastify.register(memberRouters, { prefix: "/api/v1/church/member" });
  fastify.register(financialRouter, { prefix: "/api/v1/finance" });
  fastify.register(structureOrganizationRoute, {
    prefix: "/api/v1/structure-organization",
  });

  fastify.listen({ port: 80, host: "0.0.0.0" }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(address);
  });
};

start();
