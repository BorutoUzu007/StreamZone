'use client'

import { onBlock } from "@/actions/block"
import { onFollow } from "@/actions/follow"
import { onUnBlock } from "@/actions/unblock"
import { onUnfollow } from "@/actions/unfollow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps {
    isFollowing: boolean
    isBlocking: boolean
    userId: string
}

export const Actions = ({isFollowing, isBlocking, userId}: ActionProps) => {
    const [isPending, startTransition] = useTransition()
    
    const onClickFollow = () => {
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

    const onClickBlock = () => {
        startTransition(() => {
            if (isBlocking) {
                onUnBlock(userId)
                .then((data) => toast.success(`Unblocked the user ${data.blocking.username}`))
                .catch(() => toast.error("Something went wrong"))
            }
            else {
                onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data.blocking.username}`))
                .catch(() => toast.error("Something went wrong"))
            }
        })
        
    }

    return(
        <div className='flex flex-col gap-y-2'>
            <Button disabled={isPending || isBlocking} onClick={onClickFollow} variant='primary'>
                {isFollowing ? (<span>Unfollow</span>) : (<span>Follow</span>)}
            </Button>
            <Button disabled={isPending} onClick={onClickBlock} variant='secondary'>
                {isBlocking ? (<span>Unblock</span>) : (<span>Block</span>)}
            </Button>
        </div>
        
    )
}