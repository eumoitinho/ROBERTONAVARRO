# 🎨 Guia de Live Edit (Edição em Tempo Real)

## O que é Live Edit?

O **Live Edit** permite que você veja as mudanças em tempo real enquanto edita conteúdo no admin do Payload CMS. Você edita no painel administrativo e vê o resultado instantaneamente no frontend, sem precisar salvar ou publicar.

## 🚀 Como Usar

### 1. Acessar o Admin
```
http://localhost:3000/admin
```

### 2. Editar uma Página/Conteúdo
1. Vá para a collection desejada (Pages, Formações, Eventos, Livros)
2. Clique no item que deseja editar
3. No topo da página de edição, clique no botão **"Preview"** ou **"Live Preview"**

### 3. Visualizar em Tempo Real
- Uma janela de preview será aberta mostrando a página no frontend
- Enquanto você edita os campos no admin, as mudanças são refletidas automaticamente no preview
- Você pode testar diferentes tamanhos de tela (Mobile, Tablet, Desktop)

## 📋 Collections com Live Preview Habilitado

- ✅ **Pages** - `/pages/[slug]?preview=true`
- ✅ **Formações** - `/formacoes/[slug]?preview=true`
- ✅ **Eventos** - `/eventos/[slug]?preview=true`
- ✅ **Livros** - `/livros/[slug]?preview=true`

## 🔧 Como Funciona

### Backend (Payload Config)
O `payload.config.ts` está configurado com:
```typescript
livePreview: {
  url: ({ data, collectionConfig }) => {
    // Retorna a URL do frontend com ?preview=true
  },
  collections: ['pages', 'formacoes', 'eventos', 'livros'],
  breakpoints: [
    { label: 'Mobile', width: 375, height: 667 },
    { label: 'Tablet', width: 768, height: 1024 },
    { label: 'Desktop', width: 1440, height: 900 },
  ],
}
```

### Frontend (Componente LivePreview)
O componente `components/live-preview.tsx`:
- Escuta mensagens do Payload admin via `window.postMessage`
- Atualiza a página automaticamente quando detecta mudanças
- Funciona apenas quando `?preview=true` está na URL

### Página Dinâmica
A rota `app/(website)/[slug]/page.tsx`:
- Busca conteúdo do Payload
- Se `preview=true`, mostra páginas mesmo não publicadas
- Renderiza o conteúdo com o componente LivePreview

## 🎯 Funcionalidades

### ✅ O que está funcionando:
1. **Preview em Tempo Real** - Veja mudanças enquanto edita
2. **Múltiplos Breakpoints** - Teste em Mobile, Tablet e Desktop
3. **Preview de Rascunhos** - Veja páginas não publicadas
4. **Atualização Automática** - Página atualiza quando você salva

### 🔄 Como funciona a atualização:
1. Você edita um campo no admin
2. O Payload envia uma mensagem via `postMessage`
3. O componente `LivePreview` detecta a mensagem
4. A página é atualizada automaticamente (`router.refresh()`)
5. Você vê as mudanças instantaneamente

## 📝 Exemplo de Uso

### Editar uma Página:
1. Acesse: `http://localhost:3000/admin/collections/pages`
2. Clique em uma página para editar
3. Clique em **"Preview"** no topo
4. Edite o título, conteúdo, etc.
5. Veja as mudanças aparecerem em tempo real no preview

### Editar uma Formação:
1. Acesse: `http://localhost:3000/admin/collections/formacoes`
2. Clique em uma formação
3. Clique em **"Preview"**
4. Edite os campos (título, descrição, preço, etc.)
5. As mudanças aparecem instantaneamente

## 🔍 Modo Preview vs Publicado

### Modo Preview (`?preview=true`):
- Mostra páginas **não publicadas** (status: draft)
- Atualiza automaticamente quando você edita
- Indicador visual: banner amarelo no topo
- Útil para: revisar conteúdo antes de publicar

### Modo Normal (sem preview):
- Mostra apenas páginas **publicadas** (status: published)
- Não atualiza automaticamente
- Útil para: visualização final pelos usuários

## 🛠️ Customização

### Adicionar Live Preview em outras Collections:

1. **Adicionar no `payload.config.ts`**:
```typescript
livePreview: {
  url: ({ data, collectionConfig }) => {
    if (collectionConfig.slug === 'minha-collection') {
      return `${baseUrl}/minha-rota/${data?.slug || ''}?preview=true`
    }
  },
  collections: ['pages', 'formacoes', 'minha-collection'],
}
```

2. **Criar rota dinâmica** (se necessário):
```typescript
// app/(website)/minha-rota/[slug]/page.tsx
import LivePreview from '@/components/live-preview'

export default function Page() {
  return (
    <>
      <LivePreview />
      {/* conteúdo */}
    </>
  )
}
```

3. **Atualizar função de busca**:
```typescript
export async function getMinhaCollectionBySlug(slug: string, preview?: boolean) {
  // Permitir buscar rascunhos se preview=true
}
```

## 🐛 Troubleshooting

### Preview não atualiza em tempo real:
1. **Abra o Console do Navegador** (F12 ou Cmd+Option+I)
2. Procure por mensagens que começam com:
   - `🔴 Live Preview: Componente ativado` - Confirma que o componente está rodando
   - `📨 Live Preview: Mensagem recebida` - Mostra todas as mensagens recebidas
   - `✅ Live Preview: Mensagem do Payload detectada!` - Confirma que detectou mudanças
   - `🔄 Live Preview: Atualizando página...` - Confirma que está atualizando

3. **Verifique se `?preview=true` está na URL** do preview
4. **Verifique se o componente `LivePreview` está na página**
5. **Teste salvando o documento** (Ctrl+S ou Cmd+S) - deve aparecer mensagens no console
6. **Verifique se o servidor está rodando** e se não há erros

### Como debugar:
1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Edite um campo no admin
4. Observe as mensagens no console:
   - Se você vê `📨 Live Preview: Mensagem recebida` mas não vê `✅`, a mensagem não está sendo reconhecida
   - Se você não vê nenhuma mensagem, o Payload não está enviando mensagens

### Página não aparece no preview:
1. Verifique se o slug está correto
2. Verifique se a rota dinâmica existe
3. Verifique se a collection está na lista de `collections` no `livePreview`

### Mudanças não aparecem:
1. **Salve o documento no admin** (Ctrl+S ou Cmd+S)
2. **Verifique o console** - deve aparecer mensagens de debug
3. **Aguarde 300ms** - há um debounce para evitar atualizações excessivas
4. Se ainda não funcionar, **recarregue a página do preview manualmente** (F5)

## 📚 Recursos Adicionais

- [Documentação Payload Live Preview](https://payloadcms.com/docs/live-preview)
- [Payload CMS Docs](https://payloadcms.com/docs)

## 🎉 Pronto!

Agora você pode editar conteúdo e ver as mudanças em tempo real! Basta clicar em "Preview" no admin e começar a editar.

