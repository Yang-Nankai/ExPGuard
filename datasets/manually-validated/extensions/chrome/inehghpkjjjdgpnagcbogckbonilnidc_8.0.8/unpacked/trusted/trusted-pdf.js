(function launchFromEnv(contentPath) {
  var envParam = '';
  if (location.host.indexOf('local') > -1) {
    envParam = 'local=true';
  } else if (location.host.indexOf('staging') > -1) {
    envParam = 'staging=true';
  } else if (location.host.indexOf('beta') > -1) {
    if (location.host.indexOf('eu.betatest') > -1) {
      envParam = 'euBeta=true';
    } else {
      envParam = 'beta=true';
    }
  } else if (location.host.indexOf('eu') > -1) {
    envParam = 'eu=true';
  } else if (location.host.indexOf('ca') === 0) {
    envParam = 'ca=true';
  } else {
    envParam = 'prod=true';
  }
  var script = document.createElement('script');
  script.src =
    contentPath +
    '/scripts/button/dist/launcher.min.js?' +
    envParam +
    '&v=' +
    Math.round(Math.random() * 99999999);
  document.head.appendChild(script);
})(window.contentPath);

(function embedPdfAndSetTitle() {
  var key = '?referer=';
  var keyIndexOf = location.href.indexOf(key);
  var urlExtracted = location.href.substr(keyIndexOf + key.length);
  var title = location.href.substr(location.href.lastIndexOf('/') + 1);
  var embed = document.createElement('embed');

  embed.setAttribute('src', urlExtracted);
  embed.setAttribute('type', 'application/pdf');
  document.body.appendChild(embed);
  document.title = title.indexOf('.pdf') > -1 ? decodeURI(title) : 'PDF';

  // force page to reload once
  // this fixes issue with pdf opening a blak page
  if (window.localStorage) {
    if (!localStorage.getItem('reloadOnce')) {
      localStorage['reloadOnce'] = true;
      window.location.reload();
    } else localStorage.removeItem('reloadOnce');
  }
})();
