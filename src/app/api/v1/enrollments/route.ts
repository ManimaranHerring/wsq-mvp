import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

function code() { return randomBytes(4).toString('hex') }

export async function POST(req: NextRequest) {
  const { courseId } = await req.json()
  if (!courseId) return NextResponse.json({ error: 'courseId required' }, { status: 400 })
  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  const referral = await prisma.referralSession.create({
    data: {
      referral_code: code(),
      courseId: course.id,
      providerId: course.providerId,
      utm_source: 'wsq_mvp',
      utm_medium: 'redirect',
      utm_campaign: 'enroll'
    }
  })

  await prisma.enrollment.create({
    data: {
      courseId: course.id,
      status: 'clicked',
      referralSessionId: referral.id
    }
  })

  return NextResponse.json({ redirect: `/r/${referral.referral_code}` })
}
