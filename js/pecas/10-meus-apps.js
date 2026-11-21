/* PEÇA · 📱 Meus apps — Meu Chat, SK Jurídico HTML, o ⬇ backup do 🗄 Banco (Neon), a tabela mc_itens
   e o banco antigo do SK Jurídico 1.7 da Replit (usa o Reconhecer, a mesma peça que os apps usam). */
R.peca({
  id: 'meus-apps', nome: 'Meus apps (Meu Chat, SK Jurídico, Banco Neon, mc_itens, jurídico 1.7)', icone: '📱', ordem: 10,
  reconhece: (e) => !!(e.obj && window.Reconhecer && (e.obj.app === 'meu-chat' || e.obj.app === 'assistente-juridico' || (e.obj.tabelas && typeof e.obj.tabelas === 'object') || (Array.isArray(e.obj) && e.obj[0] && 'tipo' in e.obj[0] && 'dados' in e.obj[0]))),
  desmonta(e, s) {
    const r = Reconhecer.detectar(e.obj, e.nome), p = r.pacote, mc = p.meuchat;
    (mc.conversas || []).forEach((c) => {
      s.por('Meu Chat/conversas', c.titulo || c.id, '.md', R.conversaMd(c.titulo, (c.msgs || []).map((m) => ({ eu: m.papel === 'eu', texto: m.texto || (m.erro ? '(erro: ' + m.erro + ')' : ''), quando: m.quando }))));
      (c.msgs || []).forEach((m, i) => (m.fotos || []).forEach((f, j) => { if (typeof f === 'string' && /^data:image/.test(f)) s.por('Meu Chat/fotos', (c.titulo || c.id) + ' ' + (i + 1) + '-' + (j + 1), '.' + ((f.match(/^data:image\/(\w+)/) || [])[1] || 'png').replace('jpeg', 'jpg'), R.b64bytes(f)); }));
    });
    if (mc.memoria) s.por('Meu Chat', 'memoria', '.md', '# 🧠 Memória\n\n' + R.tampar(mc.memoria));
    Object.values(mc.codigos || {}).forEach((c) => s.por('Meu Chat/codigos', c.nome || c.id, R.extDe(c.lang, c.codigo), c.codigo || ''));
    const pr = mc.original && mc.original.prefs; if (pr && pr.contextos) { try { JSON.parse(pr.contextos).forEach((x) => s.por('Meu Chat/contextos', x.nome || x.id, '.md', x.texto || '')); } catch (er) {} }
    if (mc.original && mc.original.codigos) Object.values(mc.original.codigos).forEach((c) => s.por('Meu Chat/codigos', c.nome || c.id, R.extDe(c.lang, c.codigo), c.codigo || ''));
    for (const [loja, itens] of Object.entries(p.juridico.lojas || {})) for (const it of itens || []) {
      const nome = it.titulo || it.nome || it.id, pasta = 'SK Juridico/' + loja;
      if (loja === 'codigos') { s.por(pasta, nome, R.extDe(it.tipo || it.lang, it.codigo), it.codigo || ''); continue; }
      if (loja === 'conversas') { s.por(pasta, nome, '.md', R.conversaMd(nome, (it.msgs || it.mensagens || []).map((m) => ({ eu: m.papel === 'eu' || m.role === 'user', texto: m.texto || m.content, quando: m.quando || m.created_at })))); continue; }
      if (it.docx_base64 || it.docx) { try { s.por(pasta, it.docx_filename || nome, /\.docx$/i.test(it.docx_filename || '') ? '' : '.docx', R.b64bytes(it.docx_base64 || it.docx)); } catch (er) {} }
      if (it.html) s.por(pasta, nome, '.html', R.paginaHtml(nome, it.html));
      else if (it.md || it.texto || it.conteudo) s.por(pasta, nome, '.md', '# ' + nome + '\n\n' + (it.categoria ? '_Categoria: ' + it.categoria + '_\n\n' : '') + (it.md || it.texto || it.conteudo));
      else if (!it.docx_base64) s.por(pasta, nome, '.json', JSON.stringify(it, null, 2));
    }
    (p.outros || []).forEach((o) => { if ((o.linhas || []).length) s.por('tabelas (Excel)', o.nome, '.csv', R.csv(o.linhas)); });
    if (e.obj.tabelas) for (const [t, l] of Object.entries(e.obj.tabelas)) if (Array.isArray(l) && l.length && !(p.outros || []).some((o) => o.nome === t)) s.por('tabelas (Excel)', t, '.csv', R.csv(l));
    return { formato: r.formato, pacote: p, resumo: r };
  },
});
