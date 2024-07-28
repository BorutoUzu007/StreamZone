import { LiveBadge } from "@/components/live-badge";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultCardProps {
    result: {
        id: string
        name: string
        thumbnail: string | null
        isLive: boolean} & { user: User};
}

export const ResultCard = ({result}: ResultCardProps) => {
    return (
        <Link href={`/${result.user.username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail src={result.thumbnail} fallback={result.user.imageUrl} isLive={result.isLive} username={result.user.username} />
                <div className="flex gap-x-3">
                    <UserAvatar 
                        username={result.user.username}
                        imageUrl={result.user.imageUrl}
                        isLive={result.isLive}
                    /> 
                    <div className="flex flex-col text-sm overflow-hidden">
                    <p className="truncate font-semibold hover:text-blue-500">
                        {result.name}
                    </p>
                    <p className="text-muted-foreground">
                        {result.user.username}
                    </p>
                </div> 
                </div>
                
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    )
}