"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Expert Network', href: '/expert-network' },
  { name: 'Publications', href: '/publications' },
  { name: 'Guidelines', href: '/guidelines' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Analysis Request', href: '/analysis-request' },
  { name: 'Meetings', href: '/meetings' },
  { name: 'Sites', href: '/coimpact/sites' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  const linkClass = (href: string) =>
    pathname === href
      ? 'text-sky-300 font-medium'
      : 'text-white/90 hover:text-white'

  return (
    <nav className="bg-[#1a365d] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-white rounded-md px-3 py-2">
                <Image
                  src="/images/coimpact.png"
                  alt="CO-IMPACT Logo"
                  width={130}
                  height={44}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${linkClass(item.href)} px-2 xl:px-3 py-2 text-sm transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/register"
              className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors"
            >
              Register
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${linkClass(item.href)} block px-3 py-2 text-base`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/register"
              className="block w-full text-center px-4 py-2 mt-2 text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
