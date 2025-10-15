# 🎨 Sanity CMS - Resumo Rápido

## ✅ O que ESTÁ no Sanity (100% Editável)

### 1. Páginas Dinâmicas via `/[slug]`

Você pode criar QUALQUER página através do Studio:

**Exemplos de URLs possíveis**:
- `/sobre` - Página institucional
- `/contato` - Página de contato  
- `/servicos` - Página de serviços
- `/qualquer-coisa` - Literalmente qualquer URL

**Como criar**:
1. Acesse: `http://localhost:3000/studio`
2. Clique em "Página" → "Create"
3. Preencha:
   - Título
   - Slug (URL)
   - Hero (título, subtítulo, imagem)
   - Conteúdo (editor visual)
   - Depoimentos, FAQ, etc
4. Publique
5. ✅ Página criada!

**Editável via Studio**:
- ✅ Hero completo
- ✅ Textos e imagens
- ✅ Depoimentos
- ✅ FAQ
- ✅ Galeria de fotos
- ✅ Vídeos
- ✅ CTAs e botões
- ✅ SEO (meta tags)
- ✅ CSS customizado

---

## ❌ O que NÃO está no Sanity (Hardcoded)

### Todas essas páginas precisam editar CÓDIGO:

#### 🎪 **Eventos** (5 páginas)
- `/eventos/energia-do-dinheiro`
- `/eventos/mentor-milionario`
- `/eventos/segredos-da-mente-milionaria`
- `/eventos/crencas-da-riqueza`
- `/eventos/escalador-de-negocios`

**Para editar**: Abrir arquivo `.tsx` e editar JSX

#### 🎓 **Formações** (9 páginas)
- `/formacoes/educador-financeiro`
- `/formacoes/mentoria`
- `/formacoes/empreendedor-inteligente`
- E mais 6...

**Para editar**: Abrir arquivo `.tsx` e editar JSX

#### 📚 **Livros** (4 páginas)
- `/livros/arte-de-enriquecer`
- `/livros/coaching-financeiro`
- `/livros/quebrando-mitos`
- `/livros/sabedoria-do-dinheiro`

**Para editar**: Abrir arquivo `.tsx` e editar JSX

#### 📝 **Blog** (Preparado, mas usando dados fixos)
- `/blog` - Lista de posts
- `/blog/[slug]` - Posts individuais

**Status**: Sistema pronto para Sanity, mas usa dados de `fallback-data.ts`

#### 🏠 **Homepage** (`/`)
- Página principal do site

**Para editar**: Abrir `app/page.tsx` e editar JSX

#### 📄 **Outras**
- `/lp/*` - Landing pages
- `/politica-privacidade`
- `/trabalhe-conosco`
- `/lives`
- `/obrigado`

---

## 📊 Resumo Visual

```
╔══════════════════════════════════════════════╗
║           SANITY CMS HOJE                    ║
╠══════════════════════════════════════════════╣
║                                              ║
║  ✅ EDITÁVEL (4%)                            ║
║  ├─ Páginas dinâmicas /[slug]                ║
║  └─ Configurações globais                    ║
║                                              ║
║  ❌ HARDCODED (96%)                          ║
║  ├─ 5 Eventos                                ║
║  ├─ 9 Formações                              ║
║  ├─ 4 Livros                                 ║
║  ├─ Blog (preparado)                         ║
║  ├─ Homepage                                 ║
║  └─ 6 Outras páginas                         ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## 🎯 Decisão: Quando Usar Cada Um?

### Use Sanity para:
✅ Páginas institucionais simples  
✅ Novas landing pages de teste  
✅ Conteúdo que muda muito  
✅ Páginas criadas por não-desenvolvedores

### Mantenha Hardcoded para:
✅ Eventos (design muito customizado)  
✅ Formações (layouts complexos)  
✅ Homepage (performance crítica)  
✅ Páginas com lógica complexa

## 🚀 Quer Migrar Tudo para Sanity?

### Passos:

1. **Blog primeiro** (mais fácil - 2-3 dias)
2. **1 Evento piloto** (testar viabilidade - 5 dias)
3. **Avaliar resultado** (vale a pena continuar?)
4. **Outros eventos** se fizer sentido (10-15 dias)
5. **Formações** por último (15-20 dias)

**Tempo total para 100% Sanity**: ~40-50 dias de trabalho

---

## 🎨 Acessar o Studio Agora

```bash
npm run studio
```

Acesse: **http://localhost:3000/studio**

Ou se dev está rodando:

Acesse: **http://localhost:3000/studio** (mesmo servidor)

---

**Conclusão**: Sanity está 100% configurado e funcional, mas a maioria do conteúdo ainda está hardcoded por design/performance. Funciona perfeitamente para criar novas páginas dinâmicas!

