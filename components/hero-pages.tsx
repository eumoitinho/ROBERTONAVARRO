"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Brain, ChevronRight, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

type HeroPagesProps = {
  title: string
  secondtitle: string
  subtitle?: string
  description?: string
  image?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export default function HeroPages({
  title,
  subtitle,
  secondtitle,
  description,
  image = "/images/HERO_EDUCADOR.png",
  ctaText = "QUERO SABER MAIS",
  ctaHref = "#",
  secondaryCtaText = "Saiba mais",
  secondaryCtaHref = "#",
}: HeroPagesProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative pt-24 md:pt-32 lg:pt-32 pb-16 md:pb-28 lg:pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          style={{
            objectPosition: "center",
            objectFit: "cover",
          }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-60% to-transparent md:to-transparent"></div>
      </div>
      <div className="absolute top-10 md:top-20 left-4 md:left-10 w-40 h-40 md:w-72 md:h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-48 h-48 md:w-80 md:h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {subtitle && (
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4 md:mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-xs md:text-sm font-medium">{subtitle}</span>
              </div>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-2 leading-tight">
              {title.split(" ")[0]}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-zinc-300">{secondtitle}</p>

            {description && (
              <p className="text-base md:text-xl text-zinc-300 mb-4 max-w-xl whitespace-pre-line">{description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <Button
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                asChild
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
              <Button
                asChild
                className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              >
                <Link href={secondaryCtaHref}>
                  {secondaryCtaText} <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats - Make responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6 md:mt-0">
          {[
            { icon: <Users className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "500+", label: "Mentorados" },
            { icon: <Star className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "4.9/5", label: "Avaliação" },
            { icon: <Zap className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "7+", label: "Anos de mentoria" },
            {
              icon: <Brain className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />,
              value: "100%",
              label: "Transformação",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-1000 hover:border-yellow-500/50 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center gap-2 md:gap-4">
                <div className="bg-zinc-800 rounded-full p-2 md:p-3">{stat.icon}</div>
                <div>
                  <p className="text-sm md:text-xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm text-zinc-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
