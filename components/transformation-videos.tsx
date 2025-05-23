import NextImage from "next/image";
import { SectionBadge } from "@/components/section-badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, ArrowRight, Star, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const transformationVideos = [
  {
    id: "4aYDKJQBnRw",
    title: "Como superei minhas dívidas em 6 meses",
    person: "Carlos Silva",
    thumbnail: "/images/video-thumb-1.png",
    description:
      "De R$45 mil em dívidas a investidor em apenas 6 meses aplicando os princípios das Crenças da Riqueza.",
  },
  {
    id: "yTELcwYTsnU",
    title: "Minha jornada de funcionário a empresário",
    person: "Mariana Costa",
    thumbnail: "/images/video-thumb-2.png",
    description:
      "Abandonei o medo e a zona de conforto para empreender e hoje tenho liberdade financeira e geográfica.",
  },
  {
    id: "W6rBTJKeJ4w",
    title: "Como multipliquei meu patrimônio",
    person: "Roberto Mendes",
    thumbnail: "/images/video-thumb-3.png",
    description:
      "Aprendi a fazer o dinheiro trabalhar para mim e multipliquei meu patrimônio em 3x em apenas 18 meses.",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Da falência ao sucesso financeiro",
    person: "Ana Paula Oliveira",
    thumbnail: "/images/video-thumb-4.png",
    description: "Perdi tudo em 2020, mas reconstruí minha vida financeira com os princípios que aprendi neste evento.",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Como saí das dívidas e comecei a investir",
    person: "João Pereira",
    thumbnail: "/images/video-thumb-5.png",
    description: "De endividado a investidor em 12 meses, aplicando os conceitos de inteligência financeira.",
  },
];

export default function TransformationVideos() {
  const playVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <section id="video-section" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <SectionBadge text="TRANSFORMAÇÃO REAL" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            VEJA COMO NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ALUNOS TRANSFORMARAM</span> SUAS VIDAS FINANCEIRAS
          </h2>
          <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed mb-12">
            Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua
            relação com o dinheiro
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
              {transformationVideos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full">
                    <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 h-full flex flex-col">
                      <div className="relative aspect-video cursor-pointer group" onClick={() => playVideo(video.id)}>
                        <NextImage
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all">
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-yellow-400/50">
                            <Play className="h-8 w-8 text-black ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-2">
                          <span className="bg-yellow-400/20 text-yellow-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            História de Sucesso
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{video.title}</h3>
                        <p className="text-yellow-400 text-sm mb-3">{video.person}</p>
                        <p className="text-zinc-300 text-sm leading-relaxed flex-grow">{video.description}</p>
                        <Button
                          variant="ghost"
                          className="mt-4 text-yellow-400 hover:text-yellow-500 hover:bg-yellow-400/10 p-0 flex items-center justify-start"
                          onClick={() => playVideo(video.id)}
                        >
                          Assistir história completa
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-zinc-900/80 border-zinc-700/50 hover:bg-zinc-800 text-white" />
              <CarouselNext className="right-0 translate-x-1/2 bg-zinc-900/80 border-zinc-700/50 hover:bg-zinc-800 text-white" />
            </div>
          </Carousel>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Resultados comprovados</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Mais de 130 mil pessoas já passaram por nossas formações e transformaram sua relação com o dinheiro.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Metodologia exclusiva</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Uma abordagem única que integra inteligência financeira, emocional, espiritual e empresarial.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Brain className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Transformação mental</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center px-4 sm:px-0">
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
          >
            <a href="#form">
             TRANSFORMAR MINHA VIDA FINANCEIRA! <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        </div>

        
      </div>
    </section>
  );
}