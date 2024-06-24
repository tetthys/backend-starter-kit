import { expect } from "vitest";
import env from "../../src/Helpers/env";
import CannotReadEnvVariable from "../../src/Helpers/Errors/CannotReadEnvVariable";

describe("env", () => {
  it("reads variable from .env file", () => {
    const port = env("PORT");
    expect(port).toBe("3000");
  });

  it("throws CannotReadEnvVariable when variable is null", () => {
    expect(() => env("INVALID")).toThrow(CannotReadEnvVariable);
  });
});
