// 香港服务器
export  function networkHK() {
  const baseURL = 'https://api.l-sou.com'
  const personBaseHost = 'https://l-sou.com/member'
  const iframeBaseURL = 'https://l-sou.com'
  const wsBaseUrl = 'wss://api.l-sou.com'
  return {
    baseURL,
    personBaseHost,
    iframeBaseURL,
    wsBaseUrl,
  }
}

// 大陆服务器
export  function networkCN() {
  const baseURL = 'https://api.l-sou.cn';
  const personBaseHost = 'https://l-sou.cn/member';
  const iframeBaseURL = 'https://www.l-sou.cn';
  const wsBaseUrl = 'wss://api.l-sou.cn';
  return {
    baseURL,
    personBaseHost,
    iframeBaseURL,
    wsBaseUrl,
  }
}
