import Link from 'next/link'
import CourseCard from '@/components/CourseCard'

async function getCourses(search: string | null) {
  const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/v1/courses`)
  if (search) url.searchParams.set('query', search)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  return res.json()
}

export default async function CoursesPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : null
  const data = await getCourses(query)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Courses</h1>
      {query && <div className="text-sm text-gray-600">Results for “{query}”</div>}
      <CompareClient initialCourses={data.items} />
    </div>
  )
}

'use client'
import { useState } from 'react'
function CompareClient({ initialCourses }: any) {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : (prev.length >= 3 ? prev : [...prev, id]))
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Link href={`/compare?ids=${selected.join(',')}`} className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm disabled:opacity-50"
          aria-disabled={selected.length === 0} onClick={(e) => selected.length === 0 && e.preventDefault()}>
          Compare ({selected.length})
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialCourses.map((c: any) => (
          <CourseCard key={c.id} course={c} onCompareToggle={toggle} checked={selected.includes(c.id)} />
        ))}
      </div>
    </div>
  )
}
