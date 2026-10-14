angular.module('main', [
    'ui.router',
    'ui.bootstrap',
    'app.Maincontroller',
    'ngAudio',
    'Service.Main',
])


.config(['$compileProvider','$httpProvider',
  function($compileProvider, $httpProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension|chrome-search):|data:image\/)/);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    $httpProvider.defaults.headers.post["Access-Control-Allow-Headers"] ="Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Origin";
    $httpProvider.useApplyAsync(true);
    
}])

.run(function () {


});
