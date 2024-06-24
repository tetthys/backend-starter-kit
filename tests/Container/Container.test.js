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

  it("returns Head instance with correct members", () => {
    const head = Container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("tests binding", () => {
    Container.bind(Nose, () => {
      return new Eye();
    });
    const nose = Container.resolve(Nose);
    expect(nose).toBeInstanceOf(Eye);
  });

  it("tests binding in nested injection", () => {
    Container.bind(Nose, () => {
      return new Eye();
    });
    const head = Container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Eye);
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

  it("binds to singletone in nested injection", () => {
    Container.bindToSingletone(Nose, () => {
      return new Nose();
    });
    const head1 = Container.resolve(Head);
    const head2 = Container.resolve(Head);
    expect(head1.nose).toBe(head2.nose);
  });
});
