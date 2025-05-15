import React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "subtle"
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseClasses = "transition-all duration-300 ease-out"

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-1 hover:scale-[1.02]",
      secondary:
        "bg-transparent hover:bg-zinc-800/70 border border-zinc-700 text-white font-medium hover:border-yellow-500/50 hover:-translate-y-1",
      outline:
        "bg-transparent border border-zinc-700 text-white hover:bg-zinc-800/30 hover:border-yellow-500/50 hover:-translate-y-1",
      subtle: "bg-zinc-800/50 text-white hover:bg-zinc-800/70 hover:-translate-y-1",
    }

    return (
      <Button ref={ref} className={cn(baseClasses, variantClasses[variant], className)} {...props}>
        {children}
      </Button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"
