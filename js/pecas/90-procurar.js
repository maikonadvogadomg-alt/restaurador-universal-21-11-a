/* PEÇA · 🔎 Procurar sozinho — para backup de um app que ainda não tem peça.
   Anda por dentro do arquivo e tira: código e HTML (com nome), textos com título, arquivos em base64 (Word, imagem…).
   Nunca leva campos de chave/senha/token. Quando aparecer um tipo novo, o certo é criar uma peça para ele. */
R.peca({
  id: 'procurar', nome: 'Procurar dentro (formato desconhecido)', icone: '🔎', ordem: 90,
  reconhece: (e) => !!e.obj,
  desmonta(e, s) {
    const vistos = new Set(); const EXT = /\.(html?|py|tsx?|jsx?|css|json|md|txt|sql|sh)$/i;
    (function anda(o, prof) {
      if (!o || typeof o !== 'object' || prof > 12 || vistos.has(o)) return; vistos.add(o);
      if (Array.isArray(o)) { o.forEach((x) => anda(x, prof + 1)); return; }
      const nome = o.titulo || o.title || o.nome || o.name || o.filename || o.fileName || o.path;
      const cod = o.codigo || o.code || o.html || o.source || o.content || o.conteudo || o.texto || o.text || o.body;
      const b64 = o.base64 || o.docx_base64 || o.data_base64 || (typeof o.data === 'string' && /^data:[\w/+.-]+;base64,/.test(o.data) ? o.data : null);
      if (b64 && nome) { try { const ext = (String(nome).match(/\.\w+$/) || [])[0] || ((String(b64).match(/^data:\w+\/(\w+)/) || [])[1] ? '.' + String(b64).match(/^data:\w+\/(\w+)/)[1] : '.bin'); s.por('arquivos', String(nome).replace(/\.\w+$/, ''), ext, R.b64bytes(b64)); } catch (er) {} }
      else if (typeof cod === 'string' && cod.length > 40 && nome) {
        const ext = (String(nome).match(EXT) || [])[0] || R.extDe(o.lang || o.language || o.mode || o.tipo, cod);
        s.por('achados', String(nome).replace(EXT, ''), ext, ext === '.md' && !/^#/.test(cod) ? '# ' + nome + '\n\n' + R.tampar(cod) : cod);
      }
      for (const [k, v] of Object.entries(o)) {
        if (R.ehChave(k)) continue;
        if (typeof v === 'string' && v.length > 2 && /^[\[{]/.test(v.trim())) { try { anda(JSON.parse(v), prof + 1); } catch (er) {} }
        else if (v && typeof v === 'object') anda(v, prof + 1);
      }
    })(e.obj, 0);
    return { formato: 'Formato desconhecido — procurei dentro' };
  },
});
