//utility functions
function _abToStr(ab)
{
	var view = new DataView(ab);
	var str = "";
	for(var i=0; i<ab.byteLength; i++) str += String.fromCharCode(view.getUint8(i));
	return str;
}

function _isWhiteSpace(code)
{
	if(code == 0x09 || code == 0x0a || code == 0x0d || code == 0x20) return true;
	return false;
}

//actual interfaces
function ciTrim(fileAB, jsonFlag, mode)
{
	var view = new DataView(fileAB);
	var i = 0;
	var result = {};
	
	if(view.byteLength == 0)
	{
		result.status = "error";
		result.errorStr = "The file does not contain any data and cannot be signed.";
		return result;
	}
	
	while(i < view.byteLength)
	{
		if(!_isWhiteSpace(view.getUint8(i))) break;
		i++;
	}
	if(i == view.byteLength)
	{
		result.status = "error";
		result.errorStr = "The file cannot be signed as it contains only white space characters without any actual data.";
		return result;
	}
	start = i;
	
	i = view.byteLength-1;
	while(i >= 0)
	{
		if(!_isWhiteSpace(view.getUint8(i))) break;
		i--;
	}
	if(i < 0)
	{
		result.status = "error";
		result.errorStr = "The file cannot be signed as it contains only white space characters without any actual data.";
		return result;
	}
	end = i+1;
	
	if(jsonFlag === true)
	{
		var str = _abToStr(fileAB);
		var firstPt = str.indexOf('{');
		var lastPt = str.lastIndexOf('}');
		str = str.substring(start,end);
	
		if(str.indexOf("startSignature") != -1 || str.indexOf("startCertificate") != -1 || str.indexOf("signerVersion") != -1 || str.indexOf("digSign") != -1)
		{
			if(mode != undefined && mode == 'verification')
			{
				result.status = "success";
				result.buf = convertAB('get',str);
				convertAB('reset');
				return result;
			}
			else
			{
				result.status = "error";
				result.errorStr = "The file is already signed and cannot be signed again.";
				return result;
			}
		}
		else
		{
			result.status = "success";
			result.buf = convertAB('get',str);
			convertAB('reset');
			return result;
		}
		
	}
	else
	{
		//search the last 4KB to see whether this is already signed
		var str = _abToStr(fileAB.slice(-4096));
		if(str.indexOf("<START-SIGNATURE>") != -1 || str.indexOf("</START-SIGNATURE>") != -1 || str.indexOf("<START-CERTIFICATE>") != -1 || str.indexOf("</START-CERTIFICATE>") != -1)
		{
			result.status = "error";
			result.errorStr = "The file is already signed and cannot be signed again.";
			return result;
		}
		
		if(start == end)
		{
			result.status = "error";
			result.errorStr = "The file cannot be signed as it contains only white space characters without any actual data.";
			return result;
		}
		
		result.status = "success";
		result.buf = fileAB.slice(start, end);
		return result;
	}
}

function ciAppendSignature(trimAB, b64Sig, b64Cert, version)
{
	var output;
	output = _abToStr(trimAB);
	output += "\n<START-SIGNATURE>"+b64Sig+"</START-SIGNATURE>\n";
	output += "<START-CERTIFICATE>"+b64Cert+"</START-CERTIFICATE>\n";
	output += "<SIGNER-VERSION>"+version+"</SIGNER-VERSION>";
	return output;
}

function jsonAppendSign(fileBuff, signature, certificate)
{
	var signedEDI = ab2str(fileBuff);
	signedEDI = signedEDI.slice(0,signedEDI.lastIndexOf('}'));
	signedEDI+=',\n"digSign":\n{\n"startSignature":"'+signature+'",\n"startCertificate":"'+certificate+'",\n"signerVersion":"xorkeesign"\n}\n}';
	return signedEDI;
}

async function ciComputeDigest(data) {
	
	// Convert Uint8Array to SHA-256
    const sha256Hash = await crypto.subtle.digest('SHA-256', data);

    // Convert SHA-256 ArrayBuffer to Uint8Array
    const sha256Array = new Uint8Array(sha256Hash);

    // Convert Uint8Array to SHA-1
    const sha1Hash = await crypto.subtle.digest('SHA-1', sha256Array);

    // Convert SHA-1 ArrayBuffer to Uint8Array
    const sha1Array = new Uint8Array(sha1Hash);

    // Convert Uint8Array to Base64
    const base64String = btoa(String.fromCharCode(...sha1Array));

    return base64String;
}