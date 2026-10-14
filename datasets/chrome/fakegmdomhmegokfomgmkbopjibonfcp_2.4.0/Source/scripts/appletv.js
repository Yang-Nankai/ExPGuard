document.addEventListener('metastreamautoplay', e => {
  const playBtn = document.querySelector('.video-data-services-button')
  if (playBtn instanceof HTMLElement) {
    playBtn.click()
    e.preventDefault()
  }
})
