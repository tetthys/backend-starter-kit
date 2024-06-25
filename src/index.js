import "./Kernel/Booting.js";
import "./Kernel/RegisterRoutes.js";
import Container from "./Container/Container.js";
import Router from "./App/Router.js";

Container.resolve(Router).listen();
