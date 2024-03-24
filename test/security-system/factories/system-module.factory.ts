import { faker } from "@faker-js/faker";

import { SystemModule } from "../../../src/SecuritySystem/domain";

export const generateFakeSystemModule = (): SystemModule => {
  const fakeSystemModule = {
    createdAt: new Date(),
    description: faker.lorem.sentence(),
    isActive: true,
    name: faker.lorem.word(),
    options: [
      {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        isActive: true,
        URL: faker.internet.url(),
      },
    ],
  };

  return SystemModule.create(
    fakeSystemModule.name,
    fakeSystemModule.description,
    fakeSystemModule.isActive,
    fakeSystemModule.createdAt,
    fakeSystemModule.options,
  );
};

export const generateFakeOptionModule = () => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    isActive: true,
    URL: faker.internet.url(),
  };
};
