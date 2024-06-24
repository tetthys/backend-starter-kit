import Teeth from "./Teeth";

export default class Mouth {
  static injectables = [Teeth];

  constructor(teeth) {
    this.teeth = teeth;
  }
}
