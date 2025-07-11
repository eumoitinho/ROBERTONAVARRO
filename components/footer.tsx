import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTiktok } from "react-icons/fa"
import Link from "next/link"
import Logo from "./logo"
import { JSX, Key } from "react"
import { NewsletterSignup } from "./newsletter-signup"
import { Mail, Phone, MapPin } from "lucide-react"
import { UrlObject } from "url"

const socialIcons: Record<string, JSX.Element> = {
  facebook: <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />,
  instagram: <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />,
  youtube: <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />,
  linkedin: <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />,
  tiktok: <FaTiktok className="w-4 h-4 md:w-5 md:h-5" />,
}

const socialLinks: Record<string, string> = {
  facebook: "https://facebook.com/robertonavarrooficial",
  instagram: "https://instagram.com/robertonavarrooficial",
  youtube: "https://youtube.com/robertonavarrooficial",
  linkedin: "https://linkedin.com/in/robertonavarrooficial",
  tiktok: "https://tiktok.com/@robertonavarrooficial",
}



const footerLinks = {
  formacoes: [
    { title: "Educador Financeiro", href: "/formacoes/educador-financeiro" },
    { title: "Empreendedor Inteligente", href: "/formacoes/empreendedor-inteligente" },
    { title: "LCF Mentoring Pro", href: "/formacoes/lcf-mentoring-pro" },
    { title: "Mentoria Individual", href: "/formacoes/mentoria-individual" },
    { title: "Mentoria de Investimentos", href: "/formacoes/mentoria-de-investimentos" },
  ],
  conteudo: [
    { title: "Lives", href: "/lives" },
    { title: "Livros", href: "/livros" },
  ],
  eventos: [
    { title: "Energia do Dinheiro", href: "/eventos/energia-do-dinheiro" },
    { title: "Escalador de Negócios", href: "/eventos/escalador-de-negocios" },
    { title: "Crenças da Riqueza", href: "/eventos/crencas-da-riqueza" },
  ],
  institucional: [
    { title: "Sobre Roberto Navarro", href: "./#sobre" },
    { title: "Contato", href: "/contato" },
    { title: "Política de Privacidade", href: "/politica-privacidade" },
    { title: "Termos de Uso", href: "/termos-uso" },
    { title: "Cookies", href: "/cookies" },
    { title: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    { title: "FAQ", href: "/faq" },
  ],
  mentorias: [
    { title: "Mentoria Individual", href: "/formacoes/mentoria-individual" },
    { title: "Mentoria de Investimentos", href: "/formacoes/mentoria-de-investimentos" },
  ],
}



export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Logo className="h-12 w-auto" />
              </Link>
              <p className="text-zinc-400 mb-6 max-w-md">
                Transformando vidas financeiras em todo o Brasil desde 2015. Mais de 130 mil pessoas já passaram por
                nossas formações e mentorias.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">contato@robertonavarrooficial.com.br</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">(12) 99765-9057</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">São Paulo, SP - Brasil</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {Object.entries(socialLinks).map(([key, href]) => (
                  <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 transition-colors group"
                    aria-label={key}
                  >
                    {socialIcons[key]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Formações */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-yellow-400">Formações</h4>
              <ul className="space-y-2">
                {footerLinks.formacoes.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentorias */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-yellow-400">Mentorias</h4>
              <ul className="space-y-2">
                {footerLinks.mentorias.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 mt-6 text-yellow-400">Conteúdo</h4>
              <ul className="space-y-2">
                {footerLinks.conteudo.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institucional */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-yellow-400">Institucional</h4>
              <ul className="space-y-2">
                {footerLinks.institucional.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link
                href="/politica-privacidade"
                className="text-sm text-zinc-500 hover:text-yellow-400 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="text-sm text-zinc-500 hover:text-yellow-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="text-sm text-zinc-500 hover:text-yellow-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
