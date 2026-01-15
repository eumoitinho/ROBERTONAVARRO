"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { navigationItemsDefault, type NavigationItem } from "@/lib/navigation-default"

// HEADER RECEBE PROPRIEDADES PARA CUSTOMIZAÇÃO POR PÁGINA
interface SiteHeaderProps {
    className?: string
    navigationItems?: NavigationItem[]
    showInicio?: boolean // mostra ou não o link "Início"
    cartItems?: any[] // itens do carrinho
    onCartClick?: () => void // função para abrir o carrinho
}

export function SiteHeader({
    className,
    navigationItems,
    showInicio = false,
    cartItems = [],
    onCartClick,
}: SiteHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const hasCustomNavigation = Array.isArray(navigationItems)
    const [resolvedNavigation, setResolvedNavigation] = useState<NavigationItem[]>(
        hasCustomNavigation ? navigationItems : navigationItemsDefault
    )
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (Array.isArray(navigationItems)) {
            setResolvedNavigation(navigationItems)
            return
        }

        let isActive = true
        const fetchNavigation = async () => {
            try {
                const response = await fetch("/api/navigation", { cache: "no-store" })
                if (!response.ok) {
                    return
                }
                const data = await response.json()
                if (isActive && Array.isArray(data.items)) {
                    setResolvedNavigation(data.items)
                }
            } catch {
                // Fallback para o menu padrão já aplicado
            }
        }

        fetchNavigation()

        return () => {
            isActive = false
        }
    }, [navigationItems])

    const isActivePath = (href: string) => {
        if (href === "/" && pathname === "/") return true
        if (href !== "/" && pathname.startsWith(href)) return true
        return false
    }

    // Se for landing (showInicio=true e não for raiz), usar a própria página como "Início"
    const inicioHref = showInicio && pathname !== "/" ? pathname : "/"

    // monta o menu, incluindo o link "Início" apontando para inicioHref
    const navItems = showInicio
        ? [{ title: "Início", href: inicioHref }, ...resolvedNavigation.filter(i => i.title !== "Início")]
        : resolvedNavigation.filter(i => i.title !== "Início")

    const ctaButton = resolvedNavigation.find((item: any) => item.isButton)

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

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Carrinho de Compras */}
                        {cartItems && cartItems.length >= 0 && onCartClick && (
                            <Button
                                onClick={onCartClick}
                                variant="ghost"
                                size="icon"
                                className="relative text-white hover:bg-zinc-800/50 hover:text-yellow-400"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {cartItems.length > 0 && (
                                    <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0 min-w-0">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Button>
                        )}

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
                            </>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center space-x-2">
                        {/* Carrinho Mobile */}
                        {cartItems && cartItems.length >= 0 && onCartClick && (
                            <Button
                                onClick={onCartClick}
                                variant="ghost"
                                size="icon"
                                className="relative text-white hover:bg-zinc-800/50 hover:text-yellow-400"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {cartItems.length > 0 && (
                                    <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0 min-w-0">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Button>
                        )}
                        
                        {/* Mobile Menu */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
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
            </div>
        </header>
    )
}
