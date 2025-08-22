"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Logo from "@/components/logo"

interface FooterLink {
  _id: string
  title: string
  href?: string
  slug?: {
    current: string
  }
  isExternal?: boolean
}

interface FooterSection {
  _id: string
  title: string
  links: FooterLink[]
}

interface SocialMedia {
  _id: string
  platform: 'facebook' | 'instagram' | 'youtube' | 'linkedin'
  url: string
  handle?: string
}

interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  businessHours?: string
}

interface DynamicFooterProps {
  footerData?: {
    sections?: FooterSection[]
    socialMedia?: SocialMedia[]
    contact?: ContactInfo
    newsletter?: {
      enabled: boolean
      title: string
      description: string
    }
    copyright?: string
  }
  siteSettings?: {
    title?: string
    description?: string
    logo?: any
  }
}

export function DynamicFooter({ footerData, siteSettings }: DynamicFooterProps) {
  // Fallback data if Sanity is not available
  const defaultFooterData = {
    sections: [
      {
        _id: '1',
        title: 'Formações',
        links: [
          { _id: '1.1', title: 'Método TF', href: '/formacoes/metodo-tf' },
          { _id: '1.2', title: 'Mentor Coaching Financeiro', href: '/formacoes/mentor-coaching-financeiro' },
          { _id: '1.3', title: 'Todas as Formações', href: '/formacoes' }
        ]
      },
      {
        _id: '2',
        title: 'Livros',
        links: [
          { _id: '2.1', title: 'Coaching Financeiro', href: '/livros/coaching-financeiro' },
          { _id: '2.2', title: 'A Arte de Enriquecer', href: '/livros/arte-de-enriquecer' },
          { _id: '2.3', title: 'Todos os Livros', href: '/livros' }
        ]
      },
      {
        _id: '3',
        title: 'Empresa',
        links: [
          { _id: '3.1', title: 'Sobre', href: '#quem-somos' },
          { _id: '3.2', title: 'Blog', href: '/blog' },
          { _id: '3.3', title: 'Trabalhe Conosco', href: '/trabalhe-conosco' }
        ]
      },
      {
        _id: '4',
        title: 'Legal',
        links: [
          { _id: '4.1', title: 'Política de Privacidade', href: '/politica-privacidade' },
          { _id: '4.2', title: 'Termos de Uso', href: '/termos-de-uso' }
        ]
      }
    ],
    socialMedia: [
      { _id: 's1', platform: 'instagram' as const, url: 'https://instagram.com/robertonavarro', handle: '@robertonavarro' },
      { _id: 's2', platform: 'youtube' as const, url: 'https://youtube.com/@robertonavarro', handle: 'Roberto Navarro' },
      { _id: 's3', platform: 'linkedin' as const, url: 'https://linkedin.com/in/robertonavarro', handle: 'Roberto Navarro' }
    ],
    contact: {
      email: 'contato@robertonavarro.com.br',
      phone: '(11) 99999-9999',
      businessHours: 'Segunda a Sexta: 9h às 18h'
    },
    newsletter: {
      enabled: true,
      title: 'Newsletter',
      description: 'Receba dicas exclusivas sobre educação financeira'
    },
    copyright: '© 2024 Roberto Navarro. Todos os direitos reservados.'
  }

  const footer = footerData || defaultFooterData
  const settings = siteSettings || { title: 'Roberto Navarro', description: 'Educação Financeira' }

  const getItemLink = (item: FooterLink) => {
    if (item.href) return item.href
    if (item.slug?.current) return `/${item.slug.current}`
    return '#'
  }

  const getSocialIcon = (platform: string) => {
    const iconProps = { className: "h-5 w-5" }
    
    switch (platform) {
      case 'facebook':
        return <Facebook {...iconProps} />
      case 'instagram':
        return <Instagram {...iconProps} />
      case 'youtube':
        return <Youtube {...iconProps} />
      case 'linkedin':
        return <Linkedin {...iconProps} />
      default:
        return null
    }
  }

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {settings.description || 'Transformando vidas através da educação financeira.'}
            </p>

            {/* Social Media */}
            {footer.socialMedia && footer.socialMedia.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-3">Siga-nos</h4>
                <div className="flex space-x-3">
                  {footer.socialMedia.map((social) => (
                    <Link
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-yellow-500 transition-colors p-2 rounded-lg hover:bg-zinc-800"
                      title={social.handle || social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {footer.sections?.map((section) => (
            <div key={section._id}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link._id}>
                    <Link
                      href={getItemLink(link)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
                      target={'isExternal' in link && link.isExternal ? '_blank' : undefined}
                      rel={'isExternal' in link && link.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          {footer.contact && (
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                {footer.contact.email && (
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <Link 
                      href={`mailto:${footer.contact.email}`}
                      className="hover:text-yellow-500 transition-colors"
                    >
                      {footer.contact.email}
                    </Link>
                  </div>
                )}
                
                {footer.contact.phone && (
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <Link 
                      href={`tel:${footer.contact.phone.replace(/\D/g, '')}`}
                      className="hover:text-yellow-500 transition-colors"
                    >
                      {footer.contact.phone}
                    </Link>
                  </div>
                )}
                
                {'address' in footer.contact && footer.contact.address && (
                  <div className="flex items-start space-x-3 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{footer.contact.address}</span>
                  </div>
                )}

                {'businessHours' in footer.contact && footer.contact.businessHours && (
                  <div className="text-gray-400 text-sm">
                    <strong className="text-gray-300">Horário:</strong>
                    <br />
                    {footer.contact.businessHours}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        {footer.newsletter?.enabled && (
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <div className="max-w-md">
              <h4 className="text-white font-semibold mb-2">{footer.newsletter.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{footer.newsletter.description}</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-lg text-sm transition-all">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-zinc-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {footer.copyright || `© ${new Date().getFullYear()} ${settings.title}. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  )
}