import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { logger } from "../index";
import { HttpStatus } from "../../domain";

export class HttpServer {
  private instance: FastifyInstance;

  static getInstance(): HttpServer {
    const httpServer = new HttpServer();

    httpServer.instance = Fastify({
      logger: false,
    });

    httpServer.instance.register(cors, {
      origin: "*",
      preflight: false,
      optionsSuccessStatus: HttpStatus.ACCEPTED,
    });

    httpServer.instance.register(rateLimit, {
      max: 100,
      timeWindow: "1 minute",
    });

    httpServer.instance.get("/live", async (req, res) => {
      res.status(200).send({ message: "I live" });
    });

    return httpServer;
  }

  addRoute(prefix: string, routes: any) {
    this.instance.register(routes, { prefix: prefix });
  }

  start(port: number) {
    this.instance.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        process.exit(1);
      }

      logger.info(`server listening on ${address}`);
    });
  }
}
