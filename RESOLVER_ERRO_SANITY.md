# ⚠️ RESOLVER ERRO: "Workspace: missing context value"

## 🔴 Erro Atual

```
Unhandled Runtime Error
Error: Workspace: missing context value
```

**Causa**: Variáveis de ambiente do Sanity não configuradas.

---

## ✅ SOLUÇÃO RÁPIDA (2 opções)

### OPÇÃO 1: Configurar Sanity (15 min)

#### 1. Criar Projeto no Sanity

Acesse: https://www.sanity.io/manage

- Faça login ou crie conta grátis
- Clique em **"Create Project"**
- Nome: `Roberto Navarro`
- Dataset: `production`
- **Copie o Project ID** (ex: `abc123xyz`)

#### 2. Criar .env.local

```bash
cd /home/moitinho/Documents/Projetos/ROBERTONAVARRO
nano .env.local
```

Cole:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=SEU_PROJECT_ID_AQUI
NEXT_PUBLIC_SANITY_DATASET=production
```

**Substitua** `SEU_PROJECT_ID_AQUI` pelo ID copiado.

Salvar: `Ctrl+O` → `Enter` → `Ctrl+X`

#### 3. Reiniciar

```bash
# Parar tudo (Ctrl+C em ambos terminais)

# Reiniciar dev
npm run dev

# Em outro terminal
npm run studio
```

#### 4. Acessar Studio

`http://localhost:3000/studio` ✅

---

### OPÇÃO 2: Desabilitar Sanity Temporariamente (1 min) ⚡

Se quiser apenas **fazer funcionar agora**:

#### 1. Voltar Homepage Hardcoded

```bash
cd /home/moitinho/Documents/Projetos/ROBERTONAVARRO
cp __archive__/page-hardcoded-backup.tsx app/page.tsx
rm app/page-client.tsx
```

#### 2. Reiniciar

```bash
npm run dev
```

✅ **Pronto!** Homepage funciona normalmente (sem Sanity)

**Quando quiser Sanity**, volte para Opção 1.

---

## 🎯 RECOMENDAÇÃO

### Para AGORA (urgente):
→ **OPÇÃO 2** (voltar hardcoded)

### Para DEPOIS (quando tiver tempo):
→ **OPÇÃO 1** (configurar Sanity)

---

## 📝 Se Escolher OPÇÃO 1

Após configurar `.env.local`:

```bash
# 1. Reiniciar
npm run dev

# 2. Em outro terminal
npm run studio

# 3. Acessar
http://localhost:3000/studio

# 4. Criar documento "Homepage"
Seguir: docs/HOMEPAGE_SETUP_STEP_BY_STEP.md
```

---

## 🐛 Troubleshooting

### Erro persiste após configurar .env.local?

```bash
# Limpar cache
rm -rf .next
npm run dev
```

### Não tem conta no Sanity?

Criar grátis em: https://www.sanity.io/

**Plano Free**:
- ✅ Grátis para sempre
- ✅ 3 usuários
- ✅ 10GB de storage
- ✅ 100k requests/mês

---

## ✅ Arquivo .env.local Completo

Use este template:

```env
# Database
DATABASE_URL=

# Sanity CMS (NECESSÁRIO)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01

# Eduzz (opcional)
EDUZZ_CLIENT_ID=
EDUZZ_CLIENT_SECRET=
EDUZZ_WEBHOOK_SECRET=

# Auth (opcional)
JWT_SECRET=

# Analytics (opcional)
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

---

**Escolha uma opção e siga os passos!** 🚀

**Opção 2 (hardcoded)** = Funciona imediatamente  
**Opção 1 (Sanity)** = Homepage editável (15 min setup)

