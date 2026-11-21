/* ♻️ Restaurador Universal — 80-tela.js · a tela: 📥 importar → 👁 ver ao vivo → ♻️ restaurar → ⬇ baixar */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s), E = R.E;
  let arquivos = [], resultados = [], aberto = -1;
  const usados = new Set();
  function sacola(base) {
    return { por(pasta, nome, ext, conteudo) {
      const b = base + '/' + pasta + '/' + R.limpo(nome); let n = b + ext, i = 2;
      while (usados.has(n.toLowerCase())) n = b + ' (' + i++ + ')' + ext;
      usados.add(n.toLowerCase()); arquivos.push({ caminho: n, conteudo });
    } };
  }
  async function entradaDe(nome, texto) {
    const ext = (nome.match(/\.(\w+)$/) || [])[1] ? nome.match(/\.(\w+)$/)[1].toLowerCase() : '';
    let obj = null; if (!/^(csv|tsv)$/.test(ext)) { try { obj = JSON.parse(texto); } catch (e) { obj = null; } }
    return { nome, ext, texto, obj };
  }
  async function desmontar(nome, texto) {
    const e = await entradaDe(nome, texto), base = R.limpo(nome.replace(/\.(json|txt|csv|tsv)$/i, ''), 50);
    if (!e.obj && !/^(csv|tsv|txt)$/.test(e.ext)) return { nome, erro: 'não consegui ler (não é .json, .csv nem .tsv)' };
    for (const p of R.pecas) {
      let ok = false; try { ok = p.reconhece(e); } catch (er) { ok = false; }
      if (!ok) continue;
      const antes = arquivos.length;
      try { const r = p.desmonta(e, sacola(base)) || {}; const n = arquivos.length - antes; if (n) return { nome, peca: p, formato: r.formato, n, pacote: r.pacote, resumo: r.resumo }; }
      catch (er) { arquivos.length = antes; console.warn('peça ' + p.id, er); }
    }
    return { nome, erro: 'nenhuma peça reconheceu e não achei nada dentro' };
  }
  async function processar(lista) {
    arquivos = []; resultados = []; usados.clear(); aberto = -1;
    $('#saida').innerHTML = '<div class="cartao">⏳ Lendo…</div>';
    for (const f of lista) {
      try {
        if (/\.zip$/i.test(f.name)) {
          const z = await JSZip.loadAsync(f); let achou = 0;
          for (const [cam, ent] of Object.entries(z.files)) if (!ent.dir && /\.(json|csv|tsv|txt)$/i.test(cam)) { achou++; resultados.push(await desmontar(f.name.replace(/\.zip$/i, '') + ' - ' + cam.split('/').pop(), await ent.async('string'))); }
          if (!achou) resultados.push({ nome: f.name, erro: 'o .zip não tem .json, .csv nem .tsv dentro' });
        } else resultados.push(await desmontar(f.name, await f.text()));
      } catch (er) { resultados.push({ nome: f.name, erro: er.message }); }
    }
    mostrar();
  }
  // ── ♻️ restaurar: dentro do Meu Chat / SK Jurídico manda direto; fora, baixa um arquivo pronto para o ⤒ Restaurar deles
  function appPai() {
    let P = null; try { P = window.parent && window.parent !== window ? window.parent : null; } catch (e) { P = null; }
    try { if (P && P.J && P.J.restaurar) return { nome: 'SK Jurídico', abrir: (r, o) => P.J.restaurar.janela(r, o) }; } catch (e) {}
    try { if (P && P.MC && P.MC.restaurar) return { nome: 'Meu Chat', abrir: (r, o) => P.MC.restaurar.janela(r, o) }; } catch (e) {}
    return null;
  }
  const contaMC = (p) => p ? p.meuchat.conversas.length + Object.keys(p.meuchat.codigos || {}).length + (p.meuchat.memoria ? 1 : 0) : 0;
  const contaJur = (p) => p ? Object.values(p.juridico.lojas || {}).reduce((t, x) => t + x.length, 0) : 0;
  function restaurar(i) {
    const r = resultados[i], p = r.pacote, pai = appPai();
    const resumo = r.resumo || { formato: r.formato, achados: [{ nome: r.peca.nome, reconhecido: true, linhas: contaMC(p) + contaJur(p), detalhe: r.formato }], pacote: p, nJur: contaJur(p), nMC: contaMC(p) };
    if (pai) return pai.abrir(resumo, 'Do Restaurador (' + r.peca.nome + ')');
    if (contaMC(p)) baixar('para-o-Meu-Chat-' + R.limpo(r.nome, 30) + '.json', JSON.stringify({ app: 'meu-chat', versao: 1, data: new Date().toISOString(), conversas: p.meuchat.conversas, memoria: p.meuchat.memoria || '', codigos: p.meuchat.codigos, prefs: {} }), 'application/json');
    if (contaJur(p)) baixar('para-o-SK-Juridico-' + R.limpo(r.nome, 30) + '.json', JSON.stringify({ app: 'assistente-juridico', versao: 1, data: new Date().toISOString(), lojas: p.juridico.lojas }), 'application/json');
    aviso('Baixei o arquivo pronto. No app, toque em ⤒ Restaurar e escolha ele (junta, não apaga nada).');
  }
  function mostrar() {
    const grupos = {}; arquivos.forEach((a, i) => { const p = a.caminho.split('/').slice(0, -1).join('/'); (grupos[p] = grupos[p] || []).push(i); });
    const pai = appPai();
    $('#saida').innerHTML =
      '<div class="cartao"><h2>O que eu reconheci</h2>' + resultados.map((r, i) => r.erro
        ? '<p><span class="er">❌</span> <b>' + E(r.nome) + '</b>: ' + E(r.erro) + '</p>'
        : '<div class="res"><p><span class="ok">✅</span> <b>' + E(r.nome) + '</b><br><span class="mut">' + r.peca.icone + ' Peça: ' + E(r.peca.nome) + '</span><br>' + E(r.formato || '') + ' → <b>' + r.n + '</b> arquivo(s)</p>' +
          (contaMC(r.pacote) + contaJur(r.pacote) ? '<button data-rest="' + i + '">♻️ ' + (pai ? 'Restaurar no ' + E(pai.nome) : 'Arquivo para restaurar no app') + '</button>' : '') + '</div>').join('') +
      (arquivos.length ? '<div class="linha"><button class="p" id="b-zip">⬇ Baixar tudo (.zip com as pastas)</button></div><p class="mut">Toque no nome de um item para <b>ver ao vivo</b> (o HTML roda ali mesmo).</p>' : '') + '</div>' +
      (arquivos.length ? '<div class="cartao">' + Object.entries(grupos).map(([p, ids]) => '<details class="grupo"' + (Object.keys(grupos).length < 5 ? ' open' : '') + '><summary>📁 ' + E(p) + ' (' + ids.length + ')</summary>' +
        ids.slice(0, 600).map((i) => '<div class="arq"><button class="nome" data-ver="' + i + '">👁 ' + E(arquivos[i].caminho.split('/').pop()) + '</button><button data-bx="' + i + '" aria-label="Baixar">⬇</button></div><div class="ver" id="ver-' + i + '"></div>').join('') +
        (ids.length > 600 ? '<p class="mut">… e mais ' + (ids.length - 600) + ' (vêm no .zip)</p>' : '') + '</details>').join('') + '</div>' : '');
  }
  function ver(i) {
    const box = $('#ver-' + i); if (!box) return;
    if (aberto === i) { box.innerHTML = ''; aberto = -1; return; }
    if (aberto >= 0 && $('#ver-' + aberto)) $('#ver-' + aberto).innerHTML = '';
    aberto = i; const a = arquivos[i], ext = (a.caminho.match(/\.(\w+)$/) || [])[1] || '';
    if (typeof a.conteudo !== 'string') {
      if (/^(png|jpe?g|gif|webp)$/i.test(ext)) { const u = URL.createObjectURL(new Blob([a.conteudo])); box.innerHTML = '<img src="' + u + '" style="max-width:100%;border-radius:8px">'; }
      else box.innerHTML = '<p class="mut">Arquivo ' + ext.toUpperCase() + ' (' + (a.conteudo.length / 1024).toFixed(1) + ' KB) — toque em ⬇ para baixar e abrir no app certo.</p>';
      return;
    }
    const kb = (new Blob([a.conteudo]).size / 1024).toFixed(1);
    if (/^html?$/i.test(ext)) {
      box.innerHTML = '<div class="linha"><span class="mut">▶ Rodando ao vivo · ' + kb + ' KB</span><button data-cp="' + i + '">📋 Copiar o código</button><button data-tela="' + i + '">⛶ Tela cheia</button></div><iframe sandbox="allow-scripts allow-forms allow-modals allow-popups" class="viva"></iframe>';
      box.querySelector('iframe').srcdoc = a.conteudo;
    } else box.innerHTML = '<div class="linha"><span class="mut">' + kb + ' KB</span><button data-cp="' + i + '">📋 Copiar</button></div><pre>' + E(a.conteudo.slice(0, 150000)) + (a.conteudo.length > 150000 ? '\n… (o resto vem no arquivo)' : '') + '</pre>';
  }
  function telaCheia(i) {
    const w = document.createElement('div'); w.className = 'cheia';
    w.innerHTML = '<div class="linha"><b style="flex:1">' + E(arquivos[i].caminho.split('/').pop()) + '</b><button data-fechar>✕ Fechar</button></div><iframe sandbox="allow-scripts allow-forms allow-modals allow-popups"></iframe>';
    document.body.appendChild(w); w.querySelector('iframe').srcdoc = arquivos[i].conteudo;
    w.querySelector('[data-fechar]').onclick = () => w.remove();
  }
  function baixar(nome, conteudo, tipo) {
    const blob = conteudo instanceof Blob ? conteudo : new Blob([conteudo], { type: tipo || 'application/octet-stream' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  async function zipTudo() {
    const z = new JSZip(); arquivos.forEach((a) => z.file(a.caminho, a.conteudo));
    const blob = await z.generateAsync({ type: 'blob', compression: 'DEFLATE' }), nome = 'backup-restaurado-' + new Date().toISOString().slice(0, 10) + '.zip';
    try { const f = new File([blob], nome, { type: 'application/zip' }); if (/Android|iPhone/i.test(navigator.userAgent) && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: nome }); return; } } catch (e) {}
    baixar(nome, blob);
  }
  function aviso(t) { const d = document.createElement('div'); d.className = 'aviso'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 5000); }
  async function copiar(t) { try { await navigator.clipboard.writeText(t); aviso('📋 Copiado'); } catch (e) { const x = document.createElement('textarea'); x.value = t; document.body.appendChild(x); x.select(); document.execCommand('copy'); x.remove(); aviso('📋 Copiado'); } }

  $('#b-esc').onclick = () => $('#arq').click();
  $('#arq').onchange = (e) => { const l = [...e.target.files]; e.target.value = ''; if (l.length) processar(l); };
  const solta = $('#solta');
  solta.addEventListener('dragover', (e) => { e.preventDefault(); solta.classList.add('em-cima'); });
  solta.addEventListener('dragleave', () => solta.classList.remove('em-cima'));
  solta.addEventListener('drop', (e) => { e.preventDefault(); solta.classList.remove('em-cima'); const l = [...e.dataTransfer.files]; if (l.length) processar(l); });
  $('#saida').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'b-zip') return zipTudo();
    if (b.dataset.ver != null) return ver(+b.dataset.ver);
    if (b.dataset.rest != null) return restaurar(+b.dataset.rest);
    if (b.dataset.cp != null) return copiar(arquivos[+b.dataset.cp].conteudo);
    if (b.dataset.tela != null) return telaCheia(+b.dataset.tela);
    if (b.dataset.bx != null) { const a = arquivos[+b.dataset.bx]; return baixar(a.caminho.split('/').pop(), a.conteudo, /\.html?$/.test(a.caminho) ? 'text/html' : /\.(md|txt|py|tsx?|jsx?|css|csv|sql|sh|json)$/.test(a.caminho) ? 'text/plain;charset=utf-8' : undefined); }
  });
  $('#pecas').innerHTML = R.pecas.map((p) => '<li>' + p.icone + ' ' + E(p.nome) + '</li>').join('');
  window.__receber = (texto, nome) => processar([new File([texto], nome || 'backup.json')]);
  window.__teste = { processar, get arquivos() { return arquivos; }, get resultados() { return resultados; } };
})();
