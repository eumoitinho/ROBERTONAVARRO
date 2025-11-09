# Extração de Conteúdo - Roberto Navarro Website

## Visão Geral

Este diretório contém a documentação completa da extração de conteúdo de todas as páginas do website Roberto Navarro, preparada para migração para Payload CMS.

**Data:** 2025-11-09
**Total de Páginas Analisadas:** 15+
**Status:** ✅ Completo

---

## Arquivos Disponíveis

### 📋 Documentação Principal

**[EXTRACTION_SUMMARY.md](./EXTRACTION_SUMMARY.md)**
- Resumo executivo completo de todas as páginas extraídas
- Análise detalhada de cada página (metadata, seções, componentes)
- Padrões identificados
- Componentes reutilizáveis
- Integrações externas
- Recomendações para implementação

### 🔧 Guia de Implementação

**[PAYLOAD_CMS_SCHEMA.md](./PAYLOAD_CMS_SCHEMA.md)**
- Schemas completos para Payload CMS Collections
- Exemplos de implementação em TypeScript
- Hooks e Access Control
- Plugins recomendados
- Estrutura de diretórios
- Exemplos de fetch no Next.js

### 📄 Exemplos de JSON

**[formacao-educador-financeiro.json](./formacao-educador-financeiro.json)**
- Exemplo completo de extração de uma página de Formação
- Estrutura de dados detalhada
- Todos os campos e seções

**[evento-crencas-da-riqueza.json](./evento-crencas-da-riqueza.json)**
- Exemplo completo de extração de uma página de Evento
- Estrutura específica para eventos
- Countdown, tickets, mentores

---

## Páginas Extraídas

### Páginas Gerais (3)
✅ **/obrigado** - Página de confirmação
✅ **/inscricao** - Formulário de inscrição
✅ **/inscricao/confirmacao** - Confirmação com ticket

### Formações (7)
✅ **/formacoes/educador-financeiro**
✅ **/formacoes/empreendedor-inteligente**
✅ **/formacoes/lcf-mentoring-pro**
✅ **/formacoes/mentoria-individual**
✅ **/formacoes/mentoria-de-investimentos**
✅ **/formacoes/metodo-tf**
✅ **/formacoes/rota-mind**

### Eventos (5)
✅ **/eventos/crencas-da-riqueza**
✅ **/eventos/energia-do-dinheiro**
✅ **/eventos/escalador-de-negocios**
✅ **/eventos/mentor-milionario**
✅ **/eventos/segredos-da-mente-milionaria**

---

## Estrutura de Dados Extraída

### Para cada página, foi extraído:

#### Metadata
- Título, subtítulo, descrição
- Cor de destaque (accent color)
- Keywords e SEO

#### Hero Section
- Badge, título, subtítulo
- Descrição
- Imagens (desktop e mobile)
- CTAs (primário e secundário)
- Countdown (quando aplicável)

#### Seções de Conteúdo
- Desafios/Problemas
- Benefícios
- O que você vai aprender
- Módulos/Curriculum
- Materiais exclusivos
- Garantias

#### Componentes
- Mentores (biografia, imagem, conquistas)
- Depoimentos/Testimonials
- Vídeos de transformação
- Participantes notáveis
- FAQs

#### Dados Específicos

**Formações:**
- Certificações
- Módulos e aulas
- Bônus
- Pricing
- Licenças profissionais

**Eventos:**
- Data, hora, local
- Tipos de inteligência
- Event highlights
- Tickets e ingressos
- Plataforma de registro

---

## Collections Recomendadas para Payload CMS

### Collections Principais
1. **Formacoes** - Cursos e formações
2. **Eventos** - Eventos presenciais e online
3. **Mentors** - Perfis de mentores
4. **Tickets** - Ingressos para eventos
5. **FAQs** - Perguntas frequentes
6. **Testimonials** - Depoimentos
7. **Media** - Imagens e vídeos

### Collections de Suporte
- **Navigation** - Menus e navegação
- **Settings** - Configurações gerais
- **SEO** - Meta tags e SEO

---

## Componentes Reutilizáveis Identificados

### UI Components
- `HeroPages` - Hero section com variantes
- `SectionBadge` - Badges de seção
- `EventCTAButton` - Botão de CTA para eventos
- `TicketPricingCards` - Cards de preços

### Feature Components
- `NewsletterFormacoes` - Formulário de newsletter
- `TransformationVideos` - Vídeos de depoimento
- `NotableParticipants` - Participantes notáveis
- `TestimonialsSection` - Seção de depoimentos
- `MentorSection` - Seção de mentor

### Layout Components
- `SiteHeader` - Header do site
- `Footer` / `Footerlp` - Rodapé
- `WhatsAppButton` - Botão flutuante WhatsApp

---

## Integrações Externas

### Plataformas de Pagamento/Registro
- **Blinket** - evento.blinket.com.br
- **Eduzz** - cdn.eduzzcdn.com

### Mídia
- **YouTube** - Embeds de vídeos

### Comunicação
- **WhatsApp** - Número: 5512997659057

### Analytics
- **Google Tag Manager** - Evento 'purchase_completed'

---

## Padrões de Design

### Cores
- **Amarelo/Âmbar:** yellow-400, amber-600 (padrão)
- **Vermelho:** red-400, red-600 (Educador Financeiro)
- **Azul:** blue-400, blue-500 (Rota Mind)

### Gradientes
- Background: `from-zinc-950 via-zinc-900 to-zinc-800`
- CTAs: `from-yellow-500 to-amber-600`

### Efeitos
- Noise texture overlay
- Animated blur circles
- Hover: translateY + scale
- Pulse animations

---

## Próximos Passos Recomendados

### 1. Setup Payload CMS
```bash
npx create-payload-app@latest
cd [project-name]
npm install
```

### 2. Configurar Collections
- Copiar schemas do arquivo `PAYLOAD_CMS_SCHEMA.md`
- Adaptar conforme necessidades específicas
- Configurar relations entre collections

### 3. Migração de Dados
- Popular Collections com dados dos JSONs
- Upload de imagens para Media collection
- Configurar SEO para cada item

### 4. Refatoração das Pages
- Converter páginas estáticas para dinâmicas
- Implementar fetchers server-side
- Setup de revalidação

### 5. Deploy
- Configurar variáveis de ambiente
- Deploy do Payload Admin
- Deploy do Next.js app

---

## Tecnologias Utilizadas

### Frontend
- **Next.js 14+** - App Router
- **React** - Client components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### CMS (Recomendado)
- **Payload CMS 3.0+**
- **PostgreSQL** ou **MongoDB**

### Media
- **Cloudinary** ou **AWS S3** (recomendado para produção)

### Deployment
- **Vercel** - Next.js app
- **Railway** ou **Render** - Payload CMS

---

## Estrutura de Arquivos Criados

```
content-extraction/
├── README.md                                  ← Você está aqui
├── EXTRACTION_SUMMARY.md                      ← Resumo completo
├── PAYLOAD_CMS_SCHEMA.md                      ← Guia de implementação
├── formacao-educador-financeiro.json          ← Exemplo formação
└── evento-crencas-da-riqueza.json            ← Exemplo evento
```

---

## Notas Importantes

### Dados Sensíveis
- Não incluir credenciais em commits
- Usar variáveis de ambiente para:
  - URLs de API
  - Chaves de integração (Eduzz, WhatsApp)
  - Configurações de banco de dados

### Performance
- Implementar ISR (Incremental Static Regeneration)
- Otimizar imagens com next/image
- Cache de queries do Payload

### SEO
- Configurar metadata para todas as páginas
- Implementar sitemap.xml dinâmico
- Structured data (JSON-LD)

### Acessibilidade
- Manter alt text em todas as imagens
- ARIA labels em componentes interativos
- Keyboard navigation

---

## Suporte e Documentação

### Payload CMS
- [Documentação Oficial](https://payloadcms.com/docs)
- [GitHub](https://github.com/payloadcms/payload)

### Next.js
- [Documentação App Router](https://nextjs.org/docs)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## Contato

Para dúvidas sobre esta extração ou implementação, consulte os arquivos de documentação detalhados incluídos neste diretório.

---

**Última Atualização:** 2025-11-09
**Status:** ✅ Pronto para implementação
