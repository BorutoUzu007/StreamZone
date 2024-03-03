import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string): Promise<boolean> => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: {
                id: id
            }
        })
        if (!otherUser) {
            throw new Error("Usder not found")
        }

        if (self.id === otherUser.id) {
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockingId_blockedId: {
                    blockingId: otherUser.id,
                    blockedId: self.id
                }
            }
        })

        return !!existingBlock
    } catch {
        return false
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: {id}
    })
    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot block yourself")
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockingId_blockedId: {
                blockingId: otherUser.id,
                blockedId: self.id
            }
        }
    })

    if (existingBlock) {
        throw new Error("You are already blocking this user")
    }

    const newBlock = await db.block.create({
        data: {
            blockingId: otherUser.id,
            blockedId: self.id
        },
        include: {
            blocking: true,
            blocked: true
        }
    })

    const isFollowing = await db.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: self.id,
                followingId: otherUser.id
            }
        }
    })

    if (isFollowing) {
        await db.follow.delete({
            where: {
                id: isFollowing.id
            }
        })
    }

    return newBlock
}

export const unBlockUser = async (id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockingId_blockedId: {
                blockingId: otherUser.id,
                blockedId: self.id
            }
        }
    })

    if (!existingBlock) {
        throw new Error("You have not blocked this user")
    }

    const unBlock = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocking: true,
            blocked: true
        }
    })

    return unBlock
}