if (document.querySelector('.c-error-messages')) {
  console.log('Hangar-Extension: Restricted RSI page detected - initialization skipped');
}
else {
  // $('.sidenav').attr('style', 'position: absolute !important');
  //document.querySelectorAll('.sidenav')
  //  .forEach(el => el.setAttribute('style', 'position: absolute !important'));
  var cb = document.querySelector('#contentbody.account-section');
  if (cb) cb.style.background = '#09131a';

  // Fix nach links verschobene Bereiche
  const el = document.querySelector('#billing.rsvp .inner-content');
  if (el) el.style.setProperty('padding-left', '0px', 'important');

  // Fix nach rechts verschobene Einträge/Items
  const bc = document.querySelector('#billing .content .row');
  if (bc) bc.style.setProperty('margin', '0 0 15px 0px', 'important');

  const h1 = document.querySelector("h1.page-title");
  // Alle Textknoten entfernen
  h1.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) {
      h1.removeChild(n);
    }
  });
  // Neuen Text einfügen
  h1.insertBefore(document.createTextNode("Pledges and Associated Items"), h1.children[3]);

  // $(".sidenav ul li:nth-child(6)").hide();
  const li6 = document.querySelector('.sidenav ul li:nth-child(6)');
  if (li6) li6.style.display = 'none';

  // $(".sidenav ul li:nth-child(5)").hide();
  const li5 = document.querySelector('.sidenav ul li:nth-child(5)');
  if (li5) li5.style.display = 'none';

  // $(".sidenav ul li:nth-child(5) a").attr("href", "/account/buy-back-pledges");
  const li5a = document.querySelector('.sidenav ul li:nth-child(5) a');
  if (li5a) li5a.setAttribute("href", "/account/buy-back-pledges");

  // $(".sidenav ul li:nth-child(4)").hide();
  //const li4 = document.querySelector('.sidenav ul li:nth-child(4)');
  //if (li4) li4.style.display = 'none';
  const li4bg = document.querySelector('.sidenav ul li:nth-child(4) a .bg');
  if (li4bg) li4bg.textContent = "Event Tickets";

  const icti = document.querySelector('.inner-content .top .title');
  if (icti) icti.textContent = "Event Tickets";

  const ictp = document.querySelector('.inner-content .top p');
  if (ictp)
  {
    ictp.textContent = 'View and manage your tickets to CIG events.';
    ictp.setAttribute('style', 'font-size: 13px !important');
  }

  // $(".sidenav ul li:nth-child(5) a .bg").text("Buyback Pledges");
  const li3bg = document.querySelector('.sidenav ul li:nth-child(3) a .bg');
  if (li3bg) li3bg.textContent = "Buyback Pledges";

  // $(".sidenav ul li:nth-child(3) a .bg").text("Pledge Store");
  const li2 = document.querySelector('.sidenav ul li:nth-child(2)');
  if (li2) li2.style.display = 'none';

  // $(".sidenav ul li:nth-child(1) a .bg").text("My Hangar");
  const li1bg = document.querySelector('.sidenav ul li:nth-child(1) a .bg');
  if (li1bg) li1bg.textContent = "My Hangar";
}