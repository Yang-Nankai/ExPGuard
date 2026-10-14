document.addEventListener('DOMContentLoaded', function () {
  //悬浮按钮
  var switchFloat = document.getElementById('switchFloat');
  //alert(switchFloat)
  chrome.storage.sync.get(['xuanfu_switch'], function (items) {
    // 判断是否选中（悬浮）
    if (items.xuanfu_switch) {
      switchFloat.className = 'ant-switch-checked ant-switch-small ant-switch';
    } else {
      switchFloat.className = 'ant-switch-small ant-switch'
    }
  })
  // 悬浮监听
  switchFloat.addEventListener('click', function () {
    //alert(switchFloat.className);
    if (switchFloat.className === 'ant-switch-small ant-switch') {
      switchFloat.className = 'ant-switch-checked ant-switch-small ant-switch';
      chrome.storage.sync.set({ 'xuanfu_switch': true }, function () {
        chrome.runtime.sendMessage({ xuanfu_switch: true });
      })
    } else {
      switchFloat.className = 'ant-switch-small ant-switch'
      chrome.storage.sync.set({ 'xuanfu_switch': false }, function () {
        chrome.runtime.sendMessage({ xuanfu_switch: false });
      })
    }
  });

});