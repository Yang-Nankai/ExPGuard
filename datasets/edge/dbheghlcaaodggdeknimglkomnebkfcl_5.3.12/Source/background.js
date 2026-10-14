importScripts('/libs/jquery.nodom.js');
var token='';
var buyerLoginId1688='';
let AaiIp = 'https://1688cps.eccang.com';
let AaiIpCg = 'https://1688cg.eccang.com';
jumpFlag = 0;
t0 = 0;//起始时间
frequency = 60;//频率间隔
localId = '';//客户标识
let version='5.3.12';
chrome.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
	console.log(request,sender)
	let res = null;
	let type = request.type.toUpperCase();
	let Fetch = async function(url = '', data = {}, type = 'GET',sendResponse){
		type = type.toUpperCase(); // 请求方式小写转换成大写
		if (type == 'GET' || type == 'POST') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})
			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		}
		let requestConfig = {
			mode: "same-origin",
			method: type.indexOf('POST')!=-1 ? 'POST' : 'GET' ,
			credentials : 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
			cache: "no-cache" // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
		}
	 
		if (type == 'POST_JSON' || type == 'POST_HTML') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		if(type == 'POST'){
			requestConfig.headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		if(type == 'HTML'){
			requestConfig.headers = {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
				'Content-Type': 'text/html; charset=utf-8'
			}
		}
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = type != 'HTML' && type != 'POST_HTML' ? await response.json() : await response.text();
			sendResponse({state:true,data:responseJson})
			//return responseJson
		} catch (error) {
			//return null;
			sendResponse({state:false,data:error})
		}
	}
	let Ajax = async function(url = '', data = {}, type = 'GET',sendResponse){
		data = type=='POST_JSON' ? JSON.stringify(data) : data;
		let dataType = type.indexOf('HTML')>-1 ? 'html' : 'json';
		let Atype = type.indexOf('POST')>-1 ? 'POST' : 'GET';
		let contentType = type=='POST_JSON' ? 'application/json' : 'application/x-www-form-urlencoded';
		console.log({dataType,Atype,contentType,data})
		$.ajax({
			url:url,
			type:Atype,
			dataType:dataType,
			contentType:contentType,
			data:data,
			success:function(res){
				sendResponse({state:true,data:res})
			},
			error:function(error){
				sendResponse({state:false,data:error})
			}
		})
	}
	let Fetch1 = async function(url = '', data = {}, type = 'GET'){
		type = type.toUpperCase(); // 请求方式小写转换成大写
		if (type == 'GET' || type == 'POST') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})
			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		}
		let requestConfig = {
			mode: "same-origin",
			method: type.indexOf('POST')!=-1 ? 'POST' : 'GET' ,
			credentials : 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
			cache: "no-cache" // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
		}
	 
		if (type == 'POST_JSON' || type == 'POST_HTML') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		var responseJson = {};
		try {
			const response = await fetch(url, requestConfig);
			responseJson = type != 'HTML' && type != 'POST_HTML' ? await response.json() : await response.text();
			console.log(responseJson);
			if(responseJson.state){
				jumpFlag = parseInt(responseJson.jump_flag);
				frequency = parseInt(responseJson.frequency);
			}
		} catch (error) {
			console.log(error);
		}
		
	}
	switch (type) {
		case 'GETDATA':
			res = Fetch(request.url, request.data, 'GET',sendResponse);
			//res = Ajax(request.url, request.data, 'GET',sendResponse);
			break;
		case 'POSTDATA':
			res = Fetch(request.url, request.data, 'POST',sendResponse);
			//res = Ajax(request.url, request.data, 'POST',sendResponse);
			break;
		case 'POSTJSONDATA':
			res = Fetch(request.url, request.data, 'POST_JSON',sendResponse);
			//res = Ajax(request.url, request.data, 'POST_JSON',sendResponse);
			break;
		case 'POSTJSONHTML':
			res = Fetch(request.url, request.data, 'POST_HTML', sendResponse);
			//res = Ajax(request.url, request.data, 'POST_HTML', sendResponse);
			break;
		case 'GETHTMLDATA':
			res = Fetch(request.url, request.data, 'HTML',sendResponse);
			//res = Ajax(request.url, request.data, 'HTML',sendResponse);
			break;
		case 'TOKEN':
//			token = request.data;
			break;
		case 'BUYER_LOGINID1688':
			buyerLoginId1688 = encodeURIComponent(request.data);
			break;
		case 'JUMP_FLAG':
			var t1 = new Date().getTime();//微秒
			console.log(t0,t1,frequency);
			console.log(t1 - t0);
			localId = request.data.localId;//客户标记
			if(!localId){
				localId = '';
			}
			if(t1-t0 > frequency*1000){
				Fetch1(request.url, request.data, 'POST_JSON');
				t0 = t1;//赋值
			}
			sendResponse({state:true,data:{jumpFlag:jumpFlag,frequency:frequency}})
			break;
		default:
			break;
	}
	return true;
}


/**
* 获取本地缓存
* @returns 
*/
async function GetStorage(model) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(model, function (data) {
            console.log(data);
            let Storage = data[model];
            resolve(Storage);
        })
    })
}

/**
* 设置本地缓存
* @returns 
*/
async function SetStorage(model,Data) {
    let Storage = {};
    Storage[model] = Data;
    console.log(Storage)
    return new Promise(function (resolve, reject) {
        chrome.storage.local.set(
            Storage
        , function (data) {
            console.log(data)
            resolve(data)
        })
    })
}

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        console.log('安装成功')
        //打开帮助说明
        chrome.tabs.create({ url: "https://eccang.yuque.com/oo8zo1/lz5f8r/lq0m7lkwo1nk6rrv" });
    }
})

//1688精选货源，打标
function updateRule() {
  // 创建重定向规则
  let addRules=[
	  {id:100,priority:100,condition:{regexFilter:"order\\.1688\\.com/order/smart_make_order\\.htm\\?.*(p|fromkv)=.*",resourceTypes:["main_frame","sub_frame"],initiatorDomains:["1688.com"]},action:{type:"redirect",redirect:{transform:{queryTransform:{addOrReplaceParams:[{key:"extId",value:JSON.stringify({verticalAttributesMap:{_F_b_kj_dc:"eccang"}})}]}}}}},
	  {id:102,priority:102,condition:{regexFilter:"detail\\.1688\\.com/offer.*",resourceTypes:["main_frame","sub_frame"],initiatorDomains:["1688.com"]},action:{type:"redirect",redirect:{transform:{queryTransform:{addOrReplaceParams:[{key:"kj_agent_plugin",value:"eccang"}]}}}}}
  
  ];
 
  // 使用chrome.declarativeNetRequest.updateDynamicRules添加规则
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: addRules,
    removeRuleIds: [99,100,102,101]
  });
}

// 监听扩展安装或更新事件
chrome.runtime.onInstalled.addListener(() => {
  updateRule();
});

//async function fetchData(offerId,details) {
//try {
//var urlComp = encodeURIComponent(details.url);
//const response = await fetch(`${AaiIp}/default/svc/get-cps-url?param=${urlComp}&version=${version}`);
//const data = await response.json();
//console.log(data);
//if(response.ok){
//    chrome.tabs.update(details.tabId, {url: `${AaiIp}/default/svc/get-cps-url/type/jump?param=${urlComp}&version=${version}`});	    	
//}
//} catch (error) {
//console.error('Error:', error);
//}
//}

//数据分析
function urlFenxi(details) {
	try {
	  var urlComp = encodeURIComponent(details.url);
	  const response = fetch(`${AaiIpCg}/default/svc/url-fenxi?param=${urlComp}&version=${version}&source=plugin&token=${token}&buyerLoginId1688=${buyerLoginId1688}&s=cps`);
	//  console.log(response);
	} catch (error) {
	  console.error('Error:', error);
	}
}
//自动转链
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
	  if(jumpFlag == 1){// 如果开启了跳转控制
		  var url_ = details.url;
			if(url_.includes('https://detail.1688.com/offer/undefined')){
				return;
			}
			var jump = '';
			var fx = false;
			console.log(url_);  
		    const url = new URL(details.url);
		    if (url.hostname == "detail.1688.com" && url.pathname.startsWith("/offer/") && !url.searchParams.has("tracelog")) {
//		    	https://detail.1688.com/offer/557764147825.html
		      const match = url.pathname.match(/\/offer\/(\d+)\.htm/);
		      if (match) {
		        const offerId = match[1];
//		          fetchData(offerId,details);  
		        var urlComp = encodeURIComponent(details.url);
		        if(!token){
		        	token='';
		        }
		        fx = true;
		        jump = `${AaiIp}/default/svc/get-cps-url/type/jump?param=${urlComp}&version=${version}&source=plugin&token=${token}&localId=${localId}&buyerLoginId1688=${buyerLoginId1688}&s=cps`;
		      }
		    }
		    if ((url.hostname == "detail.tmall.com" || url.hostname == "item.taobao.com") &&  (!url.searchParams.has("ali_trackid") || !url.searchParams.has("union_lens"))) {
//		    	https://detail.tmall.com/item.htm?id=702048717052
//		    	http://item.taobao.com/item.htm?id=734988717932
		    	const match = url.pathname.match(/\/item\.htm/);
		    	if (match) {
		    		const params = new URLSearchParams(url.search);
		    		// 获取 id 参数的值
		    		if(params.has('id')){    			
		    			const offerId = params.get('id');
		    			var urlComp = encodeURIComponent(details.url);
		    			if(!token){
		    				token='';
		    			}
				        fx = true;
		    			jump = `${AaiIpCg}/default/svc-tb/get-cps-url/type/jump?param=${urlComp}&version=${version}&source=plugin&token=${token}&localId=${localId}&s=cps`;
		    		}
		    	}
		    }
		    if ((url.hostname == "item.jd.com" || url.hostname == "item.m.jd.com" || url.hostname == "3.cn" || url.hostname == "u.jd.com") &&  (!url.searchParams.has("utm_source") || (url.searchParams.has("utm_source") && url.hash=='#crumb-wrap'))) {
		    	//https://item.jd.com/100055153994.html
//		    	console.log(url.hash);
		    	const match = url.pathname.match(/(\d+)\.htm/);
		    	if (match) {
		    		const offerId = match[1]; 
		    		var urlComp = encodeURIComponent(details.url);
		    		if(!token){
		    			token='';
		    		}
			        fx = true;
		    		// jump = `${AaiIpCg}/default/svc-jd/get-cps-url/type/jump?param=${urlComp}&version=${version}&source=plugin&token=${token}&localId=${localId}&s=cps`;
		    	}
		    }
		    if ((url_.includes('mobile.yangkeduo.com/goods')) &&  (!url.searchParams.has("_oc_pid") || !url.searchParams.has("_oc_duoduo_type"))) {
		    	//https://mobile.yangkeduo.com/goods.html?goods_id=486470718382
		    	const match = url.pathname.match(/\/goods(\d+)?\.htm/);
		    	if (match) {
		    		const params = new URLSearchParams(url.search);
		    		if(params.has('goods_id')){    			
		    			const offerId = params.get('goods_id');
		    			var urlComp = encodeURIComponent(details.url);
		    			if(!token){
		    				token='';
		    			}
				        fx = true;
//		    			jump = `${AaiIpCg}/default/svc-pdd/get-cps-url/type/jump?param=${urlComp}&version=${version}&source=plugin&token=${token}&localId=${localId}&s=cps`;
		    		}
		    	}
		    } 
		    if(fx){		    	
		    	urlFenxi(details); 
		    }
		    if(jump){
		    	  //数据分析
		    	console.log(jump);
				chrome.tabs.update(details.tabId, {url: jump});
		    }
	  }
	
  },
  { urls: ["*://detail.1688.com/offer/*","*://item.taobao.com/*","*://detail.tmall.com/*","*://mobile.yangkeduo.com/goods*","*://item.jd.com/*","*://item.m.jd.com/*","*://3.cn/*","*://u.jd.com/*"] }
);