#!/bin/bash

echo "🚀 Configuração da Integração Kommo CRM"
echo "======================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Este script te ajudará a configurar a integração com o Kommo CRM${NC}"
echo ""

# Verificar se o arquivo .env.local existe
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Criando arquivo .env.local...${NC}"
    cp .env.example .env.local
fi

echo -e "${GREEN}✅ Passo 1: Informações Básicas${NC}"
echo "================================"

read -p "Digite seu subdomínio do Kommo (ex: minhaempresa): " SUBDOMAIN
read -p "Digite seu domínio da aplicação (ex: https://meusite.com.br): " APP_DOMAIN

echo ""
echo -e "${GREEN}✅ Passo 2: URLs para Configurar no Kommo${NC}"
echo "=========================================="
echo ""
echo -e "${YELLOW}Configure estas URLs na sua integração Kommo:${NC}"
echo ""
echo -e "URL de Redirecionamento: ${BLUE}${APP_DOMAIN}/obrigado${NC}"
echo -e "URL do Webhook: ${BLUE}${APP_DOMAIN}/api/webhook-kommo${NC}"
echo ""
echo -e "${RED}⚠️  IMPORTANTE: Use essas URLs exatas ao criar a integração no Kommo!${NC}"
echo ""

read -p "Pressione ENTER após configurar as URLs no Kommo..."

echo ""
echo -e "${GREEN}✅ Passo 3: Credenciais da Integração${NC}"
echo "===================================="

read -p "Digite seu CLIENT_ID do Kommo: " CLIENT_ID
read -p "Digite seu CLIENT_SECRET do Kommo: " CLIENT_SECRET

echo ""
echo -e "${GREEN}✅ Passo 4: Gerar Token de Acesso${NC}"
echo "================================="
echo ""
echo -e "${YELLOW}Acesse esta URL no seu navegador:${NC}"
echo ""
echo -e "${BLUE}https://${SUBDOMAIN}.kommo.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${APP_DOMAIN}/obrigado&response_type=code&state=setup${NC}"
echo ""
echo -e "${YELLOW}Após autorizar, você será redirecionado para:${NC}"
echo -e "${BLUE}${APP_DOMAIN}/obrigado?code=CODIGO_AQUI&state=setup${NC}"
echo ""

read -p "Digite o código obtido da URL de redirecionamento: " AUTH_CODE

echo ""
echo -e "${YELLOW}Obtendo token de acesso...${NC}"

# Fazer requisição para obter token
TOKEN_RESPONSE=$(curl -s -X POST "https://${SUBDOMAIN}.kommo.com/oauth2/access_token" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_id\": \"${CLIENT_ID}\",
    \"client_secret\": \"${CLIENT_SECRET}\",
    \"grant_type\": \"authorization_code\",
    \"code\": \"${AUTH_CODE}\",
    \"redirect_uri\": \"${APP_DOMAIN}/obrigado\"
  }")

# Extrair access_token da resposta
ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo -e "${RED}❌ Erro ao obter token. Resposta:${NC}"
    echo $TOKEN_RESPONSE
    exit 1
fi

echo -e "${GREEN}✅ Token obtido com sucesso!${NC}"

echo ""
echo -e "${GREEN}✅ Passo 5: Descobrir IDs dos Campos${NC}"
echo "=================================="

# Buscar campos personalizados
echo -e "${YELLOW}Buscando campos personalizados...${NC}"
FIELDS_RESPONSE=$(curl -s -X GET "https://${SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

echo "Campos encontrados:"
echo $FIELDS_RESPONSE | jq '.[] | {id: .id, name: .name, code: .code}' 2>/dev/null || echo $FIELDS_RESPONSE

echo ""
read -p "Digite o ID do campo TELEFONE (ou pressione ENTER para criar): " PHONE_FIELD_ID
read -p "Digite o ID do campo EMAIL (ou pressione ENTER para criar): " EMAIL_FIELD_ID
read -p "Digite o ID do campo FONTE (ou pressione ENTER para criar): " SOURCE_FIELD_ID

# Criar campos se não existirem
if [ -z "$PHONE_FIELD_ID" ]; then
    echo -e "${YELLOW}Criando campo Telefone...${NC}"
    PHONE_RESPONSE=$(curl -s -X POST "https://${SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"name": "Telefone", "type": "text", "code": "PHONE"}')
    PHONE_FIELD_ID=$(echo $PHONE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
fi

if [ -z "$EMAIL_FIELD_ID" ]; then
    echo -e "${YELLOW}Criando campo Email...${NC}"
    EMAIL_RESPONSE=$(curl -s -X POST "https://${SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"name": "Email", "type": "text", "code": "EMAIL"}')
    EMAIL_FIELD_ID=$(echo $EMAIL_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
fi

if [ -z "$SOURCE_FIELD_ID" ]; then
    echo -e "${YELLOW}Criando campo Fonte...${NC}"
    SOURCE_RESPONSE=$(curl -s -X POST "https://${SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"name": "Fonte do Lead", "type": "text", "code": "SOURCE"}')
    SOURCE_FIELD_ID=$(echo $SOURCE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
fi

echo ""
echo -e "${GREEN}✅ Passo 6: Configurar Pipelines${NC}"
echo "==============================="

# Buscar pipelines
echo -e "${YELLOW}Buscando pipelines existentes...${NC}"
PIPELINES_RESPONSE=$(curl -s -X GET "https://${SUBDOMAIN}.kommo.com/api/v4/leads/pipelines" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

echo "Pipelines encontrados:"
echo $PIPELINES_RESPONSE | jq '.[] | {id: .id, name: .name}' 2>/dev/null || echo $PIPELINES_RESPONSE

echo ""
read -p "Digite o ID do pipeline para EVENTOS (ou pressione ENTER para usar o primeiro): " EVENTS_PIPELINE_ID
read -p "Digite o ID do pipeline para FORMAÇÕES (ou pressione ENTER para usar o primeiro): " FORMACOES_PIPELINE_ID

# Se não especificado, usar o primeiro pipeline
if [ -z "$EVENTS_PIPELINE_ID" ]; then
    EVENTS_PIPELINE_ID=$(echo $PIPELINES_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
fi

if [ -z "$FORMACOES_PIPELINE_ID" ]; then
    FORMACOES_PIPELINE_ID=$(echo $PIPELINES_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
fi

# Buscar status do primeiro pipeline
STATUSES_RESPONSE=$(curl -s -X GET "https://${SUBDOMAIN}.kommo.com/api/v4/leads/pipelines/${EVENTS_PIPELINE_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

NEW_LEAD_STATUS_ID=$(echo $STATUSES_RESPONSE | grep -o '"statuses":\[{"id":[0-9]*' | cut -d':' -f3)
CONTACTED_STATUS_ID=$(echo $STATUSES_RESPONSE | grep -o '"id":[0-9]*' | head -2 | tail -1 | cut -d':' -f2)

echo ""
echo -e "${GREEN}✅ Passo 7: Atualizando .env.local${NC}"
echo "================================="

# Atualizar arquivo .env.local
cat >> .env.local << EOF

# Kommo CRM Configuration
KOMMO_SUBDOMAIN=${SUBDOMAIN}
KOMMO_ACCESS_TOKEN=${ACCESS_TOKEN}
KOMMO_CLIENT_ID=${CLIENT_ID}
KOMMO_CLIENT_SECRET=${CLIENT_SECRET}

# IDs dos Campos
KOMMO_PHONE_FIELD_ID=${PHONE_FIELD_ID}
KOMMO_EMAIL_FIELD_ID=${EMAIL_FIELD_ID}
KOMMO_SOURCE_FIELD_ID=${SOURCE_FIELD_ID}

# IDs dos Pipelines
KOMMO_LEADS_PIPELINE_ID=${EVENTS_PIPELINE_ID}
KOMMO_FORMACOES_PIPELINE_ID=${FORMACOES_PIPELINE_ID}

# IDs dos Status
KOMMO_NEW_LEAD_STATUS_ID=${NEW_LEAD_STATUS_ID}
KOMMO_CONTACTED_STATUS_ID=${CONTACTED_STATUS_ID}
EOF

echo -e "${GREEN}✅ Configuração concluída!${NC}"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "1. Reinicie sua aplicação"
echo "2. Acesse /admin/test-kommo para testar"
echo "3. Configure webhook no Kommo (opcional):"
echo -e "   URL: ${BLUE}${APP_DOMAIN}/api/webhook-kommo${NC}"
echo ""
echo -e "${GREEN}🎉 Integração Kommo configurada com sucesso!${NC}"
