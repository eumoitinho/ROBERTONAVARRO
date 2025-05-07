"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="text-white p-2 focus:outline-none" aria-label="Abrir menu">
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 focus:outline-none"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/despertar-milionario" onClick={() => setIsOpen(false)}>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mt-4">
                Despertar Milionário
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
