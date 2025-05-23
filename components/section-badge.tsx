import { cn } from "@/lib/utils"

interface SectionBadgeProps {
  text: string
  className?: string
}

export function SectionBadge({ text, className }: SectionBadgeProps) {
  return (
    <div className="flex justify-center mb-6">
      <div
        className={cn(
          "inline-flex items-center justify-center px-4 py-1.5 rounded-full",
          "bg-gradient-to-r from-yellow-500/10 to-amber-600/10",
          "border border-yellow-500/30 backdrop-blur-sm",
          "text-xs font-medium tracking-wider uppercase text-yellow-400",
          "transform transition-all duration-300 hover:scale-105 hover:border-yellow-500/50",
          className,
        )}
      >
        {text}
      </div>
    </div>
  )
}
