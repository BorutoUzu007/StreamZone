import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'

interface UserPageProps {
    params: {
        username: string
    }
}

export default async function Username({params}: UserPageProps) {

  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockedByUser(user.id)
  // const isFollowing = true

  return (
    <div className='flex flex-col gap-y-4'>
        <p>
          User: {user.username}
        </p>
        <p>
          User ID: {user.id}
        </p>
        <p>
          Is Following?  {`${isFollowing}`}
        </p>
        <p>
          Is Blocking?  {`${isBlocking}`}
        </p>
        <Actions userId={user.id} isFollowing={isFollowing} isBlocking={isBlocking} />
    </div>
  )
}
