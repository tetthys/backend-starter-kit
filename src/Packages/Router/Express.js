import express from "express";
import Router from "../../App/Router.js";
import env from "../../Helpers/env/env.js";

export default class Express extends Router {
  constructor() {
    super();
    this.app = express();
  }

  get(path, callback) {
    this.app.get(path, callback);
  }

  post(path, callback) {
    this.app.post(path, callback);
  }

  put(path, callback) {
    this.app.put(path, callback);
  }

  delete(path, callback) {
    this.app.delete(path, callback);
  }

  listen(port = env("PORT")) {
    this.app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  }

  getInstance() {
    return this.app;
  }
}
