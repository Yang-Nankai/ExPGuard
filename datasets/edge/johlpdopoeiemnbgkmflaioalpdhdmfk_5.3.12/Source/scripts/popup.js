$(function () {
    Load();
})

async function Load() {
    UserInfo = await GetStorage('UserInfo');
    console.log(UserInfo);
    $(".checking").hide();
    if(UserInfo){
        $(".login_box").hide();
        $("#login_container").hide();
        $(".memberId span").text(UserInfo.memberId);
        $("#logout").show();
        $(".userinfo_box").show();
        $("#logout").show();
    }else{
        $(".login_box").show();
        $("#login_container").show();
        $(".userinfo_box").hide();
    }
}

async function logout(){
    UserInfo = null;
    await SetStorage('UserInfo', UserInfo);
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

$(document).on("click",".Register1688",function(){
//	window.open(`https://pc.1688.com/isv/app.htm?appKey=6534240`);
	window.open(`${AaiIp}/default/index/oauth-login`);
})

$(document).on("click","#Backend",function(){
    let url = `${AaiIp}/default/index/home?redirect=/ali1688po/po/list&name=1688网采单&token=${UserInfo.token}&source=plugin`;
    window.open(url);
})