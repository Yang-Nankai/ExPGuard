console.log("xorkeesign India G2C DGFT content script attached");

const PROVIDER_PASSWORD = "NotRequired";
const SEARCH_PASSWORD = "providerPass";

const targetNode = document.getElementById('ContContent');

const observer = new MutationObserver(function(mutationsList, obs) {
	
	var _i, _input;
		
	_input = targetNode.getElementsByTagName("input");
	for(_i=0; _i<_input.length; _i++)
	{
		if(_input[_i].id == SEARCH_PASSWORD && _input[_i].value == "") 
		{
			_input[_i].value = PROVIDER_PASSWORD;
			break;
		}
	}
});
//Start observing the target node for configured mutations
if(targetNode)
{
	//include "characterData" as we need to watch for changes to the text in the DOM
	//observer.observe(targetNode, { attributes: false, childList: true, subtree: true, characterData: true });
	observer.observe(targetNode, { childList: true, subtree: true});
	//observer.disconnect();
}