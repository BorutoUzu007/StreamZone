'use client'

import { onFollow } from "@/actions/follow"
import { onUnfollow } from "@/actions/unfollow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({isFollowing, userId}: ActionProps) => {
    const [isPending, startTransition] = useTransition()
    
    const onClick = () => {
        startTransition(() => {
            if (isFollowing) {
                onUnfollow(userId)
                .then((data) => toast.success(`Unfollowed the user ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
            }
            else {
                onFollow(userId)
                .then((data) => toast.success(`Followed the user ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
            }
        })
        
    }

    return(
        <Button disabled={isPending} onClick={onClick} variant='primary'>
            {isFollowing ? (<span>Unfollow</span>) : (<span>Follow</span>)}
        </Button>
    )
}