"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Star,
  Users,
  Zap,
  Brain,
  Target,
  Wallet,
  GraduationCap,
  X,
  TrendingUp,
  Shield,
  BookOpen,
  BarChart3,
  PiggyBank,
  Heart,
  Clock,
  Award,
  Play,
  DollarSign,
  BarChart,
  Building,
  UserPlus,
  Users2,
  BedDouble,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ReusableSection from "@/components/how-works"
import NotableParticipants from "@/components/notable-persons"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import Footerlp from "@/components/footerlp"

export default function MentoriaDeInvestimentos() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      {/* Hero Section */}
      <HeroPages
        title="MENTORIA DE INVESTIMENTOS"
        subtitle="Faça seu dinheiro trabalhar por você"
        description="Formação prática para quem quer aprender a investir com segurança, confiança e estratégias reais do mercado."
        image="/images/HERO_MENTORIAINVESTIMENTOS.png"
        ctaText="QUERO ME TORNAR UM INVESTIDOR!"
        ctaHref="#inscricao"
        secondtitle="Transforme sua vida financeira com a mentoria de investimentos"
      />

      {/* Bloco 2 - Reprograme sua mente */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">REPROGRAME SUA MENTE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              REPROGRAME SUA MENTE PARA INVESTIR COM SEGURANÇA
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Caixinha vermelha */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/50 rounded-xl p-8 hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-red-400">PROBLEMAS COMUNS</h3>
              <div className="space-y-4">
                {[
                  "Medo de investir?",
                  "Não sabe por onde começar?",
                  "Cansado de taxas bancárias abusivas?",
                  "Sente que o dinheiro nunca é suficiente?",
                  "Já tentou sozinho e se frustrou?"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caixinha verde */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-green-400">SOLUÇÕES DA MENTORIA</h3>
              <div className="space-y-4">
                {[
                  "Aprenda o passo a passo de como investir com segurança, mesmo sendo iniciante.",
                  "Descubra estratégias que os bancos não querem que você saiba.",
                  "Desenvolva confiança para tomar decisões financeiras com autonomia.",
                  "Crie uma renda extra com investimentos, mesmo começando com pouco.",
                  "Tenha o acompanhamento e direcionamento certo para fazer seu dinheiro crescer."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 3 - A mentoria que vai transformar */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              A MENTORIA QUE VAI TRANSFORMAR SUA RELAÇÃO COM O DINHEIRO
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              A Mentoria de Investimentos vai te ajudar a descobrir que o mundo dos investimentos é acessível, simples e lucrativo.
            </p>
            <p className="text-lg text-zinc-300 mb-8">
              Durante dois dias intensivos de mentoria, você será guiado por Roberto Navarro, um dos maiores educadores financeiros do Brasil, que vai te mostrar as estratégias reais e aplicáveis usadas por investidores bem-sucedidos.
            </p>
            <p className="text-lg text-zinc-300 mb-12">
              E o melhor: você ainda terá acesso à Universidade do Investidor, com aulas online que aprofundam seu aprendizado. Você vai sair desse treinamento com um plano prático, um novo nível de consciência sobre seu dinheiro e pronto para investir com confiança e segurança.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
              onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
            >
              QUERO ME TORNAR UM INVESTIDOR!
            </Button>
          </div>
        </div>
      </section>

      {/* Bloco 4 - O que você vai aprender */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI APRENDER NA FORMAÇÃO
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <TrendingUp className="h-8 w-8 text-yellow-400" />,
                title: "Investimentos na Bolsa",
                description: "Descubra como lucrar até quando a bolsa está em queda.",
              },
              {
                icon: <Shield className="h-8 w-8 text-yellow-400" />,
                title: "Renda fixa",
                description: "Saiba como proteger seu capital e garantir retorno.",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-yellow-400" />,
                title: "Análise técnica",
                description: "Aprenda como ler gráficos e tomar decisões baseadas em dados.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Mercado futuro",
                description: "Descubra novas oportunidades para escalar seus ganhos.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Planejamento financeiro",
                description: "Monte seu plano de independência financeira.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Gestão de risco",
                description: "Saiba como administrar riscos, perdas e ganhos.",
              },
              {
                icon: <PiggyBank className="h-8 w-8 text-yellow-400" />,
                title: "Potes milionários",
                description: "Crie métodos para alcançar a aposentadoria, a independência e a liberdade.",
              },
              {
                icon: <Heart className="h-8 w-8 text-yellow-400" />,
                title: "Gestão emocional",
                description: "Saiba como lidar e gerir com o estresse do mercado.",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-yellow-400" />,
                title: "Inteligência de investimento",
                description: "Aprenda a escapar do overtrading e especialize-se em mercados específicos.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 5 - Investir não é aposta */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              INVESTIR NÃO É APOSTA
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <TrendingUp className="h-8 w-8 text-yellow-400" />, text: "Investir é disciplina" },
                { icon: <BarChart className="h-8 w-8 text-yellow-400" />, text: "Investir é administrar riscos" },
                { icon: <BookOpen className="h-8 w-8 text-yellow-400" />, text: "Investir é adquirir conhecimento constante" },
                { icon: <Target className="h-8 w-8 text-yellow-400" />, text: "Investir é tolerar eventuais perdas com estratégia" },
                { icon: <Shield className="h-8 w-8 text-yellow-400" />, text: "Investir é proteger o seu futuro com consciência" },
              ].map((item, index) => (
                <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <div className="mb-4">{item.icon}</div>
                  <p className="text-lg font-medium text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 6 - Aprenda com o mentor */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">SEU MENTOR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                APRENDA COM O MENTOR DOS MENTORES
              </h2>
              <p className="text-xl text-yellow-400 font-semibold">
                O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/images/roberto.webp"
                  alt="Roberto Navarro"
                  width={400}
                  height={400}
                  className="rounded-xl mx-auto"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-zinc-300">
                  Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.
                </p>
                <p className="text-lg text-zinc-300">
                  Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 300 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.
                </p>
                <p className="text-lg text-zinc-300">
                  Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
                  onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  QUERO ME TORNAR UM INVESTIDOR!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Bloco 7 - Transformações */}
      <section id="depoimentos" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              TRANSFORMAÇÕES QUE FALAM POR SI
            </h2>
            <div className="aspect-video bg-zinc-900/50 rounded-xl overflow-hidden mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/k3GPTo26Fn4"
                title="Depoimentos Mentoria de Investimentos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
              onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
            >
              QUERO ME TORNAR UM INVESTIDOR!
            </Button>
          </div>
        </div>
      </section>

      {/* Bloco 8 - Investimento seguro */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTIAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              INVESTIMENTO SEGURO
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <div className="mb-4">
                  <Shield className="h-12 w-12 text-yellow-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Garantia legal de 7 dias</h3>
                <p className="text-zinc-300">
                  Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o treinamento não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <div className="mb-4">
                  <Award className="h-12 w-12 text-yellow-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Garantia de resultados em 6 meses</h3>
                <p className="text-zinc-300">
                  Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de poucos dias, devolveremos o dobro do seu investimento no curso. Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o seu progresso e resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 9 - Perguntas frequentes */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                PERGUNTAS FREQUENTES
              </h2>
            </div>
            <div className="space-y-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Para quem é essa formação?</h3>
                <p className="text-zinc-300">
                  A formação é para quem está começando do zero ou tem pouco conhecimento sobre investimentos. Não importa sua idade, profissão ou renda atual — o conteúdo foi desenvolvido para tornar o mundo dos investimentos acessível a todos.
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Como a formação é entregue?</h3>
                <p className="text-zinc-300">
                  A formação acontece de duas formas:<br/>
                  • Online, com 1 ano de acesso à plataforma VIP para você estudar no seu ritmo.<br/>
                  • Presencial, em uma mentoria intensiva de 2 dias com Roberto Navarro, para acelerar seus resultados com acompanhamento direto.
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">O que acontece depois da formação?</h3>
                <p className="text-zinc-300">
                  Você sairá da formação com clareza, segurança e um plano prático de ação. Estará apto a investir com confiança, gerar renda com seus investimentos, multiplicar seu patrimônio, fugir de taxas abusivas e proteger seu capital mesmo em cenários de crise.
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Como essa formação pode transformar a minha vida e a do meu negócio?</h3>
                <p className="text-zinc-300">
                  Com as estratégias e ferramentas certas, você poderá assumir o controle da sua vida financeira, conquistar a independência financeira e até mesmo usar os conhecimentos para impulsionar o crescimento do seu negócio. O impacto vai além do dinheiro: é sobre liberdade, escolhas e tranquilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <NewsletterFormacoes
        onSubmit={() => {}}
        title=" PRONTO PARA TRANSFORMAR SUA VIDA FINANCEIRA?"
        description="Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro através da Mentoria de Investimentos."
        source="Mentoria de Investimentos"
        ctaText="QUERO ME TORNAR UM INVESTIDOR!"
      />
      
      {/* Footer simplificado sem links */}
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-zinc-400">
              © 2024 Roberto Navarro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
