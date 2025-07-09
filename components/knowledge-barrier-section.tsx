import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type ImageProps = {
  src: string
  alt: string
}

type ButtonProps = {
  title: string
  href: string
}

type Props = {
  heading: React.ReactNode
  description: string
  button: ButtonProps
  firstImage: ImageProps
  secondImage: ImageProps
}

export const KnowledgeBarrierSection = (props: Props) => {
  const { heading, description, button, firstImage, secondImage } = props

  return (
     <section className="flex min-h-[100vh] flex-col bg-zinc-950">
      <div className="relative flex flex-1 flex-col">
        <div className="relative flex-1">
          <Image
            className="absolute inset-0 aspect-[3/2] size-full object-cover opacity-70"
            src={firstImage.src || "/placeholder.svg"}
            alt={firstImage.alt}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        {/* <div className="absolute bottom-[-15%] right-[5%] w-[30%] md:w-1/5">
          <Image
            className="aspect-square size-full object-contain drop-shadow-2xl"
            src={secondImage.src || "/placeholder.svg"}
            alt={secondImage.alt}
            width={300}
            height={300}
          />
        </div> */}
      </div>
      <div className="px-[5%] bg-zinc-950">
        <div className="container">
          <div className="py-12 md:py-18 lg:py-20">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{heading}</h2>
              <div>
                <p className="text-lg text-zinc-300">{description}</p>
                <div className="mt-6 flex gap-x-4 md:mt-8">
                  <Button
                    asChild
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-10 py-5 text-lg"
                  >
                    <a href={button.href} target="_blank" rel="noopener noreferrer">
                      {button.title}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
