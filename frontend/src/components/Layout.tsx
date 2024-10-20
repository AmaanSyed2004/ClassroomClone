import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'
const Layout:React.FC = () => {
  return (
    <>
    <NavBar/>
    <main className='min-h-[calc(100vh-5rem)]'>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout