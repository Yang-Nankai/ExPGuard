$(function () {
    Load();
})

async function Load() {
    UserInfo = await GetStorage('UserInfo');
    CpsOption = await GetStorage('CpsOption');
    if(!CpsOption){
		CpsOption = {autocps:'',ratehide:''}
		await SetStorage('CpsOption',CpsOption);
    }
    console.log(UserInfo);
    console.log(CpsOption);
    $(".checking").hide();
    if(UserInfo){
        $(".login_box").hide();
        $("#login_container").hide();
        $(".memberId span").text(UserInfo.memberId);
        $("#logout").show();
        $(".userinfo_box").show();
        $("#logout").show();
        if(CpsOption.autocps=='1'){
        	$('.autocps').attr('checked',true);
        }else{
        	$('.autocps').attr('checked',false);        	
        }
        if(CpsOption.ratehide=='1'){
        	$('.ratehide').attr('checked',true);
        }else{
        	$('.ratehide').attr('checked',false);        	
        }
    }else{
        $(".login_box").show();
        $("#login_container").show();
        $(".userinfo_box").hide();
    }
}

async function logout(){
    await SetStorage('UserInfo', null);
    Load();
}

async function login(){
    let username = $("input[name=\"username\"]").val();
    let password = $("input[name=\"password\"]").val();
    let res = await FetchRequest(AaiIp + '/default/index/login-api', { userName:username,userPass:password,source:'plugin' }, 'POSTDATA');
    if (res.state) {
        if(res.data.ask==1){
            UserInfo = res.data;
            layer.msg(`登录成功-${res.data.memberId}`);
            await SetStorage('UserInfo',UserInfo);
            Load();
        }else{
            layer.msg(`登录失败-${res.data.message}`)
        }
    }else{
        layer.msg('与后台通讯失败')
    }
}

$(document).on('click','#Login',function(e){
    login()
})

$(document).on('click','#logout',function(e){
    e.preventDefault();
    logout()
})

$(document).on("click","#Register",function(){
    window.open(`${AaiIp}/default/index/register?source=plugin`);
})

$(document).on("click",".autocps",function(){ 
    if(!CpsOption){
		CpsOption = {autocps:'',ratehide:''}
    }
	var autocps = '';
	if ($(this).is(':checked')) {
		autocps = "1";
	}
	console.log('autocps=>'+autocps);
	CpsOption.autocps = autocps;
	SetStorage('CpsOption', CpsOption);
})
$(document).on("click",".ratehide",function(){ 
	if(!CpsOption){
		CpsOption = {autocps:'',ratehide:''}
	}
	var ratehide = '';
	if ($(this).is(':checked')) {
		ratehide = "1";
	}
	console.log('ratehide=>'+ratehide);
	CpsOption.ratehide = ratehide;
	SetStorage('CpsOption', CpsOption);
})

$(document).on("click","#Backend",function(){
    let url = `${AaiIp}/default/index/home?redirect=/cps/cps-orders/list&name=1688推广订单列表&token=${UserInfo.token}&source=plugin`;
    window.open(url);
})