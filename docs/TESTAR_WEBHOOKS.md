# Como Testar os Webhooks

Guia prático para testar o sistema de webhooks do Payload CMS.

## 🧪 Método 1: Usando Webhook.site (Mais Fácil)

### Passo 1: Obter URL de Teste

1. Acesse: https://webhook.site
2. Você receberá uma URL única, exemplo:
   ```
   https://webhook.site/12345678-1234-1234-1234-123456789abc
   ```
3. **Copie essa URL** - você vai precisar dela

### Passo 2: Criar Webhook no Payload

1. Acesse o admin: `http://localhost:3000/admin`
2. Vá em **Configurações > Webhooks**
3. Clique em **"Criar Novo"**
4. Preencha:
   - **Nome**: `Teste - Webhook.site`
   - **Habilitado**: ✅ (marcado)
   - **URL**: Cole a URL do webhook.site
   - **Collection**: `Eventos` (ou qualquer outra)
   - **Eventos**: Selecione `afterChange` e `afterCreate`
   - **Método HTTP**: `POST`
5. Clique em **"Salvar"**

### Passo 3: Disparar o Webhook

1. Vá em **Conteúdo > Eventos** (ou a collection que você escolheu)
2. Crie um novo evento OU edite um existente
3. Salve o evento
4. **Volte para o webhook.site** - você verá a requisição aparecer!

### Passo 4: Verificar o Payload

No webhook.site, você verá:
- **Headers** enviados
- **Body** completo com todos os dados do evento
- **Timestamp** da requisição

---

## 🧪 Método 2: Usando RequestBin

### Passo 1: Criar Bin

1. Acesse: https://requestbin.com
2. Clique em **"Create a RequestBin"**
3. Copie a URL gerada, exemplo:
   ```
   https://requestbin.com/r/abc123xyz
   ```

### Passo 2: Configurar Webhook

Siga os mesmos passos do Método 1, mas use a URL do RequestBin.

---

## 🧪 Método 3: Usando ngrok (Para Testar Localmente)

Se você quiser testar com um endpoint local:

### Passo 1: Criar Endpoint de Teste

Crie um arquivo `app/api/test-webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  console.log('📨 Webhook recebido!')
  console.log('Event:', body.event)
  console.log('Collection:', body.collection)
  console.log('Operation:', body.operation)
  console.log('Data:', JSON.stringify(body.data, null, 2))
  
  return NextResponse.json({ 
    success: true, 
    received: new Date().toISOString() 
  })
}
```

### Passo 2: Expor com ngrok

```bash
# Instalar ngrok (se não tiver)
brew install ngrok

# Expor porta 3000
ngrok http 3000
```

### Passo 3: Usar URL do ngrok

Use a URL do ngrok (ex: `https://abc123.ngrok.io/api/test-webhook`) no webhook.

---

## 🧪 Método 4: Teste Completo com Script

Crie um script para testar todos os eventos:

### Criar arquivo `scripts/test-webhook.ts`:

```typescript
import { getPayload } from 'payload'
import config from '../payload.config'

async function testWebhooks() {
  const payload = await getPayload({ config })
  
  console.log('🧪 Testando webhooks...\n')
  
  // Criar um evento de teste
  const evento = await payload.create({
    collection: 'eventos',
    data: {
      title: 'Evento de Teste Webhook',
      slug: 'evento-teste-webhook-' + Date.now(),
      status: 'published',
      date: new Date(),
      hero: {
        title: 'Teste',
        subtitle: 'Testando webhooks',
      },
    },
  })
  
  console.log('✅ Evento criado:', evento.id)
  console.log('📨 Webhooks devem ter sido disparados!\n')
  
  // Atualizar o evento
  await payload.update({
    collection: 'eventos',
    id: evento.id,
    data: {
      title: 'Evento de Teste Webhook - Atualizado',
    },
  })
  
  console.log('✅ Evento atualizado')
  console.log('📨 Webhooks devem ter sido disparados novamente!\n')
  
  // Deletar o evento
  await payload.delete({
    collection: 'eventos',
    id: evento.id,
  })
  
  console.log('✅ Evento deletado')
  console.log('📨 Webhook de delete deve ter sido disparado!\n')
  
  console.log('✨ Teste completo! Verifique seus webhooks.')
}

testWebhooks().catch(console.error)
```

### Executar:

```bash
npx tsx scripts/test-webhook.ts
```

---

## ✅ Checklist de Teste

Teste cada um desses cenários:

- [ ] **Criar documento** - Webhook `afterCreate` e `afterChange` devem disparar
- [ ] **Atualizar documento** - Webhook `afterUpdate` e `afterChange` devem disparar
- [ ] **Deletar documento** - Webhook `afterDelete` deve disparar
- [ ] **Webhook desabilitado** - Não deve disparar
- [ ] **Collection diferente** - Não deve disparar
- [ ] **Evento não configurado** - Não deve disparar
- [ ] **Timeout** - Deve registrar erro se endpoint não responder
- [ ] **Headers customizados** - Devem ser enviados
- [ ] **Secret/Assinatura** - Deve estar no header `X-Webhook-Signature`

---

## 🔍 Verificar Status no Admin

Após disparar um webhook:

1. Vá em **Configurações > Webhooks**
2. Abra o webhook que você criou
3. Verifique os campos:
   - **Última Execução**: Data/hora da última execução
   - **Último Status**: `success`, `error`, `timeout` ou `never`
   - **Última Resposta**: Mensagem de sucesso ou erro

---

## 🐛 Troubleshooting

### Webhook não está disparando?

1. ✅ Verifique se está **Habilitado**
2. ✅ Verifique se o **Evento** está na lista
3. ✅ Verifique se a **Collection** corresponde
4. ✅ Verifique os logs do servidor:
   ```bash
   # No terminal onde o servidor está rodando
   # Procure por mensagens como:
   # "✅ Webhook executado com sucesso"
   # "❌ Erro ao executar webhook"
   ```

### Webhook retorna erro?

1. ✅ Verifique se a URL está correta e acessível
2. ✅ Verifique se o endpoint aceita POST
3. ✅ Verifique se o endpoint retorna 200 OK
4. ✅ Veja a **Última Resposta** no admin para detalhes

### Webhook está lento?

1. ✅ Aumente o **Timeout** (padrão: 10 segundos)
2. ✅ Verifique a performance do endpoint externo
3. ✅ Webhooks são executados de forma assíncrona (não bloqueiam o CMS)

---

## 📊 Exemplo de Payload Recebido

Quando um webhook é disparado, você receberá algo assim:

```json
{
  "event": "afterChange",
  "operation": "create",
  "collection": "eventos",
  "data": {
    "id": "6910485ef754352c72b61fcd",
    "title": "Crenças da Riqueza",
    "slug": "crencas-da-riqueza",
    "status": "published",
    "date": "2025-09-13T13:00:00.000Z",
    "hero": {
      "badge": "TRANSFORMAÇÃO MENTAL",
      "title": "CRENÇAS DA RIQUEZA",
      "subtitle": "A riqueza começa na mente..."
    },
    // ... todos os outros campos
  },
  "timestamp": "2025-11-11T23:30:00.000Z",
  "webhookId": "webhook-id-aqui",
  "webhookName": "Teste - Webhook.site"
}
```

### Headers Enviados:

```
Content-Type: application/json
User-Agent: PayloadCMS-Webhook/1.0
X-Webhook-Event: afterChange
X-Webhook-Collection: eventos
X-Webhook-Operation: create
X-Webhook-Signature: abc123... (se secret estiver configurado)
```

---

## 🎯 Teste Rápido (2 minutos)

1. Acesse https://webhook.site
2. Copie a URL única
3. No admin do Payload: **Configurações > Webhooks > Criar Novo**
4. Cole a URL, selecione **Eventos** e **afterChange**
5. Salve
6. Vá em **Eventos**, edite qualquer evento e salve
7. Volte no webhook.site - você verá a requisição! 🎉

---

Pronto! Agora você sabe como testar os webhooks. 🚀

