/*
	Deployment check list
	---------------------
	1. xorkeesign Live URL must be present in "manifest.json" and "bgdefines.js" file;
	1. Search for "test", "todo", "DEPLOY"
	2. Duplicate files are present in "webpage" folder. Validate whether the files are same.
*/

// const URL_XORKEESIGN = "https://xorkeesign.odysseytec.work/";	//DEPLOY
// const URL_XORKEESIGN = "https://xorkeesign.xorkee.net/";
const URL_XORKEESIGN = "https://xorkeesign.com/";

const EXTTYPE_OEM = "OEM";
const EXTTYPE_STANDARD = "Standard";

const USERAGENT = {browser: "chrome",extType:EXTTYPE_STANDARD};	//DEPLOY
if(chrome?.runtime?.getManifest) USERAGENT.version = chrome.runtime.getManifest().version;

const HEADER_XORKEESIGN = {"Accept": "application/json","Content-Type": "application/json"};

const URL_MCA_DIN = "https://www.mca.gov.in/bin/mca/foservicedinprefill?id=";

const RULEID = {
	EPF_REDIRECT:200
};

const XORKEE_REQUEST_TYPE = {
	REGISTERENCRDSC: "registerEncrDSC",
	DECRYPT: "decrypt"
};

const STORAGE_KEY = {
	loggedIn:"LoggedIn",
	identifySigner:"IdentifySigner",
	pan:"Pan",
	tabInfo:"TabInfo",
	xsSignerInfo:"XsSignerInfo",
	role:"Role",
	din:"Din",
	orgName:"OrgName",
	userName:"UserName",
	gstin:"Gstin",
	loginType:"LoginType",
	tanpan:"Tanpan",
	estId:"EstId",
	redirectRule:"RedirectRule",
	signatories:"Signatories",
	handle:"Handle",
	pageInfo:"PageInfo",
	redirectUrl:"RedirectUrl",
};

var TAB_ID; // In COO DGFT portal, Download initiated(jnpl file) tab Id is stored 