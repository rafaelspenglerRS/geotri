/**
 * VALIDADOR DE RESPOSTAS - GEO TRI
 */

class AnswerValidator {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.buildAliasMap();
    }

    /**
     * Constrói um mapa de aliases para municípios
     */
    buildAliasMap() {
        this.aliases = {
            // Adicionar aliases comuns aqui se necessário
            // Exemplo: 'porto alegre': ['p.a.', 'poa']
        };
    }

    /**
     * Valida se um nome de município está correto para uma célula
     * NOVO: Aceita QUALQUER município que esteja na lista de válidos
     */
    validateAnswer(row, col, userInput) {
        if (isEmpty(userInput)) {
            return {
                isValid: false,
                message: 'Digite o nome de um município'
            };
        }

        // Obter lista de municípios válidos para esta célula
        const validMunicipalities = this.puzzle.validMunicipalities[row][col];
        
        if (!validMunicipalities || validMunicipalities.length === 0) {
            return {
                isValid: false,
                message: 'Nenhum município válido para esta combinação'
            };
        }

        // Normalizar entrada do usuário
        const normalized = normalizeMunicipalityName(userInput);

        // Verificar se está na lista de válidos
        for (let validMun of validMunicipalities) {
            const validNormalized = normalizeMunicipalityName(validMun);
            
            if (normalized === validNormalized) {
                return {
                    isValid: true,
                    municipality: validMun,
                    message: `✓ Correto! ${validMun}`
                };
            }

            // Verificar aliases
            const aliases = this.aliases[validNormalized] || [];
            if (aliases.includes(normalized)) {
                return {
                    isValid: true,
                    municipality: validMun,
                    message: `✓ Correto! ${validMun}`
                };
            }
        }

        // Se não encontrou, retornar mensagem de erro
        return {
            isValid: false,
            message: `✗ Esse município não satisfaz as pistas desta célula`
        };
    }

    /**
     * Encontra sugestões de municípios baseado na entrada do usuário
     */
    getSuggestions(row, col, userInput) {
        if (isEmpty(userInput)) {
            return [];
        }

        const validMunicipalities = this.puzzle.validMunicipalities[row][col];
        if (!validMunicipalities || validMunicipalities.length === 0) {
            return [];
        }

        const normalized = normalizeMunicipalityName(userInput);
        const suggestions = [];

        // Encontrar municípios que começam com o texto digitado
        for (let mun of validMunicipalities) {
            const munNormalized = normalizeMunicipalityName(mun);
            if (munNormalized.startsWith(normalized)) {
                suggestions.push(mun);
            }
        }

        // Se não encontrou por começo, procurar por substring
        if (suggestions.length === 0) {
            for (let mun of validMunicipalities) {
                const munNormalized = normalizeMunicipalityName(mun);
                if (munNormalized.includes(normalized)) {
                    suggestions.push(mun);
                }
            }
        }

        return suggestions.slice(0, 5); // Retornar máximo 5 sugestões
    }

    /**
     * Retorna todos os municípios válidos para uma célula
     */
    getValidMunicipalities(row, col) {
        return this.puzzle.validMunicipalities[row][col] || [];
    }

    /**
     * Verifica se um município é válido para uma célula específica
     */
    isValidForCell(row, col, municipalityName) {
        const validMunicipalities = this.puzzle.validMunicipalities[row][col];
        if (!validMunicipalities) {
            return false;
        }

        const normalized = normalizeMunicipalityName(municipalityName);
        
        for (let validMun of validMunicipalities) {
            if (normalizeMunicipalityName(validMun) === normalized) {
                return true;
            }
        }

        return false;
    }
}
