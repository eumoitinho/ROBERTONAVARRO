# Plano de Migração para Sanity CMS

## Visão geral

Este plano divide a migração para o Sanity CMS em quatro fases de 25% cada. Cada fase possui objetivos claros, atividades-chave, artefatos de saída e critérios de conclusão. O plano pressupõe que o projeto atual está em produção e requer continuidade operacional durante a migração.

### Metas principais
- Eliminar riscos de indisponibilidade identificando dependências antes de alterar o ambiente atual.
- Garantir que o conteúdo migre com fidelidade e com governança adequada.
- Validar a integração técnica (APIs, webhooks, pipelines) antes de liberar em produção.
- Capacitar a equipe interna para operar e evoluir o Sanity após o go-live.

---

## Fase 1 · 0% → 25% — Preparação e inventário

**Objetivos**
- Mapear o estado atual e definir escopo detalhado da migração.
- Planejar recursos, responsabilidades e riscos.

**Atividades principais**
- Levantar todas as fontes de conteúdo (páginas, coleções, componentes dinâmicos, dados relacionais).
- Classificar conteúdo em categorias: estático, dinâmico, repetível, sensível.
- Identificar integrações externas (APIs, webhooks, automações) que dependem do CMS atual.
- Definir governança: papéis, permissões, fluxos de aprovação e SLA de publicação.
- Delimitar o escopo mínimo necessário para o go-live (MVP) e backlog de melhorias pós-migração.
- Elaborar matriz de riscos e plano de mitigação.

**Entregáveis**
- Documento de inventário completo (conteúdo, integrações, stakeholders).
- Matriz RACI (responsabilidades) e cronograma macro.
- Documento de requisitos funcionais e não funcionais para o Sanity.

**Critérios de conclusão**
- Aprovação do escopo e do plano de migração pelos stakeholders.
- Lista priorizada de modelos de conteúdo e integrações a serem migrados.

---

## Fase 2 · 25% → 50% — Modelagem e infraestrutura

**Objetivos**
- Projetar e provisionar a base do Sanity alinhada aos requisitos.
- Preparar a infraestrutura técnica necessária para desenvolvimento e testes.

**Atividades principais**
- Desenhar os esquemas do Sanity Studio (schemas) com foco em reuso e consistência.
- Configurar o Sanity Studio (estruturas de navegação, permissões, desk structure).
- Definir pipelines de deploy (CI/CD) para o Studio e para o front-end que consumirá os dados.
- Implementar helpers no front-end para consumir o Sanity (queries GROQ, clients, tipagens TypeScript).
- Configurar ambientes (sandbox/staging) e chaves (`.env`) para desenvolvimento seguro.
- Criar scripts de seed/migração inicial para testar importação.

**Entregáveis**
- Repositório do Sanity Studio estruturado e conectado ao VCS.
- Documentação dos modelos de conteúdo (diagramas + JSON schemas) revisada.
- Ambiente de staging funcional com acesso controlado.

**Critérios de conclusão**
- Todos os modelos essenciais aprovados e versionados.
- Pipelines de build/deploy executando com sucesso em staging.

---

## Fase 3 · 50% → 75% — Migração de conteúdo e QA

**Objetivos**
- Migrar conteúdo prioritário e validar consistência funcional.
- Garantir que integrações e automações operem corretamente com o Sanity.

**Atividades principais**
- Executar scripts de migração/importação para conteúdo legado (manual ou automatizado).
- Ajustar o front-end para consumir dados do Sanity (queries, projections, fallback).
- Testar fluxos críticos: páginas principais, formulários, agendas, SEO (metadados).
- Validar webhooks e integrações (ex.: envio de newsletters, automações de marketing, APIs internas).
- Conduzir sessões de QA com checklist funcional, visual e de acessibilidade.
- Registrar bugs e pendências em backlog; priorizar correções antes do go-live.

**Entregáveis**
- Relatório de QA com status das páginas/fluxos.
- Logs/documentação das migrações executadas (volumetria, itens bem-sucedidos, falhas corrigidas).
- Guia provisório de uso do Sanity para os times de conteúdo.

**Critérios de conclusão**
- 100% do conteúdo obrigatório migrado e validado em staging.
- Front-end apontando para o Sanity em staging sem blockers críticos.

---

## Fase 4 · 75% → 100% — Go-live, treinamento e otimização

**Objetivos**
- Publicar a migração em produção com monitoramento.
- Capacitar a equipe e documentar o modelo operacional futuro.

**Atividades principais**
- Executar checklist de go-live (backup final do CMS antigo, alternância de DNS/variáveis, clears de cache).
- Monitorar métricas pós-publicação (performance, erros de API, logs de webhook, SEO).
- Concluir treinamento hands-on com times de conteúdo, marketing e tecnologia.
- Documentar playbook de manutenção (deploys, rollback, versionamento de schemas).
- Fechar tarefas pós-implantação: otimizações, automações adicionais, backlog de melhorias.

**Entregáveis**
- Registro de go-live com passo a passo e horários executados.
- Materiais de treinamento (vídeos curtos, guias rápidos, FAQ).
- Relatório final comparando KPIs pré e pós-migração (tempo de publicação, performance, estabilidade).

**Critérios de conclusão**
- Ambiente de produção operando exclusivamente com Sanity sem regressões.
- Equipe habilitada e com processos definidos para evoluir o CMS.
- Encerramento formal do projeto com lições aprendidas documentadas.

---

## Próximos passos recomendados
- Definir owners por área (tecnologia, conteúdo, marketing) para a execução das fases.
- Iniciar a Fase 1 reunindo stakeholders-chave para revisar o inventário preliminar.
- Agendar checkpoints quinzenais para revisar progresso de porcentagem e remover impedimentos.
