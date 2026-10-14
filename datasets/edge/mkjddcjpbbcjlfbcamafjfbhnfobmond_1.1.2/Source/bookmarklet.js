(function() {
  var TITLE          = window.getSelection().toString() || '',
      TAGS           = !!(wishr_settings && wishr_settings.tags),
      TOKEN          = null,
      DATE           = null,
      HASCOOKIE      = null,
      SID            = null,
      NULL           = null,
      TRUE           = true,
      FALSE          = false,
      LENGTH         = 'length',
      SRC            = 'src',

      style          = 'style',
      cssText        = 'cssText',
      innerHTML      = 'innerHTML',
      setAttribute   = 'setAttribute',
      appendChild    = 'appendChild',
      createElement  = 'createElement',
      createTextNode = 'createTextNode',
      getElByTagName = 'getElementsByTagName',
      getElementById = 'getElementById',
      onclick        = 'onclick',
      titleInp       = 'w-title-inp',
      classPrefix    = 'wishlistr-bookmarklet-',

      DOCUMENT       = document,
      BODY           = document.body,

      // Global vars
      PRODUCTIMG     = [],
      CURRENTIMG     = 0,
      IMG            = NULL,
      IMGCOUNT       = NULL,
      INP_TITLE      = NULL,
      INP_COMMENT    = NULL,
      INP_TAGS       = NULL,
      INP_CHECK_NOIMG= NULL,
      INP_CHECK_FULL = NULL,
      HOST           = 'www.wishlistr.com',
      BODYSPACER     = NULL,

      wrapper        = NULL,

      getImgSrc = function(img) { return img.currentSrc || img.src; },

  Bookmarklet = {

    getImages: function(minsize, preImages) {
      var IMAGES = preImages || DOCUMENT[getElByTagName]('img'),
          added = {}, i, img, src, j, allImgs, frameImgs;

      minsize = minsize || 100;

      for (i = 0; i < IMAGES[LENGTH]; i++) {
        img = IMAGES[i];
        src = getImgSrc(img);

        // List of rules for skipping images
        try {
          if ( src === undefined || src === '' || !img.width || !img.height ) { continue; }
          // if ( img.width < minsize || img.height < minsize ) { continue; }
          if ( img.width/img.height < 0.31 || img.height/img.width < 0.31 ) { continue; }
          if ( img.naturalHeight && img.naturalWidth && (img.naturalHeight < minsize || img.naturalWidth < minsize ) ) { continue; }
          if ( added[src] !== undefined ) { continue; }
          if ( img.className && img.className.search(/nav-promo/i) !== -1) { continue; }
          if ( src.substring(0,4) !== 'http') { continue; } // skip data:base64 etc.
          if ( src.search(/amazon(.)+loadIndicators/i)!==-1) { continue; }
          if ( src.search(/sizechart\/|size_guide|\/SUBNAV\/|\/logos\/|\/global-cms\/|timmy\.png|logo\.gif|logo\.png|sprites|(.)*loading(.)*\.gif|nav\.gif|select\.gif|spacer\.gif|blank\.gif|no_flash\.gif|beacon\/|armAnimation\/0|starAnimation\/star|marketing\//i)!==-1) { continue; }
        } catch (e) {
          continue;
        }
        added[src] = TRUE;
        PRODUCTIMG.push(img);
      }

      // Try again if images are inside iframes (example loveculture.com)
      if (PRODUCTIMG[LENGTH] === 0 && !preImages) {
        frame = DOCUMENT[getElByTagName]('iframe');
        allImgs = [];
        for (i = 0; i < frame[LENGTH]; i++) {
          if ( frame[i] && frame[i].contentWindow && frame[i].contentWindow.document ) {
            frameImgs = frame[i].contentWindow.document[getElByTagName]('img');
            for (j = 0; j < frameImgs[LENGTH]; j++) {
              allImgs.push(frameImgs[j]);
            }
          }
        }
        if (allImgs[LENGTH] > 0) {
          Bookmarklet.getImages(80, allImgs);
        }
      }

      // Try again with lower min size (example ulta.com)
      if (PRODUCTIMG[LENGTH] === 0 && minsize === 80) {
        Bookmarklet.getImages(40);
      }

      if (PRODUCTIMG[LENGTH] > 1) {
        // Sort by size
        if (DOCUMENT.location.host.search(/amazon./i) === -1) {
          PRODUCTIMG.sort( function(a, b) {
            return b.height-a.height;
          });
        // If Amazon, sort by known main img IDs
        } else {
          PRODUCTIMG.sort( function(a, b) {
            return ['main-image', 'landingImage', 'imgBlkFront'].indexOf(b.id);
          });
        }
      }
    },

    getTitle: function() {
      var ogTitle = DOCUMENT.querySelector('meta[property="og:title"]'),
          amazonTitle = DOCUMENT[getElementById]('productTitle') || DOCUMENT.querySelector('h1[id="title"]') || DOCUMENT.querySelector('h1[data-feature-name="title"]'),
          h1Titles = DOCUMENT.querySelectorAll('h1'),
          title = null;

      if (ogTitle && ogTitle.content) {
        title = ogTitle.content;
      } else if (amazonTitle) {
        title = amazonTitle.innerText;
      } else if (h1Titles && h1Titles.length === 1) {
        title = h1Titles[0].innerText;
      }

      return title;
    },

    prevImg: function(prev, next) {
      if (CURRENTIMG === 0) {
        return;
      }
      --CURRENTIMG;
      IMG[SRC] = getImgSrc(PRODUCTIMG[CURRENTIMG]);
      IMGCOUNT[innerHTML] = 'Image '+(CURRENTIMG+1)+' of '+PRODUCTIMG[LENGTH];
      next[setAttribute]('class', classPrefix+'img-stepper-next');
  
      if (CURRENTIMG === 0) {
        prev[setAttribute]('class', classPrefix+'img-stepper-prev '+classPrefix+'img-stepper-disabled');
      }
    },

    nextImg: function(prev, next) {
      if (CURRENTIMG+1 >= PRODUCTIMG[LENGTH]) {
        return;
      }
      ++CURRENTIMG;
      IMG[SRC] = getImgSrc(PRODUCTIMG[CURRENTIMG]);
      IMGCOUNT[innerHTML] = 'Image '+(CURRENTIMG+1)+' of '+PRODUCTIMG[LENGTH];
      prev[setAttribute]('class', classPrefix+'img-stepper-prev');
  
      if (CURRENTIMG+1 >= PRODUCTIMG[LENGTH]) {
        next[setAttribute]('class', classPrefix+'img-stepper-next '+classPrefix+'img-stepper-disabled');
      }
    },

    submit: function() {
      var noimg = !!INP_CHECK_NOIMG.checked || PRODUCTIMG[LENGTH]===0,
          fullimg = !!INP_CHECK_FULL.checked, 
          tagsString = '';

      WISHLISTR_FAVLET_CB.HOST = HOST;
      WISHLISTR_FAVLET_CB.REMOVE = [wrapper, BODYSPACER];

      if (INP_TITLE.value === "") {
        alert("Please add a title");
        INP_TITLE.focus();
        return;
      }

      WISHLISTR_FAVLET_CB.showMessage("Adding item...", FALSE, FALSE, TRUE);

      setTimeout( function() {
        wrapper[style].display = 'none';
        BODYSPACER[style].display = 'none';
      }, 300);

      if (TAGS) {
        var tagNodes = document.querySelectorAll('.'+classPrefix+'tags span');
        if (tagNodes.length) {
          for ( var i in tagNodes ) {
            if (tagNodes[i].firstChild) {
              tagsString += tagNodes[i].firstChild.innerText + ' ';
            }
          }
        }
      }

      chrome.runtime.connect().postMessage({
        type: 'add',
        data: {
          title: INP_TITLE.value,
          comment: INP_COMMENT.value,
          image: noimg ? '' : IMG[SRC],
          fullimg: fullimg ? '1' : '0',
          tags: tagsString.trim()
        }
      });
    },

    close: function() {
      WISHLISTR_FAVLET_CB.HOST = HOST;
      WISHLISTR_FAVLET_CB.REMOVE = [wrapper, BODYSPACER];
      WISHLISTR_FAVLET_CB.close();
    },

/*
  <div id="wishlistr-bookmarklet">
    <div id="wishlistr-bookmarklet-modal">
      <h3 id="wishlistr-bookmarklet-title">Add to wishlist</h3>
      <a href="#" tabindex="7" id="wishlistr-bookmarklet-close"><i class="material-icons">close</i></a>
      <div id="wishlistr-bookmarklet-modal-content">
        <form id="wishlistr-bookmarklet-image">
          <label>Image</label>
          <div id="wishlistr-bookmarklet-img-nav">
            <div class="wishlistr-bookmarklet-img-container">
              <div class="wishlistr-bookmarklet-img-instruction">
                <i class="material-icons">crop_free</i>
                <p>No images found.</p>
              </div>
            </div>
            <div class="wishlistr-bookmarklet-img-stepper">
              <a href="" class="wishlistr-bookmarklet-img-stepper-prev">
                <i class="material-icons">keyboard_arrow_left</i>
                <span>Previous</span>
              </a>
              <a href="" class="wishlistr-bookmarklet-img-stepper-next">
                <i class="material-icons">keyboard_arrow_right</i>
                <span>Next</span>
              </a>
              <p class="wishlistr-bookmarklet-img-stepper-current">Image 1 of 6</p>
            </div>
            <div class="wishlistr-bookmarklet-img-options">
              <div class="wishlistr-bookmarklet-modal-inputs">
                <input type="checkbox" id="wishlistr-bookmarklet-no-image">
                <label for="wishlistr-bookmarklet-no-image">Don’t use an image</label>
              </div>
              <div class="wishlistr-bookmarklet-modal-inputs">
                <input type="checkbox" id="wishlistr-bookmarklet-avoid-cropping">
                <label for="wishlistr-bookmarklet-avoid-cropping">Don’t stretch the image <a href="/help/#images"><i class="material-icons">help_outline</i></a></label>
              </div>
            </div>
          </div>
        </form>
        <form id="wishlistr-bookmarklet-textfields" method="post" action="/your-list/edit-list/add/">
          <label for="item-title">Title</label>
          <input type="text" class="wishlistr-bookmarklet-textfield" id="item-title" name="item-title" maxlength="200" tabindex="1">
          <label for="item-comment">Comment</label>
          <input type="text" class="wishlistr-bookmarklet-textfield" id="item-comment" name="item-comment" maxlength="510" tabindex="2">
          <label for="item-tags">Tags</label>
          <div class="wishlistr-bookmarklet-tags">
            <input type="text" id="item-tags" name="item-tags" tabindex="3">
          </div>
        </form>
        <div id="wishlistr-bookmarklet-submit-area">
          <input type="submit" value="Add to Wishlist" tabindex="6">
        </div>
      </div>
    </div>
  </div>
*/
    open: function() {
      var imgform = DOCUMENT[createElement]('form'),
          txtform = DOCUMENT[createElement]('form'),
          modal = DOCUMENT[createElement]('div'),
          title = DOCUMENT[createElement]('h3'),
          content = DOCUMENT[createElement]('div'),
          imglabel = DOCUMENT[createElement]('label'),
          imgnav = DOCUMENT[createElement]('div'),
          imgcontainer = DOCUMENT[createElement]('div'),
          imgoption = DOCUMENT[createElement]('div'),
          imgstepper = DOCUMENT[createElement]('div'),
          next = DOCUMENT[createElement]('a'),
          prev = DOCUMENT[createElement]('a'),
          close = DOCUMENT[createElement]('a'),
          submit = DOCUMENT[createElement]('input'),
          submitarea = DOCUMENT[createElement]('div');

      Bookmarklet.getImages();

      TITLE = TITLE || Bookmarklet.getTitle() || '';

      wrapper = DOCUMENT[createElement]('div');
      IMG = DOCUMENT[createElement]('img');
      IMGCOUNT = DOCUMENT[createElement]('p');
      INP_CHECK_NOIMG = DOCUMENT[createElement]('input');
      INP_CHECK_FULL = DOCUMENT[createElement]('input');

      modal[setAttribute]('id', classPrefix+'modal');

      // <h3 id="wishlistr-bookmarklet-title">Add to wishlist</h3>
      title[setAttribute]('id', classPrefix+'title');
      title[appendChild](DOCUMENT[createTextNode]('Add to wishlist'));
      modal[appendChild](title);

      // <a href="#" tabindex="7" id="wishlistr-bookmarklet-close"><i class="material-icons">close</i></a>
      close[innerHTML] = '<i class="material-icons">close</i>';
      close[setAttribute]('href', '#');
      close[setAttribute]('tabindex', '7');
      close[setAttribute]('id', classPrefix+'close');
      close[onclick] = function() {
        Bookmarklet.close(); return FALSE;
      };
      modal[appendChild](close);

      content[setAttribute]('id', classPrefix+'modal-content');
      imgform[setAttribute]('id', classPrefix+'image');
      imglabel[appendChild](DOCUMENT[createTextNode]('Image'));
      imgform[appendChild](imglabel);
      imgnav[setAttribute]('id', classPrefix+'img-nav');


      // <div class="wishlistr-bookmarklet-img-container">
      if (PRODUCTIMG[LENGTH] > 0) {
        imgcontainer[setAttribute]('class', classPrefix+'img-container '+classPrefix+'has-image');
        IMG[setAttribute](SRC, getImgSrc(PRODUCTIMG[0]));
        IMG[setAttribute]('id', classPrefix+'img-thumb');
        imgcontainer[appendChild](IMG);
      } else {
        imgcontainer[setAttribute]('class', classPrefix+'img-container');
        var instruction = DOCUMENT[createElement]('div');
        instruction[setAttribute]('class', classPrefix+'img-instruction');
        instruction.innerHTML = '<i class="material-icons">crop_free</i><p>No images found.</p>';
        imgcontainer[appendChild](instruction);
      }

      imgnav[appendChild](imgcontainer);

      // <div class="wishlistr-bookmarklet-img-stepper">
      if (PRODUCTIMG[LENGTH] > 0) {
        imgstepper[setAttribute]('class', classPrefix+'img-stepper');

        prev[setAttribute]('class', classPrefix+'img-stepper-prev '+classPrefix+'img-stepper-disabled');
        prev[setAttribute]('href', '#');
        prev.innerHTML = '<i class="material-icons">keyboard_arrow_left</i><span>Previous</span>';

        next[setAttribute]('class', classPrefix+'img-stepper-next' + (PRODUCTIMG[LENGTH]>1?'':' '+classPrefix+'img-stepper-disabled'));
        next[setAttribute]('href', '#');
        next.innerHTML = '<i class="material-icons">keyboard_arrow_right</i><span>Next</span>';

        IMGCOUNT[setAttribute]('class', classPrefix+'img-stepper-current');
        IMGCOUNT[appendChild](DOCUMENT[createTextNode]('Image 1 of '+PRODUCTIMG[LENGTH]));

        imgstepper[appendChild](prev);
        imgstepper[appendChild](next);
        imgstepper[appendChild](IMGCOUNT);

        prev[onclick] = function() { Bookmarklet.prevImg(prev, next); return false; };
        next[onclick] = function() { Bookmarklet.nextImg(prev, next); return false; };

        imgnav[appendChild](imgstepper);
      }

      // <div class="wishlistr-bookmarklet-img-options">
      if (PRODUCTIMG[LENGTH] > 0) {
        imgoption[setAttribute]('class', classPrefix+'img-options');

        var noimgwrap = DOCUMENT[createElement]('div');
        var noimgwraplbl = DOCUMENT[createElement]('label');
        noimgwrap[setAttribute]('class', classPrefix+'modal-inputs');
        noimgwraplbl[setAttribute]('for', classPrefix+'no-image');
        noimgwraplbl.innerHTML = 'Don’t use an image';
        INP_CHECK_NOIMG[setAttribute]('type', 'checkbox');
        INP_CHECK_NOIMG[setAttribute]('id', classPrefix+'no-image');
        noimgwrap[appendChild](INP_CHECK_NOIMG);
        noimgwrap[appendChild](noimgwraplbl);
        imgoption[appendChild](noimgwrap);

        var imgstretchwrap = DOCUMENT[createElement]('div');
        var imgstretchwraplbl = DOCUMENT[createElement]('label');
        imgstretchwrap[setAttribute]('class', classPrefix+'modal-inputs');
        imgstretchwraplbl[setAttribute]('for', classPrefix+'avoid-cropping');
        imgstretchwraplbl.innerHTML = 'Don’t stretch the image <a href="https://www.wishlistr.com/help/#images" target="_blank"><i class="material-icons">help_outline</i></a>';
        INP_CHECK_FULL[setAttribute]('type', 'checkbox');
        INP_CHECK_FULL[setAttribute]('id', classPrefix+'avoid-cropping');
        imgstretchwrap[appendChild](INP_CHECK_FULL);
        imgstretchwrap[appendChild](imgstretchwraplbl);
        imgoption[appendChild](imgstretchwrap);

        INP_CHECK_FULL[onclick] = function() {
          imgnav[setAttribute]('class', INP_CHECK_FULL.checked ? classPrefix+'contain' : '');
        };

        imgnav[appendChild](imgoption);
      }

      imgform[appendChild](imgnav);

      // <form id="wishlistr-bookmarklet-textfields">
      txtform[setAttribute]('id', classPrefix+'textfields');

      var inpTitleLabel = DOCUMENT[createElement]('label');
      inpTitleLabel[setAttribute]('for', titleInp);
      inpTitleLabel[appendChild](DOCUMENT[createTextNode]('Title'));
      txtform[appendChild](inpTitleLabel);

      INP_TITLE = DOCUMENT[createElement]('input');
      INP_TITLE[setAttribute]('type', 'text');
      INP_TITLE[setAttribute]('class', classPrefix+'textfield');
      INP_TITLE[setAttribute]('maxlength', 200);
      INP_TITLE[setAttribute]('value', TITLE);
      INP_TITLE[setAttribute]('tabindex', '1');
      INP_TITLE[setAttribute]('id', titleInp);
      INP_TITLE[setAttribute]('name', titleInp);
      txtform[appendChild](INP_TITLE);

      var inpCommentLabel = DOCUMENT[createElement]('label');
      inpCommentLabel[setAttribute]('for', classPrefix+'item-comment');
      inpCommentLabel[appendChild](DOCUMENT[createTextNode]('Comment'));
      txtform[appendChild](inpCommentLabel);

      INP_COMMENT = DOCUMENT[createElement]('input');
      INP_COMMENT[setAttribute]('type', 'text');
      INP_COMMENT[setAttribute]('class', classPrefix+'textfield');
      INP_COMMENT[setAttribute]('maxlength', 510);
      INP_COMMENT[setAttribute]('tabindex', '2');
      INP_COMMENT[setAttribute]('id', classPrefix+'item-comment');
      INP_COMMENT[setAttribute]('name', classPrefix+'item-comment');
      txtform[appendChild](INP_COMMENT);

      if (TAGS) {
        var inpTagLabel = DOCUMENT[createElement]('label');
        inpTagLabel[setAttribute]('for', classPrefix+'item-tags');
        inpTagLabel[appendChild](DOCUMENT[createTextNode]('Tags'));
        txtform[appendChild](inpTagLabel);

        var tagContainer = DOCUMENT[createElement]('div');
        tagContainer[setAttribute]('class', classPrefix+'tags');

        INP_TAGS = DOCUMENT[createElement]('input');
        INP_TAGS[setAttribute]('type', 'text');
        INP_TAGS[setAttribute]('class', classPrefix+'textfield');
        INP_TAGS[setAttribute]('tabindex', '3');
        INP_TAGS[setAttribute]('id', classPrefix+'item-tags');
        INP_TAGS[setAttribute]('name', classPrefix+'item-tags');

        var createTag = function (label) {
          /*
            <span class="wishlistr-bookmarklet-tag">
              <em>Tag2</em>
              <i class="material-icons">close</i>
            </span>
          */

          var tag = document.createElement('span');
          var txt = document.createElement('em');
          var i = document.createElement('i');

          tag.setAttribute('class', classPrefix+'tag');
          i.setAttribute('class', 'material-icons');

          i.onclick = function(e) {
            tagContainer.removeChild(tag);
            INP_TAGS.focus();
          };

          txt.appendChild(document.createTextNode(label));
          i.appendChild(document.createTextNode('close'));
          tag.appendChild(txt);
          tag.appendChild(i);

          return tag;
        };

        var insertTag = function(text) {
          if (text) {
            text.trim().split(' ').forEach(function(val) { // in case text has spaces (e.g. copy paste)
              if (val) {
                tagContainer.insertBefore(createTag(val.trim()), INP_TAGS);
              }
            });
          }
          INP_TAGS.value = '';
        };

        INP_TAGS.onkeydown = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            insertTag(e.target.value);
          }

          if (e.target.value === '' && (e.key === 'Backspace' || e.key === 'Delete')) {
            var tags = tagContainer.querySelectorAll('span');
            if (tags.length) {
              tagContainer.removeChild(tags[tags.length - 1]);
            }
          }
        };

        INP_TAGS.onfocus = function(e) {
          tagContainer.classList.add('focus');
        };

        INP_TAGS.onblur = function(e) {
          if (e.target.value) {
            insertTag(e.target.value);
          }
          tagContainer.classList.remove('focus');
        };

        tagContainer[appendChild](INP_TAGS);
        txtform[appendChild](tagContainer);
      }

      // <div id="wishlistr-bookmarklet-submit-area">
      submitarea[setAttribute]('id', classPrefix+'submit-area');
      submit[setAttribute]('type', 'submit');
      submit[setAttribute]('value', 'Add to Wishlist');
      submit[setAttribute]('tabindex', '6');
      submit[onclick] = function() { Bookmarklet.submit(); return FALSE; };
      submitarea[appendChild](submit);

      content[appendChild](imgform);
      content[appendChild](txtform);
      content[appendChild](submitarea);

      modal[appendChild](content);

      wrapper[appendChild](modal);
      wrapper[setAttribute]('id', 'wishlistr-bookmarklet');

      BODY[appendChild](wrapper);

      BODYSPACER = DOCUMENT[createElement]('div');
      BODYSPACER[style][cssText] = "clear: both; display: block; margin: 0; height: 175px;";
      BODY[appendChild](BODYSPACER);
    }
  };

  if (DOCUMENT.location.host == HOST && typeof WBI === 'object' && WBI.s) {
    WBI.s();
  } else if(!DOCUMENT[getElementById](titleInp)) {
    Bookmarklet.open();
  }

}());

/* jshint ignore:start */
//fgnass.github.com/spin.js#v1.2.3
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);
/* jshint ignore:end */

var WISHLISTR_FAVLET_CB = {

  MSGWRAP: null,
  REMOVE: null,
  HOST: null,

  CHECKMARK_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABSElEQVRIx+3WT2cDQRjH8SWEZVnCUkLIKeRUeiqhlJzyYvIm8kp67amUUEoooZScQk5hCaWUEHL99tBn2db8292ZVMmPvY3nw+zM80wERH/xRWc4wJcBc2BwSjgDVnxnB/RPAV8Aa34mB3oh4S6wQZ0t0A2B9qS4KcsQaG5B34GhT7TvgO6K0+0LHUhRJ1QHJxXRoWyfKXn5Kqnga+ADmDiil7LelG1xhXTwCDjI4iMw9oBu5GppW+atYOUcgRsNegV8WtC1NBFtrx4r0DI+UvyOfRO0gO8sRQ6C/f4duqykR1unUxt4tBTbA1PDzhR5AzpVxmJbRleTLIG0zjyOgacGaNLkIRADi4roS42mo+xcsRRzybOs9/b0SWT7TJnXRW1DIgVeNeiDHMhgj71UrohX1HUsdkoPtnsfaJV5nAEzoHV+0P87+Av7mGUtDHAlNgAAAABJRU5ErkJggg==',
  ERROR_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAAuUlEQVR4Ad3SwQmDQBCFYTuwEiElWdLCwkLKCGwNAVtZsIYX9ubPzIvXkPfflO8g4/Ir066ixbSqa7s+4etdc8XQQ9K48kjnqqEizyg5KTgpOSjWiYvimqGHVmLHHQWe1YSfngIbHigwavfUY89BgdEzoYPU41VnwpvDpG/lqx57armnnhNbeia8EJPyOO0bB83uajjwK6H+p92JHxqRkpPymzcNUvJIJwYHZQU04Mk7KTlowPf9A/4AAVN6l0zD5p4AAAAASUVORK5CYII=',

  showMessage: function(msg, remove, icon, spinner) {
    if ( !this.MSGWRAP ) {
      this.MSGWRAP = document.createElement('div');
      this.MSGWRAP.setAttribute('id', 'add-bar-message');
      this.MSGWRAP.style.opacity = 0;
    }

    this.MSGWRAP.innerHTML = "";

    var p = document.createElement('p'), i;

    if (icon) {
      i = document.createElement('img');
      i.setAttribute('src', icon);
      if ( icon == this.ERROR_ICON ) {
        this.MSGWRAP.setAttribute('class', 'aerror');
      }
      this.MSGWRAP.appendChild(i);
    }

    p.innerHTML = msg;
    this.MSGWRAP.appendChild(p);

    document.body.appendChild(this.MSGWRAP);

    if (spinner) {
      new Spinner({width:3,color:'#fff',trail: 50}).spin(this.MSGWRAP);
    }

    this.MSGWRAP.style.opacity = 1;

    if (remove) {
      setTimeout( function() {
        WISHLISTR_FAVLET_CB.MSGWRAP.style.opacity = 0;
        setTimeout( function() {
          document.body.removeChild(WISHLISTR_FAVLET_CB.MSGWRAP);
          WISHLISTR_FAVLET_CB.MSGWRAP=null;
        }, 600);
      }, remove);
    }
  },

  success: function(o) {
    this.showMessage("Item added!", 1300, this.CHECKMARK_ICON);
    setTimeout( function() {
      WISHLISTR_FAVLET_CB.close();
    }, 2000);
  },

  failure: function(o) {
    if (o.isPermanent) {
      this.showMessage("Item could not be added. Please reload the page and try again.", false, this.ERROR_ICON);
    } else {
      this.showMessage("Ops! The item could not be added. Please try again.", 4000, this.ERROR_ICON);
      setTimeout(function() { WISHLISTR_FAVLET_CB.show(); }, 500);
    }
  },

  show: function() {
    var i, e = WISHLISTR_FAVLET_CB.REMOVE;

    if (e && e.length) {
      for(i = 0; i < e.length; i++) {
        if (e[i].tagName === 'DIV') {
          e[i].style.display = 'block';
        }
      }
    }
  },

  close: function() {
    var i, e = WISHLISTR_FAVLET_CB.REMOVE;

    WISHLISTR_FAVLET_CB.flash = null;

    if (e && e.length) {
      for(i = 0; i < e.length; i++) {
        if (e[i] && e[i].parentNode === document.body) {
          document.body.removeChild(e[i]);
        }
      }
    }
  },

  flash: function() {
    if (document.getElementById('w-title-inp')) {
      document.getElementById('w-title-inp').focus();
    }
  }
};

// Listener for messages from background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "item-added") {
      WISHLISTR_FAVLET_CB.success();
    } else if (request.action === "failure") {
      WISHLISTR_FAVLET_CB.failure({});
    } else if (request.action === "cancel") {
      if (WISHLISTR_FAVLET_CB.MSGWRAP && WISHLISTR_FAVLET_CB.MSGWRAP.parentNode === document.body) {
        document.body.removeChild(WISHLISTR_FAVLET_CB.MSGWRAP);
      }
      WISHLISTR_FAVLET_CB.close();
    }
  }
);
