import { PasswordAdapter } from "../../../src/shared/adapter";

describe("PasswordAdapter", () => {
  it("should be defined", async () => {
    const pass = await PasswordAdapter.instance("12345678").getValueEncrypt();
    console.log(pass);
  });
});
