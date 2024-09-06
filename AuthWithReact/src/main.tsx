import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import GoogleOAuthToken from './screens/GoogleOAuthToken'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import ProfileScreen from './screens/ProfileScreen'
import NotFound from './screens/404Page'
import OAuthAppDescription from './screens/HomeScreen'
export const backendUrl=import.meta.env.VITE_BACKEND_URL

const router=createBrowserRouter([
  {
    path:'/',
    element:<OAuthAppDescription />
  },
  {
    path:'/account',
    children:[{
      path:'profile',
      element:<ProfileScreen />
    }]
  },
  { path:"/auth",
    children:[
      {
        path:'register',
        element:<SignupScreen />
      },
      {
        path:'login',
        element:<LoginScreen />
      },
      {
        path:'oauth/callback',
        element:<GoogleOAuthToken />
      }
    ]
  },
  {path:'*',
    element:<NotFound />
  }
])

export const authorizationUrlGoogle=`${backendUrl}/auth/oauth/google`
export const authorizationUrlGithub=`${backendUrl}/auth/oauth/github`
export const registerUrl=`${backendUrl}/auth/register`
export const loginUrl=`${backendUrl}/auth/login`
const queryClient=new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
