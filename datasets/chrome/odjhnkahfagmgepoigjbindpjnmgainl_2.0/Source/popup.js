document.addEventListener('DOMContentLoaded', function() {
  const globalToggle = document.getElementById('globalToggle');
  const siteToggle = document.getElementById('siteToggle');
  const currentSiteElement = document.getElementById('currentSite');
  
  let currentTab = null;
  let currentDomain = null;
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0] && tabs[0].url && tabs[0].url.startsWith('http')) {
      currentTab = tabs[0];
      const url = new URL(currentTab.url);
      currentDomain = url.hostname;
      currentSiteElement.textContent = currentDomain;
      loadSiteSettings();
    } else {
      currentSiteElement.textContent = 'N/A';
      document.querySelector('.site-info').style.display = 'none';
      document.querySelector('.stats').textContent = 'Switch to a web page to see details.';
    }
  });
  
  function loadSettings() {
    chrome.storage.sync.get(['globalEnabled', 'disabledSites'], function(result) {
      const globalEnabled = result.globalEnabled !== false;
      const disabledSites = result.disabledSites || [];
      updateToggleState(globalToggle, globalEnabled);
      if (currentDomain) {
        const siteEnabled = globalEnabled && !disabledSites.includes(currentDomain);
        updateToggleState(siteToggle, siteEnabled);
        if (!globalEnabled) {
          siteToggle.classList.add('disabled');
        } else {
          siteToggle.classList.remove('disabled');
        }
      }
    });
  }
  
  function loadSiteSettings() {
    loadSettings();
  }
  
  function updateToggleState(toggle, isActive) {
    if (isActive) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  }
  
  globalToggle.addEventListener('click', function() {
    const isCurrentlyActive = globalToggle.classList.contains('active');
    const newState = !isCurrentlyActive;
    chrome.storage.sync.set({globalEnabled: newState}, function() {
      if (newState) {
        chrome.runtime.sendMessage({ type: "ENABLE_RULES" });
      } else {
        chrome.runtime.sendMessage({ type: "DISABLE_RULES" });
      }
      updateToggleState(globalToggle, newState);
      if (newState) {
        siteToggle.classList.remove('disabled');
        chrome.storage.sync.get(['disabledSites'], function(result) {
          const disabledSites = result.disabledSites || [];
          const siteEnabled = !disabledSites.includes(currentDomain);
          updateToggleState(siteToggle, siteEnabled);
        });
      } else {
        siteToggle.classList.add('disabled');
        updateToggleState(siteToggle, false);
      }
      if (currentTab) {
        chrome.tabs.reload(currentTab.id);
      }
    });
  });
  
  siteToggle.addEventListener('click', function() {
    if (siteToggle.classList.contains('disabled')) {
      return;
    }
    const isCurrentlyActive = siteToggle.classList.contains('active');
    const newState = !isCurrentlyActive;
    chrome.storage.sync.get(['disabledSites'], function(result) {
      let disabledSites = result.disabledSites || [];
      if (newState) {
        disabledSites = disabledSites.filter(site => site !== currentDomain);
      } else {
        if (!disabledSites.includes(currentDomain)) {
          disabledSites.push(currentDomain);
        }
      }
      chrome.storage.sync.set({disabledSites: disabledSites}, function() {
        chrome.runtime.sendMessage({ type: 'SYNC_DISABLED_SITES' });
        updateToggleState(siteToggle, newState);
        if (currentTab) {
          chrome.tabs.reload(currentTab.id);
        }
      });
    });
  });
  loadSettings();

  // Ads-blocked counter — unified total (video ads + cosmetic ad elements).
  const adsBlockedCountEl = document.getElementById('adsBlockedCount');
  function renderAdsBlocked(value) {
    if (adsBlockedCountEl) {
      adsBlockedCountEl.textContent = (value || 0).toLocaleString();
    }
  }
  chrome.storage.local.get('adsBlocked', (result) => renderAdsBlocked(result.adsBlocked));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.adsBlocked) {
      renderAdsBlocked(changes.adsBlocked.newValue);
    }
  });

  // Rating widget logic
  const ratingWidget = document.querySelector('.rating-widget');
  if (ratingWidget) {
    ratingWidget.addEventListener('click', (event) => {
      if (event.target.classList.contains('star')) {
        const rating = parseInt(event.target.dataset.rating, 10);
        let url;
        if (rating <= 3) {
          url = 'https://docs.google.com/forms/d/e/1FAIpQLSdi3_m1C4Wf_6ndoGA1djD3tgBpousHTvClrtU08AtUQv11Zw/viewform?usp=header';
        } else {
          url = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;
        }
        chrome.tabs.create({ url: url });
      }
    });
  }
});

