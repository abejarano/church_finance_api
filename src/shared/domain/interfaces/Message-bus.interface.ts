export interface IMessageBus {
  transmissionMessage(payload: string, topic: string): Promise<void>;
}
