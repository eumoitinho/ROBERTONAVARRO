# 📸 Captura do Site em Produção

Este script usa Playwright para capturar o conteúdo, estrutura e design de todas as páginas do site em produção.

## 🚀 Como Usar

### 1. Configurar URL de Produção

Defina a URL do site em produção:

```bash
export PRODUCTION_URL="https://robertonavarro.com.br"
```

Ou edite o arquivo `scripts/capture-production-site.ts` e altere a constante `PRODUCTION_URL`.

### 2. Executar Captura

```bash
pnpm capture:production
```

### 3. Resultados

Os arquivos serão salvos em `captures/`:

```
captures/
├── summary.json              # Resumo de todas as páginas
├── screenshots/              # Screenshots de cada página
│   ├── home-full.png
│   ├── home-viewport.png
│   └── ...
├── home.json                 # Dados estruturados da home
├── home.html                 # HTML completo
├── home.txt                  # Texto puro
└── ...
```

## 📊 O que é Capturado

Para cada página:

- ✅ **HTML completo** - Estrutura completa da página
- ✅ **Texto visível** - Todo o texto renderizado
- ✅ **Seções estruturadas** - Elementos com IDs, classes, tags
- ✅ **Metadata** - Title, description, OG tags, canonical
- ✅ **Screenshots** - Full page e viewport
- ✅ **Estrutura de componentes** - IDs, classes CSS, hierarquia

## 🔄 Próximos Passos

Após a captura:

1. **Analisar diferenças** - Comparar conteúdo capturado vs migrado
2. **Ajustar templates** - Corrigir templates para ficarem idênticos
3. **Atualizar textos** - Ajustar textos no Payload para corresponder ao original
4. **Verificar design** - Comparar screenshots e ajustar CSS/componentes

## ⚙️ Configuração

### Páginas Capturadas

Edite `PAGES_TO_CAPTURE` em `scripts/capture-production-site.ts` para adicionar/remover páginas.

### Timeout

Ajuste o timeout se páginas demorarem para carregar:

```typescript
await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 60000 })
```

## 📝 Notas

- O script aguarda 2 segundos após carregar cada página para garantir que JavaScript executou
- Screenshots são salvos em PNG
- HTML e texto são salvos separadamente para facilitar análise
- Seções são extraídas automaticamente baseado em tags, IDs e classes

