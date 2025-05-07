"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import GlowEffect from "@/components/glow-effect"
import ParallaxSection from "@/components/parallax-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  // Função para aplicar animações baseadas no scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container-custom py-4 flex justify-between items-center">
        <Logo className="h-10 w-auto" />
        <nav className="hidden md:flex space-x-6">
          <Link href="#sobre" className="text-sm hover:text-yellow-400 transition-colors link-hover">
            Sobre
          </Link>
          <Link href="#formacoes" className="text-sm hover:text-yellow-400 transition-colors link-hover">
            Formações
          </Link>
          <Link href="#depoimentos" className="text-sm hover:text-yellow-400 transition-colors link-hover">
            Depoimentos
          </Link>
          <Link href="#contato" className="text-sm hover:text-yellow-400 transition-colors link-hover">
            Contato
          </Link>
          <Link href="/despertar-milionario" className="text-sm hover:text-yellow-400 transition-colors link-hover">
            Despertar Milionário
          </Link>
        </nav>
        <MobileMenu
          links={[
            { href: "#sobre", label: "Sobre" },
            { href: "#formacoes", label: "Formações" },
            { href: "#depoimentos", label: "Depoimentos" },
            { href: "#contato", label: "Contato" },
            { href: "/despertar-milionario", label: "Despertar Milionário" },
          ]}
        />
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm">Inscreva-se</Button>
      </header>

      {/* Hero Section */}
      {/* <section className="relative min-h-screen w-full flex items-center">
      <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner-roberto.jpg"
            alt="Roberto Navarro"
            fill
            className="object-cover"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        <div className="relative z-10 container-custom py-16">
          <div className="max-w-2xl">
            <h1 className="mb-6 fade-in-left">
              FORMAÇÕES PARA QUEM <span className="text-yellow-400">NÃO QUER</span> DEIXAR O ANO DE 2024 SER{" "}
              <span className="line-through italic">SÓ MAIS UM</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-yellow-400 fade-in-right">
              ALCANCE <em className="font-medium">GRANDES RESULTADOS</em> COM{" "}
              <span className="font-bold">INTELIGÊNCIA FINANCEIRA</span>
            </h2>
            <p className="text-base md:text-lg mb-8 fade-in font-light leading-relaxed">
              Neste ano de 2024 vamos nos concentrar na <strong className="text-yellow-400">gratidão</strong> e no{" "}
              <strong className="text-yellow-400">crescimento</strong> para que possamos viver vidas mais{" "}
              <em className="font-medium">saudáveis</em>, <em className="font-medium">ricas</em>,{" "}
              <em className="font-medium">apaixonadas</em> e com <em className="font-medium">propósito</em> – e para que
              possamos ajudar os outros a fazerem o mesmo.
            </p>
            <div className="fade-in">
              <GlowEffect>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold py-5 px-6 btn-hover">
                  SIM, VOU GARANTIR MEUS RESULTADOS
                </Button>
              </GlowEffect>
            </div>
            <div className="mt-12 fade-in">
              <a
                href="#formacoes"
                className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <span className="mb-2 text-xs">Conheça nossas formações</span>
                <ChevronDown className="animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section> */}
 <section className="relative min-h-screen w-full flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner-roberto.jpg"
            alt="Roberto Navarro"
            fill
            className="object-cover"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        <div className="relative z-10 container-custom py-16">
          <div className="max-w-2xl">
            <h1 className="mb-6 fade-in-left">
              FORMAÇÕES PARA QUEM <span className="text-yellow-400">NÃO QUER</span> DEIXAR O ANO DE 2024 SER{" "}
              <span className="line-through italic">SÓ MAIS UM</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-yellow-400 fade-in-right">
              ALCANCE <em className="font-medium">GRANDES RESULTADOS</em> COM{" "}
              <span className="font-bold">INTELIGÊNCIA FINANCEIRA</span>
            </h2>
            <p className="text-base md:text-lg mb-8 fade-in font-light leading-relaxed">
              Neste ano de 2024 vamos nos concentrar na <strong className="text-yellow-400">gratidão</strong> e no{" "}
              <strong className="text-yellow-400">crescimento</strong> para que possamos viver vidas mais{" "}
              <em className="font-medium">saudáveis</em>, <em className="font-medium">ricas</em>,{" "}
              <em className="font-medium">apaixonadas</em> e com <em className="font-medium">propósito</em> – e para que
              possamos ajudar os outros a fazerem o mesmo.
            </p>
            <div className="fade-in">
              <GlowEffect>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold py-5 px-6 btn-hover">
                  SIM, VOU GARANTIR MEUS RESULTADOS
                </Button>
              </GlowEffect>
            </div>
            <div className="mt-12 fade-in">
              <a
                href="#formacoes"
                className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <span className="mb-2 text-xs">Conheça nossas formações</span>
                <ChevronDown className="animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      {/* Domine todas as áreas da sua vida */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-on-scroll fade-in-left">
              <h2 className="mb-6">
                Domine todas as áreas da <span className="text-highlight">sua vida</span>
              </h2>
              <p className="mb-4 text-body">
                Nosso método exclusivo vai além das finanças, abordando todas as dimensões essenciais para uma vida
                plena e equilibrada.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold mb-2">Finanças</h3>
                  <p className="text-subtitle font-light">Alcance a verdadeira liberdade financeira</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold mb-2">Relacionamentos</h3>
                  <p className="text-subtitle font-light">Construa conexões profundas e significativas</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold mb-2">Carreira</h3>
                  <p className="text-subtitle font-light">Desenvolva seu potencial profissional</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold mb-2">Saúde</h3>
                  <p className="text-subtitle font-light">Cuide do seu bem-estar físico e mental</p>
                </div>
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 px-6 btn-hover">
                QUERO TRANSFORMAR MINHA VIDA
              </Button>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden animate-on-scroll fade-in-right">
              <Image
                src="/images/roberto-palestra.jpeg"
                alt="Roberto Navarro"
                fill
                className="object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <ParallaxSection
        backgroundImage="/images/money-image.webp"
        overlayColors={["rgba(0, 0, 0, 0.8)", "rgba(255, 215, 0, 0.2)"]}
        className="py-16"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll fade-in">
            <p className="text-base mb-6 text-body leading-relaxed">
              Ao longo da minha carreira, acumulei experiência em diferentes áreas, incluindo cronista esportivo,
              vice-presidente da Associação Comercial de São Paulo e franqueado do ano Brasil AM PM. Mas minha
              verdadeira paixão sempre foi ajudar as pessoas a alcançarem a independência financeira e a liberdade que
              tanto desejam.
            </p>
            <p className="text-base mb-6 text-body leading-relaxed font-medium">
              Criador do <span className="text-highlight">COACH FINANCEIRO</span> no Brasil, com mais de{" "}
              <strong className="text-yellow-400">1280 técnicas exclusivas</strong> de Coaching, e mais de{" "}
              <strong className="text-yellow-400">130 mil alunos treinados</strong>. Sou considerado o{" "}
              <em className="font-extrabold">maior Educador Financeiro do país</em>, além de ser especialista em
              inteligência espiritual e emocional. Minha missão é transformar a vida financeira de{" "}
              <span className="text-yellow-400">10 milhões de brasileiros</span> e impactar positivamente o país como um
              todo, tornando-o um lugar rico e próspero.
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                EM MISSÃO DE <span className="text-highlight">MUDAR VIDAS</span>
              </h3>
              <p className="text-base text-yellow-400 font-semibold">
                ROBERTO NAVARRO PASSOU MAIS DE 30 ANOS CRIANDO INOVAÇÕES E TRANSFORMANDO VIDAS
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Courses Section */}
      <section id="formacoes" className="py-16 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-12 animate-on-scroll fade-in">
            NOSSAS <span className="text-highlight">FORMAÇÕES</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Coaching Financeiro */}
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left card-hover">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/image_4.png"
                  alt="Coaching Financeiro"
                  width={250}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-body mb-4 leading-relaxed text-sm">
                Transforme sua mentalidade financeira e aprenda estratégias práticas para alcançar a liberdade
                financeira. O Coaching Financeiro é um método exclusivo que combina técnicas de coaching com educação
                financeira.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Desenvolvimento de mentalidade de riqueza</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Estratégias de investimento e geração de renda</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Plano personalizado para independência financeira</p>
                </li>
              </ul>
              <Link href="/coaching" className="block w-full">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm btn-hover">
                  CONHECER FORMAÇÃO <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </GlowEffect>

            {/* LCF Mentoring */}
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-up card-hover">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo-empreendedor-inteligente-new.png"
                  alt="LCF Mentoring"
                  width={250}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-body mb-4 leading-relaxed text-sm">
                Aprenda a construir e escalar seu negócio de forma inteligente e lucrativa. O programa LCF Mentoring
                oferece ferramentas e estratégias para empreendedores que desejam ir além.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Estratégias de marketing e vendas</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Gestão financeira para negócios</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Liderança e desenvolvimento de equipes</p>
                </li>
              </ul>
              <Link href="/mentoria" className="block w-full">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm btn-hover">
                  CONHECER FORMAÇÃO <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </GlowEffect>

            {/* Despertar Milionário */}
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right card-hover">
              <div className="flex justify-center mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DESPERTAR-MILIONARIO-2-Ddxm6gkJQ7kAKTvlNL7mT0QzNeOZsC.webp"
                  alt="Despertar Milionário"
                  width={250}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-body mb-4 leading-relaxed text-sm">
                O método perfeito para você sair da inércia e alcançar seus primeiros 10 mil reais. Descubra como
                transformar sua realidade financeira e conquistar a prosperidade sem limites.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Retome o controle financeiro</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Estratégias comprovadas para 10 mil reais</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Conteúdo exclusivo e personalizado</p>
                </li>
              </ul>
              <Link href="/despertar-milionario" className="block w-full">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm btn-hover">
                  CONHECER FORMAÇÃO <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </GlowEffect>

            {/* Segredos da Mente Milionária */}
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right card-hover">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo-sem-fundo.webp"
                  alt="Segredos da Mente Milionária"
                  width={250}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-body mb-4 leading-relaxed text-sm">
                Desperte seu potencial para a riqueza. Uma imersão completa para transformar sua mentalidade e descobrir
                como pensar como os verdadeiros milionários.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Desenvolva uma mentalidade de abundância</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Aprenda a identificar oportunidades</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-sm font-medium">Crie fontes de renda residual</p>
                </li>
              </ul>
              <Link href="/segredos-da-mente-milionaria" className="block w-full">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm btn-hover">
                  CONHECER FORMAÇÃO <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </GlowEffect>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <ParallaxSection
        backgroundImage="/images/lifestyle-collage.webp"
        overlayColors={["rgba(0, 0, 0, 0.9)", "rgba(255, 215, 0, 0.1)"]}
        className="py-16"
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll fade-in">
            <h2 className="mb-6">COMECE A VIVER A VIDA DOS SEUS SONHOS</h2>
            <p className="text-base mb-8 text-subtitle font-medium">Não Sabe Por Onde Começar? Chama O Lucas Abaixo</p>
            <GlowEffect>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-base font-bold py-4 px-8 btn-hover">
                COMEÇAR AGORA
              </Button>
            </GlowEffect>
          </div>
        </div>
      </ParallaxSection>

      {/* Media Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-12 animate-on-scroll fade-in">
            RECONHECIDO PELA <span className="text-highlight">MÍDIA</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image src="/images/logo-exame.png" alt="Exame" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image src="/images/logo-pronews.png" alt="ProNews" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image
                src="/images/logo-fluminense.webp"
                alt="O Fluminense"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image
                src="/images/logo-jc.png"
                alt="Jornal do Commercio"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll scale-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">Entre em Contato</h2>
            <p className="text-center mb-6 text-subtitle text-sm">
              Estamos prontos para ajudar você a transformar sua vida financeira.
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-1">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-1">
                  Sua Mensagem
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
                ></textarea>
              </div>
              <div className="pt-2">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                  ENVIAR MENSAGEM
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 py-10 border-t border-zinc-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Logo className="h-8 w-auto mb-3" />
              <p className="text-caption">Transformando mentalidades e construindo futuros financeiros sólidos.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Formações</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/coaching" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                    Coaching Financeiro
                  </Link>
                </li>
                <li>
                  <Link href="/mentoria" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                    LCF Mentoring
                  </Link>
                </li>
                <li>
                  <Link
                    href="/despertar-milionario"
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-xs"
                  >
                    Despertar Milionário
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Contato</h3>
              <ul className="space-y-1">
                <li className="text-caption">contato@robertonavarro.com.br</li>
                <li className="text-caption">(11) 99999-9999</li>
                <li className="text-caption">São Paulo, SP</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Redes Sociais</h3>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                  Instagram
                </Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                  Facebook
                </Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                  YouTube
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Roberto Navarro. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
