import { States } from "../states";

export interface IWorldRepository {
  findStateById(stateId: string): Promise<States>;
}
