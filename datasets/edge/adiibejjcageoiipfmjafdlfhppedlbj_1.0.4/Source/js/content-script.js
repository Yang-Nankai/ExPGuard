// 页面和所有资源加载完成后执行的代码
window.addEventListener("load", function () {

    var URL = 'https://dddz.dalualex.com';
    // http://localhost:3000
    // https://dddz.dalualex.com

    var isLoad1 = false;
    var isLoad2 = false;

    // 页面加载有延迟，不断循环请求
    setInterval(() => {
        if (!isLoad1) {
            changeBtnText();
        }
        if (!isLoad2) {
            changeBtnText2();
        }
    }, 500);

    var ele1 = document.querySelector('#__msfe__side-nav_item_101 > a > span');
    var ele2 = document.querySelector('#__msfe__side-nav_item_3475 > a > span');
    if (ele1) {
        $(ele1).append('<span style="min-width:32px;margin-left:13px;margin-top:2px" class="nav-item-tag alerts-num-tag alerts-num-tag--large"><span>多多对账</span></span>');
    }
    if (ele2) {
        $(ele2).append('<span style="min-width:32px;margin-left:13px;margin-top:2px" class="nav-item-tag alerts-num-tag alerts-num-tag--large"><span>多多对账</span></span>');
    }

    // 修改下载报表按钮图标内容
    function changeBtnText() {
        const elOrderEpt = $('div.download-box div.header div.right button[data-testid]');
        if (elOrderEpt) {
            $(elOrderEpt).children('span').text("使用多多对账下载并分析");

            $(elOrderEpt).click(function (e) {
                e.preventDefault();
                // 发送消息到后台脚本, 判断用户是否登录
                chrome.runtime.sendMessage({ request: "get-authorization" }, function (response) {
                    // 这个函数会在后台脚本响应后被调用
                    if (!response || !response['email']) {
                        window.open(URL + '/login.html');
                    }
                });

            });
            isLoad1 = true;
        }
    }

    function changeBtnText2() {
        const elOrderEpt2 = document.querySelector('#downloadBalance-btn-0 > span');
        if (elOrderEpt2) {
            for (let index = 0; index < 50; index++) {
                const ele = document.querySelector('#downloadBalance-btn-' + index + ' > span');
                $(ele).text("使用多多对账下载并分析");
                $(ele).parent().css('width', '280px');
            }

            $(elOrderEpt2).click(function (e) {
                e.preventDefault();
                // 发送消息到后台脚本, 判断用户是否登录
                chrome.runtime.sendMessage({ request: "get-authorization" }, function (response) {
                    // 这个函数会在后台脚本响应后被调用
                    if (response && response['email']) {
                        return;
                    } else {
                        window.open(URL + '/login.html');
                    }
                });

            });
            isLoad2 = true;
        }
    }

});
