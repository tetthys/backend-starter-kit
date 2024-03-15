import { Redis } from "ioredis";

export default class Cache {
  #redis = new Redis();
  #for;

  async set(key, value) {
    switch (this.#for) {
      case "forOneMinute":
        await this.#redis.setex(key, 60, JSON.stringify(value));
        break;
      case "forOneHour":
        await this.#redis.setex(key, 60 * 60, JSON.stringify(value));
        break;
      case "forOneDay":
        await this.#redis.setex(key, 60 * 60 * 24, JSON.stringify(value));
        break;
      default:
        await this.#redis.set(key, JSON.stringify(value));
    }

    return value;
  }

  async get(key, callback = undefined) {
    const value = await this.#redis.get(key);
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
