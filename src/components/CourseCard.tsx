'use client'
import Link from 'next/link'

export default function CourseCard({ course, onCompareToggle, checked }: any) {
  const price = course.price_min && course.price_max ? `$${course.price_min}–$${course.price_max}` : '—'
  return (
    <div className="border rounded-2xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={checked} onChange={() => onCompareToggle(course.id)} />
          Compare
        </label>
      </div>
      <p className="text-sm text-gray-600">{course.description}</p>
      <div className="text-sm text-gray-800">Industry: {course.industry || '—'}</div>
      <div className="text-sm text-gray-800">Mode: {course.mode}</div>
      <div className="text-sm text-gray-800">City: {course.location_city || '—'}</div>
      <div className="text-sm text-gray-800">Price: {price}</div>
      <div className="flex gap-3 mt-2">
        <Link href={`/courses/${course.id}`} className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm">View</Link>
        <button
          onClick={async () => {
            const r = await fetch('/api/v1/enrollments', { method: 'POST', body: JSON.stringify({ courseId: course.id }) })
            const data = await r.json()
            window.location.href = data.redirect
          }}
          className="px-3 py-2 rounded-xl bg-black text-white text-sm"
        >
          Enroll / Book
        </button>
      </div>
    </div>
  )
}
