# ♻️ Restaurador Universal de Backups (21/11-A)

Abra o `index.html`. Escolha backups (.json, .zip, .csv, .tsv). Ele descobre o que é, mostra **ao vivo**,
devolve no **formato original** e **restaura** no Meu Chat / SK Jurídico (quando aberto dentro deles).

## Peças (uma por tipo de backup) — `js/pecas/`
- `10-meus-apps.js` — Meu Chat, SK Jurídico HTML, ⬇ backup do Banco (Neon), mc_itens, banco antigo do jurídico 1.7
- `20-replit-projetos.js` — projetos da Replit (CSV, TSV, ponto-e-vírgula ou JSON com html/css/js) → .html que funciona
- `21-ai-code-studio.js` — AI Code Studio (conversas, abas de código, memórias, system prompt; chaves NÃO saem)
- `22-chatgpt.js` — exportação do ChatGPT (conversations.json)
- `23-mensagens.js` — lista simples de mensagens (role/content)
- `30-tabela.js` — qualquer tabela → .csv para o Excel
- `90-procurar.js` — formato desconhecido: procura código, textos e arquivos dentro

## Tipo novo de backup
Crie `js/pecas/NN-nome.js` com `R.peca({ id, nome, icone, ordem, reconhece(ent), desmonta(ent, s) })`
e coloque o `<script>` no `index.html`. O resto não muda.

## Versão de arquivo único (a que vai no 🧰 Ferramentas dos apps)
`python3 montar-arquivo-unico.py saida.html`
