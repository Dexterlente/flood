'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const NavBar = () => {
    const router = useRouter()

  return (
    <div 
    onClick={() => router.push('/')}  
    className="flex justify-center items-center h-16 bg-gray-100 font-bold text-xl cursor-pointer">
      FLOOD CONTROL PROJECTS
    </div>
  )
}

export default NavBar
