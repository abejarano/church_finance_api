import { PasswordAdapter } from "../../../src/SecuritySystem/infrastructure"

describe("PasswordAdapter", () => {
  it("should be defined", async () => {
    const pass = await new PasswordAdapter().encrypt("1qaz2wsxP@ssw0rd2020")
    logger.info(pass)
  })
})
