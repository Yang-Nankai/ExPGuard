importScripts('/js/jquery.nodom.js');
var token='';
var buyer_nick='';
let Qingei = 'https://qingei.com';
chrome.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
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
			mode: "cors", // 
			cache: "no-cache" //
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
		} catch (error) {
			sendResponse({state:false,data:error})
		}
	}
	let Ajax = async function(url = '', data = {}, type = 'GET',sendResponse){
		data = type=='POST_JSON' ? JSON.stringify(data) : data;
		let dataType = type.indexOf('HTML')>-1 ? 'html' : 'json';
		let Atype = type.indexOf('POST')>-1 ? 'POST' : 'GET';
		let contentType = type=='POST_JSON' ? 'application/json' : 'application/x-www-form-urlencoded';
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
	switch (type) {
		case 'GETDATA':
			res = Fetch(request.url, request.data, 'GET',sendResponse);
			break;
		case 'POSTDATA':
			res = Fetch(request.url, request.data, 'POST',sendResponse);
			break;
		case 'POSTJSONDATA':
			res = Fetch(request.url, request.data, 'POST_JSON',sendResponse);
			break;
		case 'POSTJSONHTML':
			res = Fetch(request.url, request.data, 'POST_HTML', sendResponse);
			break;
		case 'GETHTMLDATA':
			res = Fetch(request.url, request.data, 'HTML',sendResponse);
			break;
		case 'TOKEN':
			if(request.mid){				
				mid = request.mid;
			}
			break;
		case 'BUYER_LOGINID1688':
			buyer_nick = encodeURIComponent(request.data);
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
    return new Promise(function (resolve, reject) {
        chrome.storage.local.set(
            Storage
        , function (data) {
            resolve(data)
        })
    })
}

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: "https://qingei.com/jiaocheng" });
        chrome.runtime.setUninstallURL("https://qingei.com/uninstall");
    }
})