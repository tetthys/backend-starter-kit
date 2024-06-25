import Container from "../Container/Container.js";
import Router from "../App/Router.js";
import Express from "../Packages/Router/Express.js";

Container.bindToSingletone(Router, () => {
  return new Express();
});
