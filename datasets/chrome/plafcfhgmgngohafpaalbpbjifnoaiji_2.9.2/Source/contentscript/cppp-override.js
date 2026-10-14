console.log("CPPP | Web script deployed");

const XSMSG_CPPP_LOGIN = "cpppLogin";
const XSMSG_CPPP_REGISTER = "cpppRegister";
const XSMSG_CPPP_UPLOAD = "cpppUpload";
const XSMSG_CPPP_PDFSIG = "cpppPdfSig";
const XSMSG_CPPP_BIDSIG = "cpppBidSig";
const XSMSG_CPPP_DECRYPT = "cpppDecrypt";
const XSMSG_CPPP_AUCTION = "cpppAuctionSubmit";
const XSMSG_CPPP_FILE_SIGN = "cpppFileSign";


window.addEventListener("message", (event) => {
	console.log("Web Port Listener");
	console.log(event);
	
	if(event.source != window || event.data == undefined)
	{
		//we only accept messages from ourselves
		//so validate with the window handle and ensure the data is framed by the caller
		return;
	}
	else
	{
		try {
			var msg = event.data;
			if(msg.type == XSMSG_CPPP_UPLOAD || msg.type == XSMSG_CPPP_PDFSIG || msg.type == XSMSG_CPPP_FILE_SIGN)	//publisher
			{
				setFileName(msg.filename);
			}
			else if(msg.type == XSMSG_CPPP_BIDSIG)
			{
				bidFinished(true);
			}
			else if(msg.type == XSMSG_CPPP_DECRYPT)
			{
				decryptionFinished(msg.success);
			}
			else if(msg.type == XSMSG_CPPP_AUCTION)
			{
				auctionValues(msg.signature);
			}
			else
			{
				//as errors would be handled in contentscript, return success here always
				if(msg.code != undefined) uploadFinished(msg.success, msg.code);	//RegisterDSC
				else uploadFinished(msg.success);	//Login
			}
		} catch(e) {
			console.log(e);
		}
	}
	
});
