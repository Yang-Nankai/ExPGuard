angular.module('app.Maincontroller',[])
    .controller('mainController', mainController);
mainController.$inject = ['$scope', 'ngAudio', '$rootScope', '$mainService'];
function mainController($scope, ngAudio, $rootScope, $service) {
	$scope.fullData = [];
	$scope.listWord = [];
	$scope.listHist = [];
    $scope.listExample = [];

	// $scope.text = "Hãy sử dụng Mazii để bắt đầu học !";
    $scope.listTopSites = [];
    $scope.showTabSetting = 'tab1';
    $scope.showSetting = false;
    $scope.hideGuide = false;

	var loadData = function(){
        var clickFlash = localStorage.getItem('clickFlash');
        if(clickFlash && clickFlash == 1){
            $scope.hideGuide = true;
        }

        var settingFlashcard = JSON.parse(localStorage.getItem('setting-flashcard'));
        if(!settingFlashcard) {
            $scope.checkFront = {
                'audio' : true,
                'word'  : true,
                'mean'  : true,
                'phonetic' : true,
                'audio' : true
            }
        
            $scope.checkBack = {
                'audio' : true,
                'word'  : true,
                'mean'  : true,
                'phonetic' : true
            }

            localStorage.setItem('setting-flashcard', JSON.stringify({'front' : $scope.checkFront, 'back' : $scope.checkBack}));
        }else {
            $scope.checkFront = settingFlashcard.front;
            $scope.checkBack = settingFlashcard.back;

        }

		var fullData = JSON.parse(localStorage.getItem('markup'));
		if(fullData == null || fullData == undefined || fullData.length == 0){
            // $scope.textNotifi = false;
           var means1 = [];
           var means2 = [];
           var means3 = [];
           var example1 = [];
           var example2 =[];
           var example3 =[];
           var fullData = []; 

            example1.push({
                content:'単純な事実に、ただただ圧倒される。',
                mean :'Những sự thật giản đơn thường gây kinh ngạc'

            });
            example2.push({
                content :'大きな野望は偉大な人を育てる.',
                mean :'Khát vọng lớn làm nên người vĩ đại'
            });
            example3.push({
                content :'The most beautiful thing about learning is that no one take that away form you.',
                mean :'Điều tuyệt vời nhất của việc học hành là không ai có thể lấy nó đi khỏi bạn.'
            });
            

            means1.push({
                examples : example1,
                mean :'đơn giản, sự đơn giản'
            });
            means2.push({
                examples : example2,
                mean : 'tham vọng, khát vọng'
            });
            means3.push({
                examples : example3,
                mean : 'học tập'
            });
            fullData.push({
                means: means1,
                phonetic:'たんじゅん',
                word :'単純',
                lang :'vi',
                langFrom :'ja',
                idDefault : 1
            },
            {
                means : means2,
                phonetic : 'やぼう',
                word : '野望',
                lang : 'en',
                langFrom : 'ja',
                idDefault : 2
            },{
                means : means3,
                phonetic :'lərning',
                word : 'learning',
                lang :'en',
                langFrom :'ko',
                idDefault : 3
            });
			
		}

        $scope.totalWord = fullData.length;
        $scope.cover = true;
		for(var i = 0; i < $scope.totalWord; i++ ){
			if(fullData[i].means.length > 5){
				$scope.cover = false;
			}
			for( var j = 0; j < fullData[i].means.length ; j++){
				if(fullData[i].means[j].examples != null){
					for(var k = 0 ; k < fullData[i].means[j].examples.length ; k++){
						if($scope.listExample[i] != null){
							break;
						}
						$scope.listExample[i]=fullData[i].means[j].examples[k];
					}
				}
			}

			fullData[i].showDetail = isJapanese(fullData[i].word) && (fullData[i].lang == "vi" || fullData[i].lang =="en");
			$scope.listWord.push(fullData[i]);
            $scope.listWord[i].cvWord = true;
            $scope.listWord[i].cvWord3 = false;

            if($scope.listWord[i].word.length > 50){
                $scope.listWord[i].cvWord = false;
            }
        }

        var idActive = $scope.listWord[0].mobileId ? $scope.listWord[0].mobileId : $scope.listWord[0].word;
        setTimeout(function() {
            $('#flashcard .item.item-' + idActive).addClass('active');
        },200);

        $scope.converWord2 = function(str){
            if(str){
                if(str.length > 120){
                    str = str.slice(0, 119);
                    str+= ' ...';
                }
            return str; 
            }
        return null;
        }



		// history
		// var histData = JSON.parse(localStorage.getItem('key'));
		// if(histData == null || histData == undefined){
		// 	return;
		// }

		// $scope.totalHist = histData.length;
		// if($scope.totalHist > 12){
		// 	$scope.totalHist = 12;
		// }
		// for(var i = 0; i < $scope.totalHist; i++ ){
		// 	$scope.listHist.push(histData[i]);
		// }
		
	}
	loadData();

    setTimeout(function(){
        $('#search-input').focus();

    },3000);


	// audio
	
	function convertJptoHex(jp) {
    if (jp == null || jp == "") {
        return "";
    }
    
    if (jp.indexOf('「') != -1) {
        jp = jp.replace(new RegExp('「', 'g'), '');
        jp = jp.replace(new RegExp('」', 'g'), ''); 
    }
    
    jp = jp.trim();
    var result = '';
    
    for (var i = 0; i < jp.length; i++) {
        result += ("0000" + jp.charCodeAt(i).toString(16)).substr(-4);
        if (i != jp.length - 1) {
            result += "_";
        }
    }
    
    return result;


}
	
	$scope.playAudio = function($index){
        var text = $scope.listWord[$index].word;
		if(options.langFrom == "ja"){
			// Sử dụng API lấy audio cho tiếng Nhật
			var audioUrl = "https://hub.mazii.net/api/audio?text=" + encodeURIComponent(text);
		} else{
			var audioUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q="+ text +"&tl="+options.langFrom+"&total=1&idx=0&textlen=5&tk=547375.920718&client=t&prev=input";
		}
		new Audio(audioUrl).play();
	}
	


	$scope.deleteWord = function($index){

		$scope.list=[];
		$scope.listWord.splice($index,1);
	
        for (var i = 0; i < $scope.listWord.length; i++) {
            $scope.list.push($scope.listWord[i]);
        }
		localStorage.setItem('markup',JSON.stringify($scope.list));

	}	



	$scope.more = function($index,data){
		if(data.lang == "vi" && data.langFrom == "ja"){
			chrome.tabs.create({url: 'https://mazii.net/vi-VN/search/word/javi/' + data.word });
		}
		if(data.lang == "en" && data.langFrom == "ja"){
			chrome.tabs.create({url: 'https://mazii.net/en-US/search/word/jaen/' + data.word });
		}
	}

    //////////////////////////////

    $scope.flip = function (id) {
        $(".flip").toggleClass("flipped");
        localStorage.setItem('clickFlash', 1);
        $scope.hideGuide = true;
    }

    $scope.selectTab = function (value) {
        $scope.showTabSetting = value;
        $('.box-main .sl-tab').removeClass('active-tab');
        $('.box-main .btn-' + value).addClass('active-tab');
    }

    $scope.clickSetting = function () {
        $scope.showSetting = !$scope.showSetting;
        if(!$scope.showSetting) {
            localStorage.setItem('setting-flashcard', JSON.stringify({'front' : $scope.checkFront, 'back' : $scope.checkBack}));
        }
    }


    // Share, Rate

    function resetClickHandler(element, handler){
    	element.off('click');
		element.on('click',handler);
    }

    function hideMenu() {
        $('#click-Rate').fadeOut(200);
        $('#share_menu').fadeOut(200);
    }

	resetClickHandler($('#lnk_share'), function (e) {
        e.stopPropagation();
        $('#share_menu').toggle(200);
    });
    resetClickHandler($('#click-ShareFB'), function(){
        hideMenu();
        chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/"+chrome.runtime.id });
    });
    $scope.idchrome = chrome.runtime.id;
    resetClickHandler($('#click-ShareGG'), function(){
        hideMenu();
        chrome.tabs.create({url: "https://plus.google.com/share?url=https://chrome.google.com/webstore/detail/"+chrome.runtime.id });
    });
    resetClickHandler($('.share-fb'), function(){
        hideMenu();
        chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/"+chrome.runtime.id });
    });
    resetClickHandler($('.share-gg'), function(){
        hideMenu();
        chrome.tabs.create({url: "https://plus.google.com/share?url=https://chrome.google.com/webstore/detail/"+chrome.runtime.id });
    });



    $scope.ratingFunction = function() {
        chrome.tabs.create({url: "https://chrome.google.com/webstore/detail/"+chrome.runtime.id+"/reviews" });

    }


	// topsite

    // chrome.topSites.get(function(data){
    // 	var topSites  = _.filter(data, function(number,key) {
    //    	 	return key < 6
    //     });

    // 	$scope.$apply(function () {
    // 		$scope.topSites = topSites;
    // 	})

    // })

    // $scope.converHS = function(str){
	// 	if(str){
	// 		if(str.length > 16){
	// 			str = str.slice(0, 15);
	// 			str+= ' ...';
	// 		}
	// 	return str;	
	// 	}
	// 	return null;
	// }

	// $scope.DeleteFunction = function(){
 //        chrome.tabs.create({url: "chrome://settings/" });

	// }



	$scope.convertLang = function(){
		value = $("#language-selector").val();
    	newValue = $("#language-selector-from").val();
    	options.lang = newValue;
        options.langFrom = value;
        saveOptions(options);

        $("#language-selector").val(newValue);
        $("#language-selector-from").val(value);
    }

    $scope.Guide = function(){
        if(options.lang == 'vi'){
            openNewTab(chrome.runtime.getURL('guide.html'));
        }else{
            openNewTab(chrome.runtime.getURL('guide2.html'));
        }
    }
    $scope.removeScreen = function(){
        openNewTab(chrome.runtime.getURL('option.html'));
    }


    // search 
   
    
    var resultsLength = 0;
    var textBox = $('input#search-input');
    $scope.listSearch = [];
    $("#search-input").keyup(function (event) {
        var keyWord = $(this).val();

        $service.search(keyWord, function (response) {
            if ( response.status == 200 ) {
                $('#search-suggestion-pad').attr("style", "display: block !important");
                $scope.listSearch  = _.filter(response.data[1], function(number,key) {
                    return key < 5
                });
                resultsLength  = $scope.listSearch.length;
            } else {
                $scope.listSearch = [];
                $('#search-suggestion-pad').attr("style", "display: none !important");
            }
        });
        if (event.keyCode == 13) {
            $scope.redirect(keyWord)
        }
    });
    $("#search-input").keydown(function (event) {
        var keyCode = event.keyCode;
        if((keyCode!=38) && (keyCode!=40)){
        } else {
            if(keyCode==38){
                if(selectedRow!=-1){
                    document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "");
                }
                selectedRow--;
                if(selectedRow<0){
                    selectedRow = resultsLength-1;
                }
            }else{
                if(selectedRow!=-1){
                    document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "");
                }
                selectedRow++;
                if (selectedRow>=resultsLength){
                    selectedRow = 0;
                }
            }
            var row = document.getElementById("auto-suggest-row" + selectedRow);
            row.setAttribute("class", "selected");
            textBox.value = row.textContent;
        }
    });
   
    $scope.redirect = function (key) {
        window.location.href = "https://www.google.com/search?sourceid=chrome&ie=utf-8&oe=utf-8&aq=t&hl=en-US&q="+key;
    };
    $('body').click(function () {
        $('#search-suggestion-pad').attr("style", "display: none !important");
    });
 
}


