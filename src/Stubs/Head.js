import Eye from "./Eye.js";
import Mouth from "./Mouth.js";
import Nose from "./Nose.js";

export default class Head {
  static injectables = [Eye, Nose, Mouth];

  constructor(eye, nose, mouth) {
    this.eye = eye;
    this.nose = nose;
    this.mouth = mouth;
  }
}
