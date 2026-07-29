#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function usage() {
  console.log('Usage: node client_folder_simulator.js --client "Client Name" [--csv templates/site_tasks.csv] [--out output]');
  process.exit(1);
}

const argv = require('minimist')(process.argv.slice(2));
const clientName = argv.client || argv.c;
const csvPath = argv.csv || path.join(__dirname, '..', 'templates', 'site_tasks.csv');
const outBase = argv.out || path.join(__dirname, '..', 'output');

if (!clientName) usage();

const configPath = path.join(__dirname, '..', 'templates', 'client_folder_config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const csvRaw = fs.readFileSync(csvPath, 'utf8');
const records = parse(csvRaw, { columns: true, skip_empty_lines: true });

const clientDir = path.join(outBase, sanitize(clientName));
fs.mkdirSync(clientDir, { recursive: true });

// Create lists
const lists = {};
for (const list of config.lists) {
  const listDir = path.join(clientDir, slugify(list));
  fs.mkdirSync(listDir, { recursive: true });
  lists[list] = { dir: listDir, tasks: [] };
}

// Group by entrega (Service) for non-MGMT tasks
const entregaMap = new Map();

for (const row of records) {
  const task = mapRowToTask(row);
  // Decide which list
  if ((task.custom_fields.Service || '').toUpperCase() === 'MGMT' || task.blockPhase === 'management') {
    // Gestão de Projetos
    addTaskToList(lists, config.listsMap['Gestao de Projetos'], task);
  } else {
    // Backlog grouping by service label
    const svc = task.custom_fields.Service || 'UNKNOWN';
    const entregaKey = svc.toUpperCase();
    if (!entregaMap.has(entregaKey)) {
      const entregaName = `ENTREGA: ${config.serviceLabels[entregaKey] || svc} [${svc}]`;
      const entrega = {
        id: `ENTREGA-${entregaKey}`,
        name: entregaName,
        type: 'entrega',
        children: []
      };
      entregaMap.set(entregaKey, entrega);
    }
    entregaMap.get(entregaKey).children.push(task);
  }
}

// Write entrega parents and child tasks to Backlog
const backlogList = lists[config.listsMap['Backlog']];
for (const [k, entrega] of entregaMap.entries()) {
  const entregaFile = path.join(backlogList.dir, `${safeFileName(entrega.name)}.json`);
  fs.writeFileSync(entregaFile, JSON.stringify(entrega, null, 2));
  // write children as files under a subfolder
  const entregaChildrenDir = path.join(backlogList.dir, `${safeFileName(entrega.name)}_children`);
  fs.mkdirSync(entregaChildrenDir, { recursive: true });
  entrega.children.forEach((task, idx) => {
    const file = path.join(entregaChildrenDir, `${idx + 1}_${safeFileName(task.name)}.json`);
    fs.writeFileSync(file, JSON.stringify(task, null, 2));
  });
}

// Persist MGMT tasks already added to Gestao de Projetos
for (const listName of Object.keys(lists)) {
  const list = lists[listName];
  if (list.tasks.length) {
    for (let i = 0; i < list.tasks.length; i++) {
      const t = list.tasks[i];
      const file = path.join(list.dir, `${i + 1}_${safeFileName(t.name)}.json`);
      fs.writeFileSync(file, JSON.stringify(t, null, 2));
    }
  }
}

// Create a simple WBS file
const wbs = [];
for (const [k, entrega] of entregaMap.entries()) {
  wbs.push({ entrega: entrega.name, tasks: entrega.children.map(t => t.name) });
}
fs.writeFileSync(path.join(clientDir, 'WBS.json'), JSON.stringify(wbs, null, 2));

console.log(`Simulação criada em: ${clientDir}`);

function addTaskToList(lists, listName, task) {
  if (!lists[listName]) {
    const dir = path.join(clientDir, slugify(listName));
    fs.mkdirSync(dir, { recursive: true });
    lists[listName] = { dir, tasks: [] };
  }
  lists[listName].tasks.push(task);
}

function mapRowToTask(row) {
  const checklist = (row.Checklist || '').split('||').map(s => s.trim()).filter(Boolean);
  const roles = (row.Roles || '').split(';').map(s => s.trim()).filter(Boolean);
  return {
    name: row['Task Name'] || row.TaskName || 'Unnamed Task',
    description: row.Description || '',
    custom_fields: {
      Service: row.Service || '',
      ReferenceID: row.ReferenceID || '',
      Cadence: row.Cadence || '',
      Roles: roles,
      EstimatedHours: Number(row['Estimated Hours'] || row.EstimatedHours || 0),
      Gate: row.Gate || '',
      AutomationFlag: (row.AutomationFlag || 'false').toLowerCase() === 'true'
    },
    priority: row.Priority || '',
    blockPhase: row['Block/Phase'] || row.BlockPhase || '',
    checklist: checklist,
    templatePath: row.TemplatePath || ''
  };
}

function sanitize(name) {
  return name.replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '_');
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function safeFileName(name) {
  return name.replace(/[^a-z0-9\-_\.]/gi, '_');
}
