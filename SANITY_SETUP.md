# Configuração do Sanity CMS

## Passos para configurar o Sanity

### 1. Criar conta e projeto no Sanity

1. Acesse [sanity.io](https://www.sanity.io/) e crie uma conta
2. Crie um novo projeto no dashboard do Sanity
3. Anote o `Project ID` e o `Dataset` (normalmente "production")

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu_token_aqui
```

### 3. Gerar token de API

1. No dashboard do Sanity, vá para Settings > API
2. Crie um novo token com permissões de leitura/escrita
3. Adicione o token no `.env.local`

### 4. Instalar CLI do Sanity globalmente

```bash
npm install -g @sanity/cli
```

### 5. Fazer login no Sanity

```bash
sanity login
```

### 6. Inicializar o projeto Sanity

Na pasta `/sanity`, execute:

```bash
sanity init --reconfigure
```

Selecione:
- Use existing project
- Escolha seu projeto
- Dataset: production

### 7. Executar o Sanity Studio localmente

```bash
npm run sanity
```

O Studio estará disponível em: http://localhost:3333

### 8. Deploy do Sanity Studio

```bash
npm run sanity:deploy
```

Escolha um nome único para seu studio (ex: robertonavarro)
O Studio estará disponível em: https://robertonavarro.sanity.studio

## Estrutura dos Schemas

### Tipos de Conteúdo Disponíveis:

1. **Blog Posts** (`blogPost`)
   - Título, slug, autor
   - Imagem principal
   - Categorias
   - Conteúdo rico (texto, imagens, código)
   - SEO

2. **Páginas** (`page`)
   - Diferentes tipos de página (home, sobre, formação, etc)
   - Hero section
   - Múltiplas seções configuráveis
   - SEO

3. **Formações** (`formation`)
   - Informações do curso
   - Preços e descontos
   - Módulos e aulas
   - Depoimentos
   - FAQ
   - Garantia

4. **Configurações do Site** (`siteSettings`)
   - Logo e favicon
   - Menu de navegação
   - Footer
   - Redes sociais
   - Analytics
   - SEO padrão

5. **Categorias** (`category`)
   - Para organizar posts do blog

## Uso no Next.js

### Buscar dados:

```typescript
import { getPages, getPage, getPosts, getSiteSettings } from '@/lib/sanity/fetch'

// Em uma página ou componente
const pages = await getPages()
const homePage = await getPage('home')
const posts = await getPosts()
const settings = await getSiteSettings()
```

### Renderizar conteúdo rico:

```tsx
import { PortableText } from '@/components/sanity/portable-text'

<PortableText value={content} />
```

### Exibir imagens:

```tsx
import { urlFor } from '@/sanity/lib/client'

<img src={urlFor(image).url()} alt={alt} />
```

## Acessar o Studio

Após configuração, acesse o Sanity Studio em:
- Desenvolvimento: http://localhost:3000/studio
- Produção: https://seu-site.com/studio

## Próximos Passos

1. Configure as variáveis de ambiente
2. Execute o Sanity Studio
3. Adicione conteúdo inicial
4. Atualize as páginas do site para buscar dados do Sanity
5. Configure preview mode para edição em tempo real