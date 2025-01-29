import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect, useNavigate, useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (!localStorage.getItem('accessToken')) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname,
        },
      })
    }
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  // Client-side protection including token expiration check
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const navigateToSignIn = () => {
      navigate({
        to: '/sign-in',
        search: {
          redirect: location.pathname,
        },
      })
    }

    if (!token) {
      navigateToSignIn()
      return
    }

    try {
      const decoded = jwtDecode<{ exp?: number }>(token)
      const currentTime = Date.now() / 1000 // Convert to seconds

      // Check if token is expired or doesn't have expiration
      if (typeof decoded.exp !== 'number' || decoded.exp < currentTime) {
        localStorage.removeItem('accessToken')
        navigateToSignIn()
      }
    } catch (error) {
      // Handle invalid token format
      localStorage.removeItem('accessToken')
      navigateToSignIn()
    }
  }, [navigate, location.pathname])

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
