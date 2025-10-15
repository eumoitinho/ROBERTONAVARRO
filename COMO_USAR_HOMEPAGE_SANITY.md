# 📖 COMO USAR A HOMEPAGE COM SANITY - GUIA SIMPLIFICADO

## 🎯 OBJETIVO

Este guia ensina como editar o conteúdo da homepage usando o Sanity Studio, **SEM PRECISAR EDITAR CÓDIGO!**

---

## 🚀 PASSO A PASSO RÁPIDO

### 1️⃣ Iniciar o Studio

Abra o terminal e execute:

```bash
cd /home/moitinho/Documents/Projetos/ROBERTONAVARRO
npm run studio
```

Aguarde até ver a mensagem:
```
✓ Studio is running at http://localhost:3000/studio
```

---

### 2️⃣ Acessar o Studio

Abra seu navegador em:
```
http://localhost:3000/studio
```

Você verá a interface do Sanity Studio.

---

### 3️⃣ Criar/Editar a Homepage

1. No menu lateral esquerdo, clique em **"Homepage"**
2. Se não existir nenhuma homepage:
   - Clique no botão **"+"** (Create new)
3. Se já existir:
   - Clique no documento existente para editar

---

### 4️⃣ Editar o Conteúdo

Você verá várias seções para editar. Exemplo:

#### 🎨 Seção Hero (Topo)
- **Badge:** O texto pequeno no topo (ex: "INSTITUTO COACHING FINANCEIRO")
- **Título:** O texto grande amarelo
- **Subtítulo:** O texto branco abaixo do título
- **Descrição:** O parágrafo explicativo
- **Imagem de Fundo:** Clique para fazer upload de uma imagem
- **Botão:** Texto e link do botão

#### 📚 Formações
- Clique em **"Add item"** para adicionar uma nova formação
- Para cada formação, preencha:
  - Título
  - Descrição
  - Link
  - Texto do botão
- Para remover: clique no "×" vermelho
- Para reordenar: arraste o ícone "⋮⋮"

#### 👤 Mentor
- Edite o badge, título, subtítulo
- Adicione parágrafos de biografia
- Edite as estatísticas (números de alunos, técnicas, etc.)

#### 🎥 Vídeos
- Adicione vídeos do YouTube (cole apenas o ID)
  - Exemplo: para `https://youtube.com/watch?v=sVcR5iq1BG0`, use apenas `sVcR5iq1BG0`
- Preencha título, nome da pessoa, descrição
- Escolha o label do chip

#### 💬 Depoimentos
- Adicione depoimentos de clientes
- Preencha nome, profissão, texto
- Escolha quantas estrelas (1-5)
- Opcionalmente, faça upload de uma foto

#### 📍 Localização
- Edite endereço, telefone, email
- Cole a URL do mapa do Google Maps

#### ⚙️ Controles
- Use os toggles para mostrar/ocultar seções inteiras
- Ative/desative o popup de evento

#### 🔍 SEO
- Edite o título e descrição para buscadores
- Adicione palavras-chave
- Faça upload da imagem de compartilhamento

---

### 5️⃣ Publicar as Mudanças

1. Após editar, clique no botão verde **"Publish"** no canto superior direito
2. Aguarde a confirmação

---

### 6️⃣ Ver o Resultado

Abra outra aba do navegador em:
```
http://localhost:3000
```

**Nota:** As mudanças podem levar até 1 hora para aparecer devido ao cache. Para forçar atualização:
```bash
# No terminal
npm run build
npm run dev
```

Depois acesse `http://localhost:3000` novamente.

---

## 💡 DICAS IMPORTANTES

### ✅ FAZER:
- ✅ Preencha todos os campos obrigatórios (marcados com *)
- ✅ Use imagens de boa qualidade (mínimo 1200px de largura)
- ✅ Escreva títulos claros e objetivos
- ✅ Teste os links antes de publicar
- ✅ Salve rascunhos com frequência (Ctrl+S)

### ❌ NÃO FAZER:
- ❌ Não use imagens muito grandes (máximo 5MB)
- ❌ Não copie textos com formatação (cole como texto simples)
- ❌ Não deixe campos obrigatórios vazios
- ❌ Não use caracteres especiais em URLs

---

## 🎨 REORDENAR ELEMENTOS

Para mudar a ordem de formações, vídeos ou depoimentos:

1. Localize o ícone **"⋮⋮"** ao lado do item
2. Clique e **arraste** para a posição desejada
3. Solte quando estiver na posição certa
4. Clique em **"Publish"**

---

## 🖼️ ADICIONAR IMAGENS

1. Clique no campo de imagem
2. Clique em **"Upload"**
3. Selecione a imagem do seu computador
4. Aguarde o upload completar
5. (Opcional) Ajuste o hotspot clicando e arrastando na prévia

**Formatos aceitos:** JPG, PNG, WebP  
**Tamanho recomendado:** 1200-2000px de largura  
**Peso máximo:** 5MB

---

## 🎬 ADICIONAR VÍDEOS DO YOUTUBE

1. Abra o vídeo no YouTube
2. Copie o **ID** da URL:
   - URL: `https://www.youtube.com/watch?v=sVcR5iq1BG0`
   - ID: `sVcR5iq1BG0` (copie apenas esta parte)
3. Cole no campo "ID do YouTube" no Studio
4. Preencha os outros campos (título, pessoa, descrição)
5. Publique

---

## 🔄 DESFAZER MUDANÇAS

Se fez uma mudança e quer desfazer:

1. Clique no ícone de **histórico** (relógio) no canto superior direito
2. Veja todas as versões anteriores
3. Clique em **"Restore"** na versão desejada

---

## 📱 VISUALIZAR EM MOBILE

No Studio, não há preview mobile direto, mas você pode:

1. Publicar as mudanças
2. Abrir `http://localhost:3000` no navegador
3. Pressionar **F12** (DevTools)
4. Clicar no ícone de celular 📱
5. Escolher um modelo de celular

---

## ❓ PERGUNTAS FREQUENTES

### P: As mudanças não aparecem no site. Por quê?
**R:** O site tem cache de 1 hora. Aguarde ou force rebuild:
```bash
npm run build && npm run dev
```

### P: Posso adicionar quantas formações eu quiser?
**R:** Sim! Clique em "Add item" quantas vezes precisar.

### P: Posso ocultar a seção de vídeos?
**R:** Sim! Vá em "Controles de Seções" e desative o toggle correspondente.

### P: Perdi minhas mudanças. Como recuperar?
**R:** Use o histórico (ícone de relógio) para restaurar versões anteriores.

### P: Como editar o rodapé ou menu?
**R:** Esses ainda estão no código. Apenas a homepage está no Sanity por enquanto.

---

## 🆘 PRECISA DE AJUDA?

Se algo não funcionar:

1. ✅ Verifique se todos os serviços estão rodando
2. ✅ Veja se publicou as mudanças
3. ✅ Limpe o cache do navegador (Ctrl+Shift+R)
4. ✅ Consulte a documentação técnica em `docs/`

---

## 🎉 PRONTO!

Agora você pode editar toda a homepage sem precisar mexer em código!

**Lembre-se:** Sempre clique em **"Publish"** para salvar suas mudanças!

---

**Última atualização:** Outubro 2025  
**Versão:** 1.0.0

