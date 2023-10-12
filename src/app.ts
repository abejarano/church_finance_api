import { Express } from "express";
import { AppServer } from "./shared/infrastructure";

const port = 8080;
const server: Express = AppServer(port);

server.listen(port, () => console.log("server running on port 8080"));
