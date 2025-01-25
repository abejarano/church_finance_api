import { IDefinitionQueue, IQueueService, QueueName } from "../../domain"
import * as fs from "fs"
import * as Queue from "bull"
import * as path from "path"

export class QueueBullService implements IQueueService {
  private static instance: QueueBullService
  private instanceQueuesBull: Queue.Queue[] = []
  private queueMap: Record<string, IDefinitionQueue> = {}
  private redisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  }

  private constructor() {} // Singleton: evitar instanciación externa

  static getInstance() {
    if (!QueueBullService.instance) {
      QueueBullService.instance = new QueueBullService()
    }
    return QueueBullService.instance
  }

  getQueuesBull() {
    return this.instanceQueuesBull
  }

  listen() {
    for (const queueName in this.queueMap) {
      const definitionQueue = this.queueMap[queueName]
      const worker = this.instanceQueuesBull.find((q) => q.name === queueName)

      if (!worker) {
        console.error(`Worker not found for queue: ${queueName}`)
        continue
      }

      const instanceWorker = new definitionQueue.useClass(
        ...definitionQueue.inject
      )

      worker.process(async (job) => await instanceWorker.handle(job.data))

      this.addWorkerListeners(worker)
    }
  }

  dispatch(jobName: QueueName, args: any) {
    const queue = this.instanceQueuesBull.find((q) => q.name === jobName)

    if (!queue) {
      console.error(`Queue not found: ${jobName}`)
      return
    }

    queue.add(args).catch((err) => {
      console.error(`Failed to add job to queue: ${jobName}`, err)
    })
  }

  addQueues(definitionQueues: IDefinitionQueue[]) {
    definitionQueues.forEach((queue) => {
      const instance = new Queue(queue.useClass.name, {
        redis: this.redisOptions,
      })

      instance.on("ready", () =>
        console.log(`Queue ${queue.useClass.name} is connected to Redis`)
      )
      instance.on("error", (error) =>
        console.error(`Error in queue ${queue.useClass.name}:`, error)
      )

      this.instanceQueuesBull.push(instance)
      this.queueMap[queue.useClass.name] = queue
    })

    this.generateEnumFile(
      "QueueName",
      path.resolve(`${__dirname}../../../domain/enums`, "QueueName.enum.ts")
    )
  }

  private generateEnumFile(enumName: string, outputPath: string) {
    const enumContent = Object.keys(this.queueMap)
      .map((key) => `  ${key} = "${key}",`)
      .join("\n")

    const fileContent = `export enum ${enumName} {\n${enumContent}\n}\n`

    if (fs.existsSync(outputPath)) {
      const existingContent = fs.readFileSync(outputPath, "utf8")
      if (existingContent === fileContent) return // El archivo ya está actualizado
    }

    fs.writeFileSync(outputPath, fileContent, "utf8")
    console.log(`Enum file generated at ${outputPath}`)
  }

  private addWorkerListeners(worker: Queue.Queue) {
    worker.on("failed", (job, err) =>
      console.error(`Job failed in queue: ${worker.name}`, err)
    )
  }
}
