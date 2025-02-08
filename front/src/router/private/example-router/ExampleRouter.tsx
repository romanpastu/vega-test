import { createRoute } from "@tanstack/react-router";
import { privateRouter } from "../PrivateRouter";
import { EXAMPLE_TREE } from "@/constants/router";
import { lazy } from "react";

const Example = lazy(() => import("@/pages/Example"));

//Parent Route
export const exampleRouter = createRoute({
  getParentRoute: () => privateRouter,
  path: EXAMPLE_TREE.ROOT.path,
  component: Example,
}) 