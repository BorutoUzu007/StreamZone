'use server'

import { getSelf } from "@/lib/auth-service"
import { blockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export const onBlock = async (id: string) => {
    try {
        const self = await getSelf()
        let blockedUser
        try {
            blockedUser = await blockUser(id)
        } catch {
            // this means user is a guest
        }
        try {
            await roomService.removeParticipant(self.id, id)
        } catch {
            // This means user is not in a room
        }
        
        revalidatePath(`/u/${self.username}/community`)
        return blockedUser
    } catch (error) {
        throw new Error(`Internal server error: ${error}`)
    }
}