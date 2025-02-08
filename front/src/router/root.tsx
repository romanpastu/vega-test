import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react'
import { Outlet } from '@tanstack/react-router'
import NotFoundPage from '@/pages/error/NotFoundPage'
import ErrorPage from '@/pages/error/ErrorPage'
import { IS_DEV } from '@/constants/global'
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {IS_DEV && 
        <React.Suspense>
          <TanStackRouterDevtools />
        </React.Suspense>
      }
    </>
  ),
  errorComponent: ({ error, info }) => <ErrorPage error={error} info={info} />,
  notFoundComponent: () => <NotFoundPage />
}) 