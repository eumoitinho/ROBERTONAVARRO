"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroCountdownProps {
  targetDate: Date
  className?: string
}

export function HeroCountdown({ targetDate, className }: HeroCountdownProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((difference / 1000 / 60) % 60))
        setSeconds(Math.floor((difference / 1000) % 60))
      } else {
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }

    calculateTimeLeft()
    const intervalId = setInterval(calculateTimeLeft, 1000)

    setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearInterval(intervalId)
  }, [targetDate])

  return (
    <div
      className={cn(
        "w-full transition-all duration-700 text-left",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      <div className="bg-black/40 backdrop-blur-md border border-zinc-700/30 rounded-2xl p-4 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-yellow-500/20 rounded-full p-2">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white text-left">
                Vagas <span className="text-yellow-400">limitadas!</span>
              </h3>
              <p className="text-sm text-zinc-300 text-left">Garanta seu lugar antes que esgote</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <TimeUnit value={days} label="Dias" />
            <Separator />
            <TimeUnit value={hours} label="Horas" />
            <Separator />
            <TimeUnit value={minutes} label="Min" />
            <Separator />
            <TimeUnit value={seconds} label="Seg" />
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-2 text-sm shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <a href="#form">
              RESERVAR AGORA <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-lg p-2 md:p-3 w-16 md:w-20 text-center shadow-inner">
      <div className="text-xl md:text-2xl font-bold text-yellow-400">{value.toString().padStart(2, "0")}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  )
}

function Separator() {
  return <div className="text-xl md:text-2xl font-bold text-yellow-400 animate-pulse">:</div>
}