'use server'

import { unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onUnBlock = async (id: string) => {
    try {
        const unblockedUser = await unBlockUser(id)
        revalidatePath("/")

        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocking.username}`)
        }
        return unblockedUser
    } catch (error) {
        throw new Error(`Internal server error: ${error}`)
    }
}