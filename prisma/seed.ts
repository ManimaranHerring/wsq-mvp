import { PrismaClient, CourseMode } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const provider = await prisma.organization.upsert({
    where: { name: 'SkilledUp Training' },
    update: {},
    create: {
      type: 'provider',
      name: 'SkilledUp Training',
      wsq_accreditation_no: 'WSQ-12345',
      website: 'https://example-provider.com',
      contact_email: 'hello@example-provider.com',
      verified: true,
    }
  })

  const course1 = await prisma.course.create({
    data: {
      providerId: provider.id,
      title: 'WSQ Advanced Manufacturing Safety',
      description: 'Learn essential safety standards and best practices for modern manufacturing.',
      mode: CourseMode.in_person,
      industry: 'Manufacturing',
      duration_hours: 16,
      location_city: 'Singapore',
      price_min: 300,
      price_max: 500,
      booking_url: 'https://example-provider.com/book/safety'
    }
  })

  const course2 = await prisma.course.create({
    data: {
      providerId: provider.id,
      title: 'WSQ Digital Operations Analytics',
      description: 'Hands-on course in operations analytics and dashboards.',
      mode: CourseMode.online,
      industry: 'Operations',
      duration_hours: 12,
      location_city: 'Singapore',
      price_min: 280,
      price_max: 450,
      booking_url: 'https://example-provider.com/book/ops-analytics'
    }
  })

  await prisma.courseOffering.createMany({
    data: [
      { courseId: course1.id, batch_code: 'SAF-SEP', seats_total: 20, seats_available: 12,
        start_date: new Date(Date.now() + 1000*60*60*24*7), end_date: new Date(Date.now() + 1000*60*60*24*9) },
      { courseId: course2.id, batch_code: 'OPS-OCT', seats_total: 30, seats_available: 27,
        start_date: new Date(Date.now() + 1000*60*60*24*20), end_date: new Date(Date.now() + 1000*60*60*24*22) },
    ]
  })

  console.log('Seeded provider and courses')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
