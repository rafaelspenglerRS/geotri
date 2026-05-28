/**
 * UTILITÁRIOS GERAIS
 */

// ===== FUNÇÕES DE FORMATAÇÃO =====

/**
 * Normaliza um nome de município para comparação
 */
function normalizeMunicipalityName(name) {
    return name
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/\s+/g, ' '); // Remove espaços extras
}

/**
 * Formata a data para exibição
 */
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

/**
 * Formata um número com separador de milhares
 */
function formatNumber(num) {
    return num.toLocaleString('pt-BR');
}

// ===== FUNÇÕES DE DOM =====

/**
 * Seleciona um elemento do DOM
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Seleciona múltiplos elementos do DOM
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Cria um elemento com classes e atributos
 */
function createElement(tag, classes = [], attributes = {}) {
    const el = document.createElement(tag);
    
    if (classes.length > 0) {
        el.classList.add(...(Array.isArray(classes) ? classes : [classes]));
    }
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'text') {
            el.textContent = value;
        } else if (key === 'html') {
            el.innerHTML = value;
        } else {
            el.setAttribute(key, value);
        }
    });
    
    return el;
}

/**
 * Adiciona classe com animação
 */
function addClassWithAnimation(el, className, duration = 300) {
    el.classList.add(className);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

/**
 * Remove classe com animação
 */
function removeClassWithAnimation(el, className, duration = 300) {
    el.classList.remove(className);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

// ===== FUNÇÕES DE ARMAZENAMENTO =====

/**
 * Salva dados no localStorage
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
        return false;
    }
}

/**
 * Carrega dados do localStorage
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Erro ao carregar do localStorage:', e);
        return defaultValue;
    }
}

/**
 * Remove dados do localStorage
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Erro ao remover do localStorage:', e);
        return false;
    }
}

// ===== FUNÇÕES DE NOTIFICAÇÃO =====

/**
 * Mostra uma notificação temporária
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = createElement('div', ['notification', type], {
        text: message
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

/**
 * Mostra um status no jogo
 */
function showGameStatus(message, type = 'info') {
    const statusEl = $('#game-status');
    statusEl.textContent = message;
    statusEl.className = `game-status ${type}`;
    statusEl.classList.remove('hidden');
    
    setTimeout(() => {
        statusEl.classList.add('hidden');
    }, 3000);
}

// ===== FUNÇÕES DE VALIDAÇÃO =====

/**
 * Valida se uma string está vazia
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * Valida se um valor é um número
 */
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Valida se um valor é um objeto
 */
function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Valida se um valor é um array
 */
function isArray(value) {
    return Array.isArray(value);
}

// ===== FUNÇÕES DE ARRAY =====

/**
 * Embaralha um array
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Seleciona um elemento aleatório de um array
 */
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Remove duplicatas de um array
 */
function removeDuplicates(array) {
    return [...new Set(array)];
}

/**
 * Filtra um array por uma propriedade
 */
function filterByProperty(array, property, value) {
    return array.filter(item => item[property] === value);
}

// ===== FUNÇÕES DE DELAY =====

/**
 * Aguarda um tempo específico
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Executa uma função após um delay
 */
function delayedExecution(fn, ms) {
    return setTimeout(fn, ms);
}

// ===== FUNÇÕES DE COMPARTILHAMENTO =====

/**
 * Copia texto para a área de transferência
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return Promise.resolve();
    }
}

/**
 * Compartilha via Web Share API se disponível
 */
function shareContent(data) {
    if (navigator.share) {
        return navigator.share(data);
    } else {
        // Fallback: copiar para clipboard
        return copyToClipboard(data.text);
    }
}

// ===== FUNÇÕES DE BANDEIRA =====

/**
 * Obtém a bandeira de um estado (usando emoji de estado dos EUA como referência)
 * Para municípios, usaremos a bandeira do RS
 */
function getMunicipalityFlag() {
    // Retorna a bandeira do Rio Grande do Sul
    return '🏳️';
}

/**
 * Obtém o emoji de um município (usando bandeira regional)
 */
function getMunicipalityEmoji(municipalityName) {
    // Para fins de demonstração, retorna um emoji genérico de localização
    // Em uma versão futura, poderia mapear municípios específicos
    return '📍';
}

// ===== DEBUG =====

/**
 * Log com timestamp
 */
function debugLog(message, data = null) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.log(`[${timestamp}] ${message}`, data || '');
}

/**
 * Log de erro com timestamp
 */
function debugError(message, error = null) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.error(`[${timestamp}] ERRO: ${message}`, error || '');
}
