// server.use("/api/v1/structure-organization/district", districtRoute);
// server.use("/api/v1/structure-organization/minister", ministerRoute);
// server.use("/api/v1/structure-organization/region", regionRoute);
// server.use("/api/v1/church/", churchRouters);
// server.use("/api/v1/church/member", memberRouters);
// server.use("/api/v1/finance", financialRouter);

import Fastify from "fastify";
import appRouters from "./security-system/infrastructure/http/App.routers";

const fastify = Fastify({
  logger: false,
});

fastify.register(appRouters, { prefix: "/api/v1/app" });

fastify.listen({ port: 80, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(address);
});
