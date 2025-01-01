export interface IQueue {
  handle(...args: any[]): Promise<void>;
}
