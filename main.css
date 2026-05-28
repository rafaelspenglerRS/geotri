# 🗺️ Geo TRI - Puzzle Diário de Cidades Gaúchas

Um jogo de puzzle interativo que desafia você a identificar municípios do Rio Grande do Sul com base em pistas geográficas e características específicas.

## 🎮 Como Jogar

1. **Observe as pistas**: 3 pistas horizontais (topo) e 3 verticais (esquerda)
2. **Clique em uma célula vazia**: Um modal abrirá mostrando as duas pistas que você precisa satisfazer
3. **Digite o nome do município**: Que satisfaça AMBAS as pistas simultaneamente
4. **Acerte para ganhar pontos**: Municípios mais raros valem mais pontos
5. **Você tem 9 tentativas**: Use-as com sabedoria!

## 🏆 Sistema de Pontuação

- **Começa com**: 900 pontos
- **Penalidade**: Baseada na raridade da resposta
- **Municípios comuns**: Penalizam mais (menos pontos)
- **Municípios raros**: Penalizam menos (mais pontos)

## 📱 Características

- ✅ Responsivo (funciona em desktop, tablet e mobile)
- ✅ Sem dependências externas (JavaScript puro)
- ✅ Persistência local (continua de onde parou)
- ✅ Puzzle diário (mesmo puzzle para todos no mesmo dia)
- ✅ 497 municípios gaúchos
- ✅ Múltiplas categorias de características

## 🚀 Como Usar

### Localmente
```bash
# Navegar até a pasta
cd /home/ubuntu/geotri

# Iniciar servidor (Python 3)
python3 -m http.server 8080

# Abrir no navegador
# http://localhost:8080
```

### Deploy
Copie a pasta `geotri` para qualquer servidor web estático (GitHub Pages, Netlify, etc.)

## 📂 Estrutura do Projeto

```
geotri/
├── index.html              # Página principal
├── css/                    # Estilos
│   ├── main.css
│   ├── grid.css
│   ├── modal.css
│   └── animations.css
├── js/                     # Lógica
│   ├── utils.js
│   ├── game-state.js
│   ├── puzzle-generator.js
│   ├── renderer.js
│   ├── validator.js
│   ├── persistence.js
│   └── main.js
└── data/
    └── municipalities.json # Base de dados
```

## 🔧 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Animações
- **JavaScript ES6+**: Vanilla (sem frameworks)
- **localStorage**: Persistência local

## 📊 Dados

- **497 municípios** do Rio Grande do Sul
- **11 características** principais
- **28 regiões** (COREDEs)
- **Categorias extras**: Santo(a), Primeira letra, Novo(a)

## 🎯 Características Disponíveis

### Geográficas
- Fronteira com Argentina
- Fronteira com Uruguai
- Fronteira com Santa Catarina
- Litorâneo

### Regionais
- COREDE (28 regiões)

### Extras
- Contém Santo(a)
- Inicia com A/B/C
- Inicia com Novo(a)

## ⚙️ Configuração

### Alterar Número de Tentativas
Editar em `js/game-state.js`:
```javascript
this.guessesLeft = 9; // Alterar aqui
```

### Alterar Pontuação Inicial
Editar em `js/game-state.js`:
```javascript
this.score = 900; // Alterar aqui
```

### Adicionar Novos Municípios
Atualizar `data/municipalities.json` com nova estrutura

## 🐛 Troubleshooting

**Jogo não carrega?**
- Verificar console (F12) para erros
- Garantir que `data/municipalities.json` existe
- Limpar cache do navegador

**Dados não aparecem?**
- Verificar se o servidor está servindo arquivos estáticos
- Confirmar que CORS está habilitado (se necessário)

**Progresso não salva?**
- Verificar se localStorage está habilitado
- Testar em modo privado/incógnito

## 📝 Licença

MIT - Sinta-se livre para usar e modificar!

## 👨‍💻 Desenvolvido por

Manus AI - 28 de maio de 2026

---

**Divirta-se descobrindo os municípios gaúchos!** 🎉
