'use client'

import { updateStream } from '@/actions/stream'
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/lib/uploadthing'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface InfoModelProps {
    initialName: string 
    initialThumbnail: string | null
}

export const InfoModel = ({initialName, initialThumbnail}: InfoModelProps) => {

    const [isPending, startTransition] = useTransition()
    const [name, setName] = useState(initialName)
    const [thumbnail, setThumbnail] = useState(initialThumbnail)
    const router = useRouter()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({name: name})
            .then(() => toast.success("Stream updated"))
            .catch(() => toast.error("Something went wrong"))
        })
    }
    const onRemoveThumbnail = () => {
        startTransition(() => {
            updateStream({thumbnail: null})
            .then(() => {
                toast.success("Thumbnail removed")
                setThumbnail("")
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
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-14'>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder='Stream name'
                            onChange={onChange} 
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnail ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint label='Remove thumbnail' asChild side='left'>
                                        <Button type='button' disabled={isPending} onClick={onRemoveThumbnail} className='h-auto w-auto p-1.5'>
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image src={thumbnail} alt="Thumbnail" fill className='object-cover' />
                            </div>
                        ) : (
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone 
                                endpoint='thumbnailUploader'
                                appearance={{
                                    label: {
                                        color: "#FFFFFF"
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    setThumbnail(res?.[0]?.url)
                                    router.refresh()
                                }}
                            />
                        </div>
                        )}
                    </div>
                    
                    <div className='flex justify-between'>
                        <DialogClose asChild>
                            <Button type='button' variant="ghost"> 
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type='submit' variant="primary" disabled={isPending}> 
                                Save
                            </Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}