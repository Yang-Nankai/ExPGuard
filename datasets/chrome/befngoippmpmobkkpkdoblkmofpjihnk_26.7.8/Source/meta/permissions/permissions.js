document.querySelector('#update-permissions').addEventListener('click', () => {
  chrome.permissions.request({ origins: ['<all_urls>'] }, granted => {
    parent.postMessage({ type: 'SCRIBE_PERMISSION_GRANT', payload: granted }, '*')
  })
})
