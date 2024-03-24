import { generateFakeProfile } from "../../factories/profile.factory";
import { ProfileMongoRepository } from "../../../../src/SecuritySystem/infrastructure";

describe("ProfileMongoRepository", () => {
  it("should be defined", async () => {
    const profile = generateFakeProfile();

    const profileMongoRepository: ProfileMongoRepository =
      ProfileMongoRepository.getInstance();

    await profileMongoRepository.upsert(profile);

    const profileRecoverDB = await profileMongoRepository.findByProfileId(
      profile.getProfileId(),
    );

    expect(profileRecoverDB).not.toBe(undefined);
  });
});
