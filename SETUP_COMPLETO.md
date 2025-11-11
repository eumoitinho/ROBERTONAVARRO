# 🚀 Setup Completo - Roberto Navarro CMS

## 📋 Pré-requisitos

- ✅ Docker Desktop instalado e rodando
- ✅ Node.js e pnpm instalados
- ✅ Git (opcional)

## 🔧 Passo a Passo

### 1. Adicionar Docker ao PATH (se necessário)

Se o comando `docker` não funcionar no terminal:

```bash
# Adicionar ao PATH
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verificar
docker --version
docker compose version
```

### 2. Configurar variáveis de ambiente

Crie/edite o arquivo `.env.local` na raiz do projeto:

```env
# MongoDB Local (Docker)
MONGODB_URI=mongodb://admin:admin123@localhost:27017/roberto-navarro?authSource=admin

# Payload CMS
PAYLOAD_SECRET=skWAAvzokKB69IMln1BX1fFOlKIVEVrjpLV1T8oO8PFGAiafhJLIsAmj6lez1rciKRVZ5OZvJXANnJA6O
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 3. Rodar MongoDB no Docker

```bash
# Opção 1: Usando npm script (recomendado)
pnpm docker:up

# Opção 2: Comando direto
docker compose up -d

# Opção 3: Script automatizado
pnpm docker:setup
```

### 4. Verificar se MongoDB está rodando

```bash
docker compose ps
```

Você deve ver `roberto-navarro-mongodb` com status `Up`.

### 5. Instalar dependências (se ainda não fez)

```bash
pnpm install
```

### 6. Popular o banco de dados

```bash
pnpm seed
```

Isso vai criar:
- ✅ Usuário admin
- ✅ Todas as formações
- ✅ Todos os eventos
- ✅ Todos os livros
- ✅ Mentores
- ✅ Depoimentos
- ✅ FAQs
- ✅ Páginas estáticas
- ✅ Blog posts

### 7. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

### 8. Acessar o Admin do Payload

Abra no navegador:
```
http://localhost:3000/admin
```

**Login:**
- Email: `admin@robertonavarro.com`
- Senha: `admin123`

⚠️ **IMPORTANTE:** Altere a senha após primeiro acesso!

## 🛠️ Comandos Úteis

### Docker

```bash
# Subir MongoDB
pnpm docker:up

# Parar MongoDB
pnpm docker:down

# Ver logs
pnpm docker:logs

# Reiniciar MongoDB
pnpm docker:restart

# Ver status
docker compose ps
```

### Desenvolvimento

```bash
# Rodar servidor
pnpm dev

# Popular banco
pnpm seed

# Build para produção
pnpm build

# Rodar produção
pnpm start
```

## 🔍 Verificar Conexão MongoDB

Para testar se o MongoDB está funcionando:

```bash
docker exec -it roberto-navarro-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

Dentro do MongoDB shell:
```javascript
use roberto-navarro
show collections
db.users.find().pretty()
exit
```

## 🆘 Troubleshooting

### Erro: "Cannot connect to MongoDB"
1. Verifique se o Docker está rodando
2. Verifique se o container está up: `docker compose ps`
3. Verifique os logs: `docker compose logs mongodb`
4. Verifique a string de conexão no `.env.local`

### Erro: "Port 27017 already in use"
Altere a porta no `docker-compose.yml`:
```yaml
ports:
  - "27018:27017"  # Use outra porta
```

E atualize o `.env.local`:
```env
MONGODB_URI=mongodb://admin:admin123@localhost:27018/roberto-navarro?authSource=admin
```

### Erro: "Docker command not found"
Adicione ao PATH:
```bash
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Limpar tudo e começar do zero

```bash
# Parar e remover containers/volumes
docker compose down -v

# Limpar cache do Next.js
rm -rf .next

# Rodar novamente
pnpm docker:up
pnpm seed
pnpm dev
```

## ✅ Checklist Final

- [ ] Docker Desktop rodando
- [ ] MongoDB container rodando (`docker compose ps`)
- [ ] `.env.local` configurado
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Banco populado (`pnpm seed`)
- [ ] Servidor rodando (`pnpm dev`)
- [ ] Admin acessível (`http://localhost:3000/admin`)
- [ ] Login funcionando

## 🎉 Pronto!

Agora você pode:
- Acessar o admin do Payload
- Gerenciar conteúdo (formações, eventos, livros, etc.)
- Criar formulários
- Editar páginas
- Ver mudanças em tempo real

