import { getBook } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import BookPageContent from '@/components/book-page-content'

export default async function ArteDeEnriquecerPageCMS() {
  let bookData = null

  try {
    bookData = await getBook('arte-de-enriquecer')
  } catch (error) {
    console.log('Sanity CMS not available for book, using fallback content:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      <BookPageContent 
        bookData={bookData} 
        slug="arte-de-enriquecer"
      />
      
      <TestimonialsLivros 
        heading="O que nossos leitores dizem"
        description="Veja como este livro transformou a vida financeira de milhares de pessoas"
        testimonials={[
          {
            quote: "Este livro mudou completamente minha forma de ver o dinheiro. Agora tenho uma estratégia clara para enriquecer.",
            avatar: { src: "/images/testimonials/avatar-1.jpg", alt: "Ana Silva" },
            name: "Ana Silva",
            role: "Empreendedora",
            numberOfStars: 5
          },
          {
            quote: "Conteúdo prático e direto ao ponto. Já consegui aplicar várias técnicas e ver resultados reais.",
            avatar: { src: "/images/testimonials/avatar-2.jpg", alt: "Carlos Santos" },
            name: "Carlos Santos", 
            role: "Consultor",
            numberOfStars: 5
          }
        ]}
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}