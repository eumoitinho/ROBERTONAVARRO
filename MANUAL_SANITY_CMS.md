# 📘 MANUAL DE USO - SANITY CMS
## Instituto Coaching Financeiro | Roberto Navarro

---

<div align="center">

![Roberto Navarro](https://img.shields.io/badge/Instituto-Coaching_Financeiro-yellow?style=for-the-badge)
![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-red?style=for-the-badge&logo=sanity)
![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)

**Versão:** 1.0  
**Última Atualização:** 16 de Outubro de 2025  
**Desenvolvido por:** M2Z Digital

</div>

---

## 📑 ÍNDICE

1. [Introdução](#1-introdução)
2. [Acessando o Sanity Studio](#2-acessando-o-sanity-studio)
3. [Estrutura do CMS](#3-estrutura-do-cms)
4. [Editando a Homepage](#4-editando-a-homepage)
5. [Gerenciando Formações](#5-gerenciando-formações)
6. [Gerenciando Eventos](#6-gerenciando-eventos)
7. [Gerenciando Livros](#7-gerenciando-livros)
8. [Gerenciando Blog](#8-gerenciando-blog)
9. [Configurando Webhooks](#9-configurando-webhooks)
10. [Boas Práticas](#10-boas-práticas)
11. [Suporte](#11-suporte)

---

## 1. INTRODUÇÃO

### 🎯 O que é o Sanity CMS?

O **Sanity CMS** é o sistema de gerenciamento de conteúdo que permite você **editar todo o conteúdo do seu site** sem precisar mexer em código. É como ter um painel de controle completo do Instituto Coaching Financeiro na palma da sua mão.

### ✨ O que você pode fazer?

- ✅ Editar textos de todas as páginas
- ✅ Alterar imagens e vídeos
- ✅ Gerenciar formações e eventos
- ✅ Publicar posts no blog
- ✅ Configurar links de compra dos livros
- ✅ Gerenciar webhooks de formulários
- ✅ Controlar integrações (Kommo, LeadLovers, Google Sheets)
- ✅ E muito mais!

### 🔑 Conceitos Importantes

**Documento:** Cada página, post ou formação é um "documento" no Sanity.  
**Campo:** Cada informação editável (título, descrição, link, etc).  
**Publicar:** Suas alterações só aparecem no site após clicar em "Publish".  
**Rascunho:** Você pode salvar alterações sem publicar.

---

## 2. ACESSANDO O SANITY STUDIO

### 🌐 Como Acessar

**URL do Sanity Studio:**
```
https://seusite.com.br/studio
```

ou localmente:
```
http://localhost:3000/studio
```

### 🔐 Login

1. Acesse a URL do Studio
2. Faça login com suas credenciais Google ou GitHub
3. Aguarde o carregamento do painel

> **💡 Dica:** Salve a URL nos favoritos do seu navegador para acesso rápido!

---

## 3. ESTRUTURA DO CMS

### 📂 Menu Lateral

Ao entrar no Sanity Studio, você verá o menu lateral com estas opções:

```
📊 Configurações Globais
├── Site Settings (Configurações do Site)
└── Integrações e Webhooks

📄 Páginas
├── Páginas Genéricas
├── Homepage (Página Inicial)
├── Página de Formação (9 formações)
├── Página de Evento (5 eventos)
└── Book Page (4 livros)

📝 Blog
└── Post de Blog (33 posts)
```

### 🎨 Interface do Editor

Quando você abre um documento para editar, verá:

**Lado Esquerdo:** Campos editáveis (textos, imagens, links)  
**Lado Direito:** Preview (quando disponível)  
**Topo:** Botões "Save" (Salvar rascunho) e "Publish" (Publicar)

---

## 4. EDITANDO A HOMEPAGE

### 🏠 Acessando a Homepage

1. No menu lateral, clique em **"Homepage"**
2. Você verá o documento "Homepage Principal"
3. Clique para abrir o editor

### 📋 Seções Editáveis

#### **Hero Section (Seção Principal)**

Esta é a primeira coisa que as pessoas veem ao entrar no site.

**Campos disponíveis:**
- **Badge:** Texto pequeno acima do título (ex: "INSTITUTO COACHING FINANCEIRO")
- **Title:** Título principal em destaque (ex: "TRANSFORME SUA MENTALIDADE")
- **Subtitle:** Continuação do título (ex: "E CONQUISTE UMA NOVA REALIDADE FINANCEIRA")
- **Description:** Parágrafo explicativo
- **Achievements Number:** Número de vidas transformadas (ex: "300.000+")
- **Achievements Label:** Texto ao lado do número (ex: "vidas transformadas")
- **Primary Button Text:** Texto do botão principal
- **Primary Button Link:** Link do botão (ex: "#formacoes")

**Como editar:**
```
1. Localize o campo que deseja alterar
2. Clique no campo
3. Digite o novo texto
4. Clique em "Publish" no topo
```

#### **Formações Section**

Grid com cards das 8 formações principais.

**Campos disponíveis:**
- **Badge:** "NOSSAS FORMAÇÕES"
- **Title:** Primeira parte do título
- **Highlighted Text:** Parte destacada em amarelo
- **Description:** Parágrafo explicativo
- **Formações:** Array com 8 cards

**Editando um card de formação:**
```
1. Role até "Formações"
2. Clique no card que deseja editar
3. Edite:
   - Title (ex: "LCF MENTORING")
   - Description (descrição do programa)
   - Link (ex: "/formacoes/mentoria")
   - Button Text (ex: "SAIBA MAIS")
4. Clique em "Publish"
```

> **⚠️ Importante:** Os links devem começar com `/` para páginas internas.

#### **Mentor Section**

Seção sobre Roberto Navarro.

**Campos disponíveis:**
- **Badge:** "MENTOR"
- **Title:** "CONHEÇA SEU MENTOR"
- **Bio Paragraphs:** 3 parágrafos sobre a trajetória
- **Stats:** 4 estatísticas (Alunos, Técnicas, Livros, Vídeos)

**Como adicionar um parágrafo à bio:**
```
1. Role até "Bio Paragraphs"
2. Clique em "+ Add item"
3. Digite o texto do novo parágrafo
4. Reordene arrastando se necessário
5. Clique em "Publish"
```

#### **Vídeos Section**

Grid de vídeos de transformação dos alunos.

**Campos disponíveis:**
- **Badge, Title, Description**
- **Videos:** Array de vídeos do YouTube
- **Stats:** Estatísticas sobre resultados
- **CTA Button:** Botão de ação

**Adicionando um novo vídeo:**
```
1. Role até "Videos"
2. Clique em "+ Add item"
3. Preencha:
   - YouTube ID (ex: "sVcR5iq1BG0")
   - Title (título do vídeo)
   - Person (nome da pessoa)
   - Description (descrição)
   - Chip Label (opcional, ex: "Transformação Real")
4. Clique em "Publish"
```

> **💡 Como pegar o YouTube ID:**
> Na URL do YouTube: `https://youtube.com/watch?v=sVcR5iq1BG0`
> O ID é: `sVcR5iq1BG0` (tudo depois do `v=`)

#### **Section Controls**

Controla quais seções aparecem no site.

**Opções:**
- **Show Mentor Section:** Mostrar seção do mentor
- **Show Videos Section:** Mostrar vídeos de transformação
- **Show Testimonials Section:** Mostrar depoimentos
- **Show Location Section:** Mostrar mapa de localização
- **Show Event Popup:** Mostrar popup de evento

```
✅ Marcado = Seção aparece no site
❌ Desmarcado = Seção fica oculta
```

#### **SEO**

Otimização para mecanismos de busca (Google, Bing, etc).

**Campos:**
- **Meta Title:** Título que aparece no Google (máx. 60 caracteres)
- **Meta Description:** Descrição no Google (máx. 160 caracteres)
- **Keywords:** Palavras-chave separadas por vírgula

**Exemplo:**
```
Meta Title: Roberto Navarro | Transforme sua Mentalidade Financeira
Meta Description: Instituto Coaching Financeiro - Métodos exclusivos para conquistar liberdade financeira
Keywords: Roberto Navarro, Coaching Financeiro, Educação Financeira
```

---

## 5. GERENCIANDO FORMAÇÕES

### 📚 Lista de Formações

O site possui 9 formações cadastradas:

1. **Educador Financeiro**
2. **Empreendedor Inteligente**
3. **LCF Mentoring Pro**
4. **Mentor Coaching Financeiro**
5. **Mentoria**
6. **Mentoria de Investimentos**
7. **Mentoria Individual**
8. **Método TF**
9. **Rota Mind**

### ✏️ Editando uma Formação

1. No menu lateral, clique em **"Página de Formação"**
2. Você verá a lista das 9 formações
3. Clique na formação que deseja editar

### 📋 Seções de uma Formação

Cada formação possui estas seções editáveis:

#### **Hero Section**

A primeira seção que o visitante vê.

**Campos principais:**
- **Badge:** Etiqueta acima do título (ex: "FORMAÇÃO EXCLUSIVA")
- **Title:** Título principal (ex: "EDUCADOR FINANCEIRO")
- **Subtitle:** Subtítulo explicativo
- **Description:** Parágrafo de descrição
- **CTA Text:** Texto do botão (ex: "QUERO PARTICIPAR")
- **CTA Link:** Link do botão (ex: "#inscricao")
- **Show Countdown:** Mostrar contador regressivo
- **Countdown Target Date:** Data alvo do contador

#### **About Section**

Explicação sobre a formação.

**Campos:**
- **Badge:** "SOBRE A FORMAÇÃO"
- **Title:** Título da seção
- **Description:** Texto explicativo sobre o programa

#### **Benefits Section**

Benefícios de participar da formação.

**Campos:**
- **Badge:** "BENEFÍCIOS"
- **Title:** Título da seção
- **Benefits:** Array de benefícios

**Adicionando um benefício:**
```
1. Role até "Benefits"
2. Clique em "+ Add item"
3. Preencha:
   - Title (ex: "Acompanhamento Personalizado")
   - Description (descrição do benefício)
   - Icon (nome do ícone Lucide, ex: "users")
4. Salve
```

> **💡 Ícones disponíveis:** users, target, zap, brain, wallet, shield, award, etc.
> Lista completa: https://lucide.dev/icons/

#### **Audience Section**

Para quem é a formação.

**Campos:**
- **Badge:** "PARA QUEM É"
- **Title:** Título da seção
- **Intro:** Texto introdutório (opcional)
- **CTA Text, CTA Link:** Botão de ação
- **Bullets:** Lista de público-alvo

**Exemplo de bullet:**
```
Title: Empreendedores
Description: que buscam escalar seus negócios
Icon: rocket
```

#### **Challenges Section**

Desafios que a formação resolve.

**Estrutura:**
- **Badge, Title, Description**
- **Challenges:** Array de desafios
  - Question (pergunta/desafio)
  - Answer (solução oferecida)
  - Icon (ícone)

#### **Learning Section**

O que o aluno vai aprender.

**Estrutura similar aos Benefits:**
- Badge, Title
- Items (array de aprendizados)

#### **Methodology Section**

Como funciona a metodologia.

**Campos:**
- **Badge, Title, Description**
- **Steps:** Passos da metodologia

#### **FAQ Section**

Perguntas frequentes.

**Adicionando uma pergunta:**
```
1. Role até "FAQ"
2. Clique em "+ Add item"
3. Preencha:
   - Question (pergunta)
   - Answer (resposta)
4. Salve
```

#### **Newsletter Section**

Formulário de inscrição.

**Campos importantes:**
- **Source:** Origem do lead (ex: "Educador Financeiro")
- **Title:** Título do formulário
- **Description:** Texto explicativo
- **CTA Text:** Texto do botão
- **Event Date, Event Time, Event Location:** Dados do evento

> **⚠️ Importante:** O campo "Source" é usado para rastreamento. Mantenha único para cada formação.

#### **SEO**

Mesmo esquema da homepage:
- **Title:** Título SEO
- **Description:** Descrição SEO
- **Keywords:** Palavras-chave

---

## 6. GERENCIANDO EVENTOS

### 🎪 Lista de Eventos

5 eventos principais:

1. **Segredos da Mente Milionária**
2. **Energia do Dinheiro**
3. **Crenças da Riqueza**
4. **Escalador de Negócios**
5. **Mentor Milionário**

### ✏️ Editando um Evento

1. Menu lateral → **"Página de Evento"**
2. Selecione o evento
3. Edite as seções

### 📋 Seções de um Evento

Eventos possuem estrutura similar às formações:

- **Hero Section:** Título, subtítulo, descrição, CTA
- **Benefits Section:** Benefícios de participar
- **Challenges Section:** Desafios que o evento resolve
- **Learning Section:** O que será aprendido
- **Audience Section:** Para quem é o evento
- **Newsletter Section:** Formulário de inscrição
- **SEO:** Otimização para buscas

> **💡 Dica:** Eventos geralmente têm datas específicas. Lembre-se de atualizar as datas no Newsletter Section!

---

## 7. GERENCIANDO LIVROS

### 📚 Livros Cadastrados

4 livros do Roberto Navarro:

1. **Coaching Financeiro**
2. **A Arte de Enriquecer**
3. **Quebrando Mitos**
4. **Sabedoria do Dinheiro**

### ✏️ Editando um Livro

1. Menu lateral → **"Book Page"**
2. Selecione o livro
3. Edite as informações

### 📋 Seções de um Livro

#### **Hero Section**

**Campos principais:**
- **Badge:** Etiqueta do livro (ex: "LIVRO EQUILIBRADOR")
- **Title:** Nome do livro
- **Subtitle:** Frase de impacto
- **Description:** Descrição do livro
- **Cover Image Path:** Caminho da imagem da capa (ex: "/LIVROS-ROBERTO-NAVARRO-CF-2.png")
- **CTA Text:** Texto do botão (ex: "COMPRAR AGORA")
- **Purchase Link:** 🔗 **LINK DE COMPRA** (ex: "https://sun.eduzz.com/956345")
- **Rating:** Avaliação (0 a 5)
- **Total Reviews:** Número de avaliações (ex: 356)
- **Gradient From/To:** Cores do gradiente (ex: "blue-500", "cyan-600")

> **💰 Importante:** O **Purchase Link** é onde você configura o link da Eduzz ou outra plataforma de vendas!

#### **About Section**

Sobre o livro.

**Campos:**
- **Title:** "Sobre o Livro"
- **Paragraphs:** Array de parágrafos
- **Highlight Text:** Texto em destaque

#### **Pillars/Strategies Section**

Pilares ou estratégias do livro.

**Estrutura:**
- Badge, Title, Description
- Items (array de pilares)

#### **Benefits Section**

Benefícios/Transformações.

**Estrutura:**
- Badge, Title
- Items (array de benefícios)

#### **Chapters Section**

Capítulos do livro.

**Adicionando um capítulo:**
```
1. Role até "Chapters"
2. Clique em "+ Add item"
3. Preencha:
   - Title (nome do capítulo)
   - Description (resumo)
4. Salve
```

#### **Author Section**

Sobre o autor (Roberto Navarro).

**Campos:**
- **Badge, Title, Name, Subtitle**
- **Bio:** Array de parágrafos da biografia
- **Image Path:** Caminho da foto (ex: "/images/ROBERTO_4.jpg")

#### **CTA Section**

Chamada final para ação.

**Campos:**
- **Title:** Título da CTA
- **Description:** Descrição
- **CTA Text:** Texto do botão
- **Price:** Preço atual (ex: "R$ 39,90")
- **Original Price:** Preço original (ex: "R$ 59,90")

---

## 8. GERENCIANDO BLOG

### 📝 Posts do Blog

33 posts já cadastrados sobre diversos temas de educação financeira.

### ✏️ Criando um Novo Post

1. Menu lateral → **"Post de Blog"**
2. Clique em **"+ Create"** (canto superior direito)
3. Preencha os campos:

#### **Campos Principais**

**Informações Básicas:**
- **Title:** Título do post (ex: "Como Sair das Dívidas em 6 Meses")
- **Slug:** URL do post (ex: "como-sair-das-dividas")
  - Gerado automaticamente a partir do título
  - Clique em "Generate" para criar
  - Pode editar manualmente
- **Excerpt:** Resumo do post (aparece na listagem)
- **Published At:** Data de publicação

**Conteúdo:**
- **Content → HTML:** Cole aqui o HTML completo do seu artigo

> **💡 Dica:** Use um editor HTML como TinyMCE ou CKEditor para formatar seu texto antes de colar.

**Imagem de Capa:**
- **Cover Image → URL:** Cole o link da imagem
  - Pode usar imagens do Unsplash, Pexels, etc.
  - Formato recomendado: 1200x630px
- **Alt:** Texto alternativo (descreva a imagem)

**Categorização:**
- **Category:** Categoria do post (ex: "Educação Financeira", "Investimentos")
- **Tags:** Tags separadas por vírgula (ex: "dívidas, planejamento, renda extra")

**SEO:**
- **SEO Title:** Título para Google (máx. 60 caracteres)
- **SEO Description:** Descrição para Google (máx. 160 caracteres)
- **SEO Keywords:** Palavras-chave

**Autor:**
- **Author Name:** Nome do autor (geralmente "Roberto Navarro")
- **Author Bio:** Breve bio do autor
- **Author Image URL:** Link da foto do autor

### 🖋️ Exemplo de HTML para Post

```html
<h2>Como Sair das Dívidas em 6 Meses</h2>

<p>Estar endividado é uma situação que afeta milhões de brasileiros. Mas com disciplina e o método certo, é possível reverter esse quadro em poucos meses.</p>

<h3>Passo 1: Mapeie suas dívidas</h3>

<p>Antes de tudo, você precisa saber exatamente quanto deve. Liste:</p>

<ul>
  <li>Nome do credor</li>
  <li>Valor total da dívida</li>
  <li>Taxa de juros</li>
  <li>Valor da parcela mínima</li>
</ul>

<h3>Passo 2: Negocie</h3>

<p>Entre em contato com seus credores e negocie. Muitas vezes você consegue:</p>

<ul>
  <li>Desconto no valor total</li>
  <li>Redução de juros</li>
  <li>Mais prazo para pagar</li>
</ul>

<blockquote>
  <p>"O primeiro passo para sair das dívidas é assumir o controle da situação." - Roberto Navarro</p>
</blockquote>

<h3>Passo 3: Crie um plano de pagamento</h3>

<p>Use o método bola de neve ou avalanche para eliminar suas dívidas sistematicamente.</p>
```

### 📰 Editando um Post Existente

1. Menu lateral → **"Post de Blog"**
2. Clique no post que deseja editar
3. Faça as alterações
4. Clique em **"Publish"**

### 🗑️ Excluindo um Post

1. Abra o post
2. Clique nos 3 pontinhos (...) no canto superior direito
3. Selecione **"Delete"**
4. Confirme a exclusão

> **⚠️ Atenção:** Esta ação é irreversível!

---

## 9. CONFIGURANDO WEBHOOKS

### 🔗 O que são Webhooks?

Webhooks são URLs que recebem os dados dos formulários do site e enviam para:
- **Kommo** (CRM para gerenciar leads)
- **LeadLovers** (Automação de email marketing)
- **Google Sheets** (Planilha de backup)

### 🛠️ Acessando Configurações de Webhooks

1. Menu lateral → **"Integrações e Webhooks"**
2. Clique em **"Configurações de Produção"**

### 📋 Seções de Configuração

#### **Google Sheets**

**Campos:**
- **Enabled:** ✅ Marcar para ativar
- **Webhook URL:** URL do Google Apps Script

**Exemplo:**
```
https://script.google.com/macros/s/AKfycbx4s6y8Y8RUh.../exec
```

#### **LeadLovers**

**Campos:**
- **Enabled:** ✅ Marcar para ativar
- **Webhook URL:** URL da API do LeadLovers
- **Auth Key:** Token de autenticação (Bearer)
- **Machine Code:** Código da máquina
- **Sequence Code:** Código da sequência
- **Level Code:** Código do nível
- **Tag:** Tag para marcar os leads

**Exemplo:**
```
Webhook URL: https://llapi.leadlovers.com/webapi/lead?token=...
Auth Key: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Machine Code: 673989
Sequence Code: 1554588
Level Code: 1
Tag: 649481
```

#### **Kommo Webhooks**

Webhooks específicos para cada página/evento.

**Adicionando um novo webhook:**

1. Role até **"Kommo Webhooks"**
2. Clique em **"+ Add item"**
3. Preencha:
   - **Source:** Nome da página (ex: "Energia do Dinheiro")
   - **Webhook URL:** URL do webhook do Kommo
   - **Description:** Descrição (opcional)

**Exemplo:**
```
Source: Segredos da Mente Milionária
Webhook URL: https://data.widgets.wearekwid.com/api/webhook/34323419/e715464a...
Description: Webhook para o evento Segredos da Mente Milionária
```

#### **Default Kommo Webhook**

Webhook usado quando não há um específico configurado.

**Campo:**
- **Default Kommo Webhook:** URL padrão

### 🔄 Como Funciona

Quando alguém preenche um formulário no site:

1. O sistema busca a configuração ativa no Sanity
2. Identifica o webhook correto pelo **Source** (origem)
3. Envia os dados para:
   - Kommo (webhook específico ou padrão)
   - Google Sheets (se habilitado)
   - LeadLovers (se habilitado)

### 📊 Mapeamento de Sources

| Página/Evento | Source | Webhook |
|---------------|--------|---------|
| Energia do Dinheiro | `energia-do-dinheiro` ou `Energia do Dinheiro` | Webhook específico |
| Mentor Milionário | `mentor-milionario` ou `Mentor Milionário` | Webhook específico |
| Crenças da Riqueza | `crencas-da-riqueza` ou `Crenças da Riqueza` | Webhook específico |
| Segredos da Mente | `segredos-da-mente-milionaria` | Webhook específico |
| Outras páginas | Qualquer outro | Webhook padrão |

> **💡 Dica:** O campo **Source** nas páginas de Newsletter deve corresponder ao **Source** configurado aqui.

---

## 10. BOAS PRÁTICAS

### ✅ Checklist Antes de Publicar

- [ ] **Revisei todos os textos** (ortografia, gramática)
- [ ] **Testei todos os links** (CTAs, botões, links externos)
- [ ] **Verifiquei imagens** (carregam corretamente, tamanho adequado)
- [ ] **Preenchi o SEO** (title, description, keywords)
- [ ] **Testei em diferentes dispositivos** (mobile, tablet, desktop)
- [ ] **Revisei datas e horários** (eventos, posts de blog)

### 📝 Dicas de Escrita

**Títulos:**
- Use verbos de ação (Transforme, Descubra, Aprenda)
- Seja específico (evite "Curso de Finanças", prefira "Curso Completo de Educação Financeira em 90 Dias")
- Use números quando possível (7 Passos, 30 Dias, R$ 10.000)

**Descrições:**
- Foque em benefícios, não características
- Use linguagem simples e direta
- Inclua prova social (números, depoimentos)

**CTAs (Chamadas para Ação):**
- Seja específico: "GARANTIR MINHA VAGA" > "Clique aqui"
- Crie urgência: "ÚLTIMAS VAGAS" ou "INSCREVA-SE AGORA"
- Use verbos no imperativo: TRANSFORME, DESCUBRA, GARANTA

### 🖼️ Dicas de Imagens

**Tamanhos Recomendados:**
- **Hero Section:** 1920x1080px
- **Cards de Formação:** 800x600px
- **Capa de Livro:** 400x600px
- **Imagem de Blog:** 1200x630px
- **Foto de Perfil:** 500x500px

**Formatos:**
- Use **WebP** quando possível (menor tamanho)
- **JPG** para fotos
- **PNG** para logos/ícones com transparência

**Otimização:**
- Comprima imagens antes de usar (TinyPNG, Squoosh)
- Tamanho máximo recomendado: 500KB por imagem

### 🔍 SEO - Boas Práticas

**Meta Title:**
- Máximo 60 caracteres
- Inclua palavra-chave principal
- Inclua nome da marca
- Exemplo: "Educador Financeiro - Curso 90 Dias | Roberto Navarro"

**Meta Description:**
- Máximo 160 caracteres
- Inclua benefício principal
- Chamada para ação
- Exemplo: "Torne-se um Educador Financeiro certificado em 90 dias. Método exclusivo de Roberto Navarro. Comece sua transformação hoje!"

**Keywords:**
- 5 a 10 palavras-chave
- Separe por vírgula
- Use variações (singular/plural, com/sem acento)
- Exemplo: "educador financeiro, coach financeiro, curso finanças, educação financeira, roberto navarro"

### 🎨 Cores e Gradientes

**Cores Principais do Instituto:**
- **Amarelo/Dourado:** `yellow-400`, `yellow-500`, `amber-500`, `amber-600`
- **Vermelho:** `red-500`, `red-600`
- **Cinza Escuro:** `zinc-900`, `zinc-950`
- **Texto:** `zinc-300`, `white`

**Gradientes Comuns:**
```
Botão Amarelo: from-yellow-500 to-amber-600
Botão Vermelho: from-red-500 to-red-600
Título Destaque: from-yellow-400 to-amber-500
```

> **💡 Dica:** Mantenha a consistência visual usando sempre as mesmas cores!

### ⚡ Performance

**Para manter o site rápido:**
- Não use imagens muito grandes (máx. 500KB)
- Evite adicionar muitos vídeos em uma única página
- Comprima PDFs antes de fazer referência
- Use URLs curtas e descritivas

---

## 11. SUPORTE

### 🆘 Problemas Comuns

#### **1. Não consigo publicar alterações**

**Solução:**
- Verifique se você está logado
- Certifique-se de clicar em "Publish" (não apenas "Save")
- Aguarde alguns segundos e recarregue a página do site
- Se persistir, limpe o cache do navegador (Ctrl+Shift+Delete)

#### **2. Imagem não aparece no site**

**Solução:**
- Verifique se a URL da imagem está correta
- Teste a URL abrindo em uma nova aba
- Certifique-se de que a imagem está hospedada online (não no seu computador)
- Use URLs completas: `https://...` ou `/images/...`

#### **3. Link não funciona**

**Solução:**
- Links internos devem começar com `/` (ex: `/formacoes/mentoria`)
- Links externos devem começar com `https://` (ex: `https://google.com`)
- Verifique se não há espaços antes ou depois do link
- Para âncoras, use `#nome-da-secao` (ex: `#inscricao`)

#### **4. Formulário não está enviando dados**

**Solução:**
- Verifique se o webhook está configurado em "Integrações e Webhooks"
- Confirme se o **Source** da página corresponde ao configurado
- Teste o webhook manualmente com uma ferramenta como Postman
- Verifique os logs do servidor

#### **5. Alterações não aparecem no site**

**Solução:**
- Aguarde 1-2 minutos (o site pode estar em cache)
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se clicou em "Publish" (não apenas "Save")
- Em último caso, entre em contato com o suporte técnico

### 📞 Contato para Suporte

**Desenvolvedor:**
- **Empresa:** M2Z Digital
- **Email:** suporte@m2z.digital
- **Telefone:** (00) 0000-0000
- **Horário:** Segunda a Sexta, 9h às 18h

**Suporte Técnico Sanity:**
- **Documentação:** https://www.sanity.io/docs
- **Comunidade:** https://slack.sanity.io

### 📚 Recursos Adicionais

**Tutoriais em Vídeo:**
- Canal do YouTube do Sanity: https://youtube.com/c/SanityIO
- Playlist de tutoriais: (link quando disponível)

**Documentação Oficial:**
- Sanity Docs: https://www.sanity.io/docs
- Portable Text: https://www.sanity.io/docs/portable-text
- GROQ Query: https://www.sanity.io/docs/groq

---

## 📊 ESTATÍSTICAS DO PROJETO

### 📈 Números da Migração

- **9 Schemas** criados
- **61 Páginas/Documentos** migrados
- **33 Posts de Blog** populados
- **10 Webhooks** configurados
- **100% de Conteúdo** editável via CMS
- **0 Erros** no build de produção

### 🎯 Benefícios Alcançados

✅ **Autonomia Total** - Edite o site sem depender de programador  
✅ **Rapidez** - Publique alterações em minutos  
✅ **Segurança** - Sistema de versionamento e backups automáticos  
✅ **SEO Otimizado** - Controle total sobre meta tags  
✅ **Integrações** - Webhooks configuráveis para CRM e automação  
✅ **Performance** - Site otimizado e rápido

---

## 🎓 CONCLUSÃO

Parabéns! Agora você tem o conhecimento para gerenciar todo o conteúdo do site do Instituto Coaching Financeiro de forma autônoma e profissional.

### 🚀 Próximos Passos

1. **Familiarize-se** com o Sanity Studio (explore sem medo!)
2. **Faça testes** em documentos não críticos primeiro
3. **Crie um novo post** de blog para praticar
4. **Atualize uma formação** com informações mais recentes
5. **Configure webhooks** se ainda não fez

### 💪 Dica Final

> **"A melhor maneira de aprender é fazendo. Não tenha medo de explorar e testar. Você sempre pode desfazer suas alterações antes de publicar!"**

---

<div align="center">

### 🌟 SISTEMA DESENVOLVIDO COM EXCELÊNCIA POR M2Z DIGITAL

**Transformando Conhecimento em Tecnologia**

![Instituto Coaching Financeiro](https://img.shields.io/badge/Instituto-Coaching_Financeiro-yellow?style=for-the-badge)
![M2Z Digital](https://img.shields.io/badge/Desenvolvido_por-M2Z_Digital-blue?style=for-the-badge)

**Versão do Manual:** 1.0  
**Última Atualização:** 16 de Outubro de 2025

---

© 2025 M2Z Digital - Todos os direitos reservados  
Instituto Coaching Financeiro | Roberto Navarro

</div>

