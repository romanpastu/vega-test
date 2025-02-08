import Example from "@/pages/Example";
import { createRoute } from "@tanstack/react-router";
import { privateRouter } from "../PrivateRouter";
import { EXAMPLE_TREE } from "@/constants/router";
//Parent Route
export const exampleRouter = createRoute({
  getParentRoute: () => privateRouter,
  path: EXAMPLE_TREE.ROOT.path,
  component: Example,
}) 