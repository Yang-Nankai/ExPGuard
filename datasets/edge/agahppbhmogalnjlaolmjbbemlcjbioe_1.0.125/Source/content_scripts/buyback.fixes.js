if (document.querySelector('.c-error-messages')) {
  console.log('Hangar-Extension: Restricted RSI page detected - initialization skipped');
}
else {
  //document.querySelectorAll('.sidenav')
  //  .forEach(el => el.setAttribute('style', 'position: absolute !important'));

  const h1 = document.querySelector("h1.page-title");
  h1.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) {
      h1.removeChild(n);
    }
  });
  h1.insertBefore(document.createTextNode("Pledges and Associated Items"), h1.children[3]);

  const li6 = document.querySelector('.sidenav ul li:nth-child(6)');
  if (li6) li6.style.display = 'none';

  const li5 = document.querySelector('.sidenav ul li:nth-child(5)');
  if (li5) li5.style.display = 'none';

  const li5a = document.querySelector('.sidenav ul li:nth-child(5) a');
  if (li5a) li5a.setAttribute("href", "/account/buy-back-pledges");

  const li4bg = document.querySelector('.sidenav ul li:nth-child(4) a .bg');
  if (li4bg) li4bg.textContent = "Event Tickets";

  const li5bg = document.querySelector('.sidenav ul li:nth-child(3) a .bg');
  if (li5bg) li5bg.textContent = "Buyback Pledges";

  const phh1 = document.querySelector('.buy-back-pledges header h1');
  if (phh1) phh1.textContent = "Buyback Pledges";

  const warningExists = document.querySelector('.buy-back-warning');
  const fhpts = document.querySelector('.buy-back-pledges header p:nth-of-type(1)');
  if (warningExists && fhpts) fhpts.setAttribute('style', 'font-size: 13px !important');
  else if (fhpts) fhpts.setAttribute('style', 'font-size: 13px !important;margin-bottom: 0px');

  const fhp = document.querySelector(".buy-back-pledges header p:nth-of-type(1)");
  if (fhp) fhp.textContent = 'The Pledge Buy Back system allows you to re-acquire pledges that you previously converted to store credit, even if they are no longer available in the pledge store.';

  const shp = document.querySelector(".buy-back-pledges header p:nth-of-type(2)");
  if (shp && !warningExists) shp.style.display = 'none';

  const li2 = document.querySelector('.sidenav ul li:nth-child(2)');
  if (li2) li2.style.display = 'none';

  const li1bg = document.querySelector('.sidenav ul li:nth-child(1) a .bg');
  if (li1bg) li1bg.textContent = "My Hangar";

  document.querySelectorAll(".information").forEach(info => {

      const titleEl = info.querySelector("h1");
      if (!titleEl) return;

      const title = titleEl.textContent.trim();

      let type = null;

      if (/^Upgrade\s*-/i.test(title)) {
          type = "Ship Upgrade";
      } else if (/^Ship Upgrades\s*-/i.test(title)) {
          type = "Ship Upgrade";
      } else if (/Standalone/i.test(title)) {
          type = "Standalone Ship";
      } else if (/Add-Ons - Ursa Rover/i.test(title)) {
          type = "Standalone Ship";
      } else if (/Add-Ons/i.test(title)) {
          type = "Component Package";
      } else if (/Packs/i.test(title)) {
          type = "Ship Package";
      } else if (/Package/i.test(title)) {
          type = "Game Package";
      } else if (/Paint/i.test(title)) {
          type = "Ship Paint";
      } else if (/Bobblehead/i.test(title)) {
          type = "Decoration";
      } else if (/Puglisi Collection/i.test(title)) {
          type = "Decoration";
      } else if (/Gear/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Armor/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Suit/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Jacket/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Backpack/i.test(title)) {
          type = "Personal Equipment";
      } else if (/LMG/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Launcher/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Rifle/i.test(title)) {
          type = "Personal Equipment";
      } else if (/SMG/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Tool/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Device/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Outfit/i.test(title)) {
          type = "Personal Equipment";
      } else if (/FieldLite/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Helmet/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Shirts/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Pembroke/i.test(title)) {
          type = "Personal Equipment";
      } else if (/WowBlast/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Knife/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Pistol/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Shotgun/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Cold Front Collection/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Polar Vortex Collection/i.test(title)) {
          type = "Personal Equipment";
      } else if (/Decoration/i.test(title)) {
          type = "Decoration";
      } else if (/Poster/i.test(title)) {
          type = "Decoration";
      } else if (/Plushie/i.test(title)) {
          type = "Decoration";
      } else if (/Subscriber/i.test(title)) {
          type = "Decoration";
      }

      if (!type) return;

      const dl = info.querySelector("dl");
      if (!dl) return;

      const dt = document.createElement("dt");
      dt.textContent = "Pledge Type";

      const dd = document.createElement("dd");
      dd.textContent = type;

      const firstDD = dl.querySelector("dd");
      dl.insertBefore(dt, firstDD.nextSibling);
      dl.insertBefore(dd, dt.nextSibling);
  });

  document.querySelectorAll('.inner-content')
    .forEach(el => el.setAttribute('style', 'width: initial !important'));

  document.querySelectorAll(".information h1").forEach(h1 => {
      h1.textContent = h1.textContent
      .replace(/^Standalone Ships\s*-\s*/i, "")
      .replace(/^Standalone Ship\s*-\s*/i, "")
      .replace(/^Add-Ons\s*-\s*/i, "")
      .replace(/^Package\s*-\s*/i, "")
      .replace(/^Packs\s*-\s*/i, "")
      .replace(/\s*-\s*upgraded\s*$/i, "")
      //.replace(/\s*-\s*upgrade\s*$/i, "")
      //.replace(/\s*upgrade\s*$/i, "")
      .replace(/\s*Standard Edition\s*$/i, " Upgrade")
      .replace(/\s*Standard Upgrade\s*$/i, " Upgrade")
      .replace(/^Ship Upgrades\s*-\s*/i, "")
      .replace(/^Upgrade\s*-\s*/i, "")
      .replace(/^Gear\s*-\s*/i, "")
      .replace(/^Decorations\s*-\s*/i, "")
      .replace(/^Paints\s*-\s*/i, "")
      .replace(/^Posters\s*-\s*/i, "")
      .replace(/^Subscribers Store\s*-\s*/i, "")
      .replace(/^Subscribers Exclusive\s*-\s*/i, "");
  });

  document.querySelectorAll(".information dd").forEach(dd => {
      dd.textContent = dd.textContent
      .replace(/^Standalone Ships\s*-\s*/i, "")
      .replace(/^Standalone Ship\s*-\s*/i, "")
      .replace(/^Add-Ons\s*-\s*/i, "")
      .replace(/^Package\s*-\s*/i, "")
      .replace(/\s*-\s*upgraded\s*$/i, "")
      .replace(/^Upgrade\s*-\s*/i, "")
      .replace(/\s*Standard Edition\s*$/i, " Upgrade")
      .replace(/\s*Standard Upgrade\s*$/i, " Upgrade")
      .replace(/^Gear\s*-\s*/i, "")
      .replace(/^Decorations\s*-\s*/i, "")
      .replace(/^Paints\s*-\s*/i, "")
      .replace(/^Posters\s*-\s*/i, "")
      .replace(/^Subscribers Store\s*-\s*/i, "")
      .replace(/^Subscribers Exclusive\s*-\s*/i, "");
  });

  document.querySelectorAll('.pledges .pledge .details .corner')
    .forEach(el => el.setAttribute('style', 'display: none'));

  document.querySelectorAll("section.details.content-block1 > p")
    .forEach(p => {
      p.innerHTML = "<strong>Upgraded Entries: </strong>The reacquired pledge will only contain ships and items that were originally part of it, this means all changes made through upgrades will be lost.";
    });

  const style = document.createElement("style");
  style.textContent = `
  #contentbody.account-section {
    background: #09131a;
  }
  .buy-back .available-pledges .pledges .pledge .details:before {
      background: initial;
      width: 100% !important;
      height: 1px !important;
  }
  /* Rahmenfarbe anpassen um die Bilder */
  .buy-back .available-pledges .pledges .pledge > .information figure{
    position: relative !important;
    border: 1px solid #284861;
  }
  /* Before, After um die Bilder löschen, da fehlerhaft */
  .buy-back .available-pledges .pledges .pledge > .information figure:after{
    content: none !important;
  }
  .buy-back .available-pledges .pledges .pledge > .information figure:before{
    content: none !important;
  }
  /* Abstand zwischen den Items normalisieren */
  .buy-back .available-pledges .pledges>li {
      margin-bottom: 15px !important;
  }
  /* Zu grellen Blauton abschwächen */
  .buy-back .available-pledges .pledges .pledge {
      background: rgba(31, 65, 109, .25);
  }

  /* Anpassungen der Filter + Seitennavigation */
  .buy-back form.filters.legacy-form {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .buy-back form.filters.legacy-form > .js-selectlist.selectlist {
    flex: 0 0 auto;
    width: 162px;
    background-color: #050b10;
  }

  .buy-back form.filters.legacy-form .pager .left .js-selectlist.selectlist {
    width: 140px;
    background-color: #050b10;
  }

  .buy-back form.filters.legacy-form .options-selector.pager-wrapper {
    margin-left: auto;
    padding: 0;
  }

  .buy-back form.filters.legacy-form .pager {
    display: flex;
    align-items: center;
  }

  .buy-back form.filters.legacy-form .pager .left,
  .buy-back form.filters.legacy-form .pager .right {
    float: none;
  }

  .buy-back form.filters.legacy-form .pager .right {
    display: flex;
    align-items: center;
  }

  .buy-back .pager .left {
      margin-right: 0px;
  }
  `;
  document.head.appendChild(style);

  // Rahmen Ecken um die Bilder korrekt wie auf den anderen Seiten einbringen
  const FIG_SEL = '.buy-back .available-pledges .pledges .pledge > .information figure';
  document.querySelectorAll(FIG_SEL).forEach(fig => {
  // Abbruch, falls bereits eingefügt
    if (fig.querySelector(':scope > .corner')) return;
    [
      'corner corner-top-left',
      'corner corner-top-right',
      'corner corner-bottom-left',
      'corner corner-bottom-right'
    ].forEach(cls => {
      const div = document.createElement('div');
      div.className = cls;
      fig.appendChild(div);
    });
  });

  document.querySelectorAll('.holosmallbtn:not(.js-open-ship-upgrades)')
    .forEach(function(el) {
      el.setAttribute('target', '_blank');
    });


  // Verschieben der Seitennavigation
  var filters = document.querySelector('.buy-back form.filters.legacy-form');
  var pagerWrapper = document.querySelector('.buy-back .options-selector.pager-wrapper');
  if (filters && pagerWrapper) {
    filters.appendChild(pagerWrapper);
  }

  // Anpassen der Labels sowie Reihenfolge der My Hangar Seite angleichen
  var options = document.querySelectorAll('.buy-back form.filters.legacy-form .js-selectlist .js-option');
  var gamePackages = null;
  var standaloneShips = null;

  for (var i = options.length - 1; i >= 0; i--) {
    var option = options[i];
    var text = option.textContent.trim();
    // Vereinheitlichung mit der My Hangar Seite
    if (text == 'All') {
      option.textContent = 'Show All';
    }
    else if (text == 'Upgrades') {
      option.textContent = 'Ship Upgrades';
    }
    else if (text == 'Game Packages') {
      gamePackages = option;
    }
    else if (text == 'Standalone Ships') {
      standaloneShips = option;
    }
    // Seit Jahren nicht länger funktionierende Filter entfernen
    else if (text == 'Component' || text == 'Hangar Decorations' || text == 'Weapon') {
      option.parentNode.removeChild(option);
    }
  }

  if (gamePackages && standaloneShips) {
    gamePackages.parentNode.insertBefore(standaloneShips, gamePackages);
  }

  var label = document.querySelector('.buy-back form.filters.legacy-form .js-selectlist span');
  if (label) {
    var labelText = label.textContent.trim();
    if (labelText == 'All') {
      label.textContent = 'Show All';
    }
    else if (labelText == 'Upgrades') {
      label.textContent = 'Ship Upgrades';
    }
  }

  // Per Doppelklick an den Seitenanfang zurück
  var pageWrapper = document.querySelector('.page-wrapper');
  if (pageWrapper) {
    pageWrapper.addEventListener('dblclick', function(event) {
      var target = event.target;
      if (target && target.nodeType !== 1) {
        target = target.parentElement;
      }

      if (target && target.closest(
        'a, button, input, textarea, select, .inner-content'
      )) {
        return;
      }

      if (window.scrollY >= 150) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    // Fix: Beim automatisierten Hochscrollen via Doppelklick werden sporadisch Texte markiert
    pageWrapper.addEventListener('selectstart', function(event) {
      var target = event.target;
      if (target && target.nodeType !== 1) {
        target = target.parentElement;
      }

      if (target && target.closest(
        'a, button, input, textarea, select, .inner-content'
      )) {
        return;
      }

      event.preventDefault();

      var selection = window.getSelection && window.getSelection();
      if (selection && selection.rangeCount > 0) {
        selection.removeAllRanges();
      }
    });
  }

  // Seiten per Cursor-Tasten durchblättern
  document.addEventListener('keydown', function(e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) {
      return;
    }

    var pager = document.querySelector('.buy-back .js-pager');
    if (!pager) {
      return;
    }

    var link = null;

    if (e.keyCode === 37) {
      var active = pager.querySelector('.right a.active');
      link = active ? active.previousElementSibling : null;

      if (!link || link.tagName.toLowerCase() !== 'a') {
        return;
      }
    }
    else if (e.keyCode === 39) {
      link = pager.querySelector('.right a.gt.btn');

      if (!link) {
        var active = pager.querySelector('.right a.active');
        link = active ? active.nextElementSibling : null;

        if (!link || link.tagName.toLowerCase() !== 'a') {
          return;
        }
      }
    }
    else {
      return;
    }

    e.preventDefault();
    window.location.href = link.href;
  });
}