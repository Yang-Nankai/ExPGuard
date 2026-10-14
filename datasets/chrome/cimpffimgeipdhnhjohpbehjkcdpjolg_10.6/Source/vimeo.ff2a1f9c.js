// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"iZCu1":[function(require,module,exports,__globalThis) {
module.exports = JSON.parse('{"total":6483,"page":1,"per_page":10,"paging":{"next":"/videos?query=best%20short%20films&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=2&fields=uri%2Cname%2Cdescription%2Cpictures%2Ccreated_time%2Cuser.uri%2Cuser.name&per_page=10","previous":null,"first":"/videos?query=best%20short%20films&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=1&fields=uri%2Cname%2Cdescription%2Cpictures%2Ccreated_time%2Cuser.uri%2Cuser.name&per_page=10","last":"/videos?query=best%20short%20films&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=649&fields=uri%2Cname%2Cdescription%2Cpictures%2Ccreated_time%2Cuser.uri%2Cuser.name&per_page=10"},"data":[{"uri":"/videos/8076064","name":"APRICOT \u2014 A Short Film by Ben Briand","description":"WINNER :: Voted Best Narrative Film on Vimeo // Community Choice Award\\n\\n============================================================================\\n\\nDo you remember your first love? ... Do you remember your first kiss? ... Do you remember? ...\\n\\nWritten & Directed by Ben Briand\\nhttp://www.benbriand.com\\n\\nProduced by Matt Dooley, Michele Bennett, Alexis Bensa, Gaspard Chevance\\nhttp://www.moonwalk-films.com  http://www.cherubpictures.com.au\\n\\nCast\\nEwen Leslie, Laura Gordon, Alice Zahalka, Joshua Rozzi\\n\\nCinematography\\nhttp://www.adamarkapaw.com\\n\\nMusic\\nwww.basilhogios.com.au\\n\\nLike it on Facebook : http://tinyurl.com/apricot-fb","created_time":"2009-12-09T14:16:22+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/506006996_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/506006996_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/506006996_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/506006996_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/506006996_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/506006996_100x75.jpg"}],"user":{"uri":"/users/2771399","name":"Moonwalk Films"}},{"uri":"/videos/32655795","name":"The Camera (short film / original score)","description":"In an abandoned beach house, a solitary girl finds a mysterious camera that reveals something unexpected.\\n\\n------------------------\\n\\n\\"Perfect in its simplicity, beautiful and haunting in its visuals, The Camera is a reminder that a great film is in everyone\u2019s grasp, as long as he/she has the creative capacity and appropriate willpower to drop pretension, and quite simply, make something.\\" \u2014Short of the Week\\n\\n\\"From its delicate shot composition to an emotionally stirring score, Peter Lewis\u2018s The Camera is a crash course in great filmmaking.\\" \u2014Film School Rejects Short Film of the Day\\n\\n\\"A compelling example of what\u2019s possible when perseverance and resourcefulness meet.\\" \u2014DirectorsNotes.com\\n\\n\\"Awesome ... \'The Camera\' proves that beautiful movies can be made simply and makes you want to get out and make your own!\\" \u2014Mitch Aunger, planet5D\\n\\n\\"Haunting\\" \u2014FStoppers.com\\n\\n------------------------\\n\\nFacebook: http://www.facebook.com/TheCameraShortFilm\\nBehance: http://bit.ly/Yhsthe\\nFollow me on twitter: @thispeterlewis\\nListen to the original score here: https://soundcloud.com/peterlewismusic/the-camera-original-score-1\\n\\nAside from a few unfinished running-around-in-the-woods-with-guns experiments from my early teens, this is my first film. I made it because I love all the different aspects of filmmaking, because I was tired of my fear of failure, and because I wanted to see what would happen if I just finished one. Maybe this will lead to bigger and better films; maybe not. Either way I learned something. \\n\\nThe story was largely born from its constraints. It had to be doable in my free time, and I had to be able to shoot it during my vacation in Nags Head, NC\u2014with a budget of only $50, to cover the props (I\'d previously owned the Canon T2i, lenses, and Logic Pro, and used the free 30-day trial of FCPX). I wanted it to be a simple story with a mysterious twist or two.\\n\\nI got lots of advice from fellow filmmakers\u2014Andrew, Mitchell, Kyle, Brian, Shepherd, Drew, David, and others. If you like the film, thank you Andrew, Mitchell, Kyle, Brian, Shepherd, Drew, and David. If you thought it was rubbish, they only tried to make it better than it was. And thanks again to Abbie and Gabe, without whose talents I couldn\'t have made it. \\n\\nSome have asked about Emily; the film wasn\'t written about her (she passed away while it was in post-production), but she was a dear friend of my family and many others, and it was an honor to dedicate it to her memory. \\n\\nMany of you know far more about filmmaking than I do, so please feel free to offer any critique.\\n\\nThe Lights Film School blog interviewed me about the making of the film and overcoming fear of failure: http://www.lightsfilmschool.com/blog/short-film-canon-t2i-low-budget/1780/\\n\\n\\nFILM FESTIVALS\\n- HollyShorts\\n- DC Shorts\\n- Beloit International Film Festival\\n- Fire Reel Film Festival\\n- Blue Lab Creative Industries Symposium\\n- Juggernaut Film Festival\\n- Shortcutz International Short Film Exhibition\\n- Rochester Museum of Fine Arts Short Film Series\\n- Filmbooth International Short Film Screening (Gurgaon, India)\\n- Surrey International Film Festival\\n- Winner, Best of Fest, Fandana Film Festival\\n- Festival du Film de Vacances\\n- Low Country Indie Shorts\\n- Choice Cuts (London)\\n- Write.Shoot.Cut\\n- MudasFest\\n- Shortlisted for the Forster Film Festival\\n- ClujShorts International Short Film Festival\\n- Love Fest\\n\\n\\nFEATURED\\n- PBS Digital Studios Top 5 No Budget Short Films\\n- Short of the Week\\n- planet5D\\n- Digital Convergence podcast (http://tinyurl.com/l3a5jxml)\\n- PetaPixel\\n- Impossible Project\\n- FSTOPPERS \\n- Film School Rejects\\n- Directors Notes\\n- Making the Movie\\n- Charlotte Viewpoint\\n- The Veda House\\n- Movie Playoffs Favorite Shorts\\n- New American Storytellers Screening Room\\n- WriteShootCut\\n- Independent Filmmakers Channel\\n- 01SHORTFILM Channel\\n-\xa0200+ additional blogs\\n\\nAlso used in Basic Cinematography and Reflexive Film classes at universities including Syracuse.\\n\\n------------------------\\n\\nDirector / DP / Editor / Composer / Colorist / Sound Designer / Foley: PETER LEWIS\\nGirl: ABBIE LEWIS\\nBoy: GABE LEWIS\\n\\n------------------------\\n\\nCamera: Canon Rebel EOS 550D T2i\\nLenses: Canon 50mm 1.4, Tamron 28-200mm\\nEditing / Color Grading: Final Cut Pro X\\nSound Design / Foley / Original Score: Logic Pro 9\\nPolaroid film: The Impossible Project","created_time":"2011-11-25T06:11:48+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/221227664_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/221227664_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/221227664_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/221227664_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/221227664_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/221227664_100x75.jpg"}],"user":{"uri":"/users/2923600","name":"Peter Lewis"}},{"uri":"/videos/7563705","name":"The Laundromat | Short Film","description":"cast ELIZA TAYLOR and TIM ROSS\\nwriter director TIMOTHY MELVILLE\\nproducer DOMINIC ALLEN\\ncinematographer JOEL BETTS\\nproduction company SCARAB STUDIO FILMS. 2009\\n\\nDownload the script here, http://tinyurl.com/kezzws4\\nView the Spanish dub here, http://youtu.be/eYTJdv0JMhw\\n\\nOfficial Selection Flickerfest 2010\\nOfficial Selection St Kilda Film Festival 2010\\nOfficial Selection Dungog Film Festival 2010\\nWinner Best Film Hillside Film Festival 2010\\nWinner Best Film Bohemian Shorts 2010\\nWinner Best Film Bayside Film Festival 2010\\nWinner Best New Filmmaker Shepparton Shorts 2010\\nWinner Best Script In The Bin Short Film Festival 2010\\nFinalist Aesthetica Short Film Competition 2010 (UK)\\nOfficial Selection Bodega Bay Film Festival 2011 (USA)\\nOfficial Selection Southern Screen Film Festival 2011 (USA)\\n\\nThe Laundromat is distributed by Flickerfest\\n\\nhttp://timothymelville.com","created_time":"2009-11-12T01:28:03+00:00","pictures":[{"type":"thumbnail","width":1280,"height":640,"link":"https://i.vimeocdn.com/video/133977185_1280.jpg"},{"type":"thumbnail","width":960,"height":480,"link":"https://i.vimeocdn.com/video/133977185_960.jpg"},{"type":"thumbnail","width":640,"height":320,"link":"https://i.vimeocdn.com/video/133977185_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/133977185_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/133977185_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/133977185_100x75.jpg"}],"user":{"uri":"/users/2621541","name":"Timothy Melville"}},{"uri":"/videos/44185686","name":"Suckablood - short fairytale horror","description":"Watch more horror at http://www.bloodycuts.co.uk\\n\\nA stylish gothic bedtime story, which tells the tale of a girl scared to suck her thumb - lest the monstrous Suckablood should come! \\n\\nPart 5 in the Bloody Cuts 13 part horror anthology, watch the rest at: http://www.bloodycuts.co.uk/films\\n\\nSee how the film was made here: https://vimeo.com/46298273\\nVFX breakdown of opening shot here: https://vimeo.com/54027484\\n\\n\\nAchievements\\n--------------------\\n**Selected as a STAFF PICK on Vimeo on 23rd July 2012**\\n**Winner of FilmSkillet.com International Film Competition 2012 in the Horror Category**\\n**Winner of the Peer Raben Award for \\"Best Music in a Film\\" for composer Enrica Sciandrone**\\n**Winner \'The Golden Haggis\' & \'Audience Award\' - Bootleg Film Festival 2012**\\n**Selected for Screamfest LA Film Festival 2012**\\n**Selected as a Celtx Seed, October 2012**\\n**Shortlisted in the G-Tech Driven Creativity Competition 2012: http://www.g-technology.eu/competition/comp_entries/film/suckablood**\\n**Over 150,000 views with YouTube**\\n\\nBloody Cuts bring their brand of UK horror to new levels with a period film shot on location in a stately home and featuring the special make-up artistry of Millennium FX.\\n\\nFollow us: @bloodycutsfilms\\nLIKE us: http://www.facebook.com/bloodycuts\\n\\n\\nStarring: \\nHolly Jacobson\\nSam Metcalf\\nRobin Berry\\n\\nDirected by: Ben Tillett & Jake Cuddihy\\nProducer: Ben Franklin\\nDoP: Jonny Franklin\\nCamera: Ben Kent\\nAsst.Camera: Peter Ford\\nCostume: Charlotte Barrett\\nMakeup: Christabel Franklin\\nSFX Makeup: Millennium FX, Karen Spencer, Neill Gorton, Rob Mayor\\nVFX: Alexander Purcell, Ben Tillett\\nArt Director: Christopher Goodman\\nProps: Natalie Barrett\\n1st AD: Neill Gorton\\n2nd AD: Ben Franklin\\n3rd AD: Rory Harper\\nDIT: Andrew Martin\\nLocation Manager: Freddie Smith\\nMusic: Enrica Sciandrone - www.enricasciandrone.com\\nSound Mix: Phil Lee (Eel Audio)\\nEditor: Ben Tillett\\nColorist: Ben Franklin\\n\\nShot on Red Epic at 5k, edited and VFX completed in CS5.5, graded in DaVinci Resolve 8.","created_time":"2012-06-17T09:58:26+00:00","pictures":[{"type":"thumbnail","width":1280,"height":544,"link":"https://i.vimeocdn.com/video/312252904_1280.jpg"},{"type":"thumbnail","width":960,"height":408,"link":"https://i.vimeocdn.com/video/312252904_960.jpg"},{"type":"thumbnail","width":640,"height":272,"link":"https://i.vimeocdn.com/video/312252904_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/312252904_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/312252904_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/312252904_100x75.jpg"}],"user":{"uri":"/users/8441547","name":"BLOODY CUTS"}},{"uri":"/videos/109873939","name":"PLUG - SHORT FILM","description":"Winner Best Short Film, Winner Best Cinematography, at the Glendale International Film Festival, Los Angeles.\\nWinner Best of Festival at the Droid and Dragons Festival, Toronto Canada.\\nWinner Best Script, Script Pipeline, Los Angeles. \\n\\nDirectorial debut from internationally renowned designer and concept artist, David Levy (Tron legacy, Prometheus, Ender\'s Game, Tomorrowland, Avatar2). The short film is the first 15 minutes of a science fiction TV series Levy has outlined and hopes to film. Unlike the highly VFX-ed science fiction films inundating audiences today, PLUG is a return to 1970\'s classics like Star Wars and Mad Max with a gritty universe made from mostly live props and real life settings. Enjoy and share!\\n\\n\\"On a post-apocalyptic Earth, Leila Dawn (Natalie Floyd), is the only human survivor. Raised by Robots after humanity abandoned the planet they destroyed with nuclear warfare, Leila cannot forget her parents nor ignore her yearning to find other organic life. A hunt she sets out on with a Military Unit, Marker (Lex Cassar), leads Leila to discover the reality she\u2019s been denied\u2014a reality that sparks her ultimate quest.\\"\\n\\nIf you liked, please share and donate using the tip jar button top right!\\n\\n#plugmovie\\nwww.vyle-art.com/plug\\nIndependent science-fiction short film.\\n\\nview the making of!\\nhttps://vimeo.com/109876006\\n\\nView the sound design and music making of!\\nhttps://vimeo.com/112405509\\n\\nShot with one 7D and one 5D\\nEdited and composited using adobe creative suite\\n3D using 3ds MAX","created_time":"2014-10-23T23:26:10+00:00","pictures":[{"type":"thumbnail","width":1280,"height":544,"link":"https://i.vimeocdn.com/video/494544538_1280.jpg"},{"type":"thumbnail","width":960,"height":408,"link":"https://i.vimeocdn.com/video/494544538_960.jpg"},{"type":"thumbnail","width":640,"height":272,"link":"https://i.vimeocdn.com/video/494544538_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/494544538_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/494544538_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/494544538_100x75.jpg"}],"user":{"uri":"/users/2585618","name":"vyle-art"}},{"uri":"/videos/7785880","name":"Gone Goodbye - A short film","description":"FIRST PLACE WINNER OF THE FILM RACING GRAND PRIX 2009\\nhttp://www.filmracing.com/Films/competitions/grandprix2009.htm\\n\\nBEST DIRECTIONS: Keith Rivers\\nBEST WRITING: Tyler Wilson\\nBEST CINEMATOGRAPHY: Clyde Garrido\\nBEST MUSICAL SCORE: Sam Nuttmann\\n\\nYEAR: 2009\\nSYNOPSIS: This short film explores relationships and privacy in unusual and surprising ways\\nGOAL: Create a highly stylistic short film in under 100 hours to enter into the Film Racing Grand Prix 2009 100 hour film race contest\\n\\nCAST\\nMan / Voice Over Actor 2: Doug Vogel\\nVoice Over Actor 1: Cody Lewis\\n\\nPRODUCTION CREW\\nWriter: Tyler Wilson\\nProducer: Sam Nuttmann\\nDirector: Keith Rivers\\nDirector of photography: Clyde Garrido\\nAerial director of photography: Tabb Firchau\\nAssistant camera: Ryan Reese \\nArt director: Craig Smiley\\nProduction assistant: Neil Mooney \\nProduction stills: Keith Bolling\\nBehind-the-scenes camera: Ryan Reese \\nEditor: Keith Rivers \\nMotion graphics: Sam Nuttmann\\nTitles: Craig Smiley\\nSound design: Keith Rivers \\nMusic composition: Sam Nuttmann\\n\\nKeith Rivers Films, LLC\\n\\nMORE INFO\\nhttp://www.krivers.com\\nhttp://www.session7media.com","created_time":"2009-11-24T00:41:26+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/72496304_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/72496304_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/72496304_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/72496304_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/72496304_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/72496304_100x75.jpg"}],"user":{"uri":"/users/2162750","name":"Session 7 Media"}},{"uri":"/videos/110421448","name":"SAUSAGE - animated short film","description":"This is SAUSAGE, the multi award winning and Oscar long-listed animated short film. http://sausagefilm.net\\n\\nAwards:\\nGrand Jury Prize\' - Amsterdam Film Fest\\n\'Best Animation\' - Mexico International Film Fest\\n\'Best Animation\' - Foyle Film Fest\\n\'Best Animation\' - NYC Indie Film Fest\\n\'Best Animation\' - The UK Film Fest\\n\'Best Short\' - Food Film Festival (Croatia)\\n\'Best Short\' - PROMAX UK Shorts \\n\'Best Short\' (runner up) - Food Film Festival (Holland)    \\nStaff Pick - Vimeo \\nPick Of The Day - Short of the Week\\nPick Of The Day - Cartoon Brew\\n\\nBlog charting whole journey: http://sausagefilm.tumblr.com \\nFollow on twitter: https://twitter.com/robert_grieves\\nFacebook for updates: http://facebook.com/sausagefilm  \\n\\nSynopsis: This retro animation introduces us to two artisan stallholders who\'s idyllic world is invaded by a devious fast-food vendor. The ferocious turf war that follows provokes life changing events that result in one deliciously sourcey discovery! \\n\\nCredits:\\nStory, Animation and Design: Robert Grieves\\nMusic Composition: Dan Radclyffe\\nMentor for Story and Animation: Simon Williams\xa0\\nSound Design & Mix: Leaf Troup\\nAdditional Music: Mario Bordbar and Paul Worsley\\nInitial story advice: Steve Moles and Peter Morfoot\xa0\\nSpecial thanks to: Hackett Films, Blink Films and London Metropolitan University","created_time":"2014-10-29T23:32:47+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/577488429_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/577488429_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/577488429_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/577488429_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/577488429_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/577488429_100x75.jpg"}],"user":{"uri":"/users/2311778","name":"bert grieves"}},{"uri":"/videos/53532069","name":"In The Pines (Short Film)","description":"A young woman, convinced she has experienced an encounter with the extraterrestrial, becomes fixated on re-establishing contact in this striking study of the paranormal and the human psyche.\\n\\nWritten & Directed by: Zeek Earl & Chris Caldwell\\nStarring: Jessica Martin & Julianne Christie\\nOriginal Score by: Daniel L.K. Caldwell\\nManager: Scott Glassgold / IAM Entertainment\\n\\nhttp://shepfilms.com/inthepines.html\\n\\nOfficial Selection:\\nSXSW 2012\\nPalm Springs International Shortfest 2012\\nAtlantic Film Festival 2012\\nHollyshorts 2012\\nTacoma Film Festival 2012\\nSeattle Shorts Film Festival 2012\\n\\nBest Science Fiction Short:\\nEugene International Film Festival 2012\\n\\nA SHEP Films Production:\\nhttp://www.shepfilms.com/\\nhttps://www.facebook.com/shepfilms\\n\\nLearn more about our next project at:\\nhttp://www.kickstarter.com/projects/zeekearl/prospect-a-handmade-sci-fi-short","created_time":"2012-11-14T18:43:06+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/370124687_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/370124687_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/370124687_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/370124687_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/370124687_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/370124687_100x75.jpg"}],"user":{"uri":"/users/915517","name":"Shep Films"}},{"uri":"/videos/88996790","name":"Chaser (Gay Short Film) (NSFW)","description":"Alienated from his conservative Jewish family and community, a promising, young, gay schoolteacher seeks solace in New York\'s barebacking scene. \\n\\nStarring Max Rhyser, Ismael Cruz Codova, and Rachel Claire\\n\\nOfficial Selection: Palm Springs International ShortFest, Brooklyn Film Festival, Provincetown International Film Festival\\n\\nINTERVIEW MAGAZINE: \\"A resolutely humanistic approach that leaves an impression not easily forgotten.\\"\\n\\nWILLIAMSBURG GREENPOINT NEWS: \\"The best of what short films should be; thought-provoking, eye-opening and reflective of the community we live in.\\"","created_time":"2014-03-13T13:46:07+00:00","pictures":[{"type":"thumbnail","width":1280,"height":544,"link":"https://i.vimeocdn.com/video/467593725_1280.jpg"},{"type":"thumbnail","width":960,"height":408,"link":"https://i.vimeocdn.com/video/467593725_960.jpg"},{"type":"thumbnail","width":640,"height":272,"link":"https://i.vimeocdn.com/video/467593725_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/467593725_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/467593725_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/467593725_100x75.jpg"}],"user":{"uri":"/users/4920757","name":"Sal Bardo"}},{"uri":"/videos/137781541","name":"BLOOD PULLS A GUN // Short Film","description":"www.bloodpullsagun.com // www.benbriand.com\\nFollow on instagram : https://instagram.com/bloodpullsagun_film\\n\\nA teenage girl gets a keyhole look into a dangerous and mysterious world when a tattooed stranger checks into her roadside motel.\\n\\nWORLD PREMIERE : SXSW MARCH 2014 - IN COMPETITION\\nNATIONAL PREMIERE : MELBOURNE INTERNATIONAL FILM FESTIVAL 2014\\nWINNER : BEST EMERGING FILM MAKER AT MELBOURNE INTERNATIONAL FILM FESTIVAL 2014\\nEUROPEAN PREMIERE : BFI LONDON FILM FESTIVAL 2014\\nAUSTRALIAN DIRECTORS GUILD : BEST DIRECTOR NOMINATION\\nWINNER : GOLD ACS AWARD (Australian Cinematographers Society) 2014\\n\\nA MOONWALK FILMS / PRODIGY FILMS / LOVE LIKE FILMS PRODUCTION\\nCast ODESSA YOUNG / JOSH McCONVILLE / TESS HAUBRICH / GARY WADDELL\\nDirector - BEN BRIAND\\nWriter - KEVIN W. KOEHLER\\nProducers - MATT DOOLEY SERENA PAULL & DAVID GROSS \\nCinematographer - JEREMY ROUSE\\nProduction Design - ALICE BABIDGE & SIMON ELSLEY\\nWardrobe Design - ALICE BABIDGE\\nEditor - LUKE DOOLAN \\nMusic - BASIL HOGIOS & JACK MOFFITT\\nCasting -  LUCKY GORKA McGREGOR CASTING","created_time":"2015-08-30T22:46:39+00:00","pictures":[{"type":"thumbnail","width":1280,"height":720,"link":"https://i.vimeocdn.com/video/532849786_1280.jpg"},{"type":"thumbnail","width":960,"height":540,"link":"https://i.vimeocdn.com/video/532849786_960.jpg"},{"type":"thumbnail","width":640,"height":360,"link":"https://i.vimeocdn.com/video/532849786_640.jpg"},{"type":"thumbnail","width":295,"height":166,"link":"https://i.vimeocdn.com/video/532849786_295x166.jpg"},{"type":"thumbnail","width":200,"height":150,"link":"https://i.vimeocdn.com/video/532849786_200x150.jpg"},{"type":"thumbnail","width":100,"height":75,"link":"https://i.vimeocdn.com/video/532849786_100x75.jpg"}],"user":{"uri":"/users/1711999","name":"Ben Briand"}}]}');

},{}]},["iZCu1"], "iZCu1", "parcelRequire94c2")

