import { PasswordAdapter } from "../../../src/security-system/infrastructure";

describe("PasswordAdapter", () => {
  it("should be defined", async () => {
    const pass = await new PasswordAdapter().encrypt("1qaz2wsxP@ssw0rd2020");
    console.log(pass);
  });
});
