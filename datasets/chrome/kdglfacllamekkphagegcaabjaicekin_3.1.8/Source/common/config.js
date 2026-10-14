// 正式环境 - 后端接口
let baseURL = 'https://api.l-sou.com'
// 测试环境
// let baseURL = 'https://api.l-sou.cn';
// 本地环境
// let baseURL='https://192.168.2.12:9001';

// 正式环境 - 个人中心
// let personBaseHost='https://member.l-sou.com';
// 灰度环境
let personBaseHost = 'https://l-sou.com/member'
// 测试环境
// let personBaseHost='https://l-sou.cn/member';

// 正式环境 - 沙盒
//  let iframeBaseURL='https://plugs.l-sou.com';
// 灰度环境
let iframeBaseURL = 'https://l-sou.com';
// 测试环境
// let iframeBaseURL='https://l-sou.cn';
// 本地环境
// let iframeBaseURL = 'http://127.0.0.1:5500/src'

// 正式环境
let wsBaseUrl = 'wss://api.l-sou.com'
// 测试环境
// let wsBaseUrl = 'wss://api.l-sou.cn';

let config = {
  name: '来搜',
  name_en: 'L-SOU',
  versionCode: '3.1.8',
  versionNum: 300018,
  baseURL,
  iframeBaseURL,
  personBaseHost,
  wsBaseUrl,
}


export default config
