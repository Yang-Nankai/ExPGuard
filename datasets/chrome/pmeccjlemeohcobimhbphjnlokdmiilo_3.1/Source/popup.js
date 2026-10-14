document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(window.location.search);
    const text = params.get('text');
    if (text) {
        const textContainer = document.getElementById('textContainer');
        textContainer.textContent = text;
    }

    const chip = document.getElementById('stateChip');
    try {
        chrome.storage.sync.get({
            ms_mode: 'guest',
            ms_token_count: 0,
            ms_ocr_balance_type: 'standard',
        }, ({ ms_mode, ms_token_count, ms_ocr_balance_type }) => {
                chip.hidden = false;
            const tokenCount = Number(ms_token_count) || 0;
            const balanceType = ms_ocr_balance_type || 'standard';

            if (ms_mode === 'tokened') {
                chip.textContent = `Tokened: Google OCR (balance ${balanceType}: ${tokenCount})`;
            } else if (ms_mode === 'no_tokens') {
                chip.textContent = `No tokens: Tesseract OCR (balance ${balanceType}: ${tokenCount})`;
            } else {
                chip.textContent = 'Guest: Tesseract OCR';
            }
        });
    } catch (e) {}
});
