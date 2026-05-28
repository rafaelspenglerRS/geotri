/**
 * GERENCIAMENTO DE PERSISTÊNCIA
 */

class GamePersistence {
    static STORAGE_KEY_PREFIX = 'geotri_';

    /**
     * Gera a chave de armazenamento para um puzzle específico
     */
    static getStorageKey(puzzleId) {
        const today = new Date().toISOString().split('T')[0];
        return `${this.STORAGE_KEY_PREFIX}${puzzleId}_${today}`;
    }

    /**
     * Salva o estado do jogo
     */
    static saveGame(gameState, puzzleId) {
        try {
            const key = this.getStorageKey(puzzleId);
            const data = gameState.toJSON();
            saveToStorage(key, data);
            debugLog('Jogo salvo com sucesso', { key, puzzleId });
            return true;
        } catch (e) {
            debugError('Erro ao salvar jogo', e);
            return false;
        }
    }

    /**
     * Carrega o estado do jogo
     */
    static loadGame(gameState, puzzleId) {
        try {
            const key = this.getStorageKey(puzzleId);
            const data = loadFromStorage(key);
            
            if (data) {
                gameState.fromJSON(data);
                debugLog('Jogo carregado com sucesso', { key, puzzleId });
                return true;
            }
            
            return false;
        } catch (e) {
            debugError('Erro ao carregar jogo', e);
            return false;
        }
    }

    /**
     * Verifica se existe um jogo salvo para hoje
     */
    static hasGameToday(puzzleId) {
        const key = this.getStorageKey(puzzleId);
        return loadFromStorage(key) !== null;
    }

    /**
     * Limpa o jogo salvo
     */
    static clearGame(puzzleId) {
        try {
            const key = this.getStorageKey(puzzleId);
            removeFromStorage(key);
            debugLog('Jogo limpo com sucesso', { key, puzzleId });
            return true;
        } catch (e) {
            debugError('Erro ao limpar jogo', e);
            return false;
        }
    }

    /**
     * Salva o histórico de jogos
     */
    static saveGameHistory(history) {
        try {
            const key = `${this.STORAGE_KEY_PREFIX}history`;
            saveToStorage(key, history);
            debugLog('Histórico salvo com sucesso');
            return true;
        } catch (e) {
            debugError('Erro ao salvar histórico', e);
            return false;
        }
    }

    /**
     * Carrega o histórico de jogos
     */
    static loadGameHistory() {
        try {
            const key = `${this.STORAGE_KEY_PREFIX}history`;
            return loadFromStorage(key, []);
        } catch (e) {
            debugError('Erro ao carregar histórico', e);
            return [];
        }
    }

    /**
     * Adiciona um jogo ao histórico
     */
    static addToHistory(gameResult) {
        try {
            const history = this.loadGameHistory();
            history.push({
                ...gameResult,
                date: new Date().toISOString()
            });
            this.saveGameHistory(history);
            debugLog('Jogo adicionado ao histórico');
            return true;
        } catch (e) {
            debugError('Erro ao adicionar ao histórico', e);
            return false;
        }
    }

    /**
     * Limpa o histórico antigo (mais de 30 dias)
     */
    static cleanOldHistory(daysToKeep = 30) {
        try {
            const history = this.loadGameHistory();
            const cutoffDate = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
            
            const filtered = history.filter(item => {
                const itemDate = new Date(item.date).getTime();
                return itemDate > cutoffDate;
            });

            this.saveGameHistory(filtered);
            debugLog(`Histórico limpo. ${history.length - filtered.length} itens removidos`);
            return true;
        } catch (e) {
            debugError('Erro ao limpar histórico', e);
            return false;
        }
    }

    /**
     * Exporta o estado do jogo como string (para compartilhamento)
     */
    static exportGameState(gameState) {
        try {
            const data = gameState.toJSON();
            return btoa(JSON.stringify(data)); // Base64 encode
        } catch (e) {
            debugError('Erro ao exportar estado do jogo', e);
            return null;
        }
    }

    /**
     * Importa o estado do jogo a partir de string
     */
    static importGameState(encodedState) {
        try {
            const data = JSON.parse(atob(encodedState)); // Base64 decode
            return data;
        } catch (e) {
            debugError('Erro ao importar estado do jogo', e);
            return null;
        }
    }

    /**
     * Gera um resumo do jogo para compartilhamento
     */
    static generateShareText(gameState, puzzle) {
        const score = Math.round(gameState.score);
        const completion = gameState.getCompletionPercentage();
        const elapsedTime = gameState.getElapsedTime();
        
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        
        let text = `🗺️ Geo TRI #${puzzle.id}\n`;
        text += `📊 Pontuação: ${score}\n`;
        text += `✅ Completado: ${completion}%\n`;
        text += `⏱️ Tempo: ${minutes}m ${seconds}s\n`;
        text += `\n🎮 Jogue em: https://geotri.example.com`;
        
        return text;
    }
}
