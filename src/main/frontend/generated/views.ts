import { createRoute } from "@vaadin/hilla-file-router/runtime.js";
import * as Page0 from "../views/counter.js";
import * as Page1 from "../views/reactvideo.js";
const routes = createRoute("", [createRoute("counter", Page0), createRoute("reactvideo", Page1)]);
export default routes;
