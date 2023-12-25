import Fastify from "fastify";
import ContributionValidator from "./financial/infrastructure/http/validators/Contribution.validator";
import { AppAuthMiddleware } from "./shared/infrastructure";

const fastify = Fastify({
  logger: false,
});

fastify.route({
  method: "POST",
  url: "/",
  preHandler: [AppAuthMiddleware, ContributionValidator],
  handler: async (request, reply) => {
    console.log(request.body);
    return { hello: "world" };
  },
});

// Run the server!
fastify.listen({ port: 80 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
