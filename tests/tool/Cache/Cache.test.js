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

  it("getIfNot", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await new Cache().getIfNot(key, async () => {
      await new Cache().set(key, value);
    });

    expect(await new Cache().get(key)).toBe(value);
  });
});
