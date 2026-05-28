# Análise Detalhada do GeoGrid Game

## 1. Visão Geral do Jogo

O **GeoGrid** é um jogo de puzzle diário baseado em geografia, similar ao conceito de um "Wordle" para geografia. O objetivo é encontrar países/territórios que satisfazem múltiplas condições geográficas simultaneamente.

## 2. Estrutura do Tabuleiro

### Layout Visual
- **Grade 5x5**: O tabuleiro é organizado em uma matriz de 5 linhas por 5 colunas
- **Células de Clues (Pistas)**: 
  - Linha superior: 4 pistas horizontais (condições geográficas)
  - Coluna esquerda: 4 pistas verticais (condições geográficas)
  - Centro: 1 célula central vazia (célula de início "START HERE")
- **Célula Central**: Marcada com "START HERE +" - ponto de partida do jogo

### Estrutura de Dados da Grade
```
[Clue H1] [Clue H2] [Clue H3] [Clue H4]
[Clue V1] [START]   [Cell]    [Cell]    [Cell]
[Clue V2] [Cell]    [Cell]    [Cell]    [Cell]
[Clue V3] [Cell]    [Cell]    [Cell]    [Cell]
[Clue V4] [Cell]    [Cell]    [Cell]    [Cell]
```

## 3. Mecânicas do Jogo

### Tipos de Clues (Pistas)
As pistas são condições geográficas que os países devem satisfazer. Exemplos observados:
- "Has a metro system" (Tem sistema de metrô)
- "Has coastline, with length less than 50,000 km" (Tem costa com comprimento < 50.000 km)
- "Area less than 500,000 km²" (Área < 500.000 km²)
- "Land border length greater than 500 km" (Comprimento da fronteira terrestre > 500 km)
- "In Asia" (Na Ásia)
- "More than 100 Olympic medals" (Mais de 100 medalhas olímpicas)

### Lógica de Validação
- Cada célula deve satisfazer DUAS condições: uma horizontal (linha) e uma vertical (coluna)
- Quando o jogador clica em uma célula, um modal de busca aparece
- O modal mostra: "Find a country/territory that fits both: [Clue Horizontal] [Clue Vertical]"
- O jogador digita o nome do país e pressiona Enter para confirmar

### Sistema de Pontuação
- **Score Base**: 900 pontos
- **Penalidade por Raridade**: Quando um país é adivinhado, o score diminui baseado na "raridade" da resposta
  - Exemplo: Japan foi marcado como "Uncommon - 21.1%", resultando em redução de 78.9 pontos (900 - 78.9 = 821.1)
- **Guesses Restantes**: O jogo começa com 10 tentativas
- **Modo Unlimited**: "Unlimited guesses" - parece haver um modo sem limite de tentativas

### Estados das Células
- **Vazia**: Célula ainda não preenchida
- **Preenchida com Sucesso**: Mostra a bandeira do país e o nome
- **Incorreta**: Provavelmente marca como erro (não observado neste jogo)

## 4. Fluxo de Interação

1. Usuário clica em uma célula vazia
2. Modal de busca aparece com as duas condições (horizontal + vertical)
3. Usuário digita o nome do país
4. Autocomplete/sugestões aparecem (não foi observado neste teste)
5. Usuário pressiona Enter ou clica "Guess"
6. Sistema valida se o país satisfaz AMBAS as condições
7. Se correto: célula é preenchida com bandeira + nome do país
8. Score é atualizado com penalidade de raridade
9. Guesses restantes diminui em 1

## 5. Elementos da Interface

### Barra Superior
- Logo "GeoGrid" (link para home)
- Botão "Create" (para criar novos puzzles)
- Botão "Menu"

### Seletores de Modo
- "🌍 World" (modo mundial)
- "🇺🇸 USA" (modo apenas com estados dos EUA)

### Painel Lateral Direito
- **Board Number**: 782 (ID do puzzle do dia)
- **Score**: Pontuação atual
- **Guesses**: Tentativas restantes (ex: 9/10 left)
- **Unlimited guesses**: Indicador se há limite ou não
- **Share board**: Botão para compartilhar o puzzle
- **Finish & reveal**: Botão para revelar a solução

### Rodapé
- Link para "Travle" (outro jogo similar da mesma empresa)

## 6. Dados Necessários para Implementação

Para replicar este jogo, seria necessário:

### 1. Banco de Dados de Países
- Nome do país/território
- Bandeira (emoji ou SVG)
- Propriedades geográficas:
  - Continente/região
  - Área em km²
  - Comprimento da costa em km
  - Comprimento de fronteira terrestre em km
  - Tem sistema de metrô? (booleano)
  - Medalhas olímpicas (número)
  - Outras propriedades customizáveis

### 2. Banco de Dados de Clues
- Descrição da clue
- Função de validação (predicate)
- Raridade (percentual de países que satisfazem)

### 3. Banco de Dados de Puzzles
- ID do puzzle
- Data de publicação
- Modo (World/USA)
- 4 clues horizontais
- 4 clues verticais
- Respostas corretas para cada célula (para validação)

### 4. Dados de Usuário (se houver persistência)
- Score do dia
- Guesses usados
- Células preenchidas
- Histórico de tentativas

## 7. Estrutura de Dados JSON Exemplo

```json
{
  "puzzle": {
    "id": 782,
    "date": "2026-05-28",
    "mode": "world",
    "clues": {
      "horizontal": [
        "Has a metro system",
        "Has coastline, with length less than 50,000 km",
        "Area less than 500,000 km²",
        "Land border length greater than 500 km"
      ],
      "vertical": [
        "In Asia",
        "More than 100 Olympic medals",
        "Population greater than 50 million",
        "GDP greater than 1 trillion USD"
      ]
    },
    "answers": [
      ["Japan", "South Korea", "China", "India"],
      ["Thailand", "Vietnam", "Philippines", "Indonesia"],
      ["Singapore", "Malaysia", "Myanmar", "Cambodia"],
      ["Bangladesh", "Pakistan", "Afghanistan", "Nepal"]
    ]
  },
  "gameState": {
    "score": 821.1,
    "guessesLeft": 9,
    "filled": [
      {
        "row": 1,
        "col": 0,
        "country": "Japan",
        "rarity": 21.1
      }
    ]
  }
}
```

## 8. Funcionalidades Observadas

✅ Tabuleiro 5x5 com pistas nas bordas
✅ Sistema de clues geográficas
✅ Busca de países com autocomplete
✅ Validação de resposta (país satisfaz ambas as condições)
✅ Sistema de pontuação com penalidade de raridade
✅ Contador de tentativas
✅ Compartilhamento de resultado
✅ Múltiplos modos (World, USA)
✅ Puzzle diário
✅ Histórico de pontuação (Board #782)

## 9. Tecnologia Observada

- **Framework Frontend**: Vue.js (baseado no HTML)
- **Bundling**: Webpack (arquivos chunk-vendors e app)
- **Estilos**: CSS customizado
- **Analytics**: Google Tag Manager, Google Analytics
- **Publicidade**: Google AdSense
- **Hospedagem**: Teuteuf (teuteuf.fr)

