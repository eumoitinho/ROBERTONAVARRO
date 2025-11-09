# 🚪 Guia de Portas

## Portas Padrão

### Next.js (Aplicação Principal)
- **Porta**: `3000` (ou `3001` se 3000 estiver ocupada)
- **Comando**: `pnpm dev`
- **URL**: `http://localhost:3000` ou `http://localhost:3001`
- **O que é**: A aplicação Next.js principal (site)

### Payload CMS Admin (Servidor Standalone)
- **Porta**: `3002`
- **Comando**: `bun payload:dev` ou `pnpm payload:dev`
- **URL**: `http://localhost:3002/admin`
- **O que é**: Painel administrativo do Payload CMS

## Resumo

| Serviço | Porta | URL | Comando |
|---------|-------|-----|---------|
| **Next.js** | 3000/3001 | `http://localhost:3000` | `pnpm dev` |
| **Payload Admin** | 3002 | `http://localhost:3002/admin` | `bun payload:dev` |

## ⚠️ Importante

- **Next.js** e **Payload Admin** rodam em portas diferentes
- Para acessar o admin do Payload, use sempre a porta **3002**
- Para acessar o site, use a porta **3000** ou **3001** (depende do que estiver disponível)

