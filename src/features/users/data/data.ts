import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['APPROVED', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['PENDING', 'bg-neutral-300/40 border-neutral-300'],
  ['VISITED', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'REJECTED',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
] as const

export const participationTypes = [
  {
    label: 'Solo',
    value: 'solo',
  },
  {
    label: 'Team',
    value: 'team',
  },
] as const

export const countries = [
  {
    label: 'Bangladesh',
    value: 'bangladesh',
  },
  {
    label: 'Nepal',
    value: 'nepal',
  },
  {
    label: 'Pakistan',
    value: 'pakistan',
  },
] as const
