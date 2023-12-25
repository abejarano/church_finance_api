import ministerValidator from "../validators/Mininister.validator";
import { MinisterController } from "../controllers/Minister.controller";
import { MinisterPaginateRequest } from "../requests/MinisterPaginate.request";
import { FastifyInstance } from "fastify";
import { MinisterStructureType } from "../../../domain";

const ministerRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    { preHandler: ministerValidator },
    async (req, res): Promise<void> => {
      await MinisterController.createOrUpdate(
        req.body as MinisterStructureType,
        res,
      );
    },
  );

  fastify.get("/", async (req, res): Promise<void> => {
    const params = req.query as unknown as MinisterPaginateRequest;
    await MinisterController.search(params, res);
  });

  fastify.get("/:ministerDni", async (req, res): Promise<void> => {
    const { ministerDni } = req.params as any;
    await MinisterController.findByDNI(ministerDni, res);
  });
};
export default ministerRoute;
