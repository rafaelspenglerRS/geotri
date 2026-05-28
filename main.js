/**
 * ARQUIVO PRINCIPAL - GEO TRI
 */

let municipalities = [];
let puzzle = null;
let gameState = null;
let renderer = null;
let validator = null;
let generator = null;

let currentModalRow = null;
let currentModalCol = null;

/**
 * Inicializa o jogo
 */
async function initGame() {
    try {
        debugLog('Iniciando Geo TRI...');
        
        // Carregar dados de municípios
        await loadMunicipalitiesData();
        
        // Inicializar gerador de puzzles
        generator = new PuzzleGenerator(municipalities);
        
        // Gerar puzzle do dia
        puzzle = generator.generateDailyPuzzle();
        debugLog('Puzzle gerado', { id: puzzle.id, date: puzzle.date });
        
        // Inicializar estado do jogo
        gameState = new GameState(puzzle);
        
        // Tentar carregar jogo salvo
        const hasSavedGame = GamePersistence.hasGameToday(puzzle.id);
        if (hasSavedGame) {
            GamePersistence.loadGame(gameState, puzzle.id);
            debugLog('Jogo salvo carregado');
        }
        
        // Inicializar renderizador
        renderer = new GameRenderer(puzzle, gameState);
        
        // Inicializar validador
        validator = new AnswerValidator(puzzle);
        
        // Renderizar tabuleiro
        renderer.renderBoard();
        
        // Configurar listeners
        setupEventListeners();
        
        debugLog('Geo TRI iniciado com sucesso');
    } catch (e) {
        debugError('Erro ao iniciar jogo', e);
        showNotification('Erro ao carregar o jogo. Tente recarregar a página.', 'error');
    }
}

/**
 * Carrega dados de municípios do JSON
 */
async function loadMunicipalitiesData() {
    try {
        const response = await fetch('data/municipalities.json');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        municipalities = data.municipalities || [];
        debugLog(`${municipalities.length} municípios carregados`);
    } catch (e) {
        debugError('Erro ao carregar dados de municípios', e);
        throw e;
    }
}

/**
 * Configura listeners de eventos
 */
function setupEventListeners() {
    // Modal
    const modalOverlay = $('#modal-overlay');
    const modalClose = $('#modal-close');
    const modalCancel = $('#modal-cancel');
    const modalGuess = $('#modal-guess');
    const searchInput = $('#search-input');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCancel) {
        modalCancel.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', handleSearchKeydown);
    }
    
    if (modalGuess) {
        modalGuess.addEventListener('click', handleGuess);
    }
    
    // Botões de ação
    const shareBtn = $('#share-btn');
    const finishBtn = $('#finish-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
    
    if (finishBtn) {
        finishBtn.addEventListener('click', handleFinish);
    }
}

/**
 * Abre o modal de busca para uma célula
 */
function openModal(row, col) {
    currentModalRow = row;
    currentModalCol = col;
    
    const modal = $('#search-modal');
    const overlay = $('#modal-overlay');
    const searchInput = $('#search-input');
    const modalClueH = $('#modal-clue-h');
    const modalClueV = $('#modal-clue-v');
    
    // Atualizar pistas
    if (modalClueH) {
        modalClueH.textContent = puzzle.cluesHorizontal[col];
    }
    
    if (modalClueV) {
        modalClueV.textContent = puzzle.cluesVertical[row];
    }
    
    // Limpar input
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    
    // Mostrar modal
    if (modal) {
        modal.classList.remove('hidden');
    }
    
    if (overlay) {
        overlay.classList.remove('hidden');
    }
    
    // Limpar sugestões
    const suggestionsEl = $('#suggestions');
    if (suggestionsEl) {
        suggestionsEl.innerHTML = '';
    }
}

/**
 * Fecha o modal de busca
 */
function closeModal() {
    const modal = $('#search-modal');
    const overlay = $('#modal-overlay');
    
    if (modal) {
        modal.classList.add('hidden');
    }
    
    if (overlay) {
        overlay.classList.add('hidden');
    }
    
    currentModalRow = null;
    currentModalCol = null;
}

/**
 * Manipula entrada de busca
 */
function handleSearchInput(event) {
    const input = event.target.value;
    const suggestionsEl = $('#suggestions');
    
    if (!suggestionsEl || currentModalRow === null || currentModalCol === null) {
        return;
    }
    
    if (isEmpty(input)) {
        suggestionsEl.innerHTML = '';
        return;
    }
    
    // Aqui você poderia adicionar lógica de sugestões
    // Por enquanto, deixaremos vazio
    suggestionsEl.innerHTML = '';
}

/**
 * Manipula tecla pressionada na busca
 */
function handleSearchKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleGuess();
    }
}

/**
 * Manipula o palpite
 */
function handleGuess() {
    if (currentModalRow === null || currentModalCol === null) {
        return;
    }
    
    const searchInput = $('#search-input');
    const userInput = searchInput.value;
    
    if (isEmpty(userInput)) {
        showNotification('Digite o nome de um município', 'warning');
        return;
    }
    
    // Validar resposta
    const result = validator.validateAnswer(currentModalRow, currentModalCol, userInput);
    
    if (result.isValid) {
        // Acerto!
        gameState.addGuess(currentModalRow, currentModalCol, result.municipality, true);
        renderer.updateCell(currentModalRow, currentModalCol, result.municipality);
        
        showNotification(`✓ Correto! ${result.municipality}`, 'success');
        
        // Salvar progresso
        GamePersistence.saveGame(gameState, puzzle.id);
        
        // Verificar se ganhou
        if (gameState.isGameWon) {
            setTimeout(() => {
                showGameStatus('🎉 Você venceu! Parabéns!', 'success');
                GamePersistence.addToHistory({
                    puzzleId: puzzle.id,
                    score: gameState.score,
                    completion: 100,
                    isWon: true
                });
            }, 500);
        }
        
        closeModal();
    } else {
        // Erro!
        gameState.addGuess(currentModalRow, currentModalCol, userInput, false);
        renderer.updateGuessesDisplay();
        
        showNotification(result.message, 'error');
        
        // Salvar progresso
        GamePersistence.saveGame(gameState, puzzle.id);
        
        // Verificar se perdeu
        if (gameState.isGameOver) {
            setTimeout(() => {
                showGameStatus('💔 Fim de jogo! Tentativas esgotadas.', 'error');
                GamePersistence.addToHistory({
                    puzzleId: puzzle.id,
                    score: gameState.score,
                    completion: gameState.getCompletionPercentage(),
                    isWon: false
                });
            }, 500);
        }
        
        // Limpar input
        searchInput.value = '';
        searchInput.focus();
    }
}

/**
 * Manipula compartilhamento
 */
function handleShare() {
    const shareText = GamePersistence.generateShareText(gameState, puzzle);
    
    shareContent({
        title: 'Geo TRI',
        text: shareText,
        url: window.location.href
    }).then(() => {
        showNotification('Compartilhado com sucesso!', 'success');
    }).catch(err => {
        // Fallback: copiar para clipboard
        copyToClipboard(shareText).then(() => {
            showNotification('Texto copiado para a área de transferência!', 'success');
        });
    });
}

/**
 * Manipula revelação de solução
 */
function handleFinish() {
    if (confirm('Tem certeza que deseja revelar a solução? Não poderá mais jogar hoje.')) {
        // Revelar todas as células
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!gameState.isCellFilled(row, col)) {
                    const municipality = puzzle.answers[row][col];
                    gameState.filled.set(`${row},${col}`, {
                        municipality: municipality,
                        rarity: puzzle.rarities[row][col]
                    });
                    renderer.updateCell(row, col, municipality);
                }
            }
        }
        
        gameState.isGameOver = true;
        GamePersistence.saveGame(gameState, puzzle.id);
        showGameStatus('Solução revelada!', 'info');
    }
}

/**
 * Callback para clique em célula (chamado pelo renderer)
 */
function onCellClickCallback(row, col) {
    if (!gameState.isCellFilled(row, col) && !gameState.isGameOver && !gameState.isGameWon) {
        openModal(row, col);
    }
}

// Sobrescrever o callback no renderer
GameRenderer.prototype.onCellClick = function(row, col) {
    onCellClickCallback(row, col);
};

/**
 * Inicia o jogo quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', initGame);

// Limpar histórico antigo ao iniciar
GamePersistence.cleanOldHistory();
