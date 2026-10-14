const ThemeEngine = {
    updateDynamicStyles: (settings) => {
		let varTag = document.getElementById('gs-dark-vars');
		if (!varTag) {
			varTag = document.createElement('style');
			varTag.id = 'gs-dark-vars';
			document.documentElement.appendChild(varTag);
		}

		const b = settings.brightness !== undefined ? settings.brightness : 100;
		const c = settings.contrast !== undefined ? settings.contrast : 100;
		const s = settings.sepia || 0;
		const g = settings.grayscale || 0;
		const h = settings.hueRotate || 0;
		const inv = settings.invert ? 1 : 0;

		const tableFilter = [
			`brightness(${b / 100})`,
			`contrast(${c / 100})`,
			`sepia(${s / 100})`,
			`grayscale(${g / 100})`,
			`hue-rotate(${h}deg)`,
			`invert(${inv})`
		].join(' ');

		varTag.textContent = `
			:root { 
				--color-gold: ${CONFIG.GOLD_HEX} !important;
				--theme-interface-bg: #141518 !important;
				--theme-iframe-bg: #2c3244 !important;
				--theme-grid-bg: ${settings.backgroundColor || '#101010'} !important;
				--theme-text-color: ${settings.textColor || '#ffffff'} !important;
			}
			
			html.dark-theme-last #waffle-grid-container canvas,
			html.dark-theme-last .docs-grille-gm3 .input-box .cell-input.editable,
			.waffle-ac-renderer.waffle-dropdown-chip-renderer {
				filter: ${tableFilter} !important;
			}

			html.dark-theme-last .grid-spreadsheet-container,
			html.dark-theme-last .docs-sheet-container,
			html.dark-theme-last body {
				background-color: var(--theme-interface-bg) !important;
			}
			
			html.dark-theme-last.is-iframe, 
            html.dark-theme-last.is-iframe body {
                background-color: var(--theme-iframe-bg) !important;
                background: var(--theme-iframe-bg) !important;
                color: var(--theme-text-color) !important;
            }
			
			html.dark-theme-last.is-iframe h1, html.dark-theme-last.is-iframe h2, html.dark-theme-last.is-iframe h3, 
			html.dark-theme-last.is-iframe h4, html.dark-theme-last.is-iframe h5 {
				color: var(--color-gold) !important;
			}
			
			html.dark-theme-last .docs-icon-img,
			html.dark-theme-last .docs-icon-img-container,
			html.dark-theme-last .goog-toolbar-button-icon,
			html.dark-theme-last .goog-toolbar-menu-button-icon,
			html.dark-theme-last [class*="docs-icon"]:before,
			html.dark-theme-last .sp-action-icon,
			html.dark-theme-last #qJTzr .app-switcher-button-icon-container {
				filter: ${CONFIG.GOLD_FILTER} !important;
				opacity: 1 !important;
			}

			html.dark-theme-last .goog-toolbar-button-caption,
			html.dark-theme-last .goog-toolbar-menu-button-caption,
			html.dark-theme-last .docs-title-input-label,
			html.dark-theme-last #docs-access-level-indicator {
				color: var(--color-gold) !important;
			}
			
			html.dark-theme-last[data-hostname="meet.google.com"] .huwqi.zEyxce {
				background-color: #141518 !important;
				color: #5f6368 !important;
			}

			html.dark-theme-last[data-hostname="meet.google.com"] ul[role="menu"] li [jsname="K4r5Ff"] {
				color: #5f6368 !important;
			}

			html.dark-theme-last[data-hostname="meet.google.com"] ul[role="menu"] li i.google-material-icons {
				color: #5f6368 !important;
			}
			html.dark-theme-last[data-hostname="meet.google.com"] .xMGJ0e, html.dark-theme-last[data-hostname="meet.google.com"] .WUFI9b {
				background-color: #2c3244 !important;
			}
			html.dark-theme-last[data-hostname="meet.google.com"] .PYUgw,
			html.dark-theme-last[data-hostname="meet.google.com"] .J8vCN,
			html.dark-theme-last[data-hostname="meet.google.com"] .L9cKpb {
				color: #5f6368 !important;
			}
		`;
	},

    injectStyles: async (settings) => {
        const root = document.documentElement;

        if (!settings.enabled) {
            ThemeEngine.removeStyles();
            return;
        }
		
		const isIframe = window !== window.top;
        
        root.classList.add('dark-theme-last');
        root.classList.add(isIframe ? 'is-iframe' : 'is-top-level');
        root.setAttribute('data-hostname', window.location.hostname);

        ThemeEngine.updateDynamicStyles(settings);

        if (!document.getElementById('gs-dark-engine')) {
            try {
                const cssContents = await Promise.all(
                    CONFIG.CSS_FILES.map(f => 
                        fetch(chrome.runtime.getURL(CONFIG.STYLES_PATH + f))
                            .then(r => r.text())
                    )
                );
                const styleTag = document.createElement('style');
                styleTag.id = 'gs-dark-engine';
                styleTag.textContent = cssContents.join('\n');
                document.head.appendChild(styleTag);
                
                if (!isIframe) {
                    setTimeout(() => {
                        window.dispatchEvent(new Event('resize'));
                    }, 150);
                }
            } catch (e) {
                console.error("Critical: Theme engine failed to load CSS", e);
            }
        }
    },
	
	removeStyles: () => {
        const root = document.documentElement;
        root.classList.remove('dark-theme-last', 'is-iframe', 'is-top-level');
        root.style.filter = '';
        root.removeAttribute('data-hostname');

        const styleTag = document.getElementById('gs-dark-engine');
        if (styleTag) styleTag.remove();

        const varTag = document.getElementById('gs-dark-vars');
        if (varTag) varTag.remove();
        
        if (window === window.top) {
            window.dispatchEvent(new Event('resize'));
        }
    },
};