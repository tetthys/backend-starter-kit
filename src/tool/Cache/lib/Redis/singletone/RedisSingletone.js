import { Redis } from "ioredis";

export default class RedisSingletone {
  static instance = null;

  static getInstance() {
    if (!RedisSingletone.instance) {
      RedisSingletone.instance = new Redis();
    }
    return RedisSingletone.instance;
  }
}
