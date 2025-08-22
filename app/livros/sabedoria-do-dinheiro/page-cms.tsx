import { getBook } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import BookPageContent from '@/components/book-page-content'

export default async function SabedoriaDoDinheiroPageCMS() {
  let bookData = null

  try {
    bookData = await getBook('sabedoria-do-dinheiro')
  } catch (error) {
    console.log('Sanity CMS not available for book, using fallback content:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      <BookPageContent 
        bookData={bookData} 
        slug="sabedoria-do-dinheiro"
      />
      
      <TestimonialsLivros 
        heading="Transformações reais"
        description="Histórias de quem aplicou a sabedoria do dinheiro em suas vidas"
        testimonials={[
          {
            quote: "A sabedoria deste livro me ensinou a ter uma relação mais saudável e consciente com o dinheiro.",
            avatar: { src: "/images/testimonials/avatar-7.jpg", alt: "Lucia Ferreira" },
            name: "Lucia Ferreira",
            role: "Psicóloga",
            numberOfStars: 5
          },
          {
            quote: "Conceitos profundos apresentados de forma simples. Mudou minha perspectiva sobre riqueza e abundância.",
            avatar: { src: "/images/testimonials/avatar-8.jpg", alt: "Roberto Lima" },
            name: "Roberto Lima", 
            role: "Advogado",
            numberOfStars: 5
          }
        ]}
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}