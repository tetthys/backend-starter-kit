import { expect } from "vitest";
import Container from "../../src/Container/Container";
import Head from "../../src/Stubs/Head";
import Eye from "../../src/Stubs/Eye";
import Nose from "../../src/Stubs/Nose";
import Mouth from "../../src/Stubs/Mouth";
import Teeth from "../../src/Stubs/Teeth";

describe("Container", () => {
  it("returns Head instance with correct members", () => {
    const head = Container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
    expect(head.mouth.teeth).toBeInstanceOf(Teeth);
  });

  it("binds how to resolve", () => {
    Container.bind(Nose, () => {
      return new Eye();
    });
    const nose = Container.resolve(Nose);
    expect(nose).toBeInstanceOf(Eye);
  });
});
