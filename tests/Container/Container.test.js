import Container from "../../src/Container/Container.js";
import Eye from "../../src/Stubs/Eye.js";

describe("Container", () => {
  beforeEach(() => {
    Container.registry = [];
    Container.bindingMethods = [];
    Container.singletones = [];
  });

  it("registers array of class", () => {
    Container.register([Eye]);
    expect(Container.registry[0]).toEqual({
      tag: "Eye",
      memberName: "eye",
      class: Eye,
    });
  });

  it("registers array of object with specified tag", () => {
    Container.register([
      {
        tag: "uniqueEye",
        class: Eye,
      },
    ]);
    expect(Container.registry[0]).toEqual({
      tag: "uniqueEye",
      memberName: "eye",
      class: Eye,
    });
  });

  it("registers array of object with specified memberName", () => {
    Container.register([
      {
        memberName: "uniqueEyeMember",
        class: Eye,
      },
    ]);
    expect(Container.registry[0]).toEqual({
      tag: "Eye",
      memberName: "uniqueEyeMember",
      class: Eye,
    });
  });

  it("registers array of object with specified tag, memberName", () => {
    Container.register([
      {
        tag: "uniqueEye",
        memberName: "uniqueEyeMember",
        class: Eye,
      },
    ]);
    expect(Container.registry[0]).toEqual({
      tag: "uniqueEye",
      memberName: "uniqueEyeMember",
      class: Eye,
    });
  });
});
