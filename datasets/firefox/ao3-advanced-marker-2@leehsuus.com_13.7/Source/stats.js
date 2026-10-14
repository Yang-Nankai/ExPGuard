// stats.js - Gamificação e Rastreamento de Leitura (v5.0)

window.stats = {
    // Chaves de Storage Específicas
    KEYS: {
        CONFIG: 'ao3_stats_config',
        LOG: 'ao3_reading_log',
        SNAPSHOTS: 'ao3_stats_snapshots'
    },

    // Configurações Padrão
    defaults: {
        enabled: false,
        wordsPerBook: 50000,
        yearlyGoal: 50 // Em "Livros"
    },

    // --- Métodos Públicos ---

    // [NOVO] Retorna o resumo para o Widget e Options
    getYearlyStats: async (year) => {
        const currentYear = year || new Date().getFullYear();
        const log = await window.stats.loadLog();
        const config = await window.stats.load(window.stats.KEYS.CONFIG);

        const ratio = config.wordsPerBook || 50000;
        const goalBooks = config.yearlyGoal || 50;

        // Filtra apenas o ano atual
        const yearEntries = log.filter(entry => entry.year === currentYear);

        // Soma palavras
        const totalWords = yearEntries.reduce((acc, entry) => acc + (entry.words || 0), 0);

        // Calcula "Livros"
        const booksRead = (totalWords / ratio).toFixed(1); // ex: "12.5"

        // Calcula Porcentagem
        const percent = Math.min(100, (booksRead / goalBooks) * 100).toFixed(1);

        return {
            year: currentYear,
            totalWords: totalWords,
            booksRead: booksRead,
            goalBooks: goalBooks,
            percent: percent,
            entriesCount: yearEntries.length
        };
    },

    // 1. Chamado pelo botão VERDE "Mark as Read" (Fic inteira)
    recordWorkRead: async (workId, metaData) => {
        if (!await window.stats.isEnabled()) return;

        const currentTotalWords = metaData.wordCount || 0;
        const currentTotalChapters = metaData.chapterCount || 1; // Assume 1 se não tiver info

        if (currentTotalWords === 0) return;

        const snapshots = await window.stats.load(window.stats.KEYS.SNAPSHOTS);

        // --- LÓGICA DE COMPATIBILIDADE ---
        // Verifica se o snapshot antigo é só um número (versão antiga) ou objeto (versão nova)
        let lastKnownWords = 0;
        let lastKnownChapters = 0;

        const entry = snapshots[workId];
        if (typeof entry === 'number') {
            // Formato antigo: guardava só palavras
            lastKnownWords = entry;
            // Se já tinha palavras, assumimos que tinha pelo menos 1 capitulo, 
            // ou tentamos estimar, mas 0 é mais seguro para evitar negativos
            lastKnownChapters = 0;
        } else if (entry && typeof entry === 'object') {
            // Formato novo: guarda palavras e capítulos
            lastKnownWords = entry.words || 0;
            lastKnownChapters = entry.chapters || 0;
        }

        // --- CÁLCULO DOS DELTAS ---
        let wordDelta = currentTotalWords - lastKnownWords;
        if (wordDelta < 0) wordDelta = 0;

        let chapterDelta = currentTotalChapters - lastKnownChapters;
        if (chapterDelta < 0) chapterDelta = 0;

        // Se é a primeira vez lendo (lastKnownWords == 0), chapterDelta deve ser o total atual
        // A lógica acima já garante isso: (20 - 0 = 20)

        // Só grava se houve mudança em palavras OU capítulos
        if (wordDelta > 0 || chapterDelta > 0) {

            // Se só mudou capítulos mas não palavras (estranho, mas possível em correção), 
            // ou se mudou palavras.

            await window.stats.addLogEntry({
                workId: workId,
                title: metaData.title,
                author: metaData.author || 'Unknown',
                fandom: metaData.fandom,
                action: 'WORK_UPDATE',
                words: wordDelta, // Grava só a diferença
                totalWordsAtMoment: currentTotalWords,

                // [CORREÇÃO] Grava a DIFERENÇA de capítulos, não o total
                chaptersReadCount: chapterDelta
            });

            // --- SALVA O SNAPSHOT NO NOVO FORMATO ---
            snapshots[workId] = {
                words: currentTotalWords,
                chapters: currentTotalChapters
            };

            await window.stats.save(window.stats.KEYS.SNAPSHOTS, snapshots);

            window.ui.showToast(`Stats: +${wordDelta.toLocaleString()} words & ${chapterDelta} chapters added!`);
        }
    },

    // 2. Chamado pelo botão NOVO "Log Reading" (Capítulo/Releitura manual)
    recordManualRead: async (workId, chapterText, metaData) => {
        if (!await window.stats.isEnabled()) return;

        const wordCount = window.stats.countWordsFromText(chapterText);

        if (wordCount > 0) {
            // 1. Adiciona ao Log (Histórico visível)
            await window.stats.addLogEntry({
                workId: workId,
                title: metaData.title,
                author: metaData.author || 'Unknown',
                fandom: metaData.fandom,
                action: 'MANUAL_LOG',
                words: wordCount,
                chapter: metaData.chapterIndex
            });

            // 2. ATUALIZAÇÃO CRÍTICA: Atualiza o Snapshot (Memória interna)
            // Isso garante que se o usuário clicar em "Mark as Read" depois, 
            // o sistema desconte essas palavras e adicione apenas o restante.
            const snapshots = await window.stats.load(window.stats.KEYS.SNAPSHOTS);

            // [FIX] Sempre trabalha no formato objeto {words, chapters} para evitar
            // que lastKnownChapters seja zerado na próxima chamada de recordWorkRead.
            const existingEntry = snapshots[workId];
            let knownWords = 0;
            let knownChapters = 0;
            if (typeof existingEntry === 'number') {
                // Compatibilidade com snapshots antigos (formato número)
                knownWords = existingEntry;
            } else if (existingEntry && typeof existingEntry === 'object') {
                knownWords = existingEntry.words || 0;
                knownChapters = existingEntry.chapters || 0;
            }

            // Acumula as palavras lidas manualmente e incrementa capítulos em 1
            snapshots[workId] = {
                words: knownWords + wordCount,
                chapters: knownChapters + 1
            };

            await window.stats.save(window.stats.KEYS.SNAPSHOTS, snapshots);

            window.ui.showToast(`Stats: +${wordCount.toLocaleString()} words logged manually!`);
        }
    },

    // --- Métodos Internos ---

    isEnabled: async () => {
        const config = await window.stats.load(window.stats.KEYS.CONFIG);
        return config.enabled === true;
    },

    load: async (key) => {
        if (typeof loadData === 'function') return await loadData(key);
        return new Promise(resolve => {
            storage.local.get(key, (items) => {
                try { resolve(JSON.parse(items[key] || '{}')); }
                catch (e) { resolve({}); }
            });
        });
    },

    loadLog: async () => {
        if (typeof loadData === 'function') return await loadData(window.stats.KEYS.LOG);
        return new Promise(resolve => {
            storage.local.get(window.stats.KEYS.LOG, (items) => {
                try {
                    const data = JSON.parse(items[window.stats.KEYS.LOG]);
                    resolve(Array.isArray(data) ? data : []);
                } catch (e) { resolve([]); }
            });
        });
    },

    save: async (key, data) => {
        if (typeof saveData === 'function') return await saveData(key, data);
        return new Promise(resolve => {
            storage.local.set({ [key]: JSON.stringify(data) }, resolve);
        });
    },

    addLogEntry: async (entryData) => {
        const log = await window.stats.loadLog();

        const newEntry = {
            id: 'evt_' + Date.now(),
            timestamp: Date.now(),
            year: new Date().getFullYear(),
            ...entryData
        };

        log.push(newEntry);
        await window.stats.save(window.stats.KEYS.LOG, log);
    },

    countWordsFromText: (text) => {
        if (!text) return 0;
        const cleanText = text.trim().replace(/\s+/g, ' ');
        return cleanText.split(' ').length;
    },

    // --- Rating Methods ---
    getWorkAverageRating: async (workId) => {
        // Calcula a média da obra considerando total de capítulos
        // Regras: se capítulo tem rating individual, usa-o; caso contrário, usa a nota global (se existir)
        if (typeof loadChapterRatings !== 'function') return null;

        const ratings = await loadChapterRatings();
        if (!ratings[workId]) return null;

        const meta = ratings[workId]._meta || {};
        const totalChapters = meta.totalChapters || (function inferTotal() {
            // Tenta inferir o total a partir das chaves numéricas (máximo)
            const numericKeys = Object.keys(ratings[workId]).map(k => parseInt(k, 10)).filter(n => !isNaN(n));
            if (numericKeys.length === 0) return 0;
            return Math.max(...numericKeys);
        })();

        const globalRating = typeof meta.globalRating === 'number' ? meta.globalRating : null;

        // Se não há total conhecido e não há ratings individuais, retorna null
        const hasAnyRating = Object.values(ratings[workId]).some(v => typeof v === 'number') || globalRating !== null;
        if (!hasAnyRating || totalChapters === 0) return null;

        let sum = 0;
        for (let i = 1; i <= totalChapters; i++) {
            const key = i.toString();
            if (typeof ratings[workId][key] === 'number') {
                sum += ratings[workId][key];
            } else if (globalRating !== null) {
                sum += globalRating;
            } else {
                // Sem global e sem rating individual: conta como 0
                sum += 0;
            }
        }

        const average = sum / totalChapters;
        return Math.round(average * 10) / 10; // 1 casa decimal
    },

    getAllWorksWithRatings: async () => {
        // Retorna objeto { workId: { avgRating, chapterCount, ratedCount } }
        if (typeof loadChapterRatings !== 'function') return {};

        const ratings = await loadChapterRatings();
        const result = {};

        for (const [workId, chapters] of Object.entries(ratings)) {
            const meta = chapters._meta || {};
            let totalChapters = meta.totalChapters;
            if (!totalChapters) {
                const numericKeys = Object.keys(chapters).map(k => parseInt(k, 10)).filter(n => !isNaN(n));
                totalChapters = numericKeys.length > 0 ? Math.max(...numericKeys) : 0;
            }

            const avg = await window.stats.getWorkAverageRating(workId);
            if (avg !== null && totalChapters > 0) {
                const ratedCount = Object.values(chapters).filter(v => typeof v === 'number').length;
                result[workId] = {
                    avgRating: avg,
                    chapterCount: totalChapters,
                    ratedCount: ratedCount
                };
            }
        }

        return result;
    }
};