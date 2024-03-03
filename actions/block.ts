'use server'

import { blockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
    try {
        const blockedUser = await blockUser(id)
        revalidatePath("/")

        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocking.username}`)
        }
        return blockedUser
    } catch (error) {
        throw new Error(`Internal server error: ${error}`)
    }
}