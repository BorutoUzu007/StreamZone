import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'
import { StreamPlayer } from '@/components/stream-player'

interface UserPageProps {
    params: {
        username: string
    }
}

export default async function UserPage({params}: UserPageProps) {

  const user = await getUserByUsername(params.username)
  if (!user || !user.stream) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)
  console.log(isBlocked)
  console.log(isFollowing)

  if (isBlocked) {
    notFound()
  }
  return (
    <StreamPlayer 
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  )
}
