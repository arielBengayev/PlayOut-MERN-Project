import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/home/Home"
import StartGamePage from "./components/startGamePage/StartGamePage"
import Login from "./components/registration/Login"
import SignUp from "./components/registration/SignUp"
import NotFoundPage from './components/notFoundPage/NotFoundPage'
import ForgatPassword from './components/registration/ForgatPassword'
import GameController from './components/gameController/GameController'
import ProtectedRoutes from './components/utils/ProtectedRoutes'
import { gamePage, homePage, loginPage, resetPassword, signUpPage, startGamePage } from './Const'
import './app.css'

const router = createBrowserRouter([ 
  { path: homePage, element: <Home />, errorElement: <NotFoundPage /> },
  { path: loginPage, element: <Login /> },
  { path: signUpPage, element: <SignUp /> },
  { path: resetPassword, element: <ForgatPassword /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: startGamePage, element: <StartGamePage /> },
      { path: gamePage, element: <GameController /> },
    ],
  },
])

export default function App() {
  return (<RouterProvider router={ router } />)
}