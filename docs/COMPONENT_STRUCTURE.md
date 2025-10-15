# 🧩 Estrutura de Componentes

## 📂 Organização por Categoria

Os componentes foram reorganizados em categorias lógicas para facilitar manutenção e descoberta.

## 📁 `/components/admin/`

Componentes relacionados à área administrativa.

| Componente | Descrição |
|------------|-----------|
| `admin-sidebar.tsx` | Sidebar de navegação do admin |
| `dashboard-chart.tsx` | Gráficos do dashboard |
| `dashboard-stats.tsx` | Estatísticas do dashboard |
| `event-settings-form.tsx` | Formulário de configurações de eventos |
| `login-form.tsx` | Formulário de login |
| `qrcode-scanner.tsx` | Scanner de QR Code para check-in |
| `registration-form.tsx` | Formulário de registro de participantes |
| `registrations-list.tsx` | Lista de inscrições |
| `system-settings-form.tsx` | Configurações do sistema |
| `user-settings-form.tsx` | Configurações de usuário |
| `verify-ticket.tsx` | Verificação de tickets |

**Quando usar**: Componentes exclusivos da área `/admin`.

## 📁 `/components/events/`

Componentes específicos para landing pages de eventos.

| Componente | Descrição |
|------------|-----------|
| `event-cta-button.tsx` | Botão de CTA para eventos |
| `event-popup.tsx` | Popup de evento |
| `event-registration-button.tsx` | Botão de inscrição |
| `hero-countdown.tsx` | Hero com countdown |
| `hero-pages.tsx` | Hero padrão de páginas de eventos |
| `hero-pages-red.tsx` | Hero vermelho alternativo |
| `location-map.tsx` | Mapa de localização do evento |
| `notable-persons.tsx` | Grid de pessoas notáveis |
| `ticket-pricing-cards.tsx` | Cards de preços de tickets |

**Quando usar**: Landing pages de eventos (`/app/eventos/*`).

## 📁 `/components/forms/`

Formulários e componentes de captura de leads.

| Componente | Descrição |
|------------|-----------|
| `newsletter-formacoes.tsx` | Formulário de newsletter para formações |
| `newsletter-signup.tsx` | Formulário genérico de newsletter |
| `utm-tracker.tsx` | Tracker de parâmetros UTM |

**Quando usar**: Captura de leads, formulários de contato.

## 📁 `/components/layout/`

Componentes estruturais de layout.

| Componente | Descrição |
|------------|-----------|
| `header.tsx` | Cabeçalho principal do site |
| `footer.tsx` | Rodapé principal |
| `footerlp.tsx` | Rodapé para landing pages |
| `mobile-menu.tsx` | Menu mobile |
| `theme-provider.tsx` | Provider de tema (dark/light) |

**Quando usar**: Em layouts principais, wrappers de páginas.

## 📁 `/components/marketing/`

Componentes focados em marketing e conversão.

| Componente | Descrição |
|------------|-----------|
| `content-section.tsx` | Seção de conteúdo reutilizável |
| `final-cta-section.tsx` | CTA final de página |
| `how-works.tsx` | Seção "Como Funciona" |
| `knowledge-barrier-section.tsx` | Seção de barreiras de conhecimento |
| `mentor.tsx` | Card de mentor |
| `mentors-section.tsx` | Grid de mentores |
| `parallax-section.tsx` | Seção com efeito parallax |
| `pricing-section.tsx` | Seção de preços |
| `section-badge.tsx` | Badge decorativo de seção |
| `testimonials-livros.tsx` | Depoimentos para livros |
| `testimonials-section.tsx` | Seção genérica de depoimentos |
| `training-section.tsx` | Seção de treinamentos |
| `transformation-videos.tsx` | Grid de vídeos de transformação |

**Quando usar**: Landing pages, páginas de vendas, páginas institucionais.

## 📁 `/components/products/`

Componentes relacionados a produtos (livros, cursos, tickets).

| Componente | Descrição |
|------------|-----------|
| `card-product.tsx` | Card de produto genérico |
| `product-kit-display.tsx` | Display de kit de produtos |
| `intelligence-card.tsx` | Card de inteligência (formações) |
| `ticket-card.tsx` | Card de ticket de evento |
| `ticket-purchase-form.tsx` | Formulário de compra de ticket |

**Quando usar**: Páginas de produtos, checkout, catálogos.

## 📁 `/components/seals/`

Selos de verificação e confiança.

| Componente | Descrição |
|------------|-----------|
| `ra-verified-seals.tsx` | Selos verificados do Reclame Aqui |
| `reclame-aqui-seal.tsx` | Selo do Reclame Aqui |

**Quando usar**: Rodapés, páginas de checkout, áreas de confiança.

## 📁 `/components/shared/`

Componentes compartilhados entre múltiplas áreas.

| Componente | Descrição |
|------------|-----------|
| `countdown-timer.tsx` | Contador regressivo |
| `enhanced-button.tsx` | Botão com animações |
| `floating-whatsapp.tsx` | Botão flutuante do WhatsApp (deprecado) |
| `glow-effect.tsx` | Efeito de brilho |
| `logo.tsx` | Logo do Roberto Navarro |
| `scroll-animation.tsx` | Animação de scroll |
| `universal-page.tsx` | Renderizador de páginas universais (Sanity) |
| `whatsapp-button.tsx` | Botão do WhatsApp com captura de lead |

**Quando usar**: Qualquer lugar que precise desses componentes genéricos.

## 📁 `/components/ui/`

Componentes primitivos do shadcn/ui.

50+ componentes UI:
- `button.tsx`, `input.tsx`, `dialog.tsx`, etc.
- Componentes base para construir a interface
- Seguem design system do Radix UI

**Quando usar**: Building blocks para criar novos componentes.

## 🎯 Guia de Uso

### Exemplo: Criar uma Landing Page de Evento

```tsx
// app/eventos/novo-evento/page.tsx
import { HeroCountdown } from '@/components/events/hero-countdown'
import { LocationMap } from '@/components/events/location-map'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { PricingSection } from '@/components/marketing/pricing-section'
import { NewsletterFormacoes } from '@/components/forms/newsletter-formacoes'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'

export default function NovoEventoPage() {
  return (
    <>
      <Header />
      <HeroCountdown />
      <TestimonialsSection />
      <LocationMap />
      <PricingSection />
      <NewsletterFormacoes source="Novo Evento" />
      <Footer />
      <WhatsAppButton source="Novo Evento" />
    </>
  )
}
```

### Exemplo: Criar uma Página Admin

```tsx
// app/admin/novo-recurso/page.tsx
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { Button } from '@/components/ui/button'

export default function NovoRecursoPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main>
        <DashboardStats />
        <Button>Nova Ação</Button>
      </main>
    </div>
  )
}
```

## 📊 Estatísticas

- **Total de componentes**: ~110
- **Componentes Admin**: 11
- **Componentes Events**: 9
- **Componentes Forms**: 3
- **Componentes Layout**: 5
- **Componentes Marketing**: 13
- **Componentes Products**: 5
- **Componentes Seals**: 2
- **Componentes Shared**: 8
- **Componentes UI**: 50+

## 🔄 Migrando Imports Antigos

Se você encontrar imports antigos, atualize conforme:

### Antes (Raiz do /components)
```tsx
import { Header } from '@/components/header'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import { TestimonialsSection } from '@/components/testimonials-section'
```

### Depois (Organizado por categoria)
```tsx
import { Header } from '@/components/layout/header'
import { NewsletterFormacoes } from '@/components/forms/newsletter-formacoes'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
```

## 🎨 Convenções

1. **Nomes**: PascalCase para componentes
2. **Arquivos**: kebab-case para arquivos
3. **Exports**: Named exports preferidos
4. **Props**: Interface com sufixo `Props`
5. **Tipos**: Colocados no mesmo arquivo quando específicos

---

**Última atualização**: Outubro 2025

