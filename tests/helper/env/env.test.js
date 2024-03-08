import { describe, it, expect } from "vitest";
import env from "../../../src/helper/env/env";
import CannotReadEnvVariableError from "../../../src/helper/env/error/CannotReadEnvVariableError";

describe("env", () => {
  it("read NAME", async () => {
    expect(env("NAME")).toBe("backend-starter-kit");
  });
  it("read PORT", async () => {
    expect(env("PORT")).toBe("3000");
  });
  it("If a variable is incorrect, throw CannotReadEnvVariableError", async () => {
    expect(() => env("INCORRECT_VARIABLE")).toThrow(CannotReadEnvVariableError);
  });
});
