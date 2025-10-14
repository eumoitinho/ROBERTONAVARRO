# Sanity Content Inventory (2025-10-08)

## 1. Current data sources and CMS footprint

| Source | Usage | Notes |
| --- | --- | --- |
| `lib/basehub/client.ts`, `lib/basehub/queries.ts`, `lib/basehub/fallback-data.ts` | Blog listing and post detail under `app/blog` | Live data via Basehub token with large static fallback. Needs full replacement with Sanity datasets (`post`, `category`, `author`) and GROQ queries. |
| `lib/blog-data.ts` | Massive hardcoded JSON for blog fallbacks | Becomes obsolete after migrating to Sanity. Serves as seed content candidate. |
| Static React files in `app/**/page.tsx` | All marketing, eventos, formações, livros, obrigado, etc. | Copy-heavy sections embedded directly in components; must be externalized to Sanity documents/sections. |
| Shared components (`components/*.tsx`) | Some contain static copy (e.g. `testimonials-section`, `notable-persons`, `newsletter-formacoes`) | Either convert to parameterized components fed by Sanity or transform into portable text blocks. |
| API routes (`app/api/**`) & Admin pages (`app/admin/**`) | Mostly functional (forms, dashboards) | No marketing copy; keep as-is except for references to product IDs/texts that might move to Sanity later. |

## 2. Page-level content inventory

### 2.1 Home (`app/page.tsx`)
- **Hero**: Highlight badge, title gradient text, subtitle, description, CTA label/target, stats bubble (number + label).
- **Formações grid** (8 cards): Title, description, CTA label + internal link per formação.
- **Quem Somos / Testimonials / Videos / Location / Footer**: Provided via shared components but currently static. Need Sanity collections for testimonials, video gallery, map copy, footer links, WhatsApp banner.
- **Event popup**: Currently disabled; popup content should be externalized if re-enabled.

### 2.2 Blog (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`)
- Listing filters: category list, search placeholder text, empty-state messages.
- Card data: title, excerpt, hero image, category, author, date, reading time.
- Detail page: hero image alt text, body HTML, metadata (category, author, publishedAt), CTA labels.
- Requires Sanity schemas: `blogPost`, `blogCategory`, `author`, optional `readingTime` field or compute automatically.

### 2.3 Formações (`app/formacoes/*/page.tsx`)
- Pages: `mentoria`, `mentoria-de-investimentos`, `mentoria-individual`, `mentor-coaching-financeiro`, `educador-financeiro`, `lcf-mentoring-pro`, `empreendedor-inteligente`, `metodo-tf`, `rota-mind`.
- Common structure via components:
  - `HeroPages` props: title, subtitle, secondary title, description, hero image, primary/secondary CTA labels & anchors.
  - Section badges & headings (strings) for highlights, benefits, modules, bonuses.
  - Rich lists (arrays of cards with icon, label, description) defined inline per page.
  - FAQ-style accordions, testimonials, callouts with CTA button text.
  - In some pages, pricing summaries and schedule information (dates, locations, guarantee statements).
- Recommend modeling a generic `training` document with nested `sections` (portable text or union types) to cover repeated blocks: hero, stats grid, modules list, bonus list, CTA, testimonials references.

### 2.4 Eventos (`app/eventos/*/page.tsx`)
- Pages: `segredos-da-mente-milionaria`, `energia-do-dinheiro`, `mentor-milionario`, `crencas-da-riqueza`, `escalador-de-negocios`.
- Content blocks similar to `training` but include:
  - Ticket tiers array with price, benefits, Eduzz product IDs (should stay editable for ops).
  - Event logistics: date, venue, agenda breakdown, speakers.
  - Enrollment CTA texts, form copy, success/error messages.
- Need an `event` schema with nested sub-documents for `ticketType`, `benefit`, `module`, etc. Keep integration fields (Eduzz IDs) as strings in the schema.

### 2.5 Livros (`app/livros/**`)
- `app/livros/page.tsx`: hero copy, list of featured books, CTA texts.
- Individual book pages: hero (title, subtitle, cover image), description sections, chapter highlights, testimonials, CTA buttons linking to purchase.
- Suggest `book` schema supporting hero, summary, sections (rich text), testimonials, CTA group.

### 2.6 LPs e Variações
- `app/lp/mes-da-independencia/page.tsx`: dedicated landing page with hero, benefit list, bonus grid, schedule, FAQ, testimonials, CTA.
- `app/lives/page.tsx`: hero + upcoming lives, CTA to register.
- `app/inscricao/**`: confirmation page copy, instructions, CTA for support.
- `app/obrigado/page.tsx`: thank-you hero, next steps, social links.
- `app/trabalhe-conosco/page.tsx`: hero, open positions list (currently static cards).
- `app/politica-privacidade/page.tsx`: long static markdown-like content — prefer storing as Portable Text or markdown field in Sanity.

### 2.7 Ticket verification (`app/ticket/[code]/page.tsx`) & `app/verificar/[code]/page.tsx`
- Functional pages with minimal copy (labels, error messages). Consider exposing these strings via Sanity localized `settings` documents to centralize translation.

### 2.8 Admin area (`app/admin/**`)
- UI strings currently static. Optional to leave hardcoded for now; focus on marketing/public pages first.

## 3. Shared components with embedded content

| Component | Content type | Sanity recommendation |
| --- | --- | --- |
| `components/testimonials-section.tsx` | Hardcoded testimonials (names, roles, quotes, rating) | Create `testimonial` documents in Sanity and feed component via GROQ query or reference array. |
| `components/notable-persons.tsx` | List of notable attendee logos/text | Move to `notablePerson` or `pressFeature` collection. |
| `components/hero-pages.tsx` | Presentational; depends on props | Keep component but drive props from page documents. |
| `components/event-cta-button.tsx`, `event-popup.tsx` | CTA label, disclaimers | Store copy/links in Sanity `cta` objects referenced per page. |
| `components/footer.tsx`, `components/footerlp.tsx` | Contact info, link columns, disclaimer text | Create a `footerSettings` singleton with structured links. |
| `components/header.tsx`, `components/mobile-menu.tsx` | Navigation labels | Manage via `navigationMenu` singleton (items with title, href, flags). |
| `components/newsletter-formacoes.tsx`, `newsletter-signup.tsx` | Headline, description, placeholder text, consent copy | Move to `newsletterBlock` object for reuse. |
| `components/how-works.tsx`, `knowledge-barrier-section.tsx`, etc. | Many contain static headings/descriptions/lists | Evaluate per page if kept or replaced with Sanity-driven sections.

## 4. Media assets

- Images referenced under `/public/images` and `/public/blog`. Sanity should host media (upload via Asset Pipeline) to make them editable; ensure alt text stored per asset in documents.
- QR codes, logos, icons currently under `public/` — icons may remain static; hero/cover images migrate to Sanity.

## 5. Content settings & taxonomies

- **Global settings**: site title, SEO defaults, social links, WhatsApp contact, support email. Create a `siteSettings` singleton.
- **Taxonomies**: blog categories, event categories, training modalities. Represent with dedicated documents and references to avoid string duplication.
- **CTA anchors**: Many CTAs point to in-page anchors (e.g., `#inscricao`). Preserve anchor ids within Sanity content or encode as options in sections.
- **Integrations**: Eduzz product IDs, form `eventId`, `api/inscricao` textual responses. Store as part of Sanity documents but guard through schema (e.g., slug, numeric ID fields).

## 6. Prioritization proposal (for schema rollout)

1. **Foundational singletons**: `siteSettings`, `navigationMenu`, `footerSettings`.
2. **Collections**: `testimonial`, `notablePerson`, `cta` for shared blocks.
3. **Primary documents**:
   - `blogPost`, `blogCategory`, `author` (replace Basehub).
   - `training` (covers all `formacoes` pages).
   - `event` (covers `eventos` pages + landing pages like `lp/mes-da-independencia`).
   - `book`.
4. **Supporting objects**: `heroSection`, `benefitCard`, `module`, `faqItem`, `ticketType`, `bonusItem`, `scheduleItem`, `richTextBlock`.
5. **Long-form legal**: `policy` document for privacy terms.

## 7. Open questions / clarifications needed

- Localization requirements? Currently all copy in pt-BR; confirm if future en-US is planned to design schemas with localization from the start.
- Draft/preview workflow expectations: need preview mode similar to Basehub draft? Plan for token-based preview endpoints.
- Content governance: Who will manage events vs. trainings vs. blog? Use field-level comments/hints in Sanity schemas.
- Asset re-use: Should hero images be centralized (one asset per page) or allow duplicates per section? Decide to avoid bandwidth waste.

---

This inventory completes Fase 1 do plano: todos os blocos de texto/imagem relevantes estão mapeados e categorizados para modelagem no Sanity Studio.
