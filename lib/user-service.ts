import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username: username
        },
        include: {
            stream: true,
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