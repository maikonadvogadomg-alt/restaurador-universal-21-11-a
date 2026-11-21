# 🧬 Receita para recriar: Restaurador Universal

_Gerada sem IA, lendo 17 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** Restaurador Universal
- **Partes de código:** 14 (1 tela, 12 logica, 0 servidor, 0 dados, 1 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** nenhuma

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-base.js         ← ♻️ Restaurador Universal — 00-base.js As ferramentas que todas as PEÇA (era js/00-base.js)
js/15-tela.js         ← ♻️ Restaurador Universal — 80-tela.js · a tela: 📥 importar → 👁 ver a (era js/80-tela.js)
js/20-reconhecer.js   ← ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML  (era js/lib/reconhecer.js)
js/25-segredos.js     ← 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem par (era js/lib/segredos.js)
js/30-meus-apps.js    ← PEÇA · 📱 Meus apps — Meu Chat, SK Jurídico HTML, o ⬇ backup do 🗄 Ban (era js/pecas/10-meus-apps.js)
js/35-replit-projetos.js← PEÇA · 🟠 Projetos da Replit (playground / snippets) É o que o organiz (era js/pecas/20-replit-projetos.js)
js/40-ai-code-studio.js← PEÇA · 🧠 AI Code Studio (o seu app de chat com várias IAs) Formato: { (era js/pecas/21-ai-code-studio.js)
js/45-chatgpt.js      ← PEÇA · 💚 Exportação do ChatGPT (conversations.json — lista com "mappi (era js/pecas/22-chatgpt.js)
js/50-mensagens.js    ← PEÇA · 💬 Lista simples de mensagens ({role, content}) — muitos apps d (era js/pecas/23-mensagens.js)
js/55-tabela.js       ← PEÇA · 📊 Qualquer tabela (CSV, TSV ou lista JSON) → .csv que abre no  (era js/pecas/30-tabela.js)
js/60-procurar.js     ← PEÇA · 🔎 Procurar sozinho — para backup de um app que ainda não tem p (era js/pecas/90-procurar.js)
js/65-montar-arquivo-unico.js← Junta o projeto modular num .html só (é esse que vai dentro do 🧰 Ferr (era montar-arquivo-unico.py)
js/70-inicio.js       ← Restaurador Universal — ♻️ Restaurador Universal v21/11-A (era index.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `js/00-base.js` | `js/10-base.js` | logica | ♻️ Restaurador Universal — 00-base.js As ferramentas que todas as PEÇAS usam. Cada tipo de | — |
| 2 | `js/80-tela.js` | `js/15-tela.js` | logica | ♻️ Restaurador Universal — 80-tela.js · a tela: 📥 importar → 👁 ver ao vivo → ♻️ restaura | — |
| 3 | `js/lib/reconhecer.js` | `js/20-reconhecer.js` | logica | ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Receb | — |
| 4 | `js/lib/segredos.js` | `js/25-segredos.js` | logica | 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA ne | — |
| 5 | `js/pecas/10-meus-apps.js` | `js/30-meus-apps.js` | logica | PEÇA · 📱 Meus apps — Meu Chat, SK Jurídico HTML, o ⬇ backup do 🗄 Banco (Neon), a tabela  | — |
| 6 | `js/pecas/20-replit-projetos.js` | `js/35-replit-projetos.js` | logica | PEÇA · 🟠 Projetos da Replit (playground / snippets) É o que o organizador do Claude 4.6 f | — |
| 7 | `js/pecas/21-ai-code-studio.js` | `js/40-ai-code-studio.js` | logica | PEÇA · 🧠 AI Code Studio (o seu app de chat com várias IAs) Formato: { app: 'ai-code-studi | — |
| 8 | `js/pecas/22-chatgpt.js` | `js/45-chatgpt.js` | logica | PEÇA · 💚 Exportação do ChatGPT (conversations.json — lista com "mapping") | — |
| 9 | `js/pecas/23-mensagens.js` | `js/50-mensagens.js` | logica | PEÇA · 💬 Lista simples de mensagens ({role, content}) — muitos apps de chat exportam assi | — |
| 10 | `js/pecas/30-tabela.js` | `js/55-tabela.js` | logica | PEÇA · 📊 Qualquer tabela (CSV, TSV ou lista JSON) → .csv que abre no Excel, com as coluna | — |
| 11 | `js/pecas/90-procurar.js` | `js/60-procurar.js` | logica | PEÇA · 🔎 Procurar sozinho — para backup de um app que ainda não tem peça. Anda por dentro | — |
| 12 | `css/app.css` | css/app.css | estilo | — | — |
| 13 | `montar-arquivo-unico.py` | `js/65-montar-arquivo-unico.js` | logica | Junta o projeto modular num .html só (é esse que vai dentro do 🧰 Ferramentas dos apps) | app.css, ([^ |
| 14 | `index.html` | `js/70-inicio.js` | tela | Restaurador Universal — ♻️ Restaurador Universal v21/11-A | app.css, jszip.min.js, segredos.js, reconhecer.js |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "Restaurador Universal" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-base.js` (era `js/00-base.js`, 77 linhas)

```text
Crie js/10-base.js. Ele faz: ♻️ Restaurador Universal — 00-base.js As ferramentas que todas as PEÇAS usam. Cada tipo de backup é uma peça em js/pecas/. Para ensinar um tipo NOVO de backup: crie js/pecas/NN-nome.js com R.peca({ ... }) e coloque o <script> no index.html. Uma peça tem:.
No app original ele tinha estas funções/partes: cel.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-tela.js` (era `js/80-tela.js`, 130 linhas)

```text
Crie js/15-tela.js. Ele faz: ♻️ Restaurador Universal — 80-tela.js · a tela: 📥 importar → 👁 ver ao vivo → ♻️ restaurar → ⬇ baixar.
No app original ele tinha estas funções/partes: sacola, entradaDe, desmontar, processar, appPai, contaMC, contaJur, restaurar, mostrar, ver, telaCheia, baixar, zipTudo, aviso, copiar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-reconhecer.js` (era `js/lib/reconhecer.js`, 108 linhas)

```text
Crie js/20-reconhecer.js. Ele faz: ♻️ RECONHECER (18/11) — a mesma peça no Meu Chat, no SK Jurídico HTML e no 🗄 Banco. Recebe QUALQUER coisa que veio dos seus apps e diz sozinho O QUE É e PARA ONDE VAI: - backup do Meu Chat (.json) · backup do SK Jurídico HTML / Assistente Jurídico (.json) - o "⬇ backup" do 🗄 Banco (todas as tabelas) ou o próprio banco lido direto (Neon).
No app original ele tinha estas funções/partes: vazio, quando, txtHtml, colunas, parse, deTabelas, detectar, formatoMarkdown.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-segredos.js` (era `js/lib/segredos.js`, 47 linhas)

```text
Crie js/25-segredos.js. Ele faz: 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA nem na nuvem. Usado pelo Meu Chat e pelo SK Jurídico HTML. - ehSecreta(chave): true se for a chave "service_role", "sb_secret_…", token "sbp_…" etc. (A palavra "service_role" fica ESCONDIDA dentro da chave eyJ…: é preciso abrir a chave para ver.).
No app original ele tinha estas funções/partes: papelJwt, achar, tampar, ehSecreta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-meus-apps.js` (era `js/pecas/10-meus-apps.js`, 30 linhas)

```text
Crie js/30-meus-apps.js. Ele faz: PEÇA · 📱 Meus apps — Meu Chat, SK Jurídico HTML, o ⬇ backup do 🗄 Banco (Neon), a tabela mc_itens e o banco antigo do SK Jurídico 1.7 da Replit (usa o Reconhecer, a mesma peça que os apps usam).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-replit-projetos.js` (era `js/pecas/20-replit-projetos.js`, 36 linhas)

```text
Crie js/35-replit-projetos.js. Ele faz: PEÇA · 🟠 Projetos da Replit (playground / snippets) É o que o organizador do Claude 4.6 fazia: cada LINHA é um projeto com as colunas id, title/titulo/nome, html, css, js, mode. Aceita os 3 jeitos que a Replit/Neon exportam: CSV (vírgula), TSV (tab) ou ponto-e-vírgula — e também JSON (lista). Junta html + css + js num .html só, que abre e funciona.
No app original ele tinha estas funções/partes: col, linhasDe.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-ai-code-studio.js` (era `js/pecas/21-ai-code-studio.js`, 31 linhas)

```text
Crie js/40-ai-code-studio.js. Ele faz: PEÇA · 🧠 AI Code Studio (o seu app de chat com várias IAs) Formato: { app: 'ai-code-studio', conversations: {…}, codeTabs: [{name, language, content}], memories: [{title, content}], settings: {systemPrompt, …} } As chaves de API que estiverem em settings NÃO saem.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-chatgpt.js` (era `js/pecas/22-chatgpt.js`, 18 linhas)

```text
Crie js/45-chatgpt.js. Ele faz: PEÇA · 💚 Exportação do ChatGPT (conversations.json — lista com "mapping").
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-mensagens.js` (era `js/pecas/23-mensagens.js`, 13 linhas)

```text
Crie js/50-mensagens.js. Ele faz: PEÇA · 💬 Lista simples de mensagens ({role, content}) — muitos apps de chat exportam assim.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-tabela.js` (era `js/pecas/30-tabela.js`, 11 linhas)

```text
Crie js/55-tabela.js. Ele faz: PEÇA · 📊 Qualquer tabela (CSV, TSV ou lista JSON) → .csv que abre no Excel, com as colunas arrumadas.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-procurar.js` (era `js/pecas/90-procurar.js`, 29 linhas)

```text
Crie js/60-procurar.js. Ele faz: PEÇA · 🔎 Procurar sozinho — para backup de um app que ainda não tem peça. Anda por dentro do arquivo e tira: código e HTML (com nome), textos com título, arquivos em base64 (Word, imagem…). Nunca leva campos de chave/senha/token. Quando aparecer um tipo novo, o certo é criar uma peça para ele.
No app original ele tinha estas funções/partes: anda.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-montar-arquivo-unico.js` (era `montar-arquivo-unico.py`, 13 linhas)

```text
Crie js/65-montar-arquivo-unico.js. Ele faz: Junta o projeto modular num .html só (é esse que vai dentro do 🧰 Ferramentas dos apps).
No app original ele tinha estas funções/partes: troca.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/70-inicio.js` (era `index.html`, 40 linhas)

```text
Crie js/70-inicio.js. Ele faz: Restaurador Universal — ♻️ Restaurador Universal v21/11-A.
Ele usa o que já foi criado em: js/25-segredos.js, js/20-reconhecer.js, js/10-base.js, js/30-meus-apps.js, js/35-replit-projetos.js, js/40-ai-code-studio.js, js/45-chatgpt.js, js/50-mensagens.js, js/55-tabela.js, js/60-procurar.js, js/15-tela.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 14 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-base.js, js/15-tela.js, js/20-reconhecer.js, js/25-segredos.js, js/30-meus-apps.js, js/35-replit-projetos.js, js/40-ai-code-studio.js, js/45-chatgpt.js, js/50-mensagens.js, js/55-tabela.js, js/60-procurar.js, js/65-montar-arquivo-unico.js, js/70-inicio.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
