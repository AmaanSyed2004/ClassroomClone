import Home from './pages/Home'
import './App.css'
import Auth from './pages/Auth'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <>
    <Toaster/>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path="/home" element= {<ProtectedRoute/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
