import { describe, it, expect } from "vitest";
import delay from "../../../src/helper/delay/delay";
import getUniqueString from "./utils/getUniqueString";
import Haven from "../../../src/tool/Haven/Haven";

describe("redis", async () => {
  it("set key and get key", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await Haven.Redis().set(key, value);

    const result = await Haven.Redis().get(key);

    expect(result).toBe(value);
  });

  it("set key first, then set key expiration time", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await Haven.Redis().set(key, value);

    await Haven.Redis().expire(key, 1);

    const before = await Haven.Redis().get(key);
    expect(before).toBeTruthy();

    await delay(1 * 1000);

    const after = await Haven.Redis().get(key);
    expect(after).toBeFalsy();
  });

  it("set key with expiration time", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await Haven.Redis().setex(key, 1, value);

    const before = await Haven.Redis().get(key);
    expect(before).toBeTruthy();

    await delay(1 * 1000);

    const after = await Haven.Redis().get(key);
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

    await Haven.Redis().lpush(key, value1);
    await Haven.Redis().lpush(key, value2);

    const result = await Haven.Redis().lrange(key, 0, -1);
    expect(result).toEqual([value2, value1]);
  });

  /**
   * * [] <- e1
   * * [e1]
   * * [e1] <- e2
   * * [e1, e2]
   */
  it("push to list from right", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await Haven.Redis().rpush(key, value1);
    await Haven.Redis().rpush(key, value2);

    const result = await Haven.Redis().lrange(key, 0, -1);
    expect(result).toEqual([value1, value2]);
  });

  it("pop from left", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await Haven.Redis().lpush(key, value1);
    await Haven.Redis().lpush(key, value2);

    const result1 = await Haven.Redis().lpop(key);
    expect(result1).toBe(value2);

    const result2 = await Haven.Redis().lpop(key);
    expect(result2).toBe(value1);
  });

  it("pop from right", async () => {
    const key = getUniqueString();
    const value1 = getUniqueString();
    const value2 = getUniqueString();

    await Haven.Redis().lpush(key, value1);
    await Haven.Redis().lpush(key, value2);

    const result1 = await Haven.Redis().rpop(key);
    expect(result1).toBe(value1);

    const result2 = await Haven.Redis().rpop(key);
    expect(result2).toBe(value2);
  });

  it("add same value twice to list, but it has only one value", async () => {
    const key = getUniqueString();
    const value = getUniqueString();

    await Haven.Redis().sadd(key, value);
    await Haven.Redis().sadd(key, value);

    const result = await Haven.Redis().smembers(key);
    expect(result).toEqual([value]);
  });

  it("create hash with field, then set value on the field", async () => {
    const key = "key" + getUniqueString();
    const field = "field" + getUniqueString();
    const value = "value" + getUniqueString();

    await Haven.Redis().hset(key, field, value);

    const result = await Haven.Redis().hget(key, field);
    expect(result).toBe(value);
  });
});
