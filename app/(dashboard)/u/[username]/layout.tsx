import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from './(home)/_components/navbar'
import { Sidebar } from './(home)/_components/sidebar'
import { Container } from './(home)/_components/container'

interface CreatorLayoutParams {
  params: { username: string }
  children: React.ReactNode
}

export default async function CreatorLayout({ params, children}: CreatorLayoutParams) {

  const self = await getSelfByUsername(params.username)
  if (!self) {
    redirect('/')
  }
  return (
    <>
    <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}
