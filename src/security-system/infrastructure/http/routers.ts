import { FastifyInstance } from "fastify";

const securitySystemRouter = async (fastify: FastifyInstance) => {
  fastify.get("/users", (req, res) => {
    res.send({ message: "Hello World!" });
  });

  fastify.post("/users", (req, res) => {
    res.send({ message: "Hello World!" });
  });

  fastify.post("/system-modules", (req, res) => {
    res.send({ message: "Hello World!" });
  });
};
export default securitySystemRouter;
