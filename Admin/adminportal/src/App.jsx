import './App.scss'
import Home from './pages/home/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Single from './pages/single/Single'
import List from './pages/list/List'
import New from './pages/new/New'
import { hotelInputs, roomInputs, userInputs, productInputs } from './formSource'
import '../src/style/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/AuthContext'
import { hotelColums, roomColums, userColumns } from './datatablesource'
import NewRoom from '../src/pages/newRoom/NewRoom'
import NewHotel from './pages/newHotel/NewHotel'

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to='/login' />
    }

    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='users'>
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=':userId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
            </Route>
            <Route path='hotels'>
              <Route index element={<ProtectedRoute><List columns={hotelColums} /></ProtectedRoute>} />
              <Route path=':productId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewHotel  inputs={hotelInputs} /></ProtectedRoute>} />
            </Route>
            <Route path='rooms'>
              <Route index element={<ProtectedRoute><List columns={roomColums} /></ProtectedRoute>} />
              <Route path=':productId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewRoom /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
