const adobe_keys = [ {
  "key": "aamlh",
  "name": "Audience Manager Location Hint",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Audience Manager Location Hint (used in Experience Cloud Shared Profile integration)"
}, {
  "key": "aamb",
  "name": "Audience Manager Blob",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Audience Manager Blob (used in Experience Cloud Shared Profile integration)"
}, {
  "key": "aid",
  "name": "Analytics visitor ID",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Analytics visitor ID"
}, {
  "key": "AQB",
  "name": "Image Request Begin",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Indicates the beginning of an image request."
}, {
  "key": "AQE",
  "name": "Image Request End",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Indicates the end of an image request, meaning the request was not truncated."
}, {
  "key": "bh",
  "name": "Browser Height",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Browser Height",
  "description": "Browser window height (in pixels)"
}, {
  "key": "bw",
  "name": "Browser Width",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Browser Width",
  "description": "Browser window width (in pixels)"
}, {
  "key": "c",
  "name": "Color Quality",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Monitor Color Depths",
  "description": "Color quality (in bits)"
}, {
  "key": "c.[key]",
  "name": "Key-Value Pairs",
  "analytics_variable": "s.contextData\n\n",
  "report_populated": "None\n\n",
  "description": "Key-values pairs are specified in one of the following formats:\n\n<my.a>red</my.a>\n\nor:\n\n<my><a>red</a></my>\n\nEach of these examples result in a context data value of my.a = red. Multiple key-value pairs can be specified.\n\nIn the query string, this context data variable would appear as c.my.a=red\n\n"
}, {
  "key": "c_",
  "name": "Custom Tracking Variables", // c1-c75
  "analytics_variable": "s.prop1-s.prop75",
  "report_populated": "All Custom Traffic reports",
  "description": "Traffic variables used in custom traffic reporting. c1-c75"
}, {
  "key": "cc",
  "name": "Currency Type",
  "analytics_variable": "s.currencyCode",
  "report_populated": "None",
  "description": "The type of currency used on the site"
}, {
  "key": "cdp",
  "name": "Cookie Domain Periods",
  "analytics_variable": "s.cookieDomainPeriods",
  "report_populated": "None",
  "description": "Indicates the number of periods in a domain for cookie tracking; manually set."
}, {
  "key": "ce",
  "name": "Character Encoding",
  "analytics_variable": "s.charSet",
  "report_populated": "None",
  "description": "The character encoding of the image request"
}, {
  "key": "cl",
  "name": "Cookie Lifetime",
  "analytics_variable": "s.cookieLifetime (s_vi cookie lifetime in seconds)",
  "report_populated": "None",
  "description": "The lifetime of the visitor cookie."
}, {
  "key": "ch",
  "name": "Channel",
  "analytics_variable": "s.channel",
  "report_populated": "Site Content | Site Sections",
  "description": "The Site Sections variable used in traffic reporting"
}, {
  "key": "cp",
  "name": "Direct Interaction",
  "analytics_variable": "Hit Type",
  "report_populated": "Hit Type",
  "description": "Indicates whether the behavior is a result of direct interaction foreground or information the device is sending without direct interaction background."
}, {
  "key": "ct",
  "name": "Connection Type",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Connection Types",
  "description": "Connection Type (Modem, LAN, etc; can only populate in IE browsers)"
}, {
  "key": "D",
  "name": "Dynamic Variables",
  "analytics_variable": "dynamicVariablePrefix",
  "report_populated": "None",
  "description": "See Dynamic Variables."
}, {
  "key": "ev",
  "name": "Events",
  "analytics_variable": "s.events",
  "report_populated": "Site Traffic | Purchases, Shopping Cart, Custom Events",
  "description": "events or ev. The commerce and custom events that occurred on the page; used in conversion reports"
}, {
  "key": "events",
  "name": "Events",
  "analytics_variable": "s.events",
  "report_populated": "Site Traffic | Purchases, Shopping Cart, Custom Events",
  "description": "events or ev. The commerce and custom events that occurred on the page; used in conversion reports"
}, {
  "key": "g",
  "name": "URL",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "The current URL of the page, up to 255 bytes."
}, {
  "key": "-g",
  "name": "Split URL",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "URLs longer than 255 bytes are split, with the first 255 bytes appearing in the g parameter, with the remaining bytes appearing later in the query string in the -g= query parameter."
}, {
  "key": "h_",
  "name": "", // h1-h5
  "analytics_variable": "s.hier1-s.hier5",
  "report_populated": "Site Content | Hierarchy reports",
  "description": "Hierarchy variables; used in traffic reporting. h1-h5"
}, {
  "key": "hp",
  "name": "Home Page",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Visitor Home Page",
  "description": "Indicates if current page is browser's home page (Y or N; can only populate in IE browsers)"
}, {
  "key": "j",
  "name": "Javascript Version",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Javascript Version",
  "description": "Shows the current Javascript version installed (generally 1.x)"
}, {
  "key": "k",
  "name": "Cookies Supported",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Cookies",
  "description": "Are cookies supported in the browser (Y, N or U)"
}, {
  "key": "l_",
  "name": "Custom Conversion Variable", // l1-l3
  "analytics_variable": "s.list1-s.list3",
  "report_populated": "Custom Conversion",
  "description": "A delimited list of values that are passed into a variable, then reported as individual line items for reporting. l1-l3"
}, {
  "key": "mid",
  "name": "Experience Cloud Visitor ID",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Experience Cloud Visitor ID"
}, {
  "key": "ndh",
  "name": "Javascript Request",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Indicates whether the image request originated from JS file (1 or 0)"
}, {
  "key": "ns",
  "name": "Cookie Domain",
  "analytics_variable": "s.visitorNameSpace",
  "report_populated": "None",
  "description": "Specifies what domain the cookies are set on"
}, {
  "key": "oid",
  "name": "Object Identifier",
  "analytics_variable": "s.objectID",
  "report_populated": "Site Content | Links | ClickMap",
  "description": "Object identifier for last page; used in ClickMap"
}, {
  "key": "ot",
  "name": "Object Tag",
  "analytics_variable": "None",
  "report_populated": "Site Content | Links | ClickMap",
  "description": "Object tag name for last page; used in ClickMap"
}, {
  "key": "p",
  "name": "Plugins",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Netscape Plug-Ins",
  "description": "Semicolon delimited browser plug-in names"
}, {
  "key": "pageName",
  "name": "Page Name", // pageName (or gn)
  "analytics_variable": "s.pageName",
  "report_populated": "Site Content | Pages",
  "description": "The page's designated name in reporting. pageName (or gn)"
}, {
  "key": "gn",
  "name": "Page Name", // pageName (or gn)
  "analytics_variable": "s.pageName",
  "report_populated": "Site Content | Pages",
  "description": "The page's designated name in reporting. pageName (or gn)"
}, {
  "key": "pageType",
  "name": "Page Type",
  "analytics_variable": "s.pageType", // pageType (or gt)
  "report_populated": "Site Content | Pages Not Foun",
  "description": "Indicates whether it is a 404 page or not (Either 'error' or blank). pageType (or gt)"
}, {
  "key": "gt",
  "name": "Page Type",  // pageType (or gt)
  "analytics_variable": "s.pageType",
  "report_populated": "Site Content | Pages Not Foun",
  "description": "Indicates whether it is a 404 page or not (Either 'error' or blank). pageType (or gt)"
}, {
  "key": "pccr",
  "name": "PCCR",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Only occurs for new visitors; prevents infinite redirects (Always true)"
}, {
  "key": "pe",
  "name": "Link Type",
  "analytics_variable": "s.linkType",
  "report_populated": "Site Content | Links | Exit Links, File Downloads, Custom Links",
  "description": "Determines the type of custom link hit fired"
}, {
  "key": "pev1",
  "name": "Link URL",
  "analytics_variable": "None",
  "report_populated": "Site Content | Links | Exit Links, File Downloads, Custom Links",
  "description": "URL the custom link hit occurred on"
}, {
  "key": "pev2",
  "name": "Link Friendly Name",
  "analytics_variable": "None",
  "report_populated": "Site Content | Links | Exit Links, File Downloads, Custom Links",
  "description": "Custom link friendly name"
}, {
  "key": "pev3",
  "name": "Legacy Video Tracking",
  "analytics_variable": "None",
  "report_populated": "All video reports",
  "description": "Used to track milestones in legacy video reporting; deprecated with v15"
}, {
  "key": "pf",
  "name": "PF",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "For Adobe use only. Do not alter."
}, {
  "key": "pid",
  "name": "Page Identifier",
  "analytics_variable": "None",
  "report_populated": "Site Content | Links | ClickMap",
  "description": "Page identifier for last page; used in ClickMap"
}, {
  "key": "pidt",
  "name": "Page Identifier Type",
  "analytics_variable": "None",
  "report_populated": "Site Content | Links | ClickMap",
  "description": "Page identifier type for last page; used in ClickMap"
}, {
  "key": "products",
  "name": "Products", // products (or pl)
  "analytics_variable": "s.products",
  "report_populated": "Products | Products",
  "description": "Products variable used in conversion reporting. products (or pl)"
}, {
  "key": "pl",
  "name": "Products", // products (or pl)
  "analytics_variable": "s.products",
  "report_populated": "Products | Products",
  "description": "Products variable used in conversion reporting. products (or pl)"
}, {
  "key": "purchaseID",
  "name": "Purchase ID", // purchaseID (or pi)
  "analytics_variable": "s.purchaseID",
  "report_populated": "None",
  "description": "Used to deduplicate purchases, preventing revenue inflation. purchaseID (or pi)"
}, {
  "key": "pi",
  "name": "Purchase ID", // purchaseID (or pi)
  "analytics_variable": "s.purchaseID",
  "report_populated": "None",
  "description": "Used to deduplicate purchases, preventing revenue inflation. purchaseID (or pi)"
}, {
  "key": "r",
  "name": "Referrer",
  "analytics_variable": "s.referrer",
  "report_populated": "All traffic sources reports",
  "description": "Referring URL"
}, {
  "key": "s",
  "name": "Screen Resolution",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Monitor Resolutions",
  "description": "Screen resolution (width x height)"
}, {
  "key": "server",
  "name": "Server", // server (or sv)
  "analytics_variable": "s.server",
  "report_populated": "Site Content | Servers",
  "description": "The page's server; used in traffic reporting. server (or sv)"
}, {
  "key": "sv",
  "name": "Server", // server (or sv)
  "analytics_variable": "s.server",
  "report_populated": "Site Content | Servers",
  "description": "The page's server; used in traffic reporting. server (or sv)"
}, {
  "key": "state",
  "name": "State",
  "analytics_variable": "s.state",
  "report_populated": "Visitor Profile | Visitor State",
  "description": "Specifies the state as defined by the variable."
}, {
  "key": "t",
  "name": "Time",
  "analytics_variable": "(automatic, sent with every hit that does not have a custom timestamp)",
  "report_populated": "None",
  "description": "The t parameter is in the following format:\n\ndd/mm/yyyy hh:mm:ss D OFFSET\nWhere D is a number in the range 0-6 specifying the day of the week, and OFFSET represents:\n\noffset from GMT in hours * 60 * - 1\nFor example:\n\n23/09/2016 14:00:00 1 420\n"
}, {
  "key": "ts",
  "name": "Time Stamp",
  "analytics_variable": "timestamp\n\n",
  "report_populated": "None",
  "description": "The custom timestamp calculated and sent in with the hit. Typically used for offline tracking.\n\n"
}, {
  "key": "v",
  "name": "Java Enabled",
  "analytics_variable": "None",
  "report_populated": "Visitor Profile | Technology | Java",
  "description": "Java enabled (Y or N)"
}, {
  "key": "v0",
  "name": "Campaign Variable",
  "analytics_variable": "s.campaign",
  "report_populated": "Campaigns | Tracking Codes",
  "description": "The campaign variable used in conversion reporting"
}, {
  "key": "v_",
  "name": "Conversion Variable", // v1-v75
  "analytics_variable": "s.eVar1-s.eVar75",
  "report_populated": "All Custom Conversion reports",
  "description": "Conversion variables used in custom conversion reporting. v1-v75"
}, {
  "key": "vid",
  "name": "Visitor ID",
  "analytics_variable": "s.visitorID",
  "report_populated": "None",
  "description": "The visitor's unique ID as set in the visitorID variable."
}, {
  "key": "vmk",
  "name": "Visitor Migration Key",
  "analytics_variable": "s.vmk",
  "report_populated": "None",
  "description": "Visitor migration key; used to migrate from third-party to first-party cookies. Deprecated."
}, {
  "key": "vvp",
  "name": "Genesis Variable Provider",
  "analytics_variable": "s.variableProvider",
  "report_populated": "None",
  "description": "Used in Genesis integrations"
}, {
  "key": "xact",
  "name": "Transaction ID",
  "analytics_variable": "s.transactionID",
  "report_populated": "None",
  "description": "The transaction ID used to link online data to offline data"
}, {
  "key": "zip",
  "name": "ZIP or Postal Code",
  "analytics_variable": "s.zip",
  "report_populated": "Visitor Profile | Visitor ZIP/Postal Code",
  "description": "Determines the zip code as defined by the variable"
}, {
  "key": "/5/ (for mobile protocol) or /1/ (for non-mobile protocol) in the image request URL.",
  "name": "",
  "analytics_variable": "None",
  "report_populated": "None",
  "description": "Controls the order in which cookies and other methods are used to identify visitors.\n\n"
} ]
