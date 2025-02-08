import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react'
import NotFoundPage from '@/pages/error/NotFoundPage'
import ErrorPage from '@/pages/error/ErrorPage'
import { IS_DEV } from '@/constants/global'
import RootLayout from '@/components/layouts/RootLayout'

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <RootLayout />
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