'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Achives = function () {
  function Achives(scene) {
    _classCallCheck(this, Achives);

    this.achives = [];
    this.achives.push({});
    for (var i = 1; i <= 10; i++) {
      var ach = scene.add.image(0, 0, '').setVisible(false).setDepth(4);
      ach.setInteractive({ cursor: arrowCursor });
      this.achives.push(ach);
    }
  }

  _createClass(Achives, [{
    key: 'destroy',
    value: function destroy() {
      this.achives = [];
      this.achives.push({});
    }
  }]);

  return Achives;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balance = function Balance(scene) {
  var _this = this;

  _classCallCheck(this, Balance);

  this.render = function () {
    _this.balance = scene.add.group();
    _this.scoreText = scene.add.text(400, 10, Data.money, {
      align: 'right'
    });
    _this.scoreText.setFontSize(16).setFontFamily('CommonComicW00Bold').setColor('#E9EFF4');

    _this.balance_left = scene.add.image(1, 20, 'balance_left');
    _this.balance_right = scene.add.image(1, 20, 'balance_right');
    _this.middle = scene.add.tileSprite(0, 20, 0, 47, 'balance_middle');

    _this.scoreText.setDepth(102);
    _this.balance_right.setDepth(101);
    _this.balance_left.setDepth(101);
    _this.middle.setDepth(101);

    _this.balance.add(_this.scoreText).add(_this.balance_left).add(_this.balance_right);

    _this.updataBalance();
    return _this.balance;
  };

  this.updataBalance = function () {
    this.scoreText.setText(abbreviate(Data.money).toUpperCase());

    this.scoreText.setX(400 - this.scoreText.displayWidth / 2);

    this.middle.setX(400);
    this.middle.width = this.scoreText.displayWidth;

    this.balance_left.setX(400 - this.scoreText.width / 2 - this.balance_left.width / 2);
    this.balance_right.setX(400 + this.scoreText.width / 2 + this.balance_right.width / 2);
  };
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card(scene) {
  var _this = this;

  _classCallCheck(this, Card);

  this.data = {};
  this.price = null;
  this.render = function (x, y, sprite) {
    if (_this.data.isPurchaced == false) {
      sprite = 'btn';
    } else {
      sprite = _this.data.button.image.slug;
    }
    var card = scene.add.group();

    _this.image = scene.add.image(x, y, sprite).setData(_this.data).setInteractive({ cursor: pointerCursor }).on('pointerover', _this.pointerover).on('pointerout', _this.pointerout).setDepth(110);

    _this.currency = scene.add.image(x - 18, y + 28, 'currency').setDepth(111).setScale(0.8);

    _this.price = scene.add.text(x - 10, y + 21, '').setText(abbreviate(_this.data.price).toUpperCase()).setFontFamily('CommonComicW00Bold').setFontStyle('bold').setColor('#E9EFF4').setFontSize(9).setDepth(112);

    _this.price.setX(_this.image.x - _this.price.width / 2 + _this.currency.width / 2);
    _this.currency.setX(_this.price.x - _this.currency.width / 2);

    _this.quantity = scene.add.image(_this.image.x + _this.image.width / 2 - 6, _this.image.y - _this.image.height / 2 + 6, 'quantity');
    _this.quantity.setDepth(112);

    _this.number = scene.add.text(_this.quantity.x - _this.quantity.displayOriginX + 4, _this.quantity.y - _this.quantity.displayOriginY + 2);
    _this.number.setText(_this.data.count).setFontFamily('CommonComicW00Bold').setColor('#E9EFF4').setFontSize(8).setDepth(113);

    if (_this.data.id == 7 || _this.data.count == 0) {
      _this.number.setVisible(false);
      _this.quantity.setVisible(false);
    }

    card.add(_this.currency);
    card.add(_this.price);
    card.add(_this.image);
    return card;
  };

  this.setVisible = function (status) {
    this.price.setVisible(status);
    this.image.setVisible(status);
    this.currency.setVisible(status);
    this.quantity.setVisible(status);
    this.number.setVisible(status);
  };

  this.changePositionPrice = function () {
    this.price.setX(this.image.x - this.price.width / 2 + this.currency.width / 2);
    this.currency.setX(this.price.x - this.currency.width / 2);
  };

  this.setData = function (data) {
    _this.data = data;
  };

  this.pointerover = function () {
    if (this.getData('price') <= Data.money || this.getData('isPurchaced') == true) scene.hint.show(this);
    if (this.getData('isPurchaced') == false) {
      this.setTexture('btn_hover');
    } else {
      this.setAlpha(0.9);
    }
  };

  this.pointerout = function () {
    scene.hint.hide(this);
    if (this.getData('isPurchaced') == false) {
      this.setTexture('btn');
    } else {
      this.setAlpha(1);
    }
  };
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardLevel = function () {
  function CardLevel(scene) {
    var _this = this;

    _classCallCheck(this, CardLevel);

    this.data = {};
    this.setData = function (data) {
      _this.data = data;
    };
    this.render = function (x, y, sprite) {
      if (_this.data.isPurchaced == false) {
        sprite = 'btn';
      } else {
        sprite = _this.data.button.image.slug;
      }

      _this.image = scene.add.image(x, y, sprite).setData(_this.data).setInteractive({ cursor: pointerCursor }).on('pointerover', _this.pointerover).on('pointerout', _this.pointerout).setDepth(110);

      _this.price = scene.add.text(_this.image.x, _this.image.y + 21);
      _this.price.setFontFamily('CommonComicW00Bold')
      if (_this.data.isPurchaced) {
        _this.price.setText(chrome.i18n.getMessage("level", _this.data.level_id.toString()).toUpperCase()).setFontFamily('CommonComicW00Bold').setFontStyle('bold');

      }

      _this.price.setText(abbreviate(_this.data.price).toUpperCase()).setFontFamily('CommonComicW00Bold').setColor('#E9EFF4').setFontSize(9).setDepth(112);
      if (_this.data.isPurchaced == true) {
        _this.price.setText(chrome.i18n.getMessage("level", _this.data.level_id.toString()).toUpperCase()).setFontFamily('CommonComicW00Bold');
      }
      _this.price.setX(_this.image.x - _this.price.width / 2);

      var card = scene.add.group();
      card.add(_this.image).add(_this.price);

      return card;
    };
    this.pointerover = function (e) {
      if (this.getData('isPurchaced') == false) {
        this.setTexture('btn_hover');
        if (this.getData('level_id') - currentLevel.level_id == 1 && Data.money >= this.getData('price')) {
          scene.hint.show(this);
        }
      } else {
        scene.hint.show(this);
      }
    };

    this.pointerout = function () {
      scene.hint.hide();
      if (this.getData('isPurchaced') == false) {
        this.setTexture('btn');
      }
    };

    this.changePriceText = function () {
      this.price.setText(chrome.i18n.getMessage("level", this.data.level_id.toString() ).toUpperCase()).setFontFamily('CommonComicW00Bold');
      this.price.setText(chrome.i18n.getMessage("level", this.data.level_id.toString() ).toUpperCase()).setFontFamily('CommonComicW00Bold');
      this.price.setX(this.image.x - this.price.width / 2);
    };

    this.setVisible = function (status) {
      this.image.setVisible(status);
      this.price.setVisible(status);
    };
  }

  _createClass(CardLevel, [{
    key: 'destroy',
    value: function destroy() {
      this.data = {};
    }
  }]);

  return CardLevel;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hint = function Hint(scene) {
  _classCallCheck(this, Hint);

  this.shint = scene.add.group({ name: 'hind_s' });
  this.shintText = scene.add.text(9, 3, '', {
    align: 'center',
    color: '#1e2335',
    fontSize: 10
  }).setFontFamily("CommonComicW00Regular");

  this.shintTextName = scene.add.text(9, 20, '', {
    align: 'center',
    color: '#1e2335',
    fontSize: 10
  }).setFontFamily('CommonComicW00Bold');

  this.shintTextBottom = scene.add.text(9, 20, '', {
    align: 'center',
    color: '#1e2335',
    fontSize: 10
  }).setFontFamily('CommonComicW00Bold');

  this.dl = scene.add.image(0, 0, 'hint_down_left').setDepth(1005);
  this.dr = scene.add.image(0, 0, 'hint_down_right').setDepth(1005);
  this.dm = scene.add.tileSprite(400, 200, 100, this.dl.height, 'hint_up_middle').setDepth(1005);

  this.shint.add(this.dl);
  this.shint.add(this.dm);
  this.shint.add(this.dr);

  this.dl.setX(this.dm.x - this.dm.width / 2 - this.dl.width / 2).setY(this.dm.y);
  this.dr.setX(this.dm.x + this.dm.width / 2 + this.dr.width / 2).setY(this.dm.y);

  this.shint.add(this.shintText);
  this.shint.add(this.shintTextName);
  this.shint.add(this.shintTextBottom);

  this.shintText.setAlign('center').setPadding(10, 10, 10, 5);
  this.shintTextName.setAlign('center').setPadding(20, 10, 20, 5);
  this.shintTextBottom.setAlign('center').setPadding(10, 10, 10, 5);

  this.shint.setDepth(1005).setVisible(false);
  this.shintText.setDepth(5000);
  this.shintTextName.setDepth(5000);
  this.shintTextBottom.setDepth(5000);

  this.show = function (data) {
    var text = '';
    if (data.getData('level_id')) {
      text = data.getData('description');
      let levelID = data.getData('level_id');
      this.shintTextBottom.setText(chrome.i18n.getMessage("required_to_unlock_level",  (levelID+1).toString() ).toUpperCase()).setFontStyle('bold');
    } else {
      text = data.getData('description');
      if (data.getData('id') != 1) {
        this.shintTextBottom.setText(chrome.i18n.getMessage("will_increase_your_passive_income_to", abbreviate(data.getData('money') * (data.getData('count') + 1))).toUpperCase()).setFontStyle('bold');
      } else {
        this.shintTextBottom.setText(chrome.i18n.getMessage("will_increase_your_click_income_to" , abbreviate(getMoneyClick(data.getData('count') + 1))).toUpperCase()).setFontStyle('bold');
      }

      if (data.getData('count') == data.getData('maxCount')) {
        this.shintTextBottom.setText(chrome.i18n.getMessage("the_maximum_number_of_achievements_purchased").toUpperCase()).setFontStyle('bold');
      }
    }

    this.shintTextName.setText(data.getData('name').toUpperCase()).setFontStyle('bold');
    this.shintText.setText(text.toUpperCase()).setFontStyle('bold');

    if (this.shintText.displayWidth > this.shintTextName.displayWidth) {
      this.dm.width = this.shintText.displayWidth;
    } else {
      this.dm.width = this.shintTextName.displayWidth;
    }
    if (this.shintTextBottom.displayWidth > this.dm.width) {
      this.dm.width = this.shintTextBottom.displayWidth;
    }

    var widthTextBlock = this.dm.width;
    this.shint.setVisible(true);
    var x = data.x + data.displayWidth / 2 + (widthTextBlock + this.dl.width + this.dr.width) / 2;
    if (data.x > 400) {
      x = data.x - data.displayWidth / 2 - (widthTextBlock + this.dl.width + this.dr.width) / 2;
      this.getRightHint(data);
      x = x - 8;
    } else {
      x = x + 8;
      this.getLeftHint(data);
    }
    var y = data.y;
    if (y < 100) {
      if (data.x < 400) {
        this.dl.setTexture('hint_up_left');
      } else {
        this.dl.setTexture('hint_up_right');
        this.dr.setTexture('hint_up_left');
      }
      y = y + 115;
    } else {
      this.dr.flipY = false;
    }

    this.shint.setX(x).setY(y - 60);
    this.shintText.setX(this.dm.x - this.shintText.width / 2).setY(y - 97);
    this.shintTextName.setX(this.shintTextName.x + this.shintTextName.displayWidth / 2 - this.shintTextName.width).setY(y - 113);
    this.shintTextBottom.setX(this.shintTextBottom.x + this.shintTextBottom.displayWidth / 2 - this.shintTextBottom.width).setY(y - 70);

    this.dl.x = this.dm.x - widthTextBlock / 2 - this.dl.width / 2;
    this.dr.x = this.dm.x + widthTextBlock / 2 + this.dr.width / 2;
  };

  this.hide = function () {
    this.shint.setVisible(false);
  };

  this.getRightHint = function (data) {
    this.dr.setTexture('hint_down_left');
    this.dl.setTexture('hint_up_right');
    this.dl.flipX = true;
    this.dr.flipX = true;
  };

  this.getLeftHint = function (data) {
    this.dr.setTexture('hint_down_right');
    this.dl.setTexture('hint_down_left');
    this.dr.flipX = false;
    this.dl.flipX = false;
  };
  return this;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(scene) {
    var _this = this;

    _classCallCheck(this, Player);

    this.player = scene.add.sprite(currentLevel.player.position.x, currentLevel.player.position.y, 'player_' + currentLevel.level_id + '_anims').setDepth(currentLevel.player.depth).setData({ level_id: currentLevel.level_id });
    var frameNames = scene.anims.generateFrameNames('player_' + currentLevel.level_id + '_anims');
    scene.anims.create({
      key: 'player_' + currentLevel.level_id + '_play',
      frames: frameNames,
      duration: currentLevel.player.duration,
      repeat: 0
    });

    this.player.setX(currentLevel.player.position.x).setY(currentLevel.player.position.y).setDepth(currentLevel.player.depth).play().setData({ level_id: currentLevel.level_id });

    this.background = [];
    currentLevel.backgrounds.forEach(function (el) {
      if (el.type && el.type == 'animation') {
        var x = scene.add.sprite(el.position.x, el.position.y, el.key_sprite, el.image).setDepth(9999).play(el.key_animate);
        scene.anims.create({
          key: el.key_animate,
          frames: scene.anims.generateFrameNames(el.slug),
          defaultTextureKey: null,
          delay: 0,
          frameRate: null,
          duration: el.duration,
          skipMissedFrames: true,
          repeat: -1,
          repeatDelay: 0,
          yoyo: false,
          showOnStart: true,
          hideOnComplete: false
        });
        x.play(el.key_animate).setDepth(el.depth);
        _this.background.push(x);
      } else {
        var bg = scene.add.image(el.position.x, el.position.y).setTexture(el.slug).setDepth(el.depth).setInteractive({ cursor: arrowCursor }).on('pointerdown', function () {
          if (currentLevel.level_id == 11) {
            currentLevel = Data.levels.find(function (obj) {
              return obj.level_id == Data.level;
            });
            scene.click = true;
            this.player.setVisible(true);
            scene.scene.setVisible(true, 'UIScene');
            scene.scene.setActive(true, 'UIScene');
          }
        }, _this);
        _this.background.push(bg);
      }
    });
    this.play = function () {
      try {
        this.player.anims.play('player_' + currentLevel.level_id + '_play');
      } catch (e) {}
    };
  }

  _createClass(Player, [{
    key: 'destroy',
    value: function destroy() {}
  }]);

  return Player;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GiftObject = function (_Phaser$GameObjects$I) {
  _inherits(GiftObject, _Phaser$GameObjects$I);

  function GiftObject(scene, x, y) {
    _classCallCheck(this, GiftObject);

    var _this = _possibleConstructorReturn(this, (GiftObject.__proto__ || Object.getPrototypeOf(GiftObject)).call(this, scene, x, y, 'gift'));

    _this.setTexture('btn_gift').on('pointerover', function () {
      this.setTexture('btn_gift_hover');
    }).on('pointerout', function () {
      this.setTexture('btn_gift');
    }).setDepth(0).setVisible(false).setInteractive({ cursor: pointerCursor });
    return _this;
  }

  return GiftObject;
}(Phaser.GameObjects.Image);

var GiftPlugin = function (_Phaser$Plugins$BaseP) {
  _inherits(GiftPlugin, _Phaser$Plugins$BaseP);

  function GiftPlugin(pluginManager) {
    _classCallCheck(this, GiftPlugin);

    var _this2 = _possibleConstructorReturn(this, (GiftPlugin.__proto__ || Object.getPrototypeOf(GiftPlugin)).call(this, pluginManager));

    pluginManager.registerGameObject('gift', _this2.createCard);
    return _this2;
  }

  _createClass(GiftPlugin, [{
    key: 'createCard',
    value: function createCard(x, y) {
      return this.displayList.add(new GiftObject(this.scene, x, y));
    }
  }]);

  return GiftPlugin;
}(Phaser.Plugins.BasePlugin);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootScene = function (_Phaser$Scene) {
  _inherits(BootScene, _Phaser$Scene);

  function BootScene() {
    _classCallCheck(this, BootScene);

    return _possibleConstructorReturn(this, (BootScene.__proto__ || Object.getPrototypeOf(BootScene)).call(this, { key: 'boot' }));
  }

  _createClass(BootScene, [{
    key: 'preload',
    value: function preload() {
      if (IS_BROWSER_EXTENSION == true) {
        this.load.json('assets', '/images/assets.json');
        this.load.json('assets_gift', '/images/assets_gift.json');
        this.load.image('logo', '/images/icons/torso_outline.png');
      } else {
        /*this.load.json('assets', '/cursor-man-game/images/assets.json');
        this.load.json('assets_gift', '/cursor-man-game/images/assets_gift.json');
        this.load.image('logo', '/cursor-man-game/images/icons/torso_outline.png');*/
        this.load.json('assets', '/images/assets.json');
        this.load.json('assets_gift', '/images/assets_gift.json');
        this.load.image('logo', '/images/icons/torso_outline.png');
      }
    }
  }, {
    key: 'create',
    value: function create() {
      this.scene.start('preload');
    }
  }]);

  return BootScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreloadScene = function (_Phaser$Scene) {
  _inherits(PreloadScene, _Phaser$Scene);

  function PreloadScene() {
    _classCallCheck(this, PreloadScene);

    return _possibleConstructorReturn(this, (PreloadScene.__proto__ || Object.getPrototypeOf(PreloadScene)).call(this, { key: 'preload' }));
  }

  _createClass(PreloadScene, [{
    key: 'preload',
    value: function preload() {

      this.loadAssets(this.cache.json.get('assets'));
      this.logo = this.add.image(this.centerX(), this.centerY(), 'logo').setScale(1);
      this.add.tween({
        targets: this.logo,
        duration: 1000,
        scale: 1.3,
        ease: 'Linear',
        yoyo: true,
        repeat: -1
      });

      this.createProgressbar(this.centerX(), this.centerY() + 200);
    }
  }, {
    key: 'createProgressbar',
    value: function createProgressbar(x, y) {
      // size & position
      var width = 400,
          height = 20,
          xStart = x - width / 2,
          yStart = y - height / 2;

      // border size
      var borderOffset = 2;

      var borderRect = new Phaser.Geom.Rectangle(xStart - borderOffset, yStart - borderOffset, width + borderOffset * 2, height + borderOffset * 2);

      var border = this.add.graphics({
        lineStyle: {
          width: 5,
          color: '0x3c9094'
        }
      });
      border.strokeRectShape(borderRect);

      var progressbar = this.add.graphics();

      /**
       * Updates the progress bar.
       *
       * @param {number} percentage
       */
      var updateProgressbar = function updateProgressbar(percentage) {
        progressbar.clear();
        progressbar.fillStyle('0x3c9094', 1);
        progressbar.fillRect(xStart, yStart, percentage * width, height);
      };

      this.load.on('progress', updateProgressbar);
      this.load.once('complete', function () {
        this.load.off('progress', updateProgressbar);
        this.scene.start('WorldScene', Data);
      }, this);
    }
  }, {
    key: 'loadAssets',
    value: function loadAssets(json) {
      Object.keys(json).forEach(function (group) {
        Object.keys(json[group]).forEach(function (key) {
          var value = json[group][key];

          if (group === 'atlas' || group === 'unityAtlas' || group === 'bitmapFont' || group === 'spritesheet' || group === 'multiatlas') {

            // atlas:ƒ       (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
            // unityAtlas:ƒ  (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
            // bitmapFont ƒ  (key, textureURL,  xmlURL,    textureXhrSettings, xmlXhrSettings)
            // spritesheet:ƒ (key, url,         config,    xhrSettings)
            // multiatlas:ƒ  (key, textureURLs, atlasURLs, textureXhrSettings, atlasXhrSettings)
            this.load[group](key, value[0], value[1]);
          } else if (group === 'audio') {

            // do not add mp3 unless, you bought a license ;)
            // opus, webm and ogg are way better than mp3
            if (value.hasOwnProperty('opus') && this.sys.game.device.audio.opus) {
              this.load[group](key, value['opus']);
            }
            if (value.hasOwnProperty('mp3') && this.sys.game.device.audio.opus) {
              this.load[group](key, value['mp3']);
            } else if (value.hasOwnProperty('webm') && this.sys.game.device.audio.webm) {
              this.load[group](key, value['webm']);
            } else if (value.hasOwnProperty('ogg') && this.sys.game.device.audio.ogg) {
              this.load[group](key, value['ogg']);
            } else if (value.hasOwnProperty('wav') && this.sys.game.device.audio.wav) {
              this.load[group](key, value['wav']);
            }
          } else if (group === 'html') {
            // html:ƒ (key, url, width, height, xhrSettings)
            this.load[group](key, value[0], value[1], value[2]);
          } else {
            // animation:ƒ (key, url, xhrSettings)
            // binary:ƒ (key, url, xhrSettings)
            // glsl:ƒ (key, url, xhrSettings)
            // image:ƒ (key, url, xhrSettings)
            // image:ƒ (key, [url, normal-url], xhrSettings)
            // json:ƒ (key, url, xhrSettings)
            // plugin:ƒ (key, url, xhrSettings)
            // script:ƒ (key, url, xhrSettings)
            // svg:ƒ (key, url, xhrSettings)
            // text:ƒ (key, url, xhrSettings)
            // tilemapCSV:ƒ (key, url, xhrSettings)
            // tilemapTiledJSON:ƒ (key, url, xhrSettings)
            // tilemapWeltmeister:ƒ (key, url, xhrSettings)
            // xml:ƒ (key, url, xhrSettings)
            this.load[group](key, value);
          }
        }, this);
      }, this);
    }
  }, {
    key: 'centerX',
    value: function centerX() {
      return this.sys.game.config.width / 2;
    }
  }, {
    key: 'centerY',
    value: function centerY() {
      return this.sys.game.config.height / 2;
    }
  }]);

  return PreloadScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogScene = function (_Phaser$Scene) {
  _inherits(DialogScene, _Phaser$Scene);

  function DialogScene() {
    _classCallCheck(this, DialogScene);

    return _possibleConstructorReturn(this, (DialogScene.__proto__ || Object.getPrototypeOf(DialogScene)).call(this, { key: 'DialogScene' }));
  }

  _createClass(DialogScene, [{
    key: 'create',
    value: function create() {
      var scene = this;
      this.zone = this.add.zone(400, 200, 800, 400);
      this.dialog = this.add.group();
      this.bg = this.add.image(400, 200, 'bgModal').setDepth(2);
      this.btnYes = this.add.image(400, 200, 'buttonYes').setDepth(3).setScale(0.7).setY(this.bg.y + this.bg.height / 2 - 70).setX(this.bg.x - this.bg.width / 2 + 100).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        this.setTexture('buttonYesHover');
      }).on('pointerout', function () {
        this.setTexture('buttonYes');
      }).on('pointerdown', function () {

        const defValue = {
          version: 0.1,
          click: 1,
          money: 0,
          level: 0,
          player: 0,
          mute: false,
          enable_music: false,
          delayRoom: 5000,
          clicker: {
            index: 1,
            rate: 1,
            player: 1
          },
          info: {
            clicks: 0
          },
          bonuses: [],
          achives: [
            {
              id: 1,
              name: chrome.i18n.getMessage('achives_name_1').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_1', "May the cursor force be with you. \n An invisible energy that gives Cursor-Man his powers.").toUpperCase(),
              count: 0,
              maxCount: 50,
              rate: 1,
              price: 100,
              money: 1,
              ratePrice: 1.5,

              autoClick: false,
              addSum: 0,
              button: {
                position: {x: 700, y: 50},
                image: {slug: 'btnAchive1'}
              },
              isPurchaced: false
            }, {
              id: 2,
              name: chrome.i18n.getMessage('achives_name_2').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_2', 'What do you do with it? Do? Nothing. \n You listen to it. Or you can dance.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 150,
              money: 1,
              ratePrice: 1.2,
              autoClick: true,
              button: {
                position: {x: 764, y: 50},
                image: {slug: 'btnAchive2'}
              },
              isPurchaced: false
            }, {
              id: 3,
              name: chrome.i18n.getMessage('achives_name_3').toUpperCase(),
              description:chrome.i18n.getMessage('achives_desc_3', 'The signal goes on and he shows up. \n That\'s the way it\'s been, that\'s the way it will be.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 774,
              money: 4,
              ratePrice: 1.2,
              autoClick: true,
              button: {
                position: {x: 700, y: 125},
                image: {slug: 'btnAchive3'}
              },
              isPurchaced: false
            }, {
              id: 4,
              name: chrome.i18n.getMessage('achives_name_4').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_4','This shuriken is a roughly cursor-shaped \n trowing weapon for our superhero to fight crime.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 3994,
              money: 13,
              ratePrice: 1.2,
              autoClick: true,
              button: {
                position: {x: 764, y: 125},
                image: {slug: 'btnAchive4'}
              },
              isPurchaced: false
            }, {
              id: 5,
              name: chrome.i18n.getMessage('achives_name_5').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_5','Pointer Dog is a faithful Cursor-Man canine sidekick. \n He\'s a half dog and half pointer.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 20608,
              money: 46,
              ratePrice: 1.2, //
              autoClick: true,
              button: {
                position: {x: 700, y: 200},
                image: {slug: 'btnAchive5'}
              },
              isPurchaced: false
            }, {
              id: 6,
              name: chrome.i18n.getMessage('achives_name_6').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_6','One superhero once said about this shield: \n That thing doesn’t obey the laws of physics at all!').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 106333,
              money: 165,
              ratePrice: 1.2, //
              autoClick: true,
              button: {
                position: {x: 764, y: 200},
                image: {slug: 'btnAchive6'}
              },
              isPurchaced: false
            }, {
              id: 7,
              name: chrome.i18n.getMessage('achives_name_7').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_7','Meme Generator is a wonderful and amazing product,\n but no one knows what\'s it for.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 1,
              price: 548655,
              money: 0,
              ratePrice: 1.2, //
              autoClick: true,
              button: {
                position: {x: 700, y: 275},
                image: {slug: 'btnAchive7'}
              },
              isPurchaced: false
            }, {
              id: 8,
              name: chrome.i18n.getMessage('achives_name_8').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_8','A hero needs a cool car to get to the action, \n why not to borrow from a yellow friend.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 2830939,
              money: 2123,
              ratePrice: 1.2,
              autoClick: true,
              button: {
                position: {x: 764, y: 275},
                image: {slug: 'btnAchive8'}
              },
              isPurchaced: false
            }, {
              id: 9,
              name: chrome.i18n.getMessage('achives_name_9').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_9', 'Cursor Force is good, but why not to use a power-up \n from a device capable of harnessing the power of the Stones.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 14607023,
              money: 7609,
              ratePrice: 1.2, //
              autoClick: true,
              button: {
                position: {x: 700, y: 350},
                image: {slug: 'btnAchive9'}
              },
              isPurchaced: false
            }, {
              id: 10,
              name: chrome.i18n.getMessage('achives_name_10').toUpperCase(),
              description: chrome.i18n.getMessage('achives_desc_10', 'Once you have made all your mistakes \n its time to read how not to do them.').toUpperCase(),
              rate: 1,
              count: 0,
              maxCount: 50,
              price: 75369030,
              money: 26563,
              ratePrice: 1.2, //
              autoClick: true,
              button: {
                position: {x: 764, y: 350},
                image: {slug: 'btnAchive10'}
              },
              isPurchaced: false
            }],
          levels: [{
            level_id: 0,
            name: chrome.i18n.getMessage('level_0_name', 'Start').toUpperCase() ,
            description: chrome.i18n.getMessage('level_0_desc', 'Procrastination').toUpperCase(),
            price: 0,
            index: 2,
            isPurchaced: true,
            rate: 1,
            player: {
              depth: 100,
              slug: 'player_0',
              frameRate: 8,
              duration: 2000, // time
              position: {
                x: 400, y: 210
              }
            },
            achives: [2, 3, 4],
            achives_data: {
              2: {
                id: 2, position: {x: 557, y: 130},
                texture: 'level0achive2',
                name: 'Music Player',
                depth: 11
              },
              3: {
                id: 3, position: {x: 535, y: 90},
                texture: 'level0achive3',
                name: 'Cursor-Signal', depth: 0
              },
              4: {
                id: 4, position: {x: 239, y: 80},
                texture: 'level0achive4', name: 'Shuriken', depth: 11
              }
            },
            backgrounds: [{
              slug: 'lvl0bg0',
              position: {x: 400, y: 200},
              depth: 1
            }]
          }, {
            level_id: 1,
            name: chrome.i18n.getMessage('level_1_name', 'Get Your Face Back').toUpperCase() ,
            description: chrome.i18n.getMessage('level_1_desc', 'Pity that hero mask only covers half of the face.\n Need to wash and shave to look neat.').toUpperCase(),
            price: 1000,
            index: 3,
            isPurchaced: false,
            rate: 2,
            player: {
              depth: 100,
              slug: 'player_1',
              duration: 2000,
              frameRate: 8,
              position: {
                x: 400, y: 210
              }
            },
            achives: [3, 5],
            achives_data: {
              3: {
                id: 3, position: {x: 457, y: 54},
                texture: 'level1achive3',
                image: 'images/lvl_1/3.png',
                name: 'Cursor Signal',
                depth: 0
              },
              5: {
                id: 5, position: {x: 322, y: 263},
                image: 'images/lvl_1/5.png',
                texture: 'level1achive5', name: 'Pointer Dog',
                depth: 11
              }
            },
            backgrounds: [{
              image: 'images/lvl_1/background.png',
              slug: 'lvl1bg0',
              position: {x: 400, y: 200},
              depth: 1
            }, {
              key_sprite: 'washbasin_sprite',
              key_animate: 'washbasin_sprite_anim',
              slug: 'lvl2bg2_frame',
              type: 'animation',
              duration: 2000,
              position: {x: 400, y: 190},
              depth: 22
            }],
            button: {
              position: {x: 40, y: 50},
              image: {slug: 'btn_level_1'},
              depth: 0
            }
          },
            {
              level_id: 2,
              name: chrome.i18n.getMessage('level_2_name', 'Elastic buttocks').toUpperCase() ,
              description: chrome.i18n.getMessage('level_2_desc', 'In order not to look wimp in front of villains \n a hero needs to work out and get those lazy buttocks in shape.').toUpperCase(),
              price: 10000,
              index: 3,
              isPurchaced: false,
              rate: 4,
              player: {
                depth: 100,
                slug: 'player_2',
                position: {x: 400, y: 195},
                duration: 2000
              },
              achives: [3, 4, 6, 2],
              achives_data: {
                2: {
                  id: 2, position: {x: 597, y: 150}, texture: 'level2achive2',
                  name: 'Music Player', depth: 11
                },
                3: {
                  id: 3, position: {x: 564, y: 102}, texture: 'level2achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                4: {
                  id: 4, position: {x: 203, y: 299}, texture: 'level2achive4',
                  name: 'Shuriken', depth: 11
                },
                6: {
                  id: 6, position: {x: 575, y: 224}, texture: 'level2achive6',
                  name: 'Chrome Shield', depth: 12
                }
              },
              backgrounds: [{
                slug: 'lvl2bg0',
                position: {x: 400, y: 200},
                depth: 1
              }],
              button: {
                level_id: 2,
                position: {x: 40 + 65, y: 50},
                image: {slug: 'btn_level_2'},
                depth: 0
              }
            },
            {
              level_id: 3,
              name: chrome.i18n.getMessage('level_3_name', 'Stylish outfit').toUpperCase(),
              description: chrome.i18n.getMessage('level_3_desc', 'It\'s hard to fight crime in undies, need to make \na stylish outfit that could fit a true cursor hero!').toUpperCase(),
              price: 100000,
              index: 4,
              isPurchaced: false,
              rate: 8,
              player: {
                depth: 100,
                slug: 'player_3',
                duration: 2000,
                position: {x: 400, y: 200}

              },
              achives: [2, 3, 6, 9],
              achives_data: {
                2: {
                  id: 2, position: {x: 593, y: 150}, texture: 'level3achive2',
                  name: 'Music Player', depth: 11
                },
                3: {
                  id: 3, position: {x: 564, y: 102}, texture: 'level3achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                6: {
                  id: 6, position: {x: 575, y: 225}, texture: 'level3achive6',
                  name: 'Chrome Shield', depth: 12
                },
                9: {
                  id: 9, position: {x: 254, y: 42}, texture: 'level3achive9',
                  name: 'Infinity Gauntlet', depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl3bg0',
                position: {x: 400, y: 200},
                depth: 1
              }],
              button: {
                level_id: 3,
                position: {x: 40, y: 125},
                image: {slug: 'btn_level_3'},
                depth: 0
              }
            }, {
              level_id: 4,
              name: chrome.i18n.getMessage('level_4_name', 'Big things start small').toUpperCase(),
              description: chrome.i18n.getMessage('level_4_desc', 'Aim High, Start Small and Keep Going. \n Accomplishments will prove to be a journey, not a destination.').toUpperCase(),
              price: 1000000,
              index: 5,
              isPurchaced: false,
              rate: 32,
              player: {
                depth: 99,
                slug: 'player_4',
                duration: 2000,
                position: {
                  x: 395, y: 195
                }
              },
              achives: [3, 4, 5, 6],
              achives_data: {
                3: {
                  id: 3, position: {x: 507, y: 124}, texture: 'level4achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                4: {
                  id: 4, position: {x: 186, y: 216}, texture: 'level4achive4',
                  name: 'Shuriken', depth: 101
                },
                5: {
                  id: 5, position: {x: 562, y: 302}, texture: 'level4achive5',
                  name: 'Pointer Dog', depth: 11
                },
                6: {
                  id: 6, position: {x: 329, y: 370}, texture: 'level4achive6',
                  name: 'Chrome Shield', depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl4bg0',
                position: {x: 400, y: 267},
                depth: 1
              }],
              button: {
                level_id: 4,
                position: {x: 40 + 65, y: 125},
                image: {slug: 'btn_level_4'},
                depth: 0
              }
            },
            {
              level_id: 5,
              name: chrome.i18n.getMessage('level_5_name',  'The First Threat').toUpperCase(),
              description: chrome.i18n.getMessage('level_5_desc', "Finally, a first real threat emerges... \n and it\'s not a lego brick you stepped on.").toUpperCase(),
              price: 10000000,
              index: 6,
              isPurchaced: false,
              rate: 64,
              player: {
                depth: 20,
                duration: 2000,
                slug: 'player_5',
                position: {x: 390, y: 200}
              },
              achives: [3, 5, 6],
              achives_data: {
                3: {
                  id: 3, position: {x: 517, y: 141}, texture: 'level5achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                5: {
                  id: 5, position: {x: 202, y: 294}, texture: 'level5achive5',
                  name: 'Pointer Dog', depth: 22
                },
                6: {
                  id: 6, position: {x: 400, y: 220}, texture: 'level5achive6',
                  name: 'Chrome Shield', depth: 21
                }
              },
              backgrounds: [{
                slug: 'lvl5bg0',
                position: {x: 400, y: 219},
                depth: 1
              }, {
                key_sprite: 'dino_sprite',
                key_animate: 'dino_sprite_anim',
                slug: 'lvl5bg2_frame',
                type: 'animation',
                duration: 2000,
                position: {x: 450, y: 200},
                depth: 22
              }],
              button: {
                level_id: 5,
                position: {x: 40, y: 200},
                image: {slug: 'btn_level_5'},
                depth: 0
              }
            },
            {
              level_id: 6,
              name: chrome.i18n.getMessage('level_6_name', 'The CursorMan points to a CursorMan').toUpperCase(),
              description: chrome.i18n.getMessage('level_6_desc', 'In a confrontation with a crime, our hero encounters \na new threat, a miscreant who can usurp any identity.').toUpperCase(),
              price: 50000000,
              index: 7,
              isPurchaced: false,
              rate: 192,
              player: {
                depth: 100,
                slug: 'player_6',
                duration: 2000,
                position: {x: 380, y: 200}
              },
              achives: [3, 5, 7, 8],
              achives_data: {
                3: {
                  id: 3, position: {x: 314, y: 115}, texture: 'level6achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                5: {
                  id: 5, position: {x: 266, y: 362}, texture: 'level6achive5',
                  name: 'Pointer Dog', depth: 11
                },
                7: {
                  id: 7, position: {x: 585, y: 281}, texture: 'level6achive7',
                  name: 'Meme Generator', depth: 13
                },
                8: {
                  id: 8, position: {x: 330, y: 167}, texture: 'level6achive8',
                  depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl6bg0',
                position: {x: 400, y: 223.5},
                depth: 1
              }, {
                slug: 'lvl6bg1',
                position: {x: 643, y: 200},
                depth: 12
              }],
              button: {
                level_id: 6,
                position: {x: 105, y: 200},
                image: {slug: 'btn_level_6'},
                depth: 0
              }
            },
            {
              level_id: 7,
              name: chrome.i18n.getMessage('level_7_name', 'Put it Back').toUpperCase(),
              description: chrome.i18n.getMessage('level_7_desc', 'Theft of property reported in the area, our hero needs \nto stop the shoplifter and bring him to justice.').toUpperCase(),
              price: 200000000,
              index: 8,
              isPurchaced: false,
              rate: 576,
              player: {
                depth: 20,
                frameRate: 8,
                duration: 2000, // time
                slug: 'player_7',
                position: {
                  x: 400, y: 200
                }
              },
              achives: [3, 4, 5],
              achives_data: {
                3: {
                  id: 3, position: {x: 237, y: 105}, texture: 'level7achive3',
                  name: 'Cursor-Signal', depth: 1
                },
                4: {
                  id: 4, position: {x: 524, y: 57}, texture: 'level7achive4',
                  name: 'Shuriken', depth: 21
                },
                5: {
                  id: 5, position: {x: 315, y: 312}, texture: 'level7achive5',
                  name: 'Pointer Dog', depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl7bg0',
                position: {x: 400, y: 200},
                depth: 1
              }, {
                key_sprite: 'tile_sprite',
                key_animate: 'tile_sprite_anim',
                slug: 'lvl7bg2_frame_tile',
                type: 'animation',
                duration: 2000,
                position: {x: 400, y: 190},
                depth: 22
              }],
              button: {
                level_id: 7,
                position: {x: 40, y: 275},
                image: {slug: 'btn_level_7'},
                depth: 0
              }
            },
            {
              level_id: 8,
              name: chrome.i18n.getMessage('level_8_name', 'Strong arms').toUpperCase(),
              description: chrome.i18n.getMessage('level_8_desc', 'Loose tabs and bars are falling from an exploded browser! \nIts up to you to save meme and cartoon characters below!').toUpperCase(),
              price: 500000000,
              index: 9,
              isPurchaced: false,
              rate: 2592,
              player: {
                slug: 'player_8',
                duration: 2000,
                depth: 100,
                position: {
                  x: 400, y: 205
                }
              },
              achives: [3, 7],
              achives_data: {
                3: {
                  id: 3, position: {x: 520, y: 125}, texture: 'level8achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                7: {
                  id: 7, position: {x: 250, y: 162}, texture: 'level8achive7',
                  name: 'Meme Generator', depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl8bg0',
                position: {x: 400, y: 266},
                depth: 1
              }, {
                slug: 'lvl8bg2',
                position: {x: 400, y: 200},
                depth: 101
              }, {
                key_sprite: 'lvl8_buble_sprite',
                key_animate: 'lvl8_buble_sprite_anim',
                slug: 'lvl8bg_buble_frame',
                type: 'animation',
                position: {x: 400, y: 195},
                depth: 101,
                duration: 2000
              }, {
                key_sprite: 'lvl8_patrik_sprite',
                key_animate: 'lvl8_patrik_sprite_anim',
                slug: 'lvl8bg_patrik_frame',
                type: 'animation',
                duration: 2000,
                position: {x: 400, y: 230},
                depth: 100
              }],
              button: {
                level_id: 8,
                position: {x: 105, y: 275},
                image: {slug: 'btn_level_8'},
                depth: 0
              }
            },
            {
              level_id: 9,
              name: chrome.i18n.getMessage('level_9_name', 'Final battle').toUpperCase(),
              description: chrome.i18n.getMessage('level_9_desc', 'This is it, you tracked down your final enemy!  \nNow it\'s only up to you to save mankind from this monstrosity!').toUpperCase(),
              price: 1000000000,
              index: 10,
              isPurchaced: false,
              rate: 7776,
              player: {
                slug: 'player_9',
                duration: 2000,
                depth: 20,
                position: {
                  x: 400, y: 205
                }
              },
              achives: [3, 6, 9],
              achives_data: {
                3: {
                  id: 3, position: {x: 520, y: 140}, texture: 'level9achive3',
                  name: 'Cursor-Signal', depth: 0
                },
                6: {
                  id: 6, position: {x: 451, y: 209}, texture: 'level9achive6',
                  name: 'Chrome Shield', depth: 21
                },
                9: {
                  id: 9, position: {x: 595, y: 320}, texture: 'level9achive9',
                  name: 'Infinity Gauntlet', depth: 21
                }
              },
              backgrounds: [{
                slug: 'lvl9bg0',
                position: {x: 400, y: 200},
                depth: 1
              }, {
                slug: 'lvl9bg2',
                position: {x: 400, y: 200},
                depth: 0
              }],
              button: {
                level_id: 9,
                position: {x: 40, y: 350},
                image: {slug: 'btn_level_9'},
                depth: 0
              }

            }, {
              level_id: 10,
              name: chrome.i18n.getMessage('level_10_name', 'The New Dawn').toUpperCase(),
              description: chrome.i18n.getMessage('level_10_desc', 'Its time for our superhero to flow Tony\'s advice, \nto go back, live a normal life and do what he loves best...').toUpperCase(),
              price: 10000000000,
              index: 11,
              isPurchaced: false,
              rate: 23328,
              player: {
                frameRate: 8,
                duration: 2000, // time
                depth: 20,
                slug: 'player_10',
                position: {
                  x: 400, y: 200
                }
              },
              achives: [5, 6, 10, 11],
              achives_data: {
                5: {
                  id: 5, position: {x: 250, y: 309}, texture: 'level10achive5',
                  name: 'Pointer Dog', depth: 11
                },
                6: {
                  id: 6,
                  position: {x: 560, y: 345},
                  texture: 'level10achive6',
                  name: 'Chrome Shield',
                  depth: 19
                },
                10: {
                  id: 10,
                  position: {x: 558, y: 183},
                  texture: 'level10achive10',
                  name: 'Own Book: How to Become a SuperHero in 10 days',
                  depth: 11
                },
                11: {
                  id: 11, position: {x: 558, y: 226},
                  name: 'close', texture: 'level11achive10',
                  depth: 11
                }
              },
              backgrounds: [{
                slug: 'lvl10bg0',
                position: {x: 400, y: 200},
                depth: 1
              }, {
                key_sprite: 'lvl10_sprite',
                key_animate: 'lvl10_sprite_anim',
                slug: 'lvl10bg2_frame',
                type: 'animation',
                position: {x: 400, y: 195},
                duration: 2000,
                depth: 0
              }],
              button: {
                level_id: 10,
                position: {x: 105, y: 350},
                image: {slug: 'btn_level_10'},
                depth: 0
              }
            },
            {
              level_id: 11,
              name: chrome.i18n.getMessage('level_11_name', 'Room').toUpperCase(),
              description: chrome.i18n.getMessage('level_11_desc', 'Room').toUpperCase(),
              price: 0,
              index: 11,
              isPurchaced: true,
              rate: 0,
              player: {
                depth: 20,
                slug: 'player_10',
                duration: 2000, // time
                frameRate: 8,
                position: {
                  x: 400, y: 230
                }
              },
              achives: [2, 3, 4, 5, 6, 7, 8, 9, 10],
              achives_data: {
                2: {
                  id: 2, position: {x: 294, y: 66}, texture: 'roomachive2',
                  depth: 11, name: 'Music Player'
                },
                3: {
                  id: 3, position: {x: 408, y: 102}, texture: 'roomachive3',
                  depth: 0, name: 'Cursor-Signal'
                },
                4: {
                  id: 4, position: {x: 320, y: 177}, texture: 'roomachive4',
                  is_animated: false,
                  depth: 11, name: 'Shuriken'
                },
                5: {
                  id: 5, position: {x: 150, y: 250},
                  texture: 'roomachive5',
                  depth: 11,
                  name: 'Pointer Dog',
                  is_animated: true,
                  sprite_key: 'lvlroom_sprite',
                  animate_key: 'lvlroom_sprite_anim',
                  slug: 'lvlroombg2_frame'
                },
                6: {
                  id: 6, position: {x: 132, y: 295}, texture: 'roomachive6',
                  depth: 11, name: 'Chrome Shield'
                },
                7: {
                  id: 7, position: {x: 380, y: 292}, texture: 'roomachive7',
                  depth: 11, name: 'Meme Generator'
                },
                8: {
                  id: 8, position: {x: 683, y: 249}, texture: 'roomachive8',
                  depth: 11, name: 'Invisible Car'
                },
                9: {
                  id: 9, position: {x: 488, y: 79}, texture: 'roomachive9',
                  depth: 11, name: 'Infinity Gauntlet'
                },
                10: {
                  id: 10,
                  position: {x: 206, y: 59},
                  texture: 'roomachive10',
                  depth: 11,
                  name: 'Own Book: How to Become a SuperHero in 10 days'
                }
              },
              backgrounds: [{
                slug: 'roombg0',
                position: {x: 400, y: 200},
                depth: 1
              }]
            }]
        };
        if (IS_BROWSER_EXTENSION == true) {
          chrome.storage.local.set({ settings: defValue });
        } else {

          window.localStorage.setItem('settings', JSON.stringify(defValue)); //for site
        }
        Data = null;
        Data = defValue;
        currentLevel = Data.levels[0];
        scene.scene.start('WorldScene', Data);
        scene.scene.stop('DialogScene');
      });

      this.btnNo = this.add.image(config.width / 2, config.height / 2, 'buttonNo').setDepth(3).setScale(0.7).setY(this.bg.y + this.bg.height / 2 - 70).setX(this.bg.x + this.bg.width / 2 - 100).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        this.setTexture('buttonNoHover');
      }).on('pointerout', function () {
        this.setTexture('buttonNo');
      }).on('pointerdown', function () {
        if (Data.enable_music == true) {
          var ws = scene.scene.get('WorldScene');
          ws.audioBackground.resume();
        }
        scene.scene.resume('WorldScene');
        scene.scene.stop('DialogScene');
      });
      this.dialog.add(this.bg).add(this.btnNo).add(this.btnYes);
      Phaser.Display.Align.In.Center(this.dialog, this.zone);
    }
  }]);

  return DialogScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GiftScene = function (_Phaser$Scene) {
  _inherits(GiftScene, _Phaser$Scene);

  function GiftScene(config) {
    _classCallCheck(this, GiftScene);

    return _possibleConstructorReturn(this, (GiftScene.__proto__ || Object.getPrototypeOf(GiftScene)).call(this, { key: 'GiftScene' }));
  }

  _createClass(GiftScene, [{
    key: 'init',
    value: function init(data) {
      this.data = data.config;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.loadAssets(this.cache.json.get('assets_gift'));
    }
  }, {
    key: 'loadAssets',
    value: function loadAssets(json) {
      Object.keys(json).forEach(function (group) {
        Object.keys(json[group]).forEach(function (key) {
          var value = json[group][key];

          if (group === 'atlas' || group === 'unityAtlas' || group === 'bitmapFont' || group === 'spritesheet' || group === 'multiatlas') {
            this.load[group](key, value[0], value[1]);
          } else if (group === 'audio') {

            // do not add mp3 unless, you bought a license ;)
            // opus, webm and ogg are way better than mp3
            if (value.hasOwnProperty('opus') && this.sys.game.device.audio.opus) {
              this.load[group](key, value['opus']);
            }
            if (value.hasOwnProperty('mp3') && this.sys.game.device.audio.opus) {
              this.load[group](key, value['mp3']);
            } else if (value.hasOwnProperty('webm') && this.sys.game.device.audio.webm) {
              this.load[group](key, value['webm']);
            } else if (value.hasOwnProperty('ogg') && this.sys.game.device.audio.ogg) {
              this.load[group](key, value['ogg']);
            } else if (value.hasOwnProperty('wav') && this.sys.game.device.audio.wav) {
              this.load[group](key, value['wav']);
            }
          } else if (group === 'html') {
            // html:ƒ (key, url, width, height, xhrSettings)
            this.load[group](key, value[0], value[1], value[2]);
          } else {
            // animation:ƒ (key, url, xhrSettings)
            // binary:ƒ (key, url, xhrSettings)
            // glsl:ƒ (key, url, xhrSettings)
            // image:ƒ (key, url, xhrSettings)
            // image:ƒ (key, [url, normal-url], xhrSettings)
            // json:ƒ (key, url, xhrSettings)
            // plugin:ƒ (key, url, xhrSettings)
            // script:ƒ (key, url, xhrSettings)
            // svg:ƒ (key, url, xhrSettings)
            // text:ƒ (key, url, xhrSettings)
            // tilemapCSV:ƒ (key, url, xhrSettings)
            // tilemapTiledJSON:ƒ (key, url, xhrSettings)
            // tilemapWeltmeister:ƒ (key, url, xhrSettings)
            // xml:ƒ (key, url, xhrSettings)
            this.load[group](key, value);
          }
        }, this);
      }, this);
    }
  }, {
    key: 'renderBonus',
    value: function renderBonus(x, y) {
      var _this2 = this;

      var _loop = function _loop(i) {
        _this2.bonus1 = _this2.add.image(_this2.data.bonuses[i].x, _this2.data.bonuses[i].y, 'bonus' + i).setDepth(4).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
          this.setTexture('bonus' + i + ':hover');
        }).on('pointerout', function () {
          this.setTexture('bonus' + i);
        }).on('pointerdown', function () {
          window.open(_this2.data.bonuses[i].link, '_blank');
        });
      };

      for (var i in this.data.bonuses) {
        _loop(i);
      }
    }
  }, {
    key: 'create',
    value: function create() {
      var scene = this;
      this.graphics = this.add.graphics();

      this.zone = this.add.zone(400, 200, 800, 400);
      this.dialog = this.add.group();

      this.renderBonus(250, 155);

      this.bg = this.add.image(800 / 2, 400 / 2, 'bgBonus').setDepth(2);

      this.btnYes = this.add.image(800 / 2, 400 / 2, 'scene_gift_button_close_active').setDepth(3).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        this.setTexture('scene_gift_button_close_hover');
      }).on('pointerout', function () {
        this.setTexture('scene_gift_button_close_active');
      }).on('pointerdown', function () {
        if (Data.enable_music == true) {
          var ws = scene.scene.get('WorldScene');
          ws.audioBackground.resume();
        }
        scene.scene.resume('WorldScene');
        scene.scene.stop('GiftScene');
      });

      this.dialog.add(this.bg).add(this.btnYes);

      Phaser.Display.Align.In.Center(this.btnYes, this.zone);
      this.btnYes.setY(this.bg.y + this.bg.height / 2 - 50);
      Phaser.Display.Align.In.Center(this.dialog, this.zone);
    }
  }]);

  return GiftScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoomScene = function (_Phaser$Scene) {
  _inherits(RoomScene, _Phaser$Scene);

  function RoomScene() {
    _classCallCheck(this, RoomScene);

    return _possibleConstructorReturn(this, (RoomScene.__proto__ || Object.getPrototypeOf(RoomScene)).call(this, { key: 'RoomScene' }));
  }

  _createClass(RoomScene, [{
    key: 'init',
    value: function init(data) {
      this.data = data;
      this.level = data.levels[11];
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.level.backgrounds.forEach(function (el) {
        var bg = _this2.add.image(el.position.x, el.position.y);
        bg.setTexture(el.slug).setDepth(el.depth);

        bg.setInteractive({ cursor: arrowCursor }).on('pointerdown', function () {
          this.scene.start('WorldScene');
        }, _this2);
      });
      this.data.achives.forEach(function (ach) {
        if (ach.isPurchaced == true) {
          if (ach.id == 5) {
            _this2.anims.create({
              key: 'lvlroom_sprite_a',
              frames: _this2.anims.generateFrameNames('lvlroombg2_frame'),
              defaultTextureKey: null,
              delay: 0,
              frameRate: null,
              duration: 2000,
              skipMissedFrames: true,
              repeat: 0,
              repeatDelay: 0,
              yoyo: false,
              showOnStart: true,
              hideOnComplete: false
            });
            var dog = _this2.add.sprite(400, 200, 'lvlroom_sprite_l').setDepth(10).setVisible(false);
            dog.play('lvlroom_sprite_a');
          } else {
            var achive = _this2.level.achives_data[ach.id];
            if (achive) {
              _this2.add.image(achive.position.x, achive.position.y, achive.texture).setVisible(true).setDepth(achive.depth).setInteractive({ cursor: arrowCursor });
            }
          }
        }
      });
    }
  }]);

  return RoomScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTitlesScene = function (_Phaser$Scene) {
  _inherits(GameTitlesScene, _Phaser$Scene);

  function GameTitlesScene() {
    _classCallCheck(this, GameTitlesScene);

    return _possibleConstructorReturn(this, (GameTitlesScene.__proto__ || Object.getPrototypeOf(GameTitlesScene)).call(this, { key: 'GameTitlesScene' }));
  }

  _createClass(GameTitlesScene, [{
    key: 'preload',
    value: function preload() {
      if (IS_BROWSER_EXTENSION == true) {
        this.load.video('space', '/images/video.mp4');
      } else {
        this.load.video('space', '/cursor-man-game/images/video.mp4');
      }
    }
  }, {
    key: 'create',
    value: function create() {
      this.video = this.add.video(400, 200, 'space').setDepth(999);
      this.video.play();
      this.countClick = 0;
      var scene = this;
      this.input.on('pointerdown', function (pointer) {
        scene.countClick++;
        if (scene.countClick < 6) return;
        if (Data.enable_music == true) {
          var ws = scene.scene.get('WorldScene');
          ws.audioBackground.resume();
        }
        scene.scene.resume('WorldScene');
        scene.scene.stop('GameTitlesScene');
      }.bind(this));
    }
  }]);

  return GameTitlesScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RateScene = function (_Phaser$Scene) {
  _inherits(RateScene, _Phaser$Scene);

  function RateScene() {
    _classCallCheck(this, RateScene);

    return _possibleConstructorReturn(this, (RateScene.__proto__ || Object.getPrototypeOf(RateScene)).call(this, { key: 'RateScene' }));
  }

  _createClass(RateScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('buttonRateSceneYes', 'https://custom-cursor.com/cursor-man-game/images/rate/buttonYes.png');
      this.load.image('buttonRateSceneYesHover', 'https://custom-cursor.com/cursor-man-game/images/rate/buttonYesHover.png');
      this.load.image('buttonRateSceneNo', 'https://custom-cursor.com/cursor-man-game/images/rate/buttonNo.png');
      this.load.image('buttonRateSceneNoHover', 'https://custom-cursor.com/cursor-man-game/images/rate/buttonNoHover.png');
      this.load.image('bgRateScene', 'https://custom-cursor.com/cursor-man-game/images/rate/bgRateScene.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var scene = this;
      this.zone = this.add.zone(400, 200, 800, 400);
      this.dialog = this.add.group();
      this.bg = this.add.image(400, 200, 'bgRateScene').setDepth(2);
      this.btnYes = this.add.image(400, 200, 'buttonRateSceneYes').setDepth(3).setScale(0.7).setY(this.bg.y + this.bg.height / 2 - 70).setX(this.bg.x - this.bg.width / 2 + 100).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        this.setTexture('buttonRateSceneYesHover');
      }).on('pointerout', function () {
        this.setTexture('buttonRateSceneYes');
      }).on('pointerdown', function () {
        Data.isRate = true;
        window.open('https://custom-cursor.com/redirect/cursor-man-game/rate', '_blank');
        if (Data.enable_music == true) {
          var ws = scene.scene.get('WorldScene');
          ws.audioBackground.resume();
        }
        scene.scene.resume('WorldScene');
        scene.scene.stop('RateScene');
      });

      this.countClick = 0;

      this.btnNo = this.add.image(400, 200, 'buttonRateSceneNo').setDepth(3).setScale(0.7).setY(this.bg.y + this.bg.height / 2 - 70).setX(this.bg.x + this.bg.width / 2 - 100).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        this.setTexture('buttonRateSceneNoHover');
      }).on('pointerout', function () {
        this.setTexture('buttonRateSceneNo');
      }).on('pointerdown', function () {
        Data.isRate = true;
        if (Data.enable_music == true) {
          var ws = scene.scene.get('WorldScene');
          ws.audioBackground.resume();
        }
        this.countClick++;
        if (this.countClick >= 2) {
          scene.scene.resume('WorldScene');
          scene.scene.stop('RateScene');
        }
      }.bind(this));
      this.dialog.add(this.bg).add(this.btnNo).add(this.btnYes);
      Phaser.Display.Align.In.Center(this.dialog, this.zone);
    }
  }]);

  return RateScene;
}(Phaser.Scene);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bonus = [{ level: 0, x: 244, y: 160, link: 'https://custom-cursor.com/bonus-cursor/fe4a348a-da31-4ed2-a309-cfe65f06ee52' }, { level: 1, x: 399, y: 160, link: 'https://custom-cursor.com/bonus-cursor/f83c231d-7503-44d2-8aa4-f1a9c606e2d9' }, { level: 3, x: 550, y: 160, link: 'https://custom-cursor.com/bonus-cursor/044b7bf8-d1b9-4f40-9b6f-f2b06e605601' }, { level: 5, x: 244, y: 248, link: 'https://custom-cursor.com/bonus-cursor/f864bb12-01bb-4b9c-83d7-0fba2a472bfc' }, { level: 7, x: 399, y: 248, link: 'https://custom-cursor.com/bonus-cursor/0d275eef-9f19-49ef-a26e-3a07be5bdc49' }, { level: 9, x: 550, y: 248, link: 'https://custom-cursor.com/bonus-cursor/b82a7353-c13c-49e8-be67-0600ff719abd' }];

function getMoneyClick(count) {
  return 1 + Data.achives[0].money * count * currentLevel.rate * getRate(Data.achives[0], count);
}

var WorldScene = function (_Phaser$Scene) {
  _inherits(WorldScene, _Phaser$Scene);

  function WorldScene() {
    _classCallCheck(this, WorldScene);

    return _possibleConstructorReturn(this, (WorldScene.__proto__ || Object.getPrototypeOf(WorldScene)).call(this, { key: 'WorldScene' }));
  }

  _createClass(WorldScene, [{
    key: 'init',
    value: function init(data) {
      this.data = data;
      this.levelId = data.level_id;
      this.achives = [];
      this.levels = [];
    }
  }, {
    key: 'renderBg',
    value: function renderBg(scene) {
      currentLevel.backgrounds.forEach(function (el) {
        if (el.type && el.type == 'animation') {
          var x = scene.add.sprite(el.position.x, el.position.y, el.key_sprite, el.image).setDepth(99).play(el.key_animate);

          scene.anims.create({
            key: el.key_animate,
            frames: scene.anims.generateFrameNames(el.slug),
            defaultTextureKey: null,
            delay: 0,
            frameRate: null,
            duration: el.duration,
            skipMissedFrames: true,
            repeat: -1,
            repeatDelay: 0,
            yoyo: false,
            showOnStart: true,
            hideOnComplete: false
          });
          x.play(el.key_animate).setDepth(el.depth);
          scene.player.background.push(x);

          if (el.key_animate == 'lvl10_sprite_anim') {
            x.setDepth(0);
            var ach = scene.achives.find(function (elch) {
              return elch.data.id == 10;
            });
            if (ach.data.isPurchaced == true) {
              x.setVisible(false).setDepth(0);
            } else {
              x.setDepth(20);
            }
          }
        } else {
          var bg = scene.add.image(el.position.x, el.position.y);
          bg.setTexture(el.slug).setDepth(el.depth);
          scene.player.background.push(bg);
        }
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.levelId = Data.level;
      if (!Data.rateMoney) {
        Data.rateMoney = 1000;
      }
      if (!Data.countRate) {
        Data.countRate = 0;
      }
      this.hint = new Hint(this);
      this.player = new Player(this);

      this.cam = this.cameras.add(0, 0, 800, 400);
      this.cam.setBackgroundColor('#E6F0F0');

      Data.achives.forEach(function (btn) {
        var card = new Card(_this2);
        var image = 'btn';
        if (btn.isPurchaced) {
          image = btn.button.image.slug;
        }
        card.setData(btn);
        card.render(btn.button.position.x, btn.button.position.y, image);

        var achive = btn;

        if (btn.count == btn.maxCount && achive.id == 7) {
          card.number.setVisible(false);
          card.quantity.setVisible(false);
          card.price.setVisible(false);
        }

        card.image.on('pointerdown', function () {
          this.scene.click = true;
          if (this.getData('count') == this.getData('maxCount')) {
            card.number.setVisible(false);
            card.quantity.setVisible(false);
            card.price.setVisible(false);
            return;
          }

          if (Data.money >= this.getData('price')) {
            this.scene.sound.play('upgrade');

            if (this.getData('id') != 7) {
              card.number.setVisible(true);
              card.quantity.setVisible(true);
            }

            Data.money = Data.money - this.getData('price');
            this.setData('isPurchaced', true);
            this.setTexture(this.getData('button').image.slug);

            this.setData('count', this.getData('count') + 1);
            this.setData('price', this.getData('price') * this.getData('ratePrice'));

            card.number.setText(this.getData('count'));
            card.price.setText(abbreviate(this.getData('price')));
            card.changePositionPrice();

            achive.isPurchaced = true;
            achive.count = this.getData('count');
            achive.price = this.getData('price');

            if (achive.id == 7) {
              card.number.setVisible(false);
              card.quantity.setVisible(false);
              card.price.setVisible(false);
            }

            if (achive.id == 2) {
              Data.enable_music = true;
              if (this.scene.audioBackground.isPlaying == false) {
                this.scene.audioBackground.play();
              }
            }

            if (currentLevel.level_id == 10) {
              if (achive.id == 10) {
                var k = this.scene.player.background.find(function (elb) {
                  return elb.texture.key == 'lvl10bg2_frame';
                });
                k.setVisible(false).setDepth(0);
              }
            }

            if (achive.autoClick == true) {
              if (achive.count == 5) {
                achive.rate = 3;
              }
              if (achive.count == 10) {
                achive.rate = 6;
              }
              if (achive.count == 15) {
                achive.rate = 8;
              }
              if (achive.count == 20) {
                achive.rate = 10;
              }
              if (achive.count == 25) {
                achive.rate = 12;
              }
              if (achive.count == 30) {
                achive.rate = 14;
              }
              if (achive.count == 35) {
                achive.rate = 16;
              }
              if (achive.count == 40) {
                achive.rate = 18;
              }
              if (achive.count == 45) {
                achive.rate = 20;
              }
              if (achive.count == 50) {
                achive.rate = 22;
              }
            }
          }
        });

        _this2.achives.push(card);
      });

      Data.levels.forEach(function (btn) {
        if (btn.button) {
          var image = 'btn';
          if (btn.isPurchaced) {
            image = btn.button.image.slug;
          }
          var card = new CardLevel(_this2);
          card.setData(btn);
          card.render(btn.button.position.x, btn.button.position.y, image);

          card.image.on('pointerdown', function () {
            if (this.getData('level_id') - currentLevel.level_id == 1) {
              this.scene.click = true;

              if (Data.money >= this.getData('price')) {
                this.scene.sound.play('upgrade');

                Data.money = Data.money - this.getData('price');
                this.setData('isPurchaced', true);
                Data.level = this.getData('level_id');

                currentLevel = Data.levels.find(function (obj) {
                  return obj.level_id == Data.level;
                });

                if (currentLevel.level_id == 3 && !Data.isRate) {
                  var music = this.scene.audioBackground;
                  if (music.isPlaying == true) {
                    music.pause();
                  }
                  this.scene.scene.pause('WorldScene');
                  this.scene.scene.launch('RateScene');
                }

                if (currentLevel.level_id == 10) {
                  var _music = this.scene.audioBackground;
                  if (_music.isPlaying == true) {
                    _music.pause();
                  }
                  this.scene.scene.pause('WorldScene');
                  this.scene.scene.launch('GameTitlesScene');
                }

                currentLevel.isPurchaced = true;
                this.setTexture(btn.button.image.slug);
                card.changePriceText();

                if (currentLevel.level_id == 2) {
                  Data.bonuses.push(bonus[1]);
                  Data.gifts = true;
                  this.scene.gift.shake.shake();
                }
                if (currentLevel.level_id == 4) {
                  Data.bonuses.push(bonus[2]);
                  Data.gifts = true;
                  this.scene.gift.shake.shake();
                }
                if (currentLevel.level_id == 6) {
                  Data.bonuses.push(bonus[3]);
                  Data.gifts = true;
                  this.scene.gift.shake.shake();
                }
                if (currentLevel.level_id == 9) {
                  Data.bonuses.push(bonus[4]);
                  Data.gifts = true;
                  this.scene.gift.shake.shake();
                }
                if (currentLevel.level_id == 10) {
                  Data.bonuses.push(bonus[5]);
                  this.scene.gift.shake.shake();
                  Data.gifts = true;
                }

                this.scene.anims.remove('player_' + (currentLevel.level_id - 1) + '_anims');
                this.scene.player.player.anims.stop();

                this.scene.player.player.setTexture('player_' + currentLevel.level_id + '_anims');
                this.scene.anims.create({
                  key: 'player_' + currentLevel.level_id + '_play',
                  frames: this.scene.anims.generateFrameNames('player_' + currentLevel.level_id + '_anims'),
                  duration: currentLevel.player.duration
                });

                this.scene.player.player.setData({ level_id: currentLevel.level_id }).setX(currentLevel.player.position.x).setY(currentLevel.player.position.y).setDepth(currentLevel.player.depth);
              }
            }
          });
          _this2.levels.push(card);
        }
      });

      this.click = false;
      this.hint = new Hint(this);
      this.balance = new Balance(this);
      this.balance.render();
      this.achivesScene = new Achives(this);
      this.audioClick = this.sound.add('click');
      this.audioBackground = this.sound.add('background_audio');

      this.input.on('pointerdown', function () {}, this);

      this.clicks = this.add.group();

      this.zone = this.add.zone(400, 200).setSize(560, 410).setDepth(1000).setInteractive({ cursor: arrowCursor }).on('pointerdown', function (e) {
        if (this.player.player.anims.isPlaying == false) {
          this.player.play();
        }

        this.audioClick.stop();
        var sumClick = getMoneyClick(Data.achives[0].count);
        Data.money = Data.money + sumClick;
        this.click = true;
        this.audioClick.play();

        var x = randomIntFromInterval(350, 450),
            y = randomIntFromInterval(200, 250);

        if (e) {
          x = e.x;
        }
        if (e) {
          y = e.y;
        }

        var t = this.add.text(x, y, abbreviate(sumClick, 2)).setDepth(2000).setFontSize(12).setColor('#008082');
        t.setData('c', y);

        t.moveTo = this.plugins.get('rexmovetoplugin').add(t, { speed: 200, rotateToTarget: false }).on('complete', function () {
          this.clicks.remove(t);
          t.destroy();
        }, this);
        t.moveTo.moveTo(380, 10);
        this.clicks.add(t);
      }, this);

      this.input.keyboard.on('keyup-' + 'SPACE', function () {
        return _this2.zone.emit('pointerdown');
      }, this);

      this.reloadButton();
      this.muteButton();
      this.buttonGift();
      this.cameras.add(0, 0, 800, 400);

      this.time.addEvent({ delay: Data.delayRoom, callback: onEvent, callbackScope: this, loop: true });

      function onEvent() {
        if (this.click == false) {
          var music = this.audioBackground;
          if (music.isPlaying == true) {
            music.stop();
          }
          this.scene.start('RoomScene', Data);
        }
        this.click = false;
      }

      this.time.addEvent({
        delay: 1000,
        callback: function () {
          for (var i in Data.achives) {
            var p = Data.achives[i];
            if (p.autoClick == true && p.count != 0) {
              Data.money = parseInt(Data.money) + parseInt(p.money) * parseInt(p.count) * parseFloat(p.rate);
            }
          }

          if (IS_BROWSER_EXTENSION == true) {
            chrome.storage.local.set({ settings: Data });
          } else {
            window.localStorage.setItem('settings', JSON.stringify(Data));
            try {
              chrome.runtime.sendMessage(EXTENSION_ID, {
                action: 'set',
                key: 'settings',
                value: Data
              }, function (response) {
                console.log();
              });
            } catch (e) {}
          }

          return '';
        }.bind(this),
        args: [],
        loop: true,
        repeat: 0,
        startAt: 0,
        timeScale: 1,
        paused: false
      });

      if (Data.enable_music == true) {
        this.audioBackground.play();
      }

      if (Data.gifts == true) {
        this.gift.setDepth(1000).setVisible(true);
        this.gift.shake.shake();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (Data.bonuses.length < 1 && Data.money > 119) {
        Data.bonuses.push(bonus[0]);
        Data.gifts = true;
      }
      if (Data.bonuses.length < 1 && Data.gifts == false && this.gift.visible == true) {
        this.gift.setVisible(false);
        this.gift.shake.shake();
      }
      if (Data.bonuses.length > 0 && this.gift.visible == false) {
        this.gift.setVisible(true);
        this.gift.shake.shake();
      }

      Data.achives.forEach(function (ach) {
        if (ach.isPurchaced && currentLevel.achives.includes(ach.id)) {
          _this3.achivesScene.achives[ach.id].setVisible(true).setTexture(currentLevel.achives_data[ach.id].texture).setDepth(currentLevel.achives_data[ach.id].depth).setPosition(currentLevel.achives_data[ach.id].position.x, currentLevel.achives_data[ach.id].position.y);
        } else {
          _this3.achivesScene.achives[ach.id].setVisible(false);
        }
      });

      this.balance.updataBalance();

      if (this.levelId != currentLevel.level_id) {
        this.levelId = currentLevel.level_id;
        this.player.background.forEach(function (el) {
          return el.destroy();
        });
        this.renderBg(this);
      }
      this.reload.setX(this.balance.balance_right.x + 25);
      if (this.clicks.children) {
        this.clicks.children.entries.forEach(function (el) {
          el.alpha = el.y / el.data.values.c;
        });
      }
    }
  }, {
    key: 'reloadButton',
    value: function reloadButton() {
      this.reload = this.add.image(this.balance.balance_right.x + 25, this.balance.balance_right.y, 'btn_reload').setDepth(1000).setInteractive({ cursor: pointerCursor }).on('pointerdown', function () {
        var music = this.audioBackground;
        if (music.isPlaying == true) {
          music.pause();
        }
        this.scene.pause('WorldScene');
        this.scene.launch('DialogScene');
      }, this).on('pointerover', function () {
        this.setTexture('btn_reload_hover');
      }).on('pointerout', function () {
        this.setTexture('btn_reload');
      });
    }
  }, {
    key: 'muteButton',
    value: function muteButton() {
      this.volume = this.add.image(650, this.reload.y, 'btn_unmute').setData({ status: Data.mute }).setInteractive({ cursor: pointerCursor }).on('pointerover', function () {
        if (this.getData('status') == false) {
          this.setTexture('btn_unmute_hover');
        } else {
          this.setTexture('btn_mute_hover');
        }
      }).on('pointerout', function () {
        if (this.getData('status') == false) this.setTexture('btn_unmute');else this.setTexture('btn_mute');
      }).on('pointerdown', function () {
        if (this.volume.getData('status') == true) {
          this.volume.setData('status', false).setTexture('btn_mute');
          Data.mute = false;
        } else {
          this.volume.setData('status', true).setTexture('btn_unmute');
          Data.mute = true;
        }
        this.sound.setMute(this.volume.getData('status'));
      }, this).setDepth(1000);

      this.sound.setMute(Data.mute);
      if (Data.mute) {
        this.volume.setTexture('btn_mute');
      } else {
        this.volume.setTexture('btn_unmute');
      }
    }
  }, {
    key: 'buttonGift',
    value: function buttonGift() {
      this.gift = this.add.gift(620, this.volume.y).setDepth(1000).on('pointerdown', function (e) {
        var music = this.audioBackground;
        if (music.isPlaying == true) {
          music.pause();
        }
        this.scene.pause('WorldScene');
        this.scene.launch('GiftScene', { config: this.data });
      }.bind(this));

      this.gift.shake = this.plugins.get('rexshakepositionplugin').add(this.gift, { duration: 500, magnitude: 1.2, mode: 'effect' }).on('complete', function () {});
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.audioBackground.stop();
    }
  }]);

  return WorldScene;
}(Phaser.Scene);