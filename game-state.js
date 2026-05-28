/**
 * GERENCIAMENTO DE ESTADO DO JOGO
 */

class GameState {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.score = 900;
        this.guessesLeft = 9;
        this.filled = new Map(); // key: "row,col", value: {municipality, rarity}
        this.history = [];
        this.startTime = Date.now();
        this.isGameOver = false;
        this.isGameWon = false;
    }

    /**
     * Adiciona um palpite ao histórico
     */
    addGuess(row, col, municipality, isCorrect) {
        const guess = {
            row,
            col,
            municipality,
            isCorrect,
            timestamp: Date.now()
        };

        this.history.push(guess);

        if (isCorrect) {
            this.filled.set(`${row},${col}`, {
                municipality: municipality,
                rarity: this.puzzle.rarities[row][col] || 50
            });
            this.updateScore(municipality, row, col);
            this.checkGameWon();
        } else {
            this.guessesLeft--;
            if (this.guessesLeft <= 0) {
                this.isGameOver = true;
            }
        }
    }

    /**
     * Atualiza a pontuação
     */
    updateScore(municipality, row, col) {
        const rarity = this.puzzle.rarities[row][col] || 50;
        const penalty = (rarity / 100) * 900;
        this.score = Math.max(0, this.score - penalty);
    }

    /**
     * Verifica se o jogo foi vencido
     */
    checkGameWon() {
        const totalCells = this.puzzle.answers.length * this.puzzle.answers[0].length;
        if (this.filled.size === totalCells) {
            this.isGameWon = true;
        }
    }

    /**
     * Verifica se uma célula já foi preenchida
     */
    isCellFilled(row, col) {
        return this.filled.has(`${row},${col}`);
    }

    /**
     * Obtém o município preenchido em uma célula
     */
    getFilledMunicipality(row, col) {
        const filled = this.filled.get(`${row},${col}`);
        return filled ? filled.municipality : null;
    }

    /**
     * Retorna o estado do jogo como JSON
     */
    toJSON() {
        return {
            score: this.score,
            guessesLeft: this.guessesLeft,
            filled: Array.from(this.filled.entries()),
            history: this.history,
            isGameOver: this.isGameOver,
            isGameWon: this.isGameWon,
            startTime: this.startTime
        };
    }

    /**
     * Carrega o estado do jogo a partir de JSON
     */
    fromJSON(data) {
        this.score = data.score || 900;
        this.guessesLeft = data.guessesLeft || 9;
        this.filled = new Map(data.filled || []);
        this.history = data.history || [];
        this.isGameOver = data.isGameOver || false;
        this.isGameWon = data.isGameWon || false;
        this.startTime = data.startTime || Date.now();
    }

    /**
     * Reseta o estado do jogo
     */
    reset() {
        this.score = 900;
        this.guessesLeft = 9;
        this.filled.clear();
        this.history = [];
        this.startTime = Date.now();
        this.isGameOver = false;
        this.isGameWon = false;
    }

    /**
     * Retorna o tempo decorrido em segundos
     */
    getElapsedTime() {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    /**
     * Retorna o número de acertos
     */
    getCorrectGuesses() {
        return this.filled.size;
    }

    /**
     * Retorna o número de tentativas usadas
     */
    getUsedGuesses() {
        return 9 - this.guessesLeft;
    }

    /**
     * Retorna o percentual de células preenchidas
     */
    getCompletionPercentage() {
        const totalCells = this.puzzle.answers.length * this.puzzle.answers[0].length;
        return Math.round((this.filled.size / totalCells) * 100);
    }
}
