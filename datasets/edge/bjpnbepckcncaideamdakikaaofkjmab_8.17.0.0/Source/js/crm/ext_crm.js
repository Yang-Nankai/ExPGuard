
let crm_modules = [
  {
    name: "hubspot",
    regex: /https\:\/\/.*hubspot\.com\/contacts/,
    permissions: ["https://*.hubspot.com/contacts/*"]
  },
  {
    name: "less_annoying",
    regex: /https\:\/\/account\.lessannoyingcrm\.com\/app\/View_Contact/,
    permissions: ["https://account.lessannoyingcrm.com/app/View_Contact"]
  },
  {
    name: "salesforce",
    regex: /https\:\/\/.*lightning\.force\.com\//,
    permissions: ["https://*.lightning.force.com/*"]
  },
  {
    name: "zohocrm",
    regex: /^https\:\/\/crm\.zoho\.(com|eu|in|com\.au)\/.*\/tab\/(Contacts|Leads)\/[0-9]+$/,
    permissions: [
      "https://crm.zoho.com/crm/*/tab/Contacts/*",
      "https://crm.zoho.com/crm/*/tab/Leads/*",
      "https://crm.zoho.eu/crm/*/tab/Contacts/*",
      "https://crm.zoho.eu/crm/*/tab/Leads/*",
      "https://crm.zoho.in/crm/*/tab/Contacts/*",
      "https://crm.zoho.in/crm/*/tab/Leads/*",
      "https://crm.zoho.com.au/crm/*/tab/Contacts/*",
      "https://crm.zoho.com.au/crm/*/tab/Leads/*"
    ]
  },
  {
    name: "highlevelcrm",
    regex: /^https\:\/\/app\.gohighlevel\.com\/.*\/contacts\/detail\/[A-Za-z0-9_-]+(\?.*)?$/,
    permissions: [
      "https://app.gohighlevel.com/*/contacts/detail/*"
    ]
  },
  {
    name: "maxmethodologycrm",
    regex: /^https\:\/\/app\.maxmethodology\.com\/.*\/contacts\/detail\/[A-Za-z0-9_-]+(\?.*)?$/,
    permissions: [
      "https://app.maxmethodology.com/*/contacts/detail/*"
    ]
  },
  {
    name: "crmpluscrm",
    // Match only valid subdomains (alphanumeric and hyphens), consistent with server-side validation
    regex: /^https\:\/\/[a-zA-Z0-9-]{1,63}\.crmplus\.ai\/.*\/contacts\/detail\/[A-Za-z0-9_-]+(\?.*)?$/,
    permissions: [
      "https://*.crmplus.ai/*/contacts/detail/*"
    ]
  }
];

function checkForInjection(url, tabId) {
  crm_modules.forEach(module => {
    let found = url.match(module.regex);
    // we are on a CRM page
    if (found !== null) {
      // Check if we have the required permissions, then inject
      chrome.permissions.contains({
        permissions: ['tabs'],
        origins: module.permissions
      }, hasPermission => {
        if (hasPermission) {
          console.log(`Injecting ${module.name} content script for ${url}`);
          inject(module.name, tabId);
        } else {
          console.log(`Missing permissions for ${module.name}, not injecting`);
        }
      });
    }
  });
}

function inject(crm, tabId) {
  getServerUrl(url => {
    console.log('In callback for server url', url)

    let setCwServer = url => {
      if (url === null || url === undefined || url === '') {
        document.cwServerUrl = "https://meeting.is";
      } else {
        document.cwServerUrl = url;
      }
    };

    chrome.scripting.executeScript({
      target: {tabId: tabId},
      func: setCwServer,
      args: [ url ]
    }, () => {

      console.log('server url injected');
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: [`js/crm/${crm}/crm_c_script.js`]
      }, () => {

        console.log(`${crm} js injected`);
        chrome.scripting.insertCSS({
          target: {tabId: tabId},
          files: [`js/crm/${crm}/crm.css`]
        }, () => console.log(`${crm} css injected`));
      });

    });

  });
}

chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    // on load of a tab
    if (changeInfo.status === 'complete' && !(tab.url === null || tab.url === undefined)) {
      // check that url for crm integration
      checkForInjection(tab.url, tabId);
    }
  }
)

