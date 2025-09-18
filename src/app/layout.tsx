import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">WSQ Courses</Link>
            <nav className="text-sm">
              <Link href="/courses" className="hover:underline">Browse</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t mt-10">
          <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-gray-500">
            © {new Date().getFullYear()} WSQ Courses MVP
          </div>
        </footer>
      </body>
    </html>
  )
}
