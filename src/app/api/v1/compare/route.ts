import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const ids: string[] = Array.isArray(body.courseIds) ? body.courseIds.slice(0,3) : []
  if (ids.length === 0) return NextResponse.json({ items: [] })

  const courses = await prisma.course.findMany({
    where: { id: { in: ids } },
    select: { id: true, title: true, industry: true, mode: true, location_city: true, duration_hours: true, price_min: true, price_max: true }
  })

  const items = courses.map(c => ({
    id: c.id,
    title: c.title,
    industry: c.industry,
    mode: c.mode,
    location_city: c.location_city,
    duration_hours: c.duration_hours,
    price_range: (c.price_min ?? '—') + ' - ' + (c.price_max ?? '—'),
  }))

  return NextResponse.json({ items })
}
