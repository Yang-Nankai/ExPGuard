const ERROR_STD = "xorkeesign India G2C is unable to process your signature request now. Try again after some time.";
const ERROR_NOTREG = "You must register your DSC with xorkee. Visit www.odysseytec.com/index.php/downloads_india-g2c to download xorkee.";
const ERROR_PORTAL = "Invalid or no response from the website/portal. Try again after some time.";
const ERROR_INVALIDPDF = "The selected PDF file is either invalid or unsupported.";
const ERROR_INVALIDDOC = "The document is either invalid or unsupported.";
const FACILITY_UNSUPPORTED = "xorkeesign India G2C is yet to support signing in this portal. We are making our best efforts to include support at the earliest.<br><br>To sign without xorkeesign use the browser and the steps stipulated by the portal.";

const URL_SERVICE_ITR = "https://eportal.incometax.gov.in";
const URL_SERVICE_GST = "gst.gov.in";
const URL_SERVICE_MCA = "https://www.mca.gov.in/mcafoportal";
const URL_SERVICE_EPF = "https://unifiedportal-emp.epfindia.gov.in";
const URL_SERVICE_EPF_VERIFY_OTP = (URL_SERVICE_EPF+"/epfo/no-auth/otpBasedAuth/verifyOtp").toLowerCase();
const URL_SERVICE_TDS = "https://www.tdscpc.gov.in";
const URL_SERVICE_CPPP_GOV = ["procure", "tender", "defproc", "eauction", "eproc"];	//eprocurement portals under *.gov.in
const URL_SERVICE_CPPP_OTHERS = [	//eprocurement portals other than *.gov.in
	"https://eprocurebel.co.in",
    "https://eprocuregrse.co.in",
    "https://eprocuregsl.nic.in",
    "https://eprocurehsl.nic.in",
    "https://eprocuremdl.nic.in",
    "https://www.eprocuremidhani.nic.in",
    "https://eprocurentpc.nic.in",
    "https://iocletenders.nic.in",
    "https://coalindiatenders.nic.in",
    "https://cpcletenders.nic.in",
    "https://eprocurebhel.co.in",
    "https://etenders.chd.nic.in",
    "https://etenders.hry.nic.in",
    "https://etender.up.nic.in",
	"https://pmgsytenders",
];
const URL_SERVICE_MAHAONLINE = [
	"mahaonline.gov.in",
	"mahaitgov.in"
];

const URL_SERVICE_MCA_V3_REQ = "https://www.mca.gov.in";
const URL_SERVICE_MCA_V3 = "https://www.mca.gov.in/content/mca";
const URL_SERVICE_DGFT = "https://www.dgft.gov.in";
const URL_SERVICE_COO_DGFT = "https://coo.dgft.gov.in";
const URL_SERVICE_ICEGATE = "old.icegate.gov.in";
const URL_SERVICE_ICEGATE_NEW = "https://foservices.icegate.gov.in";
const URL_SERVICE_SHCIL_UAT = "https://digidocuat.stockholding.com";
const URL_SERVICE_SHCIL = "https://digidoc.stockholding.com";
const URL_SERVICE_IRCEP = "ircep.gov.in";
const URL_SERVICE_IREPS = "ireps.gov.in";
const URL_SERVICE_WBHS = "wbhealthscheme.gov.in";

const URL_POSTINSTALL = "https://www.odysseytec.com/xorkeesign-india-g2c/";

const SERVICENAME_UNKNOWN = "unknown";
const SERVICENAME_ITR = "itr";
const SERVICENAME_MCA = "mca";
const SERVICENAME_GST = "gst";
const SERVICENAME_EPF = "epf";
const SERVICENAME_TDS = "tds";
const SERVICENAME_CPPP = "cppp";
const SERVICENAME_MCA_V3 = "mcav3"; 
const SERVICENAME_DGFT = "dgft";
const SERVICENAME_COO_DGFT = "coo_dgft";
const SERVICENAME_ICEGATE = "icegate";
const SERVICENAME_ICEGATE_NEW = "icegate_new";
const SERVICENAME_MAHAIT = "mahait";
const SERVICENAME_SHCIL = "shcil_digidoc";
const SERVICENAME_IRCEP = "ircep";
const SERVICENAME_IREPS = "ireps";
const SERVICENAME_WBHS = "wbhs";

const COMPONENT = {
	EMB:"emb",
	CRIS:"cris",
};

const COMMON_CSS = ["/contentscript/xsg2cpopup.css"];
const COMMON_SCRIPTS = ["/common/defines.js", "/common/XSCUTILS.js", "/contentscript/CSUTILS.js", "/contentscript/contentscript.js", "/contentscript/xsg2cpopup.js"];
const CPPP_CSS = ["/contentscript/epuploadfiles.css"];
const CPPP_SCRIPTS = ["/contentscript/xsxls.js", "/contentscript/xsjos.js", "/contentscript/xsjar.js", "/contentscript/xshandle.js", "/common/B64.js", "/background/xorkeesign.js", "/contentscript/epuploadfiles.js", "/contentscript/cppp.js"];

const EMB_SCRIPTS = ["/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/webpage/xshandle.js", "/contentscript/webpage/xhr.js"];
const EMB_CSS = ["/contentscript/webpage/xsg2cpopup.css"];

const MAHAIT_SCRIPTS = ["/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/webpage/xshandle.js", "/contentscript/cmpdfv3.js", "/contentscript/webpage/mahaonline.js"];
const MAHAIT_CSS = ["/contentscript/webpage/xsg2cpopup.css"];

const SHCIL_SCRIPTS = ["/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/webpage/xshandle.js", "/contentscript/cmpdfv3.js", "/contentscript/shcil.js"];
const SHCIL_CSS = ["/contentscript/webpage/xsg2cpopup.css"];

const LANDING_PAGE = {
	ITR:"https://eportal.incometax.gov.in/iec/foservices/#/login",
	MCA1:"https://www.mca.gov.in/mcafoportal/showAssociateDSC.do",
	MCA2:"https://mca.gov.in/mcafoportal/showAssociateDSC.do",
	GST:"https://services.gst.gov.in/services/login",
	TDS:"https://www.tdscpc.gov.in/app/login.xhtml",
	EPF:"https://unifiedportal-emp.epfindia.gov.in/epfo/",
	MCAV3:"https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html",
	DGFT:"https://www.dgft.gov.in/CP/",
	DGFT2:"https://www.dgft.gov.in/CP/index.jsp",
	ICEGATE:"https://old.icegate.gov.in/iceLogin/loginAction",
	ICEGATE_NEW:"https://foservices.icegate.gov.in/#/login",
	COO_DGFT:"https://coo.dgft.gov.in/users/login",
	SHCIL_UAT:"https://digidocuat.stockholding.com/",
	SHCIL:"https://digidoc.stockholding.com/",
	WBHS:"https://www.wbhealthscheme.gov.in/Login/login_new.aspx",
};

const G2C_MSG = {
	ERROR_STD:"errorStd",
	GET_SIGNER:"getSigner",
	ENROLL_SIGN_PROMPT:"enrollSignPrompt",
	FREEPLAN_SIGN_PROMPT:"freePlanSignPrompt",
	SIGN_PROMPT:"signPrompt",
	ERROR_PROMPT:"errorPrompt",
	HIDE_PROMPT:"hidePrompt",
	REG_DSC:"regDsc",
	GET_SIGNATORIES:"getSignatories",
	GET_SIGNATURE:"getSignature",
	SET_INFO:"setInfo",
	CPPP_GET_SIGNER:"cpppGetSigner",
	CPPP_LOGIN:"cpppLogin",
	CPPP_REGISTER:"cpppRegister",
	CPPP_UPLOAD:"cpppUpload",
	CPPP_DOCSIG:"cpppDocSig",
	CPPP_PDFSIG:"cpppPdfSig",	//publisher
	CPPP_BIDSIG:"cpppBidSig",
	CPPP_DECRYPT:"cpppDecrypt",
	CPPP_AUCTION_SUBMIT:"cpppAuctionSubmit",
	GET_MESSAGE:"extGetMessage",
	REDIRECT_URL:"redirectUrl",
	GET_BULK_CONTEXT:"getBulkContext",
	BULK_PROCESS:"bulkProcess",
	GET_CERT_INFO:"getCertInfo",
	MAIN_SCRIPTS_LOADED:"mainScriptsLoaded",
	GET_REDIRECT_URL:"getRedirectUrl",
	TABS:"tabs",
	EPF_RELOAD_HOME:"epfReloadHome",
	GET_ENC_DSC:"getEncDSC",
	GET_DECRYPTED_DATA:"getDecryptedData",
	CPPP_FILE_SIGN:"cpppFileSign",
	DISPLAY_NOTIFICATION:"displayNotification",
};

const XS_ERRCODE = {
	NON_XORKEE:-1131,
	NON_XORKEE_HANDLE:-1044,
	XORKEE_NOT_REACHABLE:-1042,
	CERT_EXPIRED:-1050,
	TRIAL_EXPIRED:-1079,
	LIVE_EXPIRED:-1078,
	DIGEST_MISMATCH:-1167,
	SSL_PINNING:-1062,
	PAYLOAD_SIGNING:-1168,
	UNITS_UNAVAILABLE:-1158,
	UNITS_AVAILABLE:-1159,
	ENC_DSC_NOT_IN_TOKEN:-1171,
	ENC_DSC_NOT_IN_PC:-1172,
	INVALID_CONTEXT:-1148,
	INCOMPLETE_REQUEST:-3,
	MULTIPLE_HANDLE:-1132,
};

const G2C_ERR = {
	NO_USER_IDENTIFIER:[-2000, "Provide xorkee handle"],
	MULTIPLE_HANDLES:[-2001, "Multiple Handles"]
};

const BULK_PROCESS_TYPE = {
	DECRYPT:"decrypt",
	FINALIZE:"finalize",
};

const MCA_ROLE_NAME = {
	DIRECTOR: "Director",
	MANAGER: "Manager / Secretary",
	PROFESSIONAL: "Practicing Professional",
	REPRESENTATIVE: "Authorised Representative",
	NOFFICER: "Nodal Officer-IEPF",
	DNOFFICER: "Deputy Nodal Officer-IEPF",
};

const MCA_ROLE = {
	"1016": MCA_ROLE_NAME.DIRECTOR,
	"1053": MCA_ROLE_NAME.MANAGER,
	"1018": MCA_ROLE_NAME.PROFESSIONAL,
	"rep" : MCA_ROLE_NAME.REPRESENTATIVE,
	"1055": MCA_ROLE_NAME.NOFFICER,
	"1056": MCA_ROLE_NAME.DNOFFICER,
};

const SET_INFO = {
	FACILITY_UNSUPPORTED:"facilityUnsupported",
};

const SIGNATURE_TYPE = {
	REGISTERDSC:"registerDSC",
	PKCS7:"pkcs7",
	RAW:"raw",
	LOGIN:"login",
	DOCSIG:"docSign",
	BIDSIG:"bidSign",
	AUCTION:"auction",
};

class otlCrisRequest {
	
	ACTIONS = {
		SIGN:"sign",
		PDFSIGN:"pdfsign",
		ASYMMETRIC_ENCRYPT:"asymmetric_encrypt",
		ASYMMETRIC_DECRYPT:"asymmetric_decrypt",
		ENCRYPT:"encrypt",
		DECRYPT:"decrypt",
		DECRYPT_DATA:"decrypt_data",
		OTHER_CER:"othercer",
		BROWSE_FORM:"browseform",
	}
		
	SIGN_ACTION = {
		TYPE1:"1",
		TYPE2:"2",
	}
		
	CERT_TYPE = {
		ALL:"ALL",
		DS:"DS",
		EN:"EN",
	}
	
	SIGNATURE_TYPE = {
		ATTACHED:"attached",
		DETACHED:"detached"
	}
	
	FILE_ACTION = {
		WRITE:"write",
	}
	
	IS_ENCRYPT = {
		Y:"Y",
		N:"N",
	}
	
	constructor(p) {
		
		if(!p) p = "";
		
		p = p.slice(0, -9); // remove completed string
		p = this.extractPayload(p);
		
		console.log("WSS payload:", p);
		
		this.action = p.action;
		this.tbs = p.tbs;
		this.signaturetype = p.signaturetype;
		this.certtype = p.certtype;
		this.reason = p.reason;
		this.location = p.location;
		this.coordinate = (p.coordinate && p.coordinate.indexOf(",")!== -1)?p.coordinate.split(","):[];
		this.pageNo = p.pageNo;
		this.certPubKey = p.certPubKey;
		this.concatenator = p.concatenator;
		this.filename = p.filename;
		this.signaction = p.signaction;
		this.dec_key = p.dec_key;
		this.encdata = p.encdata;
		this.encData = p.encData;
		this.encryptedsymkeys = p.encryptedsymkeys;
		this.fileaction = p.fileaction;
		this.data = p.data;
		this.isEncrypt = p.isEncrypt;
		this.fileaction = p.fileaction;
		this.pagination = p.pagination;
	}
	
	extractPayload(payload) {
		
		var itm, rv = {}, si;
		var pl = payload.split("\n");
		for(var i=0; i<pl.length; i++)
		{
			si = pl[i].indexOf("=");
			if(si !== -1) rv[pl[i].substring(0,si)] = pl[i].substring(si+1);
		}
		return rv;
	}
		
	serialize() {
		
		return JSON.stringify({
			action:this.action,
			signaturetype:this.signaturetype,
			certtype:this.certtype,
			certPubKey:this.certPubKey,
		});
	}
	
	deserialize(str) {
		
		var obj = {};
		
		try {
			obj = JSON.parse(str);
		}
		catch(e) {
			console.log(e);
		};
		
		this.action = obj.action;
		this.signaturetype = obj.signaturetype;
		this.certtype = obj.certtype;
		this.certPubKey = obj.certPubKey;
	}
}

class otlCrisResponse {
	
	SIGN_CANCEL = "signing canceled\ncompleted";
	SEND_MORE = "sendmore";
	
	constructor() {
		
		this.signature = null;
		this.publickey = null;
		this.publicKey = null;
		this.commonname = null;
		this.serailnumber = null;
		this.issuercommonname = null;
		this.expirydate = null;
		this.keyusage = null;
		this.thumbPrint = null;
		this.organization = null;
		this.certificateclass = null;
		this.subjectDN = null;
		this.totalPage = null;
		this.signedByteLength = null;
		this.originalByteLength = null;
		this.filename = null;
		this.encData = null;
		this.encKeys = null;
		this.keys = null;
		this.decryptedData = null;
		this.decrypteData = null;
		this.decKeys = null;
		this.directory = null;
	}
	
	removeZero(serialNo) {
		
		if(!serialNo) return serialNo;
		
		var sno = "";
		for(var i=0; i<serialNo.length; i++)
		{
			if(serialNo.charAt(i) != "0") break;
		}
		return serialNo.substring(i);
	}
	
	convertTo12hrs(t) {
		return t % 12 || 12;
	}
		
	formatExpiryDate() {
		
		if(!this.expirydate) return;
		
		var d = new Date(this.expirydate*1000);
	
		this.expirydate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${this.convertTo12hrs(d.getHours()).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
	}
	
	formatExpiryDate2() {
		
		if(!this.expirydate) return;
		
		var d = new Date(this.expirydate*1000);
		
		const mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
		this.expirydate = `${d.getDate()} ${mon[d.getMonth()]}, ${d.getFullYear()} ${this.convertTo12hrs(d.getHours())}:${d.getMinutes()}:${d.getSeconds()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
	}
	
	setOrg() {
		
		if(!this.subjectDN) return;
		
		var s = this.subjectDN.indexOf("O=")+2;
		var e = this.subjectDN.indexOf(",", s);
		
		this.organization = this.subjectDN.substring(s,e);
	}
	
	get sign() {
		
		this.formatExpiryDate();
		this.setOrg();
		this.serailnumber = this.removeZero(this.serailnumber);
		
		return `signature=${this.signature}\npublickey=${this.publickey}\ncommonname=${this.commonname}\nserailnumber=${this.serailnumber}\nIssuercommonname=${this.issuercommonname}\nnSubjectDN=${this.subjectDN}\nexpirydate=${this.expirydate}\nkeyusage=${this.keyusage}\nThumbPrint =${this.thumbPrint}\norganization=${this.organization}\ncertificateclass=${this.certificateclass}\ncompleted`;
	}
	
	get pdfsign() {
		
		this.formatExpiryDate2();
		this.setOrg();
		
		if(this.signature) return `signature= ${this.signature}\nCommon name= ${this.commonname}\nSerail No= ${this.serailnumber}\nSubject DN= ${this.subjectDN}\nExpiry Date= ${this.expirydate}\nThumbprint= ${this.thumbPrint}\nKeyusage= ${this.keyusage}\nTotalPages= ${this.totalPage}\nSignedByteLength= ${this.signedByteLength}\nOriginalByteLength= ${this.originalByteLength}\nFileName=${this.filename}\ncompleted`;
		else return this.SIGN_CANCEL;
	}
	
	get asymmetric_encrypt() {
		
		this.formatExpiryDate2();
		this.setOrg();
		
		return `encData =${this.encData}\ncommonname=${this.commonname}\nserailnumber=${this.serailnumber}\nIssuercommonname=${this.issuercommonname}\nnSubjectDN=${this.subjectDN}\nexpirydate=${this.expirydate}\nkeyusage=${this.keyusage}\nThumbPrint =${this.thumbPrint}\norganization=${this.organization}\ncertificateclass=${this.certificateclass}\ncompleted`;
	}
	
	get asymmetric_decrypt() {
		
		this.formatExpiryDate();
		this.serailnumber = this.removeZero(this.serailnumber);
		
		return `signature =${this.signature}\ndecrypteData =${this.decrypteData}\ncommonname =${this.commonname}\nserailnumber =${this.serailnumber}\nIssuercommonname =${this.issuercommonname}\nnSubjectDN =${this.subjectDN}\nexpirydate =${this.expirydate}\nkeyusage =${this.keyusage}\nThumbPrint =${this.thumbPrint}\ncompleted`;
	}
	
	get encrypt() {
		
		this.formatExpiryDate2();
		
		return `\nencData=${this.encData}\nencKeys =${this.encKeys}\nkeys=${this.keys}\ncommonname=${this.commonname}\nserailnumber=${this.serailnumber}\nIssuercommonname=${this.issuercommonname}\nnSubjectDN=${this.subjectDN}\nexpirydate=${this.expirydate}\nkeyusage=${this.keyusage}\nThumbPrint =${this.thumbPrint}\ncompleted`;
	}
	
	get decrypt() {
		
		this.formatExpiryDate();
		this.serailnumber = this.removeZero(this.serailnumber);
		
		return `signature=${this.signature}\ndecKeys=${this.decKeys}\ncommonname=${this.commonname}\nserailnumber=${this.serailnumber}\nIssuercommonname=${this.issuercommonname}\nnSubjectDN=${this.subjectDN}\nexpirydate=${this.expirydate}\nkeyusage=${this.keyusage}\nThumbPrint =${this.thumbPrint}\ncompleted`;
	}
	
	get decryptData() {
		
		if(this.decryptedData) return `decryptedData=${this.decryptedData}\ncompleted`;
		else return `decryptedData=\ncompleted`;
	}
	
	get othercer() {
		
		return `publicKey =${this.publicKey}\norganization=${this.organization}\ncertificateclass=${this.certificateclass}\ncompleted`;
	}
	
	get browseform() {
		
		if(this.directory) return `OK|${this.directory}\ncompleted`;
		else return `\ncompleted`;
	}
	
}