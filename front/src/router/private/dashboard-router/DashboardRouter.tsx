import { createRoute } from "@tanstack/react-router";
import { privateRouter } from "../PrivateRouter";
import { DASHBOARD_TREE } from "@/constants/router";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/dashboard/DashBoard"));

//Parent Route
export const dashboardRouter = createRoute({
  getParentRoute: () => privateRouter,
  path: DASHBOARD_TREE.ROOT.path,
  component: Dashboard,
}) 