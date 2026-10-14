pdd_orders = {};
if(window.rawData){
	pdd_orders = window.rawData;
} 
window.postMessage({ type: 'PDD_ORDERS', data: pdd_orders}, '*');