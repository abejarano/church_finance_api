import { QueueName } from "../enums/QueueName.enum";

export interface IQueueService {
  dispatch(queueName: QueueName, args: any): void;
}
