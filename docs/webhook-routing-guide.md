# 📨 Guia de Roteamento de Webhooks

## Visão Geral

O sistema agora direciona automaticamente os leads para diferentes webhooks do Kommo baseado na origem do lead (campo `source`).

## Mapeamento de Webhooks

| Evento/Página | Valor do Source | Webhook |
|---------------|----------------|---------|
| **Energia do Dinheiro** | `"Energia do Dinheiro"` | `...10bb731833c0cc2e...` |
| **Mentor Milionário** | `"Mentor Milionário"` | `...b73e5487da2301...` |
| **Crenças da Riqueza** | `"Crenças da Riqueza"` | `...83a88161bbd8ca...` |
| **Segredos da Mente Milionária** | `"Segredos da Mente Milionária"` | `...e715464a9cabe0...` |
| **Educador Financeiro** (padrão) | Qualquer outro valor | `...d06a4f8eeb692a...` |

## Como Funciona

### 1. Componentes que Capturam Leads

Os seguintes componentes capturam leads e enviam para a API:

- `NewsletterFormacoes` - Formulários de inscrição em eventos
- `NewsletterSignup` - Newsletter geral
- `WhatsAppButton` - Botão flutuante do WhatsApp

### 2. Fluxo de Dados

```
Página do Evento
    ↓
Component (NewsletterFormacoes/WhatsAppButton)
    ↓ (passa o campo "source")
submitLead() em /lib/actions.ts
    ↓
getWebhookUrl(source) - determina o webhook correto
    ↓
Envia para o webhook específico do Kommo
```

### 3. Função `getWebhookUrl()`

Localizada em `/lib/actions.ts`, esta função:

- Recebe o valor de `source` do lead
- Normaliza o texto (lowercase, trim)
- Busca no mapeamento `WEBHOOK_URLS`
- Retorna o webhook específico ou o padrão se não encontrar

### 4. Exemplo de Uso nas Páginas

**Energia do Dinheiro** (`/app/eventos/energia-do-dinheiro/page.tsx`):
```tsx
<NewsletterFormacoes
  source="Energia do Dinheiro"  // ← Este valor determina o webhook
  title="GARANTA SUA VAGA NO ENERGIA DO DINHEIRO"
  // ...
/>
```

**Segredos da Mente Milionária** (`/app/eventos/segredos-da-mente-milionaria/page.tsx`):
```tsx
<NewsletterFormacoes
  source="Segredos da Mente Milionária"  // ← Direciona para webhook específico
  title="GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA"
  // ...
/>
```

## Adicionando Novos Eventos

Para adicionar um novo evento ao sistema de roteamento:

### 1. Edite `/lib/actions.ts`

Adicione o novo mapeamento no objeto `WEBHOOK_URLS`:

```typescript
const WEBHOOK_URLS: Record<string, string> = {
  // ... webhooks existentes ...
  
  // Novo Evento
  "nome-do-evento": "https://data.widgets.wearekwid.com/api/webhook/...",
  "Nome do Evento": "https://data.widgets.wearekwid.com/api/webhook/...",
}
```

### 2. Use o Source Correto na Página

Na página do evento, use o mesmo valor no componente:

```tsx
<NewsletterFormacoes
  source="Nome do Evento"  // ← Deve corresponder ao mapeamento
  // ...
/>
```

## Logs e Debug

A função `getWebhookUrl()` registra no console qual webhook está sendo usado:

```
[Webhook] Source: "Energia do Dinheiro" -> URL: https://data.widgets.wearekwid.com/api/webhook/34323419/10bb...
```

Para verificar os logs:
1. Abra as DevTools do navegador (F12)
2. Vá para a aba Console
3. Envie um lead e veja qual webhook foi usado

## Integração com LeadLovers e Google Sheets

O sistema **continua enviando** para todos os destinos:

1. ✅ **Kommo (Webhook específico)** - Baseado no evento
2. ✅ **Google Sheets** - Todas as leads
3. ✅ **LeadLovers** - Todas as leads

## Variações de Source Aceitas

Para maior flexibilidade, o sistema aceita múltiplas variações do mesmo evento:

- `"Energia do Dinheiro"` ou `"energia-do-dinheiro"`
- `"Crenças"`, `"Crenças da Riqueza"` ou `"crencas-da-riqueza"`
- etc.

A função normaliza o texto automaticamente para encontrar o webhook correto.

## Webhook Padrão

Se nenhum mapeamento específico for encontrado, o sistema usa o webhook **Educador Financeiro** como padrão:

```
default: "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"
```

Isso garante que nenhum lead seja perdido, mesmo que o `source` não esteja mapeado.

## Testando o Sistema

### 1. Teste Local

```bash
npm run dev
```

1. Acesse uma página de evento (ex: `/eventos/energia-do-dinheiro`)
2. Preencha o formulário de inscrição
3. Verifique os logs no console
4. Confirme que foi enviado para o webhook correto

### 2. Teste de Produção

Após o deploy, teste cada página de evento para garantir que:
- O formulário está sendo enviado
- Os logs mostram o webhook correto
- Os leads aparecem no Kommo correto

## Arquivos Modificados

- ✅ `/lib/actions.ts` - Adicionado mapeamento de webhooks e função `getWebhookUrl()`

## Suporte

Para problemas ou dúvidas:
1. Verifique os logs no console do navegador
2. Confirme que o valor de `source` corresponde ao mapeamento
3. Verifique se o webhook está respondendo corretamente

---

**Última atualização:** Outubro 2025

