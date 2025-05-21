import Link from "next/link"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-8 md:py-10 border-t border-zinc-800/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-8 md:h-10 w-auto mb-4" />
            <p className="text-xs md:text-sm text-zinc-400 mb-4">
              Transformando vidas financeiras em todo o Brasil desde 2015.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {["facebook", "instagram", "youtube", "linkedin"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Programas</h4>
            <ul className="space-y-1 md:space-y-2">
              {["Despertar Milionário", "Coaching Financeiro", "Mentoria LCF", "Segredos da Mente Milionária"].map(
                (program) => (
                  <li key={program}>
                    <Link href="#" className="text-xs md:text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {program}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Links Úteis</h4>
            <ul className="space-y-1 md:space-y-2">
              {["Sobre", "Depoimentos", "FAQ", "Blog", "Contato"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs md:text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">Contato</h4>
            <p className="text-xs md:text-sm text-zinc-400 mb-2">contato@robertonavarrooficial.com.br</p>
            <p className="text-xs md:text-sm text-zinc-400">São Paulo, SP - Brasil</p>
          </div>
        </div>
        <div className="pt-6 md:pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-zinc-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 md:space-x-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
              Termos de Uso
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
