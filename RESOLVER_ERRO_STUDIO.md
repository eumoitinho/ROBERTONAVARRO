# 🔧 RESOLVER ERRO DO SANITY STUDIO

## ❌ PROBLEMA IDENTIFICADO

O erro que você está vendo é um problema de **CORS e configuração do Sanity Studio** em produção:

```
Access to XMLHttpRequest at 'https://c2lnfkl6.api.sanity.io/...' 
from origin 'https://robertonavarro-git-refactor-fix-sanity-cms-m2z.vercel.app' 
has been blocked by CORS policy
```

## 🎯 CAUSA DO PROBLEMA

1. **CORS não configurado** - O Sanity não permite acesso do seu domínio Vercel
2. **Token de API ausente** - Falta token para autenticação
3. **Configuração de produção** - Studio não está configurado para produção

---

## ✅ SOLUÇÕES (ESCOLHA UMA)

### 🚀 **OPÇÃO 1: CONFIGURAR SANITY PARA PRODUÇÃO (RECOMENDADO)**

#### Passo 1: Criar Token de API
1. Acesse: https://www.sanity.io/manage
2. Clique em seu projeto: `c2lnfkl6`
3. Vá em **API** → **Tokens**
4. Clique em **Create token**
5. Nome: `Studio Token`
6. Permissões: **Editor** (read + write)
7. Copie o token gerado

#### Passo 2: Configurar Variáveis de Ambiente no Vercel
1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=c2lnfkl6
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=seu_token_aqui
SANITY_API_WRITE_TOKEN=seu_token_aqui
```

#### Passo 3: Configurar CORS no Sanity
1. Acesse: https://www.sanity.io/manage
2. Clique em seu projeto: `c2lnfkl6`
3. Vá em **API** → **CORS origins**
4. Clique em **Add CORS origin**
5. Adicione seu domínio Vercel:
   ```
   https://robertonavarro-git-refactor-fix-sanity-cms-m2z.vercel.app
   ```
6. Marque: **Allow credentials**
7. Clique em **Save**

#### Passo 4: Redeploy no Vercel
```bash
git add .
git commit -m "Fix Sanity Studio CORS"
git push
```

---

### 🔧 **OPÇÃO 2: USAR STUDIO LOCAL (RÁPIDO)**

Se você só quer editar conteúdo agora:

#### Passo 1: Configurar .env.local
```bash
# No seu .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=c2lnfkl6
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=seu_token_aqui
SANITY_API_WRITE_TOKEN=seu_token_aqui
```

#### Passo 2: Rodar Studio Local
```bash
npm run studio
```

#### Passo 3: Acessar Localmente
```
http://localhost:3000/studio
```

---

### 🚫 **OPÇÃO 3: DESABILITAR STUDIO EM PRODUÇÃO (TEMPORÁRIO)**

Se você não quer o Studio em produção agora:

#### Editar sanity.config.ts
```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { sanityConfig } from './sanity/env';

// Desabilitar Studio em produção
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  name: 'default',
  title: sanityConfig.studioTitle,
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/studio',
  plugins: isDevelopment ? [deskTool(), visionTool()] : [],
  schema: {
    types: schemaTypes,
  },
  // Redirecionar em produção
  ...(isDevelopment ? {} : {
    studio: {
      components: {
        // Componente que mostra mensagem em produção
        layout: () => <div>Studio disponível apenas em desenvolvimento</div>
      }
    }
  })
});
```

---

## 🎯 **RECOMENDAÇÃO**

**Use a OPÇÃO 1** - É a solução mais profissional e permite editar conteúdo diretamente em produção.

**Para uso imediato:** Use a OPÇÃO 2 (Studio local)

---

## 📋 **CHECKLIST DE CONFIGURAÇÃO**

- [ ] ✅ Token de API criado no Sanity
- [ ] ✅ Variáveis de ambiente configuradas no Vercel
- [ ] ✅ CORS configurado no Sanity
- [ ] ✅ Redeploy feito no Vercel
- [ ] ✅ Studio funcionando em produção

---

## 🆘 **AINDA COM PROBLEMAS?**

### Verificar Configuração
1. **Token válido?** Teste em: https://c2lnfkl6.api.sanity.io/v2023-10-01/data/query/production
2. **CORS configurado?** Verifique em: https://www.sanity.io/manage
3. **Variáveis no Vercel?** Confirme em: Settings → Environment Variables

### Logs Úteis
```bash
# Ver logs do Vercel
vercel logs

# Testar API localmente
curl "https://c2lnfkl6.api.sanity.io/v2023-10-01/data/query/production?query=*[_type=='homepage'][0]"
```

---

## 🎉 **APÓS RESOLVER**

Você poderá:
- ✅ Editar todas as 15 páginas via Studio
- ✅ Fazer mudanças em produção
- ✅ Ver atualizações em 2-5 segundos
- ✅ Gerenciar ~4386 campos editáveis

**Sucesso!** 🚀
