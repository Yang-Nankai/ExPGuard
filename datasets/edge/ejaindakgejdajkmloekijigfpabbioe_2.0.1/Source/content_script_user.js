chrome.storage.sync.get('_xiaoqiaiuserid', function(items) { 
xiaoqiuserid = items['_xiaoqiaiuserid'];
document.cookie = "xiaoqiaiuserid=" + xiaoqiuserid + "; path=/"; 
});
