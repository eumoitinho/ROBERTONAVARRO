"use client"

import { Check } from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

interface IntelligenceCardProps {
  title: string
  description: string
  icon: string
  benefits: string[]
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function IntelligenceCard({
  title,
  description,
  icon,
  benefits,
  isActive = false,
  onClick,
  className,
}: IntelligenceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer group",
        isActive
          ? "bg-gradient-to-br from-yellow-500/20 via-amber-600/10 to-yellow-500/5 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
          : "bg-zinc-900/50 border-zinc-800/50 hover:border-yellow-500/30 hover:shadow-md hover:shadow-yellow-500/5",
        "backdrop-blur-sm border p-6 md:p-8",
        className,
      )}
      onClick={onClick}
    >
      {/* Top gradient line */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1",
          isActive
            ? "bg-gradient-to-r from-yellow-400 to-amber-500"
            : "bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 group-hover:from-yellow-400/30 group-hover:to-amber-500/30",
        )}
      ></div>

      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-6">
          <div
            className={cn(
              "rounded-2xl p-3 flex-shrink-0 transition-colors duration-300",
              isActive ? "bg-yellow-500/20" : "bg-zinc-800/80 group-hover:bg-zinc-800",
            )}
          >
            <NextImage
              src={icon || "/placeholder.svg"}
              alt={title}
              width={48}
              height={48}
              className={cn(
                "w-10 h-10 transition-transform duration-500",
                isActive ? "scale-110" : "group-hover:scale-105",
              )}
            />
          </div>
          <div>
            <h3
              className={cn(
                "text-xl font-bold mb-2 transition-colors duration-300",
                isActive ? "text-yellow-400" : "text-white group-hover:text-yellow-400/80",
              )}
            >
              {title}
            </h3>
            <p className="text-zinc-300 text-sm md:text-base">{description}</p>
          </div>
        </div>

        <div className="mt-auto">
          <h4 className="text-sm font-medium text-zinc-400 mb-3">O QUE VOCÊ VAI DESENVOLVER:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start text-zinc-300 text-sm">
                <Check
                  className={cn(
                    "h-4 w-4 mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300",
                    isActive ? "text-yellow-400" : "text-zinc-500 group-hover:text-yellow-400/70",
                  )}
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated corner decoration */}
        <div
          className={cn(
            "absolute -bottom-12 -right-12 w-24 h-24 rounded-full transition-opacity duration-500",
            isActive ? "bg-yellow-500/20 opacity-100" : "bg-yellow-500/5 opacity-0 group-hover:opacity-50",
          )}
        ></div>
      </div>
    </div>
  )
}
