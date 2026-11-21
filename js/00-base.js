/* ♻️ Restaurador Universal — 00-base.js
   As ferramentas que todas as PEÇAS usam. Cada tipo de backup é uma peça em js/pecas/.
   Para ensinar um tipo NOVO de backup: crie js/pecas/NN-nome.js com R.peca({ ... }) e coloque o <script> no index.html.
   Uma peça tem:
     id, nome, icone
     reconhece(ent)  → true se o arquivo é dela. ent = { nome, ext, texto, obj (JSON lido ou null) }
     desmonta(ent, s) → põe os arquivos com s.por(pasta, nome, ext, conteudo) e devolve { formato, pacote? }
                        (pacote = no formato do Reconhecer, para ♻️ restaurar no Meu Chat / SK Jurídico) */
(function () {
  'use strict';
  const R = (window.R = window.R || {});
  R.pecas = [];
  R.peca = (p) => { R.pecas.push(p); R.pecas.sort((a, b) => (a.ordem || 50) - (b.ordem || 50)); };
  R.E = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  R.limpo = (s, max) => String(s || 'sem-nome').replace(/[\\/:*?"<>|\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max || 60) || 'sem-nome';
  R.tampar = (t) => (window.Segredos ? Segredos.tampar(t) : t);
  R.dataBR = (t) => { const n = typeof t === 'number' ? (t < 1e12 ? t * 1000 : t) : Date.parse(t); return isNaN(n) ? '' : new Date(n).toLocaleString('pt-BR'); };
  R.b64bytes = (b64) => { const s = atob(String(b64).replace(/^data:[^,]*,/, '').replace(/\s/g, '')); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };
  R.ehChave = (k) => /chave|apikey|api_key|key$|keys|senha|password|token|secret/i.test(k);
  R.vazio = () => ({ juridico: { lojas: { documentos: [], modelos: [], ementas: [], historico: [], conversas: [], regras: [], codigos: [] }, prefs: {} }, meuchat: { conversas: [], memoria: '', codigos: {}, links: [] }, outros: [] });

  // extensão certa pelo nome da linguagem ou pelo jeito do código
  R.extDe = (lang, cod) => {
    const l = String(lang || '').toLowerCase();
    if (/python|^py$/.test(l)) return '.py'; if (/tsx/.test(l)) return '.tsx'; if (/jsx/.test(l)) return '.jsx'; if (/^ts$|typescript/.test(l)) return '.ts';
    if (/^js$|javascript/.test(l)) return '.js'; if (/^css$/.test(l)) return '.css'; if (/json/.test(l)) return '.json'; if (/^md$|markdown/.test(l)) return '.md';
    if (/^sh$|bash|shell/.test(l)) return '.sh'; if (/sql/.test(l)) return '.sql'; if (/html|web/.test(l)) return '.html';
    const c = String(cod || '').trim();
    if (/^<!doctype|^<html|<\/(div|body|script|style|p|h1)>/i.test(c)) return '.html';
    if (/^(import |from \w+ import|def |print\()/m.test(c) && !/[{};]\s*$/m.test(c.slice(0, 400))) return '.py';
    if (/export default|import React|useState\(/.test(c)) return '.tsx';
    if (/^\s*(const|let|function|document\.)/m.test(c)) return '.js';
    return '.txt';
  };
  // junta html + css + js num documento só (igual ao organizador da Replit do Claude 4.6)
  R.montarHtml = (titulo, html, css, js) => {
    const h = String(html || '').trim();
    if (/<!doctype|^<html/i.test(h)) {
      let r = h;
      if (css && css.trim()) r = /<\/head>/i.test(r) ? r.replace(/<\/head>/i, '<style>\n' + css + '\n</style>\n</head>') : '<style>\n' + css + '\n</style>\n' + r;
      if (js && js.trim()) r = /<\/body>/i.test(r) ? r.replace(/<\/body>/i, '<script>\n' + js + '\n<\/script>\n</body>') : r + '\n<script>\n' + js + '\n<\/script>';
      return r;
    }
    return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + R.E(titulo) + '</title>\n<style>\n' + (css || '') + '\n</style>\n</head>\n<body>\n' + h + '\n<script>\n' + (js || '') + '\n<\/script>\n</body>\n</html>\n';
  };
  R.paginaHtml = (titulo, corpo) => (/<html/i.test(corpo) ? corpo : R.montarHtml(titulo, corpo, '', ''));

  // CSV/TSV com campos entre aspas e quebra de linha dentro (o export da Replit é assim)
  R.lerCsv = (texto) => {
    const t = String(texto).replace(/^﻿/, '');
    const cab = t.slice(0, 2000).split(/\r?\n/)[0];
    const sep = cab.includes('\t') ? '\t' : cab.split(';').length > cab.split(',').length ? ';' : ',';
    const linhas = []; let campo = '', linha = [], aspas = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (c === '"') { if (aspas && t[i + 1] === '"') { campo += '"'; i++; } else aspas = !aspas; continue; }
      if (c === sep && !aspas) { linha.push(campo); campo = ''; continue; }
      if ((c === '\n' || c === '\r') && !aspas) { if (c === '\r' && t[i + 1] === '\n') i++; linha.push(campo); campo = ''; if (linha.some((x) => x !== '')) linhas.push(linha); linha = []; continue; }
      campo += c;
    }
    if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
    const cols = (linhas.shift() || []).map((c) => c.trim());
    return { colunas: cols, linhas: linhas.map((l) => Object.fromEntries(cols.map((c, i) => [c, l[i] == null ? '' : l[i]]))) };
  };
  R.csv = (linhas) => {
    const cols = [...new Set(linhas.slice(0, 300).flatMap((r) => (r && typeof r === 'object' ? Object.keys(r) : [])))].filter((c) => !R.ehChave(c));
    const cel = (v) => { const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    return '﻿' + cols.join(';') + '\n' + linhas.map((r) => cols.map((c) => cel(r && r[c])).join(';')).join('\n');
  };
  // conversa → texto .md (igual para todos os apps)
  R.conversaMd = (titulo, msgs) => {
    let md = '# ' + (titulo || 'Conversa') + '\n\n';
    for (const m of msgs || []) md += '**' + (m.eu ? '🧑 Eu' : '🤖 IA') + '**' + (m.quando ? ' · ' + R.dataBR(m.quando) : '') + '\n\n' + R.tampar(m.texto || '') + '\n\n---\n\n';
    return md;
  };
})();
