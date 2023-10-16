import { PubSub } from "@google-cloud/pubsub";
import { IMessageBus } from "../../domain/interfaces/message-bus.interface";
import { logger } from "../../index";

export class PubSubMessage implements IMessageBus {
  private pubSubClient: PubSub;

  constructor() {
    this.pubSubClient = new PubSub({
      projectId: process.env.GCP_PROJECT_ID,
    });
  }

  static instance(): PubSubMessage {
    return new PubSubMessage();
  }

  async transmissionMessage(payload: string, topic: string): Promise<void> {
    try {
      const dataBuffer = Buffer.from(payload);
      const messageId = await this.pubSubClient
        .topic(topic)
        .publishMessage({ data: dataBuffer });

      logger.info(`Message ${messageId} published.`);
    } catch (error) {
      logger.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
