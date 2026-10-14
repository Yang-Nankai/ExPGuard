version = 'edge1.0.3';
var initCnt = 0;
buyer_nick = '';
CpsOption = null;
UserInfo = null;
GetUserInfo();
window.addEventListener('message', function (event) {
    // 确保消息来自当前网页
    if (event.source !== window) {
        return;
    }
    // 确保消息的类型是我们期望的
    if (event.data.type && (event.data.type === 'FROM_PAGE')) {
        // console.log(event.data); 
        buyer_nick = event.data.buyer_nick;
        // alert(buyer_nick);
        //向后台脚本发送消息
        chrome.runtime.sendMessage(
            { type: "BUYER_LOGINID1688", data: buyer_nick },
            function (response) {
                // console.log("Response from background:", response);
            }
        );
    }
});
function loadJs(url) {
    url = chrome.runtime.getURL(url);
    var linkElement = document.createElement('script');
    linkElement.src = url;
    document.body.append(linkElement);
}

if (window.location.hostname === 'detail.1688.com') {
    loadJs('js/buyer_nick.js');
    init();
}
var host_ = window.location.hostname;
var href_ = window.location.href;
if (host_.includes('item.taobao.com') || host_.includes('m.taobao.com') || host_.includes('m.1688.com') || host_.includes('m.tmall.com') || host_.includes('detail.tmall.com') || host_.includes('detail.tmall.hk') || host_.includes('item.jd.com') || host_.includes('item.m.jd.com') || host_.includes('npcitem.jd.hk') || host_.includes('www.vipglobal.hk') || host_.includes('detail.vip.com') || host_.includes('m.vip.com') || href_.includes('mobile.yangkeduo.com/goods')) {
    init();
}
async function GetCps() {
    if (!UserInfo) {
        UserInfo = await GetStorage('UserInfo');
    }
    if (!CpsOption) {
        CpsOption = await GetStorage('CpsOption');
    }
    let mid = '';
    if (UserInfo) {
        mid = UserInfo.memberId;
    }
    let itemurl = encodeURIComponent(window.location.href);
    let poastdata = {
        q: itemurl,
        mid: mid,
        type: 'json',
        v: version,
        buyer_nick: buyer_nick
    }
    let res = await FetchRequest(Qingei + '/get-url', poastdata, 'POSTDATA');//1688助手


    if (res.state) {
        if (res.data.s == 1) {
            if (res.data.data) {				
                if (res.data.qd=='1688'){
                    $(".newfan span").html('新客:'+res.data.data.newfan);
                    $(".oldfan span").html('老客:'+res.data.data.oldfan);
                }else{
                    $(".oldfan span").html('省赚:'+res.data.data.oldfan);
                }
                $(".qlogin").html((mid?'':"(登录|注册)"));
                if (res.data.state=='1'){window.location.href = res.data.data.jump;}//当前
                if (res.data.state=='2'){window.open(res.data.data.jump);}//新窗
            }
        } else if (res.data.s == 2) {
            if (res.data.data) {
                if (res.data.qd=='1688'){
                    $(".newfan span").html('新客:'+res.data.data.newfan);
                    $(".oldfan span").html('老客:'+res.data.data.oldfan);
                }else{
                    $(".oldfan span").html('省赚:'+res.data.data.oldfan);
                }
                $(".qlogin").html((mid ? '' : "(登录|注册)"));
            }
        } else {
            if (res.data.qd=='1688'){
                $(".newfan span").html('无佣金');
                $(".oldfan span").html('无佣金');
            }else{
                $(".oldfan span").html('无佣金');
            }
            //$(".newfan").html('无佣金');
            //$(".oldfan").html('无佣金');
            $(".qlogin").html((mid?'':"(登录|注册)"));
        }
        if (res.data.versionTip) {
            $('.BrandName').html("(" + res.data.versionTip + ")");
        }
    } else {
        layer.msg('通讯失败-联系客服');
    }
    // 更新 floatingBall 的内容
    updateFloatingBallContent();
}


async function GetUserInfo() {
    UserInfo = await GetStorage('UserInfo');
    //console.log(UserInfo);
    var token = '';

    var mid = '';
    if (UserInfo) {
        token = UserInfo.token;
        mid = UserInfo.memberId;
    }
    // 向后台脚本发送消息
    chrome.runtime.sendMessage(
        { type: "USER_TOKEN", data: token, mid: mid },
        function (response) {
            //console.log("Response from background:", response);
        }
    );
    if (!CpsOption) {
        CpsOption = await GetStorage('CpsOption');
    }
    //console.log(CpsOption);
    if (!CpsOption) {
        CpsOption = { autocps: '', ratehide: '' }
        await SetStorage('CpsOption', CpsOption)
    }
   // autocps = `${CpsOption.autocps}`;
    //console.log('~~~~~' + autocps);
    //ratehide = CpsOption.ratehide;
    //console.log('~~~~~' + ratehide);
}


$(document).on("click", ".qlogin", function () {
    let url = `${Qingei}/jiaocheng`;
    window.open(url)
    //window.location.href = url;
})

// 浮球创建和更新函数
const floatingBall = document.createElement('div');
// 为浮球添加 WorkHard 类
floatingBall.classList.add('WorkHard');
floatingBall.style.width = 'auto'; // 调整宽度以适应内容
floatingBall.style.height = 'auto'; // 调整高度以适应内容
floatingBall.style.backgroundColor = '#ff4101';
floatingBall.style.borderRadius = '10px';
floatingBall.style.position = 'fixed';
floatingBall.style.cursor = 'pointer';
floatingBall.style.zIndex = '9999';
floatingBall.style.willChange = 'left, top';
floatingBall.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
floatingBall.style.fontSize = '12px'; // 调整字体大小
floatingBall.style.color = 'white';
floatingBall.style.textAlign = 'center';
floatingBall.style.padding = '5px';
floatingBall.style.lineHeight = '1.2';

// 从存储中获取浮球位置
chrome.storage.local.get(['ballX', 'ballY'], async function (result) {
    let x = result.ballX;
    let y = result.ballY;

    if (!CpsOption) {
        CpsOption = await GetStorage('CpsOption');
    }

    if (CpsOption?.ratehide === "1") {
        floatingBall.style.display = 'none';
    }

    if (x === undefined || y === undefined) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        // 浮球初始安装位置代码，可调整边框距离
        x = window.innerWidth - floatingBall.offsetWidth - 100 - scrollbarWidth;
        y = window.innerHeight - floatingBall.offsetHeight - 100;
    }

    floatingBall.style.left = x + 'px';
    floatingBall.style.top = y + 'px';

    // 将浮球添加到页面
    document.body.appendChild(floatingBall);
});

// 拖动功能
let isDragging = false;
let offsetX, offsetY;
// 初始化 isExpanded 变量
let isExpanded = false;
// 定义关闭菜单的延时定时器
let closeMenuTimer;

floatingBall.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - parseFloat(floatingBall.style.left);
    offsetY = e.clientY - parseFloat(floatingBall.style.top);
    e.preventDefault();
    // 拖动时关闭菜单
    if (isExpanded) {
        hideMenu();
    }
    //console.log('Mouse down on floating ball, isDragging:', isDragging);
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        newX = Math.max(0, Math.min(window.innerWidth - floatingBall.offsetWidth - 15 - scrollbarWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - floatingBall.offsetHeight - 15, newY));

        floatingBall.style.left = `${newX}px`;
        floatingBall.style.top = `${newY}px`;

        // 拖动时不显示菜单
        if (isExpanded) {
            hideMenu();
        }
        //console.log('Dragging floating ball, new position:', newX, newY);
    }
});

document.addEventListener('mouseup', function () {
    if (isDragging) {
        isDragging = false;
        const halfWidth = window.innerWidth / 2;
        const left = parseFloat(floatingBall.style.left);
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const newLeft = left < halfWidth ? 0 : window.innerWidth - floatingBall.offsetWidth - 8 - scrollbarWidth;
        floatingBall.style.left = `${newLeft}px`;

        chrome.storage.local.set({
            ballX: parseFloat(floatingBall.style.left),
            ballY: parseFloat(floatingBall.style.top)
        });
        //console.log('Mouse up, isDragging:', isDragging);
    }
});

// 创建菜单容器
const menuContainer = document.createElement('div');
menuContainer.style.position = 'fixed';
// 设置椭圆形背景
menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
menuContainer.style.borderRadius = '50px'; 
menuContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
menuContainer.style.display = 'none';
menuContainer.style.zIndex = '9998';
menuContainer.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
// 添加内边距
menuContainer.style.padding = '10px'; 

// 定义 3 个菜单项的图标和链接
const menuItemsData = [
    { icon: 'https://qingei.com/images/icon1.png', url: 'https://qingei.com/' },
    { icon: 'https://qingei.com/images/icon2.png', url: 'https://qingei.com/user/index' },
    { icon: 'https://qingei.com/images/icon3.png', url: 'https://qingei.com/user/kf' }
];

// 创建 3 个圆形菜单项
const menuItems = [];
// 减小菜单项大小
const menuItemSize = 20; 
for (let i = 0; i < 3; i++) {
    const menuItem = document.createElement('div');
    menuItem.style.width = `${menuItemSize}px`;
    menuItem.style.height = `${menuItemSize}px`;
    menuItem.style.borderRadius = '50%';
    menuItem.style.backgroundImage = `url(${menuItemsData[i].icon})`;
    menuItem.style.backgroundSize = 'cover';
    menuItem.style.cursor = 'pointer';
    menuItem.style.margin = '5px'; // 添加菜单项之间的间距
    menuItem.style.transition = 'transform 0.3s ease'; // 添加过渡效果

    // 鼠标悬停特效
    menuItem.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.2)'; // 放大图标
    });

    menuItem.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)'; // 恢复图标大小
    });

    menuItem.addEventListener('click', function () {
        window.open(menuItemsData[i].url, '_blank');
    });

    menuItems.push(menuItem);
    menuContainer.appendChild(menuItem);
}

document.body.appendChild(menuContainer);


// 鼠标覆盖显示菜单
function showMenu() {
    clearTimeout(closeMenuTimer);
    const left = parseFloat(floatingBall.style.left);
    const top = parseFloat(floatingBall.style.top);
    const gap = 5; // 调整间距
    // 用于调整菜单左右位置的变量，可根据需要修改
    const horizontalOffset = 10; 
    const menuTop = top - (menuItems.length * menuItemSize + gap * (menuItems.length - 1) + 40); // 调整菜单位置到浮框最顶端
    const menuLeft = left + (floatingBall.offsetWidth - menuItemSize) / 2 - 20 + horizontalOffset; // 调整菜单位置，加入左右调整
    menuContainer.style.left = `${menuLeft}px`;
    menuContainer.style.top = `${menuTop}px`;
    menuContainer.style.opacity = '1';
    menuContainer.style.visibility = 'visible';
    menuContainer.style.display = 'flex'; // 使用 flex 布局
    menuContainer.style.flexDirection = 'column'; // 垂直排列菜单项
    menuContainer.style.alignItems = 'center'; // 居中对齐菜单项
    menuContainer.style.width = '35px'; // 调整菜单宽度，可根据需要修改
    menuContainer.style.backgroundColor = '#f8f8f8'; // 背景颜色改为淡白色
    isExpanded = true;
    //console.log('Menu shown, position:', menuLeft, menuTop);
}  



function hideMenu() {
    menuContainer.style.opacity = '0';
    menuContainer.style.visibility = 'hidden';
    setTimeout(() => {
        menuContainer.style.display = 'none';
    }, 800);
    isExpanded = false;
    //console.log('Menu hidden');
}

floatingBall.addEventListener('mouseenter', function () {
    if (isDragging) {
        //console.log('Dragging, not showing menu');
        return;
    }
    showMenu();
    //console.log('Mouse entered floating ball, showing menu');
});

floatingBall.addEventListener('mouseleave', function (e) {
    if (!isDragging && !menuContainer.contains(e.relatedTarget)) {
        closeMenuTimer = setTimeout(() => {
            hideMenu();
            //console.log('Mouse left floating ball, hiding menu');
        }, 800);
    }
});

menuContainer.addEventListener('mouseleave', function (e) {
    if (!isDragging && !floatingBall.contains(e.relatedTarget)) {
        closeMenuTimer = setTimeout(() => {
            hideMenu();
            //console.log('Mouse left menu container, hiding menu');
        }, 800);
    }
});

// 调用 API 获取数据并更新浮球文字
function init() {
    initCnt++;
    if (initCnt > 500) {
        return;
    }
    loadTask();
    if ($(".WorkHard").length == 0) {
        setTimeout(() => {
            return init();
        }, 200);
    } else {
        return false;
    }
}

async function loadTask() {
    if (!CpsOption) {
        CpsOption = await GetStorage('CpsOption');
    }
    // 直接将 WorkHard 内容更新到浮球
    if ($(".WorkHard").length == 0) {
        floatingBall.innerHTML = `
            <div class="BrandName"></div>
            <div><span id="pluginTip"></span></div>
            <div class="Operation">
                <p class="newfan"><span></span></p>
                <p class="oldfan"><span></span></p>
                <p class="qlogin"><span></span></p>
            </div>
        `;
    }
    
    if ($(".WorkHard").length > 0) {
        await GetCps(); // 等待 GetCps 执行完成
        // 确保在 GetCps 执行后更新浮球内容
        updateFloatingBallContent(); 
    }

    // 初始时更新 floatingBall 的内容
    updateFloatingBallContent();
}

// 更新 floatingBall 的内容
function updateFloatingBallContent() {
    //const WorkHard = document.querySelector('.WorkHard');
    //if (WorkHard) {
    //    floatingBall.innerHTML = WorkHard.innerHTML;
    //}
}