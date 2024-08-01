import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./components/home/Home"
import LogIn from "./components/registration/LogIn"
import SignUp from "./components/registration/SignUp"
import NotFoundPage from './components/notFoundPage/NotFoundPage'
import ForgatPassword from './components/registration/ForgatPassword'
import RandomGame from './components/RandomGame'
import { StyleProvider } from './components/registration/StyleContext'
import StopWatch from './components/stopWatch/StopWatch'

const router = createBrowserRouter([
  { path: '/', element: <LogIn />, errorElement: <NotFoundPage /> },
  { path: '/home', element: <Home /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/reset', element: <ForgatPassword/> },
  { path: '/games', element: <RandomGame /> },
])

export default function App() {
  return (
    <StyleProvider>
      <RouterProvider router={ router } />
    </StyleProvider> 
  )
}