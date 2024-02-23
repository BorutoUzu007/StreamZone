import { db } from "./db";
import { getSelf } from "./auth-service"; 

export const getRecommended = async () => {
    try {
        const users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return users;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}