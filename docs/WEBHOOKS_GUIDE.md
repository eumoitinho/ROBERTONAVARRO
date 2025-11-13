# Guia de Webhooks - Payload CMS

Sistema completo de webhooks configurável através do painel admin do Payload CMS.

## 🎯 O que são Webhooks?

Webhooks são notificações HTTP enviadas automaticamente quando eventos acontecem no CMS (criar, atualizar, deletar documentos). Eles permitem integrar o Payload CMS com sistemas externos.

## 📋 Como Configurar

### 1. Acessar a Configuração

1. Acesse o painel admin: `http://localhost:3000/admin`
2. No menu lateral, vá em **Configurações > Webhooks**
3. Clique em **"Criar Novo"**

### 2. Preencher os Campos

#### Campos Obrigatórios

- **Nome do Webhook**: Nome descritivo (ex: "Notificar Zapier quando evento é criado")
- **URL do Webhook**: URL completa que receberá as notificações
  - Exemplo: `https://hooks.zapier.com/hooks/catch/123456/abc123`
  - Deve começar com `http://` ou `https://`
- **Collection**: Selecione qual collection será monitorada
  - Formações, Eventos, Livros, Blog, Páginas, etc.
- **Eventos**: Selecione quais eventos devem disparar o webhook
  - `create` - Quando um documento é criado
  - `update` - Quando um documento é atualizado
  - `delete` - Quando um documento é deletado
  - `afterChange` - Após qualquer mudança (create ou update)
  - `afterCreate` - Após criar
  - `afterUpdate` - Após atualizar
  - `afterDelete` - Após deletar

#### Campos Opcionais

- **Método HTTP**: POST (padrão), PUT ou PATCH
- **Headers Customizados**: Adicione headers como Authorization, X-API-Key, etc.
- **Secret**: Secret para assinar o payload (será enviado no header `X-Webhook-Signature`)
- **Timeout**: Tempo máximo de espera (padrão: 10 segundos)
- **Tentar Novamente em Caso de Falha**: Habilita retry automático
- **Máximo de Tentativas**: Número de tentativas (se retry estiver habilitado)

### 3. Ativar o Webhook

Certifique-se de que o checkbox **"Habilitado"** está marcado.

## 📨 Formato do Payload

Quando um webhook é disparado, o seguinte payload é enviado:

```json
{
  "event": "afterChange",
  "operation": "create",
  "collection": "eventos",
  "data": {
    // Documento completo do Payload
    "id": "1234567890abcdef",
    "title": "Título do Evento",
    "slug": "evento-exemplo",
    // ... todos os outros campos
  },
  "timestamp": "2025-01-15T10:30:00.000Z",
  "webhookId": "webhook-id",
  "webhookName": "Nome do Webhook"
}
```

### Headers Enviados

- `Content-Type: application/json`
- `User-Agent: PayloadCMS-Webhook/1.0`
- `X-Webhook-Event`: Nome do evento (ex: `afterChange`)
- `X-Webhook-Collection`: Nome da collection (ex: `eventos`)
- `X-Webhook-Operation`: Operação (ex: `create`, `update`, `delete`)
- `X-Webhook-Signature`: Assinatura HMAC-SHA256 (se secret estiver configurado)

## 🔒 Segurança

### Assinatura HMAC

Se você configurar um **Secret**, o payload será assinado usando HMAC-SHA256 e enviado no header `X-Webhook-Signature`.

Para validar no seu endpoint:

```javascript
const crypto = require('crypto')

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}
```

### Headers de Autenticação

Use o campo **Headers Customizados** para adicionar autenticação:

- **Chave**: `Authorization`
- **Valor**: `Bearer seu-token-aqui`

## 📊 Monitoramento

O sistema rastreia automaticamente:

- **Última Execução**: Data e hora da última execução
- **Último Status**: `success`, `error`, `timeout` ou `never`
- **Última Resposta**: Mensagem de resposta ou erro

Essas informações aparecem na listagem de webhooks no admin.

## 🔧 Exemplos de Uso

### Exemplo 1: Notificar Zapier quando um evento é criado

```
Nome: Notificar Zapier - Novos Eventos
URL: https://hooks.zapier.com/hooks/catch/123456/abc123
Collection: Eventos
Eventos: afterCreate
Método: POST
Habilitado: ✓
```

### Exemplo 2: Enviar para Google Apps Script

```
Nome: Google Sheets - Formações
URL: https://script.google.com/macros/s/SCRIPT_ID/exec
Collection: Formações
Eventos: afterChange
Headers:
  - Authorization: Bearer seu-token
Habilitado: ✓
```

### Exemplo 3: Webhook com autenticação e assinatura

```
Nome: API Externa - Eventos
URL: https://api.exemplo.com/webhooks/payload
Collection: Eventos
Eventos: afterChange, afterDelete
Método: POST
Headers:
  - X-API-Key: sua-chave-api
Secret: seu-secret-aqui
Timeout: 15
Habilitado: ✓
```

## ⚠️ Observações Importantes

1. **Webhooks são executados de forma assíncrona**: Não bloqueiam a operação no CMS
2. **Falhas não afetam o CMS**: Se um webhook falhar, a operação no CMS continua normalmente
3. **Timeout padrão**: 10 segundos (configurável)
4. **Retry**: Se habilitado, tentará reenviar em caso de falha
5. **Logs**: Erros são logados no console do servidor

## 🐛 Troubleshooting

### Webhook não está sendo disparado

1. Verifique se está **Habilitado**
2. Verifique se o **Evento** está na lista de eventos configurados
3. Verifique se a **Collection** corresponde
4. Verifique os logs do servidor para erros

### Webhook retorna erro

1. Verifique a **URL** está correta e acessível
2. Verifique se o endpoint aceita o **método HTTP** configurado
3. Verifique os **Headers** se necessário
4. Verifique o **Timeout** (pode estar muito baixo)
5. Veja a **Última Resposta** no admin para detalhes do erro

### Webhook está lento

1. Aumente o **Timeout**
2. Verifique a performance do endpoint externo
3. Considere usar retry para tentar novamente em caso de timeout

## 📚 Collections com Suporte

Atualmente, os seguintes webhooks são disparados automaticamente:

- ✅ Formações (`formacoes`)
- ✅ Eventos (`eventos`)
- ⚠️ Outras collections podem ser adicionadas conforme necessário

Para adicionar suporte a outras collections, adicione os hooks em `collections/[Collection].ts`:

```typescript
import { webhookAfterChangeHook, webhookAfterDeleteHook } from '../lib/webhook-hooks'

// No CollectionConfig:
hooks: {
  afterChange: [webhookAfterChangeHook],
  afterDelete: [webhookAfterDeleteHook],
}
```

