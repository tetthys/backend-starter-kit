import Teeth from "./Teeth.js";

export default class Mouth {
  static injectables = [Teeth];

  constructor(teeth) {
    this.teeth = teeth;
  }
}
