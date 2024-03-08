import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createClient } from "redis";
import delay from "../../../src/helper/delay/delay";

const getUniqueString = () => {
  return String(Math.random());
};

describe("redis", async () => {
  const redis = await createClient().connect();

  it("set key and get key", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await redis.set(key, value);

    const result = await redis.get(key);

    expect(result).toBe(value);
  });

  it("set key first, then set key expiration time", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await redis.set(key, value);

    await redis.expire(key, 1);

    const before = await redis.get(key);
    expect(before).toBeTruthy();

    await delay(1 * 1000);

    const after = await redis.get(key);
    expect(after).toBeFalsy();
  });

  it("set key with expiration time", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await redis.setEx(key, 1, value);

    const before = await redis.get(key);
    expect(before).toBeTruthy();

    await delay(1 * 1000);

    const after = await redis.get(key);
    expect(after).toBeFalsy();
  });

  /**
   * * e1 -> []
   * * [e1]
   * * e2 -> [e1]
   * * [e2, e1]
   */
  it("push to list from left", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await redis.lPush(key, value1);
    await redis.lPush(key, value2);

    const result = await redis.lRange(key, 0, -1);
    expect(result).toEqual([value2, value1]);
  });

  /**
   * * e1 -> []
   * * [e1]
   * * e2 -> [e1]
   * * [e1, e2]
   */
  it("push to list from right", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await redis.rPush(key, value1);
    await redis.rPush(key, value2);

    const result = await redis.lRange(key, 0, -1);
    expect(result).toEqual([value1, value2]);
  });

  it("pop from left", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await redis.lPush(key, value1);
    await redis.lPush(key, value2);

    const result1 = await redis.lPop(key);
    expect(result1).toBe(value2);

    const result2 = await redis.lPop(key);
    expect(result2).toBe(value1);
  });

  it("pop from right", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await redis.lPush(key, value1);
    await redis.lPush(key, value2);

    const result1 = await redis.rPop(key);
    expect(result1).toBe(value1);

    const result2 = await redis.rPop(key);
    expect(result2).toBe(value2);
  });

  it("add same value twice to list, but it has only one value", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await redis.sAdd(key, value);
    await redis.sAdd(key, value);

    const result = await redis.sMembers(key);
    expect(result).toEqual([value]);
  });

  it("create hash with field, then set value on the field", async () => {
    const key = "key" + getUniqueString();
    const field = "field" + getUniqueString();
    const value = "value" + getUniqueString();

    await redis.hSet(key, field, value);

    const result = await redis.hGet(key, field);
    expect(result).toBe(value);
  });
});
