/* PEÇA · 💬 Lista simples de mensagens ({role, content}) — muitos apps de chat exportam assim */
R.peca({
  id: 'mensagens', nome: 'Lista de mensagens (role / content)', icone: '💬', ordem: 23,
  reconhece: (e) => { const l = Array.isArray(e.obj) ? e.obj : e.obj && Array.isArray(e.obj.messages) ? e.obj.messages : null; return !!(l && l[0] && l[0].role && 'content' in l[0]); },
  desmonta(e, s) {
    const l = Array.isArray(e.obj) ? e.obj : e.obj.messages, titulo = (e.obj && e.obj.title) || e.nome.replace(/\.\w+$/, '');
    const msgs = l.filter((m) => m.role !== 'system').map((m) => ({ eu: m.role === 'user', texto: typeof m.content === 'string' ? m.content : JSON.stringify(m.content), quando: m.timestamp || m.created_at }));
    s.por('Conversas', titulo, '.md', R.conversaMd(titulo, msgs));
    const p = R.vazio(); p.meuchat.conversas.push({ id: 'msg-' + Date.now(), titulo, criado: Date.now(), atualizado: Date.now(), msgs: msgs.map((m, j) => ({ id: 'm' + j, papel: m.eu ? 'eu' : 'ia', texto: R.tampar(m.texto), quando: Date.now() })) });
    return { formato: 'Conversa com ' + l.length + ' mensagem(ns)', pacote: p };
  },
});
