# 🚀 Roberto Navarro - Website & CRM

Plataforma completa para gestão de eventos, cursos, livros e marketing digital de Roberto Navarro.

## 📁 Estrutura do Projeto

```
ROBERTONAVARRO/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autenticação
│   │   ├── events/               # Gestão de eventos
│   │   ├── tickets/              # Sistema de tickets
│   │   └── webhooks/             # Webhooks (Eduzz, etc)
│   │
│   ├── admin/                    # Área administrativa
│   │   ├── dashboard/            # Dashboard principal
│   │   ├── inscricoes/           # Gestão de inscrições
│   │   ├── check-in/             # Sistema de check-in
│   │   └── configuracoes/        # Configurações
│   │
│   ├── eventos/                  # Landing pages de eventos
│   │   ├── energia-do-dinheiro/
│   │   ├── mentor-milionario/
│   │   ├── segredos-da-mente-milionaria/
│   │   └── ...
│   │
│   ├── formacoes/                # Páginas de formações
│   │   ├── educador-financeiro/
│   │   ├── mentoria/
│   │   └── ...
│   │
│   ├── blog/                     # Blog dinâmico
│   ├── livros/                   # Landing pages de livros
│   ├── lp/                       # Landing pages especiais
│   └── ...
│
├── components/                   # Componentes React (reorganizado)
│   ├── admin/                    # Componentes administrativos
│   │   ├── admin-sidebar.tsx
│   │   ├── dashboard-chart.tsx
│   │   ├── login-form.tsx
│   │   └── ...
│   │
│   ├── events/                   # Componentes de eventos
│   │   ├── event-cta-button.tsx
│   │   ├── hero-countdown.tsx
│   │   ├── location-map.tsx
│   │   └── ...
│   │
│   ├── forms/                    # Formulários e captura de leads
│   │   ├── newsletter-formacoes.tsx
│   │   ├── newsletter-signup.tsx
│   │   └── utm-tracker.tsx
│   │
│   ├── layout/                   # Componentes de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-menu.tsx
│   │
│   ├── marketing/                # Marketing e conversão
│   │   ├── content-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── pricing-section.tsx
│   │   └── ...
│   │
│   ├── products/                 # Componentes de produtos
│   │   ├── card-product.tsx
│   │   ├── ticket-card.tsx
│   │   └── ...
│   │
│   ├── seals/                    # Selos de verificação
│   │   └── reclame-aqui-seal.tsx
│   │
│   ├── shared/                   # Componentes compartilhados
│   │   ├── countdown-timer.tsx
│   │   ├── whatsapp-button.tsx
│   │   └── ...
│   │
│   └── ui/                       # shadcn/ui components
│       └── ...50 componentes
│
├── hooks/                        # Custom React Hooks
│   ├── use-click-outside.ts
│   ├── use-mobile.tsx
│   ├── use-scroll-trigger.ts
│   └── use-toast.ts
│
├── lib/                          # Bibliotecas e utilitários
│   ├── api/                      # Integrações de API
│   │   ├── eduzz-api.ts
│   │   ├── eduzz-auth.ts
│   │   └── eduzz-types.ts
│   │
│   ├── blog/                     # Sistema de blog
│   │   ├── client.ts
│   │   ├── fallback-data.ts
│   │   └── queries.ts
│   │
│   ├── database/                 # Database (Neon/Vercel Postgres)
│   │   └── db.ts
│   │
│   ├── services/                 # Serviços de negócio
│   │   ├── actions.ts            # Lead submission
│   │   ├── auth.ts               # Autenticação
│   │   └── ticket.ts             # Sistema de tickets
│   │
│   ├── templates/                # Templates
│   │   └── ticket-templates.ts
│   │
│   ├── tracking/                 # Analytics e tracking
│   │   ├── meta-pixel.ts
│   │   └── utm-tracker.ts
│   │
│   └── utils.ts                  # Utilitários gerais
│
├── docs/                         # Documentação consolidada
│   ├── tracking/                 # Docs de tracking e analytics
│   │   ├── utm-implementation.md
│   │   ├── utm-tracking-guide.md
│   │   └── webhook-routing-guide.md
│   │
│   ├── CLEANUP_REPORT.md
│   ├── DOCUMENTACAO.md
│   ├── REORGANIZATION_PLAN.md
│   └── SANITY_SETUP_GUIDE.md
│
├── public/                       # Assets estáticos
│   ├── blog/                     # Imagens do blog
│   ├── eventos/                  # Imagens de eventos
│   ├── formacoes/                # Imagens de formações
│   └── ...
│
├── sanity/                       # Sanity CMS configuration
│   ├── lib/
│   ├── schemaTypes/
│   └── types.ts
│
├── scripts/                      # Scripts utilitários
│   └── cleanup-unused.sh
│
├── styles/                       # Estilos globais
│   └── globals.css
│
├── __archive__/                  # Arquivos antigos (não comprometer)
│   ├── backup_20251014/
│   └── old-exports/
│
├── .gitignore
├── next.config.js
├── package.json
├── README.md                     # Este arquivo
└── tsconfig.json
```

## 🛠 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Neon (Vercel Postgres)
- **CMS**: Sanity.io
- **Analytics**: Google Tag Manager, Meta Pixel
- **Forms**: React Hook Form + Zod
- **Payments**: Eduzz
- **Deployment**: Vercel

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar Sanity Studio
npm run studio
```

## 📝 Imports Organizados

Após a reorganização, os imports seguem o padrão:

```tsx
// Componentes por categoria
import { Header } from '@/components/layout/header'
import { EventCTAButton } from '@/components/events/event-cta-button'
import { NewsletterFormacoes } from '@/components/forms/newsletter-formacoes'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { Button } from '@/components/ui/button'

// Lib organizada
import { submitLead } from '@/lib/services/actions'
import { verifyAuth } from '@/lib/services/auth'
import { db } from '@/lib/database/db'
import { eduzzApi } from '@/lib/api/eduzz-api'
import { trackEvent } from '@/lib/tracking/meta-pixel'

// Hooks
import { useIsMobile } from '@/hooks/use-mobile'
import { useToast } from '@/hooks/use-toast'
```

## 🎯 Benefícios da Reorganização

1. **Manutenibilidade**: Fácil encontrar e editar código
2. **Escalabilidade**: Estrutura suporta crescimento
3. **Onboarding**: Novos desenvolvedores entendem rapidamente
4. **Performance**: Menos arquivos desnecessários no Git
5. **Organização**: Componentes categorizados logicamente

## 📊 Sistema de Leads

O sistema captura leads de múltiplas fontes e direciona para webhooks específicos:

- **Energia do Dinheiro** → Webhook 1
- **Mentor Milionário** → Webhook 2
- **Crenças da Riqueza** → Webhook 3
- **Segredos da Mente Milionária** → Webhook 4
- **Padrão (Educador Financeiro)** → Webhook 5

Ver `/docs/tracking/webhook-routing-guide.md` para detalhes.

## 🔐 Variáveis de Ambiente

```env
# Database
DATABASE_URL=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Eduzz
EDUZZ_CLIENT_ID=
EDUZZ_CLIENT_SECRET=
EDUZZ_WEBHOOK_SECRET=

# Auth
JWT_SECRET=

# Analytics
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

## 📚 Documentação

- **Tracking**: `/docs/tracking/`
- **Setup**: `/docs/SANITY_SETUP_GUIDE.md`
- **Reorganização**: `/docs/REORGANIZATION_PLAN.md`
- **Limpeza**: `/docs/CLEANUP_REPORT.md`

## 🤝 Contribuindo

1. Crie uma branch feature: `git checkout -b feature/nova-feature`
2. Commit suas mudanças: `git commit -m 'Add nova feature'`
3. Push para a branch: `git push origin feature/nova-feature`
4. Abra um Pull Request

## 📞 Contato

Roberto Navarro - [@robertonavarro](https://instagram.com/robertonavarro)

---

**Última atualização**: Outubro 2025
**Versão**: 2.0 (Reorganizada)

