loadCSS('libs/layui/css/layui.css');
version='5.3.12';
let initCnt = 0;
buyerLoginId1688='';
CpsOption = null;
UserInfo = null;
GetUserInfo();
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
});
if (window.location.hostname === 'detail.1688.com') { 
	loadJs('scripts/1688.js');
//	$(function(){		
		init();
//	})
//	let tiemr = setInterval(() => {
//		if(document.querySelector("#detail-main-video-content")){
//			$("#TongKuan1").hide()
//		}else{
//			$("#TongKuan1").show();
//		}
//	}, 100);
	
}
var host_ = window.location.hostname;
if (host_.includes('item.taobao.com')  ||host_.includes('detail.tmall.com')) { 
//	$(function(){		
//		initTbk();
//	})
}else if(host_.includes('.taobao.com')  ||host_.includes('.tmall.com')){
	$(function(){
//		if($(".WorkBarTbk").length==0){ 			
//			$("body").append(`<div class="WorkBarTbk" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
//					<div class="BrandNameTbk">TB助手<span id="pluginTip"></span></div>
//					<div class="OperationTbk">
//					<!--
//					<p class="zhuanlianTbk" style='cursor:pointer;'><a href="javascript:;"><i></i><em>转链</em></a></p>
//					-->
//					</div>
//			</div>`); 
//		}
	})
}

$(document).on("click", "#TongKuan1", function () {
//    if (!UserInfo) {
//        return layer.alert('请登录再操作！')
//    }
    let image = encodeURIComponent($("img.preview-img").attr('src'));
    if (!$("img.preview-img").attr('src')) {
        image = encodeURIComponent($("img.detail-gallery-img").attr('src'));
    }
//    let url = `${AaiIp}/default/index/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin`;
    let url = `${AaiIp}/default/index/tongkuan-list?mid=&imgUrl=${image}&token=&source=plugin&version=${version}`;
    if (UserInfo) {
    	url = `${AaiIp}/default/index/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin&version=${version}`;    	
    }
    layer.open({
        type: 2,
        title: '搜同款',
        shadeClose: true,
        shade: 0.8,
        maxmin: true, // 允许全屏最小化
        area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
        offset: 'auto', // 自动居中
        content: url // iframe的url
    });
})

$(document).on("click", ".tongkuan16881", function () {
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
			title: '搜同款',
			shadeClose: true,
			maxmin: true, // 允许全屏最小化
			shade: 0.8,
			area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
			offset: 'auto', // 自动居中
			content: url // iframe的url
		});
	}
})

$(document).on("click", ".zhuanlian1", function () {
	let mid='';
	let token='';
	if (UserInfo) {
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
    let image = encodeURIComponent($("img.preview-img").attr('src'));
    let itemurl = encodeURIComponent(window.location.href);
    let url = `${AaiIp}/default/svc/get-cps-url?mid=${mid}&source=plugin&token=${token}&percentTag=1&type=jump&param=${itemurl}&source=plugin&click=1&version=${version}&buyerLoginId1688=${buyerLoginId1688}`;
    //window.open(url)
    window.location.href = url;
})
$(document).on("click", ".downloadOffer1688", function () {
	let mid='';
	let token='';
	if (UserInfo) {
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let offerId = window.location.href.split('.html')[0].split('/offer/')[1];
	let url = `${AaiIp}/default/aliexpress-cn/download?offer_id=${offerId}&source=plugin&token=${token}`;
	window.open(url,'_blank','',true);
//	window.open(url);
//	$('body').append(`<iframe frameborder="0" src="${url}" width="1" height="1"  style="overflow:hidden;width:1px;height:1px;"></iframe>`);
})
$(document).on("click", ".downloadTb", function () {
	let mid='';
	let token='';
	if (UserInfo) {
		mid = UserInfo.memberId;
		token = UserInfo.token;
	}
	let offerId = window.location.href;
	offerId = encodeURIComponent(offerId);
	let url = `${AaiIp}/default/taobao/download?url=${offerId}&source=plugin&token=${token}`;
	window.open(url,'_blank','',true);
//	window.open(url);
//	$('body').append(`<iframe frameborder="0" src="${url}" width="1" height="1"  style="overflow:hidden;width:1px;height:1px;"></iframe>`);
})

$(document).on("click", ".buy1", function () {
//    if (!UserInfo) {
//        return layer.alert('请登录再操作！')
//    }
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
    let itemurl = encodeURIComponent('/ali1688po/buybox/list?op=yjxd&offer_id=' + window.location.href.split('.html')[0].split('/offer/')[1]);
    let itemurl1 = '/ali1688po/buybox/list?op=yjxd&offer_id=' + window.location.href.split('.html')[0].split('/offer/')[1];
    let url = `${AaiIp}${itemurl1}&source=plugin&fanli=1`;
    if (UserInfo) {
//    	url = `${AaiIp}/ali1688po/buybox/list?redirect=${itemurl}&token=${UserInfo.token}&name=一键下单&source=plugin`;
    	url+=`&token=${UserInfo.token}`;
    }
    url+=`&param=${param}`;
    url+=`&buyerLoginId1688=${buyerLoginId1688}`;
    window.open(url)
})
function init(){
	initCnt++;
	if(initCnt>500){
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
    $(".gallery-fix-wrapper").prepend(`<div id="TongKuan1">搜同款</div>`)
    $('body').append(`<div class="WorkBar" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
		    <div class="BrandName">1688助手 <a class='ali_help' href='https://eccang.yuque.com/oo8zo1/xzncx8/vvx38zwzmq1fvsqi' target='_blank' title='帮助'>？</a></div>
		    <div id="pluginTip"></div>
		    <div class="Operation">		    
			<p class="buy1 cps_alink" title="助您找到活动价/精选货源/减少采购成本/采购返利">返利下单</p>
			<p class="tongkuan16881 cps_alink" title="根据产品图片找同款">同款比价</p>
    		<p class="downloadOffer1688 cps_alink" title="打包下载图片/视频/产品信息">下载</p>
		    </div>
		    </div>`);
//    return;
    if($(".WorkBar").length>0){    	
    	GetCps();
    }
}

function initTbk(){
	initCnt++;
	if(initCnt>500){
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
	var tip = '(未登录)';
	if(UserInfo){
		tip='';
	}
	if($(".WorkBarTbk").length==0){ 
	    $("body").append(`<div class="WorkBarTbk" style="z-index:99999;position:fixed;right:50px;bottom:20px;border:1px solid #ccc;background:#fff;padding:5px;border-radius:5px;font-size:12px;">
	    <div class="BrandNameTbk">TB助手<span id="pluginTip"></span></div>
	    <div class="OperationTbk">
	    <!-- 
	    <p class="newman"><i></i>佣金率:<em>-</em></p> 
	    <p class="zhuanlianTbk" style='cursor:pointer;'><a href="javascript:;"><i></i><em>转链${tip}</em></a></p>	    
		<p class="downloadTb" style='cursor:pointer;'>打包下载商品图片</p>
		-->
	    <p class="tongkuanTb" style='cursor:pointer;'>Taobao同款</p>
	    </div>
	    </div>`); 
	}
    console.log('init');
//    if(!CpsOption){    	
//    	CpsOption = await GetStorage('CpsOption');
//    }
//    if(CpsOption && CpsOption.ratehide=="1"){
//    	$('.WorkBarTbk .newman,.WorkBarTbk .oldman').hide();
//    }
    if($(".WorkBarTbk").length>0){    	
//    	GetCpsTbk();
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
//    UserInfo = await GetStorage('UserInfo');
//    if(UserInfo){
        let url = window.location.href;
        
        if (url.includes("tracelog=")) {//已经转链，无需重新转换
        	return;
        }
        let mid='';
        let token='';
        if(UserInfo){
        	mid = UserInfo.memberId;
        	token = UserInfo.token;
        }
    	let itemurl = encodeURIComponent(window.location.href.split('?')[0]);
    	let localId = getCpsLocalId();
        let poastdata = {
            param:itemurl,
            mid:mid,
            type:'json',
            percentTag:1,
            source:'plugin',
            token:token,
            version:version,
            buyerLoginId1688:buyerLoginId1688,
            localId:localId,
            auto:'1'
        }
        console.log(poastdata);
        let res = await FetchRequest(AaiIp + '/default/svc/get-cps-url', poastdata, 'POSTDATA');
        if (res.state) {
            console.log(AaiIp + '/default/svc/get-cps-url');
            console.log(res);
            if (res.data.ask == 1) {
                if(res.data.data && res.data.data.jump){
                	//window.location.href = res.data.data.jump;
//                	var popup = window.open(
//                			res.data.data.jump,
//                			  "",
//                			  "width=1,height=1,top=200,left=0,toolbar=no,scrollbars=no,location=no,resizable=no"
//                			);
//                	setTimeout(function() {
//          			  popup.close();
//          			}, 2000);
                	
                }
            }
//            if (res.data.ask == 2) {
//            	if(res.data.data&&res.data.data.jump){
//            		var popup = window.open(
//            				res.data.data.jump,
//            				"",
//              			  "width=1,height=1,top=200,left=0,toolbar=no,scrollbars=no,location=no,resizable=no"
//            		);
////            		$('body').prepend("<iframe style='width:100%;height:200px;' src='"+res.data.data.jump+"'/>");
//            		setTimeout(function() {
//        			  popup.close();
//        			}, 2000);
//            	}
//            }
            if(res.data.versionTip){
            	$('#pluginTip').html("("+res.data.versionTip+")");
            }
        }
        
//        if (res.state) {
//            if (res.data.ask == 1) {
//                if(res.data.data){
//                    $(".newman em").text(res.data.data.newRate);
//                    $(".oldman em").text(res.data.data.oldRate);
//                    $(".zhuanlian1 em").text('转链');
//                }else{
//                    $(".zhuanlian1").css({
//                        "pointer-events": "none",
//                        "color": "gray" // 修改颜色为灰色
//                      });
//                    $(".zhuanlian1 em").text('转链(无佣金)');
//                }
//            } else {
//                //layer.msg('转链失败-'+res.data.message);
//                $(".zhuanlian1").css({
//                    "pointer-events": "none",
//                    "color": "gray" // 修改颜色为灰色
//                  });
//                $(".zhuanlian1 em").text('转链('+res.data.message+')');
//            }
//        } else {
//            layer.msg('转链失败-通讯失败');
//        }
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
        auto: ((CpsOption && CpsOption.autocps=="1")?1:0)
    }
    console.log(poastdata);
//    未登录
//    account-signin redPackageInfoBox
//
//    已登录
//    memberPhoto
    let res = await FetchRequest(AaiIp + '/default/svc-tb/get-cps-url', poastdata, 'POSTDATA');
    if (res.state) {
        console.log(AaiIp + '/default/svc-tb/get-cps-url');
        console.log(res);
        if (res.data.ask == 1) {
            if(res.data.data){
                $(".newman em").text(res.data.data.rate);
                $(".zhuanlianTbk em").text('转链'+(mid?'':"(未登录)"));
                
                let url = window.location.href;                
                if(CpsOption.autocps=='1' && res.data.data.jump && !(url.includes("ali_trackid="))){//已经转链，无需重新转换
                	window.location.href = res.data.data.jump;
                }
            }else{
//                $(".zhuanlianTbk").css({
//                    "pointer-events": "none",
//                    "color": "gray" // 修改颜色为灰色
//                  });
                $(".zhuanlianTbk em").text('转链(-)');
            }
        }else if (res.data.ask == 2) {
            if(res.data.data){
                $(".newman em").text(res.data.data.rate);
                $(".zhuanlianTbk em").text('转链'+(mid?'':"(未登录)"));                
            }else{
//                $(".zhuanlianTbk").css({
//                    "pointer-events": "none",
//                    "color": "gray" // 修改颜色为灰色
//                  });
              $(".zhuanlianTbk em").text('转链(-)');
            }
        } else {
            //layer.msg('转链失败-'+res.data.message);
//            $(".zhuanlianTbk").css({
//                "pointer-events": "none",
//                "color": "gray" // 修改颜色为灰色
//              });
            $(".zhuanlianTbk em").text('转链(-)');
        }
        if(res.data.login=='false'){
            $(".zhuanlianTbk em").text('无法转链[联系管理员]');        	
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
	CpsOption = await  GetStorage('CpsOption');
//	console.log(CpsOption);
	if(!CpsOption){
		CpsOption = {autocps:'',ratehide:''}
		await SetStorage('CpsOption',CpsOption)
	}
//	autocps = `${CpsOption.autocps}`;
//	console.log('~~~~~'+autocps);
//	ratehide =  CpsOption.ratehide;
//	console.log('~~~~~'+ratehide);
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
//	    let url = `${AaiIp}/default/index/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin`;
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
	    		shade: 0.8,
	    		maxmin: true, // 允许全屏最小化
	    		area: ['90%', '90%'], // 设置宽高比例，这里是宽和高都是屏幕的80%
	    		offset: 'auto', // 自动居中
	    		content: url // iframe的url
	    	});
	    }
	});
	$(document).on("click", ".tongkuanTb", function (e) { 
		e.stopPropagation();
		e.preventDefault();

		let image = encodeURIComponent(window.location.href); 
		let url = `${AaiIp}/default/taobao/tongkuan-list?mid=&imgUrl=${image}&token=&source=plugin&version=${version}`;
		if (UserInfo) {
			url = `${AaiIp}/default/taobao/tongkuan-list?mid=${UserInfo.memberId}&imgUrl=${image}&token=${UserInfo.token}&source=plugin&version=${version}`;    	
		}
		if(typeof layer === 'undefined'){	 
			window.open(url);
		}else{
			layer.open({
				type: 2,
				title: 'Taobao同款',
				shadeClose: true,
				shade: 0.8,
				maxmin: true, // 允许全屏最小化
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
//        	$('.tongkuanImg').hide();
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
        		if(w>=100 && h>=100){
        			$('.tongkuanImg').show();    		
        		}
        	}
    	}) 
    }
    if (url.includes("detail.tmall.com") || url.includes("item.taobao.com")) {//淘宝
    	$("[class*='PicGallery--mainPicWrap--']").on('mouseover',function(){
    		 
//    		$('.tongkuanImg').hide();
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
    			$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
    			if(w>=100 && h>=100){
    				$('.tongkuanImg').show();    		
    			}
    		}
    	}) 
    }
    if (url.includes(".aliexpress.")) {//aliexpress
    	$("body").on('mouseover',function(){
    		
//    		$('.tongkuanImg').hide();
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
//    		$('.tongkuanImg').hide();
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
//    		console.log($('.TMw1ot',this).size());
//    		console.log($('.TMw1ot img.IMAW1w',this).size());
//    		$('.tongkuanImg').hide();
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
//    		$('.tongkuanImg').hide();
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
//    		console.log($('.ux-image-carousel-container div.active img:visible',this).size());
//    		$('.tongkuanImg').hide();
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
//    //mercadolibre
//    if (url.includes(".mercadolibre.")) {//mercadolibre.com
    	$(document).on('mouseover','img',function(e){
//    		$('.tongkuanImg').hide();    		
			var off = $(this).offset();
			var w = $(this).width();
			var h = $(this).height();
			var x = off.left + w - 66;
//			var x = off.left + 3;
			x = Math.round(x);
			var y = off.top + 3;
//			var y = off.top + h - 25;
			var src = $(this).attr('src');
			if (src.startsWith("//")) {
				var currentProtocol = window.location.protocol;//http:或者https:
				src = currentProtocol + src;
			}
			if(src.startsWith("http")){
				src = src.replace("_.webp", "");
				y = Math.round(y);
				console.log(x+'=='+y);
				console.log(w+'=='+h);
				console.log(src);
				$('.tongkuanImg').css({"z-index":999}).attr('_src',src).css({"left": x+"px","top": y+"px"});
				if(w>=100 && h>=100){
					$('.tongkuanImg').show();    		
				}else{
//					$('.tongkuanImg').hide(); 					
				}
			} 
    	}) 
    	
//    }
    	$(document).on('mouseout','img',function(e){
    		$('.tongkuanImg').hide();
    	})
    	$(document).on('mouseover','.tongkuanImg',function(e){
    		$('.tongkuanImg').show();
    	})
    	
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
})



//发送通知，获取是否跳转的标记
chrome.runtime.sendMessage(
 	{ type: "JUMP_FLAG",url:AaiIp + '/default/svc/get-jump-flag', data: {localId:getCpsLocalId()} },
 	function(response) {
 		console.log("Response from background:", JSON.stringify(response));
// 		alert(JSON.stringify(response));
 	}
 );