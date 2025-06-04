// app/obrigado/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ObrigadoPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ObrigadoPage({ searchParams }: ObrigadoPageProps) {
  const source = typeof searchParams?.source === "string" ? searchParams.source : "site";
  const message = encodeURIComponent(`Olá! Acabei de me inscrever no ${source} e gostaria de saber mais sobre.`);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-yellow-900 text-white p-4">
      <div className="bg-zinc-800/70 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg">
        <svg
          className="w-16 h-16 mx-auto mb-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">Inscrição Recebida!</h1>
        <p className="text-lg text-zinc-300 mb-8">
          Obrigado por se inscrever! Seus dados foram enviados com sucesso.
        </p>
        <p className="text-md text-zinc-400 mb-8">Enquanto isso, entre em contato agora mesmo!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg text-lg"
          >
            <Link href={`https://wa.me/5512997659057?text=${message}`}>Falar com a equipe</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold py-3 px-6 rounded-lg text-lg"
          >
            <Link href="/eventos/crencas-da-riqueza">Ver Eventos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
