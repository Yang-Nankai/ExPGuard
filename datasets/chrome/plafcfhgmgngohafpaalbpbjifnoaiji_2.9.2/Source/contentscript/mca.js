console.log("xorkeesign India G2C MCA content script attached");

const PROVIDER_PASSWORD = "NotRequired";
const SEARCH_PASSWORD = "password";

const targetNode = document.getElementById('CertificateDetailsModal');

if(targetNode != null)
{
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
}