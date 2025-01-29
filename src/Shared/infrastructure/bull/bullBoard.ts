import { Express } from "express"
import { ExpressAdapter } from "@bull-board/express"
import { QueueBullService } from "./QueueBull.service"
import { createBullBoard } from "@bull-board/api"
import { BullAdapter } from "@bull-board/api/bullAdapter"
import { IDefinitionQueue } from "../../domain"
import * as basicAuth from "express-basic-auth"

export const BullBoard = (app: Express, Queues: IDefinitionQueue[]) => {
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath("/ui/queues")

  const queueServer = QueueBullService.getInstance()
  queueServer.addQueues(Queues)

  createBullBoard({
    queues: queueServer.getQueuesBull().map((queue) => new BullAdapter(queue)),
    serverAdapter,
    options: {
      uiConfig: {
        boardTitle: "My BOARD",
      },
    },
  })

  queueServer.listen()

  // Middleware para autenticación básica
  app.use(
    "/ui/queues",
    basicAuth({
      users: { [process.env.BULL_USER]: process.env.BULL_PASS },
      challenge: true,
      unauthorizedResponse: "No autorizado",
    })
  )

  app.use("/ui/queues", serverAdapter.getRouter())
}
