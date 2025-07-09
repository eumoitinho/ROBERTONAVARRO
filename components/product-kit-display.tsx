"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type ImageProps = {
  src: string
  alt: string
}

type BreadcrumbProps = {
  url: string
  title: string
}

type TabProps = {
  value: string
  trigger: string
  description: string
}

type RatingProps = {
  stars: number
  reviewCount: number
}

type CtaButtonProps = {
  title: string
  onClick: () => void
}

type Props = {
  breadcrumbs: BreadcrumbProps[]
  heading: string
  images: ImageProps[]
  price: string
  rating: RatingProps
  description: React.ReactNode
  ctaButton: CtaButtonProps
  tabs: TabProps[]
}

export const ProductKitDisplay = (props: Props) => {
  const { breadcrumbs, heading, images, price, rating, description, ctaButton, tabs } = props

  return (
    <header className="px-[5%] py-16 md:py-24 lg:py-28 bg-zinc-900">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-start md:gap-x-12 lg:gap-x-20">
          <Gallery images={images} />
          <div className="flex flex-col">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.url} className="text-zinc-400 hover:text-white">
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">{heading}</h1>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(rating.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-zinc-300">{`${rating.reviewCount} reviews`}</p>
            </div>
            <div className="mb-6 text-lg text-zinc-300">{description}</div>
            <p className="mb-8 text-4xl font-extrabold text-white">{price}</p>
            <Button
              onClick={ctaButton.onClick}
              className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-12 py-8 text-xl"
            >
              {ctaButton.title}
            </Button>
            <div className="mt-10 w-full">
              <InformationTabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const Gallery = ({ images }: { images: ImageProps[] }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!mainApi || !thumbApi) return

    const handleSelect = () => {
      setCurrent(mainApi.selectedScrollSnap())
      thumbApi.scrollTo(mainApi.selectedScrollSnap())
    }

    mainApi.on("select", handleSelect)
    return () => {
      mainApi.off("select", handleSelect)
    }
  }, [mainApi, thumbApi])

  const handleThumbClick = (index: number) => {
    mainApi?.scrollTo(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {images.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt}
                  width={600}
                  height={600}
                  className="h-full w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel setApi={setThumbApi} opts={{ align: "start", containScroll: "keepSnaps" }} className="w-full">
        <CarouselContent className="-ml-2">
          {images.map((slide, index) => (
            <CarouselItem key={index} className="basis-1/4 pl-2">
              <div
                onClick={() => handleThumbClick(index)}
                className={cn(
                  "aspect-square w-full cursor-pointer overflow-hidden rounded-md transition-opacity",
                  current === index ? "opacity-100 ring-2 ring-yellow-400" : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

const InformationTabs = ({ tabs }: { tabs: TabProps[] }) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4 text-zinc-300">
          <p>{tab.description}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
