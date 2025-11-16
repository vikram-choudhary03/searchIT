

import React from 'react'
import { NavLink } from 'react-router'

export default function Sidebar() {

    const linkClass = (isActive) =>
        `block px-4 py-2 rounded-lg ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`
  
    return (
    <aside className='w-64 bg-white border-r hidden md:block'>

        <div className='p-6'>
            <h2 className='text-2xl font-semibold'>SearchIT</h2>
            <p className='text-sm text-gray-500 mt-1'>Internal Search</p>
        </div>

        <nav>
            <NavLink to="/" className={({isActive}) => linkClass(isActive)}>Dashboard</NavLink>
            <NavLink to="/search" className={({isActive}) => linkClass(isActive)}>Search</NavLink>
        </nav>
    </aside>
  )
}
