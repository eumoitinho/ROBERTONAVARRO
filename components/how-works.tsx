"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionBadge } from "./section-badge";

type ReusableSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
  listItems: string[];
  ctaText: string;
  ctaHref: string;
};

export default function ReusableSection({
  id,
  title,
  subtitle,
  description,
  imageDesktop,
  imageMobile,
  listItems,
  ctaText,
  ctaHref,
}: ReusableSectionProps) {
  return (
    <section id={id} className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageDesktop}
          alt={subtitle}
          fill
          className="hidden sm:block object-cover w-full h-full"
          style={{
            objectPosition: "center right", // Posição padrão para telas maiores
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <Image
          src={imageMobile}
          alt={subtitle}
          fill
          className="block sm:hidden object-cover w-full h-full"
          style={{
            objectPosition: "center right", // Posição padrão para telas menores
          }}
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r"
          style={{
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 60%, transparent)",
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <div className="flex items-center mb-4">
              <SectionBadge text="COMO FUNCIONA" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase">
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {subtitle}
              </span>
            </h2>
            <p className="text-zinc-300 mb-6 font-medium">{description}</p>
            <div className="block sm:hidden md:block bg-zinc-900/50 rounded-lg p-4 mt-6">
              <ul className="space-y-4 text-zinc-300">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2 text-xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base mt-8"
            >
              <Link href={ctaHref}>
                {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
