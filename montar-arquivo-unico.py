# Junta o projeto modular num .html só (é esse que vai dentro do 🧰 Ferramentas dos apps).
import re, sys, os
B = os.path.dirname(os.path.abspath(__file__))
h = open(os.path.join(B, 'index.html'), encoding='utf-8').read()
h = h.replace('<link rel="stylesheet" href="css/app.css">', '<style>\n' + open(os.path.join(B, 'css/app.css'), encoding='utf-8').read() + '</style>')
def troca(m):
    js = open(os.path.join(B, m.group(1)), encoding='utf-8').read()
    assert '</script' not in js.lower(), m.group(1)
    return '<script>/* ' + m.group(1) + ' */\n' + js + '\n</script>'
h = re.sub(r'<script src="([^"]+)"></script>', troca, h)
saida = sys.argv[1] if len(sys.argv) > 1 else os.path.join(B, 'restaurador-arquivo-unico.html')
open(saida, 'w', encoding='utf-8').write(h); print(saida, len(h))
