import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function AdminLoginPage() {
  const session = await getSession()

  if (session) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Painel Administrativo</h1>
        <LoginForm />
      </div>
    </div>
  )
}
