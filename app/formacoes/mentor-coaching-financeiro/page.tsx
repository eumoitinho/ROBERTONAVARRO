"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle, 
  Brain,
  Target,
  Shield,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Building,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Lock,
  BarChart3,
  Heart,
  RefreshCw,
  Zap
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { TestimonialsSection } from "@/components/testimonials-section"
import ScrollAnimation from "@/components/scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ctaLink = "#inscricao" // Alterar para o link real quando disponível

export default function MentorCoachingFinanceiroPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const symptoms = [
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "O paradoxo da escolha financeira",
      description: "Com tantas opções de investimento e estratégias, você fica paralisado, adiando decisões importantes ou tomando decisões baseadas em emoção, não em inteligência."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "A prisão do padrão de vida",
      description: "Você se tornou refém de um estilo de vida que consome praticamente toda sua renda, deixando pouco espaço para construção real de patrimônio."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "O medo do próximo nível",
      description: "Subconscientemente, você sabota suas próprias oportunidades de crescimento financeiro porque não se sente 'merecedor' ou tem medo das responsabilidades."
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "A dependência da renda ativa",
      description: "Você está completamente dependente do seu trabalho para manter seu padrão de vida, sem verdadeira liberdade ou segurança financeira."
    }
  ]

  const learningModules = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Anamnese financeira profunda",
      description: "Faça uma análise cirúrgica de sua relação com o dinheiro, identificando crenças limitantes profundamente enraizadas que sabotam seu crescimento financeiro."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Inteligência financeira automática",
      description: "Desenvolva a capacidade de tomar decisões financeiras com a clareza de um investidor profissional e construa um senso financeiro aguçado que guiará suas decisões."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Ampliação de seu potencial financeiro",
      description: "Mude literalmente sua identidade financeira, permitindo que níveis superiores de riqueza se manifestem naturalmente em sua vida."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Potes da Riqueza",
      description: "Descubra como estruturar suas finanças para que o dinheiro trabalhe para você, criando múltiplas fontes de renda passiva e ativa."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blindagem contra o consumo desnecessário",
      description: "Aprenda a identificar e neutralizar os gatilhos psicológicos que levam ao consumo impulsivo e ao desperdício de recursos."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Estratégias de multiplicação de renda",
      description: "Descubra como aumentar sua capacidade de geração de renda, criando novas oportunidades de renda e expandindo suas possibilidades financeiras."
    }
  ]

  const targetAudience = [
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: "Empresários e empreendedores de sucesso",
      description: "Que já construíram negócios rentáveis, mas sentem que poderiam otimizar muito melhor seus recursos e criar riqueza real a partir dos resultados do negócio."
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Executivos e profissionais liberais",
      description: "Médicos, advogados, consultores, engenheiros e outros profissionais que querem transformar sua renda em patrimônio sólido e liberdade financeira."
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "Investidores e gestores de patrimônio",
      description: "Que já possuem conhecimento técnico sobre investimentos, mas querem desenvolver a mentalidade dos verdadeiros criadores de riqueza."
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Servidores públicos",
      description: "Que possuem estabilidade e renda consistente e querem maximizar seu potencial de construção de patrimônio."
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Profissionais de marketing e consultoria",
      description: "Que já dominam as técnicas de geração de renda online mas querem estruturar sua vida financeira como verdadeiros empresários."
    }
  ]

  const expectedResults = [
    {
      title: "Clareza total",
      description: "Você saberá exatamente onde quer chegar financeiramente e terá um plano claro para isso."
    },
    {
      title: "Inteligência financeira automática",
      description: "Suas decisões financeiras se tornarão naturalmente mais inteligentes e estratégicas."
    },
    {
      title: "Múltiplas fontes de renda",
      description: "Você desenvolverá a capacidade de identificar e criar novas oportunidades de renda."
    },
    {
      title: "Proteção contra crises",
      description: "Sua estrutura financeira será blindada contra oscilações econômicas e crises setoriais."
    },
    {
      title: "Legado familiar",
      description: "Você construirá não apenas riqueza para si, mas um patrimônio que beneficiará as próximas gerações."
    },
    {
      title: "Liberdade real",
      description: "Tenha mais opções e não dependa mais de uma única fonte de renda para manter seu padrão de vida."
    }
  ]

  const paths = [
    {
      number: "1",
      title: "Continue como está",
      description: "Mantenha os mesmos padrões, as mesmas limitações e os mesmos resultados. Daqui a 5 anos, você provavelmente estará na mesma situação financeira, apenas um pouco mais velho e com mais arrependimentos.",
      color: "text-red-500"
    },
    {
      number: "2",
      title: "Tente sozinho",
      description: "Continue tentando descobrir por conta própria, cometendo os mesmos erros que a maioria comete, desperdiçando anos valiosos em tentativa e erro.",
      color: "text-yellow-500"
    },
    {
      number: "3",
      title: "Acelere sua transformação",
      description: "Invista em uma metodologia comprovada, com a mentoria de quem já percorreu este caminho e comprovou que é possível transformar completamente sua vida financeira em meses.",
      color: "text-green-500"
    }
  ]

  const faqs = [
    {
      question: "Para quem é esta formação?",
      answer: "O Mentor Coaching Financeiro é desenvolvido para profissionais que já possuem uma renda considerável mas sentem que poderiam otimizar muito melhor seus recursos financeiros. É ideal para empresários, executivos, profissionais liberais, investidores e qualquer pessoa que queira quebrar barreiras internas para alcançar um novo patamar de riqueza."
    },
    {
      question: "O que eu vou aprender no treinamento?",
      answer: "Você aprenderá a identificar e modificar padrões inconscientes que limitam seu crescimento financeiro, desenvolverá inteligência financeira automatizada, criará múltiplas fontes de renda, construirá proteção contra o consumo desnecessário e estabelecerá um sistema pessoal de criação de riqueza."
    },
    {
      question: "O que acontece depois do treinamento?",
      answer: "Após concluir o treinamento, você terá acesso a uma comunidade exclusiva de ex-alunos, atualizações periódicas da metodologia e suporte contínuo para garantir que você mantenha e expanda os resultados conquistados."
    },
    {
      question: "Como este treinamento pode transformar minha vida e meu negócio?",
      answer: "O Mentor Coaching Financeiro trabalha na raiz das limitações financeiras - sua programação mental e emocional sobre dinheiro. Ao transformar esta base, você naturalmente toma melhores decisões, identifica mais oportunidades, constrói riqueza mais rapidamente e desenvolve uma relação saudável e próspera com o dinheiro."
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
              <span className="text-sm font-medium">MENTOR COACHING FINANCEIRO</span>
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Transformamos profissionais em verdadeiros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                geradores da riqueza
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              Aprenda a instalar a inteligência financeira na sua vida e aumentar sua renda, com estratégias comprovadas.
            </p>

            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                ESTOU PRONTO PARA MUDAR MINHA VIDA!
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 2] Seção Mentor */}
      <section className="py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollAnimation animation="fadeInLeft">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/roberto-palestra.jpeg"
                  alt="Roberto Navarro palestrando"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-lg font-semibold">
                    "A verdadeira riqueza começa na mente. Quando você muda sua mentalidade, você muda sua vida."
                  </p>
                  <p className="text-yellow-400 mt-2">- Roberto Navarro</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInRight">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                  TRANSFORME SUA VIDA
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  De profissional bem-sucedido a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    gerador de riqueza
                  </span>
                </h2>
                <p className="text-zinc-300 text-lg mb-6">
                  Você já conquistou muito, mas sente que pode ir além? O Mentor Coaching Financeiro foi criado para profissionais como você, que desejam quebrar o teto de vidro financeiro e alcançar um novo patamar de prosperidade.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-zinc-300">Metodologia comprovada com mais de 1,5 milhão de alunos transformados</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-zinc-300">Técnicas exclusivas de reprogramção mental para a riqueza</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-zinc-300">Acompanhamento personalizado para garantir seus resultados</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* [Bloco 3] A Armadilha Invisível */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A ARMADILHA INVISÍVEL DA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                MEDIOCRIDADE FINANCEIRA
              </span>
            </h2>
            <p className="text-xl text-zinc-300">Você reconhece alguns desses sintomas em sua vida?</p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {symptoms.map((symptom, index) => (
              <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-red-900/30 hover:border-red-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-red-500/10 rounded-full p-3 text-red-400">
                          {symptom.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-red-400">{symptom.title}</h3>
                        <p className="text-zinc-300 text-sm">{symptom.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeIn" className="text-center">
            <p className="text-xl font-semibold text-yellow-400">
              O que você descobrirá a seguir pode mudar completamente sua relação com o dinheiro.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 3] Sobre a Metodologia */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <ScrollAnimation animation="fadeInUp">
                  <Badge variant="outline" className="mb-6 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                    MENTOR COACHING FINANCEIRO
                  </Badge>
                </ScrollAnimation>
                <ScrollAnimation animation="fadeInUp" delay={100}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    A metodologia que vai{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                      reprogramar
                    </span>{" "}
                    sua relação com o dinheiro
                  </h2>
                </ScrollAnimation>
                <div className="space-y-4 text-zinc-300">
                  <ScrollAnimation animation="fadeInUp" delay={200}>
                    <p>
                      O Mentor Coaching Financeiro é resultado de mais de uma década de pesquisa e aplicação prática com milhares de alunos. É a síntese de tudo que Roberto Navarro descobriu sobre como pessoas realmente bem-sucedidas pensam, sentem e agem em relação ao dinheiro.
                    </p>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fadeInUp" delay={300}>
                    <p className="font-semibold text-yellow-400 text-lg">
                      Esta não é mais uma formação sobre &quot;como investir&quot; ou &quot;como controlar gastos&quot;.
                    </p>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fadeInUp" delay={400}>
                    <p>
                      Este é um processo de transformação profunda que ataca a raiz do problema: sua programação inconsciente sobre dinheiro, sucesso e merecimento.
                    </p>
                  </ScrollAnimation>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 4] O Que Você Aprenderá */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                APRENDERÁ?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {learningModules.map((module, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className="bg-yellow-500/10 rounded-full p-4 w-fit mb-4 mx-auto">
                      <div className="text-yellow-400">
                        {module.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">{module.title}</h3>
                    <p className="text-zinc-300 text-sm text-center">{module.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 5] Para Quem é o Treinamento */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              PÚBLICO-ALVO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PARA QUEM É O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                TREINAMENTO?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Este treinamento foi desenvolvido especificamente para:
            </p>
          </ScrollAnimation>

          <div className="space-y-6 max-w-5xl mx-auto">
            {targetAudience.map((audience, index) => (
              <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="bg-yellow-500/10 rounded-full p-4 text-yellow-400">
                          {audience.icon}
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2 text-yellow-400">{audience.title}</h3>
                        <p className="text-zinc-300">{audience.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 6] Sobre Roberto Navarro */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <ScrollAnimation animation="fadeInLeft" className="relative h-[400px] md:h-auto">
                    <Image
                      src="/images/ROBERTO_6.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </ScrollAnimation>
                  <div className="p-8 md:p-12">
                    <ScrollAnimation animation="fadeInUp">
                      <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                        MENTOR
                      </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={100}>
                      <h2 className="text-3xl font-bold mb-4">
                        APRENDA COM O{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                          MENTOR DOS MENTORES
                        </span>
                      </h2>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={200}>
                      <p className="text-zinc-300 mb-6">
                        O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
                      </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={300}>
                      <h3 className="text-2xl font-bold mb-4 text-yellow-400">Roberto Navarro</h3>
                    </ScrollAnimation>
                    <div className="space-y-4 text-zinc-300">
                      <ScrollAnimation animation="fadeInUp" delay={400}>
                        <p>
                          Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={500}>
                        <p>
                          Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={600}>
                        <p>
                          Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.
                        </p>
                      </ScrollAnimation>
                    </div>
                    <ScrollAnimation animation="fadeInUp" delay={700}>
                      <Button
                        className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-3"
                        asChild
                      >
                        <a href={ctaLink}>
                          ESTOU PRONTO PARA MUDAR MINHA VIDA!
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </ScrollAnimation>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 7] O Que Esperar */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              RESULTADOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE ESPERAR APÓS O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                TREINAMENTO?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {expectedResults.map((result, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                  <CheckCircle className="h-8 w-8 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                  <p className="text-zinc-300 text-sm">{result.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 8] Garantia */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="zoomIn">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/50 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  SATISFAÇÃO GARANTIDA OU SEU{" "}
                  <span className="text-yellow-400">DINHEIRO DE VOLTA</span>
                </h2>
                <h3 className="text-xl font-semibold mb-6 text-yellow-400">
                  6 meses para experimentar uma mudança real
                </h3>
                <div className="space-y-4 text-lg">
                  <p>
                    Ao se inscrever no Mentor Coaching Financeiro, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!
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

      {/* [Bloco 9] 3 Caminhos */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              3 CAMINHOS DIANTE DE VOCÊ!{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                A DECISÃO É SUA!
              </span>
            </h2>
          </ScrollAnimation>

          <div className="space-y-6 max-w-4xl mx-auto mb-12">
            {paths.map((path, index) => (
              <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 150}>
                <Card className={`bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-${path.color.replace('text-', '')}/50 transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl font-bold ${path.color}`}>
                        {path.number}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold mb-2 ${path.color}`}>
                          Caminho {path.number}: {path.title}
                        </h3>
                        <p className="text-zinc-300">{path.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeIn" className="text-center">
            <p className="text-xl font-semibold text-yellow-400 mb-8">
              Quanto vale ter a tranquilidade de saber que suas decisões financeiras estão alinhadas com seu potencial máximo?
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                ESTOU PRONTO PARA MUDAR MINHA VIDA!
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 10] FAQ */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                frequentes
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
      <WhatsAppButton source="Mentor Coaching Financeiro" />
    </div>
  )
}