import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import Hero from './components/custom/Hero.jsx'
import { ThemeProvider } from './components/ui/theme-provider.js'

const router = createBrowserRouter([
 {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Hero /> },
      { path: "create-trip", element: <CreateTrip /> },
      { path: "my-trips", element: <MyTrips /> },
      { path: "view-trip/:tripId", element: <Viewtrip /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
     {/* </ThemeProvider> */}
  </StrictMode>,
)



