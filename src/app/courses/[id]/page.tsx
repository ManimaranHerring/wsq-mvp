async function getCourse(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/v1/courses/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Not found')
  return res.json()
}

export default async function CourseDetail({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{course.title}</h1>
      <p className="text-gray-700">{course.description}</p>
      <div className="text-sm">Industry: {course.industry || '—'}</div>
      <div className="text-sm">Mode: {course.mode}</div>
      <div className="text-sm">City: {course.location_city || '—'}</div>
      <div className="text-sm">Duration: {course.duration_hours || '—'} hours</div>
      <div className="text-sm">Price: {course.price_min || '—'} – {course.price_max || '—'}</div>
      <div>
        <h3 className="font-semibold mt-4">Upcoming Offerings</h3>
        <ul className="list-disc ml-6">
          {course.offerings?.map((o: any) => (
            <li key={o.id}>{o.batch_code || 'Batch'} — {o.start_date?.slice(0,10)} to {o.end_date?.slice(0,10)} — Seats: {o.seats_available ?? '—'}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
