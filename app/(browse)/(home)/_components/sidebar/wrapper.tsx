'use client'
import { useSidebar } from '@/store/use-sidebar';
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils';
import { ToggleSkeleton } from './toggle';
import { RecommendedSkeleton } from './recommended';
import { FollowingSkeleton } from './followed';

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({
    children
}: WrapperProps) {
    const [isClient, setIsClient] = useState(false)
    const {collapsed} = useSidebar((state) => state)

    useEffect(() => {
      setIsClient(true)
    }, [])

    if (!isClient) return (
      <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )

  return (
    <aside className={cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50', collapsed && "w-[70px]")}>
        {children}
    </aside>
  )
}
