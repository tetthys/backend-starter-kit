import express from "express";
import Router from "../../App/Router.js";

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

  getInstance() {
    return this.app;
  }
}
