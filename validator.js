/**
 * GERADOR DE PUZZLES - GEO TRI
 */

class PuzzleGenerator {
    constructor(municipalities) {
        this.municipalities = municipalities;
        this.buildCharacteristicsIndex();
        this.precomputeValidCombinations();
    }

    /**
     * Constrói um índice de características para busca rápida
     */
    buildCharacteristicsIndex() {
        this.characteristicsIndex = {};
        
        this.municipalities.forEach(mun => {
            mun.characteristics.forEach(char => {
                if (!this.characteristicsIndex[char]) {
                    this.characteristicsIndex[char] = [];
                }
                this.characteristicsIndex[char].push(mun.name);
            });
        });
    }

    /**
     * Pré-calcula todas as combinações válidas de pistas
     * Isso garante que temos combinações que funcionam
     */
    precomputeValidCombinations() {
        this.validCombinations = []; // Array de {h: clue, v: clue, valid: [municípios]}
        const allCharacteristics = Object.keys(this.characteristicsIndex);
        
        for (let i = 0; i < allCharacteristics.length; i++) {
            for (let j = 0; j < allCharacteristics.length; j++) {
                if (i !== j) {
                    const h = allCharacteristics[i];
                    const v = allCharacteristics[j];
                    const valid = this.findValidMunicipalities(h, v);
                    
                    if (valid.length > 0) {
                        this.validCombinations.push({
                            h: h,
                            v: v,
                            valid: valid
                        });
                    }
                }
            }
        }
        
        debugLog(`Pré-computadas ${this.validCombinations.length} combinações válidas`);
    }

    /**
     * Gera um puzzle diário determinístico
     */
    generateDailyPuzzle() {
        const today = new Date();
        const seed = this.getSeedFromDate(today);
        
        // Tentar gerar puzzle válido (máximo 50 tentativas)
        for (let attempt = 0; attempt < 50; attempt++) {
            const puzzle = this.generatePuzzle(seed + attempt);
            if (puzzle && this.isValidPuzzle(puzzle)) {
                debugLog('Puzzle gerado com sucesso', { seed: seed + attempt, attempt });
                return puzzle;
            }
        }

        // Se não conseguir, retornar puzzle vazio
        debugError('Não foi possível gerar um puzzle válido após 50 tentativas');
        return this.createEmptyPuzzle(seed);
    }

    /**
     * Gera um puzzle a partir de um seed
     * ESTRATÉGIA: Seleciona 9 combinações válidas aleatoriamente
     */
    generatePuzzle(seed) {
        if (this.validCombinations.length < 9) {
            return null; // Não há combinações suficientes
        }

        const rng = this.createSeededRNG(seed);

        // Selecionar 9 combinações válidas aleatoriamente
        const selected = [];
        const used = new Set();
        const maxAttempts = 1000;
        let attempts = 0;

        while (selected.length < 9 && attempts < maxAttempts) {
            const randomIndex = Math.floor(rng() * this.validCombinations.length);
            const combination = this.validCombinations[randomIndex];
            const key = `${combination.h}|${combination.v}`;

            if (!used.has(key)) {
                selected.push(combination);
                used.add(key);
            }

            attempts++;
        }

        if (selected.length < 9) {
            return null; // Não conseguiu selecionar 9 combinações únicas
        }

        // Reorganizar em grid 3x3
        const cluesHorizontal = [];
        const cluesVertical = [];
        const answers = [];
        const validMunicipalities = [];
        const rarities = [];

        for (let row = 0; row < 3; row++) {
            answers[row] = [];
            validMunicipalities[row] = [];
            rarities[row] = [];

            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const combination = selected[index];

                // Armazenar pistas
                if (col === 0) {
                    cluesVertical[row] = combination.v;
                }
                if (row === 0) {
                    cluesHorizontal[col] = combination.h;
                }

                // Armazenar respostas
                validMunicipalities[row][col] = combination.valid;

                // Selecionar um como "resposta principal"
                const selectedIndex = Math.floor(rng() * combination.valid.length);
                answers[row][col] = combination.valid[selectedIndex];

                // Calcular raridade
                const percentage = (combination.valid.length / this.municipalities.length) * 100;
                rarities[row][col] = Math.round(percentage * 10) / 10;
            }
        }

        // Verificar restrição de categorias extras
        const extraCategories = ['Contém Santo(a)', 'Inicia com A', 'Inicia com B', 'Inicia com C', 'Inicia com Novo(a)'];
        const extraCount = [...cluesHorizontal, ...cluesVertical].filter(c => extraCategories.includes(c)).length;
        
        if (extraCount > 1) {
            return null; // Rejeitar: mais de uma categoria extra
        }

        return {
            id: this.generatePuzzleId(),
            date: new Date().toISOString().split('T')[0],
            cluesHorizontal,
            cluesVertical,
            answers,
            validMunicipalities,
            rarities,
            seed
        };
    }

    /**
     * Encontra municípios que satisfazem AMBAS as pistas
     */
    findValidMunicipalities(horizontalClue, verticalClue) {
        const horizontalMunis = new Set(this.characteristicsIndex[horizontalClue] || []);
        const verticalMunis = new Set(this.characteristicsIndex[verticalClue] || []);

        // Interseção: municípios que têm AMBAS as características
        const valid = [];
        horizontalMunis.forEach(mun => {
            if (verticalMunis.has(mun)) {
                valid.push(mun);
            }
        });

        return valid;
    }

    /**
     * Valida se um puzzle é válido
     */
    isValidPuzzle(puzzle) {
        if (!puzzle) return false;
        if (!puzzle.validMunicipalities) return false;
        if (!puzzle.cluesHorizontal || puzzle.cluesHorizontal.length !== 3) return false;
        if (!puzzle.cluesVertical || puzzle.cluesVertical.length !== 3) return false;

        // Verificar se todas as células têm pelo menos 1 município válido
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!puzzle.validMunicipalities[row][col] || puzzle.validMunicipalities[row][col].length === 0) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Cria um puzzle vazio (fallback)
     */
    createEmptyPuzzle(seed) {
        return {
            id: this.generatePuzzleId(),
            date: new Date().toISOString().split('T')[0],
            cluesHorizontal: ['Carregando...', 'Carregando...', 'Carregando...'],
            cluesVertical: ['Carregando...', 'Carregando...', 'Carregando...'],
            answers: [
                ['N/A', 'N/A', 'N/A'],
                ['N/A', 'N/A', 'N/A'],
                ['N/A', 'N/A', 'N/A']
            ],
            validMunicipalities: [
                [[], [], []],
                [[], [], []],
                [[], [], []]
            ],
            rarities: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            seed
        };
    }

    /**
     * Gera ID do puzzle baseado na data
     */
    generatePuzzleId() {
        const today = new Date();
        return today.getFullYear().toString() + 
               String(today.getMonth() + 1).padStart(2, '0') + 
               String(today.getDate()).padStart(2, '0');
    }

    /**
     * Obtém seed da data
     */
    getSeedFromDate(date) {
        return date.getFullYear() * 10000 + 
               (date.getMonth() + 1) * 100 + 
               date.getDate();
    }

    /**
     * Cria um gerador de números aleatórios com seed
     */
    createSeededRNG(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }
}
