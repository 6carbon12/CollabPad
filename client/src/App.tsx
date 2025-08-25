import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ToastProvider from './components/toast/ToastProvider'
import TokenProvider from './components/token/TokenProvider'

function App() {
  return (
    <ToastProvider>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </ToastProvider>
  )
}

export default App
