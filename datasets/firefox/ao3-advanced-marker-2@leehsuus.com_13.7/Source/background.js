// 1. Detecta qual API está disponível (Firefox usa 'browser', Chrome usa 'chrome')
const api = (typeof browser !== 'undefined' ? browser : chrome);
const DEBUG = false;

const DEFAULT_SETTINGS = {
    // General
    'enable_chapter_reviews': true,        // Já começa ativado
    'enable_floating_review_btn': true,    // Floating review button (v13.4)
    'enable_bookmark_sync': false,
    'enable_bookmark_auto_sort': false,
    'ao3_enable_bookmark_grouping': false,

    // Cores Padrão
    'custom_color_read': '#28a745',
    'custom_color_updated': '#ffc107',
    'custom_color_partial': '#17a2b8',
    'custom_color_do_not_read': '#dc3545',

    // Stats Config 
    'ao3_stats_config': JSON.stringify({
        enabled: true,
        wordsPerBook: 50000,
        yearlyGoal: 50,
        statsBinId: ''
    }),

    // Logs vazios
    'ao3_reading_log': '[]',
    'chapterReviews': '{}',
    'chapterRatings': '{}',
    'ao3_read_works': '{}'
};

// Evento que dispara APENAS na instalação ou atualização da extensão
api.runtime.onInstalled.addListener(async (details) => {
    // É seguro usar update aqui porque a lógica abaixo verifica se a chave já existe
    if (details.reason === "install" || details.reason === "update") {
        if (DEBUG) console.log("AO3 Extension: Checking and injecting default settings...");

        const current = await api.storage.local.get(null); 
        const settingsToSave = {};

        for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
            // Só salva o padrão se a configuração ainda não existir no navegador do usuário
            if (current[key] === undefined) {
                settingsToSave[key] = value;
            }
        }

        if (Object.keys(settingsToSave).length > 0) {
            await api.storage.local.set(settingsToSave);
            if (DEBUG) console.log("Default settings applied:", settingsToSave);
        }
    }
});

// 2. Ouve o evento de clique no ícone da extensão de forma universal
const extAction = api.action || api.browserAction;

if (extAction) {
    extAction.onClicked.addListener(() => {
        // Tenta abrir a página de opções nativa do navegador
        if (api.runtime.openOptionsPage) {
            api.runtime.openOptionsPage();
        } else {
            // Fallback caso algum navegador exótico falhe
            const optionsUrl = api.runtime.getURL('options.html');
            api.tabs.create({ url: optionsUrl });
        }
    });
}

// 3. Listener para permitir que content scripts abram novas abas seguramente
api.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openTab' && request.url) {
        api.tabs.create({ url: request.url });
    }
});