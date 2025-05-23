"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionBadge } from "@/components/section-badge"
import { Brain, DollarSign, Heart, TrendingUp, CheckCircle, Target, Lightbulb, Users } from "lucide-react"

interface ContentItem {
  title: string
  description: string
  icon?: string
  benefits: string[]
}

interface ContentSectionProps {
  items: ContentItem[]
}

const getIcon = (title: string) => {
  if (title.toLowerCase().includes("emocional")) return Brain
  if (title.toLowerCase().includes("financeira")) return DollarSign
  if (title.toLowerCase().includes("espiritual")) return Heart
  if (title.toLowerCase().includes("empresarial")) return TrendingUp
  return Lightbulb
}

export function ContentSection({ items }: ContentSectionProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="o-que-aprender" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <SectionBadge text="CONTEÚDO EXCLUSIVO" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            DESENVOLVA AS <span className="text-yellow-400">4 INTELIGÊNCIAS</span> DA PROSPERIDADE
          </h2>
          <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
            Uma metodologia completa que integra mente, emoções, propósito e estratégia para sua transformação
            financeira
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {items.map((item, index) => {
            const IconComponent = getIcon(item.title)
            return (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "outline"}
                onClick={() => setActiveTab(index)}
                className={`
                  px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2
                  ${
                    activeTab === index
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-lg"
                      : "border-zinc-700 text-zinc-300 hover:border-yellow-400/50 hover:text-yellow-400"
                  }
                `}
              >
                <IconComponent className="h-4 w-4" />
                {item.title}
              </Button>
            )
          })}
        </div>

        {/* Content Display */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-zinc-900/40 backdrop-blur-lg border-zinc-700/30 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Description */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    {(() => {
                      const IconComponent = getIcon(items[activeTab].title)
                      return (
                        <div className="bg-yellow-400/20 rounded-full p-4">
                          <IconComponent className="h-8 w-8 text-yellow-400" />
                        </div>
                      )
                    })()}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">{items[activeTab].title}</h3>
                      <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
                        Módulo {activeTab + 1}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">{items[activeTab].description}</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-full px-8 py-3"
                  >
                    <a href="#form">QUERO APRENDER ISSO!</a>
                  </Button>
                </div>

                {/* Right Side - Benefits */}
                <div className="bg-zinc-800/30 p-8 md:p-12 border-l border-zinc-700/30">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="h-5 w-5 text-yellow-400" />O que você vai dominar:
                  </h4>
                  <div className="space-y-4">
                    {items[activeTab].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Visual Element */}
                  <div className="mt-8 p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                    <div className="flex items-center gap-2 text-yellow-400 font-medium">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Mais de 130 mil pessoas já transformaram suas vidas</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: "10h", label: "de conteúdo intensivo" },
            { number: "4", label: "inteligências desenvolvidas" },
            { number: "100%", label: "metodologia prática" },
            { number: "1", label: "dia que muda sua vida" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-zinc-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
