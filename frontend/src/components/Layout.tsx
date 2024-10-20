import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import AuthContext from '@/context/AuthContext'
import NavBarTeacher from './teacher/NavbarTeacher'
const Layout:React.FC = () => {
  const userData= useContext(AuthContext)
  return (
    <>
    {userData.role === 'teacher' ? <NavBarTeacher/> : <NavBar/>}
    <main className='min-h-[calc(100vh-5rem)]'>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout