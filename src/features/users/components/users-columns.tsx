import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { callTypes } from '../data/data'
import { Ticket, TeamMember } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import {
  IconTrashXFilled,
  IconUsers,
  IconUserCircle,
  IconBrandGoogleDrive,
  IconInfoCircle
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'

// Wrapper components for cells that need useState
function TeamInfoCell({ teamMembersDetails }: { teamMembersDetails: TeamMember[] | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!teamMembersDetails || teamMembersDetails.length === 0) {
    return <div>-</div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <IconUsers className="h-4 w-4" />
          <span>{teamMembersDetails.length} Members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Team Members ({teamMembersDetails.length})</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {teamMembersDetails.map((member, index) => (
            <div key={index} className="border-b last:border-0 py-3">
              <div className="font-medium">{member.firstName} {member.lastName}</div>
              <div className="text-sm text-muted-foreground grid grid-cols-2 gap-1 mt-1">
                <div>Email: {member.email}</div>
                <div>Phone: {member.phone}</div>
                <div>Country: <span className="capitalize">{member.country}</span></div>
                <div>Institution: {member.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TicketDetailsCell({ ticket }: { ticket: Ticket }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <IconInfoCircle className="h-4 w-4" />
          <span>Info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-semibold">Name:</div>
          <div>{ticket.firstName} {ticket.lastName}</div>

          <div className="font-semibold">Email:</div>
          <div>{ticket.email}</div>

          <div className="font-semibold">Phone:</div>
          <div>{ticket.phone}</div>

          <div className="font-semibold">Country:</div>
          <div className="capitalize">{ticket.country}</div>

          <div className="font-semibold">Institution:</div>
          <div>{ticket.institution}</div>

          <div className="font-semibold">Education Level:</div>
          <div>{ticket.level || '-'}</div>

          <div className="font-semibold">Participation Type:</div>
          <div className="capitalize">{ticket.participationType}</div>

          {ticket.participationType === 'solo' && (
            <>
              <div className="font-semibold">Solo Segment:</div>
              <div className="capitalize">{ticket.soloSegment || '-'}</div>

              <div className="font-semibold">Price:</div>
              <div>{ticket.soloSegmentPrice || 0}</div>
            </>
          )}

          {ticket.participationType === 'team' && (
            <>
              <div className="font-semibold">Team Members:</div>
              <div>{ticket.teamMembersNumber || '-'}</div>

              <div className="font-semibold">Team Segments:</div>
              <div className="capitalize">{ticket.teamSegments || '-'}</div>

              <div className="font-semibold">Price:</div>
              <div>{ticket.teamSegmentPrice || 0}</div>
            </>
          )}

          <div className="font-semibold">Club Partner:</div>
          <div>{ticket.clubPartner || '-'}</div>

          <div className="font-semibold">CA Name:</div>
          <div>{ticket.caName || '-'}</div>

          <div className="font-semibold">Ticket Code:</div>
          <div className="font-mono">{ticket.ticketCode}</div>

          <div className="font-semibold">Status:</div>
          <div>{ticket.status}</div>

          <div className="font-semibold">Created:</div>
          <div>{new Date(ticket.createdAt).toLocaleString()}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<Ticket>[] = [
  {
    id: 'placeholder',
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row, table }) => {
      const meta = table.options.meta as { pageIndex: number; pageSize: number }
      const index = meta.pageIndex * meta.pageSize + row.index + 1
      return <div>{index}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div>{`${row.original.firstName} ${row.original.lastName}`}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'participationType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const participationType = row.getValue('participationType') as string
      return (
        <div className="flex items-center gap-2">
          {participationType === 'team' ? (
            <>
              <IconUsers className="h-4 w-4" />
              <span className="capitalize">Team</span>
            </>
          ) : (
            <>
              <IconUserCircle className="h-4 w-4" />
              <span className="capitalize">Solo</span>
            </>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('country')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'institution',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Institution' />
    ),
    cell: ({ row }) => <div>{row.getValue('institution')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'segment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Segment' />
    ),
    cell: ({ row }) => {
      const participationType = row.original.participationType
      const segment = participationType === 'solo'
        ? row.original.soloSegment
        : row.original.teamSegments
      return <div className="capitalize">{segment || '-'}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'teamInfo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Team Info' />
    ),
    cell: ({ row }) => {
      const { participationType, teamMembersDetails } = row.original
      if (participationType !== 'team') {
        return <div>-</div>
      }
      return <TeamInfoCell teamMembersDetails={teamMembersDetails} />
    },
    enableSorting: false,
  },
  {
    accessorKey: 'submissionLinks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Submissions' />
    ),
    cell: ({ row }) => {
      const photographyLink = row.original.photographyDriveLink
      const tvcLink = row.original.tvcDriveLink

      if (!photographyLink && !tvcLink) {
        return <div>-</div>
      }

      return (
        <div className="flex items-center gap-2">
          {photographyLink && (
            <a
              href={photographyLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <IconBrandGoogleDrive className="h-4 w-4" />
              <span>Photography</span>
            </a>
          )}
          {tvcLink && (
            <a
              href={tvcLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <IconBrandGoogleDrive className="h-4 w-4" />
              <span>TVC</span>
            </a>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ticketCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ticket Code' />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.getValue('ticketCode')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Details' />
    ),
    cell: ({ row }) => <TicketDetailsCell ticket={row.original} />,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const { status } = row.original;
      const meta = table.options.meta as {
        openModal: (action: 'accept' | 'reject' | 'delete', ticket: Ticket) => void
      };

      return (
        <div className="flex space-x-2">
          {status === 'PENDING' && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 hover:bg-green-500 hover:text-white"
                onClick={() => meta.openModal('accept', row.original)}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => meta.openModal('reject', row.original)}
              >
                Reject
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => meta.openModal('delete', row.original)}
          >
            <IconTrashXFilled className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
]
