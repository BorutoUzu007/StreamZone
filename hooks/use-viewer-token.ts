import { createViewerToken } from "@/actions/token"
import { useEffect, useState } from "react"
import {JwtPayload, jwtDecode} from "jwt-decode"
import { toast } from "sonner"

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            try{
                const viewerToken = await createViewerToken(hostIdentity)
                console.log(`viewerToken = ${viewerToken}`)
                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string }
                console.log(`decodedToken = ${JSON.stringify(decodedToken)}`)
                const name = decodedToken?.name
                const identity = decodedToken.sub

                if (name) setName(name)
                if (identity) setIdentity(identity)

            } catch {
                toast.error("Something went wrong")
            }
        }

        createToken()
    }, [hostIdentity])
    console.log("hello")
    console.log({token, name, identity})

    return {
        token, 
        name,
        identity
    }

}