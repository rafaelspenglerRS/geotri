/**
 * RENDERIZADOR DO JOGO
 */

class GameRenderer {
    constructor(puzzle, gameState) {
        this.puzzle = puzzle;
        this.gameState = gameState;
    }

    /**
     * Renderiza o tabuleiro completo
     */
    renderBoard() {
        this.renderClues();
        this.renderGrid();
        this.updateScoreDisplay();
        this.updateGuessesDisplay();
        this.updateBoardInfo();
    }

    /**
     * Renderiza as pistas
     */
    renderClues() {
        // Pistas Horizontais
        this.puzzle.cluesHorizontal.forEach((clue, index) => {
            const el = $(`#clue-h-${index}`);
            if (el) {
                el.textContent = clue;
            }
        });

        // Pistas Verticais
        this.puzzle.cluesVertical.forEach((clue, index) => {
            const el = $(`#clue-v-${index}`);
            if (el) {
                el.textContent = clue;
            }
        });
    }

    /**
     * Renderiza o grid 3x3
     */
    renderGrid() {
        const gridEl = $('#grid');
        gridEl.innerHTML = ''; // Limpar grid anterior

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = this.createCell(row, col);
                gridEl.appendChild(cell);
            }
        }
    }

    /**
     * Cria uma célula do grid
     */
    createCell(row, col) {
        const cell = createElement('div', ['cell'], {
            id: `cell-${row}-${col}`
        });

        const isFilled = this.gameState.isCellFilled(row, col);

        if (isFilled) {
            const municipality = this.gameState.getFilledMunicipality(row, col);
            this.fillCell(cell, municipality);
        } else {
            const emptyIcon = createElement('div', ['cell-empty'], {
                text: '+'
            });
            cell.appendChild(emptyIcon);
            
            // Adicionar listener de clique
            cell.addEventListener('click', () => {
                this.onCellClick(row, col);
            });
        }

        return cell;
    }

    /**
     * Preenche uma célula com um município
     */
    fillCell(cell, municipality) {
        cell.classList.add('filled');
        cell.innerHTML = '';

        // Flag
        const flag = createElement('div', ['cell-flag'], {
            text: getMunicipalityEmoji(municipality)
        });
        cell.appendChild(flag);

        // Nome do município
        const name = createElement('div', ['cell-name'], {
            text: municipality
        });
        cell.appendChild(name);

        // Remover listener de clique
        cell.removeEventListener('click', this.onCellClick);
    }

    /**
     * Atualiza a exibição de pontuação
     */
    updateScoreDisplay() {
        const scoreEl = $('#score');
        if (scoreEl) {
            scoreEl.textContent = Math.round(this.gameState.score);
        }
    }

    /**
     * Atualiza a exibição de tentativas
     */
    updateGuessesDisplay() {
        const guessesEl = $('#guesses');
        if (guessesEl) {
            const used = this.gameState.getUsedGuesses();
            guessesEl.textContent = `${this.gameState.guessesLeft}/${used + this.gameState.guessesLeft}`;
        }
    }

    /**
     * Atualiza informações do tabuleiro
     */
    updateBoardInfo() {
        const boardNumberEl = $('#board-number');
        const boardDateEl = $('#board-date');

        if (boardNumberEl) {
            boardNumberEl.textContent = `Puzzle #${this.puzzle.id}`;
        }

        if (boardDateEl) {
            const date = new Date(this.puzzle.date);
            boardDateEl.textContent = formatDate(date);
        }
    }

    /**
     * Atualiza uma célula específica após um acerto
     */
    updateCell(row, col, municipality) {
        const cell = $(`#cell-${row}-${col}`);
        if (cell) {
            cell.classList.add('correct-animation');
            
            setTimeout(() => {
                this.fillCell(cell, municipality);
                this.updateScoreDisplay();
                this.updateGuessesDisplay();
            }, 300);
        }
    }

    /**
     * Callback para clique em célula
     */
    onCellClick(row, col) {
        // Será implementado no main.js
    }
}
