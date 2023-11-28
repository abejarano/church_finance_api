import { IMessageBus } from "../../domain";
import { EventEmitter } from "events";

export class NativeEventBus implements IMessageBus {
  private static instance: NativeEventBus;
  private messageEmitter: EventEmitter;

  constructor() {
    this.messageEmitter = new EventEmitter();
  }

  static getInstance(): NativeEventBus {
    if (!NativeEventBus.instance) {
      NativeEventBus.instance = new NativeEventBus();
    }
    return NativeEventBus.instance;
  }

  subscribe(subscriptionName: string, callback: Function): void {
    this.messageEmitter.on(subscriptionName, (data: any) => {
      callback(data);
    });
  }

  async transmissionMessage(payload: string, topic: string): Promise<void> {
    this.messageEmitter.emit(topic, payload);
  }
}
