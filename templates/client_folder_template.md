# Template: Pasta de Cliente — Fibbo

Objetivo
- Desenhar o padrão completo de uma pasta de projeto de cliente no ClickUp. Este documento é a fonte de verdade para a estrutura (lists), regras de WBS (entrega → tarefa → subtarefa), campos e comportamento esperado antes da implementação no ClickUp.

Visão geral da estrutura
- Space: Fibbo
- Folder: Clientes
  - Folder: [Cliente] — pasta do cliente (gerada por onboarding)
    - List: [Cliente] Backlog — todo o escopo contratado (entregas + tasks detalhadas)
    - List: [Cliente] Sprint — priorizações semanais / quadro de execução
    - List: [Cliente] Gestão de Projetos — tarefas de planejamento e sustentação (internas)
    - List: [Cliente] Área do Cliente — espelho do backlog com visibilidade controlada
- Folder: Templates — repositório de templates por entrega (Site, Conteúdo, Performance, FM, etc.)

Princípio de WBS (Work Breakdown Structure)
- Nível 0: Entrega (package) — representa um pacote/entrega maior (ex: Site, Pulse Trimestral, Plano Editorial)
- Nível 1: Tarefa — componente da entrega (ex: F1 Briefing, F2 Wireframe)
- Nível 2: Subtarefa — atividades executáveis (ex: Coletar acessos, Produzir sitemap)

Regra operacional:
- Uma `Entrega` é considerada "entregue" quando todas as suas `Tarefas` estiverem no status `Done`.
- Uma `Tarefa` é considerada "entregue" quando todas as suas `Subtarefas` estiverem no status `Done`.
- Nomeação recomendada (padronizada):
  - Entrega: `ENTREGA: <NOME_ENTREGA> [REF]` (ex: ENTREGA: SITE [SIT])
  - Tarefa: `<REF> — <TID>: <Título>` (ex: SIT — F1: Briefing / Kickoff)
  - Subtarefa: `<REF>-<TID>-s<#>: <ação>` (ex: SIT-F1-s1: Coletar acessos)

Custom fields (recomendados)
- `Service` (Dropdown): PER, CON, FM, SG, SIT, LEA, HOS, ATD, MGMT
- `ReferenceID` (Text): ex: F1, M3, T6, MG1
- `Cadence` (Dropdown): one-time, daily, weekly, monthly, quarterly, conditional
- `Roles` (Multi-select): GT, CP, CS, AD, FE, SO, EX, TI, GP
- `Estimated Hours` (Number)
- `Gate` (Dropdown): none, checklist, porta-do-dono, dependency, archive
- `AutomationFlag` (Checkbox)
- `VisibleToClient` (Checkbox) — marca se deve aparecer na `Área do Cliente` automaticamente
- `ApprovalUser` (User) e `ApprovalDate` (Date) — para gates `porta-do-dono`

Lists e função operacional
- Backlog: fonte única do escopo. Aqui ficam as `Entregas` (parent tasks) com as `Tarefas` como subtasks, e as `Subtarefas` como subtasks de segundo nível (ClickUp permite subtasks aninhadas). Importar templates aqui.
- Sprint: cópia filtrada / movida das tarefas planejadas para o sprint atual. Fluxo de planejamento: selecionar do `Backlog` → mover para `Sprint` durante o planning.
- Gestão de Projetos: tarefas internas (MG1..MG3) — reuniões, follow-ups, extração de relatórios. Essas tasks podem ser recorrentes.
- Área do Cliente: somente tarefas visíveis ao cliente. Implementação recomendada: automatizar cópia-resumida das tasks marcadas `VisibleToClient=true` — a cópia contém apenas título, descrição resumida, status e link para a original (controle interno permanece em Backlog).

Regras de progresso e automações planejadas
- Auto-encerramento de tarefa: adicionar automação que verifica subtasks; quando todas subtasks de um task estiverem Done, setar task como Done.
- Auto-encerramento de entrega: verificar todas as tasks filhas; quando todas Done, setar parent entrega como Done.
- Gate `porta-do-dono`: ao criar ou mover para `Awaiting Approval` a task com Gate=porta-do-dono, exigir preenchimento de `ApprovalUser` + `ApprovalDate` antes de mover para Done.
- Segurança: ao gerar `Área do Cliente`, não copiar campos sensíveis (ex.: horas internas, notas de pagamento). Cópia deve ser controlada por template de exportação.

Exemplo prático (WBS) — ENTREGA: SITE [SIT]
- ENTREGA: SITE [SIT]
  - SIT — F1: Briefing / Kickoff
    - SIT-F1-s1: Preparar briefing zero
    - SIT-F1-s2: Confirmar LENTE
    - SIT-F1-s3: Coletar acessos
    - SIT-F1-s4: Definir objetivo + 4 fontes do sitemap
    - SIT-F1-s5: Registrar aprovação (porta do dono)
  - SIT — F2: Wireframe / Arquitetura
    - SIT-F2-s1: Produzir sitemap
    - SIT-F2-s2: Criar 3 wireframes chave
    - SIT-F2-s3: Validar IA (≤3 cliques)
    - SIT-F2-s4: Gate macro / aprovação do dono
  - SIT — F3: Copy
    - SIT-F3-s1: Produzir versões por seção
    - SIT-F3-s2: Rodar Conselho (4 avaliadores)
    - SIT-F3-s3: Consolidar feedback
  - ... (F4..F7)

Observação sobre granularidade
- Evite criar subtarefas menores que 10–15 minutos de execução — prefira agrupar em um único item “executar X” para reduzir overhead de gestão.

Views sugeridas (ClickUp)
- Backlog (List view) — todos os pacotes/entregas com colunas por Status / Priority / Roles
- WBS (Indented view) — visualizar Entrega → Tarefa → Subtarefa em árvore
- Sprint Board (Board view) — colunas por status, swimlanes por Role
- Customer View (Área do Cliente) — lista filtrada pelo campo `VisibleToClient=true` (ou cópias automatizadas)

Naming & Versioning
- Para entregas com versões (ex: relatórios), use sufixo `_vN` no título do anexo e registre no campo `TemplatePath` ou `DeliveryVersion`.

Ligando com os templates já criados
- Os templates de Site gerados neste repositório estão em `templates/` — ex: [templates/site_tasks.csv](templates/site_tasks.csv) e os MD/JSON por tarefa (ex: [templates/site_F1_briefing.md](templates/site_F1_briefing.md)). Use estes arquivos como fonte para povoar o `Backlog` da pasta do cliente.

Checklist de validação do template da pasta do cliente
- [ ] Estrutura de Lists criada (Backlog, Sprint, Gestão de Projetos, Área do Cliente)
- [ ] Convenção de nomes aplicada
- [ ] Mapeamento WBS aplicado (Entrega → Tarefa → Subtarefa)
- [ ] Templates importáveis (CSV / JSON) vinculados
- [ ] Regras de aprovação (porta-do-dono) definidas

Próximo passo sugerido
- Revisar este template; quando aprovado, eu gero um JSON de configuração + script Node.js que simula a criação da pasta do cliente localmente (sem chamar ClickUp) para testarmos o fluxo antes da integração real.
