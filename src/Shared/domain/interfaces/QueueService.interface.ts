import { QueueName } from "../enums/QueueName.enum";

export interface IQueueService {
  dispatch<T>(queueName: QueueName, content: T): void;
}
