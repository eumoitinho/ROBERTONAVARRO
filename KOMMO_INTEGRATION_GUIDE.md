# 🚀 Guia Completo de Integração com Kommo CRM

Este guia te ajudará a configurar a integração completa entre seu sistema e o Kommo CRM.

## 📋 Pré-requisitos

1. Conta ativa no Kommo CRM
2. Acesso de administrador ao Kommo
3. Domínio configurado para sua aplicação

## 🔧 Passo 1: Criar Integração no Kommo

### 1.1 Acessar Configurações
1. Faça login no seu Kommo: `https://[SEU_SUBDOMINIO].kommo.com`
2. Vá em **Configurações** → **Integrações** → **Criar integração**

### 1.2 Configurar Integração
\`\`\`
Nome da Integração: Sistema de Leads Website
Descrição: Integração para captura de leads do website
Tipo: Privada
\`\`\`

### 1.3 URLs Importantes
\`\`\`
URL de Redirecionamento: https://[SEU_DOMINIO]/obrigado
URL do Webhook: https://[SEU_DOMINIO]/api/webhook-kommo
\`\`\`

**⚠️ IMPORTANTE:** Substitua `[SEU_DOMINIO]` pelo domínio real da sua aplicação.

Exemplos:
- Produção: `https://meusite.com.br/obrigado`
- Desenvolvimento: `http://localhost:3000/obrigado`

### 1.4 Escopos Necessários
Marque as seguintes permissões:
- ✅ `crm` - Acesso completo ao CRM
- ✅ `leads` - Gerenciar leads
- ✅ `contacts` - Gerenciar contatos
- ✅ `companies` - Gerenciar empresas (opcional)

## 🔑 Passo 2: Obter Credenciais

Após criar a integração, você receberá:

\`\`\`env
KOMMO_CLIENT_ID=seu_client_id_aqui
KOMMO_CLIENT_SECRET=seu_client_secret_aqui
KOMMO_SUBDOMAIN=seu_subdominio_kommo
\`\`\`

## 🎯 Passo 3: Gerar Token de Acesso

### 3.1 URL de Autorização
Acesse esta URL no navegador (substitua os valores):

\`\`\`
https://[SEU_SUBDOMINIO].kommo.com/oauth2/authorize?client_id=[CLIENT_ID]&redirect_uri=https://[SEU_DOMINIO]/obrigado&response_type=code&state=random_string
\`\`\`

### 3.2 Obter Código de Autorização
1. Você será redirecionado para: `https://[SEU_DOMINIO]/obrigado?code=CODIGO_AQUI&state=random_string`
2. Copie o valor do parâmetro `code`

### 3.3 Trocar Código por Token
Execute este comando curl (substitua os valores):

\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/oauth2/access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "SEU_CLIENT_ID",
    "client_secret": "SEU_CLIENT_SECRET",
    "grant_type": "authorization_code",
    "code": "CODIGO_OBTIDO",
    "redirect_uri": "https://[SEU_DOMINIO]/obrigado"
  }'
\`\`\`

Resposta esperada:
\`\`\`json
{
  "token_type": "Bearer",
  "expires_in": 86400,
  "access_token": "SEU_ACCESS_TOKEN",
  "refresh_token": "SEU_REFRESH_TOKEN"
}
\`\`\`

## 🔍 Passo 4: Descobrir IDs dos Campos

### 4.1 Listar Campos Personalizados
\`\`\`bash
curl -X GET "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/custom_fields" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
\`\`\`

### 4.2 Criar Campos se Necessário
Se não existirem, crie os campos:

**Campo Telefone:**
\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/custom_fields" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Telefone",
    "type": "text",
    "code": "PHONE"
  }'
\`\`\`

**Campo Email:**
\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/custom_fields" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Email",
    "type": "text",
    "code": "EMAIL"
  }'
\`\`\`

**Campo Fonte:**
\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/custom_fields" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fonte do Lead",
    "type": "text",
    "code": "SOURCE"
  }'
\`\`\`

## 📊 Passo 5: Configurar Pipelines

### 5.1 Listar Pipelines Existentes
\`\`\`bash
curl -X GET "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/pipelines" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
\`\`\`

### 5.2 Criar Pipeline para Eventos (se necessário)
\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/pipelines" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eventos",
    "sort": 1,
    "statuses": [
      {
        "name": "Novo Lead",
        "sort": 1,
        "color": "#99ccff"
      },
      {
        "name": "Contatado",
        "sort": 2,
        "color": "#ffcc99"
      },
      {
        "name": "Interessado",
        "sort": 3,
        "color": "#ccffcc"
      },
      {
        "name": "Inscrito",
        "sort": 4,
        "color": "#99ff99"
      }
    ]
  }'
\`\`\`

### 5.3 Criar Pipeline para Formações (se necessário)
\`\`\`bash
curl -X POST "https://[SEU_SUBDOMINIO].kommo.com/api/v4/leads/pipelines" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Formações",
    "sort": 2,
    "statuses": [
      {
        "name": "Novo Lead",
        "sort": 1,
        "color": "#99ccff"
      },
      {
        "name": "Contatado",
        "sort": 2,
        "color": "#ffcc99"
      },
      {
        "name": "Interessado",
        "sort": 3,
        "color": "#ccffcc"
      },
      {
        "name": "Matriculado",
        "sort": 4,
        "color": "#99ff99"
      }
    ]
  }'
\`\`\`

## ⚙️ Passo 6: Configurar Variáveis de Ambiente

Adicione ao seu arquivo `.env.local`:

\`\`\`env
# Kommo CRM Configuration
KOMMO_SUBDOMAIN=seu_subdominio_kommo
KOMMO_ACCESS_TOKEN=seu_access_token_aqui
KOMMO_CLIENT_ID=seu_client_id_aqui
KOMMO_CLIENT_SECRET=seu_client_secret_aqui

# IDs dos Campos (descobrir usando as APIs)
KOMMO_PHONE_FIELD_ID=123456
KOMMO_EMAIL_FIELD_ID=123457
KOMMO_SOURCE_FIELD_ID=123458

# IDs dos Pipelines (descobrir usando as APIs)
KOMMO_LEADS_PIPELINE_ID=123459
KOMMO_FORMACOES_PIPELINE_ID=123460

# IDs dos Status (descobrir usando as APIs)
KOMMO_NEW_LEAD_STATUS_ID=123461
KOMMO_CONTACTED_STATUS_ID=123462
\`\`\`

## 🧪 Passo 7: Testar Integração

1. Acesse `/admin/test-kommo` no seu sistema
2. Verifique se todas as variáveis estão configuradas
3. Execute um teste de conexão
4. Crie um lead de teste

## 🔄 Passo 8: Configurar Webhook (Opcional)

No painel do Kommo:
1. Vá em **Configurações** → **Webhooks**
2. Adicione novo webhook:
   \`\`\`
   URL: https://[SEU_DOMINIO]/api/webhook-kommo
   Eventos: lead_status_changed, contact_created
   \`\`\`

## 🚨 Troubleshooting

### Erro 401 - Unauthorized
- Verifique se o token de acesso está correto
- Token pode ter expirado (válido por 24h)
- Use o refresh_token para gerar novo access_token

### Erro 400 - Bad Request
- Verifique se os IDs dos campos estão corretos
- Confirme se os dados estão no formato JSON válido

### Erro 404 - Not Found
- Verifique se o subdomínio está correto
- Confirme se os endpoints da API estão corretos

### Lead não aparece no Kommo
- Verifique se o pipeline_id está correto
- Confirme se o status_id existe no pipeline
- Verifique os logs da aplicação

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs em `/admin/test-kommo`
2. Consulte a documentação oficial do Kommo
3. Entre em contato com o suporte técnico

## 🎉 Pronto!

Sua integração com o Kommo está configurada! Todos os leads dos formulários agora serão enviados automaticamente para o CRM.
