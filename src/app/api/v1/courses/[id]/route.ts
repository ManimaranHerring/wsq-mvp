import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const c = await prisma.course.findUnique({
    where: { id: params.id },
    include: { offerings: true }
  })
  if (!c) return new NextResponse('Not found', { status: 404 })
  return NextResponse.json(c)
}
