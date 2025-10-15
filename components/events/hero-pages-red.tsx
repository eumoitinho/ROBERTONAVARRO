"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Brain, ChevronRight, Star, Users, Video, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCountdown } from "@/components/events/hero-countdown"
import EventCTAButton from "@/components/events/event-cta-button"

type HeroPagesRedProps = {
  title: string
  secondtitle: string
  subtitle?: string
  description?: string
  image?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  showCountdown?: boolean
  countdownTargetDate?: Date
}

export default function HeroPagesRed({
  title,
  subtitle,
  secondtitle,
  description,
  image = "/images/HERO_EDUCADOR.png",
  ctaText = "QUERO SABER MAIS",
  ctaHref = "#",
  secondaryCtaText = "Saiba mais",
  secondaryCtaHref = "#",
  showCountdown = false,
  countdownTargetDate,
}: HeroPagesRedProps) {
  const [currentImage, setCurrentImage] = useState(image);
  const [isVisible, setIsVisible] = useState(false);
  const titleWords = title.trim().split(/\s+/);
  const highlightTitle =
    titleWords.length > 1 ? titleWords[titleWords.length - 1] : titleWords[0] ?? "";
  const baseTitle = titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : "";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const updateImageForScreenSize = () => {
      if (window.innerWidth <= 768) {
        const mobileImage = image.replace(/(\.[\w\d_-]+)$/i, "_MOBILE$1");
        setCurrentImage(mobileImage);
      } else {
        setCurrentImage(image);
      }
    };

    updateImageForScreenSize();
    window.addEventListener("resize", updateImageForScreenSize);

    return () => {
      window.removeEventListener("resize", updateImageForScreenSize);
    };
  }, [image]);

  return (
    <section className="relative h-[900px] pt-32 pb-20 overflow-hidden flex flex-col justify-between">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover w-full h-full"
          style={{
            objectPosition: "center",
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-60% to-transparent md:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
        {/* Badge */}
        {subtitle && (
          <div
            className={`inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6 self-start mt-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="flex h-2 w-2 rounded-full bg-red-400"></span>
            <span className="text-xs md:text-sm font-medium">{subtitle}</span>
          </div>
        )}

        {/* Central content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-2 leading-[1.05] max-w-3xl text-white">
              {baseTitle && (
                <span className="block md:inline md:whitespace-nowrap">{baseTitle}</span>
              )}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-400 md:inline">
                {highlightTitle}
              </span>
            </h1>
            <p className="text-lg md:text-2xl font-semibold mb-4 text-zinc-100/85 max-w-3xl leading-relaxed">
              {secondtitle}
            </p>
            {description && (
              <p className="text-base md:text-xl text-zinc-300/90 mb-8 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-0 md:mb-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {ctaHref && ctaHref.includes("eduzz.com") ? (
              <EventCTAButton
                eduzzUrl={ctaHref}
                buttonText={ctaText}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-7 md:px-9 py-3 md:py-4 text-sm md:text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(239,68,68,0.75)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-18px_rgba(239,68,68,0.85)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                showArrow={false}
              />
            ) : (
              <Button
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-7 md:px-9 py-3 md:py-4 text-sm md:text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(239,68,68,0.75)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-18px_rgba(239,68,68,0.85)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                asChild
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            )}
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

        {/* Countdown or Status */}
        <div className="w-full flex flex-col items-start">
          {showCountdown && countdownTargetDate ? (
            <div className="mt-6 w-full max-w-4xl">
              <HeroCountdown targetDate={countdownTargetDate} className="text-left" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-10 md:mt-0 mb-2 md:mb-4">
              {[
                        { icon: <Users className="h-4 w-4 md:h-6 md:w-6 text-red-400" />, value: "+1,5 Milhões", label: "de Alunos" },
                        { icon: <Star className="h-4 w-4 md:h-6 md:w-6 text-red-400" />, value: "1280", label: "Técnicas Exclusivas" },
                        { icon: <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-red-400" />, value: "5", label: "Livros Publicados" },
                        { icon: <Video className="h-4 w-4 md:h-6 md:w-6 text-red-400" />, value: "100+", label: "Vídeos Inspiradores" },
                      ].map((stat, index)  => (
                <div
                  key={index}
                  className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-1000 hover:border-red-500/50 hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
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
          )}
        </div>
      </div>
    </section>
  )
}