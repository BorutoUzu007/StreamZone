'use client'

import { useMemo } from "react"
import Hint from "../hint"
import { Info } from "lucide-react"

interface ChatInfoProps {
    isChatDelayed: boolean
    isChatFollowersOnly: boolean
}


export const ChatInfo = ({isChatDelayed, isChatFollowersOnly}: ChatInfoProps) => {

    const hint = useMemo(() => {
        if (isChatFollowersOnly && !isChatDelayed) {
            return "Only followers can chat"
        } else if (!isChatFollowersOnly && isChatDelayed) {
            return "Chat is delayed"
        } else if (isChatFollowersOnly && isChatDelayed) {
            return "Only followers can chat & Chat is delayed"
        }
        return ""
    }, [isChatDelayed, isChatFollowersOnly])

    const label = useMemo(() => {
        if (isChatFollowersOnly && !isChatDelayed) {
            return "Followers only"
        } else if (!isChatFollowersOnly && isChatDelayed) {
            return "Delayed chat"
        } else if (isChatFollowersOnly && isChatDelayed) {
            return "Followers only and Delayed chat"
        }
        return ""
    }, [isChatDelayed, isChatFollowersOnly])

    return(
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}