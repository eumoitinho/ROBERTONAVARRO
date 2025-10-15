"use client"

import { useState } from "react"
import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionBadge } from "@/components/marketing/section-badge"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import NextImage from "next/image"
import type { TestimonialsSection } from "@/sanity/lib/homepage-api"
import { urlForImage } from "@/sanity/lib/image"

interface TestimonialsSectionEditableProps {
  data: TestimonialsSection
}

export default function TestimonialsSectionEditable({ data }: TestimonialsSectionEditableProps) {
  return (
    <section id="depoimentos-texto" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/90" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <SectionBadge text={data.badge} />
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">
            {data.title.replace(data.highlightedText, '').trim()}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
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
              {data.testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full">
                    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-zinc-700/30 bg-zinc-900/40 backdrop-blur-lg p-6 transition-all duration-500 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                          {testimonial.image?.asset ? (
                            <NextImage
                              src={urlForImage(testimonial.image) || '/placeholder-avatar.jpg'}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl font-bold text-black">
                              {testimonial.initial}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{testimonial.name}</h3>
                          <p className="text-sm text-yellow-400">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <blockquote className="flex-grow text-zinc-300 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
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

        <div className="mt-16 text-center space-y-6">
          <p className="text-lg md:text-xl text-zinc-300">
            {data.ctaText}
          </p>
          <Button
            asChild
            className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-4 sm:text-base bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black hover:shadow-lg hover:shadow-yellow-400/25"
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

