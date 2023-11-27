import { Express } from "express";
import { AppServer } from "./shared/infrastructure";
import districtRoute from "./structure-organization/infrastructure/http/routes/District.routers";
import ministerRoute from "./structure-organization/infrastructure/http/routes/Minister.routers";
import regionRoute from "./structure-organization/infrastructure/http/routes/Region.routers";
import churchRouters from "./church/infrastructure/http/routes/Church.routers";
import memberRouters from "./church/infrastructure/http/routes/member.routers";
import financialConfigurationRoute from "./financial/infrastructure/http/routes/FinancialConfiguration.routes";

const port = 8080;
const server: Express = AppServer(port);

server.use("/api/v1/structure-organization/district", districtRoute);
server.use("/api/v1/structure-organization/minister", ministerRoute);
server.use("/api/v1/structure-organization/region", regionRoute);
server.use("/api/v1/church/", churchRouters);
server.use("/api/v1/church/member", memberRouters);
server.use("/api/v1/finance/configuration", financialConfigurationRoute);

server.listen(port, () => console.log("server running on port 8080"));
