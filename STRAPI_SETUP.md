# 🚀 Guia de Migração para Strapi CMS

## 📋 Visão Geral

Este projeto foi adaptado para usar **Strapi CMS** como sistema de gerenciamento de conteúdo. Todos os textos e imagens agora podem ser editados através do painel administrativo do Strapi, mantendo o design e layout inalterados.

## ✅ O que foi feito

1. ✅ **JSON de conteúdo extraído** - `strapi-content-export.json`
2. ✅ **Cliente Strapi criado** - `lib/strapi/client.ts`
3. ✅ **Queries e helpers** - `lib/strapi/queries.ts`
4. ✅ **Componentes adaptados** - Páginas agora recebem dados via props
5. ✅ **Design preservado** - Nenhuma alteração visual

## 🔧 Instalação do Strapi

### 1. Instalar Strapi

```bash
npx create-strapi-app@latest strapi-cms --quickstart
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` no diretório do Strapi:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

### 3. Configurar CORS

Em `config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 📦 Estrutura de Content Types

### Page (Página)

Crie um Content Type chamado **Page** com os seguintes campos:

#### Campos Básicos
- **slug** (Text) - Slug único da página
- **route** (Text) - Rota da página (ex: `/`, `/eventos/mentor-milionario`)
- **type** (Enumeration) - Tipo de página:
  - `home`
  - `event`
  - `formation`
  - `book`
  - `book-list`
  - `blog`
  - `landing`
  - `page`

#### Hero Section (Component)
Crie um componente reutilizável **Hero**:
- **title** (Text)
- **subtitle** (Text)
- **secondTitle** (Text, optional)
- **description** (Long text)
- **highlightText** (Text, optional)
- **backgroundImage** (Media)
- **image** (Media, optional)
- **ctaText** (Text)
- **ctaLink** (Text)
- **secondaryCtaText** (Text, optional)
- **secondaryCtaHref** (Text, optional)
- **achievementsNumber** (Text, optional)
- **achievementsLabel** (Text, optional)

#### Formations Section (Component)
Crie um componente **Formations**:
- **title** (Text)
- **description** (Long text)
- **items** (Repeatable Component):
  - **title** (Text)
  - **description** (Text)
  - **link** (Text)

#### Sections (Component - Repeatable)
Crie um componente **Section** com os campos:
- **type** (Enumeration): `target-audience`, `challenges`, `solution`, `program`, `benefits`
- **title** (Text)
- **subtitle** (Text, optional)
- **description** (Long text, optional)
- **badge** (Text, optional)
- **items** (JSON, optional) - Array de strings ou objetos
- **highlight** (Text, optional)
- **eventInfo** (JSON, optional)
- **blocks** (JSON, optional)
- **strategies** (JSON, optional)

#### Registration (Component, optional)
- **date** (Text)
- **location** (Text)
- **eduzzUrl** (Text)
- **buttonText** (Text)

#### Product Kit (Component, optional)
- **heading** (Text)
- **price** (Text)
- **description** (Long text)
- **images** (Media, multiple)

#### Books (Component, optional - Repeatable)
- **title** (Text)
- **description** (Text)
- **image** (Media)
- **badge** (Text, optional)

#### Metadata (Component)
- **title** (Text)
- **description** (Text)
- **keywords** (Text, multiple)

## 🔌 Configuração no Next.js

### 1. Variáveis de ambiente

Adicione ao `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

### 2. Criar API Token no Strapi

1. Acesse o Strapi Admin
2. Vá em **Settings** > **API Tokens**
3. Clique em **Create new API Token**
4. Nome: `Next.js Frontend`
5. Token type: `Read-only`
6. Copie o token e adicione ao `.env.local`

## 📤 Importar dados

### Opção 1: Importação manual

1. Acesse o Strapi Admin
2. Crie as páginas manualmente usando o JSON `strapi-content-export.json` como referência

### Opção 2: Script de importação (recomendado)

Crie um script `scripts/import-to-strapi.js`:

```javascript
const fs = require('fs');
const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function importPages() {
  const data = JSON.parse(fs.readFileSync('./strapi-content-export.json', 'utf8'));
  
  for (const page of data.pages) {
    try {
      await axios.post(
        `${STRAPI_URL}/api/pages`,
        {
          data: {
            slug: page.slug,
            route: page.route,
            type: page.type,
            hero: page.hero,
            formations: page.formations,
            sections: page.sections,
            registration: page.registration,
            productKit: page.productKit,
            books: page.books,
            knowledgeBarrier: page.knowledgeBarrier,
            finalCta: page.finalCta,
            metadata: page.metadata,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`✅ Imported: ${page.slug}`);
    } catch (error) {
      console.error(`❌ Error importing ${page.slug}:`, error.message);
    }
  }
}

importPages();
```

Execute:

```bash
STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=your-token node scripts/import-to-strapi.js
```

## 🔄 Usar dados no Next.js

### Server Component (recomendado)

```typescript
// app/page.tsx (server component)
import { getHomepage, formatPageData } from '@/lib/strapi/queries';
import HomePageClient from './home-page-client';

export default async function HomePage() {
  const page = await getHomepage();
  const pageData = formatPageData(page);
  
  return <HomePageClient pageData={pageData} />;
}
```

### Client Component

O componente já está adaptado para receber `pageData` via props:

```typescript
// home-page-client.tsx
'use client';

export default function HomePageClient({ pageData }: HomePageProps) {
  // Usa pageData ou fallback para valores padrão
  const heroTitle = pageData?.hero?.title || "TRANSFORME SUA MENTALIDADE";
  // ...
}
```

## 📝 Próximos passos

1. ✅ Instalar e configurar Strapi
2. ✅ Criar Content Types conforme documentação
3. ✅ Importar dados do JSON
4. ✅ Configurar variáveis de ambiente
5. ✅ Testar integração
6. ✅ Adaptar outras páginas (eventos, formações, livros)

## 🎨 Notas importantes

- **Design preservado**: Todas as alterações são apenas de dados, não de design
- **Fallback**: Se o Strapi não estiver disponível, os componentes usam valores padrão
- **Imagens**: As imagens podem ser hospedadas no Strapi ou continuar na pasta `public/`
- **Performance**: Os dados são cacheados e revalidados a cada hora

## 🆘 Troubleshooting

### Erro de CORS
- Verifique a configuração de CORS no Strapi
- Certifique-se de que a URL do Next.js está permitida

### Erro 401 (Unauthorized)
- Verifique se o `STRAPI_API_TOKEN` está correto
- Certifique-se de que o token tem permissão de leitura

### Dados não aparecem
- Verifique se as páginas estão publicadas no Strapi
- Verifique os logs do console para erros de API
- Certifique-se de que os campos estão populados corretamente

## 📚 Recursos

- [Documentação Strapi](https://docs.strapi.io)
- [Strapi Next.js Integration](https://docs.strapi.io/dev-docs/integrations/next-js)
- [JSON de conteúdo exportado](./strapi-content-export.json)

