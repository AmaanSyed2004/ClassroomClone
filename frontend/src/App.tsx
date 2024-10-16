import Home from './pages/Home'
import './App.css'
import Auth from './pages/Auth'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
    <Toaster/>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path="/home" element= {<Home/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
