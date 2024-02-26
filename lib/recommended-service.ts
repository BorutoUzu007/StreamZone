import { db } from "./db";
import { getSelf } from "./auth-service"; 

export const getRecommended = async () => {
    try {
        let user_id
        try {
            let self = await getSelf();
            user_id = self.id
        }
        catch {
            user_id = undefined;
        }
        
        let users = []
        if (user_id) {
            users = await db.user.findMany({
                where: {
                    AND: [{
                        NOT: {
                            id: user_id
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: user_id
                                }
                            }
                        }
                    }
                ]
                },
                orderBy: {
                    createdAt: "desc"
                }

            })
        }
        else {
            users = await db.user.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            })
        }
        return users;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}