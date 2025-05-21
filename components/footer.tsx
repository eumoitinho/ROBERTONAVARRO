
import Link from "next/link"
import Logo from "@/components/logo"

export default function Footer() {
  const icons = {
    Facebook: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white" aria-hidden="true">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
      </svg>
    ),
    Instagram: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.212 2.092-1.271 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.291 2.393 1.271 3.373.98.98 2.092 1.212 3.373 1.271C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.291 3.373-1.271.98-.98 1.212-2.092 1.271-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.291-2.393-1.271-3.373-.98-.98-2.092-1.212-3.373-1.271C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
      </svg>
    ),
    YouTube: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white" aria-hidden="true">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.19 3.5 12 3.5 12 3.5s-7.19 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.39 0 12 0 12s0 3.61.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.81 20.5 12 20.5 12 20.5s7.19 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.61 24 12 24 12s0-3.61-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    TikTok: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white" aria-hidden="true">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V.772h-4.387v15.804a2.708 2.708 0 0 1-2.704 2.704 2.707 2.707 0 0 1-2.704-2.704 2.706 2.706 0 0 1 5.412-.002V9.524a8.093 8.093 0 0 0 7.391 8.029 8.094 8.094 0 0 0 4.248-1.153v-4.011a4.763 4.763 0 0 1-3.686-.937 4.834 4.834 0 0 1-1.087-3.757l.004-.991z"/>
      </svg>
    ),
  }

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/robertonavarrooficial",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/robertonavarrooficial",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@robertonavarrooficial",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@robertonavarrooficial",
    },
  ]

  return (
    <footer className="bg-zinc-950 py-8 xs-py-6 sm:py-10 border-t border-zinc-800/50">
      <div className="container mx-auto px-4 xs-px-3 sm:px-4">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xs-gap-6 sm:gap-8 mb-8 xs-mb-6 sm:mb-10">
          <div>
            <Logo className="h-10 w-auto mb-4" />
            <p className="text-sm text-zinc-400 mb-4">Transformando vidas financeiras em todo o Brasil desde 2015.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  aria-label={social.name}
                >
                  {icons[social.name as keyof typeof icons]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Programas</h4>
            <ul className="space-y-2">
              {[
                "LCF Mentoring",
                "Empreendedor Inteligente",
                "Educador Financeiro",
                "Crenças da Riqueza",
                "Segredos da Mente Milionária",
                "Escalador de Negócios",
              ].map((program) => (
                <li key={program}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              {["Quem Somos", "Formações", "Eventos", "Livros", "Treinamentos", "Contato"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h4>
            <p className="text-sm text-zinc-400 mb-2">contato@robertonavarrooficial.com.br</p>
            <p className="text-sm text-zinc-400 mb-2">(12) 99765-9057</p>
            <p className="text-sm text-zinc-400">Alameda Araguaia 751, Alphaville – SP</p>
          </div>
        </div>

        <div className="pt-6 xs-pt-4 sm:pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs xs-text-xs sm:text-sm text-zinc-500 mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 xs-gap-3 sm:gap-6">
            <Link
              href="#"
              className="text-xs xs-text-xs sm:text-xs text-zinc-500 hover:text-yellow-400 transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="#"
              className="text-xs xs-text-xs sm:text-xs text-zinc-500 hover:text-yellow-400 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="text-xs xs-text-xs sm:text-xs text-zinc-500 hover:text-yellow-400 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
