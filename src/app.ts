import "reflect-metadata";
import appRouters from "./SecuritySystem/infrastructure/http/App.routers";
import churchRouters from "./Church/infrastructure/http/routes/Church.routers";
import memberRouters from "./Church/infrastructure/http/routes/Member.routers";
import financialRouter from "./Financial/infrastructure/http/routes";

import worldRoute from "./World/infrastructure/http/routes/World.route";
import ministerRoute from "./Church/infrastructure/http/routes/Minsiter.routers";
import { Express } from "express";
import { server, StorageGCP } from "./Shared/infrastructure";
import userRoutes from "./SecuritySystem/infrastructure/http/routes/User.routes";
import profileRoutes from "./SecuritySystem/infrastructure/http/routes/Profile.routes";
import modulesRoutes from "./SecuritySystem/infrastructure/http/routes/Modules.routes";
import { Queues } from "./queues";
import { bullBoard } from "./Shared/infrastructure/bull/bullBoard";

const port = 8080;
const app: Express = server(port);

bullBoard(app, Queues);

app.use("/api/v1/app", appRouters);
app.use("/api/v1/church", churchRouters);
app.use("/api/v1/church/member", memberRouters);
app.use("/api/v1/minister", ministerRoute);
app.use("/api/v1/finance", financialRouter);

app.use("/api/v1/admin/user", userRoutes);
app.use("/api/v1/admin/profile", profileRoutes);
app.use("/api/v1/admin/modules", modulesRoutes);

app.use("/api/v1/world", worldRoute);

StorageGCP.getInstance(process.env.BUCKET_FILES);

app.listen(port, (): string => "server running on port 8080");
