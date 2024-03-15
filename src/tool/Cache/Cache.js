import Haven from "../Haven/Haven";

export default class Cache {
  #for;

  async set(key, value) {
    switch (this.#for) {
      case "forOneMinute":
        await Haven.Redis().setex(key, 60, JSON.stringify(value));
        break;
      case "forOneHour":
        await Haven.Redis().setex(key, 60 * 60, JSON.stringify(value));
        break;
      case "forOneDay":
        await Haven.Redis().setex(key, 60 * 60 * 24, JSON.stringify(value));
        break;
      default:
        await Haven.Redis().set(key, JSON.stringify(value));
    }

    return value;
  }

  async get(key, callback = undefined) {
    const value = await Haven.Redis().get(key);
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
