function windowHeight() {
    // Standard browsers (Mozilla, Safari, etc.)
    if (self.innerHeight)
        return self.innerHeight;
    // IE 6
    if (document.documentElement && document.documentElement.clientHeight)
        return document.documentElement.clientHeight;
    // IE 5
    if (document.body)
        return document.body.clientHeight;
    // Just in case.
    return 0;
}
function windowWidth() {
    // Standard browsers (Mozilla, Safari, etc.)
    if (self.innerWidth)
        return self.innerWidth;
    // IE 6
    if (document.documentElement && document.documentElement.clientWidth)
        return document.documentElement.clientWidth;
    // IE 5
    if (document.body)
        return document.body.clientWidth;
    // Just in case.
    return 0;
}
$(function(){	
	var h = windowHeight();
	console.log(h);
	$('#myIframe').height(h);
})