'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

export const ConnectModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='primary'>
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select>
                <SelectTrigger>
                     <SelectValue placeholder='Ingress Type' />   
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='RTMP'>RTMP</SelectItem>
                    <SelectItem value='WHIP'>WHIP</SelectItem>
                </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>This action will reset all active streams using the connection</AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={() => {}} variant="primary">
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}