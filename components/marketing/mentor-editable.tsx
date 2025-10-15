"use client"

import Image from "next/image"
import { Users, Star, BookOpen, Video } from "lucide-react"
import { SectionBadge } from "./section-badge"
import { urlForImage } from "@/sanity/lib/image"
import type { MentorSection } from "@/sanity/lib/homepage-api"

interface MentorEditableProps {
  data: MentorSection
}

const iconMap = {
  users: Users,
  star: Star,
  book: BookOpen,
  video: Video,
}

export default function MentorEditable({ data }: MentorEditableProps) {
  const backgroundImageUrl = data.backgroundImage?.asset
    ? urlForImage(data.backgroundImage)
    : '/images/ROBERTO_17.jpg'

  return (
    <section id="quem-somos" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageUrl || '/images/ROBERTO_17.jpg'}
          alt="Roberto Navarro"
          fill
          className="object-cover w-full h-full opacity-70"
          style={{
            objectPosition: "top",
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent md:from-black/100 md:via-black/60 md:to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 bg-repeat bg-[length:200px_200px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <SectionBadge text={data.badge} />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {data.title.replace(data.highlightedText, '')} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
              {data.highlightedText}
            </span> 
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Text and Stats */}
          <div className="flex flex-col gap-8">
            {/* Bio Text */}
            <div className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed">
              <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent rounded-full blur-3xl -z-10"></div>
              {data.bioParagraphs.map((paragraph, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Statistics Badges */}
            <div className="w-full flex flex-col justify-end mt-8">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                {data.stats.map((stat, index) => {
                  const IconComponent = iconMap[stat.icon] || Star
                  return (
                    <div
                      key={index}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-500 hover:border-yellow-500/50 hover:-translate-y-1 opacity-0 translate-y-12 animate-[fadeInUp_0.5s_ease-out_forwards]"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="bg-zinc-800 rounded-full p-2 md:p-3">
                          <IconComponent className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm md:text-xl font-bold text-white">{stat.value}</p>
                          <p className="text-xs md:text-sm text-zinc-400">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

