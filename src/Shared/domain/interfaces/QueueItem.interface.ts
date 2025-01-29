import { IQueue } from "./Queue.interface"

export interface IDefinitionQueue {
  useClass: new (...args: any[]) => IQueue
  inject?: any[]
  /**
   * Delay in seconds
   */
  delay?: number
}
