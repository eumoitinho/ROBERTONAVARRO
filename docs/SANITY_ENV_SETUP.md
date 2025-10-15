# 🔐 Configurar Variáveis de Ambiente do Sanity

## ❌ Erro Atual

```
Error: Workspace: missing context value
```

**Causa**: Variáveis de ambiente do Sanity não estão configuradas.

---

## ✅ SOLUÇÃO: Configurar .env.local

### Passo 1: Criar Projeto no Sanity

1. Acesse: https://www.sanity.io/
2. Faça login (ou crie conta grátis)
3. Clique em **"Create Project"**
4. Nome do projeto: `Roberto Navarro`
5. Dataset: `production`
6. Copie o **Project ID** que aparece

### Passo 2: Criar arquivo .env.local

```bash
cd /home/moitinho/Documents/Projetos/ROBERTONAVARRO
touch .env.local
```

### Passo 3: Adicionar Variáveis

Edite `.env.local` e adicione:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=SEU_PROJECT_ID_AQUI
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
```

**Substitua** `SEU_PROJECT_ID_AQUI` pelo Project ID copiado no Passo 1.

### Passo 4: Reiniciar Servidor

```bash
# Parar o dev server (Ctrl+C)
npm run dev
```

### Passo 5: Acessar o Studio

```bash
# Em outro terminal
npm run studio
```

Ou acesse direto: `http://localhost:3000/studio`

---

## 🎯 ALTERNATIVA RÁPIDA: Usar Fallback

Se quiser **testar sem configurar Sanity agora**:

✅ **A homepage já funciona!**

O sistema usa fallback automático com todos os dados padrão.

**Vantagens**:
- ✅ Não precisa configurar Sanity agora
- ✅ Homepage funciona normalmente
- ✅ Design idêntico
- ✅ Pode configurar Sanity depois

**Como funciona**:
```
Homepage → Tenta Sanity → Falha? → Usa Fallback ✓
```

---

## 📋 Variáveis Opcionais

### API Token (Para Preview/Draft)

Se quiser ver drafts (rascunhos) no Studio:

1. No Sanity Dashboard: https://www.sanity.io/manage
2. Vá em "API" → "Tokens"
3. Crie um token com permissões de "Editor"
4. Adicione ao `.env.local`:

```env
SANITY_API_TOKEN=seu_token_aqui
```

### Outras Variáveis (Opcional)

```env
# Personalizar Studio
NEXT_PUBLIC_SANITY_STUDIO_TITLE=Roberto Navarro CMS

# Usar CDN (recomendado para produção)
NEXT_PUBLIC_SANITY_USE_CDN=true
```

---

## 🧪 Testar Configuração

### Verificar se Sanity está funcionando:

```bash
# 1. Reiniciar dev
npm run dev

# 2. Acessar Studio
http://localhost:3000/studio

# 3. Deve aparecer a interface do Sanity
# Se aparecer erro, verificar:
# - Project ID está correto?
# - Dataset está correto?
# - .env.local existe?
```

### Verificar Homepage:

```bash
# Acessar
http://localhost:3000

# Deve carregar normalmente com fallback data
```

---

## 📝 Arquivo .env.local Completo

```env
# Database (Neon/Vercel Postgres)
DATABASE_URL=your_database_url_here

# Sanity CMS (OBRIGATÓRIO para Studio)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
SANITY_API_TOKEN=your_api_token_optional
NEXT_PUBLIC_SANITY_STUDIO_TITLE=Roberto Navarro CMS

# Eduzz
EDUZZ_CLIENT_ID=your_client_id
EDUZZ_CLIENT_SECRET=your_client_secret
EDUZZ_WEBHOOK_SECRET=your_webhook_secret

# Auth
JWT_SECRET=your_jwt_secret_key

# Analytics
NEXT_PUBLIC_GTM_ID=your_gtm_id
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

---

## 🔍 Verificar Project ID

Se você já tem um projeto Sanity:

```bash
# Ver configuração atual
cat sanity.cli.js
```

Ou acesse: https://www.sanity.io/manage

---

## ✅ Checklist

- [ ] Criar projeto no Sanity.io
- [ ] Copiar Project ID
- [ ] Criar arquivo `.env.local`
- [ ] Adicionar NEXT_PUBLIC_SANITY_PROJECT_ID
- [ ] Adicionar NEXT_PUBLIC_SANITY_DATASET
- [ ] Reiniciar servidor
- [ ] Acessar Studio
- [ ] Popular homepage

---

## 🎯 RESUMO

**Opção 1**: Configurar Sanity agora (15 min)
- Seguir passos acima
- Popular homepage no Studio
- 100% editável

**Opção 2**: Usar fallback (0 min)
- Homepage funciona com dados padrão
- Configurar Sanity depois
- Funciona perfeitamente!

---

**Recomendação**: Use fallback por enquanto, configure Sanity quando tiver tempo! ✅

