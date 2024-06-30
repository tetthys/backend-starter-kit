import Container from "../../src/Container/Container.js";
import Eye from "../../src/Stubs/Eye.js";
import Head from "../../src/Stubs/Head.js";
import Nose from "../../src/Stubs/Nose.js";
import Mouth from "../../src/Stubs/Mouth.js";
import Teeth from "../../src/Stubs/Teeth.js";

describe("Resolve", () => {
  beforeEach(() => {
    Container.registry = [];
    Container.bindingMethods = [];
    Container.singletones = [];
    Container.register([Head, Eye, Nose, Mouth, Teeth]);
  });

  it("resolves autowired instance #1", () => {
    const mouth = Container.resolve(Mouth);

    expect(mouth).toBeInstanceOf(Mouth);
    expect(mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("resolves autowired instance #2", () => {
    const head = Container.resolve(Head);

    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds with bindingInfo using class", () => {
    Container.bind({ class: Eye }, () => {
      return new Nose();
    });
    const eye = Container.resolve(Eye);

    expect(eye).toBeInstanceOf(Nose);
  });

  it("binds with bindingInfo using tag", () => {
    Container.bind({ tag: "Eye" }, () => {
      return new Nose();
    });
    const eye = Container.resolve(Eye);

    expect(eye).toBeInstanceOf(Nose);
  });

  it("binds with bindingInfo using class in nested injection", () => {
    Container.bind({ class: Eye }, () => {
      return new Nose();
    });
    const head = Container.resolve(Head);

    expect(head.eye).toBeInstanceOf(Nose);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds with bindingInfo using tag in nested injection", () => {
    Container.bind({ tag: "Eye" }, () => {
      return new Nose();
    });
    const head = Container.resolve(Head);

    expect(head.eye).toBeInstanceOf(Nose);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds to singletone using class", () => {
    Container.bindToSingletone({ class: Nose }, () => {
      return new Nose();
    });
    const nose1 = Container.resolve(Nose);
    const nose2 = Container.resolve(Nose);

    expect(nose1).toBe(nose2);
  });

  it("binds to singletone using tag", () => {
    Container.bindToSingletone({ tag: "Nose" }, () => {
      return new Nose();
    });
    const nose1 = Container.resolve(Nose);
    const nose2 = Container.resolve(Nose);

    expect(nose1).toBe(nose2);
  });
});
