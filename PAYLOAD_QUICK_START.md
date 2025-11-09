# 🚀 Payload CMS - Guia Rápido

## 1. Configurar MongoDB

**Com Docker (Recomendado):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Ou MongoDB local:**
```bash
mongod
```

## 2. Criar .env.local

Crie o arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=mongodb://localhost:27017/roberto-navarro
PAYLOAD_SECRET=mude-para-uma-chave-super-secreta-aqui
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

## 3. Iniciar o Servidor Next.js

```bash
bun run dev
```

## 4. Popular o Banco (Seed)

**Em outro terminal:**
```bash
curl -X POST http://localhost:3000/api/seed
```

Ou simplesmente acesse no navegador:
```
http://localhost:3000/api/seed
```

## 5. Acessar o Painel Admin

```
http://localhost:3000/admin
```

**Login inicial:**
- Email: `admin@robertonavarro.com`
- Senha: `admin123`

⚠️ **IMPORTANTE:** Altere a senha após o primeiro acesso!

---

## 📦 O que foi criado?

O seed cria:
- ✅ 1 usuário admin
- ✅ 1 mentor (Roberto Navarro)
- ✅ 1 depoimento
- ✅ 2 FAQs
- ✅ 1 formação (Educador Financeiro)
- ✅ 1 evento (Crenças da Riqueza)
- ✅ 1 livro (A Arte de Enriquecer)
- ✅ 1 página (Política de Privacidade)

---

## 🛠️ Troubleshooting

### Erro ao conectar MongoDB
- Verifique se MongoDB está rodando: `docker ps` ou `mongod`
- Confira a `MONGODB_URI` no `.env.local`

### Erro no seed
- Certifique-se que o Next.js está rodando (`bun run dev`)
- Acesse diretamente: http://localhost:3000/api/seed

### Não consigo acessar /admin
- Verifique se o servidor está rodando
- Limpe o cache do navegador
- Acesse http://localhost:3000/admin em janela anônima

---

## 📚 Próximos Passos

1. **Login no admin** e altere a senha
2. **Explore as collections** no menu lateral
3. **Adicione mais conteúdo** através do painel
4. **Leia** o arquivo `PAYLOAD_GUIDE.md` para uso avançado

---

**Dúvidas?** Consulte o arquivo `PAYLOAD_GUIDE.md` completo.
