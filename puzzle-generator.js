/**
 * GERADOR DE PUZZLES
 */

class PuzzleGenerator {
    constructor(municipalities) {
        this.municipalities = municipalities;
    }

    /**
     * Gera um puzzle do dia baseado na data
     */
    generateDailyPuzzle(date = new Date()) {
        // Usar a data como seed para gerar o mesmo puzzle todos os dias
        const seed = this.dateToSeed(date);
        
        // Gerar características para o puzzle
        const characteristics = this.generateCharacteristics(seed);
        
        // Gerar respostas baseadas nas características
        const puzzle = this.generatePuzzleFromCharacteristics(characteristics);
        
        return {
            id: seed,
            date: date.toISOString().split('T')[0],
            cluesHorizontal: puzzle.cluesHorizontal,
            cluesVertical: puzzle.cluesVertical,
            answers: puzzle.answers,
            rarities: puzzle.rarities,
            characteristics: characteristics
        };
    }

    /**
     * Converte uma data em um seed numérico
     */
    dateToSeed(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return parseInt(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
    }

    /**
     * Gera características para o puzzle usando seed
     */
    generateCharacteristics(seed) {
        // Usar seed para gerar números pseudo-aleatórios
        const rng = this.seededRandom(seed);
        
        // Características disponíveis (excluindo COREDE por enquanto)
        const baseCharacteristics = [
            'Fronteira com Argentina',
            'Fronteira com Uruguai',
            'Fronteira com Santa Catarina',
            'Litorâneo',
            'Contém Santo(a)',
            'Inicia com A',
            'Inicia com B',
            'Inicia com C',
            'Inicia com Novo(a)'
        ];

        // Adicionar COREDEs
        const coredes = this.getUniqueCOREDEs();
        const coredeCharacteristics = coredes.map(c => `COREDE ${c}`);
        
        const allCharacteristics = [...baseCharacteristics, ...coredeCharacteristics];

        // Selecionar 3 características horizontais e 3 verticais
        const shuffled = this.shuffleWithSeed(allCharacteristics, rng);
        
        const cluesHorizontal = shuffled.slice(0, 3);
        const cluesVertical = shuffled.slice(3, 6);

        // Garantir que não há mais de uma categoria extra
        const extraCategories = ['Contém Santo(a)', 'Inicia com A', 'Inicia com B', 'Inicia com C', 'Inicia com Novo(a)'];
        const extraInHorizontal = cluesHorizontal.filter(c => extraCategories.includes(c)).length;
        const extraInVertical = cluesVertical.filter(c => extraCategories.includes(c)).length;

        if (extraInHorizontal + extraInVertical > 1) {
            // Regenerar se houver mais de uma categoria extra
            return this.generateCharacteristics(seed + 1);
        }

        return {
            cluesHorizontal,
            cluesVertical
        };
    }

    /**
     * Gera um puzzle a partir de características
     */
    generatePuzzleFromCharacteristics(characteristics) {
        const cluesHorizontal = characteristics.cluesHorizontal;
        const cluesVertical = characteristics.cluesVertical;

        const answers = [];
        const rarities = [];

        // Para cada célula (3x3), encontrar um município que satisfaz ambas as clues
        for (let row = 0; row < 3; row++) {
            answers[row] = [];
            rarities[row] = [];

            for (let col = 0; col < 3; col++) {
                const horizontalClue = cluesHorizontal[col];
                const verticalClue = cluesVertical[row];

                const validMunicipalities = this.findMunicipalitiesByClues(
                    horizontalClue,
                    verticalClue
                );

                if (validMunicipalities.length === 0) {
                    console.warn(`Nenhum município encontrado para ${horizontalClue} + ${verticalClue}`);
                    answers[row][col] = 'N/A';
                    rarities[row][col] = 0;
                } else {
                    // Selecionar um município aleatório da lista
                    const selected = validMunicipalities[
                        Math.floor(Math.random() * validMunicipalities.length)
                    ];
                    answers[row][col] = selected.name;
                    rarities[row][col] = this.calculateRarity(selected, validMunicipalities);
                }
            }
        }

        return {
            cluesHorizontal,
            cluesVertical,
            answers,
            rarities
        };
    }

    /**
     * Encontra municípios que satisfazem ambas as clues
     */
    findMunicipalitiesByClues(clueH, clueV) {
        return this.municipalities.filter(m => {
            const hasH = this.validateClue(m, clueH);
            const hasV = this.validateClue(m, clueV);
            return hasH && hasV;
        });
    }

    /**
     * Valida se um município satisfaz uma clue
     */
    validateClue(municipality, clue) {
        if (!municipality.characteristics) {
            return false;
        }

        return municipality.characteristics.includes(clue);
    }

    /**
     * Calcula a raridade de um município (percentual de municípios que satisfazem a mesma combinação)
     */
    calculateRarity(municipality, validMunicipalities) {
        const totalMunicipalities = this.municipalities.length;
        const percentage = (validMunicipalities.length / totalMunicipalities) * 100;
        return Math.round(percentage * 10) / 10; // Arredondar para 1 casa decimal
    }

    /**
     * Obtém COREDEs únicos
     */
    getUniqueCOREDEs() {
        const coredes = new Set();
        this.municipalities.forEach(m => {
            if (m.corede) {
                coredes.add(m.corede);
            }
        });
        return Array.from(coredes);
    }

    /**
     * Embaralha um array usando seed
     */
    shuffleWithSeed(array, rng) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Gerador de números pseudo-aleatórios com seed
     */
    seededRandom(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }
}
