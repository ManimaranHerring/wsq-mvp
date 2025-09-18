import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || undefined
  const take = 20
  const page = parseInt(searchParams.get('page') || '1', 10)
  const skip = (page - 1) * take

  const where: any = {
    is_published: true,
    AND: []
  }
  if (query) {
    where.AND.push({
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { industry: { contains: query, mode: 'insensitive' } },
        { location_city: { contains: query, mode: 'insensitive' } },
      ]
    })
  }

  const [items, total] = await Promise.all([
    prisma.course.findMany({
      where, skip, take, orderBy: { created_at: 'desc' },
      select: { id: true, title: true, description: true, mode: true, industry: true, location_city: true, price_min: true, price_max: true }
    }),
    prisma.course.count({ where })
  ])

  return NextResponse.json({ items, page, total })
}
