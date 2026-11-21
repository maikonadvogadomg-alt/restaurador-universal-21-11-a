/* PEÇA · 💚 Exportação do ChatGPT (conversations.json — lista com "mapping") */
R.peca({
  id: 'chatgpt', nome: 'Exportação do ChatGPT (conversations.json)', icone: '💚', ordem: 22,
  reconhece: (e) => Array.isArray(e.obj) && !!(e.obj[0] && e.obj[0].mapping),
  desmonta(e, s) {
    const p = R.vazio();
    e.obj.forEach((c, i) => {
      const nos = Object.values(c.mapping || {}).filter((n) => n.message && n.message.content && (n.message.content.parts || []).some((x) => typeof x === 'string' && x.trim()));
      nos.sort((a, b) => (a.message.create_time || 0) - (b.message.create_time || 0));
      const msgs = nos.filter((n) => ['user', 'assistant'].includes(n.message.author && n.message.author.role)).map((n) => ({ eu: n.message.author.role === 'user', texto: n.message.content.parts.filter((x) => typeof x === 'string').join('\n'), quando: n.message.create_time }));
      const titulo = c.title || 'Conversa ' + (i + 1);
      s.por('ChatGPT/conversas', titulo, '.md', R.conversaMd(titulo, msgs));
      p.meuchat.conversas.push({ id: 'gpt-' + (c.id || c.conversation_id || i), titulo, criado: (c.create_time || 0) * 1000 || Date.now(), atualizado: (c.update_time || 0) * 1000 || Date.now(), msgs: msgs.map((m, j) => ({ id: 'gpt' + i + '-' + j, papel: m.eu ? 'eu' : 'ia', texto: R.tampar(m.texto), quando: (m.quando || 0) * 1000 || Date.now() })) });
    });
    return { formato: 'ChatGPT — ' + e.obj.length + ' conversa(s)', pacote: p };
  },
});
