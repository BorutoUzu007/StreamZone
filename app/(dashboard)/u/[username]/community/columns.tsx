"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UserAvatar } from "@/components/user-avatar"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { UnblockButton } from "./unblock-button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
  id: string
  userId: string
  imageUrl: string
  createdAt: string
  username: string
}

export const columns: ColumnDef<BlockedUser>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
    accessorKey: "username",
    header:({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => (
        <div className="flex items-center gap-x-4">
            <UserAvatar username={row.original.username} imageUrl={row.original.imageUrl} />
            <span>{row.original.username}</span>
        </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date Blocked",
  },
  {
    id: "actions",
    cell: ({row}) => <UnblockButton userId={row.original.userId} />
  },
]
