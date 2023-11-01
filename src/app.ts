import { Express } from "express";
import { AppServer } from "./shared/infrastructure";
import structureOrganizationRoute from "./structure-organization/infrastructure/http/routers";

const port = 8080;
const server: Express = AppServer(port);

server.use("/api/v1/structure-organization", structureOrganizationRoute);

server.listen(port, () => console.log("server running on port 8080"));
