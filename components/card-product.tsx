"use client"

import { useState } from "react"
import Image from "next/image"
import { HeartIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const CardProduct = () => {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <div className="relative max-w-md rounded-xl bg-gradient-to-r  from-yellow-500 to-amber-600 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
    <Image
        src="/images/mockuplivro.png"
        alt="Shoes"
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
          <CardTitle>Ferramentas para construir a vida que você merece</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline">Oferta exclusiva</Badge>
            <Badge variant="outline">Imperdível</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante.
          </p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Preço</span>
            <span className="text-2xl font-semibold">12x R$20,00 <span className="text-lg font-semibold"> <br/> ou R$ 200 à vista.</span></span>
          </div>
          <a href="https://sun.eduzz.com/956345" target="_blank" rel="noopener noreferrer">
            <Button
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >Comprar agora</Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardProduct
