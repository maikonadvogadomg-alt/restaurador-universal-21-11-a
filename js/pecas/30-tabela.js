/* PEÇA · 📊 Qualquer tabela (CSV, TSV ou lista JSON) → .csv que abre no Excel, com as colunas arrumadas */
R.peca({
  id: 'tabela', nome: 'Tabela qualquer (CSV · TSV · lista JSON)', icone: '📊', ordem: 30,
  reconhece: (e) => /^(csv|tsv)$/.test(e.ext) || (Array.isArray(e.obj) && e.obj.length > 0 && e.obj.every((x) => x && typeof x === 'object' && !Array.isArray(x))),
  desmonta(e, s) {
    const l = Array.isArray(e.obj) ? e.obj : R.lerCsv(e.texto).linhas;
    s.por('tabelas (Excel)', e.nome.replace(/\.\w+$/, ''), '.csv', R.csv(l));
    return { formato: 'Tabela com ' + l.length + ' linha(s) e ' + Object.keys(l[0] || {}).length + ' coluna(s)' };
  },
});
