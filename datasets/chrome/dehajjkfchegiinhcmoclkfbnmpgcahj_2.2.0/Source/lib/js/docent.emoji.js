docent.emoji = {
    init: function() {
        var $keyboard = $('<div>', {
            class: 'docent-emoji-keyboard'
        });

        function addButton(unicode) {
            /*
            var html = '';
            var array = unicode.split('-');
            for (var i of array) {
                html += '&#x' + i + ';';
            }
            */
            let index = people.indexOf(unicode);
            var $button = $('<button>', {
                html: $('<img>', {
                    class: 'emoji',
                    draggable: false,
                    alt: docent.emoji.getEmoji(unicode),
                    loading: (index == -1 || index > 18) ? 'lazy' : 'eager',
                    src: `${twemoji.base}svg/${unicode}.svg`
                }),
                'data-unicode': unicode
            });
            $keyboard.append($button);
            return $button;
        }
        function addArrayOfButtons(array) {
            for (var i of array) addButton(i);
            $keyboard.append('<br>');
        }

        var people = ["1f600", "1f62c", "1f601", "1f602", "1f603", "1f604", "1f605", "1f606", "1f607", "1f609", "1f60a", "1f642", "1f643", "263a", "1f60b", "1f60c", "1f60d", "1f618", "1f617", "1f619", "1f61a", "1f61c", "1f61d", "1f61b", "1f911", "1f913", "1f60e", "1f917", "1f60f", "1f636", "1f610", "1f611", "1f612", "1f644", "1f914", "1f633", "1f61e", "1f61f", "1f620", "1f621", "1f614", "1f615", "1f641", "2639", "1f623", "1f616", "1f62b", "1f629", "1f624", "1f62e", "1f631", "1f628", "1f630", "1f62f", "1f626", "1f627", "1f622", "1f625", "1f62a", "1f613", "1f62d", "1f635", "1f632", "1f910", "1f637", "1f912", "1f915", "1f634", "1f4a4", "1f4a9", "1f608", "1f47f", "1f479", "1f47a", "1f480", "1f47b", "1f47d", "1f916", "1f63a", "1f638", "1f639", "1f63b", "1f63c", "1f63e", "1f640", "1f63f", "1f63d", "1f64c", "1f44f", "1f44b", "1f44d", "1f44e", "1f44a", "270a", "270c", "1f44c", "270b", "1f450", "1f4aa", "1f64f", "261d", "1f446", "1f447", "1f448", "1f449", "1f590", "1f918", "1f596", "270d", "1f485", "1f444", "1f445", "1f442", "1f443", "1f441", "1f440", "1f464", "1f465", "1f5e3", "1f476", "1f466", "1f467", "1f468", "1f469", "1f471", "1f474", "1f475", "1f472", "1f473", "1f46e", "1f477", "1f482", "1f575", "1f385", "1f47c", "1f478", "1f470", "1f6b6", "1f3c3", "1f483", "1f46f", "1f46b", "1f46c", "1f46d", "1f647", "1f481", "1f645", "1f646", "1f64b", "1f64e", "1f64d", "1f487", "1f486", "1f491", '1f469-200d-2764-fe0f-200d-1f469', '1f468-200d-2764-fe0f-200d-1f468', "1f48f", '1f469-200d-2764-fe0f-200d-1f48b-200d-1f469', '1f468-200d-2764-fe0f-200d-1f48b-200d-1f468', "1f46a", '1f468-200d-1f469-200d-1f467', '1f468-200d-1f469-200d-1f467-200d-1f466', '1f468-200d-1f469-200d-1f466-200d-1f466', '1f468-200d-1f469-200d-1f467-200d-1f467', '1f469-200d-1f469-200d-1f466', '1f469-200d-1f469-200d-1f467', '1f469-200d-1f469-200d-1f467-200d-1f466', '1f469-200d-1f469-200d-1f466-200d-1f466', '1f469-200d-1f469-200d-1f467-200d-1f467', '1f468-200d-1f468-200d-1f466', '1f468-200d-1f468-200d-1f467', '1f468-200d-1f468-200d-1f467-200d-1f466', '1f468-200d-1f468-200d-1f466-200d-1f466', '1f468-200d-1f468-200d-1f467-200d-1f467', "1f45a", "1f455", "1f456", "1f454", "1f457", "1f459", "1f458", "1f484", "1f48b", "1f463", "1f460", "1f461", "1f462", "1f45e", "1f45f", "1f452", "1f3a9", "26d1", "1f393", "1f451", "1f392", "1f45d", "1f45b", "1f45c", "1f4bc", "1f453", "1f576", "1f48d", "1f302"];
        addArrayOfButtons(people);

        var nature = ["1f436", "1f431", "1f42d", "1f439", "1f430", "1f43b", "1f43c", "1f428", "1f42f", "1f981", "1f42e", "1f437", "1f43d", "1f438", "1f419", "1f435", "1f648", "1f649", "1f64a", "1f412", "1f414", "1f427", "1f426", "1f424", "1f423", "1f425", "1f43a", "1f417", "1f434", "1f984", "1f41d", "1f41b", "1f40c", "1f41e", "1f41c", "1f577", "1f982", "1f980", "1f40d", "1f422", "1f420", "1f41f", "1f421", "1f42c", "1f433", "1f40b", "1f40a", "1f406", "1f405", "1f403", "1f402", "1f404", "1f42a", "1f42b", "1f418", "1f410", "1f40f", "1f411", "1f40e", "1f416", "1f400", "1f401", "1f413", "1f983", "1f54a", "1f415", "1f429", "1f408", "1f407", "1f43f", "1f43e", "1f409", "1f432", "1f335", "1f384", "1f332", "1f333", "1f334", "1f331", "1f33f", "2618", "1f340", "1f38d", "1f38b", "1f343", "1f342", "1f341", "1f33e", "1f33a", "1f33b", "1f339", "1f337", "1f33c", "1f338", "1f490", "1f344", "1f330", "1f383", "1f41a", "1f578", "1f30e", "1f30d", "1f30f", "1f315", "1f316", "1f317", "1f318", "1f311", "1f312", "1f313", "1f314", "1f31a", "1f31d", "1f31b", "1f31c", "1f31e", "1f319", "2b50", "1f31f", "1f4ab", "2728", "2604", "2600", "1f324", "26c5", "1f325", "1f326", "2601", "1f327", "26c8", "1f329", "26a1", "1f525", "1f4a5", "2744", "1f328", "2603", "26c4", "1f32c", "1f4a8", "1f32a", "1f32b", "2602", "2614", "1f4a7", "1f4a6", "1f30a"];
        addArrayOfButtons(nature);

        var food = ["1f34f", "1f34e", "1f350", "1f34a", "1f34b", "1f34c", "1f349", "1f347", "1f353", "1f348", "1f352", "1f351", "1f34d", "1f345", "1f346", "1f336", "1f33d", "1f360", "1f36f", "1f35e", "1f9c0", "1f357", "1f356", "1f364", "1f373", "1f354", "1f35f", "1f32d", "1f355", "1f35d", "1f32e", "1f32f", "1f35c", "1f372", "1f365", "1f363", "1f371", "1f35b", "1f359", "1f35a", "1f358", "1f362", "1f361", "1f367", "1f368", "1f366", "1f370", "1f382", "1f36e", "1f36c", "1f36d", "1f36b", "1f37f", "1f369", "1f36a", "1f37a", "1f37b", "1f377", "1f378", "1f379", "1f37e", "1f376", "1f375", "2615", "1f37c", "1f374", "1f37d"];
        addArrayOfButtons(food);

        var activities = ["26bd", "1f3c0", "1f3c8", "26be", "1f3be", "1f3d0", "1f3c9", "1f3b1", "26f3", "1f3cc", "1f3d3", "1f3f8", "1f3d2", "1f3d1", "1f3cf", "1f3bf", "26f7", "1f3c2", "26f8", "1f3f9", "1f3a3", "1f6a3", "1f3ca", "1f3c4", "1f6c0", "26f9", "1f3cb", "1f6b4", "1f6b5", "1f3c7", "1f574", "1f3c6", "1f3bd", "1f3c5", "1f396", "1f397", "1f3f5", "1f3ab", "1f39f", "1f3ad", "1f3a8", "1f3aa", "1f3a4", "1f3a7", "1f3bc", "1f3b9", "1f3b7", "1f3ba", "1f3b8", "1f3bb", "1f3ac", "1f3ae", "1f47e", "1f3af", "1f3b2", "1f3b0", "1f3b3"];
        addArrayOfButtons(activities);

        var travel = ["1f697", "1f695", "1f699", "1f68c", "1f68e", "1f3ce", "1f693", "1f691", "1f692", "1f690", "1f69a", "1f69b", "1f69c", "1f3cd", "1f6b2", "1f6a8", "1f694", "1f68d", "1f698", "1f696", "1f6a1", "1f6a0", "1f69f", "1f683", "1f68b", "1f69d", "1f684", "1f685", "1f688", "1f69e", "1f682", "1f686", "1f687", "1f68a", "1f689", "1f681", "1f6e9", "2708", "1f6eb", "1f6ec", "26f5", "1f6e5", "1f6a4", "26f4", "1f6f3", "1f680", "1f6f0", "1f4ba", "2693", "1f6a7", "26fd", "1f68f", "1f6a6", "1f6a5", "1f3c1", "1f6a2", "1f3a1", "1f3a2", "1f3a0", "1f3d7", "1f301", "1f5fc", "1f3ed", "26f2", "1f391", "26f0", "1f3d4", "1f5fb", "1f30b", "1f5fe", "1f3d5", "26fa", "1f3de", "1f6e3", "1f6e4", "1f305", "1f304", "1f3dc", "1f3d6", "1f3dd", "1f307", "1f306", "1f3d9", "1f303", "1f309", "1f30c", "1f320", "1f387", "1f386", "1f308", "1f3d8", "1f3f0", "1f3ef", "1f3df", "1f5fd", "1f3e0", "1f3e1", "1f3da", "1f3e2", "1f3ec", "1f3e3", "1f3e4", "1f3e5", "1f3e6", "1f3e8", "1f3ea", "1f3eb", "1f3e9", "1f492", "1f3db", "26ea", "1f54c", "1f54d", "1f54b", "26e9"];
        addArrayOfButtons(travel);

        var objects = ["231a", "1f4f1", "1f4f2", "1f4bb", "2328", "1f5a5", "1f5a8", "1f5b1", "1f5b2", "1f579", "1f5dc", "1f4bd", "1f4be", "1f4bf", "1f4c0", "1f4fc", "1f4f7", "1f4f8", "1f4f9", "1f3a5", "1f4fd", "1f39e", "1f4de", "260e", "1f4df", "1f4e0", "1f4fa", "1f4fb", "1f399", "1f39a", "1f39b", "23f1", "23f2", "23f0", "1f570", "23f3", "231b", "1f4e1", "1f50b", "1f50c", "1f4a1", "1f526", "1f56f", "1f5d1", "1f6e2", "1f4b8", "1f4b5", "1f4b4", "1f4b6", "1f4b7", "1f4b0", "1f4b3", "1f48e", "2696", "1f527", "1f528", "2692", "1f6e0", "26cf", "1f529", "2699", "26d3", "1f52b", "1f4a3", "1f52a", "1f5e1", "2694", "1f6e1", "1f6ac", "2620", "26b0", "26b1", "1f3fa", "1f52e", "1f4ff", "1f488", "2697", "1f52d", "1f52c", "1f573", "1f48a", "1f489", "1f321", "1f3f7", "1f516", "1f6bd", "1f6bf", "1f6c1", "1f511", "1f5dd", "1f6cb", "1f6cc", "1f6cf", "1f6aa", "1f6ce", "1f5bc", "1f5fa", "26f1", "1f5ff", "1f6cd", "1f388", "1f38f", "1f380", "1f381", "1f38a", "1f389", "1f38e", "1f390", "1f38c", "1f3ee", "2709", "1f4e9", "1f4e8", "1f4e7", "1f48c", "1f4ee", "1f4ea", "1f4eb", "1f4ec", "1f4ed", "1f4e6", "1f4ef", "1f4e5", "1f4e4", "1f4dc", "1f4c3", "1f4d1", "1f4ca", "1f4c8", "1f4c9", "1f4c4", "1f4c5", "1f4c6", "1f5d3", "1f4c7", "1f5c3", "1f5f3", "1f5c4", "1f4cb", "1f5d2", "1f4c1", "1f4c2", "1f5c2", "1f5de", "1f4f0", "1f4d3", "1f4d5", "1f4d7", "1f4d8", "1f4d9", "1f4d4", "1f4d2", "1f4da", "1f4d6", "1f517", "1f4ce", "1f587", "2702", "1f4d0", "1f4cf", "1f4cc", "1f4cd", "1f6a9", "1f3f3", "1f3f4", "1f510", "1f512", "1f513", "1f50f", "1f58a", "1f58b", "2712", "1f4dd", "270f", "1f58d", "1f58c", "1f50d", "1f50e"];
        addArrayOfButtons(objects);

        var symbols = ["2764", "1f49b", "1f49a", "1f499", "1f49c", "1f494", "2763", "1f495", "1f49e", "1f493", "1f497", "1f496", "1f498", "1f49d", "1f49f", "262e", "271d", "262a", "1f549", "2638", "2721", "1f52f", "1f54e", "262f", "2626", "1f6d0", "26ce", "2648", "2649", "264a", "264b", "264c", "264d", "264e", "264f", "2650", "2651", "2652", "2653", "1f194", "269b", "1f233", "1f239", "2622", "2623", "1f4f4", "1f4f3", "1f236", "1f21a", "1f238", "1f23a", "1f237", "2734", "1f19a", "1f251", "1f4ae", "1f250", "3299", "3297", "1f234", "1f235", "1f232", "1f170", "1f171", "1f18e", "1f191", "1f17e", "1f198", "26d4", "1f4db", "1f6ab", "274c", "2b55", "1f4a2", "2668", "1f6b7", "1f6af", "1f6b3", "1f6b1", "1f51e", "1f4f5", "2757", "2755", "2753", "2754", "203c", "2049", "1f4af", "1f505", "1f506", "1f531", "269c", "303d", "26a0", "1f6b8", "1f530", "267b", "1f22f", "1f4b9", "2747", "2733", "23cf", "274e", "2705", "1f4a0", "1f300", "27bf", "1f310", "24c2", "1f3e7", "1f202", "1f6c2", "1f6c3", "1f6c4", "1f6c5", "267f", "1f6ad", "1f6be", "1f17f", "1f6b0", "1f6b9", "1f6ba", "1f6bc", "1f6bb", "1f6ae", "1f3a6", "1f4f6", "1f201", "1f196", "1f197", "1f199", "1f192", "1f195", "1f193", "30-20e3", "31-20e3", "32-20e3", "33-20e3", "34-20e3", "35-20e3", "36-20e3", "37-20e3", "38-20e3", "39-20e3", "1f51f", "2a-20e3", "1f522", "25b6", "23f8", "23ef", "23f9", "23fa", "23ed", "23ee", "23e9", "23ea", "1f500", "1f501", "1f502", "25c0", "1f53c", "1f53d", "23eb", "23ec", "27a1", "2b05", "2b06", "2b07", "2197", "2198", "2199", "2196", "2195", "2194", "1f504", "21aa", "21a9", "2934", "2935", "23-20e3", "2139", "1f524", "1f521", "1f520", "1f523", "1f3b5", "1f3b6", "3030", "27b0", "2714", "1f503", "2795", "2796", "2797", "2716", "1f4b2", "1f4b1", "a9", "ae", "2122", "1f51a", "1f519", "1f51b", "1f51d", "1f51c", "2611", "1f518", "26aa", "26ab", "1f534", "1f535", "1f538", "1f539", "1f536", "1f537", "1f53a", "25aa", "25ab", "2b1b", "2b1c", "1f53b", "25fc", "25fb", "25fe", "25fd", "1f532", "1f533", "1f508", "1f509", "1f50a", "1f507", "1f4e3", "1f4e2", "1f514", "1f515", "1f0cf", "1f004", "2660", "2663", "2665", "2666", "1f3b4", "1f441-200d-1f5e8", "1f5e8", "1f4ad", "1f5ef", "1f4ac", "1f550", "1f551", "1f552", "1f553", "1f554", "1f555", "1f556", "1f557", "1f558", "1f559", "1f55a", "1f55b", "1f55c", "1f55d", "1f55e", "1f55f", "1f560", "1f561", "1f562", "1f563", "1f564", "1f565", "1f566", "1f567"];
        addArrayOfButtons(symbols);

        var flags = ["1f1e6-1f1eb", "1f1e6-1f1fd", "1f1e6-1f1f1", "1f1e9-1f1ff", "1f1e6-1f1f8", "1f1e6-1f1e9", "1f1e6-1f1f4", "1f1e6-1f1ee", "1f1e6-1f1f6", "1f1e6-1f1ec", "1f1e6-1f1f7", "1f1e6-1f1f2", "1f1e6-1f1fc", "1f1e6-1f1fa", "1f1e6-1f1f9", "1f1e6-1f1ff", "1f1e7-1f1f8", "1f1e7-1f1ed", "1f1e7-1f1e9", "1f1e7-1f1e7", "1f1e7-1f1fe", "1f1e7-1f1ea", "1f1e7-1f1ff", "1f1e7-1f1ef", "1f1e7-1f1f2", "1f1e7-1f1f9", "1f1e7-1f1f4", "1f1e7-1f1f6", "1f1e7-1f1e6", "1f1e7-1f1fc", "1f1e7-1f1f7", "1f1ee-1f1f4", "1f1fb-1f1ec", "1f1e7-1f1f3", "1f1e7-1f1ec", "1f1e7-1f1eb", "1f1e7-1f1ee", "1f1e8-1f1fb", "1f1f0-1f1ed", "1f1e8-1f1f2", "1f1e8-1f1e6", "1f1ee-1f1e8", "1f1f0-1f1fe", "1f1e8-1f1eb", "1f1f9-1f1e9", "1f1e8-1f1f1", "1f1e8-1f1f3", "1f1e8-1f1fd", "1f1e8-1f1e8", "1f1e8-1f1f4", "1f1f0-1f1f2", "1f1e8-1f1ec", "1f1e8-1f1e9", "1f1e8-1f1f0", "1f1e8-1f1f7", "1f1ed-1f1f7", "1f1e8-1f1fa", "1f1e8-1f1fc", "1f1e8-1f1fe", "1f1e8-1f1ff", "1f1e9-1f1f0", "1f1e9-1f1ef", "1f1e9-1f1f2", "1f1e9-1f1f4", "1f1ea-1f1e8", "1f1ea-1f1ec", "1f1f8-1f1fb", "1f1ec-1f1f6", "1f1ea-1f1f7", "1f1ea-1f1ea", "1f1ea-1f1f9", "1f1ea-1f1fa", "1f1eb-1f1f0", "1f1eb-1f1f4", "1f1eb-1f1ef", "1f1eb-1f1ee", "1f1eb-1f1f7", "1f1ec-1f1eb", "1f1f5-1f1eb", "1f1f9-1f1eb", "1f1ec-1f1e6", "1f1ec-1f1f2", "1f1ec-1f1ea", "1f1e9-1f1ea", "1f1ec-1f1ed", "1f1ec-1f1ee", "1f1ec-1f1f7", "1f1ec-1f1f1", "1f1ec-1f1e9", "1f1ec-1f1f5", "1f1ec-1f1fa", "1f1ec-1f1f9", "1f1ec-1f1ec", "1f1ec-1f1f3", "1f1ec-1f1fc", "1f1ec-1f1fe", "1f1ed-1f1f9", "1f1ed-1f1f3", "1f1ed-1f1f0", "1f1ed-1f1fa", "1f1ee-1f1f8", "1f1ee-1f1f3", "1f1ee-1f1e9", "1f1ee-1f1f7", "1f1ee-1f1f6", "1f1ee-1f1ea", "1f1ee-1f1f2", "1f1ee-1f1f1", "1f1ee-1f1f9", "1f1e8-1f1ee", "1f1ef-1f1f2", "1f1ef-1f1f5", "1f1ef-1f1ea", "1f1ef-1f1f4", "1f1f0-1f1ff", "1f1f0-1f1ea", "1f1f0-1f1ee", "1f1fd-1f1f0", "1f1f0-1f1fc", "1f1f0-1f1ec", "1f1f1-1f1e6", "1f1f1-1f1fb", "1f1f1-1f1e7", "1f1f1-1f1f8", "1f1f1-1f1f7", "1f1f1-1f1fe", "1f1f1-1f1ee", "1f1f1-1f1f9", "1f1f1-1f1fa", "1f1f2-1f1f4", "1f1f2-1f1f0", "1f1f2-1f1ec", "1f1f2-1f1fc", "1f1f2-1f1fe", "1f1f2-1f1fb", "1f1f2-1f1f1", "1f1f2-1f1f9", "1f1f2-1f1ed", "1f1f2-1f1f6", "1f1f2-1f1f7", "1f1f2-1f1fa", "1f1fe-1f1f9", "1f1f2-1f1fd", "1f1eb-1f1f2", "1f1f2-1f1e9", "1f1f2-1f1e8", "1f1f2-1f1f3", "1f1f2-1f1ea", "1f1f2-1f1f8", "1f1f2-1f1e6", "1f1f2-1f1ff", "1f1f2-1f1f2", "1f1f3-1f1e6", "1f1f3-1f1f7", "1f1f3-1f1f5", "1f1f3-1f1f1", "1f1f3-1f1e8", "1f1f3-1f1ff", "1f1f3-1f1ee", "1f1f3-1f1ea", "1f1f3-1f1ec", "1f1f3-1f1fa", "1f1f3-1f1eb", "1f1f2-1f1f5", "1f1f0-1f1f5", "1f1f3-1f1f4", "1f1f4-1f1f2", "1f1f5-1f1f0", "1f1f5-1f1fc", "1f1f5-1f1f8", "1f1f5-1f1e6", "1f1f5-1f1ec", "1f1f5-1f1fe", "1f1f5-1f1ea", "1f1f5-1f1ed", "1f1f5-1f1f3", "1f1f5-1f1f1", "1f1f5-1f1f9", "1f1f5-1f1f7", "1f1f6-1f1e6", "1f1f7-1f1ea", "1f1f7-1f1f4", "1f1f7-1f1fa", "1f1f7-1f1fc", "1f1e7-1f1f1", "1f1f8-1f1ed", "1f1f0-1f1f3", "1f1f1-1f1e8", "1f1f5-1f1f2", "1f1fb-1f1e8", "1f1fc-1f1f8", "1f1f8-1f1f2", "1f1f8-1f1f9", "1f1f8-1f1e6", "1f1f8-1f1f3", "1f1f7-1f1f8", "1f1f8-1f1e8", "1f1f8-1f1f1", "1f1f8-1f1ec", "1f1f8-1f1fd", "1f1f8-1f1f0", "1f1f8-1f1ee", "1f1f8-1f1e7", "1f1f8-1f1f4", "1f1ff-1f1e6", "1f1ec-1f1f8", "1f1f0-1f1f7", "1f1f8-1f1f8", "1f1ea-1f1f8", "1f1f1-1f1f0", "1f1f8-1f1e9", "1f1f8-1f1f7", "1f1f8-1f1ff", "1f1f8-1f1ea", "1f1e8-1f1ed", "1f1f8-1f1fe", "1f1f9-1f1fc", "1f1f9-1f1ef", "1f1f9-1f1ff", "1f1f9-1f1ed", "1f1f9-1f1f1", "1f1f9-1f1ec", "1f1f9-1f1f0", "1f1f9-1f1f4", "1f1f9-1f1f9", "1f1f9-1f1f3", "1f1f9-1f1f7", "1f1f9-1f1f2", "1f1f9-1f1e8", "1f1f9-1f1fb", "1f1fa-1f1ec", "1f1fa-1f1e6", "1f1e6-1f1ea", "1f1ec-1f1e7", "1f1fa-1f1f8", "1f1fb-1f1ee", "1f1fa-1f1fe", "1f1fa-1f1ff", "1f1fb-1f1fa", "1f1fb-1f1e6", "1f1fb-1f1ea", "1f1fb-1f1f3", "1f1fc-1f1eb", "1f1ea-1f1ed", "1f1fe-1f1ea", "1f1ff-1f1f2", "1f1ff-1f1fc"];
        addArrayOfButtons(flags);

        /*
        docent.emoji.parse($keyboard);
        */  
        $keyboard.append('<p>People</p>');
        
        var $diversitySwitcher = addButton('270b');
        $diversitySwitcher.addClass('docent-emoji-diversity-switcher').attr('data-value', 0);

        docent.emoji.$keyboard = $keyboard;
        return $keyboard;
    },
    setDiversity: function($keyboard, skinTone) {
        var skinTones = ['', '1f3fb', '1f3fc', '1f3fd', '1f3fe', '1f3ff'];
        
        if (typeof skinTone == 'number' && skinTone < skinTones.length) {
            skinTone = skinTones[skinTone];
        }
        else if (skinTones.indexOf(skinTone) == -1) {
            return false;
        }
        
        var diverse = ["1f64c", "1f44f", "1f44b", "1f44d", "1f44e", "1f44a", "270a", "270c", "1f44c", "270b", "1f450", "1f4aa", "1f64f", "261d", "1f446", "1f447", "1f448", "1f449", "1f590", "1f918", "1f596", "270d", "1f485", "1f442", "1f443", "1f476", "1f466", "1f467", "1f468", "1f469", "1f471", "1f474", "1f475", "1f472", "1f473", "1f46e", "1f477", "1f482", "1f575", "1f385", "1f47c", "1f478", "1f470", "1f6b6", "1f3c3", "1f483", "1f647", "1f481", "1f645", "1f646", "1f64b", "1f64e", "1f64d", "1f487", "1f486", "1f3c2", "1f6a3", "1f3ca", "1f3c4", "1f6c0", "26f9", "1f3cb", "1f6b4", "1f6b5", "1f3c7"];
        
        function applyChange($button, unicode) {
            var oldUnicode = $button.attr('data-unicode');
            var newUnicode = unicode;
            if (skinTone != '') {
                newUnicode += '-' + skinTone;
            }
            $button.attr('data-unicode', newUnicode);
            var $img = $button.children('img');
            $img.attr('src', $img.attr('src').replace(oldUnicode, newUnicode));
            $img.attr('alt', docent.emoji.getEmoji(newUnicode));
        }
        applyChange($('.docent-emoji-diversity-switcher'), '270b');
        for (var unicode of diverse) {
            var $button = $keyboard.children('button[data-unicode^="' + unicode + '"]').eq(0);
            applyChange($button, unicode);
        }
    },
    makeTooltip: function($contentEditable) {
        var $modal = $('<div>');
        var $tooltip = $('<div class="docent-emoji-tooltip">');
        var $input = $('<input>');
        $tooltip.append($input);
        $modal.append($tooltip);
        docent.emoji.emojiKeyboard($modal);
        $tooltip.css('height','');
        $('body').append($tooltip);
        $input.on('change', function(event) { 
            $contentEditable.focus();
            var html = docent.emoji.parse($input.val());
            var sel = document.getSelection();
            sel.removeAllRanges();
            sel.addRange(docent.emoji.__range);
            document.execCommand('insertHTML', null, html);
            $input.val('');
            delete docent.emoji.__range;
        });
        if (docent.emoji.search) {
            $('<div>', {
                class: 'docent-emoji-search',
                html: $('<input>', {
                    type: 'text'
                })
            })
            .on('input', 'input', function(event) {
                docent.emoji.search(this.value);
            })
            .on('click', function(event) {
                $(this).children('input').focus();
            })
            .appendTo($tooltip);
        }
        $tooltip.css($contentEditable.offset());
        $contentEditable.on('blur', function(event) {
            var sel = document.getSelection();
            docent.emoji.__range = sel.getRangeAt(0);
        });
        function handeClick(event) {
            var $target = $(event.target);
            if ($target.closest($().add($tooltip).add($contentEditable)).length == 0) {
                $tooltip.remove();
                $('body').off('click', handeClick);
            }
        };
        $('body').on('click', handeClick);
    },
    emojiKeyboard: function($modal) {
        var $dialog = $modal.children().eq(0);

        if (docent.emoji.$keyboard) {
            var $keyboard = docent.emoji.$keyboard;
            $keyboard.off('click', 'button').off('scroll');
            $keyboard.children('p').text('People');
            if (docent.emoji.search) {
                docent.emoji.search('');
            }
        }
        else {
            var $keyboard = docent.emoji.init();
        }

        $keyboard.on('click', '.docent-emoji-diversity-switcher', function(event) {
            var $this = $(this);
            var skinTone = Number($this.attr('data-value')) + 1;
            if (skinTone > 5) skinTone = 0;
            docent.emoji.setDiversity($keyboard, skinTone);
            $this.attr('data-value', skinTone);
            event.stopImmediatePropagation();
        })
        .on('click', 'button', function(event) {
            var $input = $dialog.children('input');
            var string = docent.emoji.getEmoji(this.dataset.unicode);
            docent.emoji.insertStringAtCaret($input, string);
            $input.change();
            event.preventDefault();
        })
        .on('scroll', function(event) {
            var stages = ['People', 'Nature', 'Food & Drink', 'Activity', 'Travel & Places', 'Objects', 'Symbols', 'Flags'];
            var index = 0;
            var scrollTop = $keyboard.scrollTop();
            var offsetTop = $keyboard.offset().top;
            $keyboard.children('br').each(function(i) {
                if ($(this).offset().top - offsetTop > - 15) return false;
                index = i+1;
            });
            $keyboard.children('p').html(stages[index]);
            $keyboard.next('.docent-emoji-controls').children('button').css('color', '').eq(index).css('color', '#3498DB');
        });

        $dialog.append($keyboard);
        docent.emoji.emojiControls($keyboard);
    },
    emojiControls: function($keyboard) {
        var $controls = $('<div>', {
            class: 'docent-emoji-controls'
        });
        $controls.on('click', 'button', function(event) {
            var $this = $(this);
            var index = $controls.children('button').index($this);
            var newScrollTop = 0;
            let $nextBreak = $keyboard.children('br').eq(index - 1);
            if (index > 0) {
                newScrollTop = $nextBreak.offset().top - $keyboard.offset().top + $keyboard.scrollTop() + 21;
            }
            $keyboard.animate({
                scrollTop: newScrollTop
            });
            $nextBreak.nextUntil('br').children('img').slice(0,18).attr('loading', 'eager');
        });
        function controlButton(icon, title) {
            $controls.append($('<button>', {
                class: 'docent-emoji-controls-button docent-fa fa-' + icon,
                title: title
            }));
        }
        controlButton('smile-o', 'People');
        controlButton('leaf', 'Nature');
        controlButton('cutlery', 'Food & Drink');
        controlButton('soccer-ball-o', 'Activity');
        controlButton('plane', 'Travel & Places');
        controlButton('lightbulb-o', 'Objects');
        controlButton('heart-o', 'Symbols');
        controlButton('flag-o', 'Flags');
        $controls.children('button').eq(0).css('color', '#3498DB');
        $keyboard.after($controls).parent();
    },
    insertStringAtCaret: function($input, string) {
        var input = $input[0];

        // IE Support
        if (document.selection) {
            input.focus();
            var sel = document.selection.createRange();
            sel.text = string;
            input.focus()
        }
        // Firefox and Webkit support
        else if (input.selectionStart || input.selectionStart == '0') {
            var startPosition = input.selectionStart;
            var endPosition = input.selectionEnd;
            var value = input.value;
            input.value = value.slice(0, startPosition) + string + value.slice(endPosition);
            input.focus();
            input.selectionStart = startPosition + string.length;
            input.selectionEnd = startPosition + string.length;
        }
        // Fallback
        else {
            input.value += string;
        }
    },
    getEmoji: function(string) {
        var emoji = '';
        var array = string.split('-');
        for (var unicode of array) {
            emoji += String.fromCodePoint(parseInt(unicode, 16));
        }
        return emoji;
    },
    parse: function($element) {
        var options = {
            folder: 'svg',
            ext: '.svg'
        };
        if ($element instanceof jQuery) {
            return $element.each(function() {
                twemoji.parse(this, options);
            });
        }
        else if (typeof $element == 'string') {
            return twemoji.parse($element, options);
        }
    }
};
