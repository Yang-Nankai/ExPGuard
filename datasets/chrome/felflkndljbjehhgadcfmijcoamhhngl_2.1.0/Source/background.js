var conf = {
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
            description: chrome.i18n.getMessage('achives_desc_3', 'The signal goes on and he shows up. \n That\'s the way it\'s been, that\'s the way it will be.').toUpperCase(),
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
            description: chrome.i18n.getMessage('achives_desc_4', 'This shuriken is a roughly cursor-shaped \n trowing weapon for our superhero to fight crime.').toUpperCase(),
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
            description: chrome.i18n.getMessage('achives_desc_5', 'Pointer Dog is a faithful Cursor-Man canine sidekick. \n He\'s a half dog and half pointer.').toUpperCase(),
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
            description: chrome.i18n.getMessage('achives_desc_6', 'One superhero once said about this shield: \n That thing doesn’t obey the laws of physics at all!').toUpperCase(),
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
            description: chrome.i18n.getMessage('achives_desc_7', 'Meme Generator is a wonderful and amazing product,\n but no one knows what\'s it for.').toUpperCase(),
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
            description: chrome.i18n.getMessage('achives_desc_8', 'A hero needs a cool car to get to the action, \n why not to borrow from a yellow friend.').toUpperCase(),
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
    levels: [
        {
            level_id: 0,
            name: chrome.i18n.getMessage('level_0_name', 'Start').toUpperCase(),
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
        },
        {
            level_id: 1,
            name: chrome.i18n.getMessage('level_1_name', 'Get Your Face Back').toUpperCase(),
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
            name: chrome.i18n.getMessage('level_2_name', 'Elastic buttocks').toUpperCase(),
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
            name: chrome.i18n.getMessage('level_5_name', 'The First Threat').toUpperCase(),
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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

chrome.runtime.onInstalled.addListener(async function (details) {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        let uid = await uuidv4();
        chrome.storage.local.set({
            settings: conf,
            uid: uid
        });
        chrome.tabs.create({url: `https://custom-cursor.com/games/cursor-man-game/success`});
    }
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

    }
});

chrome.runtime.setUninstallURL('https://custom-cursor.com/games/cursor-man-game/uninstall');

chrome.runtime.onMessageExternal.addListener(function (request, sender, response) {
    switch (request.action) {
        case "set": {
            let obj = {};
            obj[request.key] = request.value;
            chrome.storage.local.set(obj, () => {
                response({status: 'success'});
            });
            return true; // Indicates async response
        }
        case "get": {
            chrome.storage.local.get((data) => {
                response(data);
            });
            return true; // Indicates async response
        }
        default: {
            return false;
        }
    }
});

function notify() {
    chrome.storage.local.get(function (item) {
        if (item.notifications && Object.prototype.hasOwnProperty.call(item.notifications, 'message')) {
            chrome.notifications.create({
                type: "basic",
                title: item.notifications.title,
                message: item.notifications.message,
                iconUrl: item.notifications.iconUrl
            }, function (callback) {

            });
            chrome.notifications.onClicked.addListener(function () {
                chrome.tabs.create({url: item.url});
            })
            chrome.storage.local.set({notifications: {}});
        }
    })
}