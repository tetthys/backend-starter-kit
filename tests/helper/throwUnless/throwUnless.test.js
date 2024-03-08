import { describe, it, expect } from "vitest";
import throwUnless from "../../../src/helper/throwUnless/throwUnless";

class StubError extends Error {
  constructor(message) {
    super(message);
  }
}

describe("throwUnless", () => {
  it("throw an error if false", () => {
    expect(() => {
      throwUnless(false, new StubError());
    }).toThrowError(StubError);
  });

  it("don't throw an error if true", () => {
    expect(() => {
      throwUnless(true, new StubError());
    }).not.toThrowError(StubError);
  });
});
