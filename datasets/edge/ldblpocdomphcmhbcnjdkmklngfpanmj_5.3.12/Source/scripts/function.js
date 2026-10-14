let _URL = window.location.href;
let AaiIp = 'https://caigou.ecgtool.com';
//let AaiIp = 'https://caigou.ecgtool.com';
let UserInfo;

function ShowMsg(title, msg, time, type) {
    switch (type) {
        case 1:
            var msg_type = 'log';
            break;
        case 2:
            var msg_type = 'success';
            break;
        case 3:
            var msg_type = 'warn';
            break;
        case 4:
            var msg_type = 'error';
            break;
    }
    naranja()[msg_type]({
        title: title,
        text: msg,
        timeout: time,
        buttons: []
    })
}


/**
 * 获取URL参数值
 * @param {目标网址} url 
 * @param {参数名}} variable 
 */
 function getUrlVar(url, variable) {
    if (url && url.indexOf('?') != -1) {
        var query = url.split('?')[1];
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
    }
    return (false);
}

function unique(arr){
    var hash=[];
    for (var i = 0; i < arr.length; i++) {
       if(hash.indexOf(arr[i])==-1){
        hash.push(arr[i]);
       }
    }
    return hash;
}

function set_select_checked(select, checkValue) {

    for (var i = 0; i < select.options.length; i++) {

        if (select.options[i].value == checkValue) {

            select.options[i].selected = true;

            ChangeValueClick(select.options[i])

            break;
        }
    }
}


function ChangeSelect(select,value){
    select.value = value;
    let evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("change", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
    select.dispatchEvent(evt);
}


function clearCookie() {            
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的
        }
    }
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

/**
 * 睡眠
 * @param {*} ms 
 * @returns 
 */
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function FetchRequest(url,data,type) {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
            url:url,
            data:data,
            type: type
        }, function (data) {
            resolve(data)
        })
    })
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function download(filename,content,contentType) {
    if (!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], { 'type': contentType });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function PostMsg(str) {
    window.opener.postMessage(str,"*");
}

async function get_key(id=0){
    let url = AaiIp+'/api/index/get_key';
    let res = await FetchRequest(url,{id:id},'GetData');
    if(res.state){
        let data = res.data.data;
        return data;
    }else{
        layer.alert('获取跟词出错');  
    }
}
