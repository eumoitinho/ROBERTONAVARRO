"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  links: {
    href: string
    label: string
    submenu?: {
      href: string
      label: string
    }[]
  }[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (label: string) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(label)
    }
  }

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
              <div key={link.label} className="w-full max-w-xs flex flex-col items-center">
                {link.submenu ? (
                  <>
                    <button
                      className="text-lg font-medium text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
                      onClick={() => toggleSubmenu(link.label)}
                    >
                      {link.label}
                      {openSubmenu === link.label ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {openSubmenu === link.label && (
                      <div className="mt-2 flex flex-col items-center gap-2">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="text-base text-zinc-300 hover:text-yellow-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-medium text-white hover:text-yellow-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/crencas-da-riqueza" onClick={() => setIsOpen(false)}>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mt-4">
                Crenças da Riqueza
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
