# 🏠 Como Popular a Homepage no Sanity

## ✅ Arquivos Criados

1. ✅ `sanity/schemaTypes/homepage.ts` - Schema da homepage
2. ✅ `sanity/lib/homepage-queries.ts` - Queries GROQ
3. ✅ `sanity/lib/homepage-api.ts` - API e fallback data
4. ✅ `app/page.tsx` - Server Component (busca dados)
5. ✅ `app/page-client.tsx` - Client Component (renderiza)
6. ✅ `sanity/initial-data/homepage-content.json` - Dados iniciais

## 🚀 Passos para Configurar

### 1. Reiniciar o Sanity Studio

```bash
# Parar o studio se estiver rodando (Ctrl+C)

# Iniciar novamente
npm run studio
```

O Studio agora terá um novo tipo: **"Homepage"**

### 2. Criar o Documento da Homepage

1. Acesse: `http://localhost:3000/studio`
2. No menu lateral, clique em **"Homepage"**
3. Clique em **"Create"** ou **"+"**
4. Você verá todos os campos prontos para editar!

### 3. Preencher os Dados (Copiar e Colar)

Use os dados do arquivo `/sanity/initial-data/homepage-content.json`:

#### Seção Hero:

**Texto do Badge**: `INSTITUTO COACHING FINANCEIRO`

**Título Principal**: `TRANSFORME SUA MENTALIDADE`

**Subtítulo**: `E CONQUISTE UMA NOVA REALIDADE FINANCEIRA`

**Descrição**: 
```
Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.
```

**Texto do Botão Principal**: `CONHEÇA NOSSAS FORMAÇÕES`

**Link do Botão Principal**: `#formacoes`

**Número de Conquistas**: `300.000+`

**Label das Conquistas**: `vidas transformadas`

**Imagem de Fundo**: 
- Clique em "Upload"
- Selecione a imagem: `/public/images/bgsite.jpg`
- Ou deixe em branco para usar a padrão

#### Seção de Formações:

**Badge da Seção**: `NOSSAS FORMAÇÕES`

**Título da Seção**: `FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE`

**Parte Destacada**: `TRANSFORMAR SUA MENTALIDADE`

**Descrição**: 
```
Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.
```

**Lista de Formações** (Adicionar 8 itens):

1. **LCF MENTORING**
   - Descrição: `Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.`
   - Link: `/formacoes/mentoria`
   - Botão: `SAIBA MAIS`

2. **EMPREENDEDOR INTELIGENTE**
   - Descrição: `Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.`
   - Link: `/formacoes/empreendedor-inteligente`
   - Botão: `SAIBA MAIS`

3. **EDUCADOR FINANCEIRO**
   - Descrição: `Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.`
   - Link: `/formacoes/educador-financeiro`
   - Botão: `SAIBA MAIS`

4. **LCF MENTORING PRO**
   - Descrição: `Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.`
   - Link: `/formacoes/lcf-mentoring-pro`
   - Botão: `SAIBA MAIS`

5. **MENTORIA DE INVESTIMENTOS**
   - Descrição: `Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.`
   - Link: `/formacoes/mentoria-de-investimentos`
   - Botão: `SAIBA MAIS`

6. **MENTORIA INDIVIDUAL**
   - Descrição: `Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.`
   - Link: `/formacoes/mentoria-individual`
   - Botão: `SAIBA MAIS`

7. **MÉTODO TF**
   - Descrição: `Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.`
   - Link: `/formacoes/metodo-tf`
   - Botão: `SAIBA MAIS`

8. **MENTOR COACHING FINANCEIRO**
   - Descrição: `Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.`
   - Link: `/formacoes/mentor-coaching-financeiro`
   - Botão: `SAIBA MAIS`

#### Seções Adicionais:

- ✅ **Mostrar Seção "Quem Somos"**: ON
- ✅ **Mostrar Seção de Vídeos de Transformação**: ON
- ✅ **Mostrar Seção de Depoimentos**: ON
- ✅ **Mostrar Mapa de Localização**: ON
- ⬜ **Mostrar Popup de Evento**: OFF (ou ON se quiser)

#### SEO:

**Título SEO**: `Roberto Navarro | Transforme sua Mentalidade`

**Descrição SEO**: `Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.`

**Palavras-chave**: 
- Roberto Navarro
- Coaching Financeiro
- Mentalidade
- Transformação Financeira
- Educação Financeira
- Mentor Financeiro

### 4. Publicar

Clique em **"Publish"** no canto superior direito!

### 5. Verificar

Acesse: `http://localhost:3000`

A homepage deve carregar com os dados do Sanity! 🎉

## 🔄 Sistema de Fallback

O sistema tem fallback automático:

```typescript
Homepage carrega → 
  Tenta buscar do Sanity →
    ✅ Encontrou? Usa dados do Sanity
    ❌ Não encontrou? Usa fallback (dados padrão)
```

Isso garante que a homepage **sempre funcione**, mesmo se:
- Sanity estiver offline
- Documento ainda não foi criado
- Erro na conexão

## ✏️ Como Editar Depois

### Pelo Sanity Studio (Recomendado)

1. Acesse: `http://localhost:3000/studio`
2. Clique em "Homepage"
3. Edite qualquer campo
4. Clique em "Publish"
5. Aguarde até 1 hora para revalidação (ou force refresh)

### Revalidação Imediata

Para ver mudanças instantaneamente:

```bash
# Limpar cache do Next.js
rm -rf .next

# Reiniciar dev
npm run dev
```

## 📝 O que Pode Ser Editado

### ✅ Totalmente Editável via Studio

#### Hero Section:
- Badge superior
- Título principal (parte amarela)
- Subtítulo (parte branca)
- Descrição
- Imagem de fundo
- Texto do botão
- Link do botão
- Número de conquistas
- Label de conquistas

#### Seção de Formações:
- Badge da seção
- Título da seção
- Texto destacado (amarelo)
- Descrição da seção
- **Cada formação**:
  - Título
  - Descrição
  - Link
  - Texto do botão

#### Controles:
- Mostrar/ocultar Quem Somos
- Mostrar/ocultar Vídeos
- Mostrar/ocultar Depoimentos
- Mostrar/ocultar Mapa
- Mostrar/ocultar Popup

#### SEO:
- Meta título
- Meta descrição
- Palavras-chave
- OG Image

### ❌ O que NÃO pode editar (Mantido por Design)

- Layout e design (cores, espaçamentos, fontes)
- Animações e efeitos
- Estrutura de grid
- Componentes internos (Header, Footer, etc)

## 🎨 Design = Idêntico ao Original

O design e layout permanecem **100% iguais**. Apenas os **textos e imagens** são editáveis.

## ⚠️ Importante

**⚠️ APENAS 1 DOCUMENTO**

O Sanity só deve ter **1 documento** do tipo "Homepage". Se criar mais de um, apenas o primeiro será usado.

## 🐛 Troubleshooting

### Problema: Homepage não carrega dados do Sanity

**Solução 1**: Verificar se o documento foi publicado
- No Studio, o botão deve estar "Published" (verde)

**Solução 2**: Verificar variáveis de ambiente
```bash
# Verificar se existem
cat .env.local | grep SANITY
```

**Solução 3**: Usar fallback
- O fallback tem todos os dados padrão
- A homepage sempre funcionará, mesmo sem Sanity

### Problema: Mudanças não aparecem

**Solução**: Revalidação

```bash
# Forçar revalidação
rm -rf .next
npm run dev
```

Ou aguarde até 1 hora (revalidação automática)

## 📸 Upload de Imagens

### Imagem de Fundo do Hero:

1. No Studio, no campo "Imagem de Fundo"
2. Clique em "Upload"
3. Selecione: `/public/images/bgsite.jpg`
4. Ajuste o hotspot (ponto focal) se necessário
5. Salve

### Imagem OG (Compartilhamento):

1. No campo "Imagem de Compartilhamento"
2. Upload de uma imagem 1200x630px
3. Esta aparecerá ao compartilhar no WhatsApp/Facebook

## 🎉 Pronto!

Agora você pode editar toda a homepage pelo Sanity Studio, sem tocar em código!

---

**Criado**: Outubro 2025  
**Backup original**: `__archive__/page-hardcoded-backup.tsx`

