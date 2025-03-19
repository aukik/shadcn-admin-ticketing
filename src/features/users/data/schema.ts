import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('PENDING'),
  z.literal('APPROVED'),
  z.literal('VISITED'),
  z.literal('REJECTED'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const participationTypeSchema = z.union([
  z.literal('solo'),
  z.literal('team'),
])
export type ParticipationType = z.infer<typeof participationTypeSchema>

const countrySchema = z.union([
  z.literal('bangladesh'),
  z.literal('nepal'),
  z.literal('pakistan'),
  z.string(),
])
export type Country = z.infer<typeof countrySchema>

const teamMemberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  country: countrySchema,
  institution: z.string(),
})
export type TeamMember = z.infer<typeof teamMemberSchema>

const ticketSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  country: countrySchema,
  socialLink: z.string().nullable().optional(),
  email: z.string(),
  phone: z.string(),
  institution: z.string(),
  level: z.string().nullable().optional(),
  participationType: participationTypeSchema,
  soloSegment: z.string().nullable().optional(),
  soloSegmentPrice: z.number().nullable().optional(),
  teamMembersNumber: z.string().nullable().optional(),
  teamSegments: z.string().nullable().optional(),
  teamSegmentPrice: z.number().nullable().optional(),
  teamMembersDetails: z.array(teamMemberSchema).nullable().optional(),
  extemporeLanguage: z.string().nullable().optional(),
  photographyDriveLink: z.string().nullable().optional(),
  tvcDriveLink: z.string().nullable().optional(),
  clubPartner: z.string().nullable().optional(),
  caName: z.string().nullable().optional(),
  ticketCode: z.string(),
  status: userStatusSchema,
  eventId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Ticket = z.infer<typeof ticketSchema>

export const ticketListSchema = z.array(ticketSchema)
