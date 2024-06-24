import { beforeEach, expect } from "vitest";
import Container from "../../src/Container/Container";
import Head from "../../src/Stubs/Head";
import Eye from "../../src/Stubs/Eye";
import Nose from "../../src/Stubs/Nose";
import Mouth from "../../src/Stubs/Mouth";
import Teeth from "../../src/Stubs/Teeth";

describe("Container", () => {
  beforeEach(() => {
    Container.bindingMethods = [];
    Container.singletones = [];
  });

  it("resolves instance with nested dependency injection", () => {
    const head = Container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds", () => {
    Container.bind(Eye, () => {
      return new Nose();
    });
    const eye = Container.resolve(Eye);
    expect(eye).toBeInstanceOf(Nose);
  });

  it("binds with nested dependency injection", () => {
    Container.bind(Eye, () => {
      return new Nose();
    });
    const head = Container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Nose);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds to singletone", () => {
    Container.bindToSingletone(Nose, () => {
      return new Nose();
    });
    const nose1 = Container.resolve(Nose);
    const nose2 = Container.resolve(Nose);
    expect(nose1).toBe(nose2);
  });

  it("binds to singletone with nested dependency injection", () => {
    Container.bindToSingletone(Nose, () => {
      return new Nose();
    });
    const head1 = Container.resolve(Head);
    const head2 = Container.resolve(Head);
    expect(head1.nose).toBe(head2.nose);
  });
});
