import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { code: string } }) {
  const s = await prisma.referralSession.findUnique({ where: { referral_code: params.code }, include: { course: true } })
  if (!s || !s.course) return new NextResponse('Invalid link', { status: 404 })
  const base = s.course.booking_url || 'https://example.com'
  const url = new URL(base)
  url.searchParams.set('ref', s.referral_code)
  url.searchParams.set('utm_source', s.utm_source || 'wsq_mvp')
  url.searchParams.set('utm_medium', s.utm_medium || 'redirect')
  url.searchParams.set('utm_campaign', s.utm_campaign || 'enroll')
  return NextResponse.redirect(url.toString(), 302)
}
