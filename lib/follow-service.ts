import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: {
                id: id
            }
        })

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (self.id === otherUser.id) {
            return true
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })
        return !!existingFollow     //   !! returns a boolean of True or False

    } catch {
        return false
    }
}

export const followUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (self.id === otherUser.id) {
        throw new Error("Cannot follow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (existingFollow) {
        throw new Error("You are already following this user")
    }
    else {
        const newFollow = await db.follow.create({
            data: {
                followerId: self.id,
                followingId: otherUser.id
            },
            include: {
                follower:true,
                following: true
            }
        })

        return newFollow
    }
}

export const unfollowUser = async (id:string) => {
    const self = await getSelf()
    const otherUser = await db.user.findFirst({
        where: {
            id: id
        }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (self.id === otherUser.id) {
        throw new Error("Cannot unfollow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (!existingFollow) {
        throw new Error("You are not following this user")
    }
    else {
        const unFollowUser = await db.follow.delete({
            where: {
                id: existingFollow.id
            },
            include: {
                follower: true,
                following: true
            }
        })
        return unFollowUser
    }

}

export const getFollowed = async () => {
    try {
        const self = await getSelf()
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        })
        return followedUsers
    } catch {
        return []
    }  
}