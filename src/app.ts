import appRouters from "./security-system/infrastructure/http/App.routers";
import churchRouters from "./church/infrastructure/http/routes/Church.routers";
import memberRouters from "./church/infrastructure/http/routes/member.routers";
import financialRouter from "./financial/infrastructure/http/routes";
import structureOrganizationRoute from "./structure-organization/infrastructure/http/routes";
import { HttpServer } from "./shared/infrastructure";

const server = HttpServer.getInstance();

server.addRoute("/api/v1/app", appRouters);
server.addRoute("/api/v1/church", churchRouters);
server.addRoute("/api/v1/church/member", memberRouters);
server.addRoute("/api/v1/finance", financialRouter);
server.addRoute("/api/v1/structure-organization", structureOrganizationRoute);

server.start(80);
