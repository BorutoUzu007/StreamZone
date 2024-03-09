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
                    },
                    {
                        NOT: {
                            Blocking: {
                                some: {
                                    blockedId: user_id
                                }
                            }
                        }
                    }
                ]
                },
                include: {
                    stream: true
                },
                orderBy: {
                    createdAt: "desc"
                }

            })
        }
        else {
            users = await db.user.findMany({
                include: {
                    stream: true
                },
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