"use client"

import { useState } from "react"
import { CheckCircle, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 animate-on-scroll fade-in tracking-tight">
          INVISTA EM{" "}
          <span className="text-highlight relative">
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 animate-pulse"></span>
            SEU FUTURO
          </span>
        </h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto animate-on-scroll fade-in delay-200 font-light">
          Escolha o plano que <em className="font-medium">melhor se adapta</em> às suas necessidades e comece sua
          jornada rumo à <strong className="text-yellow-400">liberdade financeira</strong> hoje mesmo.
        </p>

        <div className="flex justify-center mb-12 animate-on-scroll fade-in delay-300">
          <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full border border-zinc-700 flex">
            <button
              className={`py-2 px-6 rounded-full text-sm font-bold transition-all ${isMonthly ? "bg-yellow-400 text-black" : "text-white"}`}
              onClick={() => setIsMonthly(true)}
            >
              Mensal
            </button>
            <button
              className={`py-2 px-6 rounded-full text-sm font-bold transition-all ${!isMonthly ? "bg-yellow-400 text-black" : "text-white"}`}
              onClick={() => setIsMonthly(false)}
            >
              Anual{" "}
              <span className="text-xs font-normal bg-red-500 text-white px-2 py-0.5 rounded-full ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plano Básico */}
          <div className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
            <h3 className="text-2xl font-bold mb-2">Básico</h3>
            <p className="text-subtitle mb-6 font-light">Ideal para quem está começando</p>
            <div className="text-4xl font-extrabold mb-6">
              {isMonthly ? (
                <>
                  R$ 297<span className="text-lg font-normal text-gray-400">/mês</span>
                </>
              ) : (
                <>
                  R$ 2.850<span className="text-lg font-normal text-gray-400">/ano</span>
                </>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Acesso ao evento principal</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Material digital exclusivo</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Certificado de participação</p>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                <p className="text-gray-500">Mentorias individuais</p>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                <p className="text-gray-500">Grupo VIP de networking</p>
              </li>
            </ul>
            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4">SELECIONAR PLANO</Button>
          </div>

          {/* Plano Premium */}
          <div className="bg-black p-8 rounded-xl border-2 border-yellow-400 relative animate-on-scroll fade-in-up delay-200 hover-lift card-hover transform scale-105 z-10 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-bold py-1 px-4 rounded-full text-sm">
              MAIS POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-subtitle mb-6 font-light">Experiência completa de transformação</p>
            <div className="text-4xl font-extrabold mb-6">
              {isMonthly ? (
                <>
                  R$ 497<span className="text-lg font-normal text-gray-400">/mês</span>
                </>
              ) : (
                <>
                  R$ 4.770<span className="text-lg font-normal text-gray-400">/ano</span>
                </>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Acesso ao evento principal</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Material digital exclusivo</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Certificado de participação</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">2 mentorias individuais</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Grupo VIP de networking</p>
              </li>
            </ul>
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-4 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">QUERO ESTE PLANO</span>{" "}
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 inline" />
            </Button>
          </div>

          {/* Plano VIP */}
          <div className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
            <h3 className="text-2xl font-bold mb-2">VIP</h3>
            <p className="text-subtitle mb-6 font-light">Para quem busca resultados extraordinários</p>
            <div className="text-4xl font-extrabold mb-6">
              {isMonthly ? (
                <>
                  R$ 997<span className="text-lg font-normal text-gray-400">/mês</span>
                </>
              ) : (
                <>
                  R$ 9.570<span className="text-lg font-normal text-gray-400">/ano</span>
                </>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Acesso ao evento principal</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Material digital exclusivo</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Certificado de participação</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Mentorias ilimitadas por 6 meses</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="font-medium">Acesso vitalício a todos os conteúdos</p>
              </li>
            </ul>
            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4">SELECIONAR PLANO</Button>
          </div>
        </div>

        <div className="text-center mt-12 animate-on-scroll fade-in delay-500">
          <p className="text-sm text-gray-400 mb-2">Garantia incondicional de 7 dias ou seu dinheiro de volta</p>
          <p className="text-red-400 text-sm font-bold animate-pulse">
            ATENÇÃO: Preços promocionais válidos somente até o final desta semana!
          </p>
        </div>
      </div>
    </section>
  )
}
