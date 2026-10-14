(function () {

    function injectCapsuleButton() {
        if (document.getElementById('tilantra-capsule-chat-button')) return;

        const printBtn = document.querySelector('div[aria-label="Print all"]');
        const bHJContainer = document.querySelector('div.bHJ');
        const container = bHJContainer || (printBtn ? printBtn.closest('div.bHJ') || printBtn.parentElement : null);

        if (container) {
            const capsuleBtn = createCapsuleButton();
            // Matching Gmail toolbar button spacing
            capsuleBtn.style.marginRight = '8px';
            capsuleBtn.style.display = 'inline-flex';
            capsuleBtn.style.verticalAlign = 'middle';

            // INSERTION
            if (container.firstChild) {
                container.insertBefore(capsuleBtn, container.firstChild);
            } else {
                container.appendChild(capsuleBtn);
            }
        }
    }

    const observer = new MutationObserver(() => {
        if (!document.getElementById('tilantra-capsule-chat-button')) {
            injectCapsuleButton();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    injectCapsuleButton();
})();
