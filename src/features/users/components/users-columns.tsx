import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'  // Import your Button component
import { callTypes } from '../data/data'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import {IconTrashXFilled} from "@tabler/icons-react";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
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
    accessorKey: 'mobile',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('mobile')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'clubName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Club Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('clubName')}</div>,
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
    accessorKey: 'bkashTransactionId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bkash Transaction ID' />
    ),
    cell: ({ row }) => <div>{row.getValue('bkashTransactionId')}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const { status } = row.original;
      const meta = table.options.meta as {
        openModal: (action: 'accept' | 'reject' | 'delete', user: User) => void
      };

      return (
        <div className="flex space-x-2">
          {status === 'PENDING' && (
            <>
              <Button
                variant="outline"
                className="text-green-500 hover:bg-green-500"
                onClick={() => meta.openModal('accept', row.original)}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                className="text-red-500 hover:bg-red-500"
                onClick={() => meta.openModal('reject', row.original)}
              >
                Reject
              </Button>
            </>
          )}
          <Button
            className='text-red-500 dark:bg-black bg-white dark:hover:bg-red-500  hover:bg-red-500 hover:text-white'
            onClick={() => meta.openModal('delete', row.original)}
          >
            <IconTrashXFilled />
          </Button>
        </div>
      );
    },
  },
]
