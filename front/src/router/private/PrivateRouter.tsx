import AuthLayout from "@/components/layouts/AuthLayout"
import { PRIVATE_PATH, LOGIN_TREE, DASHBOARD_TREE } from "@/constants/router"
import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from "../root"

//Parent Route
export const privateRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: PRIVATE_PATH,
  component: AuthLayout,
  beforeLoad: ({ location }) => {
    // Check if user is authenticated
    const token = localStorage.getItem('jwt')
    
    // If no token is found and we're not already on the login page, redirect to login
    if (!token) {
      throw redirect({
        to: LOGIN_TREE.ROOT.path
      })
    }

    // Prevent auth route from matching /login paths
    if (location.pathname.startsWith(LOGIN_TREE.ROOT.path)) {
      throw new Error('Not Found')
    }

    // Redirect root path to /route1
    if (location.pathname === PRIVATE_PATH) {
      throw redirect({
        to: DASHBOARD_TREE.ROOT.path
      })
    }
  }
}) 