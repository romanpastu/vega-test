import Dashboard from "@/pages/DashBoard";
import { createRoute } from "@tanstack/react-router";
import { privateRouter } from "../PrivateRouter";
import { DASHBOARD_TREE } from "@/constants/router";
//Parent Route
export const dashboardRouter = createRoute({
  getParentRoute: () => privateRouter,
  path: DASHBOARD_TREE.ROOT.path,
  component: Dashboard,
}) 