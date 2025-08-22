"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useRef } from "react"

interface NavigationItem {
  _id: string
  title: string
  slug?: {
    current: string
  }
  href?: string
  children?: NavigationItem[]
  isExternal?: boolean
}

interface DynamicHeaderProps {
  navigationData?: {
    mainNavigation?: NavigationItem[]
    ctaButton?: {
      text: string
      link: string
      style: 'primary' | 'secondary'
    }
  }
  siteSettings?: {
    title?: string
    logo?: any
  }
}

export function DynamicHeader({ navigationData, siteSettings }: DynamicHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => {
    if (openSubmenu) setOpenSubmenu(null)
  })

  // Fallback navigation if Sanity is not available
  const defaultNavigation = {
    mainNavigation: [
      {
        _id: '1',
        title: 'Início',
        href: '/'
      },
      {
        _id: '2',
        title: 'Formações',
        children: [
          { _id: '2.1', title: 'Método TF', href: '/formacoes/metodo-tf' },
          { _id: '2.2', title: 'Mentor Coaching Financeiro', href: '/formacoes/mentor-coaching-financeiro' },
          { _id: '2.3', title: 'Todas as Formações', href: '/formacoes' }
        ]
      },
      {
        _id: '3',
        title: 'Livros',
        children: [
          { _id: '3.1', title: 'Coaching Financeiro', href: '/livros/coaching-financeiro' },
          { _id: '3.2', title: 'A Arte de Enriquecer', href: '/livros/arte-de-enriquecer' },
          { _id: '3.3', title: 'Todos os Livros', href: '/livros' }
        ]
      },
      {
        _id: '4',
        title: 'Eventos',
        href: '/eventos'
      },
      {
        _id: '5',
        title: 'Blog',
        href: '/blog'
      }
    ],
    ctaButton: {
      text: 'Comece Agora',
      link: '/formacoes',
      style: 'primary' as const
    }
  }

  const navigation = navigationData || defaultNavigation

  const toggleSubmenu = (menuId: string) => {
    if (openSubmenu === menuId) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(menuId)
    }
  }

  const getItemLink = (item: NavigationItem) => {
    if (item.href) return item.href
    if (item.slug?.current) return `/${item.slug.current}`
    return '#'
  }

  const renderNavigationItem = (item: NavigationItem, isMobile: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0
    
    if (hasChildren) {
      return (
        <div key={item._id} className={`relative ${isMobile ? 'block' : 'group'}`} ref={dropdownRef}>
          <button
            onClick={() => isMobile ? toggleSubmenu(item._id) : undefined}
            onMouseEnter={() => !isMobile ? setOpenSubmenu(item._id) : undefined}
            className={`${
              isMobile ? 'w-full text-left px-4 py-3' : 'px-3 py-2'
            } text-sm hover:text-yellow-400 transition-colors flex items-center gap-1`}
          >
            {item.title}
            {hasChildren && (
              <span className="ml-1">
                {openSubmenu === item._id && isMobile ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </span>
            )}
          </button>
          
          {openSubmenu === item._id && (
            <div className={`${
              isMobile 
                ? 'bg-zinc-800 border-t border-zinc-700' 
                : 'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5 z-50'
            }`}>
              <div className={isMobile ? 'py-2' : 'py-1'}>
                {item.children?.map((child) => (
                  <Link
                    key={child._id}
                    href={getItemLink(child)}
                    className={`${
                      isMobile ? 'block px-8 py-2' : 'block px-4 py-2'
                    } text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400`}
                    onClick={() => {
                      if (isMobile) {
                        setIsMenuOpen(false)
                        setOpenSubmenu(null)
                      } else {
                        setOpenSubmenu(null)
                      }
                    }}
                    target={child.isExternal ? '_blank' : undefined}
                    rel={child.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item._id}
        href={getItemLink(item)}
        className={`${
          isMobile ? 'block px-4 py-3' : 'px-3 py-2'
        } text-sm hover:text-yellow-400 transition-colors`}
        onClick={() => isMobile && setIsMenuOpen(false)}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {siteSettings?.logo ? (
            <div className="h-10 w-auto">
              {/* Implement Sanity image rendering here */}
              <Logo className="h-10 w-auto" />
            </div>
          ) : (
            <Logo className="h-10 w-auto" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navigation.mainNavigation?.map((item) => renderNavigationItem(item))}
        </nav>

        {/* CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {navigation.ctaButton && (
            <Button
              asChild
              variant={navigation.ctaButton.style === 'primary' ? 'default' : 'outline'}
              size="sm"
              className={
                navigation.ctaButton.style === 'primary'
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
                  : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              }
            >
              <Link href={navigation.ctaButton.link}>
                {navigation.ctaButton.text}
              </Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800">
          <nav className="py-4">
            {navigation.mainNavigation?.map((item) => renderNavigationItem(item, true))}
          </nav>
        </div>
      )}
    </header>
  )
}