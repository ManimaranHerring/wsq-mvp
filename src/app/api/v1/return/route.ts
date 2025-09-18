import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ref = searchParams.get('ref')
  const status = searchParams.get('status') as 'booked' | 'cancelled' | null
  if (!ref || !status) return NextResponse.json({ error: 'ref and status required' }, { status: 400 })

  const session = await prisma.referralSession.findUnique({ where: { referral_code: ref } })
  if (!session) return NextResponse.json({ error: 'Invalid ref' }, { status: 404 })

  await prisma.enrollment.updateMany({
    where: { referralSessionId: session.id },
    data: { status }
  })

  return NextResponse.json({ ok: true })
}
