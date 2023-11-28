export interface IMessageBus {
  transmissionMessage(payload: string, topic: string): Promise<void>;

  subscribe(
    subscriptionName: string,
    callback: Function,
    timeout: number,
  ): void;
}
