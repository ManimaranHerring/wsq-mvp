export const dynamic = 'force-dynamic'

async function getComparison(ids: string[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/v1/compare`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ courseIds: ids })
  })
  return res.json()
}

export default async function ComparePage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const ids = typeof searchParams.ids === 'string' ? searchParams.ids.split(',').filter(Boolean) : []
  const data = ids.length ? await getComparison(ids) : { items: [] }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Compare</h1>
      {ids.length === 0 && <div className="text-sm text-gray-600">Select up to 3 courses from the list to compare.</div>}
      {ids.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Field</th>
                {data.items.map((c: any) => <th key={c.id} className="p-2 text-left">{c.title}</th>)}
              </tr>
            </thead>
            <tbody>
              {['industry','mode','location_city','duration_hours','price_range'].map((f) => (
                <tr key={f} className="border-t">
                  <td className="p-2 font-semibold">{f.replace('_',' ')}</td>
                  {data.items.map((c: any) => <td key={c.id+f} className="p-2">{c[f] ?? '—'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
