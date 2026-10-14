const websites = ['gmail', 'linkedin', 'salesforce', 'hubspot'] as const;
import { currentWebsite } from '@core/utils/websites';
import popupMessaging from '@core/messaging/popup-messaging';

type Website = (typeof websites)[number];

const isWebsite = (value: string): value is Website => {
  return websites.includes(value as Website);
};

const setInitialCheckboxState = async (website: Website) => {
  const result = await popupMessaging.send<boolean | null>('background', 'store:get', {
    key: website,
  });

  const checkbox = document.querySelector<HTMLInputElement>(`input[name="${website}"]`);
  if (!checkbox) {
    return;
  }

  checkbox.checked = result ?? true;
};

const reloadMatchingTabs = (website: Website) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id === undefined) {
        return;
      }

      if (currentWebsite(tab.url) === website) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  websites.forEach((website) => setInitialCheckboxState(website));
});

const handleLinkClick = (event: MouseEvent, href: string) => {
  event.preventDefault();
  event.stopPropagation();
  window.open(href, '_blank');
};

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchorCandidate = target instanceof HTMLAnchorElement ? target : target.closest('a');
  if (!(anchorCandidate instanceof HTMLAnchorElement)) {
    return;
  }

  handleLinkClick(event, anchorCandidate.href);
};

const handleIntegrationToggle = async (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (!isWebsite(target.name)) {
    return;
  }

  const website = target.name;

  const success = await popupMessaging.send('background', 'store:set', {
    key: website,
    value: target.checked,
  });

  if (success) {
    reloadMatchingTabs(website);
  }
};

document.addEventListener('click', handleDocumentClick);
document.addEventListener('change', handleIntegrationToggle);
