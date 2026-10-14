isLogin1688 = '';
if(__GLOBAL_DADA && __GLOBAL_DADA.isLogin){
	isLogin1688 = __GLOBAL_DADA.isLogin;
}
//alert(isLogin1688);
buyerLoginId1688 = '';
if(isLogin1688 && __INIT_DATA && __INIT_DATA.globalData && __INIT_DATA.globalData.offerBaseInfo&& __INIT_DATA.globalData.offerBaseInfo.buyerLoginId){	
	buyerLoginId1688 = __INIT_DATA.globalData.offerBaseInfo.buyerLoginId;
}
//alert(buyerLoginId1688);
window.postMessage({ type: 'FROM_PAGE', isLogin1688: isLogin1688 , buyerLoginId1688: buyerLoginId1688 }, '*');