# 📋 Plano de Reorganização do Repositório

## 🔍 Problemas Identificados

### 1. **Arquivos e Diretórios Desnecessários**
- ❌ `/backup_20251014_175932/` (700KB) - Backup antigo
- ❌ `/dist/` (423MB) - Build artifacts que devem estar no .gitignore
- ❌ `/archive/` (256KB) - Arquivos arquivados
- ❌ `test-utm.html` na raiz
- ❌ Múltiplos arquivos de configuração: `next.config.js` e `next.config.mjs`

### 2. **Hooks Mal Posicionados**
- ❌ `/components/ui/use-mobile.tsx` → deveria estar em `/hooks/`
- ❌ `/components/ui/use-toast.ts` → deveria estar em `/hooks/`
- ✅ Hooks já existem em `/hooks/` mas há duplicatas

### 3. **Componentes Desorganizados**
- ❌ 53 componentes no diretório raiz `/components/` sem categorização
- ❌ Mistura de componentes admin, eventos, forms, UI genéricos

### 4. **Documentação Espalhada**
- ❌ `CLEANUP_REPORT.md`, `CLEANUP_SUMMARY.md` na raiz
- ❌ `SANITY_SETUP_GUIDE.md`, `DOCUMENTACAO.md` na raiz
- ❌ Documentação útil em `/docs/` mas incompleta

### 5. **Lib Desorganizado**
- ❌ `blog-data.ts` duplicado com `/lib/blog/fallback-data.ts`
- ✅ `/lib/blog/` já está bem organizado
- ⚠️ Arquivos relacionados a Eduzz espalhados

### 6. **Scripts Desorganizados**
- ❌ Apenas 2 arquivos em `/scripts/` sendo 1 imagem PNG
- ❌ Pasta de backup com 22 scripts antigos

## 📐 Nova Estrutura Proposta

```
ROBERTONAVARRO/
├── app/                          # Next.js App Router (✅ BEM ORGANIZADO)
│   ├── (auth)/                   # NOVO: Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── obrigado/
│   ├── (marketing)/              # NOVO: Grupo de rotas públicas
│   │   ├── eventos/
│   │   ├── formacoes/
│   │   ├── livros/
│   │   ├── blog/
│   │   └── lp/
│   ├── (admin)/                  # Já existe, manter
│   │   └── admin/
│   ├── api/                      # ✅ BEM ORGANIZADO
│   └── ...outras rotas
│
├── components/                   # REORGANIZAR POR CATEGORIA
│   ├── admin/                    # NOVO: Componentes do admin
│   │   ├── admin-sidebar.tsx
│   │   ├── dashboard-chart.tsx
│   │   ├── dashboard-stats.tsx
│   │   ├── event-settings-form.tsx
│   │   ├── login-form.tsx
│   │   ├── qrcode-scanner.tsx
│   │   ├── registration-form.tsx
│   │   ├── registrations-list.tsx
│   │   ├── system-settings-form.tsx
│   │   ├── user-settings-form.tsx
│   │   └── verify-ticket.tsx
│   │
│   ├── events/                   # NOVO: Componentes de eventos
│   │   ├── event-cta-button.tsx
│   │   ├── event-popup.tsx
│   │   ├── event-registration-button.tsx
│   │   ├── hero-countdown.tsx
│   │   ├── hero-pages.tsx
│   │   ├── hero-pages-red.tsx
│   │   ├── location-map.tsx
│   │   ├── notable-persons.tsx
│   │   └── ticket-pricing-cards.tsx
│   │
│   ├── forms/                    # NOVO: Formulários e captura
│   │   ├── newsletter-formacoes.tsx
│   │   ├── newsletter-signup.tsx
│   │   └── utm-tracker.tsx
│   │
│   ├── layout/                   # NOVO: Componentes de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── footerlp.tsx
│   │   ├── mobile-menu.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── marketing/                # NOVO: Marketing e vendas
│   │   ├── content-section.tsx
│   │   ├── final-cta-section.tsx
│   │   ├── how-works.tsx
│   │   ├── knowledge-barrier-section.tsx
│   │   ├── mentor.tsx
│   │   ├── mentors-section.tsx
│   │   ├── parallax-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── section-badge.tsx
│   │   ├── testimonials-livros.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── training-section.tsx
│   │   └── transformation-videos.tsx
│   │
│   ├── products/                 # NOVO: Componentes de produtos
│   │   ├── card-product.tsx
│   │   ├── product-kit-display.tsx
│   │   ├── intelligence-card.tsx
│   │   ├── ticket-card.tsx
│   │   └── ticket-purchase-form.tsx
│   │
│   ├── seals/                    # NOVO: Selos e verificações
│   │   ├── ra-verified-seals.tsx
│   │   └── reclame-aqui-seal.tsx
│   │
│   ├── shared/                   # NOVO: Componentes compartilhados
│   │   ├── countdown-timer.tsx
│   │   ├── enhanced-button.tsx
│   │   ├── floating-whatsapp.tsx
│   │   ├── glow-effect.tsx
│   │   ├── logo.tsx
│   │   ├── scroll-animation.tsx
│   │   ├── universal-page.tsx
│   │   └── whatsapp-button.tsx
│   │
│   └── ui/                       # ✅ shadcn/ui components (manter)
│       └── ...50 componentes UI
│
├── hooks/                        # ✅ CONSOLIDAR
│   ├── use-click-outside.ts     # ✅ Já existe
│   ├── use-mobile.tsx            # ✅ Já existe (remover de ui/)
│   ├── use-scroll-trigger.ts    # ✅ Já existe
│   └── use-toast.ts              # ✅ Já existe (remover de ui/)
│
├── lib/                          # REORGANIZAR
│   ├── api/                      # NOVO: Integrações com APIs
│   │   ├── eduzz-api.ts
│   │   ├── eduzz-auth.ts
│   │   └── eduzz-types.ts
│   │
│   ├── blog/                     # ✅ JÁ ORGANIZADO
│   │   ├── client.ts
│   │   ├── fallback-data.ts
│   │   └── queries.ts
│   │
│   ├── database/                 # NOVO: Database related
│   │   └── db.ts
│   │
│   ├── services/                 # NOVO: Serviços
│   │   ├── actions.ts           # Lead submission
│   │   ├── auth.ts
│   │   └── ticket.ts
│   │
│   ├── templates/                # NOVO: Templates
│   │   └── ticket-templates.ts
│   │
│   ├── tracking/                 # NOVO: Analytics e tracking
│   │   ├── meta-pixel.ts
│   │   └── utm-tracker.ts
│   │
│   └── utils.ts                  # ✅ Utilities gerais
│
├── docs/                         # CONSOLIDAR DOCUMENTAÇÃO
│   ├── api/                      # NOVO: Documentação de API
│   │   └── webhooks.md
│   ├── development/              # NOVO: Guias de desenvolvimento
│   │   ├── components.md
│   │   └── structure.md
│   ├── setup/                    # NOVO: Guias de setup
│   │   └── sanity-setup.md
│   ├── tracking/                 # ✅ Já existe
│   │   ├── utm-implementation.md
│   │   ├── utm-tracking-guide.md
│   │   └── webhook-routing-guide.md
│   ├── CLEANUP_REPORT.md         # MOVER da raiz
│   ├── CLEANUP_SUMMARY.md        # MOVER da raiz
│   ├── DOCUMENTACAO.md           # MOVER da raiz
│   └── README.md                 # NOVO: Documentação principal
│
├── public/                       # ✅ Assets estáticos
│   └── ...imagens organizadas
│
├── sanity/                       # ✅ Sanity CMS config
│
├── scripts/                      # LIMPAR E ORGANIZAR
│   ├── dev/                      # NOVO: Scripts de desenvolvimento
│   ├── deployment/               # NOVO: Scripts de deploy
│   └── maintenance/              # NOVO: Limpeza e manutenção
│       └── cleanup-unused.sh
│
├── styles/                       # ✅ Global styles
│
├── __archive__/                  # NOVO: Arquivos antigos
│   ├── backup_20251014/
│   └── old-exports/
│
├── .gitignore                    # ATUALIZAR
├── next.config.js                # ✅ MANTER (remover .mjs)
├── package.json
├── README.md                     # CRIAR
└── tsconfig.json

```

## 🎯 Ações a Realizar

### Fase 1: Limpeza (Imediata)
1. ✅ Adicionar `/dist/` ao `.gitignore`
2. ✅ Mover `/backup_20251014_175932/` para `/__archive__/`
3. ✅ Mover `/archive/` para `/__archive__/old-exports/`
4. ✅ Remover `next.config.mjs` (manter apenas .js)
5. ✅ Mover `test-utm.html` para `/__archive__/`
6. ✅ Remover `/dist/` do repositório

### Fase 2: Reorganizar Componentes
1. Criar estrutura de pastas em `/components/`
2. Mover componentes para categorias apropriadas
3. Atualizar imports em todos os arquivos

### Fase 3: Reorganizar Lib
1. Criar subpastas: `api/`, `database/`, `services/`, `templates/`, `tracking/`
2. Mover arquivos para categorias apropriadas
3. Remover `blog-data.ts` (duplicado)
4. Atualizar imports

### Fase 4: Consolidar Hooks
1. Remover `/components/ui/use-mobile.tsx` (duplicado)
2. Remover `/components/ui/use-toast.ts` (duplicado)
3. Manter apenas em `/hooks/`
4. Atualizar imports

### Fase 5: Consolidar Documentação
1. Mover arquivos .md da raiz para `/docs/`
2. Criar estrutura de subpastas em `/docs/`
3. Criar `README.md` principal
4. Criar índice de documentação

### Fase 6: Scripts
1. Limpar scripts antigos do backup
2. Organizar em subpastas por propósito
3. Remover imagem PNG

## 📊 Benefícios Esperados

1. **Manutenibilidade**: Fácil encontrar e editar componentes
2. **Escalabilidade**: Estrutura suporta crescimento
3. **Onboarding**: Novos devs entendem a estrutura rapidamente
4. **Performance**: Menos arquivos desnecessários
5. **Git**: Histórico mais limpo sem builds e backups

## ⚠️ Cuidados

- Testar após cada fase
- Fazer backup antes de começar
- Atualizar imports gradualmente
- Testar builds

## 📝 Status

- [x] Análise completa
- [ ] Fase 1: Limpeza
- [ ] Fase 2: Componentes
- [ ] Fase 3: Lib
- [ ] Fase 4: Hooks
- [ ] Fase 5: Documentação
- [ ] Fase 6: Scripts
- [ ] Testes finais
- [ ] Documentação final

