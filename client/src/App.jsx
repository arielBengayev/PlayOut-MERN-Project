import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./components/home/Home"
import LogIn from "./components/registration/LogIn"
import SignUp from "./components/registration/SignUp"
import NotFoundPage from './components/notFoundPage/NotFoundPage'
import ForgatPassword from './components/registration/ForgatPassword'

import SpaceInvaders from './components/spaceInvaders/SpaceInvaders'
import Snake from './components/snake/Snake'
import RandomGame from './components/RandomGame'
import TicTacToe from './components/ticTacToe/TicTacToe'
import MemoryGame from './components/memoryGame/MemoryGame'
import PopUp from './components/popUp/PopUp'


const router = createBrowserRouter([
  {path: '/', element: <LogIn />, errorElement: <NotFoundPage />},
  {path: '/home', element: <Home />, children: []},
  {path: '/signUp', element: <SignUp />},
  {path: '/reset', element: <ForgatPassword/>},
  {path: '/snake', element: <Snake/>},
  {path: '/spaceInvaders', element: <SpaceInvaders/>},
  {path: '/ticTacToe', element: <TicTacToe/>},
  {path: '/memoryGame', element: <MemoryGame/>},
  {path: '/game', element: <RandomGame/>},
  {path: '/nextGame', element: <PopUp/>},
])

export default function App() {
  return (
      <RouterProvider router={router} />
  )
}