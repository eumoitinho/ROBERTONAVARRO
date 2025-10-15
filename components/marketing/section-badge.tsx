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
          "inline-flex items-center justify-center rounded-full py-2 px-4 mb-4",
          "bg-gradient-to-r from-zinc-800/50 to-zinc-700/50",
          "border border-zinc-500/30 backdrop-blur-sm",
          "text-sm font-medium tracking-wider uppercase text-white",
          "transform transition-all duration-300 hover:scale-105 hover:border-zinc-500/50",
          className,
        )}
      >
        {text}
      </div>
    </div>
  )
}
