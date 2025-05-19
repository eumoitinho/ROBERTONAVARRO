"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CalendarCheck } from "lucide-react"

type EventRegistrationButtonProps = {
  eventSlug: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export function EventRegistrationButton({
  eventSlug,
  className,
  variant = "default",
  size = "default",
  children = "Inscrever-se",
}: EventRegistrationButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/inscricao?evento=${eventSlug}`)
  }

  return (
    <Button onClick={handleClick} variant={variant} size={size} className={className}>
      <CalendarCheck className="mr-2 h-4 w-4" />
      {children}
    </Button>
  )
}
