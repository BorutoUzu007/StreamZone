import React from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { getBlockedUsers } from '@/lib/block-service'
import { format } from 'date-fns'


export default async function CommunityPage() {

  const blockedUsers = await getBlockedUsers()

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocking.id,
    imageUrl: block.blocking.imageUrl,
    username: block.blocking.username,
    createdAt: format(new Date(block.blocking.createdAt), "dd/MM/yyyy")
  }))
  return (
    <div className='p-6'>
        <div className="mb-4">
            <h1 className='text-2xl font-bold'>Community Settings</h1>
            <div className="container py-10">
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    </div>
  )
}
