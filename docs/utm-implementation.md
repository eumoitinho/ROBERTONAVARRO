# Implementação de Parâmetros UTM para Eventos

## ✅ O que foi implementado

### 1. Biblioteca de Rastreamento UTM (`lib/utm-tracker.ts`)
- Captura parâmetros UTM da URL atual
- Armazena UTMs no sessionStorage para persistência
- Constrói URLs com parâmetros UTM automaticamente
- Suporta parâmetros adicionais como `fbclid`, `gclid`, `ref`

### 2. Componente de Botão CTA (`components/event-cta-button.tsx`)
- Componente reutilizável que captura UTMs automaticamente
- Adiciona UTMs ao link do Eduzz quando clicado
- Abre em nova aba para links externos
- Log no console para debugging

### 3. Atualização do HeroPages (`components/hero-pages.tsx`)
- Detecta automaticamente se é link do Eduzz
- Usa EventCTAButton para links do Eduzz
- Mantém comportamento padrão para outros links

### 4. Página de Teste (`test-utm.html`)
- Página HTML para testar os parâmetros UTM
- Links de exemplo com diferentes origens de tráfego
- Instruções de como verificar se está funcionando

## 📋 Status dos Eventos

### ✅ Evento: Crenças da Riqueza
- **Status**: Implementado
- **Arquivo**: `app/eventos/crencas-da-riqueza/page-cms.tsx`
- **Tipo**: Link direto para Eduzz
- **O que fazer**: Substituir `EDUZZ_BASE_URL` pelo link real do produto

### ⚠️ Evento: Energia do Dinheiro
- **Status**: Usa NewsletterSignup
- **Arquivo**: `app/eventos/energia-do-dinheiro/page-cms.tsx`
- **Tipo**: Formulário de inscrição local
- **Nota**: Não precisa de UTM (usa formulário interno)

### ⚠️ Evento: Escalador de Negócios
- **Status**: Usa NewsletterSignup
- **Arquivo**: `app/eventos/escalador-de-negocios/page-cms.tsx`
- **Tipo**: Formulário de inscrição local
- **Nota**: Não precisa de UTM (usa formulário interno)

### ⚠️ Evento: Segredos da Mente Milionária
- **Status**: Usa TicketPricingCards
- **Arquivo**: `app/eventos/segredos-da-mente-milionaria/page-cms.tsx`
- **Tipo**: Sistema de tickets interno
- **Nota**: Precisa de implementação específica no TicketPricingCards se usar Eduzz

## 🔧 Como Configurar

### Para eventos com link direto do Eduzz:

1. Abra o arquivo do evento (ex: `page-cms.tsx`)
2. Procure por: `const EDUZZ_BASE_URL = "https://pay.eduzz.com/seu-produto-aqui"`
3. Substitua pelo link real do produto no Eduzz
4. O sistema capturará e enviará UTMs automaticamente

### Para adicionar a um novo evento:

1. Importe o componente no início do arquivo:
```tsx
import EventCTAButton from "@/components/event-cta-button"
```

2. Defina a URL do Eduzz:
```tsx
const EDUZZ_BASE_URL = "https://pay.eduzz.com/seu-produto-real"
```

3. Use o componente no lugar do botão normal:
```tsx
<EventCTAButton
  eduzzUrl={EDUZZ_BASE_URL}
  buttonText="GARANTIR MINHA VAGA"
  className="suas-classes-css"
  showArrow={true}
/>
```

## 🧪 Como Testar

1. Abra o arquivo `test-utm.html` no navegador
2. Clique em um dos links de teste
3. Na página do evento, abra o console (F12)
4. Você verá os logs dos UTMs capturados
5. Passe o mouse sobre o botão de inscrição
6. Verifique no rodapé do navegador se o link contém os UTMs

## 📊 Parâmetros Capturados

### UTMs Padrão:
- `utm_source` - Origem do tráfego (facebook, google, email)
- `utm_medium` - Meio (social, cpc, newsletter)
- `utm_campaign` - Campanha específica
- `utm_term` - Termo de busca (para ads)
- `utm_content` - Conteúdo específico (story, feed, banner)

### Parâmetros Adicionais:
- `fbclid` - ID do clique do Facebook
- `gclid` - ID do clique do Google
- `ref` - Referência genérica
- `source` - Fonte alternativa

## 🚀 Próximos Passos

1. **Obter URLs reais do Eduzz** para cada evento
2. **Implementar no TicketPricingCards** se necessário
3. **Configurar tracking no Eduzz** para receber os UTMs
4. **Testar com campanhas reais** de marketing

## 💡 Observações Importantes

- Os UTMs são preservados durante a navegação usando sessionStorage
- Links do Eduzz abrem em nova aba automaticamente
- O sistema funciona tanto em desenvolvimento quanto em produção
- Logs de debug aparecem apenas quando há UTMs capturados