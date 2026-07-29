# Site Task Template — Fibbo

Resumo rápido: este arquivo descreve o template de tarefas para projetos de `Site` (F1..F7) e os campos/custom fields recomendados para ClickUp, além das instruções de importação via CSV e sugestão de automação para criar a pasta do cliente e povoar o backlog.

Custom Fields recomendados (ClickUp):
- `Service` (Dropdown): PER, CON, FM, SG, SIT, LEA, HOS, ATD
- `ReferenceID` (Text): ex: F1, F2, M3, T6, A2
- `Cadence` (Dropdown): one-time, daily, weekly, monthly, quarterly, conditional
- `Roles` (Multi-select): GT, CP, CS, AD, FE, SO, EX, TI, GP, etc.
- `Estimated Hours` (Number)
- `Gate` (Dropdown): none, checklist, porta-do-dono, dependency, archive
- `AutomationFlag` (Checkbox)
- `Priority` (Dropdown): low, medium, high
- `Block/Phase` (Dropdown): sem/mes/tri/fase/infra/cond/phase
- `TemplatePath` (Text): path to template file in repo

Workflow / Status sugerido:
- Backlog -> To Do -> In Progress -> Awaiting Approval -> Blocked -> Done
- Regras: se `Gate = porta-do-dono` não permitir mover para Done sem `Aprovação registrada` custom field preenchida.

CSV de importação
- Arquivo gerado: `templates/site_tasks.csv` (cada linha = task template). Importar em ClickUp via "Import CSV" definindo mapeamento para os Custom Fields acima.

Checklist padrão (exemplos por fase)
- F1 Briefing: Briefing doc || LENTE confirmada || Acessos coletados || Objetivos definidos || Aprovação do dono
- F2 Wireframe: Sitemap || 3 wireframes chave || IA validada || Gate macro || Aprovação do dono
- F3 Copy: Versões por seção || Conselho 4 cadeiras || Consolidar feedback || Aprovação por página
- F4 Layout: Identidade || Protótipo || QA craft || Aprovação layout
- F5 Dev: CMS || SEO técnico || Tracking || Redirects || SSL || Pre-flight
- F6 Go-live: 10-block checklist || Verificar tracking || Backups || Autorização do dono
- F7 Pós: Ativar canais || Revisão pós-lançamento || Agenda trimestral || Arquivar/offboard

Automação sugerida (visão):
1. Trigger: Novo cliente criado (via Form/CRM) → Webhook / Zapier / Make / ClickUp API
2. Action: Criar Folder/List para o cliente dentro do Space `Fibbo/Clientes`.
3. Action: Importar `templates/site_tasks.csv` para a List do cliente (ou criar tasks via API usando o CSV como input). Mapear Custom Fields e Checklist.
4. Action: Criar Recurring Tasks para rituais (Resumo semanal, Dia de Otimização, Relatório mensal) conforme `Cadence`.
5. Safety: marcar todas as automations criadas com `AutomationFlag = false` inicialmente e mover para `true` após 5–10 ciclos manuais.

Snippet de exemplo — ClickUp (pseudo):
```
# 1. Create folder
POST /api/v2/folder
# 2. Create list (backlog)
POST /api/v2/list
# 3. For each CSV row -> create task with custom_fields and checklist
POST /api/v2/task
```

Observações operacionais:
- Mensagens de cliente sempre no grupo (documentar no template de comunicação).
- ATD (CS) tasks: marcar `Shared/Per-Client` no ClickUp ou usar apenas uma task por cliente conforme regra do documento.
- Defina o campo `Aprovação — registrado por` (user) e `Aprovação — data` (date) se quiser bloquear gates programaticamente.

Próximos passos que eu posso executar agora:
- Gerar CSV para outras entregas (Conteúdo, Performance, FibboMetrics) — automatizar inventário.
- Gerar JSON de Task Templates para API de importação.
- Criar script Node.js / PowerShell que usa ClickUp API para criar a pasta e tasks automaticamente.

Se quiser, gero agora o JSON de importação e um script mínimo que cria a pasta do cliente e importa as tasks do CSV.
