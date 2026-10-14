let ip = null;
$(function(){
    let MaxPage = 6;
    let Status = window.localStorage.getItem('Status') ? window.localStorage.getItem('Status') : 'over';
    let KeyInfo = window.localStorage.getItem('KeyInfo') ? JSON.parse(window.localStorage.getItem('KeyInfo')) : null;
    $('body').append(`<div class="operate_ex"><div class="mainbox"><li id="onRetry">运行</li><li id="onstop">停止</li></div></div>`);

    $(document).on("click", "#onRetry", function () {
        var select = `<select name="ip">`;
        for (let i = 0; i < IPS.length; i++) {
            select += `<option value="${IPS[i]}">${IPS[i]}</option>`;
        }
        select += `</select>`;
        layer.confirm(select
            , { title: '选择站点' }
            , function (index) {
                (async()=>{
                    AaiIp = $("select[name='ip']").val();
                    let url = AaiIp+'/api/spider/get_category';
                    let res = await FetchRequest(url,{},'GetData');
                    if(res.state){
                        res = res.data;
                        for (let i = 0; i < res.length; i++) {
                            Task(res[i].name);
                        }
                        layer.close(index);
                    }else{
                        layer.alert('获取分类出错');  
                    }
                })()
                // $.ajax({
                //     url: 'ai/answers/get_category',
                //     type: 'get',
                //     dateType: 'json',
                //     success: function (res) {
                //         console.log(res);
                //         for (let i = 0; i < res.length; i++) {
                //             Task(res[i].name);
                //         }
                //         layer.close(index);
                //     },
                //     error: function (err) {
                //     }
                // })
            })
    })

    $(document).on("click","#onInfo",function(){
        layer.confirm(`<input id="Max" type="text">`
            , { title: '设置线程' }
            , function (index) {
                let Max = parseInt($("#Max").val());
                for(let i=1;i<=Max;i++){
                    setTimeout(async () => {
                        updateCategory(i);
                    }, 2000);
                }
                layer.close(index);
            })
    })
    
    $(document).on("click","#onstart",function(){
        Status = 'action';
        $("#onstart").hide();
        $("#onstop").show();
        window.localStorage.setItem('Status',Status);
        Search();
    })

    $(document).on("click","#onstop",function(){
        Status = 'over';
        $("#onstart").show();
        $("#onstop").hide();
        window.localStorage.setItem('Status',Status)
    })

    if(Status=='action'){
        $("#onstart").hide();
        $("#onstop").show();
        Action();
    }else{
        $("#onstart").show();
        $("#onstop").hide();
    }

    //要修改已经采集的逻辑
    async function Task(name,Pdata={}){
        let url = AaiIp+'/api/Spider/Crawling/category/'+name;
        let res = await FetchRequest(url,Pdata,'PostJsonData');
        if(res.state){
            let data = res.data;
            if(data.pc_captcha>0){
                console.log('出现验证码');
                setTimeout(() => {
                    return Task(name,Pdata);
                }, 1000*60*3);
            }else{
                let taglist = data.tags;
                let urls = data.urls;
                let tag = taglist[0];
                let A = [];
                for(let i=0;i<urls.length;i++){
                    A.push({url:urls[i],tag:tag})
                }
                if(A.length>0){
                    return Gatear2(A,data.key_arr.keyword);
                }else{
                    setTimeout(() => {
                        return Task(name,Pdata);
                    }, 1000);
                }
            }
        }else{
            layer.msg(`执行任务出错`);
            setTimeout(() => {
                return Task(name,Pdata);
            }, 1000*60*10);
        }
    }

    async function Search(){
        let id = KeyInfo ? KeyInfo.id : 0;
        let res = await get_key(id);
        if(res){
            KeyInfo = res;
            window.localStorage.setItem('KeyInfo',JSON.stringify(KeyInfo));
            SetValue(document.querySelector("div > div[class*='searchWrap_'] > input"),res.keyword);
            document.querySelector("div[data-log-click='{\"pos\":\"search_btn\"}']").click();
        }
    }

    async function Action(){
        setTimeout(() => {
            location.reload()
        }, 30000);
        let taglist = [];
        let ids = [];
        $("em").each(function(){
            let name = $.trim($(this).text());
            let index = ids.indexOf(name);
            if(index==-1){
                taglist.push({tag:name,index:1});
                ids.push(name);
            }else{
                taglist[index].index++;
            }
        })
        taglist.sort(function (a, b) {
            if (a.index > b.index) {
                return -1;
            } else if (a.index == b.index) {
                return 0;
            } else {
                return 1;
            }
        });
        if($("em").length==0){
            Search()
        }
        let tag = taglist[0].tag;
        if(tag.length<3){
            return Search();
        }
        let urllist = [];
        $(".cs-view-block a.text-ellipsis").each(function(){
            let href = $(this).attr('href');
            href = decodeURIComponent(href);
            let qid;
            let url;
            if(href.indexOf('search_wenda_pc/list/')!=-1){
                console.log(href)
                qid = href.split('qid=')[1].split('&')[0];
                url = 'https://so.toutiao.com/s/search_wenda_pc/list/?enter_from=search_result&qid='+qid;
            }
            if(href.indexOf('/question/')!=-1){
                qid = href.split('question/')[1].split('/')[0];
                url = 'https://www.toutiao.com/question/'+qid+'/';
            }
            if(href.indexOf('sslocal://wenda_list')!=-1){
                href = decodeURIComponent(href);
                qid = href.split('"qid":"')[1].split('"')[0];
                url = 'https://www.toutiao.com/question/'+qid+'/';
            }
            if(url){
                urllist.push({url:url,tag:tag});
            }
        })

        let res = await check_url(urllist);
        console.log(res)
        if(res){
            if(res.length>0){
                return Gatear(res);
            }else{
                Search()
            }
            
        }
    }

    async function Gatear(urls,num=0){
        let url = urls[num].url;
        let tag = urls[num].tag;
        let Answer = await get_ask_data(url);
        let i = 0;
        if(Answer){
            if (Answer[0]) {
                let content = Answer[0].content;
                if (Answer[0].count >= 150 && content.indexOf('在线')==-1 && content.indexOf('阅读')==-1) {
                    let image_url = await baidu_img(Answer[0].title);
                    let postdata = { keyword: KeyInfo.keyword, url: url, title: Answer[0].title, content: content, tag: tag,image_url:image_url };
                    post_content(postdata);
                    i++;
                }
            }
        }
        if(num==urls.length-1){
            console.log('当前面页抓取完毕');
            let page = parseInt($("a[style*='background-color:#F04142'] .cs-button-wrap span.text-ellipsis").text());
            let dom = $(".cs-button-wrap span.text-ellipsis");
            let next = dom.eq(dom.length-1);
            if(next.text().indexOf('下一页')!=-1){
                console.log('还有下一页');
                let timeout = 2000-(i*300);
                timeout = timeout > 1000 ? timeout : 1000;
                if(page<MaxPage){
                    console.log('小于最大页数');
                    setTimeout(() => {
                        next.click();
                    }, timeout);
                }else{
                    Search()
                }
            }else{
                Search()
            }
        }else{
            num++;
            setTimeout(() => {
                return Gatear(urls,num);
            }, 100);
        }
    }

    async function Gatear2(urls,keyword_data,num=0){
        let url = urls[num].url;
        let tag = urls[num].tag;
        let Answer = await get_ask_data(url);
        let keyword = keyword_data.keyword;
        let category = keyword_data.category;
        let i = 0;
        keyword_data.contents = keyword_data.contents ? keyword_data.contents : [];//内容数组
        if(Answer){
            if (Answer[0]) {
                let content = Answer[0].content;
                let title = RTrim(Answer[0].title,'?');
                title = RTrim(title,'？');
                if (Answer[0].count >= 150 && content.indexOf('在线')==-1 && content.indexOf('阅读')==-1) {
                    // let image_url = await baidu_img(Answer[0].title);
                    // let postdata = { keyword: keyword, url: url, title: Answer[0].title, content: content, tag: tag,image_url:image_url };
                    // post_content(postdata);
                    // i++;
                    keyword_data.contents.push({title:title,content:content});
                }
            }
        }
        if(num==urls.length-1){
            let transform = await GetTransform({title:keyword,content:JSON.stringify(keyword_data.contents),category:category});
            if(transform){
                let title = transform.title;
                let content = transform.content;
                if(title){
                    title = RTrim(title,'？');
                    title = RTrim(title,'?');
                    title = RTrim(title,'啊');
                    //title = RTrim(title,'吗');
                    title = RTrim(title,'呢');
                    title = LTrim(title,'跪求');
                    title = LTrim(title,'求');
                    title = LTrim(title,'麻烦');
                    title = LTrim(title,'请');
                    title = LTrim(title,'帮忙');
                    if(content){
                        let image_url = await baidu_img(keyword);
                        let postdata = { keyword: keyword, title: title, content: JSON.stringify(content), tag: tag,image_url:image_url,category:category };
                        let res = await publish(postdata);//这里的发布要发布到目标网站
                        let URLS = null;
                        if(res){
                            console.log('发布成功');
                            URLS = JSON.stringify(urls);
                            return Task(category,{urls:URLS,id:keyword_data.id,verify:''});
                        }else{
                            URLS = null;
                            return Task(category,{urls:URLS,id:keyword_data.id,verify:''});
                        }
                    }else{
                        console.log('内容为空'); 
                    }
                }else{
                    console.log('转换标题失败'); 
                    return Task(category,{urls:null,id:keyword_data.id,verify:''});
                }
            }else{
                console.log('转换标题通讯失败');
            }
        }else{
            num++;
            setTimeout(() => {
                return Gatear2(urls,keyword_data,num);
            }, 100);
        }
    }
})

async function baidu_img(title){
    let url = "https://baijiahao.baidu.com/aigc/bjh/pc/v1/picSearch";
    let res = await FetchRequest(url,{
        page_no: 0,
        keyword: title,
        page_size: 20,
    },'PostData');
    if(res.state){
        if(res.data.errmsg=="Success"){
            try {
                return res.data.data.imglist[0].detail_url;
            } catch (error) {
                return null;
            }
        }else{
            return null;
        }
    }else{
        return null;
    }
}

function create_s_v_web_id() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
        , t = e.length
        , n = (new Date).getTime().toString(36)
        , r = [];

    r[8] = r[13] = r[18] = r[23] = "_",
        r[14] = "4";
    for (var o, i = 0; i < 36; i++)
        r[i] || (o = 0 | Math.random() * t,
            r[i] = e[19 == i ? 3 & o | 8 : o]);
    return "verify_" + n + "_" + r.join("")
}

async function updateCategory(id){
    let url = AaiIp+'/api/index/updateCategory/id/'+id;
    let res = await FetchRequest(url,{},'GetData');
    setTimeout(() => {
        return updateCategory(id)
    }, 100);
}

/**
 * 
 * @param {*} post {title,content}
 * @returns 
 */
async function GetTransform(post){
    let url = AaiIp+'/api/Spider/transform';
    let res = await FetchRequest(url,post,'PostJsonData');
    if(res.state){
        return res.data;
    }else{
        return null;
    }
}

function LTrim(str,v=" ") {
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != v && str.charAt(i) != v) break;
    }
    str = str.substring(i, str.length);
    return str;
}
function RTrim(str,v=" ") {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != v && str.charAt(i) != v) break;
    }
    str = str.substring(0, i + 1);
    return str;
}
function Trim(str) {
    return LTrim(RTrim(str));
}

// $.ajax({
//     type: "POST",
//     url: "http://127.0.0.9/api/index/publish",
//     data: {"keyword":"美发工作牌怎么做","title":"美发工作牌怎么看","content":"[{\"title\":\"美发师岗位职责\",\"content\":\"<p>1、以良好的仪态、精神，为顾客提供专业化的美发服务。</p><p>2、以专业的美发知识为顾客度提供美发咨询情报和美发方案。</p><p>3、以诚恳的心态，与顾客理性沟通，掌握顾客内在需求。</p><p>4、以服务的理念，注重自我修养，并提升个人的美发技术。</p><p>5、负责美发工具、产品的补充、清洁、消毒等工作，为顾客提供整洁、舒适的服务环境。</p><p>6、认真填写顾客档案，进行经常性整理分析，随时掌握重点顾客的美发状况，便于采取更专业更具实效的服务对策。</p><p>7、学会并养成赞美顾客的好习惯，成为顾客信赖的美发专家。</p><p>8、掌握向顾客的面对面销售产品的技巧，提升营业业绩。</p><p>9、按牌轮号，不得擅自挑选客人。</p><p>10、对美发助理的工作进行指导、考核。</p>\"}]","tag":"工作牌","image_url":"http://copyright.bdstatic.com/vcg/creative/0152f6ad81871b2c3e9d3b2c641800f3.eps"},
//     dataType: "json",
//     success: function (response) {
        
//     }
// });