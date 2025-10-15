# 🎯 Guia Passo-a-Passo: Popular Homepage no Sanity

## 🚀 Passo 1: Acessar o Sanity Studio

```bash
# Certifique-se que o dev está rodando
npm run dev

# Em outro terminal, inicie o Studio
npm run studio
```

Acesse: **http://localhost:3000/studio**

---

## 📝 Passo 2: Criar o Documento da Homepage

1. No menu lateral esquerdo, procure por **"Homepage"**
2. Clique em **"+"** ou **"Create"**
3. Você verá o formulário vazio
4. Vamos preencher campo por campo!

---

## 🎨 Passo 3: Preencher SEÇÃO HERO

### Campo: **Título Interno**
```
Homepage Principal
```

### Expandir: **Seção Hero (Topo da Página)**

#### Texto do Badge
```
INSTITUTO COACHING FINANCEIRO
```

#### Título Principal
```
TRANSFORME SUA MENTALIDADE
```

#### Subtítulo
```
E CONQUISTE UMA NOVA REALIDADE FINANCEIRA
```

#### Descrição
```
Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.
```

#### Imagem de Fundo
- Clique em **"Upload"**
- Navegue até: `public/images/bgsite.jpg`
- Ou faça upload de nova imagem (1920x1080px recomendado)
- Ajuste o **hotspot** (ponto focal) clicando na imagem

#### Texto do Botão Principal
```
CONHEÇA NOSSAS FORMAÇÕES
```

#### Link do Botão Principal
```
#formacoes
```

#### Número de Conquistas
```
300.000+
```

#### Label das Conquistas
```
vidas transformadas
```

---

## 📚 Passo 4: Preencher SEÇÃO DE FORMAÇÕES

### Expandir: **Seção de Formações**

#### Badge da Seção
```
NOSSAS FORMAÇÕES
```

#### Título da Seção
```
FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE
```

#### Parte Destacada do Título
```
TRANSFORMAR SUA MENTALIDADE
```
*(Esta parte ficará em amarelo)*

#### Descrição da Seção
```
Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.
```

### Lista de Formações

Clique em **"+ Add item"** 8 vezes e preencha:

#### Formação 1: LCF MENTORING
- **Título**: `LCF MENTORING`
- **Descrição**: `Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.`
- **Link**: `/formacoes/mentoria`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 2: EMPREENDEDOR INTELIGENTE
- **Título**: `EMPREENDEDOR INTELIGENTE`
- **Descrição**: `Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.`
- **Link**: `/formacoes/empreendedor-inteligente`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 3: EDUCADOR FINANCEIRO
- **Título**: `EDUCADOR FINANCEIRO`
- **Descrição**: `Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.`
- **Link**: `/formacoes/educador-financeiro`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 4: LCF MENTORING PRO
- **Título**: `LCF MENTORING PRO`
- **Descrição**: `Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.`
- **Link**: `/formacoes/lcf-mentoring-pro`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 5: MENTORIA DE INVESTIMENTOS
- **Título**: `MENTORIA DE INVESTIMENTOS`
- **Descrição**: `Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.`
- **Link**: `/formacoes/mentoria-de-investimentos`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 6: MENTORIA INDIVIDUAL
- **Título**: `MENTORIA INDIVIDUAL`
- **Descrição**: `Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.`
- **Link**: `/formacoes/mentoria-individual`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 7: MÉTODO TF
- **Título**: `MÉTODO TF`
- **Descrição**: `Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.`
- **Link**: `/formacoes/metodo-tf`
- **Texto do Botão**: `SAIBA MAIS`

#### Formação 8: MENTOR COACHING FINANCEIRO
- **Título**: `MENTOR COACHING FINANCEIRO`
- **Descrição**: `Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.`
- **Link**: `/formacoes/mentor-coaching-financeiro`
- **Texto do Botão**: `SAIBA MAIS`

---

## ⚙️ Passo 5: Configurar SEÇÕES ADICIONAIS

Role para baixo e configure os toggles:

- ✅ **Mostrar Seção "Quem Somos"**: `ON` (Verde)
- ✅ **Mostrar Seção de Vídeos de Transformação**: `ON` (Verde)
- ✅ **Mostrar Seção de Depoimentos**: `ON` (Verde)
- ✅ **Mostrar Mapa de Localização**: `ON` (Verde)
- ⬜ **Mostrar Popup de Evento**: `OFF` (ou ON se quiser popup após 3s)

---

## 🔍 Passo 6: Configurar SEO

### Expandir: **SEO**

#### Título SEO
```
Roberto Navarro | Transforme sua Mentalidade
```

#### Descrição SEO
```
Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.
```

#### Palavras-chave

Clique em **"+ Add item"** 6 vezes:

1. `Roberto Navarro`
2. `Coaching Financeiro`
3. `Mentalidade`
4. `Transformação Financeira`
5. `Educação Financeira`
6. `Mentor Financeiro`

#### Imagem de Compartilhamento (OG Image)
- *Opcional*: Upload de imagem 1200x630px
- Aparecerá ao compartilhar no WhatsApp/Facebook

---

## ✅ Passo 7: PUBLICAR!

1. Revise todos os campos
2. Clique no botão verde **"Publish"** no canto superior direito
3. Aguarde confirmação: "Document published"

---

## 🎉 Passo 8: Testar a Homepage

1. Acesse: `http://localhost:3000`
2. A página deve carregar IDÊNTICA à original
3. Todos os textos devem estar corretos
4. O design deve estar perfeito!

---

## ✏️ Como Editar Depois

### Mudanças Simples (Textos)

1. Acesse o Studio: `http://localhost:3000/studio`
2. Clique em "Homepage"
3. Edite o campo desejado
4. Clique em "Publish"
5. Aguarde 1 hora (revalidação) ou force:

```bash
# Limpar cache
rm -rf .next
npm run dev
```

### Adicionar Nova Formação

1. No Studio, vá em "Seção de Formações"
2. Em "Lista de Formações", clique em **"+ Add item"**
3. Preencha:
   - Título da formação
   - Descrição
   - Link (ex: `/formacoes/nova-formacao`)
   - Texto do botão
4. Publish!

### Remover uma Formação

1. No Studio, em "Lista de Formações"
2. Passe o mouse sobre a formação
3. Clique no ícone de **lixeira** (🗑️)
4. Publish!

### Reordenar Formações

1. No Studio, em "Lista de Formações"
2. Arraste e solte as formações (drag & drop)
3. A ordem mudará automaticamente no site!
4. Publish!

### Trocar Imagem de Fundo do Hero

1. No Studio, em "Seção Hero"
2. Em "Imagem de Fundo", clique em "Upload"
3. Selecione nova imagem
4. Ajuste o hotspot
5. Publish!

---

## 🎨 O que Permanece Fixo (Design)

Estes elementos **NÃO** podem ser editados via Sanity (são de design):

❌ Cores do tema (amarelo, preto, cinza)
❌ Fontes e tamanhos de texto
❌ Espaçamentos e margens
❌ Animações e efeitos
❌ Layout do grid
❌ Componentes (Header, Footer)
❌ Estrutura de seções

**Por quê?** Para garantir consistência visual e performance.

---

## 🐛 Troubleshooting

### Problema: Mudanças não aparecem

**Solução 1**: Aguardar revalidação (até 1 hora)

**Solução 2**: Forçar revalidação
```bash
rm -rf .next
npm run dev
```

**Solução 3**: Hard refresh no navegador
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Problema: Imagem não aparece

**Verificar**:
1. Imagem foi publicada no Studio?
2. Imagem tem asset?
3. Domínio Sanity está em `next.config.js`?

**Solução**: O sistema usa fallback automático (`/images/bgsite.jpg`)

### Problema: Seção não aparece

**Verificar**:
1. Toggle da seção está ON?
2. Documento foi publicado?

---

## 💾 Backup

O conteúdo original hardcoded está em:
```
__archive__/page-hardcoded-backup.tsx
```

Para voltar ao hardcoded:
```bash
cp __archive__/page-hardcoded-backup.tsx app/page.tsx
```

---

## 📊 Campos Editáveis - Resumo

| Seção | Campos Editáveis | Total |
|-------|------------------|-------|
| **Hero** | Badge, Título, Subtítulo, Descrição, Imagem, Botão, Conquistas | 8 |
| **Formações** | Badge, Título, Descrição, 8 Cards (cada com 4 campos) | 36 |
| **Controles** | 5 toggles para mostrar/ocultar seções | 5 |
| **SEO** | Meta título, descrição, keywords, OG image | 4 |
| **TOTAL** | | **53 campos** |

---

## ✨ Pronto!

Agora você tem controle total sobre o conteúdo da homepage, sem tocar em código! 🎉

**Próximos passos**:
1. Popular o documento no Studio (seguindo este guia)
2. Testar a homepage
3. Fazer ajustes finos conforme necessário

**Tempo estimado**: 15-20 minutos para preencher tudo

