loadCSS('libs/layui/css/layui.css');
version='5.3.13';
var initCnt = 0;
buyerLoginId1688='';
CpsOption = null;
UserInfo = null;
GetUserInfo();
pddOrders = {};
window.addEventListener('message', function(event) {
    // 确保消息来自当前网页
    if (event.source !== window) {
        return;
    }

    // 确保消息的类型是我们期望的
    if (event.data.type && (event.data.type === 'FROM_PAGE')) {
       console.log(event.data); 
       buyerLoginId1688 = event.data.buyerLoginId1688;
//		alert(buyerLoginId1688);
      //向后台脚本发送消息
       chrome.runtime.sendMessage(
       	{ type: "BUYER_LOGINID1688", data: buyerLoginId1688 },
       	function(response) {
       		console.log("Response from background:", response);
       	}
       );
    }
    
    // 确保消息的类型是我们期望的
    if (event.data.type && (event.data.type === 'PDD_ORDERS')) {
    	console.log(event.data); 
    	pddOrders = event.data.data?event.data.data.ordersStore.orders:{};
    }
});

if (window.location.hostname === 'detail.1688.com') { 
	loadJs('scripts/1688.js');
//	$(function(){ 
		init();
//	})
//	let tiemr = setInterval(() => {
//	    if(document.querySelector("#detail-main-video-content")){
//	        $("#TongKuan").hide()
//	    }else{
//	        $("#TongKuan").show();
//	    }
//	}, 100);
}
var host_ = window.location.hostname;
var href_ = window.location.href;
if (host_.includes('item.taobao.com')  ||host_.includes('detail.tmall.com')) { 
//	$(function(){		
		initTbk();
//	})
}else if(host_.includes('buyertrade.taobao.com')){//https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?spm=pc_detail.29232929/evo365560b447259.bought.1.43497dd6aTolGl
//	$(function(){
//		if($(".WorkBarTbk").length==0){
//			$("body").append(`<div class="WorkBarTbk" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
//					<div class="BrandNameTbk">TB助手<a class='tbk_help ' href='https://eccang.yuque.com/oo8zo1/lz5f8r/pmqn0g5i3ut9ns9t' target='_blank' title='帮助'>？</a></div>
//					<div><span id="pluginTip"></span></div>
//					<div class="OperationTbk">
//					<p class="getTbOrderId cps_alink" style='cursor:pointer;'>匹配返佣订单</p>
//					</div>
//			</div>`); 
//		}
//	})
}else if(host_.includes('.taobao.com')  ||host_.includes('.tmall.com')){
	$(function(){
		if($(".WorkBarTbk").length==0){
			$("body").append(`<div class="WorkBarTbk" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
					<div class="BrandNameTbk">TB助手<a class='tbk_help' href='https://eccang.yuque.com/oo8zo1/lz5f8r/pmqn0g5i3ut9ns9t' target='_blank' title='帮助'>？</a></div>
					<div><span id="pluginTip"></span></div>
					<div class="OperationTbk">
					<p class="zhuanlianTbk cps_alink" style='cursor:pointer;'>转链</p>
					</div>
			</div>`); 
		}
	})
}
if (host_.includes('item.jd.com')||host_.includes('item.m.jd.com') ||host_.includes('npcitem.jd.hk') ) { 
//	$(function(){		
		initJd();
//	})
}else if(host_.includes('order.jd.com')){
//	$(function(){
//		if($(".WorkBarJd").length==0){
//			$("body").append(`<div class="WorkBarJd" style="z-index:99999;position:fixed;right:50px;bottom:10px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
//					<div class="BrandNameJd">JD助手<a class='jd_help' href='https://eccang.yuque.com/oo8zo1/lz5f8r/mobdi67f55n3t5qa' target='_blank' title='帮助'>？</a></div>
//					<div><span id="pluginTip"></span></div>
//					<div class="OperationJd">
//					<p class="getJdOrderId cps_alink" style='cursor:pointer;'>匹配返佣订单</p>
//					</div>
//			</div>`); 
//		}
//	})
}

if (href_.includes('mobile.yangkeduo.com/goods') ) { 
//	$(function(){		
		initPdd();
//	})
}else if(href_.includes('mobile.yangkeduo.com/orders.html')){
//	loadJs('scripts/pdd_orders.js');
//	$(function(){
//		if($(".WorkBarPdd").length==0){
//			$("body").append(`<div class="WorkBarPdd" style="z-index:99999;position:fixed;right:50px;bottom:10px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
//					<div class="BrandNamePdd">PDD助手(Bata)<a class='pdd_help' href='https://eccang.yuque.com/oo8zo1/lz5f8r/ydrbxzhn3ap5iz1z' target='_blank' title='帮助'>？</a></div>
//					<div><span id="pluginTip"></span></div>
//					<div class="OperationPdd">
//					<p class="getPddOrderId cps_alink" style='cursor:pointer;'>匹配返佣订单</p>
//					</div>
//			</div>`); 
//		}
//	})
}

$(document).on("click", "#TongKuan", function () {
	let mid='';
	let token='';
    if (UserInfo) {
//        return layer.alert('请登录再操作！')
    	mid = UserInfo.memberId;
    	token = UserInfo.token;
    }
    let image = encodeURIComponent($("img.preview-img").attr('src'));
    if (!$("img.preview-img").attr('src')) {
        image = encodeURIComponent($("img.detail-gallery-img").attr('src'));
    }
    let url = `${AaiIp}/default/index/tongkuan-list?mid=${mid}&imgUrl=${image}&token=${token}&source=plugin&version=${version}`;
    if(typeof layer === 'undefined'){	 
        window.open(url);
    }else{
    	layer.open({
    		type: 2,
    		title: '搜同款'+(mid?"":'(未登录)'),
    		shadeClose: true,
    		maxmin: true, // 允许全屏最小化
    		shade: 0.8,
    		area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
    		offset: 'auto', // 自动居中
    		content: url // iframe的url
    	});
    }
})

$(document).on("click", ".tongkuan1688", function () {
	let mid='';
	let token='';
	if (UserInfo) {
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let image = window.location.href.split('.html')[0].split('/offer/')[1];
	let url = `${AaiIp}/default/index/tongkuan-list?mid=${mid}&imgUrl=${image}&token=${token}&source=plugin&version=${version}`;
	if(typeof layer === 'undefined'){	 
		window.open(url);
	}else{
		layer.open({
			type: 2,
			title: '搜同款'+(mid?"":'(未登录)'),
			shadeClose: true,
			maxmin: true, // 允许全屏最小化
			shade: 0.8,
			area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
			offset: 'auto', // 自动居中
			content: url // iframe的url
		});
	}
})

$(document).on("click", ".zhuanlian", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
    if (UserInfo) {
//        return layer.alert('请登录再操作！');
        mid = UserInfo.memberId;
    }
    let image = encodeURIComponent($("img.preview-img").attr('src'));
    let itemurl = encodeURIComponent(window.location.href);
    let url = `${AaiIp}/default/svc/get-cps-url?mid=${mid}&percentTag=1&type=jump&param=${itemurl}&source=plugin&click=1&version=${version}&buyerLoginId1688=${buyerLoginId1688}&s=cps`;
    //window.open(url)
    window.location.href = url;
})
$(document).on("click", ".zhuanlianTbk", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let image = encodeURIComponent($("img.preview-img").attr('src'));
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIpCg}/default/svc-tb/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
	//window.open(url)
	window.location.href = url;
})
$(document).on("click", ".getTbOrderId", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	mid = UserInfo.memberId;
	var orderIdArr = [];
	$("[class*='bought-wrapper-mod__head-info-cell']").each(function(k,v){
		var order_id = $(this).attr('data-reactid');
		console.log(order_id);
		let regex = /order\-(\d{19})\./; // 正则表达式匹配19位数字
		let match = order_id.match(regex);
		if (match) {
		    console.log(match[1]); // 输出匹配到的数字
		    order_id = match[1];
		    orderIdArr.push(order_id);
		}
	})
//	alert(orderIdArr.join(","));
	layer.confirm('提取到以下订单号<br/>'+orderIdArr.join("<br/>"),{title:'订单号提取',maxHeight:300,btn: ['返佣订单匹配','关闭']}, function(index){
        layer.close(index); // 关闭确认提示框
        // 此处可执行 Ajax 等操作
        syncTbOrder(orderIdArr.join(','));
      }, function(index){
          layer.close(index); // 关闭确认提示框
      });
})
$(document).on("click", ".zhuanlianJd", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIpCg}/default/svc-jd/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
	//window.open(url)
	window.location.href = url;
})
$(document).on("click", ".zhuanlianPdd", function () {
	layer.confirm('直接转链购买，会触发平台比价规则，导致平台不给佣金。<br/>建议您复制链接分享，使用另外一个账号访问后进行购买。<br/>如需继续，请点击"确定"',{title:'转链提示',maxHeight:300,btn: ['确定','关闭']}, function(index){
        layer.close(index); // 关闭确认提示框
        let mid='';
    	if (!UserInfo) {
            return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
    	}
    	if (UserInfo) {
//            return layer.alert('请登录再操作！');
    		mid = UserInfo.memberId;
    	}
    	let itemurl = encodeURIComponent(window.location.href);
    	let url = `${AaiIpCg}/default/svc-pdd/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
    	//window.open(url)
    	window.location.href = url;
      }, function(index){
          layer.close(index); // 关闭确认提示框
      });
	
})

$(document).on("click", ".getJdOrderId", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
		mid = UserInfo.memberId;
	}
	var orderIdArr = [];
	$("a[name='orderIdLinks']").each(function(k,v){
		var order_id = $(this).text();
		console.log(order_id);		 
		orderIdArr.push(order_id);		 
	})
//	alert(orderIdArr.join(","));
	layer.confirm('提取到以下订单号<br/>'+orderIdArr.join("<br/>"),{title:'订单号提取',maxHeight:300,btn: ['返佣订单匹配','关闭']}, function(index){
        layer.close(index); // 关闭确认提示框
        // 此处可执行 Ajax 等操作
        syncJdOrder(orderIdArr.join(','));
      }, function(index){
          layer.close(index); // 关闭确认提示框
      });
})
$(document).on("click", ".getPddOrderId", function () {
	let mid='';
	if (!UserInfo) {
		return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
		mid = UserInfo.memberId;
	}
	if(pddOrders.length==0){
		return layer.alert('没有订单');		
	}
	var orderIdArr = [];
	$(pddOrders).each(function(k,v){
		var order_id = v.orderSn;
		console.log(order_id);		 
		orderIdArr.push(order_id);		 
	})
//	alert(orderIdArr.join(","));
	layer.confirm('提取到以下订单号<br/>'+orderIdArr.join("<br/>"),{title:'订单号提取',maxHeight:300,btn: ['返佣订单匹配','关闭']}, function(index){
		layer.close(index); // 关闭确认提示框
		// 此处可执行 Ajax 等操作
		syncPddOrder(orderIdArr.join(','));
	}, function(index){
		layer.close(index); // 关闭确认提示框
	});
})
$(document).on("click", ".buy1688", function () {
	let token='';
    if (UserInfo) {
//        return layer.alert('请登录再操作！');
        token = UserInfo.token;
    }
    var att1 = $('.prop-item-wrapper .prop-item .active .prop-name').text();
	console.log(att1);
	var att2 = {};
	var attrLen = 0;
	$('.sku-item-wrapper').each(function(){
		var name = $('.sku-item-name',$(this)).text();
		var val = $('input',$(this)).val();
		console.log(name+" "+val);
		if(val>0){
			att2[name] = val;
			attrLen++;
		}
	})
	var param = '';
	if(att1 || attrLen){		
		param = {"att1":att1,'att2':att2};
		param = JSON.stringify(param);
		console.log((param));
	}
	if(!param){
//		next-input 
		var attrLen = 0;
		var inputs = $('.next-table-body .next-table-cell-wrapper .next-input input').filter(function() {
			return $(this).val() > 0;
		});
		console.log(inputs);
		inputs.each(function(){
			var currentIndex = $('.next-table-body .next-table-row .next-input input').index($(this));
			var val = $(this).val();
			console.log(currentIndex+"=="+val);
			var tr = $('.selector-table-wrapper .next-table-body .next-table-row').eq(currentIndex);
			var tdArr = [];
			$('td .normal-text',tr).each(function(){
				var txt = $(this).text();
				tdArr.push(txt);
			})
			att2[tdArr.join('~$~')] = val;
			console.log(tdArr);
			attrLen++;
		})
		if(att1 || attrLen){			
			param = {"att1":att1,'att2':att2};
			param = JSON.stringify(param);
			console.log((param));
		}
//		return;
	}
	if(!param){
//		next-input 
		var attrLen = 0;
		var inputs = $('.next-table-lock-right .next-table-cell-wrapper .next-input input').filter(function() {
		    return $(this).val() > 0;
		  });
		inputs.each(function(){
			var currentIndex = $('.next-table-lock-right .next-table-cell-wrapper .next-input input').index($(this));
			var val = $(this).val();
			console.log(currentIndex+"=="+val);
			var tr = $('.selector-table-wrapper .next-table-body .next-table-row').eq(currentIndex);
			var tdArr = [];
			$('td .normal-text',tr).each(function(){
				var txt = $(this).text();
				tdArr.push(txt);
			})
			att2[tdArr.join('~$~')] = val;
			console.log(tdArr);
			attrLen++;
		})
		if(att1 || attrLen){		
			param = {"att1":att1,'att2':att2};
			param = JSON.stringify(param);
			console.log((param));
		}
//		return;
	}
	param = encodeURIComponent(param);
	console.log((param));
    let image = encodeURIComponent($("img.preview-img").attr('src'));
//    let itemurl = encodeURIComponent('/ali1688po/buybox/list?op=yjxd&offer_id=' + window.location.href.split('.html')[0].split('/offer/')[1]);
//    let url = `${AaiIpCg}/default/index/home?redirect=${itemurl}&token=${token}&name=一键下单&source=plugin&version=${version}`;
    let itemurl1 = '/ali1688po/buybox/list?op=yjxd&offer_id=' + window.location.href.split('.html')[0].split('/offer/')[1];
    let url = `${AaiIpCg}${itemurl1}&source=plugin&fanli=1`;    
    url+=`&param=${param}`;
    url+=`&buyerLoginId1688=${buyerLoginId1688}`;
    window.open(url)
})

function init(){
	initCnt++;
	if(initCnt > 500){
		return;
	}
    loadTask(); 
    if($(".WorkBar").length==0){
        setTimeout(() => {
            return init();
        }, 200);
    }else{
        return false;
    } 
}

async function loadTask() {	 
	if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
    $(".gallery-fix-wrapper").prepend(`<div id="TongKuan">1688同款</div>`)
    $('body').append(`<div class="WorkBar" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
		    <div class="BrandName">1688助手 <a class='ali_help ' href='https://eccang.yuque.com/oo8zo1/lz5f8r/lq0m7lkwo1nk6rrv' target='_blank' title='帮助'>？</a></div>
		    <div id="pluginTip"></div>
		    <div class="Operation">
		    <p class="newman">新客:<span>-</span></p>
		    <p class="oldman">老客:<span>-</span></p>
    		<p class="lianjieCopy cps_alink" title="">复制链接分享</p>
		    <p class="zhuanlian cps_alink">转链</p>
		    <p class="buy1688 cps_alink" title="助您找到活动价/精选货源/减少采购成本/返利下单">返利下单</p>
		    <p class="tongkuan1688 cps_alink" >同款比价</p>
		    </div>
		    </div>`);
    if(CpsOption && CpsOption.ratehide && CpsOption.ratehide=="1"){
    	$('.WorkBar .newman,.WorkBar .oldman').hide();
    }
    if($(".WorkBar").length>0){    	
    	GetCps();
    }
}

function initTbk(){
	initCnt++;
	if(initCnt > 500){
		return;
	}
	loadTaskTbk(); 
    if($(".WorkBarTbk").length==0){
        setTimeout(() => {
            return initTbk();
        }, 200);
    }else{
        return false;
    } 
}

async function loadTaskTbk() {	
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');
	}
	var tip = '';
	if(UserInfo){
		tip='';
	}
	if($(".WorkBarTbk").length==0){		
		$("body").append(`<div class="WorkBarTbk" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
				<div class="BrandNameTbk">TB助手<a class='tbk_help ' href='https://eccang.yuque.com/oo8zo1/lz5f8r/pmqn0g5i3ut9ns9t' target='_blank' title='帮助'>？</a></div>
				<div><span id="pluginTip"></span></div>
				<div class="OperationTbk">
				<p class="newman"></p> 
				<p class="lianjieTbk cps_alink" style='cursor:pointer;'>复制链接分享</p>
				<p class="zhuanlianTbk cps_alink" style='cursor:pointer;'>-</p>
				</div>
		</div>`); 
		console.log('init');
	}
    if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
    if(CpsOption && CpsOption.ratehide=="1"){
    	$('.WorkBarTbk .newman,.WorkBarTbk .oldman').hide();
    }
    if($(".WorkBarTbk").length>0){    	
    	GetCpsTbk();
    }
}

function initJd(){
	initCnt++;
	if(initCnt > 500){
		return;
	}
	loadTaskJd(); 
	if($(".WorkBarJd").length==0){
		setTimeout(() => {
			return initJd();
		}, 200);
	}else{
		return false;
	} 
}

function initPdd(){
	initCnt++;
	if(initCnt > 500){
		return;
	}
	loadTaskPdd(); 
	if($(".WorkBarPdd").length==0){
		setTimeout(() => {
			return initPdd();
		}, 200);
	}else{
		return false;
	} 
}
var tryCnt = 0;
async function loadTaskJd() {	
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');
	}
	var tip = '';
	if(UserInfo){
		tip='';
	}
	if($(".WorkBarJd").length==0){
		$("body").append(`<div class="WorkBarJd" style="z-index:99999;position:fixed;right:50px;bottom:10px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
				<div class="BrandNameJd">JD助手<a class='jd_help ' href='https://eccang.yuque.com/oo8zo1/lz5f8r/mobdi67f55n3t5qa' target='_blank' title='帮助'>？</a></div>
				<div><span id="pluginTip"></span></div>
				<div class="OperationJd">
				<p class="newman">-</p> 
				<p class="lianjieJd cps_alink" style='cursor:pointer;color:#3095F7;'>复制链接分享</p>
				<p class="zhuanlianJd cps_alink" style='cursor:pointer;color:#3095F7;'>-</p>
				</div>
		</div>`); 
		console.log('init');
	}
	if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
	if(CpsOption && CpsOption.ratehide=="1"){
		$('.WorkBarJd .newman,.WorkBarJd .oldman').hide();
	}
	if($(".WorkBarJd").length>0){		
		GetCpsJd();
	}
}

async function loadTaskPdd() {	
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');
	}
	var tip = '';
	if(UserInfo){
		tip='';
	}
	if($(".WorkBarPdd").length==0){
		$("body").append(`<div class="WorkBarPdd" style="z-index:99999;position:fixed;right:50px;bottom:10px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
				<div class="BrandNamePdd">PDD助手(Bata)<a class='pdd_help ' href='https://eccang.yuque.com/oo8zo1/lz5f8r/ydrbxzhn3ap5iz1z' target='_blank' title='帮助'>？</a></div>
				<div><span id="pluginTip"></span></div>
				<div class="OperationPdd">
				<p class="newman"></p> 
				<p class="lianjiePdd cps_alink" style='cursor:pointer;'>复制链接分享</p>
				<p class="zhuanlianPdd cps_alink" style='cursor:pointer;'>-</p>
				</div>
		</div>`); 
		console.log('init');
	}
	if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
	if(CpsOption && CpsOption.ratehide=="1"){
		$('.WorkBarJd .newman,.WorkBarJd .oldman').hide();
	}
	if($(".WorkBarPdd").length>0){		
		GetCpsPdd();
	}
}
function loadCSS(url) {
    url = chrome.runtime.getURL(url);
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = url;
    document.head.prepend(linkElement);
}
function loadJs(url) {
    url = chrome.runtime.getURL(url);
    var linkElement = document.createElement('script');
    linkElement.src = url;
    document.body.append(linkElement);
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }	  
  return result;
}

function getCpsLocalId(){//用来做短信并发控制
	var abcValue = '';
	if (!localStorage.getItem('cpsLlocalId')) {
	  	abcValue = generateRandomString(128);
	  	localStorage.setItem('cpsLlocalId', abcValue);
	} else {
		abcValue = localStorage.getItem('cpsLlocalId');
	}
//	console.log(abcValue);
	return abcValue;
}
async function GetCps(){
    if(!UserInfo){
    	UserInfo = await GetStorage('UserInfo');    	
    }
    if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
    let mid='';
    if(UserInfo){
    	mid = UserInfo.memberId;
    }
    let itemurl = encodeURIComponent(window.location.href);
    let localId = getCpsLocalId();
    let poastdata = {
        param:itemurl,
        mid:mid,
        type:'json',
        percentTag:1,
        source:'plugin',
        version:version,
        localId:localId,
        buyerLoginId1688:buyerLoginId1688,
		s:'cps',
        auto:1
//        auto: ((CpsOption && CpsOption.autocps=="1")?1:0)
    }
//    未登录
//    account-signin redPackageInfoBox
//
//    已登录
//    memberPhoto
    let res = await FetchRequest(AaiIp + '/default/svc/get-cps-url', poastdata, 'POSTDATA');
    console.log(AaiIp + '/default/svc/get-cps-url');
    console.log(poastdata);
    console.log(res);
   
    if (res.state) {
        if (res.data.ask == 1) {
            if(res.data.data){
                $(".newman span").html(res.data.data.newRate);
                $(".oldman span").html(res.data.data.oldRate);
                $(".zhuanlian").html('转链'+(mid?'':"(未登录)"));
                
                let url = window.location.href;                
                if(res.data.data.jump && !(url.includes("tracelog="))){//已经转链，无需重新转换
                	//window.location.href = res.data.data.jump;
                }
//                if(res.data.data.jump && !(url.includes("tracelog="))){//已经转链，无需重新转换
//	                var popup = window.open(
//	            			res.data.data.jump,
//	            			  "",
//	            			  "width=1,height=1,top=200,left=0,toolbar=no,scrollbars=no,location=no,resizable=no"
//	            			);
//	            	setTimeout(function() {
//	      			  popup.close();
//	      			}, 2000);
//                }
            }else{
                $(".zhuanlian").css({
                    "pointer-events": "none",
                    "color": "gray" // 修改颜色为灰色
                  });
//                $(".zhuanlian").html('转链(无佣金)');
                $(".zhuanlian").html('-');
            }
        }else if (res.data.ask == 2) {
            if(res.data.data){
                $(".newman span").html(res.data.data.newRate);
                $(".oldman span").html(res.data.data.oldRate);
                $(".zhuanlian").html('转链'+(mid?'':"(未登录)"));                
            }else{
                $(".zhuanlian").css({
                    "pointer-events": "none",
                    "color": "gray" // 修改颜色为灰色
                  });
//              $(".zhuanlian").html('转链(无佣金)');
                $(".zhuanlian").html('-');
            }
        } else {
            //layer.msg('转链失败-'+res.data.message);
            $(".zhuanlian").css({
                "pointer-events": "none",
                "color": "gray" // 修改颜色为灰色
              });
//            $(".zhuanlian").html('转链('+res.data.message+')');
            $(".zhuanlian").html('-');
        }
        if(res.data.versionTip){
        	$('#pluginTip').html("("+res.data.versionTip+")");
        }
    } else {
        layer.msg('转链失败-通讯失败');
    }
//    }else{
//        setTimeout(() => {
//            return GetCps();
//        }, 500);
//    }
}

async function GetCpsTbk(){
    if(!UserInfo){
    	UserInfo = await GetStorage('UserInfo');    	
    }
    if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
    let mid='';
    let token='';
    if(UserInfo){
    	mid = UserInfo.memberId;
    	token = UserInfo.token;
    }
    let itemurl = encodeURIComponent(window.location.href);
    let localId = getCpsLocalId();
    let poastdata = {
        param:itemurl,
        mid:mid,
        type:'json',
        percentTag:1,
        source:'plugin',
        token:token,
        version:version,
        localId:localId,
		s:'cps',
        auto: ((CpsOption && CpsOption.autocps=="1")?1:0)
    }
    console.log(poastdata);
//    未登录
//    account-signin redPackageInfoBox
//
//    已登录
//    memberPhoto
    let res = await FetchRequest(AaiIpCg + '/default/svc-tb/get-cps-url', poastdata, 'POSTDATA');
    if (res.state) {
        console.log(AaiIpCg + '/default/svc-tb/get-cps-url');
        console.log(res);
        if (res.data.ask == 1) {
            if(res.data.data){
                $(".newman").html(res.data.message?res.data.message:'无佣金');
                $(".zhuanlianTbk").html('转链购买');
                
                let url = window.location.href;                
                if(CpsOption.autocps=='1' && res.data.data.jump && !(url.includes("ali_trackid="))){//已经转链，无需重新转换
                	window.location.href = res.data.data.jump;
                }
            }else{
//                $(".zhuanlianTbk").css({
//                    "pointer-events": "none",
//                    "color": "gray" // 修改颜色为灰色
//                  });
                $(".zhuanlianTbk").html('尝试转链(-)');
            }
        }else if (res.data.ask == 2) {
            if(res.data.data){
                $(".newman").html(res.data.message?res.data.message:'无佣金');
                $(".zhuanlianTbk").html('转链购买');                
            }else{
//                $(".zhuanlianTbk").css({
//                    "pointer-events": "none",
//                    "color": "gray" // 修改颜色为灰色
//                  });
              $(".zhuanlianTbk").html('尝试转链(-)');
            }
        } else {
            //layer.msg('转链失败-'+res.data.message);
//            $(".zhuanlianTbk").css({
//                "pointer-events": "none",
//                "color": "gray" // 修改颜色为灰色
//              });
            $(".newman").html('无佣金');
            $(".zhuanlianTbk").html('尝试转链(-)');
        }
        if(res.data.login=='false'){
            $(".zhuanlianTbk").html('无法转链[联系管理员]');        	
        }
        if(res.data.versionTip){
        	$('#pluginTip').html("("+res.data.versionTip+")");
        }
    } else {
        layer.msg('转链失败-通讯失败');
    }
//    }else{
//        setTimeout(() => {
//            return GetCps();
//        }, 500);
//    }
}
async function syncTbOrder(orderIds){
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');    	
	}	
	let mid='';
	let token='';
	if(UserInfo){
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let localId = getCpsLocalId();
	let poastdata = {			
			mid:mid,
			source:'plugin',
			token:token,
			orderIds:orderIds
	}
	let res = await FetchRequest(AaiIp + '/default/svc-tb/sync-order', poastdata, 'POSTDATA');
	console.log(res);
	if (res.state) {
		var msg = res.data.message;
		if (res.data.ask == 1) {
			var name = encodeURIComponent('淘宝推广订单列表');
			msg+="<br/>"+`<a target='_blank' href='${AaiIp}/default/index/home?redirect=/cps/cps-orders-tbk/list&name=${name}&source=plugin&version=${version}&token=${token}'>查看佣金订单</a>`;
		} else {
			
		}	
		layer.open({
		  type: 1, // page 层类型
		  area: ['500px', '300px'],
		  title: '匹配结果(点击阴影处关闭)',
		  shade: 0.6, // 遮罩透明度
		  //maxmin: true,
		  shadeClose: true, // 点击遮罩区域，关闭弹层		 
		  anim: 0, // 0-6 的动画形式，-1 不开启
		  content: '<div style="padding: 32px;">'+msg+'</div>'
		});
	} else {
		layer.msg('通讯失败');
	}
}
async function syncJdOrder(orderIds){
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');    	
	}	
	let mid='';
	let token='';
	if(UserInfo){
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let localId = getCpsLocalId();
	let poastdata = {			
			mid:mid,
			source:'plugin',
			token:token,
			orderIds:orderIds
	}
	let res = await FetchRequest(AaiIp + '/default/svc-jd/sync-order', poastdata, 'POSTDATA');
	console.log(res);
	if (res.state) {
		var msg = res.data.message;
		if (res.data.ask == 1) {
			var name = encodeURIComponent('京东推广订单列表');
			msg+="<br/>"+`<a target='_blank' href='${AaiIp}/default/index/home?redirect=/cps/cps-orders-jd/list&name=${name}&source=plugin&version=${version}&token=${token}'>查看佣金订单</a>`;
		} else {
			
		}	
		layer.open({
			type: 1, // page 层类型
			area: ['500px', '300px'],
			title: '匹配结果(点击阴影处关闭)',
			shade: 0.6, // 遮罩透明度
			//maxmin: true,
			shadeClose: true, // 点击遮罩区域，关闭弹层		 
			anim: 0, // 0-6 的动画形式，-1 不开启
			content: '<div style="padding: 32px;">'+msg+'</div>'
		});
	} else {
		layer.msg('通讯失败');
	}
}
async function syncPddOrder(orderIds){
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');    	
	}	
	let mid='';
	let token='';
	if(UserInfo){
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let localId = getCpsLocalId();
	let poastdata = {			
			mid:mid,
			source:'plugin',
			token:token,
			orderIds:orderIds
	}
	let res = await FetchRequest(AaiIp + '/default/svc-pdd/sync-order', poastdata, 'POSTDATA');
	console.log(res);
	if (res.state) {
		var msg = res.data.message;
		if (res.data.ask == 1) {
			var name = encodeURIComponent('PDD推广订单列表');
			msg+="<br/>"+`<a target='_blank' href='${AaiIp}/default/index/home?redirect=/cps/cps-orders-pdd/list&name=${name}&source=plugin&version=${version}&token=${token}'>查看佣金订单</a>`;
		} else {
			
		}	
		layer.open({
			type: 1, // page 层类型
			area: ['500px', '300px'],
			title: '匹配结果(点击阴影处关闭)',
			shade: 0.6, // 遮罩透明度
			//maxmin: true,
			shadeClose: true, // 点击遮罩区域，关闭弹层		 
			anim: 0, // 0-6 的动画形式，-1 不开启
			content: '<div style="padding: 32px;">'+msg+'</div>'
		});
	} else {
		layer.msg('通讯失败');
	}
}

async function GetCpsJd(){
	tryCnt++;
	if(tryCnt>30){
		$('.newman').removeClass('eccang_cpsloading');
		return ;
	}
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');    	
	}
	if(!CpsOption){    	
		CpsOption = await GetStorage('CpsOption');
	}
	let mid='';
	if(UserInfo){
		mid = UserInfo.memberId;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let localId = getCpsLocalId();
	let poastdata = {
			param:itemurl,
			mid:mid,
			type:'json',
			percentTag:1,
			source:'plugin',
			version:version,
			localId:localId,
			s:'cps',
			auto: ((CpsOption && CpsOption.autocps=="1")?1:0)
	}
	console.log(poastdata);
	console.log(AaiIpCg + '/default/svc-jd/get-cps-url#'+tryCnt);
	$('.newman').addClass('eccang_cpsloading');
	let res = await FetchRequest(AaiIpCg + '/default/svc-jd/get-cps-url', poastdata, 'POSTDATA');
	if (res.state) {
		console.log(res);
		if (res.data.ask == 1) {
			if(res.data.data){
				$(".newman ").html(res.data.message);
				$(".zhuanlianJd ").html('转链购买');				
			}else{
				$(".zhuanlianJd ").html('转链(-)');
			}
			tryCnt = 500;
			$('.newman').removeClass('eccang_cpsloading');
		}else if (res.data.ask == 2) {
			if(res.data.data){
				$(".newman ").html(res.data.message);
				$(".zhuanlianJd ").html('转链购买');                
			}else{
				$(".zhuanlianJd ").html('尝试转链(-)');
			}
			tryCnt = 500;
			$('.newman').removeClass('eccang_cpsloading');
		}else if (res.data.ask == 3) {
			if(res.data.data){
				$(".newman ").html(res.data.message);              
			}
			$(".zhuanlianJd ").html('尝试转链(-)');
			tryCnt = 500;
			$('.newman ').removeClass('eccang_cpsloading');
		} else {
			setTimeout(function(){				
				GetCpsJd();
			},1500)
		}
		if(res.data.versionTip){
			$('#pluginTip').html("("+res.data.versionTip+")");
		}
	} else {
		//layer.msg('转链失败-通讯失败');
	}
}

async function GetCpsPdd(){
	tryCnt++;
	if(tryCnt>30){
		$('.newman').removeClass('eccang_cpsloading');
		return ;
	}
	if(!UserInfo){
		UserInfo = await GetStorage('UserInfo');    	
	}
	if(!CpsOption){    	
		CpsOption = await GetStorage('CpsOption');
	}
	let mid='';
	if(UserInfo){
		mid = UserInfo.memberId;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let localId = getCpsLocalId();
	let poastdata = {
			param:itemurl,
			mid:mid,
			type:'json',
			percentTag:1,
			source:'plugin',
			version:version,
			localId:localId,
			s:'cps',
			auto: ((CpsOption && CpsOption.autocps=="1")?1:0)
	}
	console.log(poastdata);
	console.log(AaiIpCg + '/default/svc-pdd/get-cps-url#'+tryCnt);
	$('.newman').addClass('eccang_cpsloading');
	let res = await FetchRequest(AaiIpCg + '/default/svc-pdd/get-cps-url', poastdata, 'POSTDATA');
	if (res.state) {
		console.log(res);
		if (res.data.ask == 1) {
			if(res.data.data){
				$(".newman").html(res.data.message);
				$(".zhuanlianPdd").html('转链购买');				
			}else{
				$(".zhuanlianPdd").html('转链(-)');
			}
			tryCnt = 500;
			$('.newman').removeClass('eccang_cpsloading');
		}else if (res.data.ask == 2) {
			if(res.data.data){
				$(".newman").html(res.data.message);
				$(".zhuanlianPdd").html('转链购买');                
			}else{
				$(".zhuanlianPdd").html('尝试转链(-)');
			}
			tryCnt = 500;
			$('.newman').removeClass('eccang_cpsloading');
		}else if (res.data.ask == 3) {
			if(res.data.data){
				$(".newman").html(res.data.message);              
			}
			$(".zhuanlianPdd").html('尝试转链(-)');
			tryCnt = 500;
			$('.newman').removeClass('eccang_cpsloading');
		} else {
			setTimeout(function(){				
				GetCpsPdd();
			},1500)
		}
		if(res.data.versionTip){
			$('#pluginTip').html("("+res.data.versionTip+")");
		}
	} else {
		//layer.msg('转链失败-通讯失败');
	}
}
async function GetUserInfo(){
	UserInfo = await GetStorage('UserInfo');
	console.log(UserInfo);
	var token = '';
	if(UserInfo){
		token = UserInfo.token;
	}
	// 向后台脚本发送消息
	chrome.runtime.sendMessage(
		{ type: "USER_TOKEN", data: token },
		function(response) {
			console.log("Response from background:", response);
		}
	);
	if(!CpsOption){    	
    	CpsOption = await GetStorage('CpsOption');
    }
	console.log(CpsOption);
	if(!CpsOption){
		CpsOption = {autocps:'',ratehide:''}
		await SetStorage('CpsOption',CpsOption)
	}
	autocps = `${CpsOption.autocps}`;
	console.log('~~~~~'+autocps);
	ratehide =  CpsOption.ratehide;
	console.log('~~~~~'+ratehide);
}


$(function(){

$(document).on("click", ".tongkuanImg", function (e) { 
	e.stopPropagation();
	e.preventDefault();
	let img = $(this).attr('_src');
	if(!img){
		return;
	}
	if (img.startsWith("//")) {
		img = 'http:'+img;
	}
	if (!(img.startsWith("http"))) {
		var url1 = new URL(window.location.href);
		var protocol = url1.protocol; // 协议部分，包括冒号（:）
		var hostname = url1.hostname; // 主机名部分
		var port = url1.port; // 端口号部分，包括冒号（:）			
		img = protocol + '//' + hostname + (port ? ':' + port : '')+img;
		console.log(window.location.href);
	}
    let image = encodeURIComponent(img); 
//    let url = `${AaiIp}/default/index/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin`;
    let url = `${AaiIp}/default/index/tongkuan-list?mid=&imgUrl=${image}&token=&source=plugin&version=${version}`;
    if (UserInfo) {
    	url = `${AaiIp}/default/index/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin&version=${version}`;    	
    }
    if(typeof layer === 'undefined'){	 
        window.open(url);
    }else{
    	layer.open({
    		type: 2,
    		title: '1688同款',
    		shadeClose: true,
    		maxmin: true, // 允许全屏最小化
    		shade: 0.8,
    		area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
    		offset: 'auto', // 自动居中
    		content: url // iframe的url
    	});
    }
});

let url = window.location.href;

if($('.tongkuanImg').size()==0 && $('img:visible').size()>0){
	$('body').append('<div class="tongkuanImg" _src="" style="display:none;position:absolute;color:red;border:1px solid red;background:#fff;cursor:pointer;padding:1px 3px;border-radius: 3px;font-size:12px;">1688同款</div>');
}
if (url.includes(".amazon.")) {//amazon 
	$('#main-image-container').on('mouseover',function(){
//    	$('.tongkuanImg').hide();
		var off = $(this).offset();
		var w = $(this).width();
		var h = $(this).height();
    	var x = off.left + w - 110;
    	x = Math.round(x);
    	var y = off.top + 15;
    	if($('img:visible',this).size()>0){        		
    		var src = $('img:visible',this).attr('src');
    		y = Math.round(y);
    		console.log(x+'=='+y);
    		console.log(w+'=='+h);
    		console.log(src);
    		$('.tongkuanImg').attr('_src',src).css({"left": x+"px","top": y+"px"});
    		if(w>=200 && h>=200){
    			$('.tongkuanImg').show();    		
    		}
    	}
	}) 
}
if (url.includes("detail.tmall.com") || url.includes("item.taobao.com")) {//淘宝
	$(function(){
		$("[class*='PicGallery--mainPicWrap--']").on('mouseover',function(){
//		$('.tongkuanImg').hide();
			var off = $(this).offset();
			var w = $(this).width();
			var h = $(this).height();
			var x = off.left + w - 70;
			x = Math.round(x);
			var y = off.top + 15;
			if($('img:visible',this).size()>0){        		
				var src = $('img:visible',this).attr('src');
				src = src.replace("_.webp", "");
				y = Math.round(y);
				console.log(x+'=='+y);
				console.log(w+'=='+h);
				console.log(src);
				$('.tongkuanImg').css({"z-index":9999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
				if(w>=100 && h>=100){
					$('.tongkuanImg').show();    		
				}
			}
		}) 
	})
}
if (url.includes(".aliexpress.")) {//aliexpress
	$("body").on('mouseover',function(){
		
//		$('.tongkuanImg').hide();
		var off = $("[class*='image-view--previewWrap--']",this).offset();
		var w = $("[class*='image-view--previewWrap--']",this).width();
		var h = $("[class*='image-view--previewWrap--']",this).height();
		if($("[class*='image-view--previewWrap--'] img:visible").size()>0){        		
			var x = off.left + w - 70;
			x = Math.round(x);
			var y = off.top + 15;
			var src = $("[class*='image-view--previewWrap--'] img:visible").attr('src');
			src = src.replace("_.webp", "");
			y = Math.round(y);
			console.log(x+'=='+y);
			console.log(w+'=='+h);
			console.log(src);
			$('.tongkuanImg').css({"z-index":9999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
			if(w>=100 && h>=100){
				$('.tongkuanImg').show();    		
			}
		}
	}) 
}
if (url.includes(".coupang.")) {//aliexpress
	$("#repImageContainer").on('mouseover',function(){    		
//		$('.tongkuanImg').hide();
		var obj = $(this).parent();
		var off = obj.offset();
		var w = obj.width();
		var h = obj.height();
		if($(".prod-image__detail",this).size()>0){        		
			var x = off.left + w - 100;
			x = Math.round(x);
			var y = off.top + 15;
			var src = $(".prod-image__detail",this).attr('src');
			src = src.replace("_.webp", "");
			y = Math.round(y);
			console.log(x+'=='+y);
			console.log(w+'=='+h);
			console.log(src);
			$('.tongkuanImg').css({"z-index":9999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
			if(w>=100 && h>=100){
				$('.tongkuanImg').show();    		
			}
		}
	}) 
}
//shopee
//https://down-my.img.susercontent.com/file/cn-11134301-7qukw-lkeo8qgonxzaed
if (url.includes("shopee.")) {//lazada.sg
	$("#main").on('mouseover',function(){
//		console.log($('.TMw1ot',this).size());
//		console.log($('.TMw1ot img.IMAW1w',this).size());
//		$('.tongkuanImg').hide();
		if($('.TMw1ot',this).size()>0){        		
			var off = $('.TMw1ot',this).offset();
			var w = $('.TMw1ot',this).width();
			var h = $('.TMw1ot',this).height();
			var x = off.left + w - 70;
			x = Math.round(x);
			var y = off.top + 15;
			var src = $('.TMw1ot img.IMAW1w',this).attr('src');
			if(src){	
				src = src.replace("_.webp", "");
				y = Math.round(y);
				console.log(x+'=='+y);
				console.log(w+'=='+h);
				console.log(src);
				$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
				if(w>=100 && h>=100){
					$('.tongkuanImg').show();    		
				}
			}
		}
	}) 
}
//lazada
if (url.includes(".lazada.")) {//lazada.sg
	$("#container").on('mouseover',function(){
//		$('.tongkuanImg').hide();
		if($('.gallery-preview-panel__image',this).size()>0){        		
			var off = $('.gallery-preview-panel',this).offset();
			var w = $('.gallery-preview-panel',this).width();
			var h = $('.gallery-preview-panel',this).height();
			var x = off.left + w - 70;
			x = Math.round(x);
			var y = off.top + 15;
			var src = $('img.gallery-preview-panel__image',this).attr('src');
			if(src){    				
				src = src.replace("_.webp", "");
				y = Math.round(y);
				console.log(x+'=='+y);
				console.log(w+'=='+h);
				console.log(src);
				$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
				if(w>=100 && h>=100){
					$('.tongkuanImg').show();    		
				}
			}
		}
	}) 
}
//ebay
if (url.includes(".ebay.")) {//ebay.com
	$("#PicturePanel").on('mouseover',function(){
//		console.log($('.ux-image-carousel-container div.active img:visible',this).size());
//		$('.tongkuanImg').hide();
		if($('.ux-image-carousel-container div.active img:visible',this).size()>0){        		
			var off = $(this).offset();
			var w = $(this).width();
			var h = $(this).height();
			var x = off.left + w - 150;
			x = Math.round(x);
			var y = off.top + 15;
			var src = $('.ux-image-carousel-container div.active img:visible',this).attr('src');
			if(src){    				
				src = src.replace("_.webp", "");
				y = Math.round(y);
				console.log(x+'=='+y);
				console.log(w+'=='+h);
				console.log(src);
				$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
				if(w>=100 && h>=100){
					$('.tongkuanImg').show();    		
				}
			}
		}
	}) 
}

/**
 * https://search.1688.com/youyuan/index.htm?tab=imageSearch&showP4P=false&showBid=false&imageId=1090808047131433302&spm=a2639h.28947355.43540198.0&source=action%23screenshot%3Borigin%23detail.1688.com
 * 背景图
 */
  if (url.includes(".1688.")) {
	  $(document).on('mouseover','.img-container',function(e){
//      		$('.tongkuanImg').hide();    		
		var off = $(this).offset();
		var w = $(this).width();
		var h = $(this).height();
		var x = off.left + w - 66;
//  			var x = off.left + 3;
		x = Math.round(x);
		var y = off.top + 3;
//  			var y = off.top + h - 25;
		var src = $('div.img',this).css('background-image');
		if(src){
			src = src.replace("_.webp", "");
			src = src.replace('url("', "");
			src = src.replace('")', "");
			y = Math.round(y);
			console.log(x+'=='+y);
			console.log(w+'=='+h);
			console.log(src);
			$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
			if(w>=100 && h>=100){
				$('.tongkuanImg').show();    		
			}else{
//  					$('.tongkuanImg').hide(); 					
			}
		} 
  	}).on('mouseout','.img-container',function(e){
  		$('.tongkuanImg').hide();
  	});
  }
   
	  
  $(document).on('mouseover','img',function(e){
//	  $('.tongkuanImg').hide();

	  var off = $(this).offset();
	  var w = $(this).width();
	  var h = $(this).height();
	  var x = off.left + w - 66;
//	  var x = off.left + 3;
	  x = Math.round(x);
	  var y = off.top + 3;
//	  var y = off.top + h - 25;
	  var src = $(this).attr('src');
	  if (src.startsWith("//")) {
		  var currentProtocol = window.location.protocol;//http:或者https:
		  src = currentProtocol + src;
	  }
	  if(src.startsWith("http")){
		  src = src.replace("_.webp", "");
		  src = src.replace(".avif", "");
		  y = Math.round(y);
		  console.log(x+'=='+y);
		  console.log(w+'=='+h);
		  console.log(src);
		  $('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
		  if(w>=100 && h>=100){
			  $('.tongkuanImg').show();    		
		  }else{
//			  $('.tongkuanImg').hide(); 					
		  }
	  } 
	  e.stopPropagation();
	  e.preventDefault();
  }) 
  $(document).on('mouseout','img',function(e){
	  $('.tongkuanImg').hide();
  })
  $(document).on('mouseover','.tongkuanImg',function(e){	
	  $('.tongkuanImg').show();
//	  e.stopPropagation();
//	  e.preventDefault();
  }) 
})


//发送通知，获取是否跳转的标记
chrome.runtime.sendMessage(
 	{ type: "JUMP_FLAG",url:AaiIpCg + '/default/svc/get-jump-flag', data: {localId:getCpsLocalId()} },
 	function(response) {
 		console.log("Response from background:", JSON.stringify(response));
// 		alert(JSON.stringify(response));
 	}
 );

function cpsUrlCopy(url){
	navigator.clipboard.writeText(url)
    .then(() => {
    	// 显示一个消息提示框
    	layer.msg('复制成功', {
    	  icon: 1, // 图标样式，0信息，1成功，2错误，3询问，4锁，5哭脸/错误
    	  time: 2000, // 停留时间
    	  shade: 0.3 // 背景阴影透明度
    	});
    })
    .catch(err => {
    	// 显示一个消息提示框
    	layer.msg('复制失败', {
    	  icon: 5, // 图标样式，0信息，1成功，2错误，3询问，4锁，5哭脸/错误
    	  time: 2000, // 停留时间
    	  shade: 0.3 // 背景阴影透明度
    	});
    });
}
$(document).on("click", ".lianjieCopy", function () {
	let mid='';
	if (!UserInfo) {
		return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let image = encodeURIComponent($("img.preview-img").attr('src'));
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIp}/default/svc/get-cps-url?mid=${mid}&percentTag=1&type=jump&param=${itemurl}&source=plugin&click=1&version=${version}&buyerLoginId1688=${buyerLoginId1688}&s=cps`;
	cpsUrlCopy(url);
})


$(document).on("click", ".lianjieTbk", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let image = encodeURIComponent($("img.preview-img").attr('src'));
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIpCg}/default/svc-tb/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
	cpsUrlCopy(url);
})


$(document).on("click", ".lianjieJd", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIpCg}/default/svc-jd/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
	cpsUrlCopy(url);
})


$(document).on("click", ".lianjiePdd", function () {
	let mid='';
	if (!UserInfo) {
        return layer.alert('请登录插件后刷新页面！',{title:'插件未登录'});
	}
	if (UserInfo) {
//        return layer.alert('请登录再操作！');
		mid = UserInfo.memberId;
	}
	let itemurl = encodeURIComponent(window.location.href);
	let url = `${AaiIpCg}/default/svc-pdd/get-cps-url?mid=${mid}&percentTag=1&type=force_jump&param=${itemurl}&source=plugin&version=${version}&s=cps`;
	cpsUrlCopy(url);
})