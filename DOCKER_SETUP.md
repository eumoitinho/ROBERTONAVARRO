# Guia Rápido - Docker e MongoDB

## 🐳 Docker Desktop está Instalado

Seu Docker Desktop já está rodando! Agora vamos configurar o MongoDB.

## 📋 Passos para Rodar o MongoDB

### 1. Verificar se o Docker está rodando
- Abra o Docker Desktop
- Certifique-se de que está rodando (ícone na barra de menu do Mac)

### 2. Rodar o MongoDB com Docker Compose

**IMPORTANTE:** Se o comando `docker` não funcionar no terminal, use o caminho completo do Docker Desktop.

No terminal, na pasta do projeto, execute:

```bash
# Método 1: Se docker estiver no PATH
docker compose up -d

# Método 2: Usando o caminho completo do Docker Desktop (Mac)
/Applications/Docker.app/Contents/Resources/bin/docker compose up -d

# Ou adicione ao PATH (recomendado):
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
docker compose up -d
```

Isso vai:
- ✅ Baixar a imagem do MongoDB 7.0
- ✅ Criar um container chamado `roberto-navarro-mongodb`
- ✅ Rodar na porta 27017
- ✅ Criar volumes para persistir os dados
- ✅ Configurar usuário: `admin` / senha: `admin123`

### 3. Verificar se o MongoDB está rodando

```bash
docker ps
```

Você deve ver o container `roberto-navarro-mongodb` rodando.

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/roberto-navarro?authSource=admin
PAYLOAD_SECRET=skWAAvzokKB69IMln1BX1fFOlKIVEVrjpLV1T8oO8PFGAiafhJLIsAmj6lez1rciKRVZ5OZvJXANnJA6O
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 5. Reiniciar o servidor Next.js

```bash
pnpm dev
```

### 6. Popular o banco de dados

```bash
pnpm seed
```

## 🛑 Comandos Úteis

### Parar o MongoDB
```bash
docker compose down
# ou
/Applications/Docker.app/Contents/Resources/bin/docker compose down
```

### Ver logs do MongoDB
```bash
docker compose logs -f mongodb
# ou
/Applications/Docker.app/Contents/Resources/bin/docker compose logs -f mongodb
```

### Reiniciar o MongoDB
```bash
docker compose restart mongodb
```

### Remover tudo (cuidado: apaga os dados)
```bash
docker compose down -v
```

## 🔍 Verificar Conexão

Para verificar se o MongoDB está funcionando:

```bash
docker exec -it roberto-navarro-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

Depois dentro do MongoDB shell:
```javascript
use roberto-navarro
show collections
```

## 🆘 Troubleshooting

### Docker não encontrado no terminal
Se o comando `docker` não funcionar no terminal, adicione ao PATH:

```bash
# Adicionar Docker ao PATH (Mac)
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Ou use o caminho completo:
/Applications/Docker.app/Contents/Resources/bin/docker compose up -d
```

**Verificar se funcionou:**
```bash
docker --version
docker compose version
```

### Porta 27017 já está em uso
Se a porta já estiver em uso, altere no `docker-compose.yml`:
```yaml
ports:
  - "27018:27017"  # Use outra porta
```

E atualize o `.env.local`:
```env
MONGODB_URI=mongodb://admin:admin123@localhost:27018/roberto-navarro?authSource=admin
```

