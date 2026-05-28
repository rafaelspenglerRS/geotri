/**
 * VALIDADOR DE RESPOSTAS
 */

class AnswerValidator {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.aliases = this.buildAliases();
    }

    /**
     * Constrói dicionário de aliases para municípios
     */
    buildAliases() {
        const aliases = {};
        
        // Adicionar aliases comuns
        const commonAliases = {
            'Porto Alegre': ['POA', 'POA'],
            'Santa Maria': ['SM'],
            'Santa Cruz do Sul': ['SCS'],
            'Rio Grande': ['RG'],
            'Pelotas': ['PEL'],
            'Caxias do Sul': ['CXS', 'Caxias'],
            'Novo Hamburgo': ['NH'],
            'São Leopoldo': ['SL'],
            'Gravataí': ['Gravatai'],
            'Canoas': ['CAN'],
            'Viamão': ['Viamao'],
            'Sapucaia do Sul': ['Sapucaia'],
            'Alvorada': ['ALV'],
            'Guaíba': ['Guaiba'],
            'Cachoeirinha': ['Cachoerinha'],
            'Esteio': ['EST'],
            'São Jerônimo': ['São Jeronimo'],
            'Taquara': ['TAQ'],
            'Igrejinha': ['IGR'],
            'Parobé': ['Parobe'],
            'Montenegro': ['MON'],
            'Sapucaia': ['Sapucaia do Sul'],
            'Triunfo': ['TRI'],
            'Estância Velha': ['EV'],
            'Campo Bom': ['CB'],
            'Dois Irmãos': ['DI'],
            'Ivoti': ['IVO'],
            'Araricá': ['Ararica'],
            'Rolante': ['ROL'],
            'Riozinho': ['RIO'],
            'Morro Reuter': ['MR'],
            'Presidente Lucena': ['PL'],
            'Portão': ['POR'],
            'Glorinha': ['GLO'],
            'Teutônia': ['Teutonia'],
            'Sertão': ['Sertao'],
            'Soledade': ['SOL'],
            'Arvorezinha': ['ARV'],
            'Imigrante': ['IMI'],
            'Anta Gorda': ['AG'],
            'Muçum': ['Mucum'],
            'Poço das Antas': ['Poco das Antas'],
            'Barão': ['BAR'],
            'Gramado': ['GRA'],
            'Canela': ['CAN'],
            'São Francisco de Paula': ['SFP'],
            'Cambará do Sul': ['Cambara do Sul'],
            'Jaquirana': ['JAQ'],
            'Bom Jesus': ['BJ'],
            'Vacaria': ['VAC'],
            'Lagoa Vermelha': ['LV'],
            'Passo Fundo': ['PF'],
            'Marau': ['MAR'],
            'Mato Castelhano': ['MC'],
            'Pontão': ['Pontao'],
            'Sananduva': ['SAN'],
            'Ibiraiaras': ['IBR'],
            'Getúlio Vargas': ['GV'],
            'Seara': ['SEA'],
            'Erechim': ['ERE'],
            'Gaurama': ['GAU'],
            'Estação': ['EST'],
            'Machadinho': ['MAC'],
            'Severiano de Almeida': ['SA'],
            'Viadutos': ['VIA'],
            'Barracão': ['BAR'],
            'Alpestre': ['ALP'],
            'Erval Seco': ['ES'],
            'Três Passos': ['TP'],
            'Crissiumal': ['CRI'],
            'Tenório': ['TEN'],
            'Humaitá': ['Humaita'],
            'Roque Gonzales': ['RG'],
            'Santo Ângelo': ['Santo Angelo'],
            'Giruá': ['Girua'],
            'Santo Rosa': ['SR'],
            'Tucunduva': ['TUC'],
            'Tiradentes do Sul': ['TS'],
            'Doutor Maurício Cardoso': ['DMC'],
            'Catuípe': ['CAT'],
            'Joia': ['JOI'],
            'Augusto Pestana': ['AP'],
            'Panambi': ['PAN'],
            'Passo Fundo': ['PF'],
            'Sarandi': ['SAR'],
            'Ajuricaba': ['AJU'],
            'Mamoré': ['MAM'],
            'Não-Me-Toque': ['NMT', 'Nao-Me-Toque'],
            'Tapejara': ['TAP'],
            'Espumoso': ['ESP'],
            'Arroio do Meio': ['ADM'],
            'Lajeado': ['LAJ'],
            'Taquari': ['TAQ'],
            'Encantado': ['ENC'],
            'Roca Sales': ['RS'],
            'Westfalia': ['WES'],
            'Progresso': ['PRO'],
            'Sete de Setembro': ['SS'],
            'Imigrante': ['IMI'],
            'Travesseiro': ['TRA'],
            'Muçum': ['Mucum'],
            'Poço das Antas': ['Poco das Antas'],
            'Bom Retiro do Sul': ['BRS'],
            'Forquetinha': ['FOR'],
            'Cruzeiro do Sul': ['CDS'],
            'Herveiras': ['HER'],
            'Jacuí': ['JAC'],
            'Marques de Souza': ['MDS'],
            'Paverama': ['PAV'],
            'Anta Gorda': ['AG'],
            'Vespasiano Corrêa': ['VC'],
            'Barão de Cotegipe': ['BC'],
            'Aratiba': ['ARA'],
            'Getúlio Vargas': ['GV'],
            'Marcelino Ramos': ['MR'],
            'Severiano de Almeida': ['SA'],
            'Viadutos': ['VIA'],
            'Barracão': ['BAR'],
            'Alpestre': ['ALP'],
            'Erval Seco': ['ES'],
            'Três Passos': ['TP'],
            'Crissiumal': ['CRI'],
            'Tenório': ['TEN'],
            'Humaitá': ['Humaita'],
            'Roque Gonzales': ['RG'],
            'Santo Ângelo': ['Santo Angelo'],
            'Giruá': ['Girua'],
            'Santo Rosa': ['SR'],
            'Tucunduva': ['TUC'],
            'Tiradentes do Sul': ['TS'],
            'Doutor Maurício Cardoso': ['DMC'],
            'Catuípe': ['CAT'],
            'Joia': ['JOI'],
            'Augusto Pestana': ['AP'],
            'Panambi': ['PAN'],
            'Passo Fundo': ['PF'],
            'Sarandi': ['SAR'],
            'Ajuricaba': ['AJU'],
            'Mamoré': ['MAM'],
            'Não-Me-Toque': ['NMT', 'Nao-Me-Toque'],
            'Tapejara': ['TAP'],
            'Espumoso': ['ESP'],
            'Arroio do Meio': ['ADM'],
            'Lajeado': ['LAJ'],
            'Taquari': ['TAQ'],
            'Encantado': ['ENC'],
            'Roca Sales': ['RS'],
            'Westfalia': ['WES'],
            'Progresso': ['PRO'],
            'Sete de Setembro': ['SS'],
            'Imigrante': ['IMI'],
            'Travesseiro': ['TRA'],
            'Muçum': ['Mucum'],
            'Poço das Antas': ['Poco das Antas'],
            'Bom Retiro do Sul': ['BRS'],
            'Forquetinha': ['FOR'],
            'Cruzeiro do Sul': ['CDS'],
            'Herveiras': ['HER'],
            'Jacuí': ['JAC'],
            'Marques de Souza': ['MDS'],
            'Paverama': ['PAV'],
            'Anta Gorda': ['AG'],
            'Vespasiano Corrêa': ['VC']
        };

        // Construir mapa de aliases
        Object.entries(commonAliases).forEach(([municipality, municipalityAliases]) => {
            const normalized = normalizeMunicipalityName(municipality);
            aliases[normalized] = municipalityAliases.map(a => normalizeMunicipalityName(a));
        });

        return aliases;
    }

    /**
     * Valida se um nome de município está correto para uma célula
     */
    validateAnswer(row, col, userInput) {
        if (isEmpty(userInput)) {
            return {
                isValid: false,
                message: 'Digite o nome de um município'
            };
        }

        const expectedMunicipality = this.puzzle.answers[row][col];
        const normalized = normalizeMunicipalityName(userInput);
        const expectedNormalized = normalizeMunicipalityName(expectedMunicipality);

        // Comparação exata
        if (normalized === expectedNormalized) {
            return {
                isValid: true,
                municipality: expectedMunicipality,
                message: `✓ Correto! ${expectedMunicipality}`
            };
        }

        // Verificar aliases
        const aliases = this.aliases[expectedNormalized] || [];
        if (aliases.includes(normalized)) {
            return {
                isValid: true,
                municipality: expectedMunicipality,
                message: `✓ Correto! ${expectedMunicipality}`
            };
        }

        return {
            isValid: false,
            message: `✗ Essa combinação não funciona para ${expectedMunicipality}`
        };
    }

    /**
     * Encontra sugestões de municípios baseado na entrada do usuário
     */
    getSuggestions(row, col, userInput) {
        if (isEmpty(userInput)) {
            return [];
        }

        const horizontalClue = this.puzzle.cluesHorizontal[col];
        const verticalClue = this.puzzle.cluesVertical[row];

        // Filtrar municípios que satisfazem ambas as clues
        const validMunicipalities = this.puzzle.validMunicipalities || [];

        const normalized = normalizeMunicipalityName(userInput);

        // Filtrar por entrada do usuário
        const suggestions = validMunicipalities.filter(m => {
            const mNormalized = normalizeMunicipalityName(m);
            return mNormalized.includes(normalized);
        });

        return suggestions.slice(0, 10); // Limitar a 10 sugestões
    }
}
