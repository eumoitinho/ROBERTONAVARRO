"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/auth"
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X, Activity } from "lucide-react"

interface AdminSidebarProps {
  user?: User | null
}

export function AdminSidebar({ user }: AdminSidebarProps = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    router.push("/admin/login")
    router.refresh()
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Inscrições",
      href: "/admin/inscricoes",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Check-in",
      href: "/admin/check-in",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Kommo Dashboard",
      href: "/admin/kommo-dashboard",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "Configurações",
      href: "/admin/configuracoes",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-md"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            {user && <p className="text-sm text-gray-500">Olá, {user.name}</p>}
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={closeSidebar}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
