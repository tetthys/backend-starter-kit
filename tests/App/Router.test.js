import Router from "../../src/App/Router.js";
import request from "supertest";
import Container from "../../src/Container/Container.js";
import Express from "../../src/Packages/Router/Express.js";

describe("Router", () => {
  beforeEach(() => {
    Container.bindToSingletone(Router, () => {
      return new Express();
    });
  });

  it("accept gets request", () => {
    const router = Container.resolve(Router);

    router.get("/test", (req, res) => {
      res.status(200).send();
    });

    return request(router.getInstance()).get("/test").expect(200);
  });

  it("accept post request", () => {
    const router = Container.resolve(Router);

    router.post("/test", (req, res) => {
      res.status(200).send();
    });

    return request(router.getInstance()).post("/test").expect(200);
  });

  it("accept put request", () => {
    const router = Container.resolve(Router);

    router.put("/test", (req, res) => {
      res.status(200).send();
    });

    return request(router.getInstance()).put("/test").expect(200);
  });

  it("accept delete request", () => {
    const router = Container.resolve(Router);

    router.delete("/test", (req, res) => {
      res.status(200).send();
    });

    return request(router.getInstance()).delete("/test").expect(200);
  });
});
