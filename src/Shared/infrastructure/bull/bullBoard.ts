import { Express } from "express";
import { ExpressAdapter } from "@bull-board/express";
import { QueueBullService } from "./QueueBull.service";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { IDefinitionQueue } from "../../domain";

export const bullBoard = (app: Express, Queues: IDefinitionQueue[]) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/ui");

  const queueServer = QueueBullService.getInstance();
  queueServer.addQueues(Queues);

  createBullBoard({
    queues: queueServer.getQueuesBull().map((queue) => new BullAdapter(queue)),
    serverAdapter,
    options: {
      uiConfig: {
        boardTitle: "My BOARD",
      },
    },
  });

  queueServer.listen();

  app.use("/ui", serverAdapter.getRouter());
};
