# Migração do Sanity para BaseHub

Este documento descreve a migração do blog de Sanity CMS para BaseHub.

## O que foi migrado

### Blog Posts
- ✅ Listagem de posts (`/blog`)
- ✅ Página individual de posts (`/blog/[slug]`)
- ✅ Sistema de categorias
- ✅ Sistema de busca
- ✅ Dados de fallback para quando o BaseHub não está configurado

### Estrutura de dados BaseHub

Os posts no BaseHub devem ter a seguinte estrutura:

```typescript
interface BlogPost {
  _id: string;
  _title: string;
  slug: string;
  excerpt: string;
  content: {
    raw: string;
    html: string;
  };
  coverImage?: {
    url: string;
    alt?: string;
  };
  publishedAt: string;
  author?: string;
  category?: string;
  readingTime?: number;
}
```

## Como configurar

### 1. Configure o BaseHub Token

Adicione sua chave do BaseHub no arquivo `.env.local`:

```env
BASEHUB_TOKEN=your_basehub_token_here
```

### 2. Estrutura do BaseHub

Crie uma coleção chamada `blog` no BaseHub com os seguintes campos:

- `_title` (Text): Título do post
- `slug` (Text): URL slug único
- `excerpt` (Text): Resumo do post
- `content` (Rich Text): Conteúdo completo do post
- `coverImage` (Image): Imagem de capa (opcional)
- `publishedAt` (Date): Data de publicação
- `author` (Text): Nome do autor
- `category` (Text): Categoria do post
- `readingTime` (Number): Tempo de leitura em minutos

### 3. Categorias

Opcionalmente, crie uma coleção `blogCategories` para gerenciar categorias:

- `_title` (Text): Nome da categoria
- `slug` (Text): URL slug da categoria

## Sistema de Fallback

O sistema inclui posts estáticos de fallback que são exibidos quando:
- O BaseHub não está configurado
- A API do BaseHub está indisponível
- Não há posts no BaseHub

Isso garante que o blog sempre funcione, mesmo sem configuração externa.

## Arquivos modificados

### Criados:
- `lib/basehub/client.ts` - Cliente e tipos do BaseHub
- `lib/basehub/queries.ts` - Queries para buscar dados
- `lib/basehub/fallback-data.ts` - Dados estáticos de fallback

### Modificados:
- `app/blog/page.tsx` - Página de listagem do blog
- `app/blog/[slug]/page.tsx` - Página individual do post
- `.env.local` - Variáveis de ambiente

## Próximos passos

1. Configure sua conta no BaseHub
2. Crie as coleções necessárias
3. Adicione o token no `.env.local`
4. Publique seus primeiros posts
5. Remova as dependências do Sanity quando estiver satisfeito

## Remoção do Sanity

Para remover completamente o Sanity:

```bash
npm uninstall @sanity/client @sanity/image-url @sanity/vision next-sanity sanity sanity-plugin-media
```

Depois remova:
- Pasta `sanity/`
- Arquivos em `lib/sanity/`
- Componentes em `components/sanity/`
- Scripts do Sanity no `package.json`