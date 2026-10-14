if (document.querySelector('.c-error-messages')) {
  //console.log('Hangar-Extension: Hangar list not found - initialization skipped');
  console.log('Hangar-Extension: Restricted RSI page detected - initialization skipped');
}
else {
  // Fix nach rechts verschobene Einträge/Items
  const bc = document.querySelector('.list-items');
  if (bc) bc.style.setProperty('margin-left', '-9px', 'important');

  const h1 = document.querySelector("h1.page-title");
  // Alle Textknoten entfernen
  h1.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) {
      h1.removeChild(n);
    }
  });
  // Neuen Text einfügen
  h1.insertBefore(document.createTextNode("Pledges and Associated Items"), h1.children[3]);

  const el = document.querySelector('#billing > p');
  if (el) el.style.display = 'none';

  // $(".sidenav ul li:nth-child(6)").hide();
  const li6bg = document.querySelector('.sidenav ul li:nth-child(6) a .bg');
  if (li6bg) li6bg.textContent = "Event Tickets";

  const li6a = document.querySelector('.sidenav ul li:nth-child(6) a');
  if (li6a) li6a.setAttribute("href", "/account/rsvp");

  // $(".sidenav ul li:nth-child(5) a .bg").text("Buyback Pledges");
  const li5bg = document.querySelector('.sidenav ul li:nth-child(5) a .bg');
  if (li5bg) li5bg.textContent = "Buyback Pledges";

  // $(".sidenav ul li:nth-child(5) a").attr("href", "/account/buy-back-pledges");
  const li5a = document.querySelector('.sidenav ul li:nth-child(5) a');
  if (li5a) li5a.setAttribute("href", "/account/buy-back-pledges");

  // $(".sidenav ul li:nth-child(4)").hide();
  const li4 = document.querySelector('.sidenav ul li:nth-child(4)');
  if (li4) li4.style.display = 'none';

  // $(".sidenav ul li:nth-child(3) a .bg").text("Pledge Store");
  const li3 = document.querySelector('.sidenav ul li:nth-child(3)');
  if (li3) li3.style.display = 'none';

  // $(".sidenav ul li:nth-child(2)").hide();
  const li2 = document.querySelector('.sidenav ul li:nth-child(2)');
  if (li2) li2.style.display = 'none';

  // $(".sidenav ul li:nth-child(1) a .bg").text("My Hangar");
  const li1bg = document.querySelector('.sidenav ul li:nth-child(1) a .bg');
  if (li1bg) li1bg.textContent = "My Hangar";

  const ictp = document.querySelector('.inner-content .top p');
  if (ictp) ictp.setAttribute('style', 'font-size: 13px !important');

  const sepr = document.querySelector('.separator');
  if (sepr) sepr.setAttribute('style', 'margin-bottom: 10px');

  // $(".billing-title-pager-wrapper h3").hide();
  document.querySelectorAll('.billing-title-pager-wrapper h3')
    .forEach(el => el.style.display = 'none');

  document.querySelectorAll('.bottom.billing-title-pager-wrapper .pager.clearfix')
    .forEach(el => el.style.display = 'none');

  /* eslint no-console: "off" */
  InitPlugin = function()
  {
    var namespace = 'HangarExt';
    var styles = [
      'web_resources/HangarExt.css'
    ];

    var scripts = [
      'web_resources/shims.chrome.storage.js',
      'web_resources/HangarExt.BulkUI.js',
      'web_resources/HangarExt.Button.js',
      'web_resources/HangarExt.DrawUI.js',
      'web_resources/HangarExt.Dropdown.js',
      'web_resources/HangarExt.Filter.js',
      'web_resources/HangarExt.LoadPage.js',
      'web_resources/HangarExt.SettingsStorage.js',
      'web_resources/HangarExt.ProcessCache.js',
      'web_resources/HangarExt.ProcessPage.js',
      'web_resources/HangarExt.ParsePledge.js',
      'web_resources/HangarExt.ParseShip.js',
      'web_resources/HangarExt.ParseHelpers.js',
      'web_resources/HangarExt.Pager.js',
      'web_resources/HangarExt.Render.js',
      'web_resources/HangarExt.Search.js',
      'web_resources/HangarExt.SearchBox.js',
      'web_resources/HangarExt.ShipMatrixOverrides.js',
      'web_resources/HangarExt.Sort.js',
      'web_resources/HangarExt.Toggle.js',
      'web_resources/HangarExt.Download.js',
      'web_resources/HangarExt.Loader.js'
    ];

    for (var i = 0, j = styles.length; i < j; i++)
    {
      var styleURL = chrome.runtime.getURL(styles[i]);
      //console.log('HangarExt: Loading', styleURL);
      var style = document.createElement('link');
      style.id = namespace + '-css-' + i;
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.href = styleURL;
      document.body.appendChild(style);
    }

    window.addEventListener('message', function(event)
    {
      if (event.source != window)
        return;

      if ((event.data.type || false) == false)
        return;

      switch (event.data.type)
      {
        case 'storage.sync.get.request':
          chrome.storage.sync.get(event.data.payload, function(result) {
            window.postMessage({
              type: 'storage.get.response',
              callbackIndex: event.data.callbackIndex,
              result: result
            }, '*');
          });
          break;

        case 'storage.sync.set.request':
          chrome.storage.sync.set(event.data.payload, function() {
            window.postMessage({
              type: 'storage.set.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;

        case 'storage.sync.remove.request':
          chrome.storage.sync.remove(event.data.payload, function() {
            window.postMessage({
              type: 'storage.remove.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;

        case 'storage.sync.clear.request':
          chrome.storage.sync.clear(function() {
            window.postMessage({
              type: 'storage.clear.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;

        case 'storage.local.get.request':
          chrome.storage.local.get(event.data.payload, function(result) {
            window.postMessage({
              type: 'storage.get.response',
              callbackIndex: event.data.callbackIndex,
              result: result
            }, '*');
          });
          break;

        case 'storage.local.set.request':
          chrome.storage.local.set(event.data.payload, function() {
            window.postMessage({
              type: 'storage.set.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;

        case 'storage.local.remove.request':
          chrome.storage.local.remove(event.data.payload, function() {
            window.postMessage({
              type: 'storage.remove.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;

        case 'storage.local.clear.request':
          chrome.storage.local.clear(function() {
            window.postMessage({
              type: 'storage.clear.response',
              callbackIndex: event.data.callbackIndex
            }, '*');
          });
          break;
      }
    });

    var i = 0;
    var loadScript = function()
    {
      if (scripts.length == 0)
        return;

      var scriptURL = chrome.runtime.getURL(scripts.shift());
      //console.log('Loading', scriptURL);
      var script = document.createElement('script');
      script.id = namespace + '-js-' + i++;
      script.type = 'text/javascript';
      script.src = scriptURL;
      script.onload = loadScript;
      script.onerror = function()
      {
        console.error('Failed to load script:', scriptURL);
      };
      script.onreadystatechange = function()
      {
        if (this.readyState == 'complete') loadScript();
      }
      document.body.appendChild(script);
    };

    loadScript();
  }

  InitPlugin();
}