import {
  ActionInSystem,
  PermissionDTO,
  Profile,
} from "src/SecuritySystem/domain";
import { generateFakeOptionModule } from "./system-module.factory";
import { faker } from "@faker-js/faker";

function getRandomAction(): ActionInSystem {
  const values = Object.values(ActionInSystem);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as ActionInSystem;
}

export const generateFakeProfile = (): Profile => {
  const permission: PermissionDTO[] = [
    {
      action: [getRandomAction()],
      optionModule: generateFakeOptionModule(),
    },
    {
      action: [getRandomAction(), getRandomAction(), getRandomAction()],
      optionModule: generateFakeOptionModule(),
    },
    {
      action: [getRandomAction(), getRandomAction()],
      optionModule: generateFakeOptionModule(),
    },
    {
      action: [getRandomAction()],
      optionModule: generateFakeOptionModule(),
    },
  ];
  return Profile.create(faker.lorem.word() + " profile", permission);
};
