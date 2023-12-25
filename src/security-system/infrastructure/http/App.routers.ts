import { AppController } from "./controllers/App.controller";
import { FastifyInstance } from "fastify";

const appRouters = async (fastify: FastifyInstance) => {
  fastify.post("/login", async (req, res) => {
    await AppController.loginApp(req.body as any, res);
  });
};

export default appRouters;
