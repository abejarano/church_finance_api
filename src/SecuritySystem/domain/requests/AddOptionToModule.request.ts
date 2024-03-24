import { OptionModuleDTO } from "../types/option-module.type";

export type AddOptionToModuleRequest = {
  systemModuleId: string;
  option: OptionModuleDTO;
};
