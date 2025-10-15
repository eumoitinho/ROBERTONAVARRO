"use client"

import { useState } from "react"
import NextImage from "next/image"
import { SectionBadge } from "@/components/marketing/section-badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, ArrowRight, Star, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { VideosSection } from "@/sanity/lib/homepage-api"
import { urlForImage } from "@/sanity/lib/image"

interface TransformationVideosEditableProps {
  data: VideosSection
}

const iconMap = {
  star: Star,
  zap: Zap,
  brain: Brain,
}

const accentStyles = {
  topLine: "bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent",
  highlightGradient: "bg-gradient-to-r from-yellow-500 to-amber-600",
  cardHover: "hover:border-yellow-400/40 hover:shadow-yellow-400/10",
  chipBg: "bg-yellow-400/20",
  chipText: "text-yellow-400",
  personText: "text-yellow-400",
  circleBg: "bg-yellow-400/20",
  iconColor: "text-yellow-400",
  playButtonBg: "bg-yellow-400",
  playButtonShadow: "shadow-yellow-400/50",
  playIconColor: "text-black",
  buttonGradient: "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600",
  buttonTextColor: "text-black",
  buttonShadow: "hover:shadow-yellow-400/25",
  statsCardHover: "hover:border-yellow-400/40",
  statsShadow: "hover:shadow-yellow-400/10",
  videoBorder: "border border-yellow-400/30",
}

export default function TransformationVideosEditable({ data }: TransformationVideosEditableProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(videoId)
  }

  return (
    <section id="depoimentos" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95" />
      <div className={cn("absolute top-0 left-0 right-0 h-px", accentStyles.topLine)} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <SectionBadge text={data.badge} />
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">
            {data.title.replace(data.highlightedText, '').trim()}{" "}
            <span className={cn("text-transparent bg-clip-text", accentStyles.highlightGradient)}>
              {data.highlightedText}
            </span>{" "}
            {data.title.includes(data.highlightedText) && data.title.split(data.highlightedText)[1]}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-300">
            {data.description}
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {data.videos.map((video) => (
                <CarouselItem key={video.youtubeId} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full">
                    <div
                      className={cn(
                        "flex h-full w-full flex-col overflow-hidden rounded-3xl border border-zinc-700/30 bg-zinc-900/40 backdrop-blur-lg transition-all duration-500",
                        accentStyles.cardHover,
                      )}
                    >
                      <div className={cn("group relative cursor-pointer overflow-hidden aspect-video", accentStyles.videoBorder)}>
                        {playingVideo === video.youtubeId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                            title={video.title}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            <NextImage
                              src={video.thumbnail ? urlForImage(video.thumbnail) || `https://img.youtube.com/vi/${video.youtubeId}/0.jpg` : `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`}
                              alt={video.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300 hover:bg-black/30"
                              onClick={() => handlePlayVideo(video.youtubeId)}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center rounded-full transition-transform duration-300 h-16 w-16 group-hover:scale-105",
                                  accentStyles.playButtonBg,
                                  accentStyles.playButtonShadow,
                                )}
                              >
                                <Play className={cn("h-7 w-7", accentStyles.playIconColor, "ml-0.5")}></Play>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex flex-grow flex-col p-6">
                        <div className="mb-2">
                          <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", accentStyles.chipBg, accentStyles.chipText)}>
                            {video.chipLabel}
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">{video.title}</h3>
                        <p className={cn("mb-3 text-sm font-medium", accentStyles.personText)}>{video.person}</p>
                        <p className="flex-grow text-sm leading-relaxed text-zinc-300">{video.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 border-zinc-700/50 bg-zinc-900/80 text-white transition-colors hover:bg-zinc-800" />
              <CarouselNext className="right-0 translate-x-1/2 border-zinc-700/50 bg-zinc-900/80 text-white transition-colors hover:bg-zinc-800" />
            </div>
          </Carousel>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {data.stats.map(({ icon, title, description }) => {
            const IconComponent = iconMap[icon] || Star
            return (
              <div
                key={title}
                className={cn(
                  "rounded-2xl border border-zinc-700/30 bg-zinc-900/40 p-6 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1",
                  accentStyles.statsCardHover,
                  accentStyles.statsShadow,
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("flex-shrink-0 rounded-full p-2", accentStyles.circleBg)}>
                    <IconComponent className={cn("h-5 w-5", accentStyles.iconColor)} />
                  </div>
                  <div>
                    <h3 className={cn("mb-2 font-medium", accentStyles.personText)}>{title}</h3>
                    <p className="leading-relaxed text-zinc-300">{description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 px-4 text-center sm:px-0">
          <Button
            asChild
            className={cn(
              "rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-4 sm:text-base",
              accentStyles.buttonGradient,
              accentStyles.buttonTextColor,
              accentStyles.buttonShadow,
            )}
          >
            <a href={data.ctaButtonLink} className="inline-flex items-center justify-center gap-2">
              {data.ctaButtonText}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

