"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Video, 
  Award,
  TrendingUp,
  Target,
  Network,
  HeadphonesIcon,
  Zap,
  Shield,
  Clock,
  MapPin,
  PenTool,
  Rocket,
  Briefcase,
  DollarSign,
  Lightbulb,
  Star
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { TestimonialsSection } from "@/components/testimonials-section"
import ScrollAnimation from "@/components/scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ctaLink = "#inscricao" // Alterar para o link real quando disponível

export default function MetodoTFPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: "+1,5 milhões", label: "de alunos" },
    { number: "1280", label: "técnicas exclusivas" },
    { number: "5", label: "livros publicados" },
    { number: "+500", label: "vídeos inspiradores" },
  ]

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Transformação financeira genuína",
      description: "Conquiste a liberdade financeira que sempre almejou, redefinindo sua relação com o dinheiro e construindo um futuro de abundância."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Estratégias comprovadas e eficazes",
      description: "Aprenda técnicas que transcendem a teoria, com aplicação prática e resultados tangíveis, sem promessas vazias ou atalhos ilusórios."
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Networking de alto valor",
      description: "Conecte-se com uma comunidade exclusiva de profissionais visionários, construindo uma rede de contatos que impulsionará seu crescimento."
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "Suporte contínuo e personalizado",
      description: "Receba orientação e acompanhamento mesmo após a conclusão do treinamento, garantindo que sua jornada seja contínua e bem-sucedida."
    }
  ]

  const targetAudience = [
    {
      title: "Empreendedores",
      description: "que buscam escalar seus negócios, otimizar lucros e consolidar sua posição no mercado.",
      icon: <Rocket className="h-12 w-12" />
    },
    {
      title: "Profissionais liberais",
      description: "que almejam independência financeira, expansão de sua carteira de clientes e reconhecimento.",
      icon: <Briefcase className="h-12 w-12" />
    },
    {
      title: "Pessoas com renda +R$ 5 mil",
      description: "que desejam exponencializar seu potencial de ganhos e alcançar novos patamares.",
      icon: <DollarSign className="h-12 w-12" />
    },
    {
      title: "Futuros mentores",
      description: "que buscam atuar como coach e educador para transformar vidas através da educação financeira.",
      icon: <Target className="h-12 w-12" />
    },
    {
      title: "Visionários",
      description: "que compreendem a importância da inteligência financeira como diferencial competitivo.",
      icon: <Lightbulb className="h-12 w-12" />
    },
    {
      title: "Pessoas ambiciosas",
      description: "que buscam prosperar em todas as áreas da vida.",
      icon: <Star className="h-12 w-12" />
    }
  ]

  const courseContent = [
    {
      title: "Introdução ao desbloqueio da riqueza",
      description: "Compreenda os fundamentos para uma vida financeira abundante."
    },
    {
      title: "Superação de bloqueios financeiros",
      description: "Ferramentas e técnicas para acabar com as barreiras que o impedem de prosperar."
    },
    {
      title: "Estratégias para aumentar sua renda",
      description: "Métodos acionáveis para expandir seus ganhos de forma consistente."
    },
    {
      title: "Planejamento financeiro inteligente",
      description: "Domine a arte de gerenciar suas finanças e fazer seu dinheiro trabalhar para você."
    },
    {
      title: "Criação de um plano de ação personalizado",
      description: "Um guia sob medida para aplicar o conhecimento adquirido e alcançar seus objetivos."
    }
  ]

  const faqs = [
    {
      question: "E se eu não conseguir aplicar as estratégias?",
      answer: "Nosso treinamento é meticulosamente desenhado para ser prático e acessível. Você será guiado passo a passo, com suporte contínuo para garantir que cada estratégia seja implementada com sucesso."
    },
    {
      question: "Preciso ter algum conhecimento prévio?",
      answer: "Não. O Método TF é acessível a todos, independentemente do seu nível de conhecimento financeiro. Nosso objetivo é democratizar o acesso à prosperidade."
    },
    {
      question: "Quanto tempo dura o treinamento?",
      answer: "O treinamento intensivo tem a duração de 1 dia, focado em imersão e resultados."
    },
    {
      question: "Onde será realizado o treinamento?",
      answer: "O treinamento será realizado em Alphaville-SP, em um ambiente projetado para otimizar seu aprendizado e networking."
    },
    {
      question: "O que eu preciso levar para o treinamento?",
      answer: "Basta trazer um caderno e uma caneta para anotações. Todo o material didático necessário será fornecido para você."
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader showInicio={true} />

      {/* [Bloco 1] Hero Section */}
      <section className="relative min-h-[700px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center">
          <ScrollAnimation animation="fadeInUp" className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              <span className="text-sm font-medium">MÉTODO TF</span>
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Desbloqueie a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                riqueza
              </span>{" "}
              em sua vida
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              Dê um passo decisivo em direção a um futuro próspero e blindado contra as incertezas financeiras.
            </p>

            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                QUERO TRANSFORMAR MINHA VIDA!
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 2] Stats Section */}
      <section className="py-20 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-zinc-400">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 3] O Bloqueio Invisível */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  O bloqueio{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    invisível
                  </span>{" "}
                  da riqueza
                </h2>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    Você se sente preso em um ciclo financeiro, apesar de todo o esforço? A verdadeira barreira não é a falta de trabalho, mas um &quot;bloqueio invisível&quot; que impede sua prosperidade. Isso gera frustração, ansiedade e a sensação de estar estagnado.
                  </p>
                  <p>
                    O Método TF foi criado para acabar com essa barreira. Através do programa, você alcançará confiança e segurança para tomar decisões financeiras assertivas e desbloqueará seu verdadeiro potencial.
                  </p>
                  <p className="font-semibold text-yellow-400">
                    Permita-nos ser o seu guia nessa jornada para a abundância.
                  </p>
                </div>
                <div className="mt-8 text-center">
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4"
                    asChild
                  >
                    <a href={ctaLink}>
                      QUERO TRANSFORMAR MINHA VIDA!
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 4] Para Quem é Indicado */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              PÚBLICO-ALVO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para quem é indicado o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                treinamento?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetAudience.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="bg-yellow-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-yellow-400">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                    <p className="text-zinc-300">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 5] Benefícios */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              BENEFÍCIOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefícios{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                inestimáveis
              </span>{" "}
              do Método TF
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              No Método TF, você não apenas adquire conhecimento, mas vivencia uma transformação profunda que reverberará em todas as esferas de sua vida:
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 100}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-yellow-500/10 rounded-full p-3 text-yellow-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-zinc-300">{benefit.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 6] Conteúdo do Curso */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO PROGRAMÁTICO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conteúdo estratégico para sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                máxima transformação
              </span>
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            {courseContent.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 50}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 7] Sobre Roberto Navarro */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-[400px] md:h-auto">
                    <Image
                      src="/images/ROBERTO_1.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                      MENTOR
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">
                      Aprenda com o{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                        mentor dos mentores
                      </span>
                    </h2>
                    <p className="text-zinc-300 mb-6">
                      O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">Roberto Navarro</h3>
                    <div className="space-y-4 text-zinc-300">
                      <p>
                        Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.
                      </p>
                      <p>
                        Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.
                      </p>
                      <p>
                        Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.
                      </p>
                    </div>
                    <Button
                      className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-3"
                      asChild
                    >
                      <a href={ctaLink}>
                        QUERO TRANSFORMAR MINHA VIDA!
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 8] Diferenciais */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que torna nosso programa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                incomparável?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Nosso treinamento se distingue por uma série de elementos que garantem uma experiência de aprendizado superior e resultados duradouros:
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation animation="fadeInUp">
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Método exclusivo e comprovado</h3>
                  <p className="text-zinc-400">Uma abordagem única, com estratégias práticas e testadas para desvendar o caminho da riqueza.</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={100}>
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Aulas presenciais</h3>
                  <p className="text-zinc-400">Interação direta e imersiva com instrutores experientes, em um ambiente propício ao aprendizado.</p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Material de apoio abrangente</h3>
                  <p className="text-zinc-400">Apostilas detalhadas, exercícios práticos e acesso a conteúdo exclusivo para solidificar seu conhecimento.</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* [Bloco 9] Garantia */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="zoomIn">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/50 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Satisfação garantida ou seu{" "}
                  <span className="text-yellow-400">dinheiro de volta!</span>
                </h2>
                <div className="space-y-4 text-lg">
                  <p>
                    Ao se inscrever no Método TF, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!
                  </p>
                  <p className="font-semibold text-yellow-400">
                    Isso mesmo: se em até 6 meses você sentir que não teve nenhum avanço, nós devolvemos duas vezes o valor pago, sem letras miúdas.
                  </p>
                  <p>
                    Essa não é só uma garantia. É a nossa forma de mostrar que acreditamos profundamente no que fazemos – e no seu potencial de mudança.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 10] CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sua jornada rumo à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                liberdade financeira
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              Imagine um mundo onde você detém as rédeas do seu destino, com a liberdade de perseguir suas paixões e viver a vida em seus próprios termos, sem a sombra da escassez. O Método TF não é apenas um programa; é um portal para essa realidade.
            </p>
            <p className="text-lg font-semibold text-yellow-400 mb-8">
              Não permita que a hesitação o prive da decisão que pode redefinir sua existência.
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                QUERO TRANSFORMAR MINHA VIDA FINANCEIRA!
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 11] FAQ */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                Frequentes
              </span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn">
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
                  <AccordionTrigger className="text-left hover:text-yellow-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton source="Método TF" />
    </div>
  )
}