# 🐳 Comandos Docker - Guia Rápido

## ⚠️ Problema de Permissão no .zshrc

Se o `.zshrc` pertence ao root, você pode usar os comandos abaixo **sem precisar modificar o PATH**.

## 🚀 Comandos Usando Caminho Completo

Todos os comandos abaixo usam o caminho completo do Docker Desktop, então **funcionam mesmo sem Docker no PATH**.

### Iniciar MongoDB
```bash
/Applications/Docker.app/Contents/Resources/bin/docker compose up -d
```

### Parar MongoDB
```bash
/Applications/Docker.app/Contents/Resources/bin/docker compose down
```

### Ver Status
```bash
/Applications/Docker.app/Contents/Resources/bin/docker compose ps
```

### Ver Logs
```bash
/Applications/Docker.app/Contents/Resources/bin/docker compose logs -f mongodb
```

### Reiniciar MongoDB
```bash
/Applications/Docker.app/Contents/Resources/bin/docker compose restart mongodb
```

## 📦 Usando Scripts NPM (Mais Fácil)

Os scripts no `package.json` já usam o caminho completo, então você pode usar:

```bash
pnpm docker:up      # Iniciar MongoDB
pnpm docker:down    # Parar MongoDB
pnpm docker:ps      # Ver status
pnpm docker:logs    # Ver logs
pnpm docker:restart # Reiniciar
pnpm docker:setup   # Setup automatizado
```

## 🔧 Corrigir Permissões do .zshrc (Opcional)

Se quiser adicionar Docker ao PATH permanentemente:

```bash
# Verificar propriedade
ls -la ~/.zshrc

# Se pertencer ao root, mudar propriedade
sudo chown $(whoami) ~/.zshrc

# Adicionar Docker ao PATH
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc

# Aplicar mudanças
source ~/.zshrc
```

## ✅ Verificar se Funcionou

```bash
# Testar Docker
/Applications/Docker.app/Contents/Resources/bin/docker --version

# Testar Docker Compose
/Applications/Docker.app/Contents/Resources/bin/docker compose version

# Ver containers rodando
/Applications/Docker.app/Contents/Resources/bin/docker compose ps
```

## 🆘 Troubleshooting

### Erro: "docker-credential-desktop not found"
Isso é apenas um warning. O Docker vai funcionar mesmo assim. Se quiser corrigir:
1. Abra o Docker Desktop
2. Vá em Settings > General
3. Desmarque "Use Docker Compose V2" e marque novamente
4. Ou simplesmente ignore o warning

### Erro: "Port 27017 already in use"
Alguém já está usando a porta. Verifique:
```bash
lsof -i :27017
```

Se necessário, altere a porta no `docker-compose.yml`.

### Container não inicia
Verifique os logs:
```bash
pnpm docker:logs
```

### Limpar tudo e começar do zero
```bash
pnpm docker:down
/Applications/Docker.app/Contents/Resources/bin/docker volume rm roberto-navarro_mongodb_data roberto-navarro_mongodb_config 2>/dev/null
pnpm docker:up
```

