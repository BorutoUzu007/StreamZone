'use client'

import { UpdateUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { ElementRef, FormEvent, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface BioModelProps {
    initialValue: string | null
}

export const BioModel = ({initialValue}: BioModelProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [value, setValue] = useState(initialValue || "")
    const [isPending, startTransition] = useTransition()

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement  >) => {
        setValue(e.target.value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            UpdateUser({bio: value})
            .then(() => {
                toast.success("Bio updated successfully")
                closeRef.current?.click()
            })
            .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='ml-auto' variant="link" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit user bio  
                        </DialogTitle>      
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <Textarea 
                        placeholder='Bio'
                        onChange={onChange}
                        value={value}
                        disabled={isPending}
                        className='resize-none'
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type='button' variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type='submit' variant="primary" disabled={isPending}>
                                Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}