'use strict';

var width = 800;
var height = 400;
var fontName = 'CommonComicW00Bold';
var arrowCursor = 'url(/images/cursors/arrow.cur), default';
var pointerCursor = 'url(/images/cursors/pointer.cur), pointer';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  render: {
    mipmapFilter: 'LINEAR', // 'NEAREST', 'LINEAR', 'NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR'
    pixelArt: false,
    transparent: true,
    powerPreference: 'default' // 'high-performance', 'low-power' or 'default'
  },
  disableContextMenu: true,
  parent: 'game',
  audio: {
    disableWebAudio: false
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, PreloadScene, WorldScene, GiftScene, DialogScene, RoomScene, GameTitlesScene, RateScene],
  plugins: {
    global: [{ key: 'GiftPlugin', plugin: GiftPlugin, start: true }],
    scene: [{ key: 'rexmovetoplugin', plugin: rexmovetoplugin, mapping: 'rexmovetoplugin' }, { key: 'rexuiplugin', plugin: rexuiplugin, mapping: 'rexUI' }, { key: 'rexshakepositionplugin', plugin: rexshakepositionplugin, mapping: 'rexshakepositionplugin' }]
  }
};

var Data = {},
    currentLevel,
    game,
    IS_BROWSER_EXTENSION = true,
    EXTENSION_ID = 'felflkndljbjehhgadcfmijcoamhhngl';
if (IS_BROWSER_EXTENSION == false) {
  chrome.runtime.sendMessage(EXTENSION_ID, { action: 'get' }, function (response) {
    if (response) {
      Data = response.settings;
      window.localStorage.setItem('settings', JSON.stringify(Data));
    } else {
      var data = window.localStorage.getItem('settings');
      if (data) {
        Data = JSON.parse(data);
      } else {
        window.localStorage.setItem('settings', JSON.stringify(conf));
        Data = conf;
      }
    }
    currentLevel = Data.levels.find(function (obj) {
      return obj.level_id == Data.level;
    });
    game = new Phaser.Game(config);
    game.plugins.install('rexmovetoplugin', rexmovetoplugin);
    game.plugins.install('rexuiplugin', rexuiplugin);
    game.plugins.install('rexshakepositionplugin', rexshakepositionplugin);
  });
}

if (IS_BROWSER_EXTENSION == true) {
  chrome.storage.local.get(function (data) {
    Data = data.settings;
    currentLevel = Data.levels.find(function (obj) {
      return obj.level_id == Data.level;
    });
    game = new Phaser.Game(config);
    game.plugins.install('rexmovetoplugin', rexmovetoplugin);
    game.plugins.install('rexuiplugin', rexuiplugin);
    game.plugins.install('rexshakepositionplugin', rexshakepositionplugin);
  });
}
//# sourceMappingURL=game.js.map
