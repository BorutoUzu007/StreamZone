import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username: username
        },
        select: {
            id:true,
            username: true,
            bio: true,
            imageUrl: true,
            externamUserId: true,
            stream: {
                select: {
                    id: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnail: true,
                    name: true
                }
            },
            _count: {
                select: {
                    followedBy: true
                }
            }
        }
    })
    return user;
}

export const getUserbyId = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id: id
        },
        include: {
            stream: true
        }
    })
    return user;
}