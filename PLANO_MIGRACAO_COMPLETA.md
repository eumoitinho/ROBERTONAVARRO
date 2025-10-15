# 📋 PLANO DE MIGRAÇÃO COMPLETA - TODAS AS PÁGINAS PARA SANITY

## 🎯 OBJETIVO

Tornar **TODAS as páginas do projeto** 100% editáveis via Sanity CMS, seguindo o padrão da homepage.

---

## 📊 ANÁLISE DAS PÁGINAS

### Total: 37 páginas encontradas

### Categorização:

#### 🟢 PRIORIDADE ALTA (Conteúdo Público)
**19 páginas que precisam ser editáveis**

| Categoria | Quantidade | Páginas |
|-----------|------------|---------|
| **Eventos** | 5 | Crenças da Riqueza, Energia do Dinheiro, Escalador de Negócios, Mentor Milionário, Segredos da Mente Milionária |
| **Formações** | 9 | Educador Financeiro, Empreendedor Inteligente, LCF Mentoring Pro, Mentor Coaching, Mentoria, Mentoria de Investimentos, Mentoria Individual, Método TF, Rota Mind |
| **Livros** | 5 | Arte de Enriquecer, Coaching Financeiro, Quebrando Mitos, Sabedoria do Dinheiro, Página Principal de Livros |

#### 🟡 PRIORIDADE MÉDIA (Páginas Únicas)
**6 páginas de conteúdo institucional**

| Página | Status |
|--------|--------|
| Lives | Conteúdo de vídeos |
| Trabalhe Conosco | Formulário + conteúdo |
| Política de Privacidade | Texto legal |
| LP - Mês da Independência | Landing page |
| Obrigado | Página de confirmação |
| Home | ✅ **JÁ FEITO!** |

#### 🔵 PRIORIDADE BAIXA (Dinâmicas)
**2 páginas já parcialmente integradas**

| Página | Status |
|--------|--------|
| Blog (lista) | Parcialmente no Sanity |
| Blog [slug] | Parcialmente no Sanity |

#### ⚫ NÃO MIGRAR (Páginas de Sistema)
**10 páginas que não precisam Sanity**

- Admin (5 páginas: login, dashboard, check-in, inscrições, configurações)
- Inscrição + Confirmação
- Ticket + Verificar
- [slug] (páginas dinâmicas genéricas - já usa Sanity)
- Studio (Sanity Studio próprio)

---

## 🏗️ ESTRUTURA DE SCHEMAS A CRIAR

### 1. **EventPage** (para todas as páginas de eventos)
```typescript
{
  _type: 'eventPage',
  slug: 'crencas-da-riqueza',
  title: 'Crenças da Riqueza',
  hero: { /* Hero Section */ },
  about: { /* Sobre o Evento */ },
  benefits: [ /* Lista de Benefícios */ ],
  pricing: { /* Ingressos */ },
  testimonials: [ /* Depoimentos */ ],
  location: { /* Local */ },
  faq: [ /* Perguntas Frequentes */ ],
  seo: { /* SEO */ }
}
```

### 2. **TrainingPage** (para todas as páginas de formações)
```typescript
{
  _type: 'trainingPage',
  slug: 'educador-financeiro',
  title: 'Educador Financeiro',
  hero: { /* Hero Section */ },
  description: { /* Descrição */ },
  curriculum: [ /* Grade Curricular */ ],
  benefits: [ /* Benefícios */ ],
  pricing: { /* Valores */ },
  testimonials: [ /* Depoimentos */ },
  faq: [ /* FAQ */ ],
  seo: { /* SEO */ }
}
```

### 3. **BookPage** (para todas as páginas de livros)
```typescript
{
  _type: 'bookPage',
  slug: 'arte-de-enriquecer',
  title: 'A Arte de Enriquecer',
  cover: { /* Capa do Livro */ },
  description: { /* Descrição */ },
  author: { /* Autor */ },
  chapters: [ /* Capítulos */ ],
  testimonials: [ /* Depoimentos */ ],
  purchase: { /* Links de Compra */ },
  seo: { /* SEO */ }
}
```

### 4. **SimplePage** (para páginas únicas)
```typescript
{
  _type: 'simplePage',
  slug: 'lives' | 'trabalhe-conosco' | 'politica-privacidade',
  title: string,
  hero: { /* Hero Section */ },
  content: [ /* Blocos de Conteúdo */ ],
  cta: { /* Call to Action */ },
  seo: { /* SEO */ }
}
```

### 5. **LandingPage** (para LPs)
```typescript
{
  _type: 'landingPage',
  slug: 'mes-da-independencia',
  sections: [ /* Seções Customizáveis */ ],
  seo: { /* SEO */ }
}
```

---

## 📅 CRONOGRAMA ESTIMADO

### Fase 1: Setup e Estrutura (2-3 horas)
- [x] Analisar páginas existentes
- [ ] Criar schemas base no Sanity
- [ ] Criar interfaces TypeScript
- [ ] Configurar APIs de busca

### Fase 2: Eventos (3-4 horas)
- [ ] Schema EventPage
- [ ] Componentes editáveis
- [ ] Migrar 5 páginas de eventos
- [ ] Popular com conteúdo atual

### Fase 3: Formações (4-5 horas)
- [ ] Schema TrainingPage
- [ ] Componentes editáveis
- [ ] Migrar 9 páginas de formações
- [ ] Popular com conteúdo atual

### Fase 4: Livros (2-3 horas)
- [ ] Schema BookPage
- [ ] Componentes editáveis
- [ ] Migrar 5 páginas de livros
- [ ] Popular com conteúdo atual

### Fase 5: Páginas Únicas (2-3 horas)
- [ ] Schema SimplePage
- [ ] Migrar Lives, Trabalhe, Política
- [ ] Popular com conteúdo atual

### Fase 6: Landing Pages (1-2 horas)
- [ ] Schema LandingPage
- [ ] Migrar LP
- [ ] Popular com conteúdo atual

### Fase 7: Finalização (2-3 horas)
- [ ] Atualizar webhooks
- [ ] Documentação completa
- [ ] Testes finais
- [ ] Script de população em massa

**TOTAL ESTIMADO: 16-23 horas de trabalho**

---

## 🎯 ESTRATÉGIA DE IMPLEMENTAÇÃO

### Opção 1: Migração Total Imediata
Migrar todas as páginas de uma vez

**Prós:**
✅ Tudo fica editável rapidamente
✅ Padrão único em todo o projeto

**Contras:**
❌ Trabalho muito extenso
❌ Risco de bugs em múltiplas páginas
❌ Difícil de testar tudo

### Opção 2: Migração Gradual por Categoria ⭐ **RECOMENDADO**
Migrar categoria por categoria

**Prós:**
✅ Mais fácil de testar
✅ Menor risco
✅ Pode priorizar o que é mais importante
✅ Aprende com cada categoria

**Contras:**
❌ Leva mais tempo total
❌ Duas fontes de dados (código + Sanity) temporariamente

### Opção 3: Migração Sob Demanda
Migrar apenas quando solicitado

**Prós:**
✅ Trabalho distribuído
✅ Foco no que é necessário

**Contras:**
❌ Projeto fica inconsistente
❌ Mais difícil de manter

---

## 🚀 INÍCIO RECOMENDADO

### Passo 1: Escolher Estratégia
**Recomendo: Opção 2 (Migração Gradual)**

Ordem sugerida:
1. ✅ **Homepage** (já feito!)
2. 🟢 **Eventos** (5 páginas - similar entre si)
3. 🟢 **Formações** (9 páginas - similar entre si)
4. 🟢 **Livros** (5 páginas - similar entre si)
5. 🟡 **Páginas Únicas** (6 páginas)
6. 🟡 **Landing Pages** (1 página)

### Passo 2: Criar Schema Base
Começar com EventPage (eventos) como teste

### Passo 3: Migrar Uma Página de Teste
Migrar "Crenças da Riqueza" primeiro

### Passo 4: Se funcionar bem
Replicar para os outros 4 eventos

### Passo 5: Próxima Categoria
Passar para Formações

---

## 📊 BENEFÍCIOS DA MIGRAÇÃO COMPLETA

### Para Editores de Conteúdo:
✅ **100% editável** - Tudo no Sanity Studio
✅ **Consistência** - Mesmo padrão em todas as páginas
✅ **Produtividade** - Mudar qualquer página rapidamente
✅ **Sem código** - Zero necessidade de mexer em código

### Para Desenvolvedores:
✅ **Manutenção** - Menos código para manter
✅ **Escalabilidade** - Fácil adicionar novas páginas
✅ **Reuso** - Componentes reutilizáveis
✅ **Type-safe** - TypeScript em tudo

### Para o Projeto:
✅ **Profissional** - CMS robusto e moderno
✅ **Performance** - ISR + Webhooks
✅ **SEO** - Controle total via Sanity
✅ **Futuro** - Fácil evoluir

---

## 💡 RECOMENDAÇÃO FINAL

### 🎯 COMEÇAR POR:

**1. EVENTOS (5 páginas)**

**Por quê?**
- São páginas similares entre si
- Conteúdo importante do site
- Serve como template para outras categorias
- Relativamente rápido (3-4 horas)

**Como?**
1. Criar schema `eventPage`
2. Migrar "Crenças da Riqueza" (teste)
3. Se funcionar bem, migrar os outros 4
4. Popular com conteúdo atual

**Depois:**
- Formações (maior categoria, mas segue padrão similar)
- Livros (mais simples)
- Páginas únicas
- Landing pages

---

## ❓ PRÓXIMOS PASSOS

### Aguardando Decisão:

1. **Qual estratégia seguir?**
   - Migração Total Imediata
   - Migração Gradual ⭐ (recomendado)
   - Migração Sob Demanda

2. **Por onde começar?**
   - Eventos ⭐ (recomendado)
   - Formações
   - Livros
   - Outro?

3. **Nível de prioridade?**
   - Urgente (fazer tudo rápido)
   - Normal (gradual, testando bem)
   - Baixa (quando tiver tempo)

---

**Aguardando sua decisão para começar! 🚀**

O que você prefere?

