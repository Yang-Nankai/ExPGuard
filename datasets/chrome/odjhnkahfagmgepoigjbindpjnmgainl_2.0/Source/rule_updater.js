// Rule update mechanism for Add Blocker extension

const LIST_DEFINITIONS = [
    {
        path: 'easylist.txt',
    },
    {
        path: 'easyprivacy.txt',
    },
];

const UPDATE_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const ALARM_NAME = 'ruleUpdate';
const STORAGE_KEY_RAW_RULES = 'rawRuleLists';
const STORAGE_KEY_LAST_UPDATE = 'lastRuleUpdate';

class RuleUpdater {
    /**
     * Fetches rule lists from a set of URLs.
     * @param {string[]} urls - An array of URLs to fetch.
     * @returns {Promise<string>} A promise that resolves to the combined text content.
     */
    async _fetchLists(urls) {
        const fetchPromises = urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} for ${url}`);
                }
                return response.text();
            } catch (error) {
                console.error(`Failed to fetch list from ${url}:`, error);
                return ''; // Return empty string on failure to not break the whole process
            }
        });
        const texts = await Promise.all(fetchPromises);
        return texts.join('\n');
    }

    /**
     * Parses raw rule text into structured formats for DNR and cosmetic filtering.
     * @param {string} rawText - The combined text from rule lists.
     * @returns {{dnrRules: object[], cosmeticRules: object[]}}
     */
    _parseAndConvert(rawText) {
        const lines = rawText.split('\n');
        const dnrRules = [];
        const cosmeticRules = [];

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('!')) {
                continue;
            }

            if (trimmed.startsWith('||')) {
                let urlFilter = trimmed;
                if (urlFilter.endsWith('^')) {
                    urlFilter = urlFilter.slice(0, -1);
                }
                dnrRules.push({
                    action: { type: 'block' },
                    condition: {
                        urlFilter: urlFilter,
                        resourceTypes: [
                            "script", "image", "stylesheet", "media", "sub_frame", "xmlhttprequest", "ping", "websocket", "other"
                        ]
                    }
                });
            } else if (trimmed.includes('##') || trimmed.includes('#?#')) {
                // Adblock Plus cosmetic rules. To correctly parse, we must:
                // 1. Split only on the *first* occurrence of the separator ('##' or '#?#').
                // 2. Trim whitespace from the domains and the selector.
                // 3. Ignore the rule if the selector part is empty after trimming.
                const separator = trimmed.includes('##') ? '##' : '#?#';
                const separatorIndex = trimmed.indexOf(separator);

                const domainStr = trimmed.substring(0, separatorIndex);
                const selector = trimmed.substring(separatorIndex + separator.length).trim();

                if (!selector) {
                    continue;
                }

                const domains = domainStr ? domainStr.split(',').map(d => d.trim()) : [];
                
                cosmeticRules.push({ domains, selector });
            }
        }
        return { dnrRules, cosmeticRules };
    }

    /**
     * Loads raw rule text from local storage and parses it.
     * @returns {Promise<{dnrRules: object[], cosmeticRules: object[]}>}
     */
    async loadAndProcessRulesFromStorage() {
        const result = await chrome.storage.local.get(STORAGE_KEY_RAW_RULES);
        const rawText = result[STORAGE_KEY_RAW_RULES];
        if (rawText) {
            console.log(`Loaded ${Math.round(rawText.length / 1024)} KB of raw rules from storage. Parsing...`);
            return this._parseAndConvert(rawText);
        }
        return { dnrRules: [], cosmeticRules: [] };
    }

    /**
     * Processes and stores rules from the bundled lists on first install.
     * @returns {Promise<{dnrRules: object[], cosmeticRules: object[]}>}
     */
    async processBundledLists() {
        console.log('Processing bundled rule lists...');
        const urls = LIST_DEFINITIONS.map(list => chrome.runtime.getURL(list.path));
        const rawText = await this._fetchLists(urls);
        
        await chrome.storage.local.set({ [STORAGE_KEY_RAW_RULES]: rawText });

        console.log(`Stored raw rule text (${Math.round(rawText.length / 1024)} KB). Now parsing for current session.`);
        const processedRules = this._parseAndConvert(rawText);
        console.log(`Processed ${processedRules.dnrRules.length} network and ${processedRules.cosmeticRules.length} cosmetic rules.`);
        return processedRules;
    }

    /**
     * Checks for updates, downloads, processes, and stores new rules if needed.
     * @param {boolean} [force=false] - If true, forces an update check regardless of schedule.
     * @returns {Promise<{dnrRules: object[], cosmeticRules: object[]}|null>} The updated rules, or null if no update was performed.
     */
    async checkForUpdates(force = false) {
        const { [STORAGE_KEY_LAST_UPDATE]: lastUpdate } = await chrome.storage.local.get(STORAGE_KEY_LAST_UPDATE);
        const now = Date.now();

        if (!force && lastUpdate && (now - lastUpdate < UPDATE_INTERVAL_MS)) {
            console.log('Rule update check: lists are up-to-date.');
            return null;
        }

        console.log('Checking for rule updates from remote servers...');
        try {
            const urls = LIST_DEFINITIONS.map(list => chrome.runtime.getURL(list.path));
            const newRawText = await this._fetchLists(urls);
            if (!newRawText) {
                console.warn('Update failed: could not download new rule lists.');
                return null;
            }

            const newRules = this._parseAndConvert(newRawText);
            
            // We need to load and parse the old rules to compare counts
            const { cosmeticRules: currentCosmeticRules } = await this.loadAndProcessRulesFromStorage();

            if (currentCosmeticRules.length > 0 && newRules.cosmeticRules.length < currentCosmeticRules.length) {
                console.warn(`Update aborted: new lists have fewer cosmetic rules (${newRules.cosmeticRules.length}) than current lists (${currentCosmeticRules.length}).`);
                // Still update the timestamp to avoid checking again too soon
                await chrome.storage.local.set({ [STORAGE_KEY_LAST_UPDATE]: now });
                return null;
            }

            await chrome.storage.local.set({ [STORAGE_KEY_RAW_RULES]: newRawText });
            await chrome.storage.local.set({ [STORAGE_KEY_LAST_UPDATE]: now });

            console.log(`Successfully updated and stored raw rule text. New: ${newRules.dnrRules.length} network, ${newRules.cosmeticRules.length} cosmetic.`);
            return newRules;
        } catch (error) {
            console.error('Error during rule update process:', error);
            return null;
        }
    }
}

export const ruleUpdater = new RuleUpdater();

