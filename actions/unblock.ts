'use server'

import { getSelf } from "@/lib/auth-service"
import { unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onUnBlock = async (id: string) => {
    try {
        const self = await getSelf()
        const unblockedUser = await unBlockUser(id)
        revalidatePath("/")

        revalidatePath(`/u/${self.username}/community`)

        return unblockedUser
    } catch (error) {
        throw new Error(`Internal server error: ${error}`)
    }
}