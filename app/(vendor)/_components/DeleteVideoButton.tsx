'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { deleteVendorVideo } from '@/actions/vendor/actions'
import { toast } from 'sonner'

type DeleteVideoButtonProps = {
  videoId: string
}

export const DeleteVideoButton = ({ videoId }: DeleteVideoButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteVendorVideo(videoId)
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    })
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="absolute top-2 right-2"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
