import Link from "next/link"
import { SiteHeader } from "@/components/header"
import  Footer  from "@/components/footer"

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24 pb-16 bg-zinc-950 text-zinc-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">Política de Privacidade</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Introdução</h2>
              <p className="mb-2">
                A presente Política de Privacidade tem por finalidade demonstrar o compromisso de Roberto Navarro ("nós", "nosso") 
                com a privacidade e proteção dos dados pessoais coletados, além de estabelecer as regras sobre a coleta, registro, 
                armazenamento, uso, compartilhamento e eliminação dos dados pessoais coletados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Dados Coletados</h2>
              <p className="mb-2">
                Ao preencher nossos formulários, participar de nossos eventos ou adquirir nossos produtos e serviços, 
                podemos coletar os seguintes dados pessoais:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Informações sobre navegação em nosso site (cookies)</li>
                <li>Informações de origem (UTM parameters)</li>
                <li>Dados de interação com nossos conteúdos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Finalidade do Tratamento dos Dados</h2>
              <p className="mb-2">Seus dados pessoais são coletados e utilizados para as seguintes finalidades:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Fornecer nossos produtos e serviços</li>
                <li>Enviar comunicações sobre eventos, cursos e oportunidades</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Realizar pesquisas e análises estatísticas</li>
                <li>Personalizar o conteúdo e ofertas de acordo com seus interesses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Compartilhamento de Dados</h2>
              <p className="mb-2">
                Seus dados pessoais podem ser compartilhados com:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Prestadores de serviços que nos auxiliam (plataformas de CRM, email marketing)</li>
                <li>Parceiros de negócios quando necessário para prestação dos serviços</li>
                <li>Autoridades públicas, quando exigido por lei</li>
              </ul>
              <p>
                Todos os terceiros com quem compartilhamos seus dados estão sujeitos a obrigações de confidencialidade e só podem processar seus dados para as finalidades específicas que determinamos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Armazenamento e Segurança</h2>
              <p className="mb-2">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra perda acidental, uso, divulgação ou acesso não autorizado.
                Seus dados são armazenados em servidores seguros, com acesso restrito apenas a pessoas autorizadas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Seus Direitos</h2>
              <p className="mb-2">De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar seu consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Cookies e Tecnologias Semelhantes</h2>
              <p className="mb-4">
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, entender como nosso site é utilizado e personalizar nosso conteúdo.
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Alterações na Política de Privacidade</h2>
              <p className="mb-4">
                Esta política pode ser atualizada periodicamente. Recomendamos que você consulte esta página regularmente para se manter informado sobre quaisquer alterações.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">9. Contato</h2>
              <p className="mb-4">
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, 
                entre em contato conosco pelo e-mail: contato@robertonavarro.com.br
              </p>
            </section>

            <div className="pt-6 border-t border-zinc-700">
              <p className="text-sm text-zinc-400">
                Última atualização: 17 de junho de 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}