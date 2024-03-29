import appRouters from "./SecuritySystem/infrastructure/http/App.routers";
import churchRouters from "./Church/infrastructure/http/routes/Church.routers";
import memberRouters from "./Church/infrastructure/http/routes/member.routers";
import financialRouter from "./Financial/infrastructure/http/routes";
import structureOrganizationRoute from "./OrganizacionalStructure/infrastructure/http/routes";
import { HttpServer } from "./Shared/infrastructure";
import {
  modulesRoutes,
  profileRoutes,
  userRoutes,
} from "./SecuritySystem/infrastructure";
import worldRoute from "./World/infrastructure/http/routes/World.route";

const server = HttpServer.getInstance();

server.addRoute("/api/v1/app", appRouters);
server.addRoute("/api/v1/church", churchRouters);
server.addRoute("/api/v1/church/member", memberRouters);
server.addRoute("/api/v1/finance", financialRouter);
server.addRoute("/api/v1/structure-organization", structureOrganizationRoute);

server.addRoute("/api/v1/admin/user", userRoutes);
server.addRoute("/api/v1/admin/profile", profileRoutes);
server.addRoute("/api/v1/admin/modules", modulesRoutes);

server.addRoute("/api/v1/world", worldRoute);

server.start(8080);
