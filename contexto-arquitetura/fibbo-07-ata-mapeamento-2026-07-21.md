# Ata – Reunião de Mapeamento Comercial (21/07/2026)

**Contrato:** PFC-2026-001 | **Fase:** Mapeamento (Mês 1)
**Participantes:** Paolla Fonseca (Consultoria), Mariana (Fibbo), Ronaldo Campos (Consultor Comercial Externo).

## Objetivo

Compreender o fluxo comercial de Ronaldo Campos e avaliar a viabilidade de operar parte desse processo dentro do ClickUp.

## Contexto do participante

Ronaldo Campos atua como **consultor externo** da Fibbo, focado em conexões de mercado e suporte comercial. Não integra a equipe interna de operação. Sua geração de leads é baseada em rede de contatos e eventos (ex.: grupo Líderes do Amanhã). Trabalha em parceria com Fabrício para conectar serviços da Fibbo a clientes, validando escopos e precificações em conjunto.

## Mapeamento realizado

### Fluxo comercial atual (Ronaldo)

```
Lead → Qualificação → Apresentação de Proposta → Feedback → Contrato → Kickoff para a equipe interna
```

- Pós-kickoff, Ronaldo presta suporte pontual ao atendimento e redes sociais e auxilia na transição de projetos.
- Controle atual: planilha pessoal no Drive com ciclo de ~35 clientes a cada 30 dias, sem automação.

### Gargalos identificados

- **Pós-kickoff sem rastreabilidade**: após o kickoff, a equipe interna perde a visão do escopo do cliente. Os documentos de briefing produzidos por Ronaldo não são consultados no fluxo contínuo.
- **Onboarding burocrático**: documentos de kickoff com 20+ páginas causam fricção e feedback negativo dos clientes (relatado: reunião de 6h com resultado insatisfatório). Existe consenso de que o processo precisa ser mais prático e menos documentado.
- **Operação centrada no processo interno**: o fluxo está desenhado para a operação e não para o histórico e necessidades específicas de cada cliente.

### Dados essenciais por cliente (levantados por Ronaldo)

Para estruturação no ClickUp, os campos mínimos por cadastro são:
- Proposta
- Termos do acordo
- Escopo
- Contato principal + telefone
- Setor de atuação da empresa do cliente

### Decisão de arquitetura

Paolla propôs estruturar o ClickUp **centrado no cliente** (não por departamento): a partir do contrato, o sistema concentra todo o histórico, briefings e status de projetos — permitindo gestão visual clara próxima da operação.

A migração da planilha de Ronaldo para o ClickUp foi validada como viável, desde que as informações essenciais sejam mantidas acessíveis para toda a equipe.

### Posição de Ronaldo sobre transparência externa

Ronaldo ponderou que, embora uma área do cliente no ClickUp seja valiosa no médio prazo, a **prioridade imediata é resolver a maturidade interna**: cumprimento de prazos e confiabilidade operacional. Abrir visibilidade externa antes de resolver isso gera risco reputacional.

> "A Fibbo precisa focar primeiro em não falhar com os prazos combinados."

## Próximas etapas

| Responsável | Ação | Prazo |
|---|---|---|
| Paolla Fonseca | Criar rascunho do MVP do fluxo operacional e comercial no ClickUp | A combinar |
| Paolla Fonseca | Agendar reunião com Ronaldo para revisar o MVP e ajustar conforme realidade operacional | A combinar |
| Paolla Fonseca | Validar proposta administrativa e comercial com Ronaldo após apresentação a Fabrício | A combinar |

## Observações relevantes para arquitetura

- O fluxo comercial da Fibbo tem **dois atores**: Fabrício (interno) e Ronaldo (externo), que compartilham leads e validam escopos juntos — a estrutura no ClickUp precisa contemplar os dois vetores de entrada de clientes.
- O **maior gap está no pós-kickoff**: o escopo negociado se perde após a entrada do cliente no fluxo operacional. A centralização do histórico do cliente no ClickUp é a principal solução identificada.
- Onboarding simplificado é uma prioridade compartilhada: documentos longos geram rejeição. A estrutura to-be deve prever processo de kickoff enxuto.
- Reforça o achado do diagnóstico AS IS: **operação não consulta materiais produzidos no comercial**, criando descontinuidade de informação entre venda e entrega.
- Ronaldo apontou diretamente que **entrega pontual antecede qualquer iniciativa de visibilidade ao cliente** — isso alinha com a posição da consultoria de construir maturidade interna antes de dashboards externos.

---
*Ata consolidada por Paolla Fonseca Consultoria a partir das anotações automáticas da reunião. Repositório do projeto: https://github.com/paolla-consultoria/consultoriafibbo*
