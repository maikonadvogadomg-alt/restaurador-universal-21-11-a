/* PEÇA · 🧠 AI Code Studio (o seu app de chat com várias IAs)
   Formato: { app: 'ai-code-studio', conversations: {…}, codeTabs: [{name, language, content}], memories: [{title, content}], settings: {systemPrompt, …} }
   As chaves de API que estiverem em settings NÃO saem. */
R.peca({
  id: 'ai-code-studio', nome: 'AI Code Studio (conversas, abas de código, memórias)', icone: '🧠', ordem: 21,
  reconhece: (e) => !!(e.obj && !Array.isArray(e.obj) && (e.obj.app === 'ai-code-studio' || (e.obj.conversations && (e.obj.codeTabs || e.obj.memories || e.obj.settings)))),
  desmonta(e, s) {
    const d = e.obj, p = R.vazio();
    const convs = Array.isArray(d.conversations) ? d.conversations : Object.values(d.conversations || {});
    convs.forEach((c, i) => {
      const msgs = (c.messages || []).map((m) => ({ eu: m.role === 'user', texto: typeof m.content === 'string' ? m.content : Array.isArray(m.content) ? m.content.map((x) => x.text || '').join('\n') : JSON.stringify(m.content), quando: m.timestamp || m.createdAt || m.time }));
      const titulo = c.title || c.titulo || 'Conversa ' + (i + 1);
      s.por('AI Code Studio/conversas', titulo, '.md', R.conversaMd(titulo, msgs));
      p.meuchat.conversas.push({ id: 'acs-' + (c.id || i), titulo, criado: Date.parse(c.createdAt) || Date.now(), atualizado: Date.parse(c.updatedAt || c.createdAt) || Date.now(), msgs: msgs.map((m, j) => ({ id: 'acs' + i + '-' + j, papel: m.eu ? 'eu' : 'ia', texto: R.tampar(m.texto), quando: Date.parse(m.quando) || +m.quando || Date.now() })) });
    });
    (d.codeTabs || []).forEach((t, i) => {
      const nome = t.name || t.title || 'Aba ' + (i + 1), cod = t.content || t.code || '';
      const ext = (String(nome).match(/\.(html?|py|tsx?|jsx?|css|json|md|txt|sql|sh)$/i) || [])[0] || R.extDe(t.language, cod);
      s.por('AI Code Studio/codigos', String(nome).replace(/\.(html?|py|tsx?|jsx?|css|json|md|txt|sql|sh)$/i, ''), ext, cod);
      const id = 'acs-tab-' + (t.id || i); p.meuchat.codigos[id] = { id, nome, lang: ext.slice(1), codigo: cod, criado: Date.now(), atualizado: Date.now() };
    });
    const mems = (d.memories || []).map((m) => (m.title ? '## ' + m.title + '\n' : '') + (m.content || m.text || ''));
    if (mems.length) { s.por('AI Code Studio', 'memorias', '.md', '# 🧠 Memórias\n\n' + R.tampar(mems.join('\n\n'))); p.meuchat.memoria = mems.join('\n\n'); }
    const st = d.settings || {};
    if (st.systemPrompt) s.por('AI Code Studio', 'system prompt', '.md', st.systemPrompt);
    const cfg = Object.fromEntries(Object.entries(st).filter(([k]) => !R.ehChave(k) && k !== 'systemPrompt'));
    if (Object.keys(cfg).length) s.por('AI Code Studio', 'configuracoes (sem chaves)', '.json', JSON.stringify(cfg, null, 2));
    return { formato: 'AI Code Studio' + (d._version ? ' v' + d._version : '') + ' — ' + convs.length + ' conversa(s), ' + (d.codeTabs || []).length + ' aba(s) de código, ' + (d.memories || []).length + ' memória(s)', pacote: p };
  },
});
