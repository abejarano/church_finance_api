import { PubSub } from "@google-cloud/pubsub";
import { IMessageBus } from "../../domain";
import { logger } from "../index";

export class PubSubMessage implements IMessageBus {
  private pubSubClient: PubSub;

  constructor() {
    this.pubSubClient = new PubSub({
      projectId: process.env.GCP_PROJECT_ID,
    });
  }

  static instance() {
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

  subscribe(subscriptionName: string, callback: Function): void {
    const subscription = this.pubSubClient.subscription(subscriptionName);

    const messageHandler = (message: any) => {
      let payload;
      message.ack();
      try {
        const buff = Buffer.from(message.data, "base64");
        payload = JSON.parse(buff.toString("utf-8"));

        logger.info(`Received message id: ${message.id}\t`);
        logger.info(`Received message Data: ${JSON.stringify(payload)}`);
      } catch (e) {
        return;
      }

      callback(payload);
    };

    subscription.on("message", messageHandler);
  }
}
