/* ===== MODAL OVERLAY ===== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    transition: opacity 0.3s ease;
}

.modal-overlay.hidden {
    display: none;
    opacity: 0;
}

/* ===== MODAL ===== */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 300;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal.hidden {
    display: none;
}

.modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        transform: translate(-50%, -50%) scale(0.9);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

/* ===== MODAL HEADER ===== */
.modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.modal-header h2 {
    font-size: 1.5rem;
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
}

.modal-close:hover {
    transform: scale(1.2);
}

/* ===== MODAL BODY ===== */
.modal-body {
    padding: 24px;
}

.clues-display {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
}

.clue-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.clue-item:last-child {
    margin-bottom: 0;
}

.clue-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.clue-text {
    font-size: 1rem;
    color: #2c3e50;
    font-weight: 500;
}

/* ===== SEARCH INPUT ===== */
.search-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #bdc3c7;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin-bottom: 12px;
}

.search-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.search-input::placeholder {
    color: #95a5a6;
}

/* ===== SUGGESTIONS ===== */
.suggestions {
    background: #f8f9fa;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 12px;
}

.suggestion-item {
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #ecf0f1;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-item:hover {
    background: #e8f4f8;
    color: #3498db;
}

.suggestion-item.selected {
    background: #d4edda;
    color: #27ae60;
    font-weight: 600;
}

.suggestion-item.no-results {
    padding: 20px 16px;
    text-align: center;
    color: #95a5a6;
    cursor: default;
}

.suggestion-item.no-results:hover {
    background: #f8f9fa;
    color: #95a5a6;
}

/* ===== MODAL FOOTER ===== */
.modal-footer {
    padding: 16px 24px;
    background: #f8f9fa;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.modal-footer .btn {
    flex: 1;
    justify-content: center;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 480px) {
    .modal {
        width: 95%;
    }

    .modal-content {
        border-radius: 8px;
    }

    .modal-header {
        padding: 16px;
    }

    .modal-header h2 {
        font-size: 1.25rem;
    }

    .modal-close {
        width: 32px;
        height: 32px;
        font-size: 1.5rem;
    }

    .modal-body {
        padding: 16px;
    }

    .clues-display {
        padding: 12px;
        margin-bottom: 16px;
    }

    .clue-item {
        gap: 6px;
        margin-bottom: 10px;
    }

    .clue-label {
        font-size: 0.75rem;
    }

    .clue-text {
        font-size: 0.9rem;
    }

    .search-input {
        padding: 10px 12px;
        font-size: 16px; /* Previne zoom em iOS */
        margin-bottom: 10px;
    }

    .suggestions {
        max-height: 150px;
        margin-bottom: 10px;
    }

    .suggestion-item {
        padding: 10px 12px;
    }

    .modal-footer {
        padding: 12px 16px;
        gap: 8px;
    }

    .modal-footer .btn {
        padding: 10px 12px;
        font-size: 0.9rem;
    }
}
