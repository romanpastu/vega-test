import { LOGIN_TREE, DASHBOARD_TREE } from "@/constants/router"
import { lazy } from "react"
import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from "../root"

const Login = lazy(() => import("@/pages/login/Login"))

//Parent Route
export const loginRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: LOGIN_TREE.ROOT.path,
  component: Login,
  beforeLoad: () => {
    // Check if user is authenticated
    const token = localStorage.getItem('jwt')
    if (token) {
      throw redirect({ to: DASHBOARD_TREE.ROOT.path })
    }
  }
})