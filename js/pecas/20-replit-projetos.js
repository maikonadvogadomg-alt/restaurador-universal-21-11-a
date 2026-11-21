/* PEÇA · 🟠 Projetos da Replit (playground / snippets)
   É o que o organizador do Claude 4.6 fazia: cada LINHA é um projeto com as colunas id, title/titulo/nome, html, css, js, mode.
   Aceita os 3 jeitos que a Replit/Neon exportam: CSV (vírgula), TSV (tab) ou ponto-e-vírgula — e também JSON (lista).
   Junta html + css + js num .html só, que abre e funciona. */
(function () {
  const col = (cols, ...nomes) => cols.find((c) => nomes.some((n) => (n instanceof RegExp ? n.test(c.toLowerCase()) : c.toLowerCase() === n)));
  function linhasDe(e) {
    if (Array.isArray(e.obj)) return e.obj;
    if (e.obj && typeof e.obj === 'object') { for (const v of Object.values(e.obj)) if (Array.isArray(v) && v[0] && typeof v[0] === 'object' && ('html' in v[0] || 'css' in v[0])) return v; return null; }
    if (/^(csv|tsv|txt)$/.test(e.ext)) { try { return R.lerCsv(e.texto).linhas; } catch (er) { return null; } }
    return null;
  }
  R.peca({
    id: 'replit', nome: 'Projetos da Replit (CSV · TSV · JSON com html/css/js)', icone: '🟠', ordem: 20,
    reconhece(e) { const l = linhasDe(e); if (!l || !l.length || typeof l[0] !== 'object') return false; const cols = Object.keys(l[0]); return !!col(cols, 'html') && !!(col(cols, 'css') || col(cols, 'js', 'javascript')); },
    desmonta(e, s) {
      const l = linhasDe(e), cols = Object.keys(l[0]);
      const cT = col(cols, /title|titulo|nome|name/), cH = col(cols, 'html'), cC = col(cols, 'css'), cJ = col(cols, 'js', 'javascript'), cM = col(cols, 'mode', 'tipo', 'type'), cI = col(cols, 'id');
      const p = R.vazio(); let n = 0;
      l.forEach((r, i) => {
        const titulo = (cT && r[cT]) || 'Projeto ' + (i + 1); const modo = String((cM && r[cM]) || '').toLowerCase();
        const html = r[cH] || '', css = (cC && r[cC]) || '', js = (cJ && r[cJ]) || '';
        if (!String(html + css + js).trim()) return;
        let arq, ext = '.html';
        if (/react|jsx|tsx/.test(modo) && !html.trim()) { arq = js; ext = /tsx/.test(modo) ? '.tsx' : '.jsx'; }
        else if (/python|py/.test(modo)) { arq = js || html; ext = '.py'; }
        else arq = R.montarHtml(titulo, html, css, js);
        s.por('Replit — projetos', titulo, ext, arq); n++;
        const id = 'replit-' + ((cI && r[cI]) || i);
        p.meuchat.codigos[id] = { id, nome: titulo, lang: ext.slice(1), codigo: arq, criado: Date.now(), atualizado: Date.now() };
      });
      return { formato: 'Projetos da Replit (' + l.length + ' linha(s))', pacote: p };
    },
  });
})();
