import Image from "next/image"
import { Button } from "@/components/ui/button"
import CardProduct from "./card-product"

type ImageProps = {
  src: string
  alt: string
}

type ButtonProps = {
  title: string
  href: string
}

type Props = {
  heading: string
  description: string
  offerText: string
  price: string
  paymentInfo: string
  button: ButtonProps
  image: ImageProps
}

export const FinalCtaSection = (props: Props) => {
  const { heading, description, offerText, price, paymentInfo, button, image } = props

  return (
    <section className="bg-[#fab62e] text-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-[5vw] py-16 md:py-24">
            <div className="mx-auto w-full max-w-lg text-center lg:text-left drop-shadow-2xl">
            <CardProduct/>
            </div>
        </div>
        <div className="relative hidden min-h-[400px] lg:block">
          <Image src={image.src || "/placeholder.svg"} alt={image.alt} layout="fill" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
