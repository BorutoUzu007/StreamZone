import { StreamPlayer } from '@/components/stream-player'
import { getSelf, getSelfByUsername } from '@/lib/auth-service'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default async function CreatorPage({params}: CreatorPageProps) {

  const externalUser = await currentUser()
  const user = await getSelfByUsername(params.username)

  if (!user || user.externamUserId !== externalUser?.id || !user.stream) {
    throw new Error('Unauthorised')
  }
  return (
    <div className='h-full'>
      <StreamPlayer 
        user={user}
        stream={user.stream}
        isFollowing={true}
      />
    </div>
  )
}
