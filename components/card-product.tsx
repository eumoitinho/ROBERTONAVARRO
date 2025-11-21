"use client"

import { useState } from "react"
import Image from "next/image"
import { HeartIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type CardProductButton = {
  label: string
  href: string
  newTab?: boolean
}

interface CardProductProps {
  imageSrc?: string
  imageAlt?: string
  title?: string
  badges?: string[]
  description?: string
  price?: string
  paymentInfo?: string
  button?: CardProductButton
}

const defaultButton: CardProductButton = {
  label: "Comprar agora",
  href: "https://sun.eduzz.com/956345",
  newTab: true,
}

const CardProduct = ({
  imageSrc = "/images/mockuplivro.png",
  imageAlt = "Mockup dos livros",
  title = "Ferramentas para construir a vida que você merece",
  badges = ["Oferta exclusiva", "Imperdível"],
  description =
    "O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante.",
  price = "12x R$20,00",
  paymentInfo = "ou R$ 200 à vista.",
  button = defaultButton,
}: CardProductProps) => {
  const [liked, setLiked] = useState<boolean>(false)

  const buttonHref = button?.href ?? defaultButton.href
  const buttonLabel = button?.label ?? defaultButton.label
  const buttonNewTab = button?.newTab ?? defaultButton.newTab

  return (
    <div className="relative max-w-md rounded-xl bg-gradient-to-r  from-yellow-500 to-amber-600 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={365}
          height={320}
          className="object-fill rounded-t-xl"
        />
      </div>
      <Button
        size="icon"
        onClick={() => setLiked(!liked)}
        className="bg-primary/10 hover:bg-primary/20 absolute end-4 top-4 rounded-full"
      >
        <HeartIcon className={cn("size-4", liked ? "fill-destructive stroke-destructive" : "stroke-white")} />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {badges.length > 0 && (
            <CardDescription className="flex flex-wrap items-center gap-2">
              {badges.map((badge) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Preço</span>
            <span className="text-2xl font-semibold">
              {price}
              {paymentInfo && (
                <span className="text-lg font-semibold block">{paymentInfo}</span>
              )}
            </span>
          </div>
          <a
            href={buttonHref}
            target={buttonNewTab ? "_blank" : "_self"}
            rel={buttonNewTab ? "noopener noreferrer" : undefined}
          >
            <Button className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              {buttonLabel}
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardProduct
