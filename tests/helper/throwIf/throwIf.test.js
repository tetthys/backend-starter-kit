import { describe, it, expect } from "vitest";
import throwIf from "../../../src/helper/throwIf/throwIf";

class StubError extends Error {
  constructor(message) {
    super(message);
  }
}

describe("throwIf", () => {
  it("throw an error if true", () => {
    expect(() => {
      throwIf(true, new StubError());
    }).toThrowError(StubError);
  });

  it("don't throw an error if false", () => {
    expect(() => {
      throwIf(false, new StubError());
    }).not.toThrowError(StubError);
  });
});
