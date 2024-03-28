import { FastifyInstance } from "fastify";
import { findByCountryIdController } from "../controllers/State.controller";

const worldRoute = async (fastify: FastifyInstance) => {
  fastify.get("/states/:countryId", async (req, res) => {
    await findByCountryIdController(req.params["countryId"], res);
  });
};

export default worldRoute;
