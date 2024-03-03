"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { getSelf } from "@/lib/auth-service"

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const stream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        })
        if (!stream) throw new Error("Stream not found")

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        }
        const updateStream = await db.stream.update({
            where: {
                id: stream.id,
            },
            data: {
                ...validData
            }
        })
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return updateStream
    } catch(err) {
        throw new Error(`Internal Server Error ${err}`)
    }
}