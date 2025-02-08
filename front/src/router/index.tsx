import { createRouter } from "@tanstack/react-router"
import { loginRouter } from "./login/LoginRouter"
import { rootRoute } from "./root"
import { privateRouter } from "./private/PrivateRouter"
import { dashboardRouter } from "./private/dashboard-router/DashboardRouter"
import { exampleRouter } from "./private/example-router/ExampleRouter"

const routeTree = rootRoute.addChildren([
  loginRouter,
  privateRouter.addChildren([
    dashboardRouter,
    exampleRouter
  ])
])

export const router = createRouter({ routeTree }) 