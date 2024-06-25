import Router from "../App/Router.js";
import Container from "../Container/Container.js";

Container.resolve(Router).get("/hello", (req, res) => {
  res.send("hello");
});
