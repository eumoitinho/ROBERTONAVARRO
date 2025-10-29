"use client";

import { useState } from "react";
import NextImage from "next/image";
import { SectionBadge } from "@/components/marketing/section-badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, ArrowRight, Star, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Accent = "yellow" | "red";
type Orientation = "landscape" | "portrait";

type TransformationVideo = {
  id: string;
  title: string;
  person: string;
  description: string;
  thumbnail?: string;
  chipLabel?: string;
};

const transformationVideos: TransformationVideo[] = [
  { id: "sVcR5iq1BG0", title: "Estudo de Caso Fabio Santos - ICF", person: "Fabio Santos", description: "Relato de transformação financeira com o Instituto Coaching Financeiro." },
  { id: "AyjH3rNe37M", title: "Estudo de Caso Clelio - ICF", person: "Clelio", description: "História de superação e sucesso com o Instituto Coaching Financeiro." },
  { id: "pmbpDqpkK78", title: "Estudo de Caso Wagner Jovino - ICF", person: "Wagner Jovino", description: "Transformação financeira e pessoal com o Instituto Coaching Financeiro." },
  { id: "7N97LDt9F5Y", title: "Estudo de Caso Rodrigo - ICF", person: "Rodrigo", description: "Como Rodrigo transformou sua vida financeira com o ICF." },
  { id: "FUkJWtmjGtM", title: "Depoimento João Leles - ICF", person: "João Leles", description: "Depoimento sobre a experiência com o Instituto Coaching Financeiro." },
  { id: "Jyokxvo-WOo", title: "Depoimento Ricardo - ICF", person: "Ricardo", description: "Relato de transformação financeira com o Instituto Coaching Financeiro." },
  { id: "GQVv0wnK4So", title: "Como Roosevelt transformou sua vida financeira - ICF", person: "Roosevelt", description: "História de sucesso com o ICF." },
  { id: "kfZ-hck8bJI", title: "Depoimentos - Instituto Coaching Financeiro - ICF", person: "Vários Participantes", description: "Compilado de depoimentos sobre o impacto do Instituto Coaching Financeiro." },
  { id: "4aYDKJQBnRw", title: "Como superei minhas dívidas em 6 meses", person: "Carlos Eduardo Silva", description: "De R$45 mil em dívidas a investidor em apenas 6 meses aplicando os princípios das Crenças da Riqueza.", chipLabel: "Transformação Real" },
  { id: "yTELcwYTsnU", title: "Minha jornada de funcionário a empresário", person: "João Gabriel Pereira", description: "Abandonei o medo e a zona de conforto para empreender e hoje tenho liberdade financeira e geográfica.", chipLabel: "Transformação Real" },
  { id: "W6rBTJKeJ4w", title: "Como multipliquei meu patrimônio", person: "Roberto Ferreira Mendes", description: "Aprendi a fazer o dinheiro trabalhar para mim e multipliquei meu patrimônio em 3x em apenas 18 meses.", chipLabel: "Transformação Real" },
];

const defaultStats = [
  { icon: Star, title: "Resultados Comprovados", description: "Mais de 130 mil pessoas já passaram por nossas formações e transformaram sua relação com o dinheiro." },
  { icon: Zap, title: "Metodologia Exclusiva", description: "Uma abordagem única que integra inteligência financeira, emocional, espiritual e empresarial." },
  { icon: Brain, title: "Transformação Mental", description: "Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade." },
];

interface TransformationVideosProps {
  accent?: Accent;
  orientation?: Orientation;
  data?: any;
}

export default function TransformationVideos({ accent = "yellow", orientation = "landscape", data }: TransformationVideosProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const styles = (accent === 'yellow' ? {
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
  } : {
    topLine: "bg-gradient-to-r from-transparent via-red-500/30 to-transparent",
    highlightGradient: "bg-gradient-to-r from-red-500 to-red-600",
    cardHover: "hover:border-red-500/40 hover:shadow-red-500/10",
    chipBg: "bg-red-500/10",
    chipText: "text-red-400",
    personText: "text-red-400",
    circleBg: "bg-red-500/10",
    iconColor: "text-red-400",
    playButtonBg: "bg-red-500",
    playButtonShadow: "shadow-red-500/40",
    playIconColor: "text-white/90",
    buttonGradient: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    buttonTextColor: "text-white",
    buttonShadow: "hover:shadow-red-500/25",
    statsCardHover: "hover:border-red-500/40",
    statsShadow: "hover:shadow-red-500/10",
    videoBorder: "border border-red-500/30",
  }) as any;

  const isPortrait = orientation === "portrait";
  const aspectClass = isPortrait ? "aspect-[9/16]" : "aspect-video";
  const itemBasisClass = isPortrait ? "md:basis-1/3 xl:basis-1/4" : "md:basis-1/2 lg:basis-1/3";

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const videosList: any[] = data?.videos && data.videos.length ? data.videos : transformationVideos;
  const statsList = data?.stats && data.stats.length ? data.stats : defaultStats;

  return (
    <section id="depoimentos" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95" />
      <div className={cn("absolute top-0 left-0 right-0 h-px", styles.topLine)} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <SectionBadge text="TRANSFORMAÇÃO REAL" />
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">
            VEJA COMO NOSSOS {" "}
            <span className={cn("text-transparent bg-clip-text", styles.highlightGradient)}>ALUNOS TRANSFORMARAM</span>{" "}
            SUAS VIDAS FINANCEIRAS
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-300">
            {data?.description ?? 'Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.'}
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
              {videosList.map((video: any) => (
                <CarouselItem key={video.id} className={cn("pl-4", itemBasisClass)}>
                  <div className="flex h-full">
                    <div
                      className={cn(
                        "flex h-full w-full flex-col overflow-hidden rounded-3xl border border-zinc-700/30 bg-zinc-900/40 backdrop-blur-md transition-all duration-500",
                        styles.cardHover,
                      )}
                    >
                      <div className={cn("group relative cursor-pointer overflow-hidden", aspectClass, styles.videoBorder)}>
                        {playingVideo === video.id ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                            title={video.title}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            <NextImage
                              src={video.thumbnail ?? `https://img.youtube.com/vi/${video.id}/0.jpg`}
                              alt={video.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300 hover:bg-black/30"
                              onClick={() => handlePlayVideo(video.id)}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center rounded-full transition-transform duration-300",
                                  styles.playButtonBg,
                                  styles.playButtonShadow,
                                  isPortrait ? "h-14 w-14" : "h-16 w-16",
                                  "group-hover:scale-105",
                                )}
                              >
                                <Play className={cn("h-7 w-7", styles.playIconColor, "ml-0.5")}></Play>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex flex-grow flex-col p-6">
                        <div className="mb-2">
                          <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", styles.chipBg, styles.chipText)}>
                            {video.chipLabel ?? "História de Sucesso"}
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">{video.title}</h3>
                        <p className={cn("mb-3 text-sm font-medium", styles.personText)}>{video.person}</p>
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
          {statsList.map(({ icon: Icon, title, description }: any, idx: number) => (
            <div
              key={title + idx}
              className={cn(
                "rounded-2xl border border-zinc-700/30 bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
                styles.statsCardHover,
                styles.statsShadow,
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn("flex-shrink-0 rounded-full p-2", styles.circleBg)}>
                  <Icon className={cn("h-5 w-5", styles.iconColor)} />
                </div>
                <div>
                  <h3 className={cn("mb-2 font-medium", styles.personText)}>{title}</h3>
                  <p className="leading-relaxed text-zinc-300">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 px-4 text-center sm:px-0">
          <Button
            asChild
            className={cn(
              "rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-4 sm:text-base",
              styles.buttonGradient,
              styles.buttonTextColor,
              styles.buttonShadow,
            )}
          >
            <a href="#inscricao" className="inline-flex items-center justify-center gap-2">
              {data?.ctaText ?? 'Transformar Minha Vida Financeira!'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

