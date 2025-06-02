# Configuração da Integração com Kommo CRM

## Pré-requisitos

1. Conta ativa no Kommo CRM
2. Acesso de administrador para configurar integrações
3. Token de acesso da API do Kommo

## Passo 1: Obter Token de Acesso

1. Acesse seu painel do Kommo
2. Vá em **Configurações** > **API e Webhooks**
3. Crie uma nova integração ou use uma existente
4. Copie o **Access Token**

## Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`env
# Configurações do Kommo CRM
KOMMO_SUBDOMAIN=seu-subdominio
KOMMO_ACCESS_TOKEN=seu-token-de-acesso

# IDs dos campos customizados (você precisa descobrir estes IDs)
KOMMO_PHONE_FIELD_ID=123456
KOMMO_EMAIL_FIELD_ID=123457
KOMMO_SOURCE_FIELD_ID=123458

# IDs dos pipelines
KOMMO_LEADS_PIPELINE_ID=123459
KOMMO_FORMACOES_PIPELINE_ID=123460

# IDs dos status
KOMMO_NEW_LEAD_STATUS_ID=123461
KOMMO_CONTACTED_STATUS_ID=123462
\`\`\`

## Passo 3: Descobrir IDs dos Campos

Para descobrir os IDs dos campos customizados:

1. Faça uma requisição GET para: `https://seu-subdominio.kommo.com/api/v4/leads/custom_fields`
2. Ou use o endpoint de teste: `POST /api/test-kommo`

## Passo 4: Configurar Pipelines e Status

1. No Kommo, crie pipelines para:
   - **Leads Gerais**: Para leads de eventos
   - **Formações**: Para leads de cursos e mentorias

2. Configure status apropriados:
   - **Novo Lead**: Status inicial
   - **Contatado**: Após primeiro contato

## Passo 5: Configurar Webhooks (Opcional)

Para receber notificações do Kommo:

1. No painel do Kommo, vá em **Configurações** > **Webhooks**
2. Adicione a URL: `https://seu-dominio.com/api/webhook-kommo`
3. Selecione os eventos que deseja receber

## Passo 6: Testar a Integração

Execute o teste da integração:

\`\`\`bash
curl -X POST https://seu-dominio.com/api/test-kommo
\`\`\`

## Estrutura dos Dados

### Lead criado no Kommo:
- **Nome**: "Lead: [Nome do Cliente] - [Fonte]"
- **Pipeline**: Baseado na fonte (Formações ou Leads Gerais)
- **Status**: Novo Lead
- **Contato**: Criado automaticamente com email e telefone
- **Campo Source**: Origem do lead

### Campos Customizados Necessários:
- **Email**: Para armazenar email do contato
- **Telefone**: Para armazenar telefone do contato  
- **Fonte**: Para identificar origem do lead

## Troubleshooting

### Erro de Autenticação
- Verifique se o token está correto
- Confirme se o subdomínio está correto

### Erro de Campo Não Encontrado
- Verifique os IDs dos campos customizados
- Use a API para listar campos disponíveis

### Lead Não Aparece
- Verifique se o pipeline_id está correto
- Confirme se o status_id existe no pipeline

## Monitoramento

Os logs da integração aparecem no console do servidor. Para produção, configure um sistema de logs adequado.

## Backup

A integração mantém o Google Sheets como backup. Se o Kommo falhar, os dados ainda serão salvos na planilha.
