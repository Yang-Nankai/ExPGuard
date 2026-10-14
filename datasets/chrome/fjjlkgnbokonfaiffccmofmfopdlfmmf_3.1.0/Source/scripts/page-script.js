function injectScript(source) {
  var s = document.createElement("script");
  s.textContent = source;
  document.head.appendChild(s);
  s.remove();
}

document.addEventListener('executeScript', function(e) {
  try {
      let result;
      try {
          result = (new Function(e.detail.code))();
      } catch (directError) {
          injectScript(e.detail.code);
          return;
      }
  } catch(error) {
      // console.error('Execution error:', error);
  }
});