import Eye from "./Eye";
import Mouth from "./Mouth";
import Nose from "./Nose";

export default class Head {
  static injectables = [Eye, Nose, Mouth];

  constructor(eye, nose, mouth) {
    this.eye = eye;
    this.nose = nose;
    this.mouth = mouth;
  }
}
