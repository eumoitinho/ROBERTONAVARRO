# 🔧 Como Adicionar Docker ao PATH (Mac)

## 📋 Passo a Passo

### 1. Corrigir propriedade do .zshrc

O arquivo `.zshrc` pertence ao root. Vamos mudar para você:

```bash
sudo chown $(whoami) ~/.zshrc
```

**Digite sua senha quando solicitado.**

### 2. Verificar se funcionou

```bash
ls -la ~/.zshrc
```

Deve mostrar seu usuário (não `root`) como proprietário.

### 3. Adicionar Docker ao PATH

```bash
echo '' >> ~/.zshrc
echo '# Docker Desktop' >> ~/.zshrc
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
```

### 4. Aplicar as mudanças

```bash
source ~/.zshrc
```

### 5. Verificar se funcionou

```bash
docker --version
docker compose version
```

Se mostrar as versões, está funcionando! ✅

### 6. Testar MongoDB

```bash
cd /Users/eumoitinho/Work/Clientes/ROBERTONAVARRO
docker compose up -d mongodb
```

## 🚀 Alternativa: Comando Único

Você pode executar tudo de uma vez:

```bash
sudo chown $(whoami) ~/.zshrc && \
echo '' >> ~/.zshrc && \
echo '# Docker Desktop' >> ~/.zshrc && \
echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc && \
source ~/.zshrc && \
docker --version && \
docker compose version
```

## 📝 O que foi feito?

1. ✅ Mudamos a propriedade do `.zshrc` de `root` para seu usuário
2. ✅ Adicionamos o Docker ao PATH
3. ✅ Aplicamos as mudanças na sessão atual

## 🎯 Próximos Passos

Depois de adicionar ao PATH, você pode usar:

```bash
# Comandos normais (sem caminho completo)
docker --version
docker compose up -d
docker compose ps
docker compose logs -f mongodb

# Ou usar os scripts npm
pnpm docker:up
pnpm docker:ps
pnpm docker:logs
```

## 🆘 Se algo der errado

### Erro: "permission denied"
Execute o passo 1 novamente com sudo.

### Erro: "docker: command not found"
1. Verifique se o Docker Desktop está rodando
2. Feche e abra um novo terminal
3. Ou execute `source ~/.zshrc` novamente

### Verificar se está no PATH

```bash
echo $PATH | grep Docker
```

Se mostrar `/Applications/Docker.app/Contents/Resources/bin`, está correto!

## ✅ Checklist

- [ ] Docker Desktop está rodando
- [ ] Propriedade do `.zshrc` corrigida
- [ ] Docker adicionado ao PATH
- [ ] Mudanças aplicadas (`source ~/.zshrc`)
- [ ] `docker --version` funciona
- [ ] `docker compose version` funciona
- [ ] MongoDB pode ser iniciado com `docker compose up -d`

