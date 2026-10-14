chrome.storage.sync.get(["xiaoqioptions","newxiaoqitabstatus","xiaoqi_sidebar_status","xiaoqi_sidebar_darkmode"],function(t){
    var e=t.xiaoqi_sidebar_status===void 0?!0:t.xiaoqi_sidebar_status,
        darkmode=t.xiaoqi_sidebar_darkmode===void 0?!1:t.xiaoqi_sidebar_darkmode, 
        i=(t.xiaoqioptions||"11111").split("").map(Number),
        o=[e?1:0].concat(i); 
  
    document.querySelectorAll(".optionCheckbox").forEach(function(a){
        var idx=parseInt(a.getAttribute("data-index"));
        if(idx===0) a.checked=!!e;
        else if(idx===100) a.checked=!!darkmode; 
        else a.checked=!!i[idx-1]; 
    });

    var s=t.newxiaoqitabstatus||"true";
    document.getElementById("newTabSelect").value=s
}),
document.querySelectorAll(".optionCheckbox").forEach(function(t){
    t.addEventListener("change",function(){
        var e=parseInt(this.getAttribute("data-index"));
        if(e===0){
            chrome.storage.sync.set({xiaoqi_sidebar_status:this.checked})
        }else if(e===100){ 
            chrome.storage.sync.set({xiaoqi_sidebar_darkmode:this.checked})
        }else{ 
            var o=e-1;
            chrome.storage.sync.get("xiaoqioptions",function(s){
                var a=(s.xiaoqioptions||"11111").split("").map(Number);
                a[o]=this.checked?1:0,
                chrome.storage.sync.set({xiaoqioptions:a.join("")})
            }.bind(this))
        }
    })
}),
document.getElementById("newTabSelect").addEventListener("change",function(){
    var t=this.value;
    chrome.storage.sync.set({newxiaoqitabstatus:t})
});
if(/Chrome/.test(navigator.userAgent)&&!/Edg/.test(navigator.userAgent)){
  document.getElementById('setnewtab').style.display='block';
}