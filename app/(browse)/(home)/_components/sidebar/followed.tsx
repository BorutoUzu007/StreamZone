'use client'

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./userItem"

interface FollowedSidebarProps {
    data: (Follow & { following: User & {
        stream: {isLive: boolean} | null
    }})[]
}

export const FollowedSidebar = ({data}: FollowedSidebarProps) => {
    const {collapsed} = useSidebar((state) => state)
    const showLabel: boolean = !collapsed && data.length > 0
    for (var i=0;i<data.length;i++) {
        console.log(`${data[i].following.username} = ${data[i].following.stream?.isLive}`)
    }

    return(
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Followed
                    </p> 
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user)=> (
                    <UserItem 
                        key={user.following.id}
                        username={user.following.username}
                        imageUrl={user.following.imageUrl}
                        isLive= {user.following.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul>
           {[...Array(4)].map((_, i) => (
            <UserItemSkeleton key={i} />
           ))} 
        </ul>
    )
}