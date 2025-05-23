"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "./section-badge";

interface NewsletterSignupProps {
  title: string;
  description: string;
}

export function NewsletterFormacoes({ title, description }: NewsletterSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o formulário. Tente novamente.");
      }

      setName("");
      setEmail("");
      setPhone("");
      alert("Inscrição realizada com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar o formulário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inscricao" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
      <SectionBadge text="INSCRIÇÃO" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {title.split(" ").map((word, index) => (
            <span
              key={index}
              className={index === 4 || index === 5 || index === 6? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600" : "text-white"}
            >
              {word}{" "}
            </span>
          ))}
        </h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">{description}</p>
        {/* Registration Form */}
        <div className="max-w-3xl mx-auto mt-20 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden">
          
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">PREENCHA SEUS DADOS</h3>
            <p className="text-zinc-300 text-center mb-8">
              Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira
            </p>

            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
              >
                {isSubmitting ? "Enviando..." : "GARANTIR MINHA VAGA AGORA"}
              </Button>

              <p className="text-xs text-zinc-400 text-center">
                Ao clicar em "Garantir minha vaga agora", você concorda com nossos termos de uso e política de
                privacidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}