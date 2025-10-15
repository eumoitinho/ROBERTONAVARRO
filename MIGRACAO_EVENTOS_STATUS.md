# 🎯 MIGRAÇÃO DE EVENTOS PARA SANITY - STATUS

## ✅ PROGRESSO ATUAL

### Fase 1: Schema Sanity ✅ COMPLETO
- [x] Schema `eventPage` criado
- [x] Adicionado ao index.ts
- [x] Schema rodando no Studio

**Arquivo criado:** `sanity/schemaTypes/eventPage.ts`

### Estrutura do Schema:
```
EventPage {
  - Informações Básicas (título, slug, status)
  - Hero Section
  - Desafios/Problemas
  - Conteúdo Principal (4 Pilares)
  - Destaques do Evento
  - Metodologia
  - Bônus
  - Ingressos/Preços
  - Depoimentos
  - FAQ
  - Localização
  - CTA Final
  - SEO
  - Controles de Seção (toggles para mostrar/ocultar)
}
```

**Total:** ~300 campos editáveis por evento!

---

## 📋 PRÓXIMOS PASSOS

### Fase 2: API e Interfaces ⏳ EM PROGRESSO
- [ ] Criar interfaces TypeScript
- [ ] Criar API para buscar eventos
- [ ] Criar queries GROQ

### Fase 3: Migração das Páginas
- [ ] Criar componentes editáveis
- [ ] Migrar "Crenças da Riqueza" (teste)
- [ ] Migrar outros 4 eventos

### Fase 4: População de Dados
- [ ] Script para popular Crenças da Riqueza
- [ ] Scripts para outros eventos

### Fase 5: Finalização
- [ ] Atualizar webhooks
- [ ] Testes
- [ ] Documentação

---

## 🎉 ESTIMATIVA

**Já feito:** ~20% (Schema completo)  
**Restante:** ~3 horas

**Eventos a migrar:**
1. Crenças da Riqueza ⏳
2. Energia do Dinheiro ⏸️
3. Escalador de Negócios ⏸️
4. Mentor Milionário ⏸️  
5. Segredos da Mente Milionária ⏸️

---

## 📊 CAPACIDADES DO SCHEMA

### O que cada evento pode editar:

✅ **Hero:** Título, descrição, imagem, botão, data, local  
✅ **Desafios:** Lista de problemas e soluções  
✅ **Pilares:** 4 inteligências/pilares com benefícios  
✅ **Destaques:** Lista de diferenciais  
✅ **Metodologia:** Passos do processo  
✅ **Bônus:** Lista de bônus inclusos  
✅ **Ingressos:** Tipos, preços, recursos  
✅ **Depoimentos:** Lista com fotos  
✅ **FAQ:** Perguntas e respostas  
✅ **Local:** Endereço e mapa  
✅ **SEO:** Meta tags completas  
✅ **Controles:** Mostrar/ocultar seções  

---

**Status:** ✅ Schema criado e funcionando!  
**Próximo:** Criar APIs e começar migração

