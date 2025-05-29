"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Users, Star, Zap, Brain, CheckCircle, Award, BarChart, DollarSign, Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import LocationMap from "@/components/location-map"
import GlowEffect from "@/components/glow-effect"
import { TestimonialsSection }  from "@/components/testimonials-section"
import HeroPages from "@/components/hero-pages"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ReusableSection from "@/components/how-works"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"

export default function MentoriaPage() {
  const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
    const videoModalRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  setIsVisible(true)

  // Add keyframe animation for hover effects
  const style = document.createElement("style")
  style.innerHTML = `
    .cta-hover {
      transition: all 0.3s ease;
    }
    .cta-hover:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
    }
    
    .cta-hover-subtle {
      transition: all 0.3s ease;
    }
    .cta-hover-subtle:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 15px -5px rgba(245, 158, 11, 0.2);
    }
  `
  document.head.appendChild(style)
}, [])

const navigationItems = [
  { title: "Início", href: "/" },
  { title: "Benefícios", href: "#beneficios" },
  { title: "Como Funciona", href: "#sobre" },
  { title: "Depoimentos", href: "#depoimentos" },
  { title: "Inscrição", href: "#form", isButton: true },
];

// Adicionar event listener para a tecla ESC para fechar o vídeo
useEffect(() => {
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveVideoId(null)
    }
  }

  document.addEventListener('keydown', handleEscKey)

  return () => {
    document.removeEventListener('keydown', handleEscKey)
  }
}, [])
  
  // Controlar o scroll quando o modal de vídeo está aberto
  useEffect(() => {
    if (activeVideoId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideoId])
  
  // Fechar o vídeo quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) {
        setActiveVideoId(null)
      }
    }
    
    if (activeVideoId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeVideoId])
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
  showInicio={true}
/>
      <HeroPages
        title="LCF MENTORING"
        subtitle="Mentoria Exclusiva"
        description="Uma imersão profunda e transformadora em finanças pessoais, coaching de vida e estratégias práticas para você conquistar a sua liberdade financeira."
        image="/images/HERO_MENTORIA.png"
        ctaText="QUERO PARTICIPAR"
        ctaHref="#beneficios"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre" secondtitle={"Você no controle da sua vida"}        
      />

     {/* // What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE ESTÁ TRAVANDO SUA  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">SUA LIBERDADE FINANCEIRA?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart className="h-6 w-6" />,
                title: "Inteligência emocional",
                desc: "Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.",
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Inteligência financeira",
                desc: "Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Inteligência espiritual",
                desc: "Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Inteligência estratégica",
                desc: "Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.",
              },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{module.title}</h3>
                <p className="text-zinc-300">{module.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      

      <ReusableSection
        id="sobre-o-programa"
        title="O QUE É O"
        subtitle="LCF MENTORING?"
        description="Um programa único no Brasil que une Life Coaching e Mentor Coaching Financeiro.

Com base em centenas de histórias de sucesso, o programa entrega não apenas conhecimento técnico, mas uma verdadeira mudança de mentalidade, hábitos e comportamentos./n Imagine acordar todos os dias com clareza, segurança e autonomia financeira. Você terá um plano, um propósito e as ferramentas para atingir seus objetivos. Além de aprender a gerenciar seu dinheiro, você também desenvolverá habilidades que transformarão todas as áreas da sua vida."
        imageDesktop="/images/HERO_EDUCADOR.png"
        imageMobile="/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"
        listItems={[
          "Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.",
          "Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.",
          "Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.",
        ]}
        ctaText="CONQUISTE SUA VAGA!"
        ctaHref="#inscricao"
/>


      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI CONQUISTAR COM O <span className="text-yellow-400">LCF MENTORING?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Liberdade e estabilidade financeira",
                description: "Aprenda a organizar suas finanças com segurança e inteligência.",
              },
              {
                title: "Desenvolvimento pessoal e profissional",
                description: "Adquira habilidades poderosas que impulsionarão todas as áreas da sua vida.",
              },
              {
                title: "Acompanhamento contínuo",
                description:
                  "Mesmo após a imersão, você continua recebendo suporte para aplicar o que aprendeu e gerar resultados consistentes.",
              },
              {
                title: "Mudança de mentalidade",
                description: "Transforme a forma como você enxerga o dinheiro, suas escolhas e seu potencial.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            <TransformationVideos />
      {/* Modal de vídeo */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
          <div ref={videoModalRef} className="relative w-full max-w-4xl z-[9999]">
            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-zinc-400 text-sm">
                  Assista a história completa de transformação
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveVideoId(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                >
                  Fechar Vídeo
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setActiveVideoId(null)}
              aria-label="Fechar vídeo"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fechar vídeo</span>
            </Button>
          </div>
        </div>
      )}

      <NotableParticipants />

      {/* Program Content */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-center mb-10 animate-on-scroll fade-in">
            MÓDULOS DA <span className="text-highlight">MENTORIA</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">
                Módulo 1: Life Coaching Profissional <span className="text-highlight">(4 dias)</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Desenvolvimento de habilidades pessoais e profissionais</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Inteligência emocional e social</li>
                      <li>Desenvolvimento da autoestima e autoconfiança</li>
                      <li>Gestão do tempo e produtividade</li>
                      <li>Técnicas de resolução de conflitos</li>
                      <li>Desenvolvimento de competências de liderança</li>
                      <li>Ferramentas de avaliação de competências</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Técnicas de coaching para transformação de vida</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Metodologias de mudança de comportamento</li>
                      <li>Criação de planos de ação personalizados</li>
                      <li>Técnicas de motivação e manutenção de hábitos</li>
                      <li>Estratégias para superação de limitações</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">O que é Coaching</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>História e evolução do Coaching</li>
                      <li>Tipos de Coaching e seus benefícios</li>
                      <li>Diferenciação entre Coaching, Mentoria e Terapia</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Fundamentos de PNL (Programação Neurolinguística)</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Fundamentos e história da PNL</li>
                      <li>Aplicações práticas da PNL no Coaching</li>
                      <li>Pressupostos fundamentais e suas aplicações</li>
                      <li>Técnicas avançadas de construção de Rapport</li>
                      <li>Sistemas representacionais</li>
                      <li>Comunicação eficaz</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </GlowEffect>

            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">
                Módulo 2: Mentor Coaching Financeiro <span className="text-highlight">(3 dias)</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">
                      Estratégias financeiras para alcançar a liberdade financeira
                    </p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Criação de estratégias personalizadas para liberdade financeira</li>
                      <li>Estudos de caso e exemplos práticos</li>
                      <li>Planejamento financeiro e investimentos</li>
                      <li>Análise de risco e gestão de investimentos</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Pilares da Riqueza e Clareza Financeira</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Estrutura e construção dos pilares da riqueza</li>
                      <li>Ferramentas para avaliação de clareza financeira</li>
                      <li>Como se livrar das dívidas</li>
                      <li>Como gerar dinheiro</li>
                      <li>Métodos e fontes diversificadas de renda</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Identidade Financeira e Plano de Ação</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Construção e reprogramação da identidade financeira</li>
                      <li>Técnicas de separação de dinheiro e gestão de potes</li>
                      <li>Criação e implementação de planos de ação detalhados</li>
                      <li>Técnicas para definição e clareza de objetivos financeiros</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Múltiplas inteligências financeiras</p>
                    <ul className="mt-1 space-y-1 text-subtitle text-xs">
                      <li>Identificação e desenvolvimento das inteligências financeiras individuais</li>
                      <li>Aplicação prática para diversificação de estratégias</li>
                      <li>Estratégias empreendedoras e de investimento</li>
                      <li>Análise e comparação de diferentes tipos de investimentos</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </GlowEffect>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentores" className="py-20 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-12 animate-on-scroll fade-in text-3xl md:text-4xl font-bold">
            CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
          </h2>
          <p className="text-center mb-10 max-w-3xl mx-auto animate-on-scroll fade-in text-sm">
            Por trás do LCF Mentoring, duas trajetórias que unem conhecimento, superação e propósito.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Roberto Navarro */}
            <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <div className="flex flex-col gap-8">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                  <Image src="/images/roberto.webp" alt="Roberto Navarro" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">ROBERTO NAVARRO</h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.</p>
                    <p>
                      Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente
                      de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da
                      sua família.
                    </p>
                    <p>
                      Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com
                      sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios
                      bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito
                      e ação.
                    </p>
                    <p>
                      Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em
                      inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios.
                      Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com
                      autonomia e visão de futuro.
                    </p>
                    <div className="pt-4">
                      <GlowEffect>
                        <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                          GARANTA SUA VAGA!
                        </Button>
                      </GlowEffect>
                    </div>
                  </div>
                </div>
              </div>
            </GlowEffect>

            {/* Raissa Navarro */}
            <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
              <div className="flex flex-col gap-8">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group_18-1-1LHrdbJhcrEJFv1R5sItLA6gUXYbiw.webp"
                    alt="Raissa Navarro"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">RAÍSSA NAVARRO</h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>
                      Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).
                    </p>
                    <p>
                      Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras
                      autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.
                    </p>
                    <p>
                      Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no
                      mundo e acumula mais de 10 anos em estudos sobre PNL e comportamento humano.
                    </p>
                    <p>
                      Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional,
                      sempre com bom humor e energia elevada. Seus ensinamentos são uma chave para quem quer vencer o
                      medo, a procrastinação e o sentimento de incapacidade.
                    </p>
                    <div className="pt-4">
                      <GlowEffect>
                        <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                          GARANTA SUA VAGA!
                        </Button>
                      </GlowEffect>
                    </div>
                  </div>
                </div>
              </div>
            </GlowEffect>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">130k+</h3>
              <p className="text-sm text-gray-300">Alunos</p>
            </div>
            <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">7 anos</h3>
              <p className="text-sm text-gray-300">Experiência</p>
            </div>
            <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">10M</h3>
              <p className="text-sm text-gray-300">Meta de impacto</p>
            </div>
            <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</h3>
              <p className="text-sm text-gray-300">Avaliação</p>
            </div>
          </div>
        </div>
      </section>


      {/* Guarantee Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-center mb-4 animate-on-scroll fade-in">
            Nosso Compromisso É com o Seu <span className="text-highlight">Crescimento</span>
          </h2>
          <h3 className="text-center mb-10 text-xl font-semibold animate-on-scroll fade-in">
            Garantia Incondicional de Satisfação
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">Garantia Legal de 7 Dias</h3>
              <p className="text-sm text-gray-300 mb-4">
                Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo,
                dentro dos primeiros 7 dias de acesso à formação, você decidir que o Coach Financeiro não está alinhado
                com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.
              </p>
              <p className="text-sm text-gray-300">
                Sem complicações, sem perguntas – é a nossa maneira de garantir sua total confiança e conforto ao dar
                esse passo importante.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">Garantia de Resultado em 6 meses</h3>
              <p className="text-sm text-gray-300 mb-4">
                Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma
                melhoria significativa em sua vida financeira dentro de 6 meses, devolveremos o dobro do seu
                investimento no curso.
              </p>
              <p className="text-sm text-gray-300">
                Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o
                seu progresso e resultados.
              </p>
            </GlowEffect>
          </div>
        </div>
      </section>

      <NewsletterFormacoes title="INSCREVA-SE PARA TER A MUDANÇA DE VIDA" description="Garanta sua vaga na Mentoria Individual" />

      {/* Media Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-center mb-10 animate-on-scroll fade-in">
            SOMOS NOTÍCIA EM DIVERSOS <span className="text-highlight">MEIOS DE COMUNICAÇÃO</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image src="/images/logo-exame.webp" alt="Exame" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image src="/images/logo-1.png" alt="ProNews" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image
                src="/images/logo-o-fluminense.webp"
                alt="O Fluminense"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3 animate-on-scroll card-hover">
              <Image
                src="/images/commercio.png"
                alt="Jornal do Commercio"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-4 animate-on-scroll fade-in">
            Entendemos que você pode ter algumas dúvidas antes de se inscrever no LCF Mentoring.
          </h2>
          <p className="text-center mb-10 max-w-3xl mx-auto animate-on-scroll fade-in text-sm">
            Aqui estão algumas respostas para as perguntas mais comuns:
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <GlowEffect className="bg-black p-5 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-base font-semibold mb-2">O que é o LCF Mentoring?</h3>
              <p className="text-subtitle font-light text-xs">
                O LCF Mentoring é uma imersão de 7 dias em Alphaville que combina Life Coaching Profissional e Mentor
                Coaching Financeiro para ajudar você a alcançar a liberdade financeira.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-5 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-base font-semibold mb-2">Quem pode participar do LCF Mentoring?</h3>
              <p className="text-subtitle font-light text-xs">
                O programa é ideal para empreendedores, servidores públicos, profissionais liberais, trabalhadores CLT,
                profissionais de marketing digital e educadores que desejam alcançar a liberdade financeira e
                transformar suas vidas.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-5 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-base font-semibold mb-2">Quais são os módulos do programa?</h3>
              <p className="text-subtitle font-light text-xs">
                O programa é dividido em dois módulos principais: Life Coaching Profissional (4 dias) e Mentor Coaching
                Financeiro (3 dias), abordando desde desenvolvimento pessoal até estratégias financeiras avançadas.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-5 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-base font-semibold mb-2">Qual é o investimento?</h3>
              <p className="text-subtitle font-light text-xs">
                O investimento para o LCF Mentoring é de R$ 5.997 à vista ou em 12x de R$ 597. Considere isso não como
                um gasto, mas como um investimento no seu futuro financeiro.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-5 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <h3 className="text-base font-semibold mb-2">E se eu não gostar do programa?</h3>
              <p className="text-subtitle font-light text-xs">
                Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito, devolvemos 100% do seu
                investimento, sem perguntas.
              </p>
            </GlowEffect>
          </div>
        </div>
      </section>


     <Footer />
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
      {/* YouTube API Script for autoplay */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          // Load YouTube API
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          
          // Initialize player when API is ready
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('testimonial-video', {
              events: {
                'onReady': onPlayerReady
              }
            });
          }
          
          // Set up Intersection Observer to play video when in view
          function onPlayerReady(event) {
            const videoSection = document.getElementById('testimonial-video');
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting && player && player.playVideo) {
                  player.playVideo();
                } else if (player && player.pauseVideo) {
                  player.pauseVideo();
                }
              });
            }, { threshold: 0.5 });
            
            if (videoSection) {
              observer.observe(videoSection) ;
            }
          }
        `,
        }}
      />
    </div>
  )
}
