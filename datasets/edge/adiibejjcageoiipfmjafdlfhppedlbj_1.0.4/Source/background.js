var URL = 'https://dddz.dalualex.com';
// http://localhost:3000; https://dddz.dalualex.com
// "http://*.localhost:3000/*"

var email = null;


// 1、用户安装完插件之后，打开首页
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.tabs.create({ url: URL + '/index.html' });
    }
});


// 2、用户卸载掉软件之后，清除网站的token信息
chrome.runtime.setUninstallURL(URL + '/byby.html');

// 3、异步获取用户信息
chrome.storage.local.get(['email'], function (result) {
    email = result.email;
});


/**
 * 4、监听Chrome存储区域的变化事件。
 * 当Chrome存储（本地存储或同步存储）中的项目发生变化时，此函数将被调用。
 * @param {Object} changes - 包含发生变化的键值对的对象。
 * @param {string} namespace - 存储区域的命名空间（本地存储或同步存储）。
 */
chrome.storage.onChanged.addListener(function (changes, namespace) {
    // 遍历所有发生变化的键
    for (var key in changes) {
        var storageChange = changes[key];
        // 打印变化的详细信息
        console.log('存储键“' + key + '”（在“' + namespace + '”命名空间）的值已更改为“' +
            storageChange.newValue + '”');

        // 如果变化的键是'email'，则更新email变量
        if (key == 'email') {
            email = storageChange.newValue;
        }
    }
});

/**
 * 5、监听Chrome下载事件，当下载完成时，检查下载文件是否为拼多多订单或账单导出文件，并根据类型上传到相应的地方。
 * 
 * @param {Object} delta 下载状态的改变信息
 */
chrome.downloads.onChanged.addListener((delta) => {
    // 检查下载状态是否完成
    if (delta.state && delta.state.current === "complete") {
        const downloadId = delta.id;
        // 根据下载ID搜索下载项，以获取详细的下载信息
        chrome.downloads.search({ id: downloadId }, (results) => {
            // 确保搜索结果存在且不为空
            if (results && results.length > 0) {
                const downloadItem = results[0];
                const downloadUrl = downloadItem.url;
                const downloadFilename = downloadItem.filename;
                const fileUrl = downloadItem.finalUrl;
                console.log(downloadUrl, downloadFilename, fileUrl);

                // 检查下载的文件地址是否为拼多多订单导出地址
                const regex = /^https:\/\/pfs\.yangkeduo\.com\/order_export\/tmp\/?.*$/;
                const result = downloadUrl.match(regex);
                // 检查下载的文件地址是否为拼多多账单导出地址
                const regex2 = /^https:\/\/cashier\.pinduoduo\.com\/fluxion\/api\/file\/downloadFile\/?.*/;
                const result2 = downloadUrl.match(regex2);

                // 如果定义了email变量，且下载地址符合订单或账单导出地址，则相应地调用上传函数
                if (email) {
                    console.log(result,result2);
                    if (result) {
                        openDUoOrder(email, downloadUrl, downloadFilename);
                    } else if (result2) {
                        openDuoAudit(email, downloadUrl, downloadFilename);
                    }
                }

            }
        });
    }
});


// 6、监听来自内容脚本的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Received message from content script", message);
    // 消息自动反序列化为JSON格式
    if (message.request == "get-authorization") {
        if (email) {
            // 且用户已登录，则发送用户信息
            sendResponse({ 'email': email });
        } else {
            // 用户未登录，则发送错误信息
            sendResponse({ 'err': 'logout' });
        }
    }
});

// 7、监听来自其他扩展或应用程序的消息
chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    // 消息自动反序列化为JSON格式
    console.log(message);
    if (message.type == 'get-authorization') {
        // sendResponse 可以用于向发送方发送响应消息
        if (email) {
            sendResponse({ 'email': email });
        } else {
            sendResponse({ 'err': 'logout' });
        }
    } else if (message.type == 'remove-authorization') {
        // 移除单个键值对
        chrome.storage.local.remove('email', function () {
            console.log('已成功移除用户信息');
            sendResponse('success');
        });
    } else if (message.type == 'set-authorization') {
        // 保存登录信息
        chrome.storage.local.set({ 'email': message.data.email }, function () {
            sendResponse('success');
        });
    }
});


function openDUoOrder(email, downloadUrl, downloadFilename) {
    // 创建一个FormData对象
    const formData = new FormData();

    // 下载文件到blob对象
    fetch(downloadUrl)
        .then(response => response.blob())// 从文件路径中创建一个Blob对象
        .then(blob => {
            formData.append("file", blob, downloadFilename);// 第三个参数设置文件名称，不设置会默认名称为blob
            // 上传文件到多多对账
            fetch(URL + '/uploadOrder', {
                method: 'POST',
                headers: {
                    'authorization': email
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    var param = JSON.stringify({
                        'email': email,
                        'orderPath': data.data.absolutePath
                    });
                    console.log(param);
                    // 保存文件路径信息到多多对账数据库
                    fetch(URL + '/saveFileInfo', {
                        method: 'POST',
                        headers: {
                            'authorization': email,
                            'Content-Type': 'application/json' // 设置请求头为JSON
                        },
                        body: param
                    })
                        .then(response => response.json())
                        .then(data => {
                            chrome.tabs.create({ url: URL + '/order.html' });
                        })
                        .catch(error => {
                            console.error(error);
                        });

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

function openDuoAudit(email, downloadUrl, downloadFilename) {
    // 创建一个FormData对象
    const formData = new FormData();

    // 下载文件到blob对象
    fetch(downloadUrl)
        .then(response => response.blob())// 从文件路径中创建一个Blob对象
        .then(blob => {
            formData.append("file", blob, downloadFilename);// 第三个参数设置文件名称，不设置会默认名称为blob
            // 上传文件到多多对账
            fetch(URL + '/uploadAudit', {
                method: 'POST',
                headers: {
                    'authorization': email
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    var param = JSON.stringify({
                        'email': email,
                        'auditPath': data.data.absolutePath
                    });
                    console.log(param);
                    // 保存文件路径信息到多多对账数据库
                    fetch(URL + '/saveFileInfo', {
                        method: 'POST',
                        headers: {
                            'authorization': email,
                            'Content-Type': 'application/json' // 设置请求头为JSON
                        },
                        body: param
                    })
                        .then(response => response.json())
                        .then(data => {
                            chrome.tabs.create({ url: URL + '/audit.html' });
                        })
                        .catch(error => {
                            console.error(error);
                        });

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

// 在某个事件或条件下，向当前活动标签页的内容脚本发送消息
function sendMessageToContentScript(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 确保找到了活动标签页
        if (tabs && tabs.length > 0) {
            const activeTab = tabs[0];
            // 向内容脚本发送消息
            chrome.tabs.sendMessage(activeTab.id, { message: msg });
        }
    });
}

// 向其他扩展或应用程序发送消息
function sendMessageToExternal(message) {
    // 获取当前已安装的其他扩展或应用程序的 ID
    chrome.management.getAll(function (info) {
        for (var i = 0; i < info.length; i++) {
            // 检查是否是扩展或应用程序
            if (info[i].type === "extension" || info[i].type === "app") {
                // 发送消息到其他扩展或应用程序
                chrome.runtime.sendMessage(info[i].id, message, function (response) {
                    console.log("Response from external extension or application:", response);
                });
            }
        }
    });
}
