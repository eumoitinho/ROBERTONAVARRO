"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Star,
  Users,
  Zap,
  TrendingUp,
  Brain,
  Target,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import GlowEffect from "@/components/glow-effect"
import CountdownTimer from "@/components/countdown-timer"
import LocationMap from "@/components/location-map"

export default function SegredosDaMenteMilionaria() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm hover:text-yellow-400 transition-colors">
              Início
            </Link>
            <Link href="#o-que-aprender" className="text-sm hover:text-yellow-400 transition-colors">
              O Que Aprender
            </Link>
            <Link href="#proposito" className="text-sm hover:text-yellow-400 transition-colors">
              Propósito
            </Link>
            <Link href="#mentores" className="text-sm hover:text-yellow-400 transition-colors">
              Mentores
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#cadastro">Entrar</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#cadastro">Inscreva-se</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "/", label: "Início" },
                { href: "#o-que-aprender", label: "O Que Aprender" },
                { href: "#proposito", label: "Propósito" },
                { href: "#mentores", label: "Mentores" },
                { href: "#cadastro", label: "Cadastro" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Imersão exclusiva e transformadora</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Segredos da Mente Milionária:
                </span>{" "}
                Desperte seu potencial para a riqueza
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Uma imersão completa para transformar sua mentalidade e descobrir como pensar e agir como os verdadeiros
                milionários, criando uma vida de abundância e prosperidade!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href="#cadastro">QUERO DESPERTAR MINHA MENTE MILIONÁRIA</Link>
                </Button>

                <Button
                  asChild
                  className="bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#o-que-aprender">
                    Saiba mais <ChevronDown className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-yellow-200 to-amber-500 flex items-center justify-center text-black font-bold text-xs"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">130.000+</span> vidas transformadas
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://robertonavarrooficial.com.br/wp-content/uploads/2024/03/Independencia-Financeira-Roberto-Navarro.webp"
                  alt="Segredos da Mente Milionária"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { icon: <Users className="h-6 w-6 text-yellow-400" />, value: "130.000+", label: "Alunos" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "4.9/5", label: "Avaliação" },
              { icon: <Zap className="h-6 w-6 text-yellow-400" />, value: "7 horas", label: "Imersão" },
              { icon: <Brain className="h-6 w-6 text-yellow-400" />, value: "Transformação", label: "Mental" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 transition-all duration-1000 hover:border-yellow-500/50 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-800 rounded-full p-3">{stat.icon}</div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-10 bg-zinc-900/50 backdrop-blur-md border-y border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-yellow-400 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Data e Horário</h3>
                  <p className="text-zinc-400">01 de Maio - Quinta-feira</p>
                  <p className="text-zinc-400">Das 13h às 20h</p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center">
                <MapPin className="h-10 w-10 text-yellow-400 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Local</h3>
                  <p className="text-zinc-400">Sede do ICF</p>
                  <p className="text-zinc-400">Alameda Araguaia 751, Alphaville – SP</p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center">
                <Star className="h-10 w-10 text-yellow-400 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Vagas Limitadas</h3>
                  <p className="text-zinc-400">Apenas 100 vagas disponíveis</p>
                  <p className="text-yellow-400 font-semibold">Garanta a sua agora!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-10 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 rounded-xl border border-zinc-700">
            <h2 className="text-center text-2xl font-bold mb-6">INSCRIÇÕES ENCERRAM EM:</h2>
            <CountdownTimer endDate={new Date("2025-05-09T23:59:59")} />
            <div className="mt-8 text-center">
              <GlowEffect>
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black text-base font-bold py-4 px-8 rounded-full">
                  GARANTIR MINHA VAGA AGORA
                </Button>
              </GlowEffect>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que os Ricos Ficam Mais Ricos Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">POR QUE OS RICOS FICAM MAIS RICOS?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Descubra o <span className="text-yellow-400">segredo da mentalidade</span> que transforma vidas
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Você já parou para pensar por que algumas pessoas parecem acumular riqueza e sucesso, enquanto outras se
              sentem estagnadas? A resposta é simples: é tudo uma questão de conhecimento e uma mudança radical de
              mentalidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://img.freepik.com/fotos-gratis/homem-de-negocios-bonito-pelo-carro-branco_1303-16416.jpg"
                  alt="Homem de sucesso"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Transforme sua <span className="text-yellow-400">mentalidade</span> e alcance a prosperidade
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Empresários que prosperam, mesmo após enfrentar falências, sabem que a verdadeira prosperidade vem
                    de estratégias e de uma visão de abundância. Eles não apenas se adaptam, mas transformam cada
                    desafio em uma oportunidade de crescimento!
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Eu aprendi essa lição na minha própria jornada e já tive o privilégio de ensinar essa mentalidade a
                    alguns dos maiores empresários do Brasil. Eles perceberam que, ao se libertarem de crenças
                    limitantes e adotarem uma mentalidade voltada para o sucesso, conseguem enxergar oportunidades onde
                    muitos veem apenas obstáculos.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Agora, eu pergunto a você: está pronto para dar um salto em direção à riqueza? Se sim, venho te
                    convidar a dar esse passo e explorar as estratégias que podem ajudá-lo a criar a vida dos seus
                    sonhos.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  QUERO COMEÇAR AGORA <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Você Vai Aprender Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conteúdo exclusivo para <span className="text-yellow-400">transformar sua realidade</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Descubra as estratégias que os milionários usam para criar e manter sua riqueza
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    icon: <CheckCircle className="h-6 w-6 text-yellow-400" />,
                    title: "Assuma o Compromisso com a Riqueza",
                    description:
                      "É hora de se comprometer com sua jornada rumo à prosperidade. Você tem o poder de criar a vida que deseja!",
                  },
                  {
                    icon: <Target className="h-6 w-6 text-yellow-400" />,
                    title: "Pense Grande",
                    description: "Expanda sua visão e descubra como grandes ideias podem levar a grandes resultados.",
                  },
                  {
                    icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
                    title: "Identifique e Veja Oportunidades",
                    description:
                      "Aprenda a reconhecer oportunidades que estão ao seu redor e como aproveitá-las para seu benefício.",
                  },
                  {
                    icon: <Users className="h-6 w-6 text-yellow-400" />,
                    title: "Admire os Bem-Sucedidos",
                    description:
                      "Inspire-se em indivíduos ricos e bem-sucedidos, absorvendo as lições que eles oferecem e aplicando-as em sua própria vida.",
                  },
                  {
                    icon: <TrendingUp className="h-6 w-6 text-yellow-400" />,
                    title: "Gere Renda Residual",
                    description:
                      "Descubra como criar fontes de renda que trabalham para você, mesmo quando você não está.",
                  },
                  {
                    icon: <Zap className="h-6 w-6 text-yellow-400" />,
                    title: "Aumente seu Patrimônio e Receita",
                    description:
                      "Aprenda estratégias eficazes para aumentar seu patrimônio e aumentar sua receita de forma contínua.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                      <p className="text-zinc-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="mt-10 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  QUERO APRENDER ESSES SEGREDOS <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://media.istockphoto.com/id/1210052781/pt/foto/businessman-in-private-jet.jpg?s=612x612&w=0&k=20&c=Ostz1h5xAxnI80EDmRpOHgyz05GbiYaM4dazB48h1Uw="
                  alt="Homem de sucesso"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Importância do Propósito Section */}
      <section id="proposito" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">A IMPORTÂNCIA DO PROPÓSITO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Descubra seu <span className="text-yellow-400">verdadeiro propósito</span> e alcance a abundância
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://advocacialondrina.com.br/wp-content/uploads/2023/08/site-30.08-scaled.jpg"
                  alt="Homem sobrecarregado"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                O <span className="text-yellow-400">desafio</span> da falta de propósito
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Quando você não tem um propósito definido, a vida se torna uma rotina de distrações. A
                    procrastinação se infiltra na sua realidade, fazendo com que você sinta que está preso em um ciclo
                    sem fim.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    <strong>O Desafio:</strong> Quanto mais você adia, mais aprisionado(a) se sente em uma vida de
                    escassez.
                  </p>
                  <p className="text-zinc-300 mt-4">
                    Procrastinação não só impede a ação, mas amplifica a sensação de estagnação. Você espera pela hora
                    certa, mas ela nunca chega. Os dias se transformam em meses, e seus sonhos permanecem apenas como
                    ideias guardadas. Já pensou no peso disso?
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">O CAMINHO PARA O SUCESSO:</h3>
                  <p className="text-zinc-300">
                    Quando você decide criar sua vida, o primeiro passo é entrar no jogo do dinheiro para ganhar. Isso
                    significa assumir a responsabilidade por suas finanças e entender que a riqueza é uma escolha e não
                    sorte!
                  </p>
                  <p className="text-zinc-300 mt-4">
                    Oportunidades estão por toda parte! Pense grande e comece a agir. Admire aqueles que já alcançaram o
                    sucesso e aprenda com suas trajetórias. Eles são a prova de que o sonho é possível!
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  QUERO ENCONTRAR MEU PROPÓSITO <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reflexões Importantes Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">REFLEXÕES IMPORTANTES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas que <span className="text-yellow-400">transformam sua mentalidade</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <p className="text-xl text-zinc-300 mb-6">
                Cara, deixa eu te contar um segredo que transforma tudo: quem tem uma mente milionária entende que o
                propósito é a chave pra toda a abundância!
              </p>
              <p className="text-xl text-zinc-300 mb-6">
                Não dá pra construir uma vida próspera se você não souber pra onde está indo. O propósito é o que te faz
                acordar todo dia com aquela vontade surreal de agir, de fazer acontecer.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">O que realmente me faz feliz?</h3>
                  <p className="text-zinc-300">
                    A mente milionária se alimenta da paixão. Quando você descobre o que te energiza, tudo muda.
                  </p>
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Como posso fazer a diferença no mundo?</h3>
                  <p className="text-zinc-300">
                    A verdadeira prosperidade surge do desejo de ajudar os outros a resolverem seus desafios e
                    realizarem seus sonhos.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Crie suas próprias oportunidades:</h3>
                <p className="text-zinc-300">
                  Encontrar seu propósito é apenas o início. A mente milionária se movimenta, experimenta, falha e
                  ajusta o curso. Cada passo te aproxima do seu verdadeiro chamado e da abundância.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">O SUCESSO COMEÇA DENTRO DE VOCÊ:</h3>
              <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                Construa uma mentalidade livre de crenças limitantes. Quanto mais você acredita e age de maneira
                consistente, mais o universo responde com prosperidade e sucesso.
              </p>
              <Button
                asChild
                className="mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  GARANTA SEU LUGAR AGORA! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Em Apenas Uma Imersão Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">TRANSFORMAÇÃO COMPLETA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Em apenas uma <span className="text-yellow-400">imersão</span>, você vai:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Target className="h-10 w-10 text-yellow-400" />,
                title: "Identificar seu propósito",
                description:
                  "Identificará seu propósito de vida e carreira com clareza, abrindo portas para novas oportunidades.",
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-yellow-400" />,
                title: "Técnicas para criar riqueza",
                description:
                  "Adotará técnicas eficazes para criar e manter a riqueza, garantindo que sua receita aumente continuamente.",
              },
              {
                icon: <Brain className="h-10 w-10 text-yellow-400" />,
                title: "Mentalidade de sucesso",
                description:
                  "Compreenderá os padrões de pensamento das pessoas que prosperam, equipando-se com o conhecimento necessário para trilhar o mesmo caminho.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300 text-center">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">
              Ao final desta imersão, você estará preparado(a) para dar os primeiros passos em direção à sua vida
              abundante, ativando sua mente milionária.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#cadastro">
                GARANTA SEU LUGAR AGORA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Os Segredos da Mente Milionária Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">AS QUATRO INTELIGÊNCIAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Os Segredos da <span className="text-yellow-400">Mente Milionária</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "INTELIGÊNCIA EMOCIONAL",
                description:
                  "Aprenda a gerenciar suas emoções e a agir com confiança, essencial para tomar decisões que levarão à prosperidade.",
              },
              {
                title: "INTELIGÊNCIA FINANCEIRA",
                description: "Domine as regras do jogo do dinheiro e construa sua segurança financeira.",
              },
              {
                title: "INTELIGÊNCIA ESPIRITUAL",
                description:
                  "Alinhe sua mente e seu espírito com seu verdadeiro propósito, fazendo da prosperidade uma consequência natural da sua dedicação.",
              },
              {
                title: "INTELIGÊNCIA EMPREENDEDORA",
                description:
                  "Desenvolva uma mentalidade empreendedora, enxergando oportunidades onde outros veem desafios.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <h3 className="text-lg font-bold mb-4 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentores" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONHEÇA SEUS MENTORES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem vai te guiar nessa <span className="text-yellow-400">jornada transformadora</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Roberto Navarro */}
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-2 border-yellow-400">
                  <Image src="/images/roberto.webp" alt="Roberto Navarro" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">ROBERTO NAVARRO</h3>
                <div className="text-zinc-300 space-y-4">
                  <p>
                    Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente,
                    trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que
                    enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.
                  </p>
                  <p>
                    A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua
                    prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa
                    adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.
                  </p>
                  <p>
                    Com seu conhecimento adquirido, Roberto Navarro já ajudou mais de 130.000 pessoas a enriquecerem em
                    todo o Brasil e no mundo. Sua metodologia exclusiva combina estratégias financeiras, inteligência
                    emocional e princípios bíblicos, proporcionando resultados transformadores para seus alunos.
                  </p>
                </div>
              </div>
            </div>

            {/* Raissa Navarro */}
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-2 border-yellow-400">
                  <Image src="/images/testimonial-group.webp" alt="Raissa Navarro" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">RAISSA NAVARRO</h3>
                <div className="text-zinc-300 space-y-4">
                  <p>
                    Há quase 10 anos, Raissa Navarro, é uma estudiosa de PNL e comportamento humano, sendo escolhida até
                    para compor a equipe de apoio do Tony Robbins!
                  </p>
                  <p>
                    Raissa Navarro faz parte da The Society of NLP e é uma das poucas autorizadas a ensinar PNL de
                    verdade no Brasil, está todos os anos ao lado do Dr. Richard Bandler atualizando seus conhecimentos
                    para repassar a PNL verdadeira aos seus alunos.
                  </p>
                  <p>
                    Sempre bem humorada, Raissa Navarro tem transformado a vida de seus alunos e clientes ao redor do
                    mundo, fazendo com que eles se tornem mais livres física e mentalmente para tomar suas próprias
                    decisões e se tornar quem sempre quiseram ser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">LOCALIZAÇÃO DO EVENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como chegar ao <span className="text-yellow-400">local do evento</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Sede do ICF - Alameda Araguaia 751, Alphaville – SP</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      {/* Cadastro Section */}
      <section id="cadastro" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTA SUA VAGA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Escolha sua <span className="text-yellow-400">experiência</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Experiência Surreal */}
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">EXPERIÊNCIA SURREAL</h3>
                <p className="text-lg mb-6">Ingresso Geral</p>
                <ul className="space-y-4 mb-8 text-center">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>Experiência completa</span>
                  </li>
                </ul>
                <p className="text-3xl font-bold text-yellow-400 mb-8">GRATUITO</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
                >
                  <Link href="#cadastro">GARANTA SEU LUGAR AGORA!</Link>
                </Button>
              </div>
            </div>

            {/* Experiência VIP */}
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">EXPERIÊNCIA VIP COM NAVARRO</h3>
                <ul className="space-y-4 mb-8 text-center">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>Exclusivo: perguntas e respostas com Roberto Navarro</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>Assentos mais próximos ao palco</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>Experiência premium</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span>Compre 1, leve 2</span>
                  </li>
                </ul>
                <p className="text-3xl font-bold text-yellow-400 mb-8">R$49,90</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
                >
                  <Link href="#cadastro">GARANTA SEU LUGAR AGORA!</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informações do Evento */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">INFORMAÇÕES DO EVENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Não perca essa <span className="text-yellow-400">oportunidade única</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Onde</h3>
              <p className="text-xl mb-2">Sede do ICF</p>
              <p className="text-zinc-300">Alameda Araguaia 751, Alphaville – SP</p>
              <div className="mt-8">
                <Image
                  src="/images/rectangassale_10-1-e1727789800743.webp"
                  alt="Localização do evento"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Quando</h3>
              <p className="text-xl mb-2">01 de Maio</p>
              <ul className="space-y-2 text-zinc-300">
                <li>Credenciamento – 12h</li>
                <li>Treinamento – Das 13h às 20h</li>
              </ul>
              <div className="mt-8 p-6 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                <h4 className="text-xl font-bold mb-4 text-yellow-400">
                  ALCANCE SEU PROPÓSITO E CONQUISTE A SUA PROSPERIDADE!
                </h4>
                <p className="text-zinc-300">
                  Participe de 7 horas com Roberto Navarro e descubra o potencial milionário que está dentro de você!
                </p>
                <Button
                  asChild
                  className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
                >
                  <Link href="#cadastro">GARANTA SEU LUGAR AGORA!</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 max-w-4xl mx-auto">
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <p className="text-2xl font-bold mb-4">01 de Maio - Quinta-feira</p>
              <p className="text-xl mb-6">Inicio: 13h | Fim: 20h</p>
              <p className="text-xl mb-8">Alphaville - SP</p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-yellow-400 font-bold text-lg mb-2">AGIR</p>
                  <p className="text-zinc-300">com intenção</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold text-lg mb-2">PROPÓSITO</p>
                  <p className="text-zinc-300">claro</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold text-lg mb-2">PROSPERIDADE</p>
                  <p className="text-zinc-300">abundante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <Logo className="h-10 w-auto mb-4" />
              <p className="text-sm text-zinc-400 mb-4">Transformando vidas financeiras em todo o Brasil desde 2015.</p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "youtube", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Programas</h4>
              <ul className="space-y-2">
                {["Despertar Milionário", "Coaching Financeiro", "Mentoria LCF", "Segredos da Mente Milionária"].map(
                  (program) => (
                    <li key={program}>
                      <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                        {program}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                {["Sobre", "Depoimentos", "FAQ", "Blog", "Contato"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h4>
              <p className="text-sm text-zinc-400 mb-2">contato@robertonavarrooficial.com.br</p>
              <p className="text-sm text-zinc-400">São Paulo, SP - Brasil</p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
