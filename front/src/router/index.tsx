import { createRouter } from "@tanstack/react-router"
import { loginRouter } from "./login/LoginRouter"
import { rootRoute } from "./root"
import { privateRouter } from "./private/PrivateRouter"
import { dashboardRoute } from "./private/dashboard-router/DashboardRouter"

const routeTree = rootRoute.addChildren([
  loginRouter,
  privateRouter.addChildren([
    dashboardRoute,
  ])
])

export const router = createRouter({ routeTree }) 