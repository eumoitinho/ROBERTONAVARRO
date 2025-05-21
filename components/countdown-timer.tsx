"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

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

    return () => clearInterval(intervalId)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-2 xs-gap-1 sm:gap-2">
      <div className="bg-zinc-800/80 rounded-lg p-2 xs-p-1 sm:p-2 text-center">
        <div className="text-2xl xs-text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">{days}</div>
        <div className="text-xs xs-text-xs sm:text-xs text-zinc-400">Dias</div>
      </div>
      <div className="bg-zinc-800/80 rounded-lg p-2 xs-p-1 sm:p-2 text-center">
        <div className="text-2xl xs-text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">{hours}</div>
        <div className="text-xs xs-text-xs sm:text-xs text-zinc-400">Horas</div>
      </div>
      <div className="bg-zinc-800/80 rounded-lg p-2 xs-p-1 sm:p-2 text-center">
        <div className="text-2xl xs-text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">{minutes}</div>
        <div className="text-xs xs-text-xs sm:text-xs text-zinc-400">Min</div>
      </div>
      <div className="bg-zinc-800/80 rounded-lg p-2 xs-p-1 sm:p-2 text-center">
        <div className="text-2xl xs-text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">{seconds}</div>
        <div className="text-xs xs-text-xs sm:text-xs text-zinc-400">Seg</div>
      </div>
    </div>
  )
}

export default CountdownTimer
