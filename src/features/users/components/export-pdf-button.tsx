import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconFileDownload } from '@tabler/icons-react'
import { useApi } from '@/hooks/use-api'
import { Ticket } from '../data/schema'

export function ExportPDFButton() {
  const [isLoading, setIsLoading] = useState(false)
  const api = useApi(true)

  const handleExportCSV = async () => {
    try {
      setIsLoading(true)

      // Call API to get all tickets
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}api/v1/admin/tickets/getAllTickets`,
        {
          params: {
            eventId: import.meta.env.VITE_EVENT_ID,
          }
        }
      )

      // The response appears to be an array directly, not in an 'items' property
      const tickets: Ticket[] = Array.isArray(response.data) ? response.data : []

      if (!tickets || tickets.length === 0) {
        alert('No tickets found to export')
        setIsLoading(false)
        return
      }

      // Define CSV columns - include as many fields as possible
      const csvColumns = [
        'ID',
        'Ticket Code',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Status',
        'Institution',
        'Country',
        'Level',
        'Participation Type',
        'Solo Segment',
        'Solo Segment Price',
        'Team Members Number',
        'Team Segments',
        'Team Segment Price',
        'Social Link',
        'CA Name',
        'Club Partner',
        'Extempore Language',
        'Created Date',
        'Updated Date'
      ]

      // Map the data to CSV rows with more fields
      const csvRows = tickets.map(ticket => [
        ticket.id,
        ticket.ticketCode,
        ticket.firstName,
        ticket.lastName,
        ticket.email,
        ticket.phone,
        ticket.status,
        ticket.institution,
        ticket.country,
        ticket.level || '-',
        ticket.participationType,
        ticket.soloSegment || '-',
        ticket.soloSegmentPrice || 0,
        ticket.teamMembersNumber || '-',
        ticket.teamSegments || '-',
        ticket.teamSegmentPrice || 0,
        ticket.socialLink || '-',
        ticket.caName || '-',
        ticket.clubPartner || '-',
        ticket.extemporeLanguage || '-',
        new Date(ticket.createdAt).toLocaleString(),
        new Date(ticket.updatedAt).toLocaleString()
      ])

      // Create CSV content
      let csvContent = csvColumns.join(',') + '\n'

      // Add row data with proper escaping
      csvRows.forEach(row => {
        const escapedRow = row.map(field => {
          // Escape quotes and wrap fields with commas or quotes in double quotes
          if (typeof field === 'string' && (field.includes(',') || field.includes('"'))) {
            return `"${field.replace(/"/g, '""')}"`
          }
          return field
        })
        csvContent += escapedRow.join(',') + '\n'
      })

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', 'tickets-report.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch {
      // Catch without binding the error parameter
      alert('Error exporting CSV')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant='outline'
      className='flex items-center gap-1'
      onClick={handleExportCSV}
      disabled={isLoading}
    >
      {isLoading ? 'Exporting...' : (
        <>
          <IconFileDownload size={18} />
          <span>Export CSV</span>
        </>
      )}
    </Button>
  )
}
