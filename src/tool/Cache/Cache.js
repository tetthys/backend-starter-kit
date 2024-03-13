import { createClient } from "redis";

export default class Cache {
  #for;

  async set(key, value) {
    const redis = await createClient().connect();

    switch (this.#for) {
      case "forOneMinute":
        await redis.setEx(key, 60, JSON.stringify(value));
        break;
      case "forOneHour":
        await redis.setEx(key, 60 * 60, JSON.stringify(value));
        break;
      case "forOneDay":
        await redis.setEx(key, 60 * 60 * 24, JSON.stringify(value));
        break;
      default:
        await redis.set(key, JSON.stringify(value));
    }

    return value;
  }

  async get(key, callback = undefined) {
    const redis = await createClient().connect();
    const value = await redis.get(key);
    return value === null && callback ? await callback() : JSON.parse(value);
  }

  forOneMinute() {
    this.#for = "forOneMinute";
    return this;
  }

  forOneHour() {
    this.#for = "forOneHour";
    return this;
  }

  forOneDay() {
    this.#for = "forOneDay";
    return this;
  }
}
