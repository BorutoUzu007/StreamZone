'use server'

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserbyId } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf();
    } catch {
        const id = v4()
        const username = `Guest#${Math.floor(Math.random() * 1000) + 1}`
        self = {id, username}
    }

    const host = await getUserbyId(hostIdentity)

    if (!host) {
        throw new Error("Host not found")
    }

    const isBlocked = await isBlockedByUser(host.id)

    if (isBlocked) {
        throw new Error("You are blocked by the user")
    }

    const isHost = self.id === host.id
    
    const token = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: isHost ? `host-${self.id}` : self.id,
        name: self.username
    })

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    })

    return await Promise.resolve(token.toJwt())
}