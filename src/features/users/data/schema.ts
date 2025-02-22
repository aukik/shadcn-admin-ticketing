import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('PENDING'),
  z.literal('APPROVED'),
  z.literal('VISITED'),
  z.literal('REJECTED'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

// const userRoleSchema = z.union([
//   z.literal('superadmin'),
//   z.literal('admin'),
//   z.literal('cashier'),
//   z.literal('manager'),
// ])

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
  status: userStatusSchema,
  clubName: z.string(),
  administrativeZone: z.string(),
  bkashTransactionId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
