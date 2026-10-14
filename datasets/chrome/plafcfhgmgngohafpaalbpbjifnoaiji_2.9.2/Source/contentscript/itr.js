console.log("xorkeesign India G2C ITR content script attached");

const PROVIDER_PASSWORD = "NotRequired";
const SEARCH_PASSWORD = "provider password";
const SEARCH_COMPONENT = "emsigner";

const targetNode = document.getElementById('maincontentid');

const observer = new MutationObserver(function(mutationsList, obs) {
	
	var i, msg, type, elem, attr, label, labels;
	
	labels = targetNode.getElementsByTagName("label");
	for(i=0; i<labels.length; i++)
	{
		label = labels[i].innerHTML.toLowerCase();
		//search all labels to identify the "Provider Password" or "emsigner" field label
		//we do this to either pre-fill the password field or select the checkbox by default
		if(label.indexOf(SEARCH_PASSWORD) != -1 || label.indexOf(SEARCH_COMPONENT) != -1)
		{
			//element id of the password field will be available in the "for" attribute of the "label" fields
			attr = labels[i].getAttribute("for");
			if(attr != undefined)
			{
				elem = document.getElementById(attr);
				if(elem != undefined && elem.tagName.toLowerCase() == "input" && elem.getAttribute("xsValue") != "true")
				{
					type = elem.type.toLowerCase();
					if(type == "checkbox")
					{
						xsSetComponentDownload(elem);
						elem.setAttribute("xsValue", "true");	//to avoid notified multiple times during page load
					}
					else if(type == "password" || type == "text")
					{
						if(elem.value.length == 0)
						{
							xsFillPassword(elem, PROVIDER_PASSWORD, true);
							elem.setAttribute("xsValue", "true");
						}
					}
				}
			}
		}
	}
	
});
//Start observing the target node for configured mutations
if(targetNode)
{
	//include "characterData" as we need to watch for changes to the text in the DOM
	//observer.observe(targetNode, { attributes: false, childList: true, subtree: true, characterData: true });
	observer.observe(targetNode, { subtree: true, characterData: true });
	//observer.disconnect();
}
//set angular input field value in vanila js	
function xsFillPassword(elem, value, blurflag)
{
	elem.value = value;
	elem.dispatchEvent(new Event('input'));
	if(blurflag==true) elem.dispatchEvent(new Event('blur')); 
}

//selecting a angular checkbox in vanila js
function xsSetComponentDownload(elem)
{
	if(elem) elem.parentElement.click();
}
