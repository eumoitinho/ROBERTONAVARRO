# Resumo de Extração de Conteúdo - Roberto Navarro Website

## Data da Extração
2025-11-09

## Páginas Extraídas

### 1. OBRIGADO (/app/obrigado/page.tsx)

**Tipo:** Página de confirmação pós-compra/inscrição

**Conteúdo Extraído:**
- **Metadata:** Título: "Obrigado!" | "Inscrição Recebida!"
- **Hero Section:**
  - Ícone: CheckCircle (amarelo)
  - Título dinâmico baseado em compra ou inscrição
  - Mensagens contextuais
- **Dados capturados da query string:**
  - product_id, value, transaction_id, email, name, event_name, ticket_name
- **Tracking:** Evento GTM 'purchase_completed' para compras válidas
- **CTAs:**
  - Botão WhatsApp com mensagem personalizada
  - Link para contato com equipe
- **Script de integração:** Eduzz Thank You page

---

### 2. INSCRIÇÃO INDEX (/app/inscricao/page.tsx)

**Tipo:** Página de formulário de inscrição para eventos

**Conteúdo Extraído:**
- **Metadata:** Inscrição para Evento específico (via query param)
- **Hero Section:**
  - Título: "Inscrição para {event.name}"
  - Descrição do evento
- **Componente:** RegistrationForm
  - Campos: name, email, phone
  - EventId dinâmico
- **Lógica:**
  - Busca evento por slug via getEventBySlug()
  - Exibe notFound() se evento não existir

---

### 3. INSCRIÇÃO CONFIRMAÇÃO (/app/inscricao/confirmacao/page.tsx)

**Tipo:** Página de confirmação de inscrição com ticket

**Conteúdo Extraído:**
- **Metadata:** "Inscrição Confirmada!"
- **Hero Section:**
  - Título: "Inscrição Confirmada!"
  - Subtítulo: "Obrigado por se inscrever. Seu ticket está pronto abaixo."
- **Componente:** TicketCard
  - Exibe ticketCode, eventName, name
  - Busca registro via getRegistrationByTicketCode()
- **CTAs:**
  - Botão "Voltar para a página inicial" com ícone Home

---

## FORMAÇÕES (7 páginas)

### 4. EDUCADOR FINANCEIRO (/app/formacoes/educador-financeiro/page.tsx)

**Metadata:**
- Título: "EDUCADOR FINANCEIRO"
- Subtítulo: "A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA"
- Descrição: Formação com certificação MEC

**Hero Section:**
- Imagem: /images/HERO_EDUCADOR.png
- CTA Principal: "QUERO MINHA LICENÇA PROFISSIONAL!"
- CTA Secundário: "Saiba mais"

**Seções Principais:**

1. **MEC Certification Section:**
   - Selo MEC com animação
   - Texto: "EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO"
   - Benefícios: Reconhecimento nacional, Validação profissional, Credibilidade garantida

2. **Professional License Section:**
   - Título: "SUA LICENÇA PROFISSIONAL PARA ATUAR COMO EDUCADOR FINANCEIRO"
   - Transformações: 6 itens
   - Benefícios da Licença: 6 itens
   - Garantia: "Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!"

3. **About Section:**
   - Imagem: /images/ROBERTO_5.jpg
   - Descrição da formação
   - Foco em certificação MEC e aplicação prática

4. **Exclusive Materials Section:**
   - Vídeo: /educador/WhatsApp Video 2025-08-21 at 10.38.45.mp4
   - Poster: /images/HERO_EDUCADOR_MOBILE.png
   - Materiais: Apostilas, bastidores, vídeo intro, checklist

5. **Features Section (6 recursos):**
   - Conhecimento abrangente
   - Ferramentas práticas
   - Mentoria personalizada
   - Networking e oportunidades
   - Certificação reconhecida
   - Método validado

6. **Benefits Section (4 benefícios):**
   - Independência financeira
   - Reconhecimento profissional
   - Realização de sonhos
   - Alta rentabilidade

7. **Modules Section (5 módulos principais + bônus):**
   - Módulo Inicial: Mudança de Mentalidade (9 aulas)
   - Módulo 2: Clareamento Financeiro (8 aulas)
   - Módulo 3: A Geração do Dinheiro (12 aulas)
   - Módulo 4: Liberdade Financeira e Investimentos (9 aulas)
   - Módulo 5: Finanças com Roberto Navarro (7 aulas)
   - Bônus: Materiais, Scripts, Cursos extras, Dias ao vivo, Afiliação 70%

8. **Licensed Trainer Section:**
   - 3 treinamentos disponíveis: Livre de Dívidas, Investimentos Inteligentes, Transformação Financeira

9. **Mentor Section:**
   - Roberto Navarro
   - Imagem: /images/ROBERTO_12.jpg
   - Biografia completa

10. **Transformation Videos Component**

11. **Notable Participants Component**

12. **Guarantees Section (3 garantias):**
    - Garantia legal de 7 dias
    - Garantia de resultados em 6 meses (destaque especial)
    - Certificação reconhecida

13. **Newsletter/Form Section:**
    - Título: "ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"
    - Source: "Educador Financeiro"
    - CTA: "QUERO SER UM EDUCADOR FINANCEIRO!"

14. **FAQ Section (8 perguntas):**
    - Experiência prévia necessária
    - Tempo para resultados
    - Como funciona certificação
    - Trabalhar em qualquer lugar do Brasil
    - Suporte pós-conclusão
    - Gerar renda ou vida pessoal
    - Carga horária flexível
    - Tornar-se treinador licenciado

**Componentes:**
- TransformationVideos (accent="red")
- NotableParticipants (accent="red")
- NewsletterFormacoes
- Footer (accent="red")
- WhatsAppButton

---

### 5. EMPREENDEDOR INTELIGENTE (/app/formacoes/empreendedor-inteligente/page.tsx)

**Metadata:**
- Título: "EMPREENDEDOR INTELIGENTE"
- Subtítulo: "Formação exclusiva para empresários"
- Descrição: "Empreender com lucro, leveza e liberdade é possível"

**Hero Section:**
- Imagem: /images/HERO_EMPREENDEDOR.png
- CTA: "GARANTA SUA VAGA!"

**Seções Principais:**

1. **Challenges Section (4 desafios):**
   - Você fatura, mas não lucra?
   - Quer crescer, mas está preso à operação?
   - Dificuldade para contratar pessoas?
   - Sente que ninguém entende seus desafios?

2. **Value Proposition Section:**
   - Título: "O QUE OS GRANDES EMPRESÁRIOS SABEM QUE VOCÊ AINDA NÃO SABE"
   - Descrição do programa (3 dias)
   - Foco em escalar negócios e networking

3. **What You Will Learn Section (10 itens):**
   - Crédito inteligente
   - Contabilidade estratégica
   - Sócios e investidores
   - Time comprometido
   - Modelo de vendas lucrativo
   - Marketing digital de verdade
   - Formação de caixa e capital de giro
   - Diversificação de rendas
   - Plano de aposentadoria
   - Networking de alto nível

4. **Metodologia Lean Section (5 tópicos):**
   - Crescimento x Escala
   - Capital de Giro
   - Modelo de Trabalho ABC
   - Marketing Digital
   - Valuation

5. **Para Quem É Section (3 perfis):**
   - Construir um planejamento eficiente
   - Criar objetivos práticos
   - Elaborar estratégias inteligentes

6. **Quem Somos Section (Mentor)**

7. **Testimonials Section**

8. **Newsletter Section:**
   - Título: "INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA"
   - Source: "Empreendedor Inteligente"

9. **FAQ Section (5 perguntas):**
   - Quem pode participar
   - Qual a duração
   - Conhecimentos prévios necessários
   - Como são os encontros
   - Garantia de resultados

**Imagens:**
- /images/HERO_EMPREENDEDOR.png

**Componentes:**
- NewsletterFormacoes
- Footer
- WhatsAppButton

---

### 6. LCF MENTORING PRO (/app/formacoes/lcf-mentoring-pro/page.tsx)

**Metadata:**
- Título: "LCF MENTORING PRO"
- Subtítulo: "Você já tem o dinheiro. Agora, só falta o controle!"
- Preço: R$ 20.000
- Descrição: Programa completo com treinamentos transformadores

**Hero Section:**
- Imagem: /images/HERO_MENTORIA.png
- CTA: "CONQUISTE SUA VAGA!"

**Seções Principais:**

1. **O Que Você Vai Aprender Section (4 inteligências):**
   - Inteligência emocional
   - Inteligência financeira
   - Inteligência espiritual
   - Inteligência estratégica

2. **Sobre o Programa Section:**
   - Título: "A RIQUEZA COMEÇA COM CLAREZA. E SE CONSTRÓI COM MÉTODO"
   - Imagens: /images/HERO_EDUCADOR.png, /images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png
   - 3 itens principais de transformação

3. **Testimonials Section**

4. **Quem Somos Section**

5. **Investment Section:**
   - Preço: R$ 20.000
   - Benefícios: 5 itens (Acesso vitalício, 4 imersões presenciais, +100h conteúdo, Suporte direto, Garantia 6 meses)
   - Benefícios adicionais: 4 itens (Networking, Comunidade, Mentorias, Material complementar)
   - CTAs: "QUERO ENTRAR PARA O LCF PRO", "VER FORMAÇÕES"

6. **Newsletter Section:**
   - Título: "INSCREVA-SE PARA TER A MUDANÇA DE VIDA"
   - Source: "LCF Mentoring Pro"

7. **FAQ Section (5 perguntas):**
   - É só para quem quer ser coach?
   - Há encontros presenciais?
   - Posso parcelar o valor?
   - Qual a diferença do PRO
   - Em quanto tempo verei resultados

**Componentes:**
- ReusableSection (how-works)
- TestimonialsSection
- NewsletterFormacoes
- Footer
- WhatsAppButton

---

### 7. MENTORIA INDIVIDUAL (/app/formacoes/mentoria-individual/page.tsx)

**Metadata:**
- Título: "MENTORIA INDIVIDUAL EXCLUSIVA"
- Subtítulo: "Transforme sua vida com a mentoria mais exclusiva do Brasil"
- Descrição: "Acompanhamento 100% personalizado para destravar seu potencial"

**Hero Section:**
- Imagem: /images/HERO_MENTORIAINDIVIDUAL.png
- CTA: "QUERO TRANSFORMAR MINHA VIDA"

**Seções Principais:**

1. **Benefícios Section (6 benefícios):**
   - Plano financeiro 100% personalizado
   - Resultados acelerados e consistentes
   - Acompanhamento 1:1 com Roberto Navarro
   - Transformação emocional e espiritual
   - Acesso a ferramentas exclusivas
   - Networking de alto nível

2. **Como Funciona Section:**
   - Título: "Mais do que uma mentoria, um despertar de consciência"
   - Imagens: /images/HERO_ESCALADOR.png, /images/HERO_ESCALADOR_MOBILE.png
   - 9 itens de aprendizado

3. **Notable Participants Component**

4. **Testimonials Section**

5. **Newsletter Section:**
   - Título: "Mentoria Individual"
   - Source: "Mentoria Individual"

**Componentes:**
- ReusableSection
- NotableParticipants
- TestimonialsSection
- NewsletterFormacoes
- Footer
- WhatsAppButton

---

### 8. MENTORIA DE INVESTIMENTOS (/app/formacoes/mentoria-de-investimentos/page.tsx)

**Metadata:**
- Título: "MENTORIA DE INVESTIMENTOS"
- Subtítulo: "Faça seu dinheiro trabalhar por você"
- Descrição: "Formação prática para quem quer aprender a investir com segurança"

**Hero Section:**
- Imagem: /images/HERO_MENTORIAINVESTIMENTOS.png
- CTA: "QUERO ME TORNAR UM INVESTIDOR!"

**Seções Principais:**

1. **Reprograme Sua Mente Section (2 caixas):**
   - PROBLEMAS COMUNS (vermelha, 5 itens)
   - SOLUÇÕES DA MENTORIA (verde, 5 itens)

2. **Transformação Section:**
   - Título: "A MENTORIA QUE VAI TRANSFORMAR SUA RELAÇÃO COM O DINHEIRO"
   - Duração: 2 dias intensivos + Universidade do Investidor

3. **O Que Você Vai Aprender Section (9 tópicos):**
   - Investimentos na Bolsa
   - Renda fixa
   - Análise técnica
   - Mercado futuro
   - Planejamento financeiro
   - Gestão de risco
   - Potes milionários
   - Gestão emocional
   - Inteligência de investimento

4. **Investir Não É Aposta Section (5 princípios):**
   - Investir é disciplina
   - Investir é administrar riscos
   - Investir é conhecimento constante
   - Investir é tolerar perdas
   - Investir é proteger o futuro

5. **Aprenda Com o Mentor Section:**
   - Roberto Navarro
   - Imagem: /images/roberto.webp
   - Biografia

6. **Testimonials Section:**
   - Vídeo: https://www.youtube.com/embed/k3GPTo26Fn4

7. **Investimento Seguro Section (2 garantias):**
   - Garantia legal de 7 dias
   - Garantia de resultados em 6 meses

8. **FAQ Section (4 perguntas):**
   - Para quem é essa formação?
   - Como a formação é entregue?
   - O que acontece depois?
   - Como transforma vida e negócio?

9. **Newsletter Section:**
   - Título: "PRONTO PARA TRANSFORMAR SUA VIDA FINANCEIRA?"
   - Source: "Mentoria de Investimentos"

**Componentes:**
- TestimonialsSection
- NewsletterFormacoes
- Footer (simplificado)

---

### 9. MÉTODO TF (/app/formacoes/metodo-tf/page.tsx)

**Metadata:**
- Título: "MÉTODO TF"
- Subtítulo: "Desbloqueie a riqueza em sua vida"
- Descrição: "Dê um passo decisivo em direção a um futuro próspero"

**Hero Section:**
- Badge: "MÉTODO TF"
- CTA: "QUERO ENTRAR NO MÉTODO TF!"

**Seções Principais:**

1. **Stats Section (4 estatísticas):**
   - +1,5 milhões de alunos
   - 1280 técnicas exclusivas
   - 5 livros publicados
   - +500 vídeos inspiradores

2. **O Bloqueio Invisível Section:**
   - Card explicativo sobre bloqueios mentais
   - CTA: "QUERO TRANSFORMAR MINHA VIDA!"

3. **Para Quem É Indicado Section (6 perfis):**
   - Empreendedores
   - Profissionais liberais
   - Pessoas com renda +R$ 5 mil
   - Futuros mentores
   - Visionários
   - Pessoas ambiciosas

4. **Benefícios Section (4 benefícios principais):**
   - Transformação financeira genuína
   - Estratégias comprovadas e eficazes
   - Networking de alto valor
   - Suporte contínuo e personalizado

5. **Conteúdo do Curso Section (5 módulos):**
   - Introdução ao desbloqueio da riqueza
   - Superação de bloqueios financeiros
   - Estratégias para aumentar sua renda
   - Planejamento financeiro inteligente
   - Criação de plano de ação personalizado

6. **Sobre Roberto Navarro Section:**
   - Imagem: /images/ROBERTO_1.jpg
   - Biografia completa

7. **Diferenciais Section (3 diferenciais):**
   - Método exclusivo e comprovado
   - Aulas presenciais
   - Material de apoio abrangente

8. **Garantia Section:**
   - Satisfação garantida ou dinheiro de volta
   - Garantia incondicional de 6 meses
   - Dobro do dinheiro se não houver resultados

9. **CTA Final Section:**
   - Título: "Sua jornada rumo à liberdade financeira"

10. **FAQ Section (5 perguntas):**
    - E se eu não conseguir aplicar as estratégias?
    - Preciso ter conhecimento prévio?
    - Quanto tempo dura?
    - Onde será realizado?
    - O que preciso levar?

11. **Testimonials Section**

12. **Newsletter Section:**
    - Título: "Método TF"
    - Source: "Método TF"

**Imagens:**
- /images/ROBERTO_1.jpg

**Componentes:**
- ScrollAnimation (várias animações)
- TestimonialsSection
- NewsletterFormacoes
- Footer
- WhatsAppButton

---

### 10. ROTA MIND (/app/formacoes/rota-mind/page.tsx)

**Metadata:**
- Título: "ROTA MIND"
- Subtítulo: "Mastermind exclusivo"
- Descrição: "O sucesso acontece no ambiente certo"
- Cor tema: Azul (blue-400)

**Hero Section:**
- Imagem: /images/HERO_ROTAMIND.png
- CTA: "QUERO ESTAR ENTRE OS MAIORES!"
- Countdown: false

**Seções Principais:**

1. **Challenges Section (5 desafios):**
   - Falta de técnica vs falta de acesso
   - Conhecimento mas conexões erradas
   - Dificuldade em pensar grande
   - Precisa de apoio para decisões estratégicas
   - Busca parcerias estratégicas

2. **O Que É Section:**
   - Clube extremamente seleto
   - 2 dias de imersão
   - Dia 1: Conteúdo de Alta Performance
   - Dia 2: Clube de Negócios
   - Imagem: /images/rotamind-meeting.png

3. **Event Highlights Section (4 destaques):**
   - Clube Seleto
   - Imersão de 2 Dias
   - Parcerias Reais
   - Conselho Estratégico

4. **Benefícios Section (4 tipos principais):**
   - Networking de Alto Nível (5 benefícios)
   - Parcerias Estratégicas (5 benefícios)
   - Treinamentos Exclusivos (5 benefícios)
   - Apoio de Conselheiros (5 benefícios)

5. **Advisory Section:**
   - Título: "NO ROTA MIND, VOCÊ NUNCA MAIS DECIDE SOZINHO"
   - 4 benefícios do conselho (Visão externa, Orientações, Experiências, Inteligência)

6. **Mentor Section:**
   - Roberto Navarro
   - Imagem: /images/ROBERTO_4.JPG
   - Biografia

7. **Form Section:**
   - Título: "SE VOCÊ QUER CONTINUAR NO MESMO LUGAR, ESSE CLUBE NÃO É PARA VOCÊ"
   - Campos: nome, email, telefone, empresa, cargo, faturamento anual, mensagem
   - Análise de perfil

8. **FAQ Section (5 perguntas):**
   - Quem pode participar?
   - Como funciona a imersão?
   - Qual é o investimento?
   - Onde e quando acontece?
   - O que acontece após os 2 dias?

9. **Final CTA Section:**
   - Título: "PRONTO PARA TRANSFORMAR SEU NEGÓCIO?"

**Imagens:**
- /images/HERO_ROTAMIND.png
- /images/rotamind-meeting.png
- /images/ROBERTO_4.JPG

**Componentes:**
- SectionBadge
- Footer
- WhatsAppButton

---

## EVENTOS (5 páginas)

### 11. CRENÇAS DA RIQUEZA (/app/eventos/crencas-da-riqueza/page.tsx)

**Metadata:**
- Título: "CRENÇAS DA RIQUEZA"
- Subtítulo: "Transformação mental"
- Descrição: "A riqueza começa na mente e se materializa nas decisões"
- Data: 13 de Setembro de 2025, 13h às 20h
- Cor tema: Amarelo (yellow-400)

**Hero Section:**
- Imagem: /images/HERO_CRENCAS.png
- CTA: "GARANTA SUA VAGA!"
- Countdown: true (13/09/2025 13h)

**Seções Principais:**

1. **Challenges Section (5 desafios):**
   - Você trava na hora de tomar decisões financeiras?
   - Sente que está sempre correndo sem sair do lugar?
   - Dificuldade em pensar grande?
   - Sabe que precisa mudar mas não consegue dar o passo?
   - Algo te impede de alcançar liberdade financeira?

2. **Transformation Videos Component**

3. **What You'll Learn Section (4 tipos de inteligência):**
   - Inteligência Emocional (5 benefícios)
   - Inteligência Financeira (5 benefícios)
   - Inteligência Espiritual (5 benefícios)
   - Inteligência Empresarial (5 benefícios)

4. **Event Highlights Section (4 destaques):**
   - Imersão Completa (10 horas)
   - Material Exclusivo
   - Networking Qualificado
   - Certificado

5. **Notable Participants Component**

6. **Testimonials Section**

7. **Mentors Section (2 mentores):**
   - Roberto Navarro
     - Imagem: /images/ROBERTO_4.jpg
     - Badge: "Fundador do ICF"
     - Biografia com 3 itens principais
   - Raíssa Navarro
     - Imagem: /images/RAISSA.png
     - Badge: "Especialista em PNL"
     - Biografia com 3 itens principais

8. **Form Section:**
   - Data: 13 de Setembro de 2025, 13h às 20h
   - Local: Alameda Araguaia, 751, Barueri, SP
   - CTA: "GARANTIR MINHA INSCRIÇÃO"
   - URL: https://evento.blinket.com.br/crencas-da-riqueza

9. **FAQ Section (5 perguntas):**
   - Preciso ter conhecimento prévio?
   - O que devo levar?
   - Haverá certificado?
   - Posso transferir ingresso?
   - Haverá gravação?

**Imagens:**
- /images/HERO_CRENCAS.png
- /images/ROBERTO_4.jpg
- /images/RAISSA.png

**Componentes:**
- TransformationVideos
- NotableParticipants
- TestimonialsSection
- EventCTAButton
- Footer
- WhatsAppButton

---

### 12. ENERGIA DO DINHEIRO (/app/eventos/energia-do-dinheiro/page.tsx)

**Metadata:**
- Título: "ENERGIA DO DINHEIRO"
- Subtítulo: "Desbloqueie a energia do dinheiro e transforme sua realidade"
- Data: 07 de Outubro, 13h às 20h
- Descrição: "Alinhe sua energia com a prosperidade"

**Hero Section:**
- Imagem: /images/HERO_ENERGIA.png
- CTA: "GARANTA SUA VAGA!"

**Seções Principais:**

1. **Benefícios Section (4 benefícios):**
   - Você trabalha muito mas nunca sobra dinheiro?
   - Sente que nasceu para prosperar mas algo te trava?
   - Sente culpa ou medo ao falar de dinheiro?
   - Acredita que ganhar dinheiro exige sacrifício?

2. **Como Funciona Section:**
   - Título: "Mais do que uma mentoria, um despertar de consciência"
   - Data: 07 de outubro, 13h às 20h
   - Imagens: /images/HERO_EMPREENDEDOR.png, /images/HERO_EDUCADOR_MOBILE.png
   - 9 tópicos de aprendizado

3. **Transformation Videos Component**

4. **Modal de Vídeo:**
   - YouTube embed com autoplay
   - Controles de fechamento

5. **Notable Participants Component**

6. **Testimonials Section**

7. **Mentor Section Component**

8. **Newsletter Section:**
   - Título: "GARANTA SUA VAGA NO ENERGIA DO DINHEIRO"
   - Source: "Energia do Dinheiro"
   - Data do evento: 07 de outubro, 13h às 20h

**Imagens:**
- /images/HERO_ENERGIA.png
- /images/HERO_EMPREENDEDOR.png
- /images/HERO_EDUCADOR_MOBILE.png

**Componentes:**
- SectionBadge
- TransformationVideos
- NotableParticipants
- TestimonialsSection
- MentorSection
- NewsletterFormacoes
- Footer
- WhatsAppButton

---

### 13. ESCALADOR DE NEGÓCIOS (/app/eventos/escalador-de-negocios/page.tsx)

**Metadata:**
- Título: "ESCALADOR DE NEGÓCIOS"
- Subtítulo: "Evento Presencial Exclusivo"
- Descrição: "Empreendedores de sucesso não crescem por acaso"

**Hero Section:**
- Imagem: /IMAGES/HERO_ESCALADOR.png
- CTA: "GARANTA SUA VAGA!"

**Seções Principais:**

1. **Challenges Section (4 desafios em linha):**
   - Trabalha demais, faturamento estagnado
   - Empresa depende de indicações ou sorte
   - Já tentou várias coisas sem sucesso
   - Está preso no operacional

2. **What You Will Learn Section (6 itens em 3 colunas):**
   - Estratégias reais de escala
   - Autoridade e posicionamento de marca
   - Multiplicação de lucros
   - Técnicas avançadas de venda
   - Networking estratégico
   - Plano de ação imediato

3. **Event Highlights Section (3 destaques em linha):**
   - Evento 100% gratuito
   - Experiência VIP disponível
   - Presencial, metodologia prática

4. **Notable Participants Component**

5. **Testimonials Section**

6. **Mentor Section Component**

7. **Newsletter Section:**
   - Título: "FIQUE LIGADO NO PRÓXIMO ESCALADOR DE NEGÓCIOS"
   - Source: "Escalador de Negócios"

**Imagens:**
- /IMAGES/HERO_ESCALADOR.png

**Componentes:**
- NotableParticipants
- TestimonialsSection
- MentorSection
- NewsletterSignup
- Footer
- WhatsAppButton

---

### 14. MENTOR MILIONÁRIO (/app/eventos/mentor-milionario/page.tsx)

**Metadata:**
- Título: "MENTOR MILIONÁRIO"
- Subtítulo: "O Evento Que Vai Transformar Conhecimento em Fortuna"
- Data: 24 de Setembro de 2025, 13h às 20h
- Local: Alameda Araguaia, 751, Barueri, SP
- Descrição: "De Lavador de Vidros a Multimilionário em 7 Anos"

**Hero Section:**
- Imagem: /IMAGES/HERO_ESCALADOR.png
- CTA: "QUERO MINHA VAGA NO MENTOR MILIONÁRIO"

**Seções Principais:**

1. **Para Quem É Section (5 perfis em grid):**
   - Profissionais que querem monetizar conhecimento
   - Pessoas em busca do primeiro milhão
   - Quem deseja se tornar mentor
   - Empreendedores que querem múltiplas rendas
   - Especialistas prontos para escalar

2. **Challenges & Solution Section (2 colunas):**
   - **Desafios (lado esquerdo):**
     - 4 perguntas sobre bloqueios
   - **Solução (lado direito):**
     - Descrição do Mentor Milionário
     - 5 detalhes do formato (Data, Local, Duração, Metodologia, Resultado)

3. **Programa Completo Section (7 horas, cards grandes):**
   - **ABERTURA:** A Mentalidade do Milhão
   - **BLOCO 1:** Reprogramação Mental
   - **BLOCO 2:** As Regras Secretas do Dinheiro
   - **BLOCO 3:** Múltiplas Fontes de Renda (2 estratégias)
   - **BLOCO FINAL:** Seu Plano Milionário (3 etapas em grid)

4. **O Que Você Vai Conquistar Section (6 itens em grid):**
   - Clareza sobre monetização
   - Estratégia para primeiro milhão
   - Mentalidade reprogramada
   - Plano concreto com ações
   - Conhecimento das regras
   - Duas fontes de renda estruturadas

5. **Este Evento É Para Você Section (4 afirmações):**
   - Você está CANSADO...
   - Você quer PARAR...
   - Você está DETERMINADO...
   - Você ACREDITA...

6. **Momento de Decidir Section:**
   - 4 afirmações em negrito
   - Citação de Roberto Navarro

7. **Notable Participants Component**

8. **Testimonials Section**

9. **Mentor Section Component**

10. **Inscrição Section:**
    - Data: 24 de Setembro de 2025, 13h às 20h
    - Local: Alameda Araguaia, 751, Barueri, SP
    - CTA: "GARANTIR MINHA INSCRIÇÃO"
    - URL: https://evento.blinket.com.br/mentor-milionario

**Estilos CSS especiais:**
- .card-hover
- .card-modern
- .floating-animation
- .pulse-glow

**Componentes:**
- NotableParticipants
- TestimonialsSection
- MentorSection
- EventCTAButton
- SectionBadge
- Footer
- WhatsAppButton

---

### 15. SEGREDOS DA MENTE MILIONÁRIA (/app/eventos/segredos-da-mente-milionaria/page.tsx)

**Metadata:**
- Título: "SEGREDOS DA MENTE MILIONÁRIA"
- Subtítulo: "Imersão exclusiva e transformadora"
- Data: 22 de outubro de 2025, 13h às 20h
- Local: R. Alameda Araguaia, 751 - Alphaville - SP
- Descrição: "Aprenda a despertar seu potencial milionário em 7 horas"
- Mentores: Roberto e Raíssa Navarro

**Hero Section:**
- Imagem: /images/HERO_SEGREDOS.png
- CTA: "QUERO DESPERTAR MINHA MENTE MILIONÁRIA"

**Seções Principais:**

1. **Benefícios Section (6 benefícios em grid 3 colunas):**
   - Segurança financeira
   - Propósito de vida
   - Liberdade financeira
   - Mentalidade milionária
   - Educação financeira
   - Networking e inspiração

2. **O Que Você Vai Aprender Section (3 itens):**
   - Múltiplas fontes de renda
   - Ação e prosperidade
   - Transformação mental

3. **Notable Participants Component**

4. **Testimonials Section**

5. **Newsletter Section (comentada, mas presente):**
   - Título: "GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA"
   - Source: "Segredos da Mente Milionária"
   - Informações do evento
   - CTA: "GARANTIR MINHA VAGA AGORA!"

**Tickets (definidos mas não exibidos):**
- Ingresso Especial: R$ 9,90 (ID: 2782193, Eduzz: E9OOG6859B)
- Ingresso VIP: R$ 49,90 (ID: 2782194, Eduzz: 6W48G3XN0Z) - Featured

**Imagens:**
- /images/HERO_SEGREDOS.png

**Componentes:**
- NotableParticipants
- TestimonialsSection
- NewsletterFormacoes
- Footerlp
- EventCTAButton (comentado)
- TicketPricingCards (comentado)

---

## COMPONENTES REUTILIZÁVEIS IDENTIFICADOS

### 1. HeroPages
**Props:**
- title, subtitle, secondtitle, description
- image
- ctaText, ctaHref
- secondaryCtaText, secondaryCtaHref
- showCountdown (boolean)
- countdownTargetDate (Date)

**Variantes identificadas:**
- HeroPagesRed (para Educador Financeiro)

### 2. SectionBadge
**Props:**
- text (string)

**Estilo:**
- Badge inline com border e backdrop-blur
- Texto pequeno em uppercase

### 3. NewsletterFormacoes
**Props:**
- title, description
- source (string)
- ctaText
- onSubmit (callback)
- accent (opcional: "red")
- eventDate, eventTime, eventLocation (opcionais)

**Campos:**
- name, email, phone

### 4. TransformationVideos
**Props:**
- accent (opcional: "red")

**Funcionalidade:**
- Exibe vídeos de depoimentos
- Modal com player YouTube

### 5. NotableParticipants
**Props:**
- accent (opcional: "red")

**Funcionalidade:**
- Exibe participantes notáveis/famosos

### 6. TestimonialsSection
**Sem props identificadas**

### 7. MentorSection
**Sem props identificadas**
**Conteúdo:**
- Biografia de Roberto Navarro
- Imagem padrão

### 8. EventCTAButton
**Props:**
- eduzzUrl (string)
- buttonText (string)
- className (string)
- showArrow (boolean)

### 9. TicketPricingCards
**Props:**
- eventId (number)
- eventName (string)
- ticketTypes (array de objetos)
  - id, name, price, description
  - benefits (array)
  - featured (boolean)
  - eduzzContentId (string)

### 10. Footer / Footerlp
**Props:**
- accent (opcional: "red")

### 11. WhatsAppButton
**Props:**
- source (string)
- className (string)

### 12. ReusableSection (how-works)
**Props:**
- id, title, subtitle, description
- imageDesktop, imageMobile
- listItems (array)
- ctaText, ctaHref

### 13. NewsletterSignup
**Props:**
- source, title, description
- onSubmit (callback)

### 14. ContentSection
**Props:**
- items (array de objetos)
  - title, description, icon, benefits

---

## PADRÕES IDENTIFICADOS

### Estrutura de Navegação
Padrão típico:
```javascript
const navigationItems = [
  { title: "Início", href: "/" },
  { title: "Sobre/Benefícios", href: "#section" },
  { title: "O Que Aprender", href: "#o-que-aprender" },
  { title: "Mentor/Depoimentos", href: "#mentor/#depoimentos" },
  { title: "Inscrição", href: "#inscricao", isButton: true }
]
```

### Estilos CSS Personalizados
Todas as páginas injetam estilos:
```css
.cta-hover {
  transition: all 0.3s ease;
}
.cta-hover:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
}
```

### Background Pattern
Padrão recorrente:
- Gradiente: `bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800`
- Noise texture: `/noise.png` com opacity muito baixa
- Elementos animados: círculos blur com animate-pulse

### Cores Temáticas
- **Formações:** Amarelo/Âmbar (yellow-400/amber-600)
- **Educador Financeiro:** Vermelho (red-400/red-600)
- **Rota Mind:** Azul (blue-400/blue-500)
- **Eventos:** Principalmente Amarelo

### Estrutura de Formulários
Campos padrão:
- name (text)
- email (email)
- phone (tel)
- Eventualmente: company, position, revenue, message

### CTAs Comuns
- "GARANTA SUA VAGA!"
- "QUERO ME TORNAR..."
- "CONQUISTE SUA VAGA!"
- "GARANTIR MINHA INSCRIÇÃO"

### Garantias Recorrentes
1. Garantia legal de 7 dias
2. Garantia de resultados em 6 meses (destaque: dobro do dinheiro de volta)
3. Certificação reconhecida (quando aplicável)

---

## IMAGENS IDENTIFICADAS

### Hero Images
- /images/HERO_EDUCADOR.png
- /images/HERO_EDUCADOR_MOBILE.png
- /images/HERO_EMPREENDEDOR.png
- /images/HERO_MENTORIA.png
- /images/HERO_MENTORIAINDIVIDUAL.png
- /images/HERO_MENTORIAINVESTIMENTOS.png
- /images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png
- /images/HERO_ROTAMIND.png
- /images/HERO_CRENCAS.png
- /images/HERO_ENERGIA.png
- /images/HERO_ESCALADOR.png
- /images/HERO_ESCALADOR_MOBILE.png
- /images/HERO_SEGREDOS.png

### Roberto Navarro
- /images/ROBERTO_1.jpg
- /images/ROBERTO_4.jpg
- /images/ROBERTO_4.JPG
- /images/ROBERTO_5.jpg
- /images/ROBERTO_12.jpg
- /images/roberto.webp

### Outros
- /images/RAISSA.png
- /images/MEC.png
- /images/DIVIDAS.jpg
- /images/INVESTIMENTO.jpg
- /images/REALIZAR.jpg
- /images/rotamind-meeting.png

### Vídeos
- /educador/WhatsApp Video 2025-08-21 at 10.38.45.mp4

---

## INTEGRAÇÕES EXTERNAS

### Eduzz
- Script: https://cdn.eduzzcdn.com/sun/thankyou/thankyou.js
- URLs de eventos:
  - https://evento.blinket.com.br/crencas-da-riqueza
  - https://evento.blinket.com.br/mentor-milionario
  - https://evento.blinket.com.br/segredos-da-mente-milionaria

### YouTube
- Embed de vídeos de depoimentos
- ID de exemplo: k3GPTo26Fn4

### WhatsApp
- Número: 5512997659057
- Mensagens personalizadas por source

### Google Tag Manager
- Evento: 'purchase_completed'
- DataLayer push com ecommerce data

---

## APIs IDENTIFICADAS

### /api/registrations
**Método:** POST
**Body:**
- eventId (number)
- name (string)
- email (string)
- phone (string)

**Response:**
- ticketCode (string)

**Redirect:** `/inscricao/confirmacao?ticket={ticketCode}`

### /api/inscricao
**Método:** POST (usado em algumas páginas)
**Similar ao /api/registrations**

---

## BANCO DE DADOS

### Functions identificadas:
- `getEventBySlug(slug: string)`
- `getRegistrationByTicketCode(ticketCode: string)`

### Schemas inferidos:

**events:**
- id (number)
- name (string)
- slug (string)
- description (string)

**registrations:**
- id
- ticket_code (string)
- event_name (string)
- name (string)
- email (string)
- phone (string)
- created_at

---

## CONTADORES / TIMERS

### Countdown Component
Usado em:
- Crenças da Riqueza: 13/09/2025 13:00:00

**Props:**
- countdownTargetDate (Date)

---

## RESUMO ESTATÍSTICO

### Total de Páginas Extraídas: 15
- Páginas Gerais: 3 (obrigado, inscricao/index, inscricao/confirmacao)
- Formações: 7
- Eventos: 5

### Componentes Reutilizáveis: 14+
### Imagens Identificadas: 25+
### Vídeos: 1 local + YouTube embeds
### APIs: 2 endpoints
### Integrações: Eduzz, WhatsApp, YouTube, GTM

---

## PADRÕES DE CONTEÚDO

### Estrutura Típica de Página de Formação:
1. Hero Section
2. Challenges/Benefícios Section
3. O Que Você Vai Aprender
4. Módulos/Conteúdo
5. Mentor/Quem Somos
6. Transformação/Depoimentos
7. Garantias
8. FAQ
9. Newsletter/Form
10. Footer

### Estrutura Típica de Página de Evento:
1. Hero Section (com/sem countdown)
2. Benefícios/Para Quem É
3. O Que Você Vai Aprender
4. Transformações/Depoimentos
5. Mentores (Roberto + Raíssa quando aplicável)
6. Inscrição (data, local, ingresso)
7. FAQ
8. Footer

---

## OBSERVAÇÕES TÉCNICAS

### Client Components
Todas as páginas principais usam `"use client"` no topo

### Next.js Features
- Server Components para algumas páginas simples
- Dynamic routing com searchParams
- Image optimization com next/image
- Script component para integrações

### Estado e Efeitos
- useState para controle de formulários, vídeos, modais
- useEffect para animações, event listeners
- useRouter para navegação programática

### Animações
- Framer Motion (usado em Educador Financeiro)
- CSS animations (pulse, float, fade)
- Scroll animations
- Hover effects consistentes

### Responsividade
- Mobile-first approach
- Breakpoints: sm, md, lg
- Imagens diferentes para desktop/mobile
- Grid adaptativos

---

## RECOMENDAÇÕES PARA PAYLOAD CMS

### Content Types Sugeridos:

1. **Formações**
   - Campos: title, subtitle, description, heroImage, heroImageMobile
   - Seções: benefits[], modules[], guarantees[], faqs[]
   - Price, featured (boolean)
   - CTAs: primaryCTA, secondaryCTA

2. **Eventos**
   - Campos: title, subtitle, description, eventDate, eventTime, eventLocation
   - heroImage, heroImageMobile
   - Mentors[] (relation)
   - Tickets[] (relation)
   - Seções: benefits[], learnings[], highlights[]
   - showCountdown (boolean), countdownDate

3. **Mentores**
   - name, role, badge, bio[], image
   - achievements[]

4. **Tickets**
   - name, price, description, benefits[]
   - featured (boolean)
   - eduzzContentId, eduzzUrl

5. **Depoimentos**
   - name, role, content, image
   - videoUrl (opcional)
   - featured (boolean)

6. **FAQ Items**
   - question, answer
   - category (select: formacoes, eventos, geral)

7. **Componentes Reutilizáveis**
   - SectionBadge: text
   - CTAButton: text, href, variant
   - Stats: number, label, icon

---

## PRÓXIMOS PASSOS RECOMENDADOS

1. **Modelagem no Payload:**
   - Criar Collections para cada Content Type
   - Definir relacionamentos
   - Configurar campos ricos (RichText para descrições)

2. **Migração de Dados:**
   - Extrair dados estáticos para JSONs
   - Popular Payload com dados iniciais
   - Testar queries e relacionamentos

3. **Componentes Dinâmicos:**
   - Refatorar páginas para consumir Payload API
   - Criar fetchers server-side
   - Implementar cache strategies

4. **Media Management:**
   - Upload de todas as imagens para Payload
   - Configurar otimização de imagens
   - Organizar por categorias

5. **SEO e Metadata:**
   - Adicionar campos SEO nas Collections
   - Meta titles, descriptions, OG images
   - Structured data (JSON-LD)

---

**FIM DO RESUMO DE EXTRAÇÃO**
