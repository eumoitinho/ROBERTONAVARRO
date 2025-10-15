# 📊 Status da Integração com Sanity CMS

**Data**: Outubro 2025  
**Status**: ⚠️ **Parcialmente Integrado**

## 🎯 Visão Geral

O Sanity CMS está configurado e funcional, mas apenas **parcialmente integrado** no projeto. A maioria das páginas ainda usa conteúdo **hardcoded** (código estático).

## ✅ O que JÁ está no Sanity (100% Editável)

### 1. **Sistema de Páginas Dinâmicas** (`/app/[slug]/page.tsx`)

✅ **Totalmente integrado e funcional**

- **Rota**: Qualquer URL criada no Sanity (ex: `/sobre`, `/institucional`)
- **Componente**: `UniversalPage` (renderizador universal)
- **Editável**: 100% através do Studio

**Campos editáveis**:
- ✅ Hero (título, subtítulo, imagem de fundo, botões CTA)
- ✅ Conteúdo principal (Portable Text - editor rico)
- ✅ Seções modulares (texto, imagem, CTA, features, vídeo)
- ✅ Galeria de imagens
- ✅ Depoimentos (nome, foto, cargo, avaliação)
- ✅ FAQ (perguntas e respostas)
- ✅ SEO (meta title, description, keywords, OG image)
- ✅ Configurações (mostrar header/footer/whatsapp)

**Como usar**:
1. Acesse: `http://localhost:3000/studio`
2. Crie uma nova "Página"
3. Defina o slug (ex: `sobre`)
4. Preencha os campos
5. Publique
6. Acesse: `http://localhost:3000/sobre`

### 2. **Configurações Globais do Site**

✅ **Sistema criado no Sanity**

**Editável**:
- ✅ Nome do site
- ✅ Logo
- ✅ Tagline
- ✅ Contatos (email, phone, whatsapp, endereço)
- ✅ Redes sociais (todas)
- ✅ Menu de navegação principal
- ✅ Links do footer
- ✅ SEO global (meta tags padrão, GA, Facebook Pixel)
- ✅ Scripts customizados (header, body, CSS)

**Nota**: ⚠️ Ainda **não está sendo usado** em todas as páginas

### 3. **Sistema de Blog**

⚠️ **Parcialmente integrado com fallback**

- **Queries**: ✅ Criadas e funcionais (`lib/blog/queries.ts`)
- **Types**: ✅ Definidos (`lib/blog/client.ts`)
- **Fallback Data**: ✅ Dados estáticos como backup
- **Integração**: ⚠️ Usa fallback se Sanity falhar

**Status atual**: Blog funciona com dados hardcoded mas **preparado** para Sanity

## ❌ O que NÃO está no Sanity (Hardcoded)

### 1. **Página Principal** (`/app/page.tsx`)

❌ **100% Hardcoded** - 382 linhas

**Conteúdo fixo no código**:
- Hero section
- Badges e CTAs
- Descrições de formações
- Cards de produtos
- Depoimentos
- Estatísticas
- Tudo está em JSX estático

**Como editar hoje**: Precisa editar o código-fonte

### 2. **Páginas de Eventos** (5 páginas)

❌ **100% Hardcoded**

| Evento | Linhas | Status |
|--------|--------|--------|
| Crenças da Riqueza | 714 | ❌ Hardcoded |
| Energia do Dinheiro | 325 | ❌ Hardcoded |
| Escalador de Negócios | 300 | ❌ Hardcoded |
| Mentor Milionário | 700 | ❌ Hardcoded |
| Segredos da Mente Milionária | 294 | ❌ Hardcoded |

**Conteúdo fixo**:
- Hero com countdown
- Descrições do evento
- Benefícios e diferenciais
- Depoimentos
- Preços e tickets
- FAQ
- Palestrantes
- Vídeos de transformação
- Local e data

**Como editar hoje**: Precisa editar cada arquivo `.tsx`

### 3. **Páginas de Formações** (9 páginas)

❌ **100% Hardcoded**

| Formação | Linhas | Status |
|----------|--------|--------|
| Educador Financeiro | 1.111 | ❌ Hardcoded |
| Empreendedor Inteligente | 491 | ❌ Hardcoded |
| LCF Mentoring Pro | 424 | ❌ Hardcoded |
| Mentor Coaching Financeiro | 677 | ❌ Hardcoded |
| Mentoria de Investimentos | 461 | ❌ Hardcoded |
| Mentoria Individual | 182 | ❌ Hardcoded |
| Mentoria | 719 | ❌ Hardcoded |
| Método TF | 566 | ❌ Hardcoded |
| Rota Mind | 751 | ❌ Hardcoded |

**Conteúdo fixo**:
- Descrições completas
- Módulos do curso
- Benefícios
- Preços
- Bônus inclusos
- Garantias
- Depoimentos
- FAQ

**Como editar hoje**: Precisa editar cada arquivo `.tsx`

### 4. **Páginas de Livros** (4+ páginas)

❌ **100% Hardcoded**

- Arte de Enriquecer
- Coaching Financeiro
- Quebrando Mitos
- Sabedoria do Dinheiro
- Página principal de livros

**Conteúdo fixo**:
- Descrição dos livros
- Benefícios
- Testemunhos
- Preços
- CTAs

### 5. **Blog** (`/app/blog/`)

⚠️ **Preparado mas usando Fallback**

- Posts: ❌ Hardcoded em `lib/blog/fallback-data.ts`
- Categorias: ❌ Hardcoded
- Interface: ✅ Preparada para Sanity
- **Pode ser migrado facilmente**

### 6. **Outras Páginas**

| Página | Status |
|--------|--------|
| Landing Pages (`/lp/*`) | ❌ Hardcoded |
| Política de Privacidade | ❌ Hardcoded |
| Trabalhe Conosco | ❌ Hardcoded |
| Lives | ❌ Hardcoded |
| Obrigado | ❌ Hardcoded |

## 📊 Estatísticas Resumidas

| Categoria | Total | Sanity | Hardcoded | % Sanity |
|-----------|-------|--------|-----------|----------|
| **Homepage** | 1 | 0 | 1 | 0% |
| **Eventos** | 5 | 0 | 5 | 0% |
| **Formações** | 9 | 0 | 9 | 0% |
| **Livros** | 4 | 0 | 4 | 0% |
| **Blog** | 1 | 0.5 | 0.5 | 50% |
| **Páginas Dinâmicas** | ∞ | ✅ | 0 | 100% |
| **Landing Pages** | 1 | 0 | 1 | 0% |
| **Outras** | 6 | 0 | 6 | 0% |
| **TOTAL** | ~27 | ~1 | ~26 | **~4%** |

## 🎯 Sistema Atual

### Como Funciona Hoje:

```
┌─────────────────────┐
│   Sanity Studio     │
│  localhost:3000/    │
│      studio         │
└──────────┬──────────┘
           │
           │ Só funciona para:
           ↓
┌─────────────────────┐
│  app/[slug]/page    │  ← Páginas universais criadas no Studio
│  (UniversalPage)    │     Ex: /sobre, /contato, etc
└─────────────────────┘

┌─────────────────────┐
│  TODAS as outras    │
│  páginas (26+)      │  ← Hardcoded em TSX
│  • Eventos          │     Precisa editar código
│  • Formações        │
│  • Blog             │
│  • Livros           │
│  • Homepage         │
└─────────────────────┘
```

## 🔧 Para Editar Conteúdo Hoje

### ✅ Páginas no Sanity (Fácil)
1. Acesse `http://localhost:3000/studio`
2. Edite no visual editor
3. Publique
4. ✅ **Pronto!** Mudanças ao vivo

### ❌ Páginas Hardcoded (Difícil)
1. Abra o arquivo `.tsx` no editor de código
2. Edite o JSX manualmente
3. Salve o arquivo
4. Aguarde hot reload
5. ⚠️ Requer conhecimento técnico

## 🚀 Próximos Passos para 100% Sanity

### Fase 1: Preparar Schemas (1-2 dias)

Criar schemas específicos no Sanity:

1. **Schema de Evento** (`event.ts`)
   ```typescript
   {
     name: "event"
     fields: [
       { name: "title", type: "string" },
       { name: "slug", type: "slug" },
       { name: "date", type: "datetime" },
       { name: "location", type: "string" },
       { name: "description", type: "text" },
       { name: "benefits", type: "array" },
       { name: "speakers", type: "array" },
       { name: "tickets", type: "array" },
       { name: "faq", type: "array" },
       // ...
     ]
   }
   ```

2. **Schema de Formação** (`formation.ts`)
3. **Schema de Livro** (`book.ts`)
4. **Schema de Post de Blog** (`post.ts`)

### Fase 2: Migrar Conteúdo (2-3 dias)

1. Copiar conteúdo das páginas hardcoded
2. Criar documentos no Sanity Studio
3. Preencher todos os campos
4. Verificar preview

### Fase 3: Atualizar Páginas (3-5 dias)

Converter páginas de hardcoded para dinâmicas:

**Exemplo - Antes**:
```tsx
// app/eventos/mentor-milionario/page.tsx (700 linhas)
export default function MentorMilionario() {
  return (
    <div>
      <h1>MENTOR MILIONÁRIO</h1>
      <p>Transforme sua mentalidade...</p>
      {/* 700 linhas de JSX hardcoded */}
    </div>
  )
}
```

**Depois**:
```tsx
// app/eventos/[slug]/page.tsx (50 linhas)
export default async function EventPage({ params }) {
  const event = await getEventBySlug(params.slug)
  return <UniversalEventPage event={event} />
}
```

### Fase 4: Testar e Validar (1-2 dias)

- Testar todas as páginas migradas
- Verificar SEO
- Testar formulários
- Validar integrações

**Tempo total estimado**: 7-12 dias de trabalho

## 💡 Recomendações

### Curto Prazo (Agora)

✅ **Usar Sanity para**:
- Páginas institucionais simples (Sobre, Contato, Política)
- Novas landing pages de teste
- Conteúdo que muda frequentemente

❌ **Manter hardcoded para**:
- Eventos (layouts muito customizados)
- Formações (conteúdo complexo e estável)
- Homepage (performance crítica)

### Médio Prazo (1-2 meses)

1. Migrar **Blog** para 100% Sanity
2. Criar template de **Evento genérico** no Sanity
3. Migrar 2-3 eventos como piloto

### Longo Prazo (3-6 meses)

1. Migrar todas as formações
2. Migrar todos os eventos
3. Sistema de gestão de conteúdo 100% no Sanity

## 📋 Checklist de Migração

### Blog (Prioridade ALTA - Mais Fácil)

- [ ] Criar schema `post.ts` no Sanity
- [ ] Migrar posts de `fallback-data.ts` para Sanity
- [ ] Atualizar `lib/blog/queries.ts` para usar Sanity real
- [ ] Remover fallback após validação
- **Tempo estimado**: 2-3 dias

### Eventos (Prioridade MÉDIA - Complexo)

- [ ] Criar schema `event.ts` com todos os campos
- [ ] Criar componente `UniversalEventPage`
- [ ] Migrar 1 evento piloto (Energia do Dinheiro)
- [ ] Validar e ajustar
- [ ] Migrar os outros 4 eventos
- **Tempo estimado**: 5-7 dias

### Formações (Prioridade BAIXA - Muito Complexo)

- [ ] Criar schema `formation.ts` detalhado
- [ ] Criar componente `UniversalFormationPage`
- [ ] Migrar 1 formação piloto
- [ ] Validar vendas e conversão
- [ ] Migrar as outras 8 formações
- **Tempo estimado**: 10-15 dias

## 🔍 Como Verificar

### Ver o que está no Sanity:

```bash
# Acessar o Studio
npm run studio

# ou
http://localhost:3000/studio
```

### Testar Páginas Dinâmicas:

1. No Studio, crie uma página com slug: `teste-sanity`
2. Acesse: `http://localhost:3000/teste-sanity`
3. ✅ Se carregar → Sanity funcionando!

## 📚 Arquivos da Integração Sanity

### ✅ Configuração (Pronto)
- `/sanity/env.ts` - Variáveis de ambiente
- `/sanity/lib/client.ts` - Cliente Sanity
- `/sanity.config.ts` - Configuração do Studio
- `/sanity.cli.js` - CLI config

### ✅ Schemas (Pronto para Páginas Universais)
- `/sanity/schemaTypes/page.ts` - Schema de página universal
- `/sanity/schemaTypes/siteSettings.ts` - Configurações globais
- `/sanity/schemaTypes/index.ts` - Index dos schemas

### ✅ Queries e API (Pronto)
- `/sanity/lib/queries.ts` - Queries GROQ
- `/sanity/lib/api.ts` - Funções de busca
- `/sanity/lib/image.ts` - Helper de imagens
- `/sanity/types.ts` - Tipos TypeScript

### ✅ Componentes (Pronto)
- `/components/shared/universal-page.tsx` - Renderizador universal

### ⚠️ Blog (Preparado mas não usando)
- `/lib/blog/client.ts` - ✅ Interface pronta
- `/lib/blog/queries.ts` - ⚠️ Retorna fallback, não Sanity
- `/lib/blog/fallback-data.ts` - ❌ Dados hardcoded (473 linhas)

## 🎨 Schemas Disponíveis no Studio

Quando você acessa `http://localhost:3000/studio`, vê:

1. ✅ **Página** - Criar páginas universais
2. ✅ **Configurações do Site** - Settings globais
3. ❌ **Evento** - Não criado ainda
4. ❌ **Formação** - Não criado ainda
5. ❌ **Livro** - Não criado ainda
6. ❌ **Post** - Não criado ainda

## 💰 Custo x Benefício da Migração

### Manter Hardcoded

**Vantagens**:
- ✅ Controle total do layout
- ✅ Performance otimizada
- ✅ Sem custo de hospedagem CMS
- ✅ Funciona offline

**Desvantagens**:
- ❌ Precisa de dev para qualquer mudança
- ❌ Não tem preview visual
- ❌ Risco de bugs ao editar
- ❌ Tempo de deploy para mudanças simples

### Migrar para Sanity

**Vantagens**:
- ✅ Editor visual não-técnico
- ✅ Preview em tempo real
- ✅ Versionamento de conteúdo
- ✅ Múltiplos editores simultâneos
- ✅ API GraphQL/GROQ
- ✅ Imagens otimizadas automaticamente

**Desvantagens**:
- ❌ Custo de hospedagem (grátis até 3 usuários)
- ❌ Tempo de migração inicial
- ❌ Dependência de serviço externo
- ❌ Curva de aprendizado para editores

## 🎯 Recomendação Estratégica

### Agora (Imediato)

1. ✅ **Usar Sanity para**: Páginas institucionais simples
2. ✅ **Manter hardcoded**: Eventos e formações (conteúdo estável)
3. 🔄 **Migrar primeiro**: Blog (mais simples e muda frequentemente)

### Próximos 30 dias

1. Migrar Blog 100% para Sanity
2. Testar com posts reais
3. Treinar equipe para usar o Studio

### Próximos 90 dias

1. Criar schema de Evento
2. Migrar 1-2 eventos piloto
3. Avaliar se vale a pena migrar todos

## 📝 Como Migrar o Blog (Guia Rápido)

### 1. Criar Schema de Post

```bash
# Criar arquivo
touch sanity/schemaTypes/post.ts
```

```typescript
// sanity/schemaTypes/post.ts
export default {
  name: 'post',
  title: 'Post do Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'slug', type: 'slug', title: 'URL' },
    { name: 'excerpt', type: 'text', title: 'Resumo' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
    { name: 'coverImage', type: 'image', title: 'Imagem de Capa' },
    { name: 'category', type: 'string', title: 'Categoria' },
    { name: 'author', type: 'string', title: 'Autor' },
    { name: 'publishedAt', type: 'datetime', title: 'Data de Publicação' },
  ]
}
```

### 2. Adicionar ao Index

```typescript
// sanity/schemaTypes/index.ts
import post from './post'

export const schemaTypes = [page, siteSettings, post]
```

### 3. Atualizar Queries

```typescript
// lib/blog/queries.ts - mudar para buscar do Sanity real
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch(groq`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, content, 
      coverImage, category, author, publishedAt
    }
  `)
  return posts
}
```

## 🆘 Suporte

Para configurar ou migrar para Sanity:

1. **Documentação**: `/docs/SANITY_SETUP_GUIDE.md`
2. **Status**: Este arquivo
3. **Guia oficial**: https://www.sanity.io/docs

---

**Resumo**: Sanity está configurado e funcional, mas apenas 4% do conteúdo está usando. A maioria permanece hardcoded para controle total e performance.

