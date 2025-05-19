import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { getUserFromSession } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Tenta obter o usuário da sessão, mas não redireciona aqui
  // O redirecionamento será feito nas páginas individuais
  const user = await getUserFromSession()

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <AdminSidebar user={user} />
      </div>
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  )
}
