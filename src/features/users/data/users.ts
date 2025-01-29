import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    name: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    mobile: faker.phone.number({ style: 'international' }),
    clubName: faker.helpers.arrayElement([
      'Dhaka Club',
      'Chittagong Club',
      'Sylhet Club',
      'Khulna Club',
      'Rajshahi Club',
    ]),
    status: faker.helpers.arrayElement([
      'PENDING',
      'APPROVED',
      'VISITED',
      'REJECTED',
    ]),
    bkashTransactionId: faker.helpers.arrayElement([ faker.string.uuid()]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
