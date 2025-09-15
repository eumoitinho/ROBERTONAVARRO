"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  X,
  Users,
  Award,
  BookOpen,
  DollarSign,
  TrendingUp,
  Star,
  Target,
  Briefcase,
  Phone,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Zap,
  BarChart,
  Building,
  UserPlus,
  Users2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WhatsAppButton from "@/components/whatsapp-button"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import { submitLead } from "@/lib/actions"
import { getUTMParameters, getBrowserInfo } from "@/lib/utils"
import QuemSomosSection from "@/components/mentor"

interface CartItem {
  id: string;
  title: string;
  bonus: string;
  price: number;
  originalPrice: number;
}

export default function SemanaDaIndependenciaPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartStep, setCartStep] = useState<'products' | 'checkout' | 'confirmation'>('products')
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  })

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

  const addToCart = (promotion: any) => {
    const cartItem: CartItem = {
      id: promotion.tag,
      title: promotion.title,
      bonus: promotion.bonus,
      price: promotion.price,
      originalPrice: promotion.originalPrice
    }
    
    const existingItem = cartItems.find(item => item.id === cartItem.id)
    if (!existingItem) {
      setCartItems([...cartItems, cartItem])
      setCartOpen(true)
      setCartStep('products')
    } else {
      setCartOpen(true)
      setCartStep('products')
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Por favor, adicione produtos ao carrinho.")
      return
    }
    setCartStep('checkout')
  }

  const handleCustomerDataChange = (field: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  const getTotalOriginalPrice = () => {
    return cartItems.reduce((total, item) => total + item.originalPrice, 0)
  }

  const getTotalSavings = () => {
    return getTotalOriginalPrice() - getTotalPrice()
  }

  const handleWhatsAppPurchase = async () => {
    if (!customerData.name.trim()) {
      alert("Por favor, preencha seu nome.")
      return
    }

    const productsText = cartItems.map(item => 
      `• ${item.title} + ${item.bonus} - R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    ).join('\n')

    const totalValue = getTotalPrice()
    const savings = getTotalSavings()

    // Enviar lead para o Kommo
    try {
      const utmParams = getUTMParameters()
      const browserInfo = getBrowserInfo()
      
      const leadData = {
        name: customerData.name,
        email: customerData.email || '',
        phone: customerData.phone || '',
        source: `LP Independência - Carrinho: ${cartItems.map(item => item.title).join(', ')}`,
        ...utmParams,
        ...browserInfo
      }
      
      await submitLead(leadData)
      console.log('Lead enviado para o Kommo com sucesso')
    } catch (error) {
      console.error('Erro ao enviar lead para o Kommo:', error)
      // Continua mesmo se houver erro no Kommo
    }

    const message = `Olá! Quero comprar os produtos da campanha Independência Financeira:

Nome: ${customerData.name}
Email: ${customerData.email || 'Não informado'}
Telefone: ${customerData.phone || 'Não informado'}

PRODUTOS SELECIONADOS:
${productsText}

TOTAL: R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
ECONOMIA: R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

Quero finalizar a compra!`

    const whatsappUrl = `https://wa.me/5512997659057?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Reset cart after purchase
    setCartItems([])
    setCustomerData({ name: '', email: '', phone: '' })
    setCartStep('confirmation')
  }

  const promotions = [
    {
      title: "EDUCADOR FINANCEIRO",
      bonus: "MAKE MONEY (GRATIS)",
      description: "Seja reconhecido como profissional licenciado e transforme vidas através da educação financeira. Com certificação do MEC, a formação de Educador Financeiro te possibilita construir uma carreira sólida e rentável, realizando consultorias, palestras e treinamentos pagos. Além disso, você recebe sem custo adicional o curso Make Money, um método direto e comprovado para acelerar seus ganhos e transformar sua vida financeira em poucos meses.",
      color: "from-yellow-500 to-amber-600",
      tag: "educador",
      price: 2497,
      originalPrice: 4994
    },
    {
      title: "LCF MENTORING",
      bonus: "EDUCADOR FINANCEIRO (GRATIS)",
      description: "O Life Coaching Financeiro Mentoring (LCF) é uma imersão única de 7 dias, onde você mergulha em técnicas de PNL, inteligência emocional, produtividade e coaching financeiro para transformar sua vida em todos os aspectos. Além do curso, você recebe gratuitamente a formação Educador Financeiro, que lhe permite atuar como mentor e expandir suas competências sobre finanças e desenvolvimento humano.",
      color: "from-yellow-500 to-amber-600",
      tag: "lcf",
      price: 6997,
      originalPrice: 13994
    },
    {
      title: "EMPREENDEDOR INTELIGENTE",
      bonus: "MENTORIA DE INVESTIMENTOS (GRATIS)",
      description: "O Empreendedor Inteligente é um programa de 3 dias para empresários e empreendedores que estão cansados de viver apagando incêndios e buscam meios de escalar o faturamento, atrair investidores e otimizar processos. Como bônus, você leva a Mentoria de Investimentos, formação que revela as estratégias práticas de quem realmente investe com segurança e resultado.",
      color: "from-yellow-500 to-amber-600",
      tag: "empreendedor",
      price: 6997,
      originalPrice: 13994
    },
    {
      title: "MENTORIA DE INVESTIMENTOS",
      bonus: "EDUCADOR FINANCEIRO (GRATIS)",
      description: "Na Mentoria de Investimentos, você vai descobrir os meios mais seguros de como multiplicar seu patrimônio. O programa te mostra como estruturar um plano de investimentos adaptado ao seu perfil e aos seus objetivos. De presente, você leva a formação Educador Financeiro e descobre como ampliar suas oportunidades profissionais e como desenvolver habilidades pedagógicas e de comunicação.",
      color: "from-yellow-500 to-amber-600",
      tag: "investimentos",
      price: 4997,
      originalPrice: 9994
    },
    {
      title: "LCF PRO",
      bonus: "MENTORIA DE SUA ESCOLHA (GRATIS)",
      description: "O LCF PRO é o programa mais completo de transformação financeira e pessoal do Brasil. É um mergulho profundo em mentalidade, negócios e finanças, que vai levar você de onde está hoje até a vida que realmente merece viver, com clareza de propósito, liberdade e patrimônio sólido. Como bônus, você pode escolher uma outra mentoria para tornar sua formação ainda mais completa e personalizada.",
      color: "from-yellow-500 to-amber-600",
      tag: "lcf-pro",
      price: 16000,
      originalPrice: 32000
    },
    {
      title: "2 MENTORIAS",
      bonus: "3ª MENTORIA DE SUA ESCOLHA (GRATIS)",
      description: "Quer acelerar sua evolução em todas as áreas? Ao adquirir duas mentorias, você ganha a terceira sem custo adicional. Isso significa que você pode economizar e construir uma trilha de conhecimento que une carreira, negócios e investimentos. É a oportunidade perfeita para quem deseja abrir várias frentes de crescimento, com a segurança de estar aprendendo diretamente com um dos maiores especialistas em finanças do Brasil.",
      color: "from-yellow-500 to-amber-600",
      tag: "duas-mentorias",
      price: 18000,
      originalPrice: 36000
    }
  ]

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Oportunidade", href: "#oportunidade" },
    { title: "Produtos", href: "#produtos" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Contato", href: "#contato", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
        cartItems={cartItems}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Carrinho Lateral */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900/95 backdrop-blur-lg border-l border-zinc-800/50 shadow-2xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-white">
                    {cartStep === 'products' && 'Carrinho de Compras'}
                    {cartStep === 'checkout' && 'Dados para Finalizar'}
                    {cartStep === 'confirmation' && 'Pedido Enviado'}
                  </h2>
                  {cartStep === 'checkout' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCartStep('products')}
                      className="text-zinc-400 hover:text-yellow-400"
                    >
                      ← Voltar
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCartOpen(false)
                    setCartStep('products')
                  }}
                  className="text-zinc-400 hover:text-yellow-400"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartStep === 'products' && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="text-center text-zinc-400 mt-8">
                        <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Seu carrinho está vazio</p>
                        <p className="text-sm mt-2">Adicione produtos para continuar</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <Card key={item.id} className="bg-zinc-800/50 border-zinc-700">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-zinc-300 mb-3">+ {item.bonus}</p>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-xs text-zinc-400 line-through">
                                    R$ {item.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </div>
                                  <div className="text-lg font-bold text-yellow-400">
                                    R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {cartStep === 'checkout' && (
                  <div className="space-y-6">
                    <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Resumo do Pedido</h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-zinc-300">{item.title}</span>
                            <span className="text-yellow-400">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        ))}
                        <div className="border-t border-zinc-700 pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span className="text-white">Total:</span>
                            <span className="text-yellow-400">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="checkout-name" className="text-zinc-300 mb-2 block">Nome Completo *</Label>
                        <Input
                          id="checkout-name"
                          type="text"
                          required
                          value={customerData.name}
                          onChange={(e) => handleCustomerDataChange('name', e.target.value)}
                          className="bg-zinc-800/50 border-zinc-600 text-white placeholder-zinc-400"
                          placeholder="Digite seu nome completo"
                        />
                      </div>

                      <div>
                        <Label htmlFor="checkout-email" className="text-zinc-300 mb-2 block">E-mail</Label>
                        <Input
                          id="checkout-email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => handleCustomerDataChange('email', e.target.value)}
                          className="bg-zinc-800/50 border-zinc-600 text-white placeholder-zinc-400"
                          placeholder="Digite seu e-mail"
                        />
                      </div>

                      <div>
                        <Label htmlFor="checkout-phone" className="text-zinc-300 mb-2 block">Telefone/WhatsApp</Label>
                        <Input
                          id="checkout-phone"
                          type="tel"
                          value={customerData.phone}
                          onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
                          className="bg-zinc-800/50 border-zinc-600 text-white placeholder-zinc-400"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {cartStep === 'confirmation' && (
                  <div className="text-center text-zinc-300 mt-8">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold text-white mb-4">Pedido Enviado!</h3>
                    <p className="mb-4">Seu pedido foi enviado via WhatsApp.</p>
                    <p className="text-sm text-zinc-400">Em breve entraremos em contato para confirmar sua compra.</p>
                    <Button
                      onClick={() => {
                        setCartOpen(false)
                        setCartStep('products')
                      }}
                      className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-6 py-3"
                    >
                      Continuar Navegando
                    </Button>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && cartStep === 'products' && (
                <div className="border-t border-zinc-700/50 p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-zinc-300">
                      <span>Subtotal:</span>
                      <span>R$ {getTotalOriginalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Desconto:</span>
                      <span>-R$ {getTotalSavings().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-yellow-400 border-t border-zinc-600 pt-3">
                      <span>Total:</span>
                      <span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <Button
                    onClick={proceedToCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-full py-4 text-lg shadow-xl"
                  >
                    FINALIZAR COMPRA
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-zinc-400 text-center mt-3">
                    Preencha seus dados para finalizar a compra
                  </p>
                </div>
              )}

              {cartStep === 'checkout' && (
                <div className="border-t border-zinc-700/50 p-6">
                  <Button
                    onClick={handleWhatsAppPurchase}
                    disabled={!customerData.name.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full py-4 text-lg shadow-xl"
                  >
                    ENVIAR PEDIDO VIA WHATSAPP
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-zinc-400 text-center mt-3">
                    Você será redirecionado para o WhatsApp para confirmar a compra
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[900px] pt-32 pb-20 overflow-hidden flex flex-col justify-between">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/Prancheta 1.png"
            alt="Independência Financeira"
            fill
            className="object-cover w-full h-full"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-60% to-transparent"></div>
          {/* Overlay verde de iluminação */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6 self-start mt-2">
            <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
            <span className="text-xs md:text-sm font-medium">CAMPANHA ESPECIAL - MÊS DA INDEPENDÊNCIA</span>
          </div>

          {/* Central content */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-2 leading-tight">
                DECLARE HOJE SUA{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500">
                  INDEPENDÊNCIA FINANCEIRA
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-semibold mb-4 text-zinc-300">
                Invista em uma formação com Roberto Navarro e ganhe outra totalmente grátis!
              </p>
              <p className="text-base md:text-xl text-zinc-300 mb-6 max-w-xl">
                Conquiste a liberdade de construir o futuro que você sempre quis. Invista em você e dobre suas chances de evoluir e prosperar!
              </p>
            </div>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-0 md:mb-0 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <Button
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                asChild
              >
                <Link href="#produtos">VER OFERTAS ESPECIAIS</Link>
              </Button>
              <Button
                asChild
                className="cta-hover-subtle bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              >
                <Link href="#contato">
                  Falar com especialista <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom stats/indicators */}
          <div className={`flex items-center gap-6 mt-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-zinc-400">
              <span className="text-white font-medium">+1,5 milhões</span> de vidas transformadas
            </p>
          </div>
        </div>
      </section>

      {/* Faixa de Destaque */}
      <section className="py-6 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              OPORTUNIDADE LIMITADA!
            </h2>
            <p className="text-lg text-green-100">
              Promoção válida até 30 de setembro
            </p>
          </div>
        </div>
      </section>

      {/* O que impede Section */}
      <section id="oportunidade" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O QUE IMPEDE SEU <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">GRITO DE INDEPENDÊNCIA?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Negócio estagnado?",
                desc: "Ensinamos estratégias práticas para escalar seu faturamento e transformar sua empresa em uma verdadeira máquina de crescimento.",
              },
              {
                title: "Medo de investir?",
                desc: "Mostramos o caminho seguro para investir com confiança, desmistificando o mercado financeiro e revelando como multiplicar seu patrimônio.",
              },
              {
                title: "Mentalidade limitante?",
                desc: "Ajudamos você a reprogramar crenças limitantes sobre dinheiro e sucesso, destravando seu verdadeiro potencial de riqueza.",
              },
              {
                title: "Futuro incerto?",
                desc: "Estruturamos um plano concreto para você construir sua independência financeira e garantir um legado próspero para si e sua família.",
              },
            ].map((challenge, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{challenge.title}</h3>
                <p className="text-zinc-300">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independência ou Sorte */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">OPORTUNIDADE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">INDEPENDÊNCIA OU SORTE?</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto mb-6">
              Não dependa do acaso para alcançar o sucesso! Conquistar a liberdade financeira não é uma simples questão de sorte. Exige estratégia, conhecimento e preparo.
            </p>
            <p className="text-zinc-300 max-w-3xl mx-auto mb-8">
              Para comemorar a Mês da Independência, o Instituto Coaching Financeiro (ICF) lançou uma campanha especial para você dar o próximo passo rumo ao sucesso:
            </p>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="h-6 w-6 text-yellow-400" />
                <p className="text-lg text-zinc-200">Na compra de uma formação, você ganha a segunda totalmente grátis.</p>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="h-6 w-6 text-yellow-400" />
                <p className="text-lg text-zinc-200">Na compra de duas formações, a terceira também fica por nossa conta.</p>
              </div>
            </div>

            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#produtos">
                VER PRODUTOS EM OFERTA <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nossos Números */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">RESULTADOS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NOSSOS NÚMEROS</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Users className="h-8 w-8 text-yellow-400" />,
                number: "+1,5 milhões",
                label: "de alunos"
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                number: "+1280",
                label: "técnicas exclusivas"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-yellow-400" />,
                number: "+5",
                label: "livros publicados"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 text-center"
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">{item.number}</div>
                <p className="text-zinc-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">OFERTAS EXCLUSIVAS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">OPORTUNIDADES DISPONÍVEIS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Confira todas as combinações disponíveis e escolha aquela que mais conecta com sua realidade atual.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">{promo.title}</h3>
                  <div className="text-xl font-bold text-zinc-300 mb-4">+</div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-3 mb-6">
                    <p className="text-lg font-bold text-yellow-300">{promo.bonus}</p>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {promo.description}
                </p>

                <div className="mb-6">
                  <div className="text-center">
                    <div className="text-lg text-zinc-400 line-through mb-1">
                      De R$ {promo.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      Por R$ {promo.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-green-400 font-semibold">
                      Economia de R$ {(promo.originalPrice - promo.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${promo.color} hover:opacity-90 text-black font-bold rounded-full py-6 text-lg shadow-xl transition-all duration-300 mb-3`}
                  onClick={() => addToCart(promo)}
                >
                  ADICIONAR AO CARRINHO
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SUA VIDA FINANCEIRA COM MAIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ORDEM E PROGRESSO</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-6 w-6 text-yellow-400" />,
                title: "Metodologia validada",
                desc: "Aprenda com quem já impactou mais de 1 milhão de pessoas e criou o conceito de Coach Financeiro no Brasil."
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-yellow-400" />,
                title: "Conhecimento em dobro",
                desc: "Invista em uma formação de alto nível e duplique suas oportunidades de crescimento, ganhando outro curso totalmente grátis."
              },
              {
                icon: <BookOpen className="h-6 w-6 text-yellow-400" />,
                title: "Licença profissional",
                desc: "Torne-se um educador financeiro com certificação reconhecida pelo MEC e chancela do Instituto Coaching Financeiro (ICF)."
              },
              {
                icon: <Target className="h-6 w-6 text-yellow-400" />,
                title: "Resultados rápidos",
                desc: "Descubra estratégias rápidas de aplicar seu dinheiro e gere transformações concretas em sua vida dentro de poucos dias."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <QuemSomosSection />

      {/* Testemunhos */}
      <TestimonialsSection />

      {/* Newsletter/Contato */}
      <NewsletterFormacoes 
        onSubmit={() => {}}
        title="PROCLAME SUA INDEPENDÊNCIA FINANCEIRA AGORA!"
        description="Preencha o formulário abaixo e um de nossos consultores entrará em contato para entender seu momento e te guiar para a melhor oferta da campanha Independência Financeira. As vagas com bônus em dobro são limitadas!"
        source="LP - Independência Financeira"
        ctaText="FALAR COM UM ESPECIALISTA!"
      />

      <Footer />
      {!cartOpen && <WhatsAppButton source="LP - Independência Financeira" />}
    </div>
  )
}