'use server'

import { unfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"

export const onUnfollow = async (id: string) => {
    const unFollowedUser = await unfollowUser(id);
    revalidatePath("/");

    if (unFollowedUser) {
        revalidatePath(`/${unFollowedUser.following.username}`);
    }
    return unFollowedUser;
}