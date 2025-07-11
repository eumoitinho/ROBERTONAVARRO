"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Logo from "@/components/logo"
import { cn } from "@/lib/utils"

// NOVA ESTRUTURA DE LINKS BASEADA NO FOOTER
type NavigationSubItem = {
    title: string
    href: string
    description?: string
}

type NavigationItem = {
    title: string
    href: string
    items?: NavigationSubItem[]
    isButton?: boolean
}

const navigationItemsDefault: NavigationItem[] = [
    {
        title: "Início",
        href: "/",
    },
    {
        title: "Formações",
        href: "/formacoes",
        items: [
            {
                title: "Educador Financeiro",
                href: "/formacoes/educador-financeiro",
                description: "Torne-se um especialista em educação financeira",
            },
            {
                title: "Empreendedor Inteligente",
                href: "/formacoes/empreendedor-inteligente",
                description: "Desenvolva habilidades empresariais",
            },
        ],
    },
    {
        title: "Conteúdo",
        href: "/conteudo",
        items: [
            {
                title: "Lives",
                href: "/lives",
                description: "Transmissões ao vivo e gravadas",
            },
            {
                title: "Livros",
                href: "/livros",
                description: "Biblioteca de conhecimento financeiro",
            },
        ],
    },
    {
        title: "Eventos",
        href: "/eventos",
        items: [
            {
                title: "Energia do Dinheiro",
                href: "/eventos/energia-do-dinheiro",
                description: "Alinhe sua energia com a prosperidade",
            },
            {
                title: "Escalador de Negócios",
                href: "/eventos/escalador-de-negocios",
                description: "Escale seu negócio de forma inteligente",
            },
            {
                title: "Crenças da Riqueza",
                href: "/eventos/crencas-da-riqueza",
                description: "Transforme sua mentalidade financeira",
            },
            // { title: "Segredos da Mente Milionária", href: "/eventos/segredos-da-mente-milionaria", description: "Desvende os segredos da mente milionária" },
        ],
    },
    {
        title: "Mentorias",
        href: "/mentorias",
        items: [
            {
                title: "Mentoria Individual",
                href: "/formacoes/mentoria-individual",
                description: "Acompanhamento personalizado",
            },
            {
                title: "Mentoria de Investimentos",
                href: "/formacoes/mentoria-de-investimentos",
                description: "Estratégias avançadas de investimento",
            },
            {
                title: "LCF Mentoring Pro",
                href: "/formacoes/lcf-mentoring-pro",
                description: "Mentoria completa em liberdade financeira",
            },
            {
                title: "LCF Mentoring",
                href: "/formacoes/mentoria",
                description: "Acompanhamento personalizado",
            },
        ],
    },
    {
        title: "Sobre",
        href: "#quem-somos",
    },
    {
        title: "Contato",
        href: "#contato",
    },

]

// HEADER RECEBE PROPRIEDADES PARA CUSTOMIZAÇÃO POR PÁGINA
interface SiteHeaderProps {
    className?: string
    navigationItems?: typeof navigationItemsDefault
    showInicio?: boolean // mostra ou não o link "Início"
}

export function SiteHeader({
    className,
    navigationItems = navigationItemsDefault,
    showInicio = false,
}: SiteHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActivePath = (href: string) => {
        if (href === "/" && pathname === "/") return true
        if (href !== "/" && pathname.startsWith(href)) return true
        return false
    }

     // Se for landing (showInicio=true e não for raiz), usar a própria página como "Início"
  const inicioHref = showInicio && pathname !== "/" ? pathname : "/"

  // monta o menu, incluindo o link "Início" apontando para inicioHref
  const navItems = showInicio
    ? [{ title: "Início", href: inicioHref }, ...navigationItems.filter(i => i.title !== "Início")]
    : navigationItems.filter(i => i.title !== "Início")

  const ctaButton = navigationItems.find((item: any) => item.isButton)


    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 shadow-lg"
                    : "bg-transparent border-b border-transparent",
                className,
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Logo className="h-8 lg:h-10 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="space-x-2">
                            {navItems.map((item, idx) => (
                                <NavigationMenuItem key={`${item.href}-${idx}`}>
                                    {item.items ? (
                                        <>
                                            <NavigationMenuTrigger
                                                className={cn(
                                                    "bg-transparent hover:bg-zinc-800/50 text-zinc-300 hover:text-yellow-400 transition-colors",
                                                    isActivePath(item.href) && "text-yellow-400",
                                                )}
                                            >
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-zinc-950/95  shadow-xl rounded-xl">
                                                    {item.items.map((subItem: any, subIdx: number) => (
                                                        <NavigationMenuLink key={`${subItem.href}-${subIdx}`} asChild>
                                                            <Link
                                                                href={subItem.href}
                                                                className={cn(
                                                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-yellow-400 focus:bg-zinc-800/50 focus:text-yellow-400",
                                                                    isActivePath(subItem.href) && "bg-zinc-800/30 text-yellow-400",
                                                                )}
                                                            >
                                                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-zinc-400">{subItem.description}</p>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800/50 hover:text-yellow-400 focus:bg-zinc-800/50 focus:text-yellow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50",
                                                    isActivePath(item.href) ? "text-yellow-400" : "text-zinc-300",
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

<div className="hidden lg:flex items-center space-x-4">
  {ctaButton ? (
    <Button
      key={ctaButton.title}
      asChild
      className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-3 text-base cta-hover"
    >
      <Link href={ctaButton.href}>{ctaButton.title}</Link>
    </Button>
  ) : (
    <>
    <Button
        asChild
        variant="default"
        className="border-yellow-500 bg-yellow-500 text-black hover:text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-400"
      >
        <Link href="/blog">Blog</Link>
      </Button>
      {/* <Button
        asChild
        variant="outline"
        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-400"
      >
        <Link href="/eventos/crencas-da-riqueza#form">Newsletter</Link>
      </Button> */}
      
    </>
  )}
</div>

                    {/* Mobile Menu */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800/50">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Abrir menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-zinc-950 border-zinc-800">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link href="/" className="mb-4">
                                    <Logo className="h-8 w-auto" />
                                </Link>

                                {navItems.map((item, idx) => (
                                    <div key={`${item.href}-${idx}`} className="space-y-2">
                                        {item.items ? (
                                            <div className="space-y-2">
                                                <div className="font-medium text-yellow-400 text-sm uppercase tracking-wider">{item.title}</div>
                                                <div className="space-y-1 pl-4">
                                                    {item.items.map((subItem: any, subIdx: number) => (
                                                        <Link
                                                            key={`${subItem.href}-${subIdx}`}
                                                            href={subItem.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className={cn(
                                                                "block py-2 text-sm transition-colors hover:text-yellow-400",
                                                                isActivePath(subItem.href) ? "text-yellow-400" : "text-zinc-300",
                                                            )}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "block py-2 font-medium transition-colors hover:text-yellow-400",
                                                    isActivePath(item.href) ? "text-yellow-400" : "text-zinc-300",
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </div>
                                ))}
<div className="pt-4 border-t border-zinc-800">
  <Button
    asChild
    className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
  >
    <Link
      href={ctaButton ? ctaButton.href : "/eventos/crencas-da-riqueza#form"}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {ctaButton ? ctaButton.title : "Próximo Evento"}
    </Link>
  </Button>
</div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
