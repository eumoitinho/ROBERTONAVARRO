"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClickOutside } from "@/hooks/use-click-outside"

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
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => {
    if (isOpen) setIsOpen(false)
  })

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
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col" ref={menuRef}>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 focus:outline-none"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-6 px-6 overflow-y-auto">
            {links.map((link) => (
              <div key={link.label} className="w-full max-w-xs flex flex-col items-center">
                {link.submenu ? (
                  <>
                    <button
                      className="text-lg font-medium text-white hover:text-yellow-400 transition-colors flex items-center gap-2 py-2"
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
                      <div className="mt-2 flex flex-col items-center gap-3 w-full bg-zinc-900/50 rounded-lg p-3">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="text-base text-zinc-300 hover:text-yellow-400 transition-colors py-2"
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
                    className="text-lg font-medium text-white hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
              <Link href="/crencas-da-riqueza" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Crenças da Riqueza
                </Button>
              </Link>
              <Link href="/contato" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Contato
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
