'use strict'
;(function metastreamNetflixScript() {
  const netflixPlayer = () => {
    let player
    try {
      const { videoPlayer } = netflix.appContext.state.playerApp.getAPI()
      const playerSessionId = videoPlayer.getAllPlayerSessionIds().find(Boolean)
      player = videoPlayer.getVideoPlayerBySessionId(playerSessionId)
    } catch (e) {}
    return player || null
  }

  document.addEventListener('metastreamplay', e => {
    const player = netflixPlayer()
    if (player && player.getPaused()) {
      e.preventDefault()
      player.play()
    }
  })

  document.addEventListener('metastreampause', e => {
    const player = netflixPlayer()
    if (player && !player.getPaused()) {
      e.preventDefault()
      player.pause()
    }
  })

  document.addEventListener('metastreamseek', e => {
    const player = netflixPlayer()
    if (player) {
      e.preventDefault()
      const curTime = player.getCurrentTime()
      const time = e.detail
      const dt = Math.abs(curTime - time)
      if (dt > 100) {
        player.seek(time)
      }
    }
  })
})()
