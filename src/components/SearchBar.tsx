'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const [q, setQ] = useState('')
  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for WSQ courses…"
        className="border rounded-xl px-4 py-2 w-full"
      />
      <button
        onClick={() => router.push(`/courses?q=${encodeURIComponent(q)}`)}
        className="px-4 py-2 rounded-xl bg-black text-white"
      >
        Search
      </button>
    </div>
  )
}
