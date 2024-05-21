import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getSelf = async () => {
    const self = await currentUser();
    if (!self || !self.username) {
        throw new Error("Unauthorised")
    }

    try {
        const user = await db.user.findUnique({
            where: {
                externamUserId: self.id,
            }
        })
        if (!user) {
            throw new Error("User not found")
        }
        return user;
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();
    if (!self || !self.username) {
        throw new Error("Unauthorised")
    }

    try {
        const user = await db.user.findUnique({
            where: {
                username: username,
            },
            include: {
                stream: true
            }
        })
        if (!user) {
            throw new Error("User not found")
        }

        if (self.username !== user.username) {
            throw new Error("Unauthorised")
        }
        return user;
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }

}