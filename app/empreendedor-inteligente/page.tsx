"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Zap,
  DollarSign,
  BarChart,
  Building,
  TrendingUp,
  UserPlus,
  Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import CountdownTimer from "@/components/countdown-timer"

export default function EmpreendedorInteligentePage() {
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="#sobre" className="text-sm hover:text-yellow-400 transition-colors">
              Sobre
            </Link>
            <Link href="#o-que-aprender" className="text-sm hover:text-yellow-400 transition-colors">
              O Que Aprender
            </Link>
            <Link href="#mentor" className="text-sm hover:text-yellow-400 transition-colors">
              Mentor
            </Link>
            <Link href="#inscricao" className="text-sm hover:text-yellow-400 transition-colors">
              Inscrição
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#contato">Contato</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#inscricao">Inscreva-se</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "#sobre", label: "Sobre" },
                { href: "#o-que-aprender", label: "O Que Aprender" },
                { href: "#mentor", label: "Mentor" },
                { href: "#inscricao", label: "Inscrição" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* // Hero Section */}
<section className="relative pt-32 pb-20 overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
        <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
        <span className="text-sm font-medium">Formação exclusiva para empresários</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
          EMPREENDEDOR INTELIGENTE
        </span>
      </h1>
      <p className="text-xl text-zinc-300 mb-4 max-w-xl">Empreender com lucro, leveza e liberdade é possível</p>
      <p className="text-lg text-zinc-300 mb-8 max-w-xl">
        Formação exclusiva para empresários que querem escalar resultados, atrair investidores, otimizar a gestão e parar de apagar incêndios na própria empresa.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base">
          <Link href="#inscricao">GARANTA SUA VAGA!</Link>
        </Button>
        <Button asChild className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base">
          <Link href="#sobre">Saiba mais <ChevronRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>
      {/* Retain existing testimonial stats */}
    </div>
  </div>
</section>

{/* //Challenges Section */}
<section id="sobre" className="py-20 relative">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">DESAFIOS</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        POR QUE SUA EMPRESA <span className="text-yellow-400">NÃO DECOLA?</span>
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        A diferença entre empresários que prosperam e os que lutam para sobreviver está no conhecimento certo e no acesso às pessoas certas.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { title: "Você fatura, mas não lucra?", desc: "Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários." },
        { title: "Quer crescer, mas está preso à operação?", desc: "Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados." },
        { title: "Dificuldade para contratar pessoas?", desc: "Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa." },
        { title: "Sente que ninguém entende seus desafios?", desc: "Participe de uma imersão com networking de alto nível e troque com empresários como você." },
      ].map((challenge, index) => (
        <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">{challenge.title}</h3>
          <p className="text-zinc-300">{challenge.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* // What You Will Learn Section */}
<section id="o-que-aprender" className="py-20 relative">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">CONTEÚDO</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        O QUE VOCÊ VAI APRENDER PARA <span className="text-yellow-400">DESTRAVAR O CRESCIMENTO</span> DA SUA EMPRESA
      </h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: <DollarSign className="h-6 w-6 text-yellow-400" />, title: "Crédito inteligente", desc: "Pare de ser refém de bancos e aprenda a acessar capital de giro sem taxas abusivas." },
        { icon: <BarChart className="h-6 w-6 text-yellow-400" />, title: "Contabilidade estratégica", desc: "Use a contabilidade como aliada do lucro e da tomada de decisão." },
        { icon: <Users className="h-6 w-6 text-yellow-400" />, title: "Sócios e investidores", desc: "Estruture sua empresa para atrair investimentos sem abrir mão do controle." },
        { icon: <UserPlus className="h-6 w-6 text-yellow-400" />, title: "Time comprometido", desc: "Monte um time que entrega resultado, mesmo quando você não está por perto." },
        { icon: <TrendingUp className="h-6 w-6 text-yellow-400" />, title: "Modelo de vendas lucrativo", desc: "Construa seu próprio sistema de vendas e pare de depender de fórmulas genéricas." },
        { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: "Marketing digital de verdade", desc: "Invista com inteligência e escale sua presença digital sem desperdiçar recursos." },
        { icon: <Building className="h-6 w-6 text-yellow-400" />, title: "Formação de caixa e capital de giro", desc: "Crie uma base financeira sólida para crescer com segurança e consistência." },
        { icon: <Users2 className="h-6 w-6 text-yellow-400" />, title: "Networking de alto nível", desc: "Conecte-se com empresários que podem abrir portas e transformar seu negócio." },
      ].map((item, index) => (
        <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">{item.icon}</div>
          <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
          <p className="text-zinc-300">{item.desc}</p>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
        <Link href="#inscricao">GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </div>
  </div>
</section>

{/* // Mentor Section */}
<section id="mentor" className="py-20 relative">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">SEU MENTOR</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        CONHEÇA SEU <span className="text-yellow-400">MENTOR</span>
      </h2>
    </div>
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
          <Image src="/images/roberto.webp" alt="Roberto Navarro" width={500} height={500} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-6 text-yellow-400">Roberto Navarro</h3>
        <div className="space-y-4 text-zinc-300">
          <p>De lavador de vidros aos 13 anos a referência nacional em inteligência financeira. Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo - até que decidiu mudar sua realidade e a da sua família.</p>
          <p>Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.</p>
          <p>Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.</p>
        </div>
        <Button asChild className="cta-hover mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
          <Link href="#inscricao">GARANTA SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </div>
</section>
{/* 
// Testimonials Section */}
<section className="py-20 relative">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">DEPOIMENTOS</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        JÁ PASSARAM POR NOSSOS <span className="text-yellow-400">TREINAMENTOS</span>
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        Conheça algumas das personalidades que já participaram dos treinamentos de Roberto Navarro.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { name: "Alfredo Soares", role: "Autoridade em vendas e autor best-seller", image: "/placeholder.svg?key=q2euh" },
        { name: "Tiago Brunet", role: "Referência em treinamento de líderes e espiritualidade", image: "/placeholder.svg?key=hc68w" },
        { name: "Flávio Prado", role: "Jornalista esportivo que já cobriu 10 Copas do Mundo e eventos em mais de 60 países", image: "/placeholder.svg?key=c0njc" },
        { name: "Pyong Lee", role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos", image: "/placeholder.svg?key=z958p" },
      ].map((testimonial, index) => (
        <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
            <Image src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center text-yellow-400">{testimonial.name}</h3>
          <p className="text-zinc-300 text-center">{testimonial.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* 
// Registration Section */}
<section id="inscricao" className="py-20 relative">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">INSCRIÇÃO</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        SAIA DO MODO <span className="text-yellow-400">SOBREVIVÊNCIA</span>
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        Preencha seus dados abaixo e entre para um grupo seleto de empresários prontos para escalar resultados com inteligência e estratégia.
      </p>
    </div>
    <div className="max-w-3xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
      <form className="space-y-6">
        {/* Retain existing form fields */}
        <Button className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg">
          GARANTA SUA VAGA!
        </Button>
        <p className="text-xs text-zinc-400 text-center">
          Ao enviar este formulário, você concorda com nossa política de privacidade e termos de uso.
        </p>
      </form>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              DÚVIDAS <span className="text-yellow-400">COMUNS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Quem pode participar do programa Empreendedor Inteligente?",
                  answer:
                    "O programa é destinado a empresários e empreendedores que desejam escalar seus negócios, melhorar a gestão e aumentar a lucratividade. Não importa o tamanho da sua empresa ou o setor em que atua, o conteúdo é adaptável a diferentes realidades empresariais.",
                },
                {
                  question: "Qual a duração do programa?",
                  answer:
                    "O programa tem duração de 3 meses, com encontros semanais online e um encontro presencial mensal (opcional).",
                },
                {
                  question: "Preciso ter conhecimentos prévios em gestão ou finanças?",
                  answer:
                    "Não é necessário. O programa foi desenvolvido para ser acessível a empresários com diferentes níveis de conhecimento. Partimos do básico e avançamos gradualmente para conceitos mais complexos.",
                },
                {
                  question: "Como são realizados os encontros?",
                  answer:
                    "Os encontros semanais são realizados online, através de plataforma de videoconferência. Os encontros presenciais mensais são realizados em São Paulo, mas a participação é opcional.",
                },
                {
                  question: "Existe garantia de resultados?",
                  answer:
                    "Oferecemos garantia de satisfação de 30 dias. Se você não estiver satisfeito com o conteúdo e a metodologia, devolvemos 100% do seu investimento. No entanto, os resultados dependem da implementação das estratégias aprendidas.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{faq.question}</h3>
                  <p className="text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="h-10 w-auto mb-4 md:mb-0" />
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
