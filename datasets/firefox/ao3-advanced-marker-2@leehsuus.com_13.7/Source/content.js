// content.js - Lógica Principal e Orquestração

(async function () {
    'use strict';

    // Global Cache for this page context
    window.globalPageData = {};
    let currentPage = 1;
    let isLoadingNextPage = false;
    let isBookmarkGroupingMode = false; // Rastreia se estamos em modo agrupado de bookmarks

    // [WTR] Module-level state
    let _wtrSettings = { enabled: false, syncBookmarks: false, showHeaderMenu: false, tag: 'AO3 Advanced Marker Want to Read', filterActive: false };
    let _wtrQueue = {}; // Mirror of ao3_wtr_queue, kept in sync for O(1) lookups

    const observer = new IntersectionObserver(handleScrollObserver, { rootMargin: '500px' });

    // Garanta que o container de pastas tenha layout correto e responsivo
    function adjustFolderContainerSpacing(container) {
        if (!container) return;

        const windowWidth = window.innerWidth;

        if (windowWidth >= 1200) {
            // Desktop: lado a lado com filtro
            container.style.display = 'inline-block';
            container.style.verticalAlign = 'top';
            container.style.width = '75%';
            container.style.marginRight = '2%';
            container.style.boxSizing = 'border-box';
            container.style.marginBottom = '0';
        } else if (windowWidth >= 768) {
            // Tablet: full width, acima do filtro
            container.style.display = 'block';
            container.style.width = '100%';
            container.style.marginRight = '0';
            container.style.marginBottom = '1.5em';
            container.style.boxSizing = 'border-box';
        } else {
            // Mobile: full width, acima do filtro, com padding
            container.style.display = 'block';
            container.style.width = 'calc(100% - 10px)';
            container.style.marginRight = '0';
            container.style.marginBottom = '1em';
            container.style.marginLeft = '5px';
            container.style.marginTop = '0.5em';
            container.style.boxSizing = 'border-box';
            container.style.paddingLeft = '0';
            container.style.paddingRight = '0';
        }
    }

    // --- Initialization Sequence ---
    await loadApiCredentials();
    await loadCustomColors();
    await checkAutomaticBackup();

    // [NOVO] Verifica se há bookmarks pendentes ao carregar a página
    if (typeof processPendingBookmarks === 'function') {
        await processPendingBookmarks();
    }

    // [NOVO] Tenta processar novamente quando a internet voltar
    window.addEventListener('online', async () => {
        safeLog('[AO3 Marker] Online detected. Retrying pending bookmarks...');
        if (typeof processPendingBookmarks === 'function') {
            await processPendingBookmarks();
        }
    });

    // [WTR] Initialize WTR state
    if (typeof loadWTRSettings === 'function') {
        _wtrSettings = await loadWTRSettings();
    }
    if (_wtrSettings.enabled) {
        _wtrQueue = await loadWTRQueue();
        // Expose to ui.js filter helpers
        window._wtrFilterActive = _wtrSettings.filterActive;
        window._wtrQueueIds = new Set(Object.keys(_wtrQueue));

        // Retry any pending WTR bookmark syncs
        window.addEventListener('online', async () => {
            if (typeof processWTRPendingBookmarks === 'function') {
                await processWTRPendingBookmarks();
            }
        });
        if (typeof processWTRPendingBookmarks === 'function') {
            processWTRPendingBookmarks(); // fire-and-forget on page load
        }
    }

    // [NOVO] Injeta a vitrine PRO (AssistiveTouch) se for usuário Free
    if (typeof initProShowcase === 'function') {
        initProShowcase();
    }

    // [WTR] Inject header dropdown for PRO users
    // (initWTRHeaderDropdown is defined later in the IIFE but hoisting is fine for async fns)
    // Use a short defer so the AO3 nav is fully rendered
    if (_wtrSettings.enabled && _wtrSettings.showHeaderMenu) {
        setTimeout(() => initWTRHeaderDropdown(), 0);
    }

    // Decide logic based on URL
    const path = window.location.pathname;
    const isBookmarkPage = path.includes('/bookmarks');

    if (path.startsWith('/works/search')) {
        handleListingPage();
    } else if (path.match(/^\/works\/\d+/) && !path.includes('works/new')) {
        // Works page (excluding "new work" page)
        handleWorkPage();
    } else if (path.includes('/users/') && !path.includes('/works') && !path.includes('/bookmarks') && !path.includes('/profile') && !path.includes('/readings')) {
        handleUserDashboard();
    } else if (isBookmarkPage) {
        const IS_PRO_USER_KEY = 'is_pro_user';
        const settings = await storage.local.get([ENABLE_BOOKMARK_GROUPING_KEY, IS_PRO_USER_KEY]);
        const isGroupingEnabled = settings[ENABLE_BOOKMARK_GROUPING_KEY];
        const isProUser = settings[IS_PRO_USER_KEY];

        const shouldUseGrouping = isGroupingEnabled && isProUser;
        isBookmarkGroupingMode = shouldUseGrouping; // Salva flag global

        // Carrega dados para global (necessário para processBlurbs)
        window.globalPageData = {
            readWorks: await loadReadWorks(),
            lastReadChapters: await loadLastReadChapter(),
            doNotReadWorks: await loadDoNotRead(),
            isFilterActive: await loadFilterState()
        };

        // Setup e inicialização apenas uma vez
        await applyBookmarkAutoSort();
        setupBackupButtons(window.globalPageData.isFilterActive);
        setupBackToTopButton();

        // [WTR] Inject WTR filter button on user's own Bookmarks page
        if (_wtrSettings.enabled) {
            const greetingLink = document.querySelector('#greeting ul li a');
            const loggedInUsername = greetingLink ? greetingLink.href.split('/users/')[1]?.split('/')[0] : null;
            const isOwnBookmarkPage = loggedInUsername && window.location.pathname.includes(`/users/${loggedInUsername}`);
            if (isOwnBookmarkPage) {
                const markerToolsContainer = document.querySelector('.marker-data-sync-container');
                if (markerToolsContainer && typeof setupWTRFilterButton === 'function') {
                    setupWTRFilterButton(markerToolsContainer, _wtrSettings.filterActive);
                }
            }
        }

        const bookmarkItems = Array.from(document.querySelectorAll('ol.bookmark.index > li.bookmark'));

        if (shouldUseGrouping) {
            // Agrupa e aplica cores/botões via nossa nova função
            await processAndGroupBookmarks(bookmarkItems);
            // Em telas de bookmarks COM agrupamento usamos carregamento manual
            setupBookmarkLoadMore();
        } else {
            // Comportamento normal sem agrupamento - usa infinite scroll
            await processBlurbs(bookmarkItems, window.globalPageData);
            setupInfiniteScroll();
        }
    } else {
        handleListingPage();
    }

    function extractUniversalMetadata(context = document) {
        try {
            let title = "Unknown Work";
            let author = "Anonymous";
            let fandom = "Uncategorized";
            let wordCount = 0;
            let chapterCount = 1;

            // CENÁRIO A: Página da Obra (Contexto é o document ou body)
            if (context === document || context instanceof Document) {
                const titleElem = document.querySelector('h2.title');
                const authorElem = document.querySelector('h3.byline');
                const fandomElem = document.querySelector('.fandom ul li a'); // Pega o 1º fandom
                const wordElem = document.querySelector('dd.words');
                const chapterElem = document.querySelector('dd.chapters');

                if (titleElem) title = titleElem.textContent.trim();

                if (authorElem) {
                    const link = authorElem.querySelector('a');
                    author = link ? link.textContent.trim() : authorElem.textContent.replace('by', '').trim();
                }

                if (fandomElem) fandom = fandomElem.textContent.trim();

                if (wordElem) wordCount = parseInt(wordElem.textContent.replace(/[\s,.\u00A0]/g, '') || '0'); // Fix: covers locale separators (NBSP, space, dot) for Firefox Android

                // Extrai número de capítulos - formato "5 / 23", "5 / ?" ou apenas "5"
                if (chapterElem) {
                    const chapterText = chapterElem.textContent.trim();
                    const matchWithTotal = chapterText.match(/(\d+)\s*\/\s*(\d+)/);
                    const matchWithUnknown = chapterText.match(/(\d+)\s*\/\s*\?/);

                    if (matchWithTotal) {
                        chapterCount = parseInt(matchWithTotal[2], 10); // "5 / 23" -> usa 23
                    } else if (matchWithUnknown) {
                        chapterCount = parseInt(matchWithUnknown[1], 10); // "5 / ?" -> usa 5
                    } else {
                        chapterCount = parseInt(chapterText, 10) || 1; // "5" -> usa 5
                    }
                }
            }
            // CENÁRIO B: Item de Lista / Blurb
            else {
                const titleLink = context.querySelector('h4.heading a[href*="/works/"]');
                const authorLink = context.querySelector('h4.heading a[href*="/users/"]');
                const fandomLink = context.querySelector('h5.fandoms a');
                const wordElem = context.querySelector('dd.words');
                const chapterElem = context.querySelector('dd.chapters');

                if (titleLink) title = titleLink.textContent.trim();
                if (authorLink) author = authorLink.textContent.trim();
                if (fandomLink) fandom = fandomLink.textContent.trim();
                if (wordElem) wordCount = parseInt(wordElem.textContent.replace(/[\s,.\u00A0]/g, '') || '0'); // Fix: covers locale separators (NBSP, space, dot) for Firefox Android

                // Extrai número de capítulos - formato "5 / 23", "5 / ?" ou apenas "5"
                if (chapterElem) {
                    const chapterText = chapterElem.textContent.trim();
                    const matchWithTotal = chapterText.match(/(\d+)\s*\/\s*(\d+)/);
                    const matchWithUnknown = chapterText.match(/(\d+)\s*\/\s*\?/);

                    if (matchWithTotal) {
                        chapterCount = parseInt(matchWithTotal[2], 10); // "5 / 23" -> usa 23
                    } else if (matchWithUnknown) {
                        chapterCount = parseInt(matchWithUnknown[1], 10); // "5 / ?" -> usa 5
                    } else {
                        chapterCount = parseInt(chapterText, 10) || 1; // "5" -> usa 5
                    }
                }
            }

            return { title, author, fandom, wordCount, chapterCount };
        } catch (e) {
            console.warn("[AO3 Ext] Metadata extraction failed:", e);
            return null;
        }
    }

    async function updateStorageEntry(storageKey, workId, newData) {
        // 1. Carrega dados via cache do storage.js
        let allEntries = await loadData(storageKey);

        const currentEntry = allEntries[workId] || {};

        // 2. Otimização: Evita re-salvar se o META for idêntico
        let metaToSave = newData.meta;
        if (newData.meta && currentEntry.meta) {
            const isFandomSame = currentEntry.meta.fandom === newData.meta.fandom;
            const isTitleSame = currentEntry.meta.title === newData.meta.title;
            if (isFandomSame && isTitleSame) {
                metaToSave = currentEntry.meta; // Mantém o antigo
            }
        } else if (!newData.meta && currentEntry.meta) {
            metaToSave = currentEntry.meta; // Mantém antigo se novo for null
        }

        // 3. Merge dos dados
        allEntries[workId] = {
            ...currentEntry, // Mantém dados antigos (ex: timestamp original se não informado)
            ...newData,      // Sobrescreve dados de progresso
            meta: metaToSave // Usa o meta decidido
        };

        // 4. Salva de volta via cache debounce do storage.js
        await saveData(storageKey, allEntries);

        return allEntries; // Retorna para atualizar estado local se necessário
    }
    // --- Page Handlers ---

    async function handleListingPage() {
        // Load Data
        window.globalPageData = {
            readWorks: await loadReadWorks(),
            lastReadChapters: await loadLastReadChapter(),
            doNotReadWorks: await loadDoNotRead(),
            isFilterActive: await loadFilterState()
        };

        await applyBookmarkAutoSort();

        // Setup UI
        setupBackupButtons(window.globalPageData.isFilterActive);
        setupBackToTopButton();

        // Process Initial Blurbs
        const initialBlurbs = document.querySelectorAll('li.work.blurb, li.bookmark.blurb, li.reading.work.blurb');
        await processBlurbs(initialBlurbs, window.globalPageData);

        //await applyBookmarkGrouping(Array.from(initialBlurbs));

        // Setup Infinite Scroll
        setupInfiniteScroll();
    }

    async function handleWorkPage() {
        const workId = getWorkIdFromUrl();
        if (!workId) return;

        // Load Data
        const readWorks = await loadReadWorks();
        const lastReadChapters = await loadLastReadChapter();
        const doNotReadWorks = await loadDoNotRead();

        // Initialize global page data for work page
        window.globalPageData = {
            readWorks: readWorks,
            lastReadChapters: lastReadChapters,
            doNotReadWorks: doNotReadWorks
        };

        // State
        let isRead = !!readWorks[workId];
        let isDoNotRead = !!doNotReadWorks[workId];
        let isPartial = false;

        const currentChapterURL = window.location.href.split('?')[0].split('#')[0];
        const storedPartialData = lastReadChapters[workId];
        if (storedPartialData && storedPartialData.url === currentChapterURL) {
            isPartial = true;
        }

        // Extract chapter index for rating injection
        let currentChapterIndex = "1";
        let titleElement = document.querySelector('div.chapter h3.title');
        if (titleElement) {
            const match = titleElement.textContent.match(/Chapter (\d+)/);
            if (match) currentChapterIndex = match[1];
        } else {
            titleElement = document.querySelector('h2.title.heading');
            currentChapterIndex = "1";
        }

        // 5. Review System Injection (Moved up to run even if not logged in)
        injectReviewIcon(workId, titleElement, currentChapterIndex);

        // 6. PRO Text Highlights (Moved up to run even if not logged in)
        const hlProSettings = await storage.local.get(['is_pro_user']);
        if (window.highlights) {
            const contentContainer = document.querySelector('div.userstuff');
            if (contentContainer) {
                initHighlightFeature(workId, currentChapterIndex, contentContainer, hlProSettings.is_pro_user);
            }
        }

        // 7. Watch for comment submissions via AJAX that might break references
        const commentsContainer = document.getElementById('comments_placeholder') || document.getElementById('comments');
        if (commentsContainer) {
            const commentObserver = new MutationObserver((mutations) => {
                let shouldReinit = false;
                for (const m of mutations) {
                    if (m.addedNodes.length > 0) {
                        shouldReinit = true;
                        break;
                    }
                }
                if (shouldReinit) {
                    clearTimeout(window._markerCommentReinitTimer);
                    window._markerCommentReinitTimer = setTimeout(() => {
                        const newTitleElement = document.querySelector('div.chapter h3.title') || document.querySelector('h2.title.heading');
                        injectReviewIcon(workId, newTitleElement, currentChapterIndex);
                        
                        const newContentContainer = document.querySelector('div.userstuff');
                        if (window.highlights && newContentContainer) {
                            if (!document.getElementById('ao3-scrollbar-track')) {
                                initHighlightFeature(workId, currentChapterIndex, newContentContainer, hlProSettings.is_pro_user);
                            }
                        }
                    }, 500);
                }
            });
            commentObserver.observe(commentsContainer, { childList: true, subtree: true });
        }

        // Insert Buttons into Work Actions
        const topMenu = document.querySelector("ul.work.navigation.actions");
        const bottomMenu = document.querySelector("div#feedback ul.actions") || document.querySelector("div#feedback > ul");
        const workActionsMenus = [];
        if (topMenu) workActionsMenus.push(topMenu);
        if (bottomMenu && bottomMenu !== topMenu) workActionsMenus.push(bottomMenu);

        if (workActionsMenus.length === 0) return;

        // Styles
        const baseStyle = 'cursor: pointer !important;';
        const unselectedStyle = baseStyle;

        // Arrays to hold all injected buttons for global updates
        const readBtns = [];
        const markBtns = [];
        const doNotReadBtns = [];
        const wtrBtns = [];

        // --- Click Handlers (Logic + UI updates) ---

        // 1. Mark Read (Work Inteiro - Verde)
        const readClickHandler = async () => {
            isRead = !isRead;
            if (isRead) {
                delete lastReadChapters[workId];
                await saveLastReadChapter(lastReadChapters);
                delete doNotReadWorks[workId];
                await saveDoNotRead(doNotReadWorks);
                isPartial = false; isDoNotRead = false;
                syncBookmarkToAO3(workId);
            }
            readWorks[workId] = isRead ? { timestamp: Date.now() } : undefined;
            if (!isRead) delete readWorks[workId];
            await saveReadWorks(readWorks);

            // [WTR] Auto-cleanup on work page: remove from queue when marking as read
            if (isRead && _wtrSettings.enabled && _wtrQueue[workId]) {
                await removeFromWTRQueue(workId);
                delete _wtrQueue[workId];
                window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
                refreshWTRHeaderDropdown();
            }

            // [STATS] Integração Automática (Snapshot Delta)
            if (isRead && window.stats && STATS_CONFIG_ENABLED) {
                const meta = extractUniversalMetadata(document);
                await updateStorageEntry(READ_WORKS_KEY, workId, {
                    timestamp: Date.now(),
                    meta: meta
                });
                readWorks[workId] = { timestamp: Date.now(), meta };

                if (window.stats) {
                    await window.stats.recordWorkRead(workId, meta);
                }
            }

            updateReadButtonState();
            updateDoNotReadButtonState();
            updateMarkChapterButtonState();
            if (_wtrSettings.enabled) updateWtrButtonState();

            window.globalPageData.readWorks = readWorks;
            window.globalPageData.lastReadChapters = lastReadChapters;
            window.globalPageData.doNotReadWorks = doNotReadWorks;

            if (isRead) {
                await injectStarRatingOnWorkPage(workId, currentChapterIndex, titleElement);
            }
        };

        function updateReadButtonState(button) {
            const btnsToUpdate = button && button instanceof Element ? [button] : readBtns;
            btnsToUpdate.forEach(btn => {
                if (isRead) {
                    btn.textContent = 'Read ✔';
                    btn.style.cssText = `${baseStyle} background: ${CUSTOM_COLORS.READ} !important; color: #ffffff !important;`;
                } else {
                    btn.textContent = 'Mark as Read';
                    btn.style.cssText = unselectedStyle;
                }
            });
        }

        // 2. Chapter Read (Capítulo Individual - Azul)
        const markChapterClickHandler = async () => {
            const chapterHeading = document.querySelector('.chapter.preface h3');
            const chapterTitle = chapterHeading ? chapterHeading.textContent.trim() : 'Chapter/Work';

            let chapterNumber = null;
            const chapterMatch = chapterTitle.match(/chapter (\d+)/i);
            if (chapterMatch && chapterMatch[1]) chapterNumber = parseInt(chapterMatch[1], 10);

            if (isPartial) {
                delete lastReadChapters[workId];
                isPartial = false;
            } else {
                const meta = extractUniversalMetadata(document);

                await updateStorageEntry(LAST_READ_CHAPTER_KEY, workId, {
                    title: chapterTitle,
                    url: currentChapterURL,
                    timestamp: Date.now(),
                    chapter: chapterNumber,
                    meta: meta
                });

                lastReadChapters[workId] = { title: chapterTitle, url: currentChapterURL, timestamp: Date.now(), chapter: chapterNumber, meta: meta };
                isPartial = true;

                delete readWorks[workId];
                delete doNotReadWorks[workId];
                isRead = false;
                isDoNotRead = false;

                syncBookmarkToAO3(workId);

                if (_wtrSettings.enabled && _wtrQueue[workId]) {
                    await removeFromWTRQueue(workId);
                    delete _wtrQueue[workId];
                    window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
                    refreshWTRHeaderDropdown();
                }

                if (window.stats && STATS_CONFIG_ENABLED) {
                    const userStuff = document.querySelector('div.userstuff');
                    if (userStuff) {
                        let meta = extractUniversalMetadata(document);
                        meta.chapterIndex = chapterNumber || '1';
                        await window.stats.recordManualRead(workId, userStuff.innerText, meta);
                    }
                }
            }

            await saveLastReadChapter(lastReadChapters);
            await saveReadWorks(readWorks);
            await saveDoNotRead(doNotReadWorks);

            updateMarkChapterButtonState();
            updateReadButtonState();
            updateDoNotReadButtonState();
            if (_wtrSettings.enabled) updateWtrButtonState();

            window.globalPageData.readWorks = readWorks;
            window.globalPageData.lastReadChapters = lastReadChapters;
            window.globalPageData.doNotReadWorks = doNotReadWorks;

            if (isPartial) {
                await injectStarRatingOnWorkPage(workId, currentChapterIndex, titleElement);
            }
        };

        function updateMarkChapterButtonState(button) {
            const btnsToUpdate = button && button instanceof Element ? [button] : markBtns;
            btnsToUpdate.forEach(btn => {
                if (isPartial) {
                    btn.textContent = 'Chapter Read';
                    btn.style.cssText = `${baseStyle} background: ${CUSTOM_COLORS.PARTIAL} !important; color: #ffffff !important;`;
                } else {
                    btn.textContent = 'Chapter Read';
                    btn.style.cssText = unselectedStyle;
                }
            });
        }

        // 3. Do Not Read
        const doNotReadClickHandler = async () => {
            isDoNotRead = !isDoNotRead;
            if (isDoNotRead) {
                delete readWorks[workId];
                await saveReadWorks(readWorks);
                delete lastReadChapters[workId];
                await saveLastReadChapter(lastReadChapters);
                isRead = false; isPartial = false;
            }
            doNotReadWorks[workId] = isDoNotRead ? true : undefined;
            if (!isDoNotRead) delete doNotReadWorks[workId];

            if (_wtrSettings.enabled) updateWtrButtonState();

            await saveDoNotRead(doNotReadWorks);
            updateDoNotReadButtonState();
            updateReadButtonState();
            updateMarkChapterButtonState();

            window.globalPageData.readWorks = readWorks;
            window.globalPageData.lastReadChapters = lastReadChapters;
            window.globalPageData.doNotReadWorks = doNotReadWorks;

            await injectStarRatingOnWorkPage(workId, currentChapterIndex, titleElement);
        };

        function updateDoNotReadButtonState(button) {
            const btnsToUpdate = button && button instanceof Element ? [button] : doNotReadBtns;
            btnsToUpdate.forEach(btn => {
                if (isDoNotRead) {
                    btn.textContent = 'Do Not Read X';
                    btn.style.cssText = `${baseStyle} background: ${CUSTOM_COLORS.DONOTREAD} !important; color: #ffffff !important;`;
                } else {
                    btn.textContent = 'Mark Do Not Read';
                    btn.style.cssText = unselectedStyle;
                }
            });
        }

        // --- WANT TO READ BUTTON ---
        function hasWorkProgress() {
            return !!readWorks[workId] || !!lastReadChapters[workId];
        }

        const wtrClickHandler = async () => {
            if (!_wtrSettings.enabled || hasWorkProgress()) return;
            const isInWTR = !!_wtrQueue[workId];
            const meta = extractUniversalMetadata(document);
            if (isInWTR) {
                await removeFromWTRQueue(workId);
                delete _wtrQueue[workId];
            } else {
                await addToWTRQueue(workId, { title: meta?.title || 'Unknown', author: meta?.author || 'Unknown' });
                _wtrQueue[workId] = { addedAt: Date.now(), title: meta?.title || 'Unknown', author: meta?.author || 'Unknown', ao3BookmarkCreated: false };
                if (_wtrSettings.syncBookmarks && typeof syncWTRBookmarkToAO3 === 'function') {
                    syncWTRBookmarkToAO3(workId, _wtrSettings.tag);
                }
            }
            window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
            refreshWTRHeaderDropdown();
            updateWtrButtonState();
        };

        function updateWtrButtonState(button) {
            const btnsToUpdate = button && button instanceof Element ? [button] : wtrBtns;
            btnsToUpdate.forEach(btn => {
                const isInWTR = !!_wtrQueue[workId];
                if (hasWorkProgress()) {
                    btn.textContent = 'Want to Read';
                    btn.style.cssText = `${unselectedStyle} opacity: 0.5; pointer-events: none;`;
                    btn.title = 'Already read – cannot add to WTR';
                } else if (isInWTR) {
                    btn.textContent = 'Remove from WTR';
                    btn.style.cssText = `${baseStyle} background: ${CUSTOM_COLORS.WTR || '#6f42c1'} !important; color: #ffffff !important;`;
                    btn.title = 'Remove from Want to Read';
                } else {
                    btn.textContent = 'Want to Read';
                    btn.style.cssText = unselectedStyle;
                    btn.title = 'Add to Want to Read';
                }
            });
        }

        // 4. [STATS] Botão de Log Manual (+ Log Stats)
        const logStatsHandler = async () => {
            const userStuff = document.querySelector('div.userstuff');
            if (!userStuff) {
                safeNotify('Could not find chapter text to count.');
                return;
            }

            const chapterHeading = document.querySelector('.chapter.preface h3');
            const chapterTitle = chapterHeading ? chapterHeading.textContent.trim() : 'Chapter/Work';
            let chapterNumber = 'Current';
            const chapterMatch = chapterTitle.match(/chapter (\d+)/i);
            if (chapterMatch && chapterMatch[1]) chapterNumber = chapterMatch[1];

            let meta = extractUniversalMetadata(document);
            meta.chapterIndex = chapterNumber;

            if (window.stats) {
                await window.stats.recordManualRead(workId, userStuff.innerText, meta);
            }
        };

        // Inject in all matching menus
        workActionsMenus.forEach((menu, index) => {
            const isTopMenu = index === 0;

            const listItemRead = createActionItem('Mark as Read', readClickHandler, updateReadButtonState);
            readBtns.push(listItemRead.firstChild);
            menu.appendChild(listItemRead);

            const listItemMark = createActionItem('Chapter Read', markChapterClickHandler, updateMarkChapterButtonState);
            markBtns.push(listItemMark.firstChild);
            menu.appendChild(listItemMark);

            if (isTopMenu) {
                const listItemDoNotRead = createActionItem('Mark Do Not Read', doNotReadClickHandler, updateDoNotReadButtonState);
                doNotReadBtns.push(listItemDoNotRead.firstChild);
                menu.appendChild(listItemDoNotRead);

                if (_wtrSettings.enabled) {
                    const listItemWtr = createActionItem('Want to Read', wtrClickHandler, updateWtrButtonState);
                    wtrBtns.push(listItemWtr.firstChild);
                    menu.appendChild(listItemWtr);
                }

                const listItemLog = createActionItem('+ Re-read', logStatsHandler);
                listItemLog.firstChild.title = "Manually log this chapter's word count to your yearly stats (Re-read)";
                menu.appendChild(listItemLog);
            }
        });
    }

    async function handleUserDashboard() {
        // Verifica se é o PRÓPRIO dashboard do usuário (segurança visual)
        const greeting = document.querySelector('#greeting ul li a');
        const currentUsername = greeting ? greeting.href.split('/users/')[1] : null;

        // Se a URL contém o username logado
        if (currentUsername && window.location.pathname.includes(currentUsername)) {
            // Carrega UI do Widget
            if (window.ui && window.ui.renderDashboardWidget) {
                await window.ui.renderDashboardWidget();
            }
        }
    }

    // ============================================================
    //  WTR Header Dropdown
    // ============================================================

    /**
     * Injects the WTR bookmark icon + dropdown into ul.user.navigation.
     * Called once on page load if PRO + wtr_enabled + wtr_show_header_menu.
     */
    async function initWTRHeaderDropdown() {
        if (!_wtrSettings.enabled || !_wtrSettings.showHeaderMenu) return;
        if (document.getElementById('ao3-wtr-header-li')) return;

        const targetContainer = document.querySelector('#header ul.user.navigation') ||
            document.querySelector('ul.navigation.actions');
        if (!targetContainer) return;

        const li = document.createElement('li');
        li.id = 'ao3-wtr-header-li';
        li.className = 'dropdown';

        const toggle = document.createElement('a');
        toggle.href = 'javascript:void(0)';
        toggle.setAttribute('aria-label', 'Want to Read queue');
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span class="wtr-count-badge" id="wtr-header-count" data-count="0">0</span>`;

        const dropdown = document.createElement('ul');
        dropdown.id = 'ao3-wtr-dropdown';
        dropdown.className = 'menu dropdown-menu';

        li.appendChild(toggle);
        li.appendChild(dropdown);
        targetContainer.appendChild(li);

        // Populate initial state
        renderWTRDropdownItems(dropdown);

        // Toggle open/close
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = li.classList.toggle('open');
            // Force display inline to override AO3 scripts that might hide it
            dropdown.style.display = isOpen ? 'block' : 'none';
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!li.contains(e.target)) {
                li.classList.remove('open');
                dropdown.style.display = 'none';
            }
        });
    }

    /**
     * Re-renders the WTR dropdown contents and count badge.
     * Call after any queue mutation (add/remove/auto-cleanup).
     */
    function refreshWTRHeaderDropdown() {
        const dropdown = document.getElementById('ao3-wtr-dropdown');
        if (dropdown) renderWTRDropdownItems(dropdown);
    }

    /**
     * Returns a human-readable relative time string for a Unix timestamp.
     * @param {number} timestamp  Unix ms timestamp (e.g. Date.now())
     * @returns {string}  e.g. "Just now", "3 mins ago", "2 days ago"
     */
    function timeSince(timestamp) {
        if (!timestamp) return '';
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
        const years = Math.floor(months / 12);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }

    function renderWTRDropdownItems(dropdown) {
        dropdown.innerHTML = '';
        const entries = Object.entries(_wtrQueue);

        // Update count badge
        const badge = document.getElementById('wtr-header-count');
        if (badge) {
            badge.textContent = String(entries.length);
            badge.setAttribute('data-count', String(entries.length));
        }

        if (entries.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'wtr-dropdown-empty';
            empty.textContent = 'Your Want to Read list is empty.';
            dropdown.appendChild(empty);
            return;
        }

        // Sort by addedAt descending
        entries.sort((a, b) => (b[1].addedAt || 0) - (a[1].addedAt || 0));

        entries.forEach(([workId, entry]) => {
            const item = document.createElement('li');
            item.className = 'wtr-dropdown-item';

            const info = document.createElement('div');
            info.className = 'wtr-item-info';

            const titleLink = document.createElement('a');
            titleLink.href = `https://archiveofourown.org/works/${workId}`;
            titleLink.className = 'wtr-item-title';
            titleLink.textContent = entry.title || `Work ${workId}`;
            titleLink.title = entry.title || '';

            const authorSpan = document.createElement('span');
            authorSpan.className = 'wtr-item-author';
            authorSpan.textContent = entry.author ? `by ${entry.author}` : '';
            authorSpan.textContent = entry.addedAt ? authorSpan.textContent + ` - Added ${timeSince(entry.addedAt)}` : authorSpan.textContent;

            info.appendChild(titleLink);
            info.appendChild(authorSpan);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'wtr-item-remove';
            removeBtn.type = 'button';
            removeBtn.textContent = '✕';
            removeBtn.title = 'Remove from Want to Read';
            removeBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await removeFromWTRQueue(workId);
                delete _wtrQueue[workId];
                window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
                renderWTRDropdownItems(dropdown);
                // Update WTR button on listing if visible
                const blurbEl = document.querySelector(`[data-work-id="${workId}"]`);
                if (blurbEl) {
                    const wtrBtnEl = blurbEl.querySelector('.marker-action-wtr');
                    if (wtrBtnEl) {
                        wtrBtnEl.classList.remove('wtr-active');
                        wtrBtnEl.title = 'Add to Want to Read';
                    }
                }
            });

            item.appendChild(info);
            item.appendChild(removeBtn);
            dropdown.appendChild(item);
        });
    }


    async function injectReviewIcon(workId, titleElement, currentChapterIndex) {
        const options = await storage.local.get(ENABLE_REVIEWS_KEY);
        if (!options[ENABLE_REVIEWS_KEY]) return;

        if (!titleElement) {
            titleElement = document.querySelector('div.chapter h3.title');
            if (!titleElement) {
                titleElement = document.querySelector('h2.title.heading');
            }
        }

        if (!currentChapterIndex) {
            currentChapterIndex = "1";
            if (titleElement) {
                const match = titleElement.textContent.match(/Chapter (\d+)/);
                if (match) currentChapterIndex = match[1];
            }
        }

        if (!titleElement) return;
        if (document.getElementById('marker-review-toggle-icon')) return;

        const PENCIL_ICON_SVG = `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.561 2.439a2.121 2.121 0 0 0-3 0L3.81 13.189A2.094 2.094 0 0 0 3 14.605V17a1 1 0 0 0 1 1h2.395a2.094 2.094 0 0 0 1.416-.811L17.56 6.439a2.121 2.121 0 0 0 0-3zM5.879 16H5v-.879l7.02-7.02 1.878 1.879L5.879 16zM16.146 5.025l-1.879-1.879L15.72 1.79a1.121 1.121 0 0 1 1.586 0l.94.94a1.121 1.121 0 0 1 0 1.586l-2.099 2.1z"/></svg>`;

        const toggleIcon = document.createElement('a');
        toggleIcon.href = 'javascript:void(0)';
        toggleIcon.id = 'marker-review-toggle-icon';
        toggleIcon.className = 'marker-review-toggle-icon';
        toggleIcon.title = 'Show/Hide Chapter Review';
        toggleIcon.innerHTML = PENCIL_ICON_SVG;

        toggleIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openReviewModal(workId, currentChapterIndex);
        });
        titleElement.appendChild(toggleIcon);

        // --- Inject Floating Review Button ---
        if (typeof injectFloatingReviewButton === 'function') {
            injectFloatingReviewButton(workId, currentChapterIndex);
        }

        // --- Inject Star Rating Component ---
        await injectStarRatingOnWorkPage(workId, currentChapterIndex, titleElement);
    }

    async function injectStarRatingOnWorkPage(workId, chapterIndex, targetElement) {
        // Check if work has been read (at least chapter marked as read)
        let allowRating = false;
        if (window.globalPageData) {
            allowRating = !!(window.globalPageData.readWorks && window.globalPageData.readWorks[workId]) || !!(window.globalPageData.lastReadChapters && window.globalPageData.lastReadChapters[workId]);
        }
        if (!allowRating) {
            // Fallback: check storage directly
            const [localRead, localLast] = await Promise.all([loadReadWorks(), loadLastReadChapter()]);
            allowRating = !!localRead[workId] || !!localLast[workId];
        }

        // Get existing stars container
        const existingStars = document.getElementById(`marker-rating-stars-${workId}`);

        // Only show rating if chapter has been read
        if (!allowRating) {
            // Remove stars if they exist and work is no longer read
            if (existingStars) {
                existingStars.remove();
            }
            return;
        }

        // If stars already exist, no need to recreate
        if (existingStars) return;

        // Obtém total de capítulos da obra
        const metadata = extractUniversalMetadata(document);
        const totalChapters = metadata?.chapterCount || 1;

        // Carrega o rating atual
        const currentRating = await (async () => {
            const ratings = await loadChapterRatings();
            if (ratings[workId] && ratings[workId][chapterIndex]) {
                return ratings[workId][chapterIndex];
            }
            return 0;
        })();

        // Cria o container das estrelas (permitir avaliar na página da obra somente se já leu)
        const starsContainer = window.ratingUI.createStarContainer(currentRating, async (newRating) => {
            await saveChapterRating(workId, chapterIndex, newRating, totalChapters);
        }, true, true);

        starsContainer.id = `marker-rating-stars-${workId}`;
        starsContainer.style.cssText = `
            display: inline-flex;
            margin-left: 8px;
            vertical-align: middle;
        `;

        targetElement.appendChild(starsContainer);
    }

    async function applyBookmarkAutoSort() {
        if (!window.location.href.includes('/bookmarks')) return;
        const options = await storage.local.get(ENABLE_BOOKMARK_SORT_KEY);
        if (!options[ENABLE_BOOKMARK_SORT_KEY]) return;

        const url = new URL(window.location.href);
        const hasSortParam = url.searchParams.has('bookmark_search[sort_column]');

        if (!hasSortParam) {
            url.searchParams.set('bookmark_search[sort_column]', 'bookmarkable_date');
            window.location.replace(url.href);
            throw new Error('Redirecting to sorted bookmarks');
        }
    }

    // --- List Processing Logic ---

    async function processBlurbs(blurbElements, allData) {
        const baseBtnStyle = 'display: inline-block; padding: 2px 5px; margin-right: 5px; font-size: 0.9em; color: #ffffff; border-radius: 4px; cursor: pointer; text-decoration: none; line-height: 1;';
        const unselectedStyle = `${baseBtnStyle} background-color: #6c757d;`;

        for (const blurbElement of blurbElements) {
            if (blurbElement.getAttribute('data-marker-processed')) continue;

            // Identify Elements
            let link, datetimeElement, header;
            const isBookmarkBlurb = blurbElement.classList.contains('bookmark');

            if (isBookmarkBlurb) {
                link = blurbElement.querySelector('h4.heading a[href*="/works/"]');
                datetimeElement = blurbElement.querySelector('p.datetime');
                header = blurbElement.querySelector('h4.heading');
            } else {
                link = blurbElement.querySelector('h4.heading a');
                datetimeElement = blurbElement.querySelector('.datetime');
                header = blurbElement.querySelector('h4.heading');
            }

            if (!link || !datetimeElement || !header) continue;

            const workIdMatch = link.href.match(/works\/(\d+)/);
            if (!workIdMatch) continue;
            const workId = workIdMatch[1];

            blurbElement.setAttribute('data-marker-processed', 'true');
            blurbElement.setAttribute('data-work-id', workId);

            const workUpdatedTimestamp = getWorkUpdateTime(blurbElement);

            // Get Status
            let isRead = !!allData.readWorks[workId];
            let isPartial = !!allData.lastReadChapters[workId];
            let isDoNotRead = !!allData.doNotReadWorks[workId];

            // Add Buttons
            const buttonContainer = document.createElement('span');
            buttonContainer.className = 'marker-button-box';
            buttonContainer.style.cssText = 'display: block; margin-top: 2px; text-align: center;';

            const fragment = document.createDocumentFragment();

            const readBtn = document.createElement('a');
            readBtn.href = 'javascript:void(0)';
            readBtn.className = 'marker-action-read';
            readBtn.textContent = '✔';
            readBtn.style.cssText = unselectedStyle;
            fragment.appendChild(readBtn);

            const doNotReadBtn = document.createElement('a');
            doNotReadBtn.href = 'javascript:void(0)';
            doNotReadBtn.className = 'marker-action-do-not-read';
            doNotReadBtn.textContent = 'X';
            doNotReadBtn.style.cssText = unselectedStyle;
            fragment.appendChild(doNotReadBtn);

            // [WTR] Bookmark SVG icon (inline, inherits currentColor)
            const WTR_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
            const wtrBtn = document.createElement('a');
            wtrBtn.href = 'javascript:void(0)';
            wtrBtn.className = 'marker-action-wtr';
            wtrBtn.innerHTML = WTR_ICON_SVG;
            wtrBtn.title = 'Add to Want to Read';
            // Only render if WTR feature is enabled
            if (_wtrSettings.enabled) {
                const isInWTR = !!_wtrQueue[workId];
                if (isInWTR) {
                    wtrBtn.classList.add('wtr-active');
                    wtrBtn.title = 'Remove from Want to Read';
                }
                if (isRead || isPartial) {
                    wtrBtn.style.opacity = '0.3';
                    wtrBtn.style.pointerEvents = 'none';
                    wtrBtn.title = 'Already read – cannot add to WTR';
                }
                fragment.appendChild(wtrBtn);
            }

            buttonContainer.appendChild(fragment);
            datetimeElement.appendChild(buttonContainer);

            // Add Click Lock
            let isProcessingMarker = false;

            // --- Listeners ---
            readBtn.addEventListener('click', async (e) => {
                e.preventDefault(); e.stopPropagation();
                if (isProcessingMarker) return;
                isProcessingMarker = true;

                try {
                    // Reload latest data
                    const [localRead, localLast, localDNR] = await Promise.all([loadReadWorks(), loadLastReadChapter(), loadDoNotRead()]);
                    let currentIsRead = !!localRead[workId];

                    if (currentIsRead) {
                        delete localRead[workId];
                    } else {
                        const meta = extractUniversalMetadata(blurbElement);
                        await updateStorageEntry(READ_WORKS_KEY, workId, {
                            timestamp: Date.now(),
                            meta: meta
                        });

                        // Atualiza local para UI e outras limpezas
                        localRead[workId] = { timestamp: Date.now(), meta };
                        delete localDNR[workId];
                        delete localLast[workId];
                        syncBookmarkToAO3(workId);
                    }
                    await Promise.all([saveReadWorks(localRead), saveDoNotRead(localDNR), saveLastReadChapter(localLast)]);

                    // [STATS] Integração Automática na Lista (Snapshot)
                    // Se marcou como lido na lista, tenta pegar metadados do blurb
                    if (!currentIsRead && window.stats && STATS_CONFIG_ENABLED) {
                        const meta = extractUniversalMetadata(blurbElement);
                        await window.stats.recordWorkRead(workId, meta);
                    }

                    // Update Global Cache & UI
                    window.globalPageData.readWorks = localRead;
                    window.globalPageData.doNotReadWorks = localDNR;
                    window.globalPageData.lastReadChapters = localLast;

                    updateBlurbVisualState(blurbElement, !currentIsRead, false, false, localRead[workId], workUpdatedTimestamp);
                    applyFilterToAllBlurbs();

                    // [WTR] Auto-cleanup: if marking as read, remove from WTR queue
                    if (!currentIsRead && _wtrSettings.enabled && _wtrQueue[workId]) {
                        await removeFromWTRQueue(workId);
                        delete _wtrQueue[workId];
                        window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
                        const wtrBtnEl = blurbElement.querySelector('.marker-action-wtr');
                        if (wtrBtnEl) {
                            wtrBtnEl.classList.remove('wtr-active');
                            wtrBtnEl.style.opacity = '0.3';
                            wtrBtnEl.style.pointerEvents = 'none';
                            wtrBtnEl.title = 'Already read – cannot add to WTR';
                        }
                        refreshWTRHeaderDropdown();
                    }

                    // Update rating stars visibility
                    const enableReviewsOpt = await storage.local.get(ENABLE_REVIEWS_KEY);
                    if (enableReviewsOpt[ENABLE_REVIEWS_KEY]) {
                        await injectStarRatingOnBlurb(workId, blurbElement, datetimeElement);
                    }
                } finally {
                    isProcessingMarker = false;
                }
            });

            doNotReadBtn.addEventListener('click', async (e) => {
                e.preventDefault(); e.stopPropagation();
                if (isProcessingMarker) return;
                isProcessingMarker = true;

                try {
                    const [localRead, localLast, localDNR] = await Promise.all([loadReadWorks(), loadLastReadChapter(), loadDoNotRead()]);
                    let currentIsDNR = !!localDNR[workId];

                    if (currentIsDNR) {
                        delete localDNR[workId];
                    } else {
                        localDNR[workId] = true;
                        delete localRead[workId];
                        delete localLast[workId];
                    }
                    await Promise.all([saveReadWorks(localRead), saveDoNotRead(localDNR), saveLastReadChapter(localLast)]);

                    window.globalPageData.readWorks = localRead;
                    window.globalPageData.doNotReadWorks = localDNR;
                    window.globalPageData.lastReadChapters = localLast;

                    updateBlurbVisualState(blurbElement, false, false, !currentIsDNR, null, workUpdatedTimestamp);
                    applyFilterToAllBlurbs();

                    // Update rating stars visibility
                    const enableReviewsOpt = await storage.local.get(ENABLE_REVIEWS_KEY);
                    if (enableReviewsOpt[ENABLE_REVIEWS_KEY]) {
                        await injectStarRatingOnBlurb(workId, blurbElement, datetimeElement);
                    }
                } finally {
                    isProcessingMarker = false;
                }
            });

            // --- Add Star Rating Component to Blurb ---
            const enableReviewsOpt = await storage.local.get(ENABLE_REVIEWS_KEY);
            if (enableReviewsOpt[ENABLE_REVIEWS_KEY]) {
                await injectStarRatingOnBlurb(workId, blurbElement, datetimeElement);
            }

            // Initial Visual Update
            let relevantTimestampData = isRead ? allData.readWorks[workId] : (isPartial ? allData.lastReadChapters[workId] : null);
            updateBlurbVisualState(blurbElement, isRead, isPartial, isDoNotRead, relevantTimestampData, workUpdatedTimestamp);

            // [WTR] Wire up WTR button click listener
            if (_wtrSettings.enabled) {
                wtrBtn.addEventListener('click', async (e) => {
                    e.preventDefault(); e.stopPropagation();
                    if (!_wtrSettings.enabled) return;
                    const isInWTR = !!_wtrQueue[workId];
                    const meta = extractUniversalMetadata(blurbElement);
                    if (isInWTR) {
                        await removeFromWTRQueue(workId);
                        delete _wtrQueue[workId];
                        wtrBtn.classList.remove('wtr-active');
                        wtrBtn.title = 'Add to Want to Read';
                    } else {
                        await addToWTRQueue(workId, { title: meta?.title || 'Unknown', author: meta?.author || 'Unknown' });
                        _wtrQueue[workId] = { addedAt: Date.now(), title: meta?.title || 'Unknown', author: meta?.author || 'Unknown', ao3BookmarkCreated: false };
                        wtrBtn.classList.add('wtr-active');
                        wtrBtn.title = 'Remove from Want to Read';
                        if (_wtrSettings.syncBookmarks && typeof syncWTRBookmarkToAO3 === 'function') {
                            syncWTRBookmarkToAO3(workId, _wtrSettings.tag);
                        }
                    }
                    window._wtrQueueIds = new Set(Object.keys(_wtrQueue));
                    refreshWTRHeaderDropdown();
                });
            }
        }
        applyFilterToAllBlurbs();
    }

    async function injectStarRatingOnBlurb(workId, blurbElement, targetElement) {
        // Carrega o rating geral da obra (média dos capítulos)
        const currentRating = await window.stats.getWorkAverageRating(workId);
        // Only show stars in listings if the work has been marked read or at least one chapter was read
        let allowedInList = false;
        if (window.globalPageData) {
            allowedInList = !!(window.globalPageData.readWorks && window.globalPageData.readWorks[workId]) || !!(window.globalPageData.lastReadChapters && window.globalPageData.lastReadChapters[workId]);
        }
        if (!allowedInList) {
            // Fallback: check storage directly
            const [localRead, localLast] = await Promise.all([loadReadWorks(), loadLastReadChapter()]);
            allowedInList = !!localRead[workId] || !!localLast[workId];
        }

        // Get existing stars container
        const existingStars = blurbElement.querySelector(`#marker-rating-stars-blurb-${workId}`);

        if (!allowedInList) {
            // Remove stars if they exist and work is no longer read
            if (existingStars) {
                existingStars.remove();
            }
            return;
        }

        // If stars already exist, no need to recreate
        if (existingStars) return;

        // Cria o container das estrelas (permitir avaliar na listagem somente porque o usuário já leu algo)
        const starsContainer = window.ratingUI.createStarContainer(currentRating || 0, async (newRating) => {
            const totalChapters = extractUniversalMetadata(blurbElement)?.chapterCount;
            await saveChapterRating(workId, 'global', newRating, totalChapters);
            // console.log(`[Rating] Work ${workId} (global rating on blurb): ${newRating} stars`);
        }, false, true); //workPage = false

        starsContainer.id = `marker-rating-stars-blurb-${workId}`;
        starsContainer.className = 'ao3-star-rating compact';
        starsContainer.style.cssText = `
            display: block;
            text-align: center;
            margin-top: 5px;
            margin-bottom: 5px;
        `;

        targetElement.appendChild(starsContainer);
    }

    // --- Infinite Scroll Logic ---
    function setupInfiniteScroll() {
        storage.local.get(['ao3_infinite_scroll_global', 'ao3_infinite_scroll_general', 'ao3_infinite_scroll_bookmarks'], (items) => {
            const globalEnabled = items.ao3_infinite_scroll_global !== false;
            const generalEnabled = items.ao3_infinite_scroll_general !== false;
            const bookmarksEnabled = items.ao3_infinite_scroll_bookmarks !== false;

            if (!globalEnabled) return;
            if (isBookmarkPage && !bookmarksEnabled) return;
            if (!isBookmarkPage && !generalEnabled) return;

            const paginations = document.querySelectorAll('ol.pagination');
            paginations.forEach(p => p.style.display = 'none');

            // Não agendar observer se estamos em página de bookmarks COM agrupamento
            if (isBookmarkPage && isBookmarkGroupingMode) return;

            let loadingSpinner = document.getElementById('marker-loading-spinner');
            if (!loadingSpinner) {
                // Spinner normal como li (nunca será div porque bookmarks COM agrupamento já retorna acima)
                const blurbContainer = document.querySelector('ol.work.index, ol.bookmark.index, ol.reading.index');
                if (!blurbContainer) return;

                loadingSpinner = document.createElement('li');
                loadingSpinner.id = 'marker-loading-spinner';
                loadingSpinner.style.cssText = 'display: list-item; padding: 20px; height: 50px; text-align: center;';

                const spinnerDiv = document.createElement('div');
                spinnerDiv.className = 'marker-spinner';
                spinnerDiv.style.display = 'none';
                loadingSpinner.appendChild(spinnerDiv);
                blurbContainer.parentNode.appendChild(loadingSpinner);
            }
            observer.observe(loadingSpinner);
        });
    }

    // --- Bookmark manual-loading UI ---
    function setupBookmarkLoadMore() {
        storage.local.get(['ao3_infinite_scroll_global', 'ao3_infinite_scroll_bookmarks'], (items) => {
            const globalEnabled = items.ao3_infinite_scroll_global !== false;
            const bookmarksEnabled = items.ao3_infinite_scroll_bookmarks !== false;

            if (!globalEnabled || !bookmarksEnabled) return;

            // remove paginação nativa
            const paginations = document.querySelectorAll('ol.pagination');
            paginations.forEach(p => p.style.display = 'none');

            // Determine onde inserir o botão (abaixo das pastas se houver)
            let referenceNode = null;
            if (isBookmarkGroupingMode) {
                referenceNode = document.getElementById('ao3-folder-container');
            } else {
                const blurbContainer = document.querySelector('ol.bookmark.index, ol.work.index, ol.reading.index');
                referenceNode = blurbContainer ? blurbContainer.parentNode : null;
            }
            if (!referenceNode) return;

            // container único que também servirá como elemento de carregamento
            const container = document.createElement('div');
            container.id = 'marker-loading-spinner';
            container.style.cssText = 'text-align:center; padding:20px;';

            const button = document.createElement('a');
            button.id = 'marker-load-more';
            button.href = '#';
            button.className = 'next_page'; // reproduce estilo de link de paginação ao3
            button.textContent = 'Load more works';
            container.appendChild(button);

            const spinnerEl = document.createElement('div');
            spinnerEl.className = 'marker-spinner';
            spinnerEl.style.display = 'none';
            container.appendChild(spinnerEl);

            // inserir depois da referência detectada
            if (referenceNode.nextSibling) {
                referenceNode.parentNode.insertBefore(container, referenceNode.nextSibling);
            } else {
                referenceNode.parentNode.appendChild(container);
            }

            button.addEventListener('click', async (e) => {
                e.preventDefault();
                if (isLoadingNextPage) return;
                button.style.display = 'none';
                spinnerEl.style.display = 'block';
                await loadNextPage();
                // spinner escondido e botão mostrado novamente (se aplicável) por loadNextPage
            });
        });
    }

    function handleScrollObserver(entries) {
        const lastEntry = entries[entries.length - 1];
        if (lastEntry.isIntersecting && !isLoadingNextPage) {
            loadNextPage();
        }
    }

    async function loadNextPage() {
        isLoadingNextPage = true;
        const spinner = document.getElementById('marker-loading-spinner');
        const spinnerAnimation = spinner ? spinner.querySelector('.marker-spinner') : null;
        if (spinnerAnimation) spinnerAnimation.style.display = 'inline-block';

        // se houver um botão manual, esconda-o imediatamente
        const manualButton = document.getElementById('marker-load-more');
        if (manualButton) manualButton.style.display = 'none';

        currentPage++;
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('page', currentPage);

        try {
            const response = await fetch(nextUrl.href);
            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const newBlurbs = doc.querySelectorAll('li.work.blurb, li.bookmark.blurb, li.reading.work.blurb');

            if (newBlurbs.length > 0) {
                const liveNewBlurbs = [];

                if (isBookmarkGroupingMode) {
                    // Modo agrupado: adiciona à lista original invisível primeiro
                    const mainList = document.querySelector('ol.bookmark.index');
                    if (mainList) {
                        newBlurbs.forEach(blurb => {
                            const importedBlurb = document.importNode(blurb, true);
                            mainList.appendChild(importedBlurb);
                            liveNewBlurbs.push(importedBlurb);
                        });
                    }
                    // processAndGroupBookmarks já chama processBlurbs internamente
                    await processAndGroupBookmarks(liveNewBlurbs);
                } else {
                    // Modo normal: adiciona à lista normalmente
                    const blurbContainer = document.querySelector('ol.work.index, ol.bookmark.index, ol.reading.index');
                    newBlurbs.forEach(blurb => {
                        const importedBlurb = document.importNode(blurb, true);
                        blurbContainer.appendChild(importedBlurb);
                        liveNewBlurbs.push(importedBlurb);
                    });
                    await processBlurbs(liveNewBlurbs, window.globalPageData);
                }

                // [WTR] Re-apply WTR filter to newly loaded blurbs
                if (_wtrSettings.enabled && window._wtrFilterActive) {
                    const newLiveBlurbs = document.querySelectorAll('li.work.blurb, li.bookmark.blurb, li.reading.work.blurb');
                    if (typeof applyWTRFilterToBlurbs === 'function') {
                        applyWTRFilterToBlurbs(newLiveBlurbs);
                    }
                }

                // se for manual, reaparece o botão
                if (manualButton) manualButton.style.display = '';
            } else {
                if (manualButton) {
                    manualButton.remove();
                }
                if (spinner) spinner.textContent = 'No more works to load.';
                observer.disconnect();
            }
        } catch (error) {
            if (spinner) spinner.textContent = 'Error loading content.';
            observer.disconnect();
        }
        if (spinnerAnimation) spinnerAnimation.style.display = 'none';
        isLoadingNextPage = false;
    }


    // --- Lógica de Agrupamento Dinâmico ---

    async function processAndGroupBookmarks(bookmarkElements) {
        if (!bookmarkElements || bookmarkElements.length === 0) return;

        if (!window.globalPageData || Object.keys(window.globalPageData).length === 0) {
            // Load Data
            window.globalPageData = {
                readWorks: await loadReadWorks(),
                lastReadChapters: await loadLastReadChapter(),
                doNotReadWorks: await loadDoNotRead(),
                isFilterActive: await loadFilterState()
            };
        }

        // 1. APLICA TODAS AS FUNCIONALIDADES DA EXTENSÃO PRIMEIRO (Req 1)
        // Chama a mesma função que você usa na listagem para colocar cores e botões
        if (typeof processBlurbs === 'function') {
            await processBlurbs(bookmarkElements, window.globalPageData);
        }

        // 2. PREPARA O CONTAINER PRINCIPAL (Req 5 - Layout Respeitado)
        let container = document.getElementById('ao3-folder-container');
        const mainList = document.querySelector('ol.bookmark.index');

        if (!container && mainList) {
            // Esconde a lista original, mas não a deleta (para não quebrar scripts do AO3)
            mainList.style.display = 'none';

            container = document.createElement('div');
            container.id = 'ao3-folder-container';
            // A posição ideal agora é imediatamente após o formulário de filtros de bookmarks
            // (conforme requisito recente). Se o formulário existir, use-o como referência;
            // caso contrário, caia de volta para antes da lista principal como medida de
            // emergência.
            const filterForm = document.querySelector('form#bookmark-filters.filters.narrow-hidden');
            if (filterForm && filterForm.parentNode) {
                filterForm.parentNode.insertBefore(container, filterForm.nextSibling);
            } else {
                mainList.parentNode.insertBefore(container, mainList);
            }

            // Ajusta margens dinamicamente para ficar entre menu esquerdo e filtro direito
            try {
                adjustFolderContainerSpacing(container);
                if (!window.__ao3_folder_spacing_listener_added) {
                    // Debounce o resize para evitar múltiplas chamadas
                    let resizeTimeout;
                    window.addEventListener('resize', () => {
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(() => {
                            const folderContainer = document.getElementById('ao3-folder-container');
                            if (folderContainer) {
                                adjustFolderContainerSpacing(folderContainer);
                            }
                        }, 250);
                    });
                    window.__ao3_folder_spacing_listener_added = true;
                }
            } catch (e) {
                // falha silenciosa se o DOM do site for incompatível
            }
        }

        if (!container) return; // Se não achou onde colocar, aborta.

        const miscKey = "Other / Misc.";

        // 3. DISTRIBUI OS ITENS NAS PASTAS (Req 2 - Infinite Scroll Support)
        bookmarkElements.forEach(li => {
            // Remove da lista original invisível para não duplicar no DOM
            if (li.parentNode) li.parentNode.removeChild(li);

            // Descobre o Fandom
            const fandomElement = li.querySelector('h5.fandoms a');
            let fandomName = fandomElement ? fandomElement.textContent.trim() : miscKey;
            if (fandomName.includes(',')) fandomName = fandomName.split(',')[0].trim(); // Pega só o primeiro

            // Usa escape do CSS para evitar erros com fandoms que têm aspas ou caracteres estranhos
            const safeFandomSelector = CSS.escape(fandomName);

            // Tenta achar a pasta já existente
            let folderWrapper = container.querySelector(`[data-fandom="${safeFandomSelector}"]`);

            // Se a pasta não existe, cria ela
            if (!folderWrapper) {
                folderWrapper = createFolderElement(fandomName);
                container.appendChild(folderWrapper);
            }

            // Insere a fic na lista interna da pasta
            const internalList = folderWrapper.querySelector('ol.group-list');
            internalList.appendChild(li);
        });

        // Atualiza os contadores APÓS todos os itens serem distribuídos
        Array.from(container.children).forEach(folderWrapper => {
            const internalList = folderWrapper.querySelector('ol.group-list');
            const countSpan = folderWrapper.querySelector('.marker-group-count');
            // Conta todos os <li> diretos sem depender de classes específicas
            const itemsCount = internalList ? internalList.children.length : 0;
            if (countSpan) countSpan.textContent = `${itemsCount}`;
        });

        // 4. ORDENA AS PASTAS EM ORDEM ALFABÉTICA
        // É importante reordenar sempre que o Infinite Scroll trouxer um fandom novo
        const allFolders = Array.from(container.children);
        allFolders.sort((a, b) => {
            const nameA = a.dataset.fandom;
            const nameB = b.dataset.fandom;
            if (nameA === miscKey) return 1;
            if (nameB === miscKey) return -1;
            return nameA.localeCompare(nameB);
        });

        // Reanexa na ordem correta
        allFolders.forEach(folder => container.appendChild(folder));

        // Atualiza os contadores após agrupar os itens
        // (reflete o filtro ativo se houver)
        updateGroupCountsBasedOnFilter();
    }

    // Atualiza a contagem das pastas com base na visibilidade dos itens (para refletir filtros)
    function updateGroupCountsBasedOnFilter() {
        const container = document.getElementById('ao3-folder-container');
        if (!container) return;

        Array.from(container.children).forEach(folderWrapper => {
            const internalList = folderWrapper.querySelector('ol.group-list');
            const countSpan = folderWrapper.querySelector('.marker-group-count');

            if (!internalList || !countSpan) return;

            // Conta apenas os <li> que estão visíveis (display !== 'none')
            const visibleItems = Array.from(internalList.children).filter(li => {
                const style = window.getComputedStyle(li);
                return style.display !== 'none';
            }).length;

            countSpan.textContent = `${visibleItems}`;
        });
    }

    // Função para aplicar a cor selecionada ao wrapper da pasta
    function applyFolderColor(wrapper, color) {
        if (!color || color === 'none') {
            // Remove a cor customizada e volta ao estilo padrão
            wrapper.style.backgroundColor = '';
            wrapper.style.borderColor = '';
            wrapper.dataset.folderColor = '';
            return;
        }

        // Converte hex para RGB para usar com opacity
        const hex = color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Aplica cor de fundo com baixa opacidade
        wrapper.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
        // Aplica cor na borda
        wrapper.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
        // Armazena a cor como atributo para referência
        wrapper.dataset.folderColor = color;
    }

    // Expõe a função para que ui.js possa chamá-la quando o filtro mudar
    window.updateGroupCountsBasedOnFilter = updateGroupCountsBasedOnFilter;

    // Função auxiliar para criar a estrutura HTML da pasta
    function createFolderElement(fandomName) {
        const wrapper = document.createElement('div');
        wrapper.className = 'marker-group-wrapper';
        wrapper.dataset.fandom = fandomName; // Guarda o nome para o seletor encontrar depois

        const header = document.createElement('div');
        header.className = 'marker-group-header';

        // Cria o elemento de título
        const titleSpan = document.createElement('span');
        titleSpan.className = 'marker-group-title';
        titleSpan.innerHTML = `<span class="folder-icon">▶</span> ${fandomName}`;

        // Carrega cor salva no localStorage se existir
        const savedColor = localStorage.getItem(`marker-folder-color-${fandomName}`);

        // Cria o container para controles de cor
        const colorControlsContainer = document.createElement('span');
        colorControlsContainer.className = 'marker-color-controls';

        // Cria o seletor de cor (círculo clicável)
        const colorCircle = document.createElement('input');
        colorCircle.type = 'color';
        colorCircle.className = 'marker-folder-color';
        colorCircle.value = savedColor && savedColor !== 'none' ? savedColor : '#ffffff';
        colorCircle.title = 'Choose folder color';

        // Cria o botão de reset de cor
        const resetColorBtn = document.createElement('button');
        resetColorBtn.className = 'marker-reset-color';
        resetColorBtn.textContent = '✕';
        resetColorBtn.title = 'Remove color';

        // Adiciona círculo de cor e botão de reset ao container
        colorControlsContainer.appendChild(colorCircle);
        colorControlsContainer.appendChild(resetColorBtn);

        // Cria o elemento de contagem
        const countSpan = document.createElement('span');
        countSpan.className = 'marker-group-count';
        countSpan.textContent = '0';

        // Monta o header com os elementos
        header.appendChild(titleSpan);
        header.appendChild(colorControlsContainer);
        header.appendChild(countSpan);

        const content = document.createElement('div');
        content.className = 'marker-group-content'; // Sem a classe .open (Req 4)

        const internalList = document.createElement('ol');
        internalList.className = 'bookmark index group group-list'; // Classes do AO3 para manter o estilo interno

        content.appendChild(internalList);
        wrapper.appendChild(header);
        wrapper.appendChild(content);

        // Aplica a cor salva ao wrapper se existir e não for 'none'
        if (savedColor && savedColor !== 'none') {
            applyFolderColor(wrapper, savedColor);
        }

        // Evento de Click no seletor de cor
        colorCircle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita abrir/fechar a pasta
        });

        // Evento de mudança de cor
        colorCircle.addEventListener('change', (e) => {
            const newColor = e.target.value;
            localStorage.setItem(`marker-folder-color-${fandomName}`, newColor);
            applyFolderColor(wrapper, newColor);
        });

        // Evento de reset de cor
        resetColorBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita abrir/fechar a pasta
            localStorage.setItem(`marker-folder-color-${fandomName}`, 'none');
            colorCircle.value = '#ffffff';
            applyFolderColor(wrapper, 'none');
        });

        // Evento de Click no header para abrir/fechar
        header.addEventListener('click', (e) => {
            // Não abre se clicou no seletor de cor ou no botão de reset
            if (e.target === colorCircle || e.target === resetColorBtn) return;
            content.classList.toggle('open');
            wrapper.classList.toggle('wrapper-open'); // Para animar a setinha no CSS
        });

        return wrapper;
    }

    // ============================================================
    // TEXT HIGHLIGHTS — UI & Integration (PRO Feature)
    // ============================================================

    // Singleton floating menu element
    let _hlFloatingMenu = null;
    let _hlSelectionDebounce = null;

    /**
     * Initializes the highlight feature on a work page.
     * Loads saved highlights, reconstructs them, and sets up event listeners.
     */
    async function initHighlightFeature(workId, chapterIndex, container, isProUser) {
        // 1. Load saved highlights from storage
        const storageKey = `ao3_hl_${workId}`;
        const stored = await new Promise(resolve => {
            storage.local.get(storageKey, items => {
                resolve(items[storageKey] || null);
            });
        });

        let workHighlights = stored;
        if (typeof workHighlights === 'string') {
            try { workHighlights = JSON.parse(workHighlights); } catch (e) { workHighlights = null; }
        }

        const chapterHighlights = workHighlights?.chapters?.[String(chapterIndex)] || [];

        // 1.5 Setup Minimap/Ghost Track Layer BEFORE reconstruction
        let track = document.getElementById('ao3-scrollbar-track');
        if (!track) {
            track = document.createElement('div');
            track.id = 'ao3-scrollbar-track';
            document.body.appendChild(track);

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const existingTrack = document.getElementById('ao3-scrollbar-track');
                    if (!existingTrack) return;
                    existingTrack.innerHTML = ''; // clear track

                    const marks = document.querySelectorAll('mark.ao3-pro-highlight');
                    const drawnIds = new Set();
                    marks.forEach(mark => {
                        const hlId = mark.dataset.hlId;
                        if (!hlId || drawnIds.has(hlId)) return;
                        drawnIds.add(hlId);

                        const absoluteTop = mark.getBoundingClientRect().top + window.scrollY;
                        const percentage = (absoluteTop / document.documentElement.scrollHeight) * 100;
                        const marker = document.createElement('div');
                        marker.className = 'ao3-scroll-marker';
                        marker.dataset.hlId = hlId;

                        const colorMatch = Array.from(mark.classList).find(c => c.startsWith('ao3-hl-mark-'));
                        if (mark.style.backgroundColor) {
                            marker.style.backgroundColor = mark.style.backgroundColor;
                        } else if (colorMatch) {
                            marker.classList.add(colorMatch);
                        }

                        marker.style.top = percentage + '%';
                        existingTrack.appendChild(marker);
                    });
                }, 200);
            });
        }

        // 2. Reconstruct saved highlights on the DOM
        if (chapterHighlights.length > 0) {
            window.highlights.reconstructHighlights(container, chapterHighlights);
        }

        // 3. Create the floating menu element (singleton)
        _hlFloatingMenu = createHlFloatingMenu();
        document.body.appendChild(_hlFloatingMenu);

        // 4. Setup event listeners
        setupHlSelectionListeners(container, workId, chapterIndex, isProUser);
        setupHlClickListeners(container, workId, chapterIndex, isProUser);

        // 5. Dismiss menu on outside click/tap
        document.addEventListener('mousedown', (e) => {
            if (_hlFloatingMenu && !_hlFloatingMenu.contains(e.target)) {
                hideHlMenu();
            }
        }, true);
        document.addEventListener('touchstart', (e) => {
            if (_hlFloatingMenu && !_hlFloatingMenu.contains(e.target) && !e.target.closest('mark.ao3-pro-highlight')) {
                hideHlMenu();
            }
        }, { passive: true });
    }

    function getAo3ThemeMode() {
        try {
            const bgColor = window.getComputedStyle(document.body).backgroundColor;
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                const R = parseInt(rgb[0], 10);
                const G = parseInt(rgb[1], 10);
                const B = parseInt(rgb[2], 10);
                const luma = (R * 299 + G * 587 + B * 114) / 1000;
                return luma < 128 ? "dark" : "light";
            }
        } catch (e) {
            console.error("Error detecting AO3 theme mode:", e);
        }
        return "light";
    }

    /**
     * Creates the singleton floating menu DOM element.
     */
    function createHlFloatingMenu() {
        const menu = document.createElement('div');
        menu.className = 'ao3-hl-color-menu';
        menu.style.display = 'none';
        menu.setAttribute('role', 'toolbar');
        menu.setAttribute('aria-label', 'Highlight actions');

        const themeMode = getAo3ThemeMode();
        menu.classList.add(`ao3-marker-theme-${themeMode}`);

        return menu;
    }

    /**
     * Shows the floating menu at a given position.
     * Clamps position to viewport boundaries for mobile.
     *
     * @param {DOMRect} anchorRect - The bounding rect to position near
     * @param {Object} options - { currentColor: string|null, onSelectColor: Function, onRemove: Function }
     */
    function showHlMenu(anchorRect, options = {}) {
        if (!_hlFloatingMenu) return;

        // Clear previous content
        _hlFloatingMenu.innerHTML = '';

        const colors = ['yellow', 'pink', 'green', 'purple'];
        colors.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ao3-hl-swatch-btn';
            btn.dataset.color = color;

            const isCurrent = options.currentColor === color;
            if (isCurrent) {
                btn.classList.add('active-remove');
                // Clean SVG X mark
                btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                btn.title = `Remove highlight`;
            } else {
                btn.title = `Highlight in ${color}`;
            }

            const handleAction = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isCurrent && options.onRemove) {
                    options.onRemove();
                } else if (options.onSelectColor) {
                    options.onSelectColor(color);
                }
                hideHlMenu();
            };

            btn.addEventListener('click', handleAction);
            btn.addEventListener('touchend', handleAction, { passive: false });
            _hlFloatingMenu.appendChild(btn);
        });

        // ── Smart Viewport Evasion Positioning ──────────────────────────────
        // JS cannot detect the native OS text-selection menu (Copy/Share), but
        // we can *predict* where it will be based on available viewport space.
        //
        // NOTE: We use position:fixed for ALL paths so the coordinates are always
        // relative to the visible viewport. This makes the menu immune to any
        // browser-native chrome (address bar, native menu bar, etc.) that sits
        // outside the CSS viewport — including Opera GX's native menu bar which
        // caused the menu to render beneath it when using position:absolute.
        const scrollX = window.scrollX || window.pageXOffset;
        const vpWidth = document.documentElement.clientWidth;
        const vpHeight = window.innerHeight;

        // Make the menu visible (needed for measurement) but off-screen first
        _hlFloatingMenu.style.position = 'fixed';
        _hlFloatingMenu.style.top = '-9999px';
        _hlFloatingMenu.style.left = '-9999px';
        _hlFloatingMenu.style.bottom = '';
        _hlFloatingMenu.style.transform = '';
        _hlFloatingMenu.style.display = 'flex';

        const menuWidth = _hlFloatingMenu.offsetWidth || 200;
        const menuHeight = _hlFloatingMenu.offsetHeight || 50;

        const spaceAbove = anchorRect.top;
        const isTouchScreen = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

        // All coordinates are now in fixed/viewport space (anchorRect values
        // are already viewport-relative from getBoundingClientRect).
        let menuTop;

        if (!isTouchScreen) {
            // ── Desktop: prefer above the selection ─────────────────────────
            // Use a larger safe-zone (menuHeight + 40) so we also clear any
            // extra browser chrome like Opera GX's native menu bar.
            if (spaceAbove >= menuHeight + 40) {
                menuTop = anchorRect.top - menuHeight - 10;
            } else {
                // Not enough room above — flip below the selection
                menuTop = anchorRect.bottom + 10;
            }
        } else {
            // ── Mobile: predict native OS menu position ──────────────────────
            // Native OS menu needs ~80px. It sits above the selection when
            // spaceAbove >= 100, or is pushed below when spaceAbove < 100.
            if (spaceAbove >= 100) {
                // Scenario A: OS menu is at TOP → anchor our menu safely below
                menuTop = anchorRect.bottom + 20;
            } else {
                // Scenario B: OS menu was forced BOTTOM → push our menu further down
                menuTop = anchorRect.bottom + 90;
            }
        }

        // ── Horizontal centering (clamped to viewport) ───────────────────────
        const margin = 8;
        let menuLeft = anchorRect.left + (anchorRect.width / 2) - (menuWidth / 2);
        if (menuLeft < margin) menuLeft = margin;
        if (menuLeft + menuWidth > vpWidth - margin) {
            menuLeft = vpWidth - menuWidth - margin;
        }

        // ── Failsafe: if menu falls below visible area, dock to bottom center ─
        if (menuTop + menuHeight > vpHeight - margin) {
            _hlFloatingMenu.style.top = 'auto';
            _hlFloatingMenu.style.bottom = '20px';
            _hlFloatingMenu.style.left = '50%';
            _hlFloatingMenu.style.transform = 'translateX(-50%)';
        } else {
            // Clamp to top of viewport as a last resort
            if (menuTop < margin) menuTop = margin;
            _hlFloatingMenu.style.top = menuTop + 'px';
            _hlFloatingMenu.style.left = menuLeft + 'px';
        }
    }

    function hideHlMenu() {
        if (_hlFloatingMenu) {
            _hlFloatingMenu.style.display = 'none';
            _hlFloatingMenu.innerHTML = '';
        }
    }

    function showProHighlightsPaywall() {
        if (document.getElementById('ao3-pro-paywall-overlay')) return;

        const themeMode = getAo3ThemeMode();

        const overlay = document.createElement('div');
        overlay.id = 'ao3-pro-paywall-overlay';

        // Prevent clicks on overlay from propagating (keeps text highlighted)
        overlay.addEventListener('mousedown', (e) => e.stopPropagation(), true);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        const modal = document.createElement('div');
        modal.id = 'ao3-pro-paywall-modal';
        modal.className = `ao3-marker-theme-${themeMode}`;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'ao3-paywall-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => overlay.remove();

        const header = document.createElement('h3');
        header.textContent = '🖍️ Unlock Multi-Color Highlights';

        const desc = document.createElement('p');
        desc.textContent = 'Mark your favorite quotes! Organize them by color in your personal Notebook.';

        const extAPI = (typeof browser !== 'undefined' ? browser : chrome);
        const GUMROAD_CHECKOUT_URL = 'https://gumroad.com/l/ao3AdvancedMarkerPro';

        // External CDN URLs — assets are NOT bundled in the extension package.
        // Files are hosted on the public GitHub Pages repo via jsDelivr CDN.
        const DEMO_MEDIA_BASE = 'https://cdn.jsdelivr.net/gh/Leehsuus/leehsuus.github.io@main/assets/';
        const DEMO_MEDIA = {
            highlight: DEMO_MEDIA_BASE + 'highlight-demo.webp',
            bookmarks: DEMO_MEDIA_BASE + 'bookmarks-demo.webp',
            wtr:       DEMO_MEDIA_BASE + 'wtr-demo.webp',
        };

        /**
         * Creates a lazy-loading demo media element.
         * The network request fires only when this function is called (i.e., when
         * the modal/panel is opened), not at extension init time.
         * @param {string} src - External CDN URL for the WebP asset.
         * @param {string} alt - Accessible alt text.
         * @returns {HTMLElement} Wrapper div with shimmer + img inside.
         */
        function createLazyDemoMedia(src, alt) {
            const wrapper = document.createElement('div');
            wrapper.className = 'ao3-demo-media-wrapper';
            if (themeMode === 'dark') wrapper.classList.add('ao3-marker-theme-dark');

            const img = document.createElement('img');
            img.alt = alt;
            img.className = 'pro-demo-gif';
            img.src = src; // Setting src here triggers the fetch — deferred until modal opens

            img.addEventListener('load', () => {
                img.classList.add('ao3-demo-loaded'); // Fade in on success
            }, { once: true });

            img.addEventListener('error', () => {
                wrapper.style.display = 'none'; // Silently hide on CDN failure
            }, { once: true });

            wrapper.appendChild(img);
            return wrapper;
        }

        const gifContainer = document.createElement('div');
        gifContainer.className = 'ao3-paywall-gif-container';
        gifContainer.appendChild(createLazyDemoMedia(DEMO_MEDIA.highlight, 'Highlights Demonstration'));


        const cta = document.createElement('a');
        cta.className = 'ao3-paywall-cta action';
        cta.href = GUMROAD_CHECKOUT_URL;
        cta.target = '_blank';
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            // Estratégia consistente, adaptada para rodar dentro do content script (enviando mensagem ao background):
            if (extAPI && extAPI.runtime) {
                extAPI.runtime.sendMessage({ action: 'openTab', url: GUMROAD_CHECKOUT_URL });
            } else {
                window.open(GUMROAD_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
            }
        });
        cta.textContent = 'Upgrade to PRO';

        modal.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(desc);
        modal.appendChild(gifContainer);
        modal.appendChild(cta);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    async function initProShowcase() {
        // Checagem segura via storage
        storage.local.get(['is_pro_user', 'hide_pro_showcase'], (settings) => {
            if (settings.is_pro_user || settings.hide_pro_showcase) return;

            const themeMode = getAo3ThemeMode();

            // Botão Flutuante (estilo AssistiveTouch)
            const btn = document.createElement('div');
            btn.id = 'ao3-pro-showcase-btn';
            btn.className = `ao3-marker-theme-${themeMode}`;
            btn.innerHTML = '👑';
            btn.title = 'Discover PRO Features';

            // Painel Expansível
            const panel = document.createElement('div');
            panel.id = 'ao3-pro-showcase-panel';
            panel.className = `ao3-marker-theme-${themeMode}`;

            const headerContainer = document.createElement('div');
            headerContainer.className = 'ao3-showcase-header';

            const headerTextGroup = document.createElement('div');
            headerTextGroup.style.display = 'flex';
            headerTextGroup.style.flexDirection = 'column';
            headerTextGroup.style.alignItems = 'flex-start';

            const headerTitle = document.createElement('h3');
            headerTitle.textContent = '✨ Discover AO3 Advanced Marker PRO';

            const hideLink = document.createElement('a');
            hideLink.className = 'ao3-showcase-hide-link';
            hideLink.href = '#';
            hideLink.textContent = 'Hide Showcase Icon Permanently';
            hideLink.onclick = (e) => {
                e.preventDefault();
                storage.local.set({ hide_pro_showcase: true });
                btn.remove();
                panel.remove();
            };

            headerTextGroup.appendChild(headerTitle);
            headerTextGroup.appendChild(hideLink);

            const closeBtn = document.createElement('button');
            closeBtn.className = 'ao3-showcase-close';
            closeBtn.innerHTML = '×';
            closeBtn.onclick = () => {
                storage.local.set({ hide_pro_showcase: true });
                panel.classList.remove('open');
                setTimeout(() => { panel.remove(); btn.remove(); }, 300);
            };

            headerContainer.appendChild(headerTextGroup);
            headerContainer.appendChild(closeBtn);

            const extAPI = (typeof browser !== 'undefined' ? browser : chrome);
            const GUMROAD_CHECKOUT_URL = 'https://gumroad.com/l/ao3AdvancedMarkerPro';

            // External CDN URLs — assets are NOT bundled in the extension package.
            const DEMO_MEDIA_BASE = 'https://cdn.jsdelivr.net/gh/Leehsuus/leehsuus.github.io@main/assets/';
            const DEMO_MEDIA = {
                highlight: DEMO_MEDIA_BASE + 'highlight-demo.webp',
                bookmarks: DEMO_MEDIA_BASE + 'bookmarks-demo.webp',
                wtr:       DEMO_MEDIA_BASE + 'wtr-demo.webp',
            };

            /**
             * Creates a lazy-loading demo media element for the showcase panel.
             * Network request deferred until this function is called (panel open).
             */
            function createLazyDemoMedia(src, alt) {
                const wrapper = document.createElement('div');
                wrapper.className = 'ao3-demo-media-wrapper';
                if (themeMode === 'dark') wrapper.classList.add('ao3-marker-theme-dark');

                const img = document.createElement('img');
                img.alt = alt;
                img.className = 'pro-demo-gif';
                img.src = src;

                img.addEventListener('load', () => {
                    img.classList.add('ao3-demo-loaded');
                }, { once: true });

                img.addEventListener('error', () => {
                    wrapper.style.display = 'none';
                }, { once: true });

                wrapper.appendChild(img);
                return wrapper;
            }

            const featContainer = document.createElement('div');
            featContainer.className = 'ao3-showcase-features';

            // Feature card: Text Highlights
            const featHl = document.createElement('div');
            featHl.className = 'ao3-showcase-feature';
            const featHlTitle = document.createElement('h4');
            featHlTitle.textContent = '🖍️ Text Highlights';
            const featHlDesc = document.createElement('p');
            featHlDesc.textContent = 'Multi-color marking and Personal Notebook.';
            const featHlGifPh = document.createElement('div');
            featHlGifPh.className = 'ao3-showcase-gif-ph';
            featHlGifPh.appendChild(createLazyDemoMedia(DEMO_MEDIA.highlight, 'Highlights Demonstration'));
            featHl.appendChild(featHlTitle);
            featHl.appendChild(featHlDesc);
            featHl.appendChild(featHlGifPh);

            // Feature card: Smart Bookmark Folders
            const featFolder = document.createElement('div');
            featFolder.className = 'ao3-showcase-feature';
            const featFolderTitle = document.createElement('h4');
            featFolderTitle.textContent = '📁 Smart Bookmark Folders';
            const featFolderDesc = document.createElement('p');
            featFolderDesc.textContent = 'Automatic fandom-based sorting and organization.';
            const featFolderGifPh = document.createElement('div');
            featFolderGifPh.className = 'ao3-showcase-gif-ph';
            featFolderGifPh.appendChild(createLazyDemoMedia(DEMO_MEDIA.bookmarks, 'Bookmarks Folders Demonstration'));
            featFolder.appendChild(featFolderTitle);
            featFolder.appendChild(featFolderDesc);
            featFolder.appendChild(featFolderGifPh);

            // Feature card: Want To Read
            const featWtr = document.createElement('div');
            featWtr.className = 'ao3-showcase-feature';
            const featWtrTitle = document.createElement('h4');
            featWtrTitle.textContent = '📚 Want To Read';
            const featWtrDesc = document.createElement('p');
            featWtrDesc.textContent = 'Queue fics to read later and quickly access them from any page.';
            const featWtrGifPh = document.createElement('div');
            featWtrGifPh.className = 'ao3-showcase-gif-ph';
            featWtrGifPh.appendChild(createLazyDemoMedia(DEMO_MEDIA.wtr, 'Want To Read Demonstration'));
            featWtr.appendChild(featWtrTitle);
            featWtr.appendChild(featWtrDesc);
            featWtr.appendChild(featWtrGifPh);

            featContainer.appendChild(featHl);
            featContainer.appendChild(featFolder);
            featContainer.appendChild(featWtr);

            const footer = document.createElement('div');
            footer.className = 'ao3-showcase-footer';

            const ctaBtn = document.createElement('a');
            ctaBtn.className = 'ao3-paywall-cta action';
            ctaBtn.href = GUMROAD_CHECKOUT_URL;
            ctaBtn.textContent = 'Upgrade to PRO';
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (extAPI && extAPI.runtime) {
                    extAPI.runtime.sendMessage({ action: 'openTab', url: GUMROAD_CHECKOUT_URL });
                } else {
                    window.open(GUMROAD_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
                }
            });

            footer.appendChild(ctaBtn);

            panel.appendChild(headerContainer);
            panel.appendChild(featContainer);
            panel.appendChild(footer);

            document.body.appendChild(btn);
            document.body.appendChild(panel);

            // Ações
            btn.addEventListener('click', () => {
                btn.style.display = 'none';
                panel.style.display = 'flex';
                setTimeout(() => panel.classList.add('open'), 10);
            });
        });
    }

    /**
     * Sets up listeners that detect text selection completion
     * on both desktop (mouseup) and mobile (touchend + selectionchange debounce).
     */
    function setupHlSelectionListeners(container, workId, chapterIndex, isProUser) {
        // Helper: process a completed selection
        function handleSelectionEnd() {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const selectedText = range.toString().trim();
            if (!selectedText || selectedText.length === 0) return;

            // Ensure selection is within the story content
            if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) return;

            // Safe closest check
            const getMark = (node) => {
                if (!node) return null;
                if (node.nodeType === Node.ELEMENT_NODE) {
                    return node.closest('mark.ao3-pro-highlight');
                }
                if (node.parentNode && node.parentNode.nodeType === Node.ELEMENT_NODE) {
                    return node.parentNode.closest('mark.ao3-pro-highlight');
                }
                return null;
            };

            const startMark = getMark(range.startContainer);
            const endMark = getMark(range.endContainer);
            if (startMark || endMark) {
                return;
            }

            const rect = range.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return;

            storage.local.get(['is_pro_user', 'ao3_enable_highlights'], (settings) => {
                const userIsPro = !!settings.is_pro_user;
                const highlightsEnabledSetting = !!settings.ao3_enable_highlights;

                const shouldShowMenu = !userIsPro || (userIsPro && highlightsEnabledSetting);
                if (!shouldShowMenu) return;

                showHlMenu(rect, {
                    onSelectColor: async (selectedColor) => {
                        if (!userIsPro) {
                            showProHighlightsPaywall();
                            return;
                        }

                        // Serialize the selection
                        const hlDescriptor = window.highlights.serializeSelection(range, container);
                        if (!hlDescriptor) return;

                        hlDescriptor.color = selectedColor; // Save chosen color


                        // Scrape metadata
                        const titleElement = document.querySelector('h2.title.heading');
                        const authorElement = document.querySelector('a[rel="author"]');
                        let workTitle = 'Unknown Work';
                        if (titleElement) {
                            const cloneTitle = titleElement.cloneNode(true);
                            cloneTitle.querySelectorAll('[class*="rating"], [class*="marker"], [class*="star"]').forEach(el => el.remove());
                            workTitle = cloneTitle.textContent.replace(/\s+/g, ' ').trim() || 'Unknown Work';
                        }
                        const workAuthor = authorElement ? authorElement.textContent.trim() : 'Unknown Author';

                        // For Chapter Title: AO3 usually has <h3 class="title"> in chaptered works
                        const chapterTitleEl = document.querySelector('h3.title') || document.querySelector('div.chapter h3.title');
                        let chapterName = `Chapter ${chapterIndex}`;
                        if (chapterTitleEl) {
                            const clone = chapterTitleEl.cloneNode(true);
                            // Remove extensions injected elements that mess up the title text
                            clone.querySelectorAll('[class*="rating"], [class*="marker"], [class*="star"]').forEach(el => el.remove());
                            chapterName = clone.textContent.replace(/\s+/g, ' ').trim() || `Chapter ${chapterIndex}`;
                        }

                        hlDescriptor.chapterName = chapterName;

                        // Capture the chapter-specific URL.
                        // Chapter-by-chapter mode: AO3 provides a <select> with the chapters list,
                        // and the chapter ID is already in window.location.href.
                        // "Show Entire Work" mode: URL has no chapter segment — use clean page URL.
                        // Strategy: prefer the canonical /chapters/ID path from the URL if present,
                        // otherwise use the clean page URL (stripping query params).
                        const currentPath = window.location.pathname; // e.g. /works/12345/chapters/67890
                        const chapterPathMatch = currentPath.match(/\/works\/\d+\/chapters\/\d+/);
                        hlDescriptor.chapterUrl = chapterPathMatch
                            ? 'https://archiveofourown.org' + chapterPathMatch[0]
                            : window.location.origin + currentPath; // strip query params (?view_full_work=true etc)

                        // Apply visual highlight
                        // Need to get a fresh range since the selection may have changed
                        const freshSelection = window.getSelection();
                        if (freshSelection && freshSelection.rangeCount > 0) {
                            const freshRange = freshSelection.getRangeAt(0);
                            window.highlights.applyHighlightToRange(freshRange, hlDescriptor.id, hlDescriptor.color);
                            freshSelection.removeAllRanges();
                        }

                        // Save to storage
                        await saveHighlightToStorage(workId, chapterIndex, hlDescriptor, { workTitle, workAuthor });

                        // Trigger minimap update
                        window.dispatchEvent(new Event('resize'));
                    }
                });
            });
        }

        // Desktop: mouseup inside the content
        container.addEventListener('mouseup', (e) => {
            // Ignore if it was on the floating menu
            if (_hlFloatingMenu && _hlFloatingMenu.contains(e.target)) return;
            // Share the debounce timer with selectionchange so only one fires
            clearTimeout(_hlSelectionDebounce);
            _hlSelectionDebounce = setTimeout(handleSelectionEnd, 10);
        });

        // Mobile: touchend + selectionchange with debounce
        container.addEventListener('touchend', () => {
            // On mobile, the selection isn't always finalized at touchend.
            // Use selectionchange with debounce instead.
            clearTimeout(_hlSelectionDebounce);
            _hlSelectionDebounce = setTimeout(handleSelectionEnd, 300);
        }, { passive: true });

        // Also listen for selectionchange globally (covers mobile long-press selection handles)
        document.addEventListener('selectionchange', () => {
            clearTimeout(_hlSelectionDebounce);
            _hlSelectionDebounce = setTimeout(() => {
                const selection = window.getSelection();
                if (!selection || selection.isCollapsed) return;
                if (selection.rangeCount === 0) return;
                const range = selection.getRangeAt(0);
                if (!container.contains(range.startContainer)) return;
                handleSelectionEnd();
            }, 400);
        });
    }

    /**
     * Sets up click/tap listener on existing highlights to show "Remove" option.
     */
    function setupHlClickListeners(container, workId, chapterIndex, isProUser) {
        container.addEventListener('click', (e) => {
            const mark = e.target.closest('mark.ao3-pro-highlight');
            if (!mark) return;

            e.preventDefault();
            e.stopPropagation();

            // Clear any active selection to avoid conflicting menus
            window.getSelection()?.removeAllRanges();

            const highlightId = mark.getAttribute('data-hl-id');
            if (!highlightId) return;

            const rect = mark.getBoundingClientRect();

            // Extract current color from the mark class
            let currentColor = 'yellow';
            Array.from(mark.classList).forEach(cls => {
                if (cls.startsWith('ao3-hl-mark-')) {
                    currentColor = cls.replace('ao3-hl-mark-', '');
                }
            });

            showHlMenu(rect, {
                currentColor: currentColor,
                onRemove: async () => {
                    // Remove from DOM
                    window.highlights.removeHighlightById(highlightId);

                    // Remove from storage
                    await removeHighlightFromStorage(workId, chapterIndex, highlightId);

                    // Trigger minimap update
                    window.dispatchEvent(new Event('resize'));
                },
                onSelectColor: async (newColor) => {
                    if (!isProUser) {
                        showProHighlightsPaywall();
                        return;
                    }
                    // Update DOM classes for all segments of this highlight
                    const marks = document.querySelectorAll(`mark.ao3-pro-highlight[data-hl-id="${highlightId}"]`);
                    marks.forEach(m => {
                        m.className = 'ao3-pro-highlight'; // reset
                        m.classList.add(`ao3-hl-mark-${newColor}`);
                    });

                    // Update Storage
                    if (typeof updateHighlightColorInStorage === 'function') {
                        await updateHighlightColorInStorage(workId, chapterIndex, highlightId, newColor);
                    }

                    // Trigger minimap update
                    window.dispatchEvent(new Event('resize'));
                }
            });
        });
    }

    /**
     * Updates the color of an existing highlight in storage.
     */
    async function updateHighlightColorInStorage(workId, chapterIndex, highlightId, newColor) {
        const storageKey = `ao3_hl_${workId}`;
        const chapterKey = String(chapterIndex);

        const stored = await new Promise(resolve => {
            storage.local.get(storageKey, items => {
                resolve(items[storageKey] || null);
            });
        });

        let workData = stored;
        if (typeof workData === 'string') {
            try { workData = JSON.parse(workData); } catch (e) { return; }
        }
        if (!workData || !workData.chapters || !workData.chapters[chapterKey]) return;

        const idx = workData.chapters[chapterKey].findIndex(hl => hl.id === highlightId);
        if (idx !== -1) {
            workData.chapters[chapterKey][idx].color = newColor;
            await new Promise(resolve => {
                storage.local.set({ [storageKey]: workData }, resolve);
            });
        }
    }

    /**
     * Saves a highlight descriptor to storage under ao3_hl_${workId}.
     */
    async function saveHighlightToStorage(workId, chapterIndex, hlDescriptor, metadata = {}) {
        const storageKey = `ao3_hl_${workId}`;
        const chapterKey = String(chapterIndex);

        // Load existing data
        const stored = await new Promise(resolve => {
            storage.local.get(storageKey, items => {
                resolve(items[storageKey] || null);
            });
        });

        let workData = stored;
        if (typeof workData === 'string') {
            try { workData = JSON.parse(workData); } catch (e) { workData = null; }
        }
        if (!workData || typeof workData !== 'object') {
            workData = { chapters: {} };
        }

        // Set top level metadata if not present or changed
        if (metadata.workTitle) workData.workTitle = metadata.workTitle;
        if (metadata.workAuthor) workData.workAuthor = metadata.workAuthor;

        if (!workData.chapters) workData.chapters = {};
        if (!workData.chapters[chapterKey]) workData.chapters[chapterKey] = [];

        // Append the new highlight
        workData.chapters[chapterKey].push(hlDescriptor);

        // Save back
        await new Promise(resolve => {
            storage.local.set({ [storageKey]: workData }, resolve);
        });

        safeLog(`[Highlights] Saved highlight ${hlDescriptor.id} for work ${workId} ch.${chapterIndex}`);
    }

    /**
     * Removes a highlight from storage by its ID.
     */
    async function removeHighlightFromStorage(workId, chapterIndex, highlightId) {
        const storageKey = `ao3_hl_${workId}`;
        const chapterKey = String(chapterIndex);

        const stored = await new Promise(resolve => {
            storage.local.get(storageKey, items => {
                resolve(items[storageKey] || null);
            });
        });

        let workData = stored;
        if (typeof workData === 'string') {
            try { workData = JSON.parse(workData); } catch (e) { workData = null; }
        }
        if (!workData?.chapters?.[chapterKey]) return;

        // Filter out the highlight by ID
        workData.chapters[chapterKey] = workData.chapters[chapterKey].filter(
            hl => hl.id !== highlightId
        );

        // Clean up empty chapter arrays
        if (workData.chapters[chapterKey].length === 0) {
            delete workData.chapters[chapterKey];
        }

        // Clean up empty work objects
        if (Object.keys(workData.chapters).length === 0) {
            await new Promise(resolve => {
                storage.local.remove(storageKey, resolve);
            });
        } else {
            await new Promise(resolve => {
                storage.local.set({ [storageKey]: workData }, resolve);
            });
        }

        safeLog(`[Highlights] Removed highlight ${highlightId} from work ${workId} ch.${chapterIndex}`);
    }

})();