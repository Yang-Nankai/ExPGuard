document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');

  // Load the current state from storage
  chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
    const isEnabled = result.isExtensionEnabled !== false; // Default to true if not set
    updateButtonState(isEnabled);
  });

  // Handle button click
  toggleButton.addEventListener('click', () => {
    chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
      const isEnabled = result.isExtensionEnabled !== false;
      const newState = !isEnabled;

      // Save the new state
      chrome.storage.sync.set({ isExtensionEnabled: newState }, () => {
        updateButtonState(newState);
        // Notify content script of state change
        chrome.runtime.sendMessage({ action: 'toggleState', isEnabled: newState });
      });
    });
  });

  function updateButtonState(isEnabled) {
    toggleButton.textContent = isEnabled ? 'Turn Off' : 'Turn On';
    toggleButton.className = isEnabled ? '' : 'off';
  }
});