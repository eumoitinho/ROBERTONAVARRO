# Guia de Uso do Payload CMS

Este projeto agora usa **Payload CMS** para gerenciar todo o conteúdo (textos, imagens, vídeos, formulários).

## 🚀 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis:

```bash
cp .env.example .env.local
```

Variáveis obrigatórias:
```env
MONGODB_URI=mongodb://localhost:27017/roberto-navarro
PAYLOAD_SECRET=sua-chave-secreta-aqui
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 2. Iniciar MongoDB

Você precisa de uma instância do MongoDB rodando. Opções:

**MongoDB Local:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
1. Criar conta em https://www.mongodb.com/cloud/atlas
2. Criar cluster gratuito
3. Obter string de conexão
4. Usar no `MONGODB_URI`

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Popular o CMS com Dados

Execute o script de seed para popular o Payload com os conteúdos originais:

```bash
pnpm payload:seed
```

Isso criará:
- ✅ Usuário admin (email: admin@robertonavarro.com, senha: admin123)
- ✅ Todas as formações
- ✅ Todos os eventos
- ✅ Todos os livros
- ✅ Mentores
- ✅ Depoimentos
- ✅ FAQs
- ✅ Páginas estáticas

### 4. Iniciar o Projeto

```bash
pnpm dev
```

### 5. Acessar o Painel Admin

Abra no navegador:
```
http://localhost:3000/admin
```

Login:
- Email: `admin@robertonavarro.com`
- Senha: `admin123`

**⚠️ IMPORTANTE: Altere a senha após primeiro acesso!**

---

## 📚 Estrutura do Projeto

### Collections Criadas

1. **Users** - Usuários do CMS
2. **Formacoes** - Cursos e formações
3. **Eventos** - Eventos presenciais/online
4. **Livros** - Biblioteca de livros
5. **Mentores** - Perfis de mentores
6. **Testimonials** - Depoimentos
7. **FAQs** - Perguntas frequentes
8. **Pages** - Páginas estáticas
9. **Media** - Imagens e vídeos

### Diretórios

```
payload/
├── collections/        # Schemas das collections
│   ├── Formacoes.ts
│   ├── Eventos.ts
│   ├── Livros.ts
│   ├── Mentores.ts
│   ├── Testimonials.ts
│   ├── FAQs.ts
│   ├── Pages.ts
│   ├── Media.ts
│   └── Users.ts
└── seed/              # Scripts de população
    ├── index.ts
    ├── formacoes.ts
    ├── eventos.ts
    ├── livros.ts
    ├── mentores.ts
    ├── testimonials.ts
    ├── faqs.ts
    └── pages.ts

lib/payload/
└── client.ts          # Funções helper para buscar dados

app/api/(payload)/
└── [...slug]/
    └── route.ts       # Endpoint API do Payload
```

---

## 💻 Como Usar nas Páginas

### Exemplo 1: Buscar uma Formação por Slug

```tsx
// app/formacoes/[slug]/page.tsx
import { getFormacaoBySlug } from '@/lib/payload/client'
import { notFound } from 'next/navigation'

export default async function FormacaoPage({ params }: { params: { slug: string } }) {
  const formacao = await getFormacaoBySlug(params.slug)

  if (!formacao) {
    notFound()
  }

  return (
    <div>
      <h1>{formacao.hero.title}</h1>
      <p>{formacao.hero.subtitle}</p>

      {/* Benefícios */}
      <div className="grid grid-cols-2 gap-4">
        {formacao.benefits?.map((benefit, index) => (
          <div key={index}>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Módulos */}
      <div>
        {formacao.modules?.map((module, index) => (
          <div key={index}>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
            <ul>
              {module.topics?.map((topic, i) => (
                <li key={i}>{topic.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a href={formacao.pricing.link}>
        Inscrever-se por R$ {formacao.pricing.price}
      </a>
    </div>
  )
}
```

### Exemplo 2: Listar Todos os Eventos

```tsx
// app/eventos/page.tsx
import { getEventos } from '@/lib/payload/client'

export default async function EventosPage() {
  const eventos = await getEventos()

  return (
    <div>
      <h1>Próximos Eventos</h1>

      <div className="grid grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div key={evento.id}>
            <h2>{evento.title}</h2>
            <p>{evento.hero.subtitle}</p>
            <p>{new Date(evento.date).toLocaleDateString()}</p>
            <a href={`/eventos/${evento.slug}`}>Ver detalhes</a>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Exemplo 3: Buscar Depoimentos por Categoria

```tsx
// components/testimonials-section.tsx
import { getTestimonials } from '@/lib/payload/client'

export default async function TestimonialsSection({ category }: { category?: string }) {
  const testimonials = await getTestimonials(category)

  return (
    <div className="testimonials">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <p>"{testimonial.testimonial}"</p>
          <div className="author">
            <strong>{testimonial.name}</strong>
            {testimonial.role && <span>{testimonial.role}</span>}
          </div>
          <div className="rating">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Exemplo 4: Renderizar Imagens do Media

```tsx
import { Media } from '@/payload-types'

interface HeroProps {
  backgroundImage?: Media
}

export default function Hero({ backgroundImage }: HeroProps) {
  const imageUrl = typeof backgroundImage === 'object'
    ? backgroundImage.url
    : backgroundImage

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* conteúdo */}
    </div>
  )
}
```

---

## 📝 Funções Helper Disponíveis

Todas em `/lib/payload/client.ts`:

```typescript
// Formações
getFormacoes()                    // Listar todas as formações publicadas
getFormacaoBySlug(slug)          // Buscar formação por slug

// Eventos
getEventos()                      // Listar todos os eventos publicados
getEventoBySlug(slug)            // Buscar evento por slug

// Livros
getLivros()                       // Listar todos os livros
getLivroBySlug(slug)             // Buscar livro por slug

// Páginas
getPageBySlug(slug)              // Buscar página por slug

// Mentores
getMentores()                     // Listar todos os mentores

// Depoimentos
getTestimonials(category?)       // Listar depoimentos (opcionalmente filtrado por categoria)

// FAQs
getFAQs(category?)               // Listar FAQs (opcionalmente filtrado por categoria)
```

---

## 🎨 Editar Conteúdo

### 1. Acessar o Admin
```
http://localhost:3000/admin
```

### 2. Selecionar Collection

No menu lateral, clique na collection desejada (Formações, Eventos, etc.)

### 3. Editar Item

- Clique no item que deseja editar
- Faça as alterações necessárias
- Clique em "Save" ou "Publish"

### 4. Criar Novo Item

- Clique em "Create New" na collection desejada
- Preencha os campos
- Clique em "Save" ou "Publish"

### 5. Upload de Mídia

- Vá para "Media" no menu
- Clique em "Upload"
- Selecione imagens/vídeos
- Adicione Alt Text e Caption
- Salve

---

## 🔧 Customização

### Adicionar Novo Campo a uma Collection

Edite o arquivo da collection em `payload/collections/`:

```typescript
// payload/collections/Formacoes.ts
{
  name: 'duration',
  type: 'text',
  label: 'Duração',
  admin: {
    description: 'Duração do curso (ex: 6 meses)',
  },
}
```

### Criar Nova Collection

1. Criar arquivo em `payload/collections/MinhaCollection.ts`
2. Adicionar no `payload.config.ts`:

```typescript
import MinhaCollection from './payload/collections/MinhaCollection'

collections: [
  // ... outras collections
  MinhaCollection,
]
```

---

## 🚨 Troubleshooting

### Erro de Conexão com MongoDB

Verifique:
1. MongoDB está rodando?
2. `MONGODB_URI` está correto no `.env.local`?
3. Firewall bloqueando porta 27017?

### Erro 404 no Admin

Verifique:
1. O endpoint `/app/api/(payload)/[...slug]/route.ts` existe?
2. O servidor está rodando (`pnpm dev`)?

### Imagens não carregam

Verifique:
1. Diretório `/media` foi criado?
2. Permissões de escrita estão corretas?

### Seed não funciona

Verifique:
1. MongoDB está rodando?
2. Variáveis de ambiente estão configuradas?
3. Execute: `pnpm payload:seed`

---

## 📦 Deploy em Produção

### Vercel

1. Configurar MongoDB Atlas (cloud)
2. Adicionar variáveis de ambiente no Vercel:
   - `MONGODB_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_PAYLOAD_URL`
3. Deploy!

### Railway / Render

Similar ao Vercel, configure as variáveis de ambiente.

---

## 🔐 Segurança

### Alterar Senha Admin

1. Login no admin
2. Vá para "Users"
3. Clique no seu usuário
4. Altere a senha
5. Save

### Criar Novos Usuários

1. Login como admin
2. Vá para "Users"
3. Create New
4. Preencha email, senha e role
5. Save

### Roles Disponíveis

- **admin**: Acesso total
- **editor**: Pode editar conteúdo
- **author**: Pode criar e editar apenas seu próprio conteúdo

---

## 📚 Recursos

- [Documentação Payload](https://payloadcms.com/docs)
- [Payload GitHub](https://github.com/payloadcms/payload)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## ✅ Checklist de Migração

- [x] Payload CMS instalado e configurado
- [x] Collections criadas (9 collections)
- [x] Scripts de seed criados
- [x] Helper functions criadas
- [x] Endpoint API configurado
- [ ] Páginas atualizadas para buscar do Payload
- [ ] Código Sanity/Strapi removido
- [ ] Testes realizados
- [ ] Deploy em produção

---

**Autor:** Claude
**Data:** 2025-01-09
**Versão:** 1.0
