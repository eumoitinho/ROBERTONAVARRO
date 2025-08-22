import { getBook } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import BookPageContent from '@/components/book-page-content'

export default async function QuebrandoMitosPageCMS() {
  let bookData = null

  try {
    bookData = await getBook('quebrando-mitos')
  } catch (error) {
    console.log('Sanity CMS not available for book, using fallback content:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      <BookPageContent 
        bookData={bookData} 
        slug="quebrando-mitos"
      />
      
      <TestimonialsLivros 
        heading="Transformações reais"
        description="Histórias de quem quebrou mitos e transformou sua vida financeira"
        testimonials={[
          {
            quote: "Este livro me abriu os olhos para verdades sobre dinheiro que eu nunca imaginei. Mudou completamente minha mentalidade.",
            avatar: { src: "/images/testimonials/avatar-5.jpg", alt: "Ana Silva" },
            name: "Ana Silva",
            role: "Empreendedora",
            numberOfStars: 5
          },
          {
            quote: "Quebrando mitos foi libertador! Finalmente entendi como o dinheiro realmente funciona na prática.",
            avatar: { src: "/images/testimonials/avatar-6.jpg", alt: "Carlos Santos" },
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