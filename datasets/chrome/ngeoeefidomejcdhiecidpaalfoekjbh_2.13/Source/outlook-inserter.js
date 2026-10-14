(function () {
    function injectCapsuleButton() {
        if (document.getElementById('tilantra-capsule-chat-button')) return;

        // Outlook Toolbar: Target the area where Reply/Forward/Print usually sit
        const replyBtn = document.querySelector('button[aria-label^="Reply"], button[aria-label^="Forward"]');
        const moreActionsBtn = document.querySelector('button[aria-label*="More"]');
        let toolbar = null;
        if (replyBtn) toolbar = replyBtn.closest('div[role="toolbar"], .OQ81P');
        if (!toolbar && moreActionsBtn) toolbar = moreActionsBtn.closest('div[role="toolbar"], .OQ81P');
        if (!toolbar) toolbar = document.querySelector('div[role="toolbar"]');

        if (toolbar) {
            const capsuleBtn = createCapsuleButton();
            // Matching Outlook toolbar button spacing
            capsuleBtn.style.marginLeft = '8px';
            capsuleBtn.style.display = 'inline-flex';
            capsuleBtn.style.verticalAlign = 'middle';

            // Insertion: Preferably before 'More actions'
            if (moreActionsBtn) {
                toolbar.insertBefore(capsuleBtn, moreActionsBtn);
            } else {
                toolbar.appendChild(capsuleBtn);
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
