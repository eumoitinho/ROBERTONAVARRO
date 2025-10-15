# 📚 GUIA COMPLETO: SANITY CMS UNIVERSAL

## 🎯 O QUE FOI IMPLEMENTADO

Sistema **COMPLETO** para gerenciar TODAS as 37 páginas do site através do Sanity CMS, com:
- ✅ **Schemas universais** para todas as páginas
- ✅ **Componente reutilizável** UniversalPage
- ✅ **Templates dinâmicos** para rotas
- ✅ **Sistema de tipos TypeScript** completo
- ✅ **Queries otimizadas** para buscar dados
- ✅ **Todas as 37 páginas** podem usar o MESMO design com conteúdo editável

---

## 📁 ESTRUTURA DE ARQUIVOS CRIADOS

```
sanity/
├── schemaTypes/
│   ├── page.ts               # Schema universal para TODAS as páginas
│   ├── siteSettings.ts       # Configurações globais do site
│   └── index.ts              # Exporta todos os schemas
├── lib/
│   ├── client.ts             # Cliente Sanity (já existia)
│   ├── image.ts              # Helper para imagens (atualizado)
│   ├── queries.ts            # Queries GROQ (NOVO)
│   └── api.ts                # Funções para buscar dados (NOVO)
├── types.ts                  # Tipos TypeScript (NOVO)
└── env.ts                    # Configuração (já existia)

components/
└── universal-page.tsx        # Componente universal reutilizável (NOVO)

app/
├── page-sanity.tsx           # Homepage com Sanity (NOVO)
└── [slug]/
    └── page.tsx              # Página dinâmica universal (NOVO)
```

---

## 🚀 COMO USAR

### 1. **Iniciar o Sanity Studio**

```bash
# Terminal 1: Next.js
pnpm dev

# Terminal 2: Sanity Studio
pnpm studio
```

Acesse o Studio em: **http://localhost:3000/studio**

### 2. **Criar Configurações do Site**

No Studio, crie um documento de **"Configurações do Site"**:
- Nome do site
- Logo
- Menu de navegação
- Redes sociais
- Configurações de SEO global

**IMPORTANTE**: Só pode existir 1 documento de configurações!

### 3. **Criar Páginas**

No Studio, clique em **"Página"** → **"Create"**:

#### Campos Obrigatórios:
- **Título da Página**: Nome interno (ex: "Mentor Milionário")
- **URL da Página**: Slug único (ex: "eventos/mentor-milionario")
- **Seção Hero**: Título principal, subtítulo, descrição

#### Campos Opcionais:
- **Imagem de Fundo**: Hero com imagem
- **Cor de Fundo**: Se não usar imagem
- **Botões CTA**: Primário e secundário
- **Conteúdo Principal**: Editor de texto rico (Portable Text)
- **Seções de Conteúdo**: Blocos reutilizáveis (texto, imagem, CTA, benefícios, vídeo)
- **Galeria de Imagens**: Múltiplas imagens
- **Depoimentos**: Com nome, foto, avaliação
- **FAQ**: Perguntas e respostas
- **SEO**: Metadados personalizados

---

## 📝 EXEMPLOS PRÁTICOS

### Exemplo 1: Criar Página de Evento

1. **No Studio**:
   - Título: "Mentor Milionário"
   - Slug: "eventos/mentor-milionario"
   - Tipo de Página: "Evento"
   - Hero Title: "MENTOR MILIONÁRIO"
   - Hero Subtitle: "Transforme sua mentalidade financeira"
   - Botão Principal: "Inscreva-se Agora" → "/inscricao"

2. **Adicionar Seções**:
   - **Seção de Texto**: Sobre o evento
   - **Seção de Benefícios**: 6 benefícios em grid
   - **Seção de Vídeo**: URL do YouTube
   - **Seção de CTA**: Formulário de inscrição
   - **Depoimentos**: 3-6 depoimentos
   - **FAQ**: 5-10 perguntas frequentes

3. **Publicar** e acessar em: `/eventos/mentor-milionario`

### Exemplo 2: Criar Página de Formação

1. **No Studio**:
   - Título: "Educador Financeiro"
   - Slug: "formacoes/educador-financeiro"
   - Tipo de Página: "Formação"
   - Hero com Imagem de Fundo
   - Botão: "Saiba Mais"

2. **Adicionar**:
   - Conteúdo Principal (Portable Text)
   - Seção de Benefícios
   - Galeria de Fotos
   - Depoimentos
   - CTA Final

### Exemplo 3: Criar Homepage

A homepage pode usar o slug "/" ou definir pageType como "homepage".

---

## 🎨 TIPOS DE SEÇÕES DISPONÍVEIS

### 1. **Hero Section** (Topo)
- Título grande
- Subtítulo
- Descrição
- Imagem de fundo OU cor sólida
- 2 botões (primário e secundário)
- Texto em branco/preto/dourado

### 2. **Seção de Texto**
- Título
- Subtítulo
- Conteúdo longo
- Cor de fundo customizável

### 3. **Seção com Imagem**
- Título
- Imagem
- Legenda
- Layout: esquerda/direita/centro/full

### 4. **Seção de CTA**
- Título
- Descrição
- Botão
- Estilo: dourado/escuro/claro

### 5. **Seção de Benefícios**
- Título da seção
- Grid de benefícios
- Cada benefício: ícone + título + descrição

### 6. **Seção de Vídeo**
- URL do YouTube/Vimeo
- Título
- Descrição

### 7. **Conteúdo Principal** (Portable Text)
- Texto rico com formatação
- Títulos H1-H4
- Listas com marcadores
- Links
- Imagens inline
- Citações
- Destaque em dourado

### 8. **Galeria**
- Grid de imagens
- Hover com legenda
- Responsive

### 9. **Depoimentos**
- Grid de cards
- Foto, nome, cargo
- Texto do depoimento
- Avaliação em estrelas

### 10. **FAQ**
- Accordion expansível
- Pergunta + resposta

---

## 🔄 MIGRANDO PÁGINAS EXISTENTES

Para migrar uma página existente (ex: /eventos/mentor-milionario):

### Opção 1: Manual no Studio (Recomendado)
1. Acesse o Studio
2. Crie nova página
3. Copie o conteúdo da página antiga
4. Cole no Studio formatando
5. Publique

### Opção 2: Via API (Script)
```typescript
// Criar script em scripts/migrate-page.ts
import { sanityClient } from '@/sanity/lib/client';

const page = {
  _type: 'page',
  title: 'Mentor Milionário',
  slug: { _type: 'slug', current: 'eventos/mentor-milionario' },
  heroSection: {
    title: 'MENTOR MILIONÁRIO',
    subtitle: 'Transforme sua mentalidade',
    // ... mais campos
  },
  // ... mais conteúdo
};

await sanityClient.create(page);
```

---

## 🌐 ATIVANDO PÁGINAS

### Para ativar UMA página específica:

1. **Manter página antiga** como `page.tsx`
2. **Criar página Sanity** como `page-sanity.tsx`
3. **Testar** a página Sanity
4. **Quando estiver OK**:
   ```bash
   mv app/eventos/mentor-milionario/page.tsx page-old.tsx
   mv app/eventos/mentor-milionario/page-sanity.tsx page.tsx
   ```

### Para ativar TODAS as páginas de uma vez:

1. **Criar TODAS as 37 páginas no Studio primeiro**
2. **Testar** cada uma individualmente
3. **Substituir** app/page.tsx:
   ```bash
   mv app/page.tsx app/page-old.tsx
   mv app/page-sanity.tsx app/page.tsx
   ```
4. **Deploy**

---

## 📊 CHECKLIST DE MIGRAÇÃO

### Páginas para Migrar (37 total)

#### Homepage (1)
- [ ] `/` - Página inicial

#### Eventos (5)
- [ ] `/eventos/crencas-da-riqueza`
- [ ] `/eventos/energia-do-dinheiro`
- [ ] `/eventos/escalador-de-negocios`
- [ ] `/eventos/mentor-milionario`
- [ ] `/eventos/segredos-da-mente-milionaria`

#### Formações (9)
- [ ] `/formacoes/educador-financeiro`
- [ ] `/formacoes/empreendedor-inteligente`
- [ ] `/formacoes/lcf-mentoring-pro`
- [ ] `/formacoes/mentor-coaching-financeiro`
- [ ] `/formacoes/mentoria`
- [ ] `/formacoes/mentoria-de-investimentos`
- [ ] `/formacoes/mentoria-individual`
- [ ] `/formacoes/metodo-tf`
- [ ] `/formacoes/rota-mind`

#### Livros (5)
- [ ] `/livros` - Listagem
- [ ] `/livros/arte-de-enriquecer`
- [ ] `/livros/coaching-financeiro`
- [ ] `/livros/quebrando-mitos`
- [ ] `/livros/sabedoria-do-dinheiro`

#### Outras (6)
- [ ] `/lives`
- [ ] `/trabalhe-conosco`
- [ ] `/politica-privacidade`
- [ ] `/lp/mes-da-independencia`
- [ ] `/inscricao`
- [ ] `/obrigado`

#### Não Migrar (11 - sistema admin/dinâmicas)
- `/admin/*` (5 páginas)
- `/blog` e `/blog/[slug]` (usa BaseHub)
- `/studio` (Sanity Studio)
- `/ticket/[code]` (dinâmica)
- `/verificar/[code]` (dinâmica)
- `/inscricao/confirmacao` (dinâmica)

---

## 🎨 CUSTOMIZAÇÕES AVANÇADAS

### CSS Personalizado por Página

No Studio, em "Configurações da Página" → "CSS Customizado":

```css
.custom-section {
  background: linear-gradient(to right, #f59e0b, #d97706);
  padding: 4rem;
}

.custom-title {
  font-size: 3rem;
  color: #fbbf24;
}
```

### Desabilitar Header/Footer

Em "Configurações da Página":
- ☐ Mostrar Cabeçalho?
- ☐ Mostrar Rodapé?
- ☐ Mostrar Botão WhatsApp?

---

## 🔍 QUERIES DISPONÍVEIS

```typescript
import {
  getPageBySlug,      // Buscar página por slug
  getAllPages,        // Listar todas as páginas
  getPagesByType,     // Buscar por tipo (event, formation, etc)
  getAllPageSlugs,    // Para generateStaticParams
  getSiteSettings,    // Configurações globais
  getHomepage,        // Homepage específica
} from '@/sanity/lib/api';
```

---

## 🚨 TROUBLESHOOTING

### Página não aparece
✅ Verifique se "Página Ativa?" está marcado no Studio
✅ Verifique se o slug está correto
✅ Revalide o cache: aguarde 1 hora ou force rebuild

### Imagens não carregam
✅ Verifique se o NEXT_PUBLIC_SANITY_PROJECT_ID está correto
✅ Verifique se o NEXT_PUBLIC_SANITY_DATASET está correto
✅ Adicione o domínio cdn.sanity.io no next.config.js

### Erro de tipos TypeScript
✅ Execute: `npx tsc --noEmit`
✅ Verifique se todos os imports estão corretos
✅ Limpe o cache: `rm -rf .next`

---

## 📊 VANTAGENS DO SISTEMA

### ✅ Para o Usuário Final (Visitante)
- Mesma experiência visual em todas as páginas
- Design consistente e profissional
- Performance otimizada (SSG + ISR)
- SEO otimizado em todas as páginas

### ✅ Para o Editor de Conteúdo
- Interface visual intuitiva (Sanity Studio)
- Edição em tempo real
- Preview antes de publicar
- Versionamento automático
- Sem necessidade de programar
- Arrastar e soltar seções

### ✅ Para o Desenvolvedor
- Código DRY (Don't Repeat Yourself)
- Um único componente para 37 páginas
- Tipos TypeScript completos
- Fácil manutenção
- Fácil adicionar novas páginas
- Extensível e escalável

---

## 🎓 PRÓXIMOS PASSOS

1. ✅ **Testar o Studio**: `pnpm studio`
2. ✅ **Criar configurações do site**
3. ✅ **Criar 1 página de teste**
4. ✅ **Verificar se funciona**
5. ⏳ **Criar todas as 37 páginas no Studio**
6. ⏳ **Substituir páginas antigas pelas novas**
7. ⏳ **Deploy em produção**

---

## 📞 COMANDOS ÚTEIS

```bash
# Desenvolvimento
pnpm dev              # Next.js
pnpm studio           # Sanity Studio

# Build
pnpm build            # Compilar

# Type checking
npx tsc --noEmit      # Verificar tipos

# Deploy Studio
pnpm sanity deploy    # Deploy do Studio (opcional)
```

---

## ✨ RESULTADO FINAL

**ANTES**: 37 arquivos de páginas com código duplicado

**DEPOIS**:
- 1 componente universal (UniversalPage)
- 1 template dinâmico ([slug]/page.tsx)
- 37 documentos no Sanity Studio (editáveis visualmente)
- Mesma aparência, conteúdo customizável
- Manutenção 10x mais fácil

---

**Criado em**: 2025-10-12
**Sistema**: Sanity CMS v4.10.2 + Next.js 14.2.7
**Desenvolvido por**: Claude Code + Ultrathink
