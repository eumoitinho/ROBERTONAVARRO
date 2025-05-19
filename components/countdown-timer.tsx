"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endDate?: Date
  days?: number
  className?: string
  targetDate: Date
}



export default function CountdownTimer({ endDate, days = 3, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Se não for fornecida uma data final, calcule uma com base nos dias fornecidos
    const targetDate = endDate || new Date(Date.now() + days * 24 * 60 * 60 * 1000)

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsVisible(false)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    // Calcular imediatamente
    calculateTimeLeft()

    // Atualizar a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer)
  }, [endDate, days])

  if (!isVisible) return null

  return (
    <div className={`bg-black/80 border border-red-500 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-bold text-white">
          <span className="text-red-500">ATENÇÃO:</span> ESTA OFERTA EXPIRA EM
        </h3>
      </div>
      <div className="flex justify-center gap-4 text-center">
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-white">{timeLeft.days}</span>
          <span className="text-xs uppercase text-gray-400">Dias</span>
        </div>
        <div className="text-2xl font-bold text-white">:</div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-white">{timeLeft.hours.toString().padStart(2, "0")}</span>
          <span className="text-xs uppercase text-gray-400">Horas</span>
        </div>
        <div className="text-2xl font-bold text-white">:</div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-white">{timeLeft.minutes.toString().padStart(2, "0")}</span>
          <span className="text-xs uppercase text-gray-400">Min</span>
        </div>
        <div className="text-2xl font-bold text-white">:</div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-white">{timeLeft.seconds.toString().padStart(2, "0")}</span>
          <span className="text-xs uppercase text-gray-400">Seg</span>
        </div>
      </div>
      <p className="text-center text-sm text-red-400 mt-2 font-medium">
        Você está <span className="font-extrabold">PERDENDO DINHEIRO</span> a cada segundo que passa!
      </p>
    </div>
  )
}
