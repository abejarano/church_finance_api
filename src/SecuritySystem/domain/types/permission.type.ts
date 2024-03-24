import { ActionInSystem } from "../enums/action-in.system";
import { OptionModuleDTO } from "./option-module.type";

export type PermissionDTO = {
  action: ActionInSystem[];
  optionModule: OptionModuleDTO;
};
