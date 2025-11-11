'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScrollToButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary'
}

export default function ScrollToButton({ targetId, children, className, variant = 'default' }: ScrollToButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (variant === 'secondary') {
    return (
      <Button
        className={cn(
          'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:scale-105',
          className
        )}
        onClick={handleClick}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]',
        'px-10 py-5 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

