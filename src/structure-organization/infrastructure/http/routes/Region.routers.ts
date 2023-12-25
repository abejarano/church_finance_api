import { RegionController } from "../controllers/Region.controller";
import { RegionPaginateRequest } from "../requests/RegionPaginate.request";
import { FastifyInstance } from "fastify";
import { RegionStructureType } from "../../../domain";

const regionRoute = async (fastify: FastifyInstance) => {
  fastify.post("/", async (req, res): Promise<void> => {
    await RegionController.createOrUpdate(req.body as RegionStructureType, res);
  });

  fastify.get("/", async (req, res): Promise<void> => {
    const params = req.query as unknown as RegionPaginateRequest;
    await RegionController.search(params, res);
  });

  fastify.get("/:regionId", async (req, res): Promise<void> => {
    const { regionId } = req.params as any;
    res.send("regionRoute");
  });
};
export default regionRoute;
