# 🔄 Guia de Migração de Imports

Este guia ajuda a atualizar imports após a reorganização do repositório.

## 📦 Componentes

### Admin
```tsx
// ❌ Antes
import { AdminSidebar } from '@/components/admin-sidebar'
import { DashboardChart } from '@/components/dashboard-chart'
import { DashboardStats } from '@/components/dashboard-stats'
import { EventSettingsForm } from '@/components/event-settings-form'
import { LoginForm } from '@/components/login-form'
import { QrcodeScanner } from '@/components/qrcode-scanner'
import { RegistrationForm } from '@/components/registration-form'
import { RegistrationsList } from '@/components/registrations-list'
import { SystemSettingsForm } from '@/components/system-settings-form'
import { UserSettingsForm } from '@/components/user-settings-form'
import { VerifyTicket } from '@/components/verify-ticket'

// ✅ Depois
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { DashboardChart } from '@/components/admin/dashboard-chart'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { EventSettingsForm } from '@/components/admin/event-settings-form'
import { LoginForm } from '@/components/admin/login-form'
import { QrcodeScanner } from '@/components/admin/qrcode-scanner'
import { RegistrationForm } from '@/components/admin/registration-form'
import { RegistrationsList } from '@/components/admin/registrations-list'
import { SystemSettingsForm } from '@/components/admin/system-settings-form'
import { UserSettingsForm } from '@/components/admin/user-settings-form'
import { VerifyTicket } from '@/components/admin/verify-ticket'
```

### Events
```tsx
// ❌ Antes
import { EventCTAButton } from '@/components/event-cta-button'
import { EventPopup } from '@/components/event-popup'
import { EventRegistrationButton } from '@/components/event-registration-button'
import { HeroCountdown } from '@/components/hero-countdown'
import { HeroPages } from '@/components/hero-pages'
import { HeroPagesRed } from '@/components/hero-pages-red'
import { LocationMap } from '@/components/location-map'
import NotableParticipants from '@/components/notable-persons'
import { TicketPricingCards } from '@/components/ticket-pricing-cards'

// ✅ Depois
import { EventCTAButton } from '@/components/events/event-cta-button'
import { EventPopup } from '@/components/events/event-popup'
import { EventRegistrationButton } from '@/components/events/event-registration-button'
import { HeroCountdown } from '@/components/events/hero-countdown'
import { HeroPages } from '@/components/events/hero-pages'
import { HeroPagesRed } from '@/components/events/hero-pages-red'
import { LocationMap } from '@/components/events/location-map'
import NotableParticipants from '@/components/events/notable-persons'
import { TicketPricingCards } from '@/components/events/ticket-pricing-cards'
```

### Forms
```tsx
// ❌ Antes
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { UTMTracker } from '@/components/utm-tracker'

// ✅ Depois
import { NewsletterFormacoes } from '@/components/forms/newsletter-formacoes'
import { NewsletterSignup } from '@/components/forms/newsletter-signup'
import { UTMTracker } from '@/components/forms/utm-tracker'
```

### Layout
```tsx
// ❌ Antes
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import FooterLP from '@/components/footerlp'
import { MobileMenu } from '@/components/mobile-menu'
import { ThemeProvider } from '@/components/theme-provider'

// ✅ Depois
import { SiteHeader } from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import FooterLP from '@/components/layout/footerlp'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { ThemeProvider } from '@/components/layout/theme-provider'
```

### Marketing
```tsx
// ❌ Antes
import { ContentSection } from '@/components/content-section'
import { FinalCTASection } from '@/components/final-cta-section'
import { HowWorks } from '@/components/how-works'
import { KnowledgeBarrierSection } from '@/components/knowledge-barrier-section'
import MentorSection from '@/components/mentor'
import { MentorsSection } from '@/components/mentors-section'
import { ParallaxSection } from '@/components/parallax-section'
import { PricingSection } from '@/components/pricing-section'
import { SectionBadge } from '@/components/section-badge'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import { TestimonialsSection } from '@/components/testimonials-section'
import { TrainingSection } from '@/components/training-section'
import TransformationVideos from '@/components/transformation-videos'

// ✅ Depois
import { ContentSection } from '@/components/marketing/content-section'
import { FinalCTASection } from '@/components/marketing/final-cta-section'
import { HowWorks } from '@/components/marketing/how-works'
import { KnowledgeBarrierSection } from '@/components/marketing/knowledge-barrier-section'
import MentorSection from '@/components/marketing/mentor'
import { MentorsSection } from '@/components/marketing/mentors-section'
import { ParallaxSection } from '@/components/marketing/parallax-section'
import { PricingSection } from '@/components/marketing/pricing-section'
import { SectionBadge } from '@/components/marketing/section-badge'
import { TestimonialsLivros } from '@/components/marketing/testimonials-livros'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { TrainingSection } from '@/components/marketing/training-section'
import TransformationVideos from '@/components/marketing/transformation-videos'
```

### Products
```tsx
// ❌ Antes
import { CardProduct } from '@/components/card-product'
import { ProductKitDisplay } from '@/components/product-kit-display'
import { IntelligenceCard } from '@/components/intelligence-card'
import { TicketCard } from '@/components/ticket-card'
import { TicketPurchaseForm } from '@/components/ticket-purchase-form'

// ✅ Depois
import { CardProduct } from '@/components/products/card-product'
import { ProductKitDisplay } from '@/components/products/product-kit-display'
import { IntelligenceCard } from '@/components/products/intelligence-card'
import { TicketCard } from '@/components/products/ticket-card'
import { TicketPurchaseForm } from '@/components/products/ticket-purchase-form'
```

### Seals
```tsx
// ❌ Antes
import { RAVerifiedSeals } from '@/components/ra-verified-seals'
import { ReclameAquiSeal } from '@/components/reclame-aqui-seal'

// ✅ Depois
import { RAVerifiedSeals } from '@/components/seals/ra-verified-seals'
import { ReclameAquiSeal } from '@/components/seals/reclame-aqui-seal'
```

### Shared
```tsx
// ❌ Antes
import { CountdownTimer } from '@/components/countdown-timer'
import { EnhancedButton } from '@/components/enhanced-button'
import { FloatingWhatsapp } from '@/components/floating-whatsapp'
import { GlowEffect } from '@/components/glow-effect'
import { Logo } from '@/components/logo'
import { ScrollAnimation } from '@/components/scroll-animation'
import UniversalPage from '@/components/universal-page'
import WhatsAppButton from '@/components/whatsapp-button'

// ✅ Depois
import { CountdownTimer } from '@/components/shared/countdown-timer'
import { EnhancedButton } from '@/components/shared/enhanced-button'
import { FloatingWhatsapp } from '@/components/shared/floating-whatsapp'
import { GlowEffect } from '@/components/shared/glow-effect'
import { Logo } from '@/components/shared/logo'
import { ScrollAnimation } from '@/components/shared/scroll-animation'
import UniversalPage from '@/components/shared/universal-page'
import WhatsAppButton from '@/components/shared/whatsapp-button'
```

### UI (Inalterado)
```tsx
// ✅ Continua igual
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
```

## 📚 Lib

### API
```tsx
// ❌ Antes
import { eduzzApi } from '@/lib/eduzz-api'
import { eduzzAuth } from '@/lib/eduzz-auth'
import type { EduzzTypes } from '@/lib/eduzz-types'

// ✅ Depois
import { eduzzApi } from '@/lib/api/eduzz-api'
import { eduzzAuth } from '@/lib/api/eduzz-auth'
import type { EduzzTypes } from '@/lib/api/eduzz-types'
```

### Blog (Inalterado)
```tsx
// ✅ Continua igual
import { blogClient } from '@/lib/blog/client'
import { fallbackBlogPosts } from '@/lib/blog/fallback-data'
import { getAllPosts } from '@/lib/blog/queries'
```

### Database
```tsx
// ❌ Antes
import { db, sql } from '@/lib/db'

// ✅ Depois
import { db, sql } from '@/lib/database/db'
```

### Services
```tsx
// ❌ Antes
import { submitLead } from '@/lib/actions'
import { verifyAuth } from '@/lib/auth'
import { generateTicket } from '@/lib/ticket'

// ✅ Depois
import { submitLead } from '@/lib/services/actions'
import { verifyAuth } from '@/lib/services/auth'
import { generateTicket } from '@/lib/services/ticket'
```

### Templates
```tsx
// ❌ Antes
import { ticketTemplates } from '@/lib/ticket-templates'

// ✅ Depois
import { ticketTemplates } from '@/lib/templates/ticket-templates'
```

### Tracking
```tsx
// ❌ Antes
import { trackPixel } from '@/lib/meta-pixel'
import { getUTMParameters } from '@/lib/utm-tracker'

// ✅ Depois
import { trackPixel } from '@/lib/tracking/meta-pixel'
import { getUTMParameters } from '@/lib/tracking/utm-tracker'
```

### Utils (Inalterado)
```tsx
// ✅ Continua igual
import { cn, formatDate } from '@/lib/utils'
```

## 🪝 Hooks (Inalterado, mas sem duplicatas)

```tsx
// ✅ Continua igual
import { useClickOutside } from '@/hooks/use-click-outside'
import { useIsMobile } from '@/hooks/use-mobile'
import { useScrollTrigger } from '@/hooks/use-scroll-trigger'
import { useToast } from '@/hooks/use-toast'
```

## 🔍 Como Encontrar e Substituir

### VS Code / Cursor

Use **Find and Replace** (`Ctrl/Cmd + Shift + H`):

1. **Componentes Admin**:
   - Find: `from '@/components/(admin-sidebar|dashboard-chart|dashboard-stats|event-settings-form|login-form|qrcode-scanner|registration-form|registrations-list|system-settings-form|user-settings-form|verify-ticket)'`
   - Replace: `from '@/components/admin/$1'`
   - ✅ Use Regex

2. **Services**:
   - Find: `from '@/lib/(actions|auth|ticket)'`
   - Replace: `from '@/lib/services/$1'`
   - ✅ Use Regex

3. **Database**:
   - Find: `from '@/lib/db'`
   - Replace: `from '@/lib/database/db'`

## ⚠️ Atenção Especial

### Arquivos que Precisam de Atualização

Todos os arquivos em:
- `/app/eventos/**/*.tsx`
- `/app/formacoes/**/*.tsx`
- `/app/livros/**/*.tsx`
- `/app/admin/**/*.tsx`
- `/app/lp/**/*.tsx`

### Prioridade Alta

1. Páginas de eventos (muitos imports de components/events)
2. Páginas admin (imports de components/admin)
3. API routes (imports de lib/services)

## ✅ Checklist de Migração

- [ ] Atualizar imports de componentes admin
- [ ] Atualizar imports de componentes events
- [ ] Atualizar imports de componentes forms
- [ ] Atualizar imports de componentes layout
- [ ] Atualizar imports de componentes marketing
- [ ] Atualizar imports de componentes products
- [ ] Atualizar imports de componentes seals
- [ ] Atualizar imports de componentes shared
- [ ] Atualizar imports de lib/api
- [ ] Atualizar imports de lib/database
- [ ] Atualizar imports de lib/services
- [ ] Atualizar imports de lib/templates
- [ ] Atualizar imports de lib/tracking
- [ ] Testar build: `npm run build`
- [ ] Testar em dev: `npm run dev`
- [ ] Verificar todas as páginas principais

## 🚀 Scripts Auxiliares

### Contar imports antigos restantes:
```bash
grep -r "from '@/components/header'" app/ | wc -l
grep -r "from '@/lib/actions'" app/ | wc -l
```

### Listar arquivos com imports antigos:
```bash
grep -r "from '@/components/[a-z]" app/ --include="*.tsx" -l
```

## 💡 Dica

Use o **autocompletar** do TypeScript! Ele sugerirá os novos caminhos automaticamente quando você digitar:

```tsx
import { Header } from '@/components/layout/
//                                        ^ autocomplete aqui
```

---

**Boa migração!** 🎉

Se encontrar problemas, consulte `/docs/COMPONENT_STRUCTURE.md` para referência completa.

