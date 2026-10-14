// utils.js - Funções auxiliares

/**
 * Tenta extrair o ID da obra da URL atual.
 */
function getWorkIdFromUrl() {
    const match = window.location.pathname.match(/works\/(\d+)/);
    if (match) return match[1];
    return null;
}

/**
 * Formata um timestamp para string legível.
 */
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `on ${month}/${day}/${year} at ${hours}:${minutes}`;
}

/**
 * Converte HEX para RGB (ex: "#ffffff" -> "255, 255, 255")
 */
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

/**
 * Analisa luminância para definir tema claro/escuro.
 */
function getLuminanceFromRgb(rgbString) {
    const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return 128;
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return (0.299 * r + 0.587 * g + 0.114 * b);
}

/**
 * Pega a luminância do fundo da página.
 */
function getBodyLuminance() {
    let rgbString = window.getComputedStyle(document.body).backgroundColor;
    if (!rgbString || rgbString === 'transparent' || rgbString.includes('rgba(0, 0, 0, 0)')) {
        const main = document.getElementById('main');
        if (main) {
            rgbString = window.getComputedStyle(main).backgroundColor;
        } else {
            return 128;
        }
    }
    return getLuminanceFromRgb(rgbString);
}

/**
 * Tenta extrair a data de atualização de um elemento HTML de obra.
 */
function getWorkUpdateTime(workElement) {
    const updatedDt = workElement.querySelector('.datetime');
    if (updatedDt) {
        const dateStr = updatedDt.textContent.trim();
        const date = new Date(dateStr);
        const dateTimestamp = date.getTime();
        if (!isNaN(dateTimestamp) && dateTimestamp > 0) {
            return dateTimestamp;
        }
    }
    return 0;
}