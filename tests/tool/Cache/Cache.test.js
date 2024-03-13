import { describe, it, expect } from "vitest";
import getUniqueString from "./utils/getUniqueString";
import Cache from "../../../src/tool/Cache/Cache";

describe("Cache", () => {
  it("set key and get key", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await new Cache().set(key, value);
    expect(await new Cache().get(key)).toBe(value);
  });

  it("set as json, get as object", async () => {
    const key = getUniqueString();
    const valueObject = { name: "John Doe" };

    await new Cache().set(key, valueObject);
    expect(await new Cache().get(key)).toEqual(valueObject);
  });

  it("get executes callback if value is undefined", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    const result = await new Cache().get(
      key,
      async () => await new Cache().forOneMinute().set(key, value)
    );

    expect(result).toBe(value);
  });

  it("get return null if value is null and callback doesn't exist", async () => {
    const key = getUniqueString();

    const result = await new Cache().get(key);

    expect(result).toBe(null);
  });

  it("set return value", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    expect(await new Cache().set(key, value)).toBe(value);
  });

  it("set for one minute", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await new Cache().forOneMinute().set(key, value);
    expect(await new Cache().get(key)).toBe(value);
  });

  it("set for one hour", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await new Cache().forOneHour().set(key, value);
    expect(await new Cache().get(key)).toBe(value);
  });

  it("set for one day", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await new Cache().forOneDay().set(key, value);
    expect(await new Cache().get(key)).toBe(value);
  });
});
