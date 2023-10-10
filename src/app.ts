import { Express } from "express";
import { appServer } from "./shared/infrastructure/server";

const port = 8080;
const server: Express = appServer(port);

server.listen(port, () => console.log("server running on port 8080"));
