import React from 'react'
import { Logo } from './logo'
import Actions from './actions'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[29] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
        <Logo />
        <Actions />
    </nav>
  )
}
