import { describe, it, expect } from "vitest";
import json from "../../../src/helper/json/json";

describe("json", () => {
  it("convert object to json", async () => {
    const object = {
      a: 1,
    };
    expect(json(object)).toBe('{"a":1}');
  });
  it("if a value type is bigint, convert it to string", async () => {
    const object = {
      a: BigInt(1),
    };
    expect(json(object)).toBe('{"a":"1"}');
  });
});
