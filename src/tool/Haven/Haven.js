import Cache from "../Cache/Cache";
import RedisSingletone from "../Cache/lib/Redis/singletone/RedisSingletone";

export default class Haven {
  static Cache() {
    return new Cache();
  }

  static Redis() {
    return RedisSingletone.getInstance();
  }
}
