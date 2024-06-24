import { expect } from "vitest";
import Container from "../../src/Container/Container";
import Head from "../../src/Stubs/Head";
import Eye from "../../src/Stubs/Eye";
import Nose from "../../src/Stubs/Nose";
import Mouth from "../../src/Stubs/Mouth";

describe("Container", () => {
  it("returns Head instance with correct members", () => {
    const container = new Container();
    const head = container.resolve(Head);
    expect(head.eye).toBeInstanceOf(Eye);
    expect(head.nose).toBeInstanceOf(Nose);
    expect(head.mouth).toBeInstanceOf(Mouth);
  });
});
