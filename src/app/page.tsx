import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-10">
      <h1 className="text-3xl font-semibold">Find WSQ-approved courses</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 border rounded-2xl">Search and compare courses</div>
        <div className="p-4 border rounded-2xl">Book via provider with referral tracking</div>
        <div className="p-4 border rounded-2xl">Simple admin & provider portals (coming soon)</div>
      </div>
    </div>
  )
}
