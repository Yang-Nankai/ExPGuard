const ga_keys = [ {
    key: "v",
    description: "The Protocol version. The current value is '1'. This will only change when there are changes made that are not backwards compatible.",
    required: "Required for all hit types.",
    name: "Protocol Version"
  }, {
    key: "tid",
    description: "The tracking ID / web property ID. The format is UA-XXXX-Y. All collected data is associated by this ID.",
    required: "Required for all hit types.",
    name: "Tracking ID / Web Property ID"
  }, {
    key: "aip",
    description: "When present, the IP address of the sender will be anonymized. For example, the IP will be anonymized if any of the following parameters are present in the payload: &aip=, &aip=0, or &aip=1",
    required: "Optional.",
    name: "Anonymize IP"
  }, {
    key: "ds",
    description: "Indicates the data source of the hit. Hits sent from analytics.js will have data source set to 'web'; hits sent from one of the mobile SDKs will have data source set to 'app'.",
    required: "Optional.",
    name: "Data Source"
  }, {
    key: "qt",
    description: "Used to collect offline / latent hits. The value represents the time delta (in milliseconds) between when the hit being reported occurred and the time the hit was sent. The value must be greater than or equal to 0. Values greater than four hours may lead to hits not being processed.",
    required: "Optional.",
    name: "Queue Time"
  }, {
    key: "z",
    description: "Used to send a random number in GET requests to ensure browsers and proxies don't cache hits. It should be sent as the final parameter of the request since we've seen some 3rd party internet filtering software add additional parameters to HTTP requests incorrectly. This value is not used in reporting.",
    required: "Optional.",
    name: "Cache Buster"
  }, {
    key: "cid",
    description: `This field is required if User ID (uid) is not specified in the request. This anonymously identifies a particular user, device, or browser instance. For the web, this is generally stored as a first-party cookie (_ga) with a two-year expiration. For mobile apps, this is randomly generated for each particular instance of an application install. The value of this field should be a random UUID (version 4) as described in https://www.ietf.org/rfc/rfc4122.txt.`,
    required: "Optional.",
    name: "Client ID"
  }, {
    key: "uid",
    description: "This field is required if Client ID (cid) is not specified in the request. This is intended to be a known identifier for a user provided by the site owner/tracking library user. It must not itself be PII (personally identifiable information). The value should never be persisted in GA cookies or other Analytics provided storage.",
    required: "Optional.",
    name: "User ID"
  }, {
    key: "sc",
    description: "Used to control the session duration. A value of 'start' forces a new session to start with this hit and 'end' forces the current session to end with this hit. All other values are ignored.",
    required: "Optional.",
    name: "Session Control"
  }, {
    key: "uip",
    description: "The IP address of the user. This should be a valid IP address in IPv4 or IPv6 format. It will always be anonymized just as though &aip (anonymize IP) had been used.",
    required: "Optional.",
    name: "IP Override"
  }, {
    key: "ua",
    description: "The User Agent of the browser. Note that Google has libraries to identify real user agents. Hand crafting your own agent could break at any time.",
    required: "Optional.",
    name: "User Agent Override"
  }, {
    key: "geoid",
    description: "The geographical location of the user. The geographical ID should be a two letter country code or a criteria ID representing a city or region (see https://developers.google.com/analytics/devguides/collection/protocol/v1/geoid). This parameter takes precedent over any location derived from IP address, including the IP Override parameter. An invalid code will result in geographical dimensions to be set to '(not set)'.",
    required: "Optional.",
    name: "Geographical Override"
  }, {
    key: "dr",
    description: "Specifies which referral source brought traffic to a website. This value is also used to compute the traffic source. The format of this value is a URL.",
    required: "Optional.",
    name: "Document Referrer"
  }, {
    key: "cn",
    description: "Specifies the campaign name.",
    required: "Optional.",
    name: "Campaign Name"
  }, {
    key: "cs",
    description: "Specifies the campaign source.",
    required: "Optional.",
    name: "Campaign Source"
  }, {
    key: "cm",
    description: "Specifies the campaign medium.",
    required: "Optional.",
    name: "Campaign Medium"
  }, {
    key: "ck",
    description: "Specifies the campaign keyword.",
    required: "Optional.",
    name: "Campaign Keyword"
  }, {
    key: "cc",
    description: "Specifies the campaign content.",
    required: "Optional.",
    name: "Campaign Content"
  }, {
    key: "ci",
    description: "Specifies the campaign ID.",
    required: "Optional.",
    name: "Campaign ID"
  }, {
    key: "gclid",
    description: "Specifies the Google AdWords Id.",
    required: "Optional.",
    name: "Google AdWords ID"
  }, {
    key: "dclid",
    description: "Specifies the Google Display Ads Id.",
    required: "Optional.",
    name: "Google Display Ads ID"
  }, {
    key: "sr",
    description: "Specifies the screen resolution.",
    required: "Optional.",
    name: "Screen Resolution"
  }, {
    key: "vp",
    description: "Specifies the viewable area of the browser / device.",
    required: "Optional.",
    name: "Viewport size"
  }, {
    key: "de",
    description: "Specifies the character set used to encode the page / document.",
    required: "Optional.",
    name: "Document Encoding"
  }, {
    key: "sd",
    description: "Specifies the screen color depth.",
    required: "Optional.",
    name: "Screen Colors"
  }, {
    key: "ul",
    description: "Specifies the language.",
    required: "Optional.",
    name: "User Language"
  }, {
    key: "je",
    description: "Specifies whether Java was enabled.",
    required: "Optional.",
    name: "Java Enabled"
  }, {
    key: "fl",
    description: "Specifies the flash version.",
    required: "Optional.",
    name: "Flash Version"
  }, {
    key: "t",
    description: "The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.",
    required: "Required for all hit types.",
    name: "Hit type"
  }, {
    key: "ni",
    description: "Specifies that a hit be considered non-interactive.",
    required: "Optional.",
    name: "Non-Interaction Hit"
  }, {
    key: "dl",
    description: "Use this parameter to send the full URL (document location) of the page on which content resides. You can use the &dh and &dp parameters to override the hostname and path + query portions of the document location, accordingly. The JavaScript clients determine this parameter using the concatenation of the document.location.origin + document.location.pathname + document.location.search browser parameters. Be sure to remove any user authentication or other private information from the URL if present. For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid.",
    required: "Optional.",
    name: "Document location URL"
  }, {
    key: "dh",
    description: "Specifies the hostname from which content was hosted.",
    required: "Optional.",
    name: "Document Host Name"
  }, {
    key: "dp",
    description: "The path portion of the page URL. Should begin with '/'. For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid.",
    required: "Optional.",
    name: "Document Path"
  }, {
    key: "dt",
    description: "The title of the page / document.",
    required: "Optional.",
    name: "Document Title"
  }, {
    key: "cd",
    description: "This parameter is optional on web properties, and required on mobile properties for screenview hits, where it is used for the 'Screen Name' of the screenview hit. On web properties this will default to the unique URL of the page by either using the &dl parameter as-is or assembling it from &dh and &dp.",
    required: "Required for screenview hit type.",
    name: "Screen Name"
  }, {
    key: "cg_",
    description: "You can have up to 5 content groupings, each of which has an associated index between 1 and 5, inclusive. Each content grouping can have up to 100 content groups. The value of a content group is hierarchical text delimited by '/\". All leading and trailing slashes will be removed and any repeated slashes will be reduced to a single slash. For example, '/a//b/' will be converted to 'a/b'.",
    required: "Optional.",
    name: "Content Group"
  }, {
    key: "linkid",
    description: "The ID of a clicked DOM element, used to disambiguate multiple links to the same URL in In-Page Analytics reports when Enhanced Link Attribution is enabled for the property.",
    required: "Optional.",
    name: "Link ID"
  }, {
    key: "an",
    description: "Specifies the application name. This field is required for any hit that has app related data (i.e., app version, app ID, or app installer ID). For hits sent to web properties, this field is optional.",
    required: "Optional.",
    name: "Application Name"
  }, {
    key: "aid",
    description: "Application identifier.",
    required: "Optional.",
    name: "Application ID"
  }, {
    key: "av",
    description: "Specifies the application version.",
    required: "Optional.",
    name: "Application Version"
  }, {
    key: "aiid",
    description: "Application installer identifier.",
    required: "Optional.",
    name: "Application Installer ID"
  }, {
    key: "ec",
    description: "Specifies the event category. Must not be empty.",
    required: "Required for event hit type.",
    name: "Event Category"
  }, {
    key: "ea",
    description: "Specifies the event action. Must not be empty.",
    required: "Required for event hit type.",
    name: "Event Action"
  }, {
    key: "el",
    description: "Specifies the event label.",
    required: "Optional.",
    name: "Event Label"
  }, {
    key: "ev",
    description: "Specifies the event value. Values must be non-negative.",
    required: "Optional.",
    name: "Event Value"
  }, {
    key: "ti",
    description: "A unique identifier for the transaction. This value should be the same for both the Transaction hit and Items hits associated to the particular transaction.",
    required: "Required for transaction hit type. \nRequired for item hit type.",
    name: "Transaction ID"
  }, {
    key: "ta",
    description: "Specifies the affiliation or store name.",
    required: "Optional.",
    name: "Transaction Affiliation"
  }, {
    key: "tr",
    description: "Specifies the total revenue associated with the transaction. This value should include any shipping or tax costs.",
    required: "Optional.",
    name: "Transaction Revenue"
  }, {
    key: "ts",
    description: "Specifies the total shipping cost of the transaction.",
    required: "Optional.",
    name: "Transaction Shipping"
  }, {
    key: "tt",
    description: "Specifies the total tax of the transaction.",
    required: "Optional.",
    name: "Transaction Tax"
  }, {
    key: "in",
    description: "Specifies the item name.",
    required: "Required for item hit type.",
    name: "Item Name"
  }, {
    key: "ip",
    description: "Specifies the price for a single item / unit.",
    required: "Optional.",
    name: "Item Price"
  }, {
    key: "iq",
    description: "Specifies the number of items purchased.",
    required: "Optional.",
    name: "Item Quantity"
  }, {
    key: "ic",
    description: "Specifies the SKU or item code.",
    required: "Optional.",
    name: "Item Code"
  }, {
    key: "iv",
    description: "Specifies the category that the item belongs to.",
    required: "Optional.",
    name: "Item Category"
  }, {
    key: "pr_id",
    description: "The SKU of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product SKU"
  }, {
    key: "pr_nm",
    description: "The name of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Name"
  }, {
    key: "pr_br",
    description: "The brand associated with the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Brand"
  }, {
    key: "pr_ca",
    description: "The category to which the product belongs. Product index must be a positive integer between 1 and 200, inclusive. The product category parameter can be hierarchical. Use / as a delimiter to specify up to 5-levels of hierarchy. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Category"
  }, {
    key: "pr_va",
    description: "The variant of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Variant"
  }, {
    key: "pr_pr",
    description: "The unit price of a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Price"
  }, {
    key: "pr_qt",
    description: "The quantity of a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Quantity"
  }, {
    key: "pr_cc",
    description: "The coupon code associated with a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Coupon Code"
  }, {
    key: "pr_ps",
    description: "The product's position in a list or collection. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Position"
  }, {
    key: "pr_cd_",
    description: "A product-level custom dimension where dimension index is a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Custom Dimension"
  }, {
    key: "pr_cm_",
    description: "A product-level custom metric where metric index is a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Custom Metric"
  }, {
    key: "pa",
    description: "The role of the products included in a hit. If a product action is not specified, all product definitions included with the hit will be ignored. Must be one of: detail, click, add, remove, checkout, checkout_option, purchase, refund. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Action"
  }, {
    key: "ti",
    description: "The transaction ID. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Transaction ID"
  }, {
    key: "ta",
    description: "The store or affiliation from which this transaction occurred. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Affiliation"
  }, {
    key: "tr",
    description: "The total value of the transaction, including tax and shipping. If not sent, this value will be automatically calculated using the product quantity and price fields of all products in the same hit. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Revenue"
  }, {
    key: "tt",
    description: "The total tax associated with the transaction. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Tax"
  }, {
    key: "ts",
    description: "The shipping cost associated with the transaction. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Shipping"
  }, {
    key: "tcc",
    description: "The transaction coupon redeemed with the transaction. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Coupon Code"
  }, {
    key: "pal",
    description: "The list or collection from which a product action occurred. This is an additional parameter that can be sent when Product Action is set to 'detail' or 'click'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Action List"
  }, {
    key: "cos",
    description: "The step number in a checkout funnel. This is an additional parameter that can be sent when Product Action is set to 'checkout'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Checkout Step"
  }, {
    key: "col",
    description: "Additional information about a checkout step. This is an additional parameter that can be sent when Product Action is set to 'checkout'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Checkout Step Option"
  }, {
    key: "il_nm",
    description: "The list or collection to which a product belongs. Impression List index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression List Name"
  }, {
    key: "il_pi_id",
    description: "The product ID or SKU. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression SKU"
  }, {
    key: "il_pi_nm",
    description: "The name of the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Name"
  }, {
    key: "il_pi_br",
    description: "The brand associated with the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Brand"
  }, {
    key: "il_pi_ca",
    description: "The category to which the product belongs. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Category"
  }, {
    key: "il_pi_va",
    description: "The variant of the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Variant"
  }, {
    key: "il_pi_ps",
    description: "The product's position in a list or collection. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Position"
  }, {
    key: "il_pi_pr",
    description: "The price of a product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Price"
  }, {
    key: "il_pi_cd_",
    description: "A product-level custom dimension where dimension index is a positive integer between 1 and 200, inclusive. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Custom Dimension"
  }, {
    key: "il_pi_cm_",
    description: "A product-level custom metric where metric index is a positive integer between 1 and 200, inclusive. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Product Impression Custom Metric"
  }, {
    key: "promo_id",
    description: "The promotion ID. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Promotion ID"
  }, {
    key: "promo_nm",
    description: "The name of the promotion. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Promotion Name"
  }, {
    key: "promo_cr",
    description: "The creative associated with the promotion. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Promotion Creative"
  }, {
    key: "promo_ps",
    description: "The position of the creative. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Promotion Position"
  }, {
    key: "promoa",
    description: "Specifies the role of the promotions included in a hit. If a promotion action is not specified, the default promotion action, 'view', is assumed. To measure a user click on a promotion set this to 'promo_click'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.",
    required: "Optional.",
    name: "Promotion Action"
  }, {
    key: "cu",
    description: "When present indicates the local currency for all transaction currency values. Value should be a valid ISO 4217 currency code.",
    required: "Optional.",
    name: "Currency Code"
  }, {
    key: "sn",
    description: "Specifies the social network, for example Facebook or Google Plus.",
    required: "Required for social hit type.",
    name: "Social Network"
  }, {
    key: "sa",
    description: "Specifies the social interaction action. For example on Google Plus when a user clicks the +1 button, the social action is 'plus'.",
    required: "Required for social hit type.",
    name: "Social Action"
  }, {
    key: "st",
    description: "Specifies the target of a social interaction. This value is typically a URL but can be any text.",
    required: "Required for social hit type.",
    name: "Social Action Target"
  }, {
    key: "utc",
    description: "Specifies the user timing category.",
    required: "Required for timing hit type.",
    name: "User timing category"
  }, {
    key: "utv",
    description: "Specifies the user timing variable.",
    required: "Required for timing hit type.",
    name: "User timing variable name"
  }, {
    key: "utt",
    description: "Specifies the user timing value. The value is in milliseconds.",
    required: "Required for timing hit type.",
    name: "User timing time"
  }, {
    key: "utl",
    description: "Specifies the user timing label.",
    required: "Optional.",
    name: "User timing label"
  }, {
    key: "plt",
    description: "Specifies the time it took for a page to load. The value is in milliseconds.",
    required: "Optional.",
    name: "Page Load Time"
  }, {
    key: "dns",
    description: "Specifies the time it took to do a DNS lookup.The value is in milliseconds.",
    required: "Optional.",
    name: "DNS Time"
  }, {
    key: "pdt",
    description: "Specifies the time it took for the page to be downloaded. The value is in milliseconds.",
    required: "Optional.",
    name: "Page Download Time"
  }, {
    key: "rrt",
    description: "Specifies the time it took for any redirects to happen. The value is in milliseconds.",
    required: "Optional.",
    name: "Redirect Response Time"
  }, {
    key: "tcp",
    description: "Specifies the time it took for a TCP connection to be made. The value is in milliseconds.",
    required: "Optional.",
    name: "TCP Connect Time"
  }, {
    key: "srt",
    description: "Specifies the time it took for the server to respond after the connect time. The value is in milliseconds.",
    required: "Optional.",
    name: "Server Response Time"
  }, {
    key: "dit",
    description: "Specifies the time it took for Document.readyState to be 'interactive'. The value is in milliseconds.",
    required: "Optional.",
    name: "DOM Interactive Time"
  }, {
    key: "clt",
    description: "Specifies the time it took for the DOMContentLoaded Event to fire. The value is in milliseconds.",
    required: "Optional.",
    name: "Content Load Time"
  }, {
    key: "exd",
    description: "Specifies the description of an exception.",
    required: "Optional.",
    name: "Exception Description"
  }, {
    key: "exf",
    description: "Specifies whether the exception was fatal.",
    required: "Optional.",
    name: "Is Exception Fatal?"
  }, {
    key: "cd_",
    description: "Each custom dimension has an associated index. There is a maximum of 20 custom dimensions (200 for Analytics 360 accounts). The dimension index must be a positive integer between 1 and 200, inclusive.",
    required: "Optional.",
    name: "Custom Dimension"
  }, {
    key: "cm_",
    description: "Each custom metric has an associated index. There is a maximum of 20 custom metrics (200 for Analytics 360 accounts). The metric index must be a positive integer between 1 and 200, inclusive.",
    required: "Optional.",
    name: "Custom Metric"
  }, {
    key: "xid",
    description: "This parameter specifies that this user has been exposed to an experiment with the given ID. It should be sent in conjunction with the Experiment Variant parameter.",
    required: "Optional.",
    name: "Experiment ID"
  }, {
    key: "xvar",
    description: "This parameter specifies that this user has been exposed to a particular variation of an experiment. It should be sent in conjunction with the Experiment ID parameter.",
    required: "Optional.",
    name: "Experiment Variant"
  }, {
    key: "exp",
    description: "This parameter contains the Optimize experiment(s) and variants.",
    required: "Optional.",
    name: "Experiments",
    url: ""
  }, {
    key: "_v",
    name: "SDK Version Number",
    description: "For Univeral Analytics, it is the version of tha Anlytics.js file used to construct the hit.",
    url: ""
  },
  {
    key: "_s",
    name: "Hit Sequence",
    description: "",
    url: ""
  },
  {
    key: "gtm",
    name: "GTM Container (or gtag)",
    description: "Present when the hit is sent by Google Tag Manager and gtag. When sent by Google Tag Manager, it includes the container Public ID.",
    url: "",
    regex_validation: ""
  },
  {
    key: "a",
    name: "AdSense ID",
    description: "",
    url: "",
    regex_validation: ""
  },
  {
    key: "jid",
    name: "Join ID",
    url: "",
    description: "Used to bind Google Analytics cookies to Doubleclick",
    regex_validation: ""
  },
  {
    key: "_u",
    name: "Verification Code",
    description: "Used by Google to debug the process of collecting data in one hit, from initialization to sending.",
    url: "https://stackoverflow.com/questions/26849042/u-parameter-in-universal-google-analytics-collect-hits",
    regex_validation: ""
  },
  {
    key: "_gid",
    name: "GID",
    description: "Used to distinguish users. Stored in a cookie (_gid). Can't be set. Default expiration is 24 hours.",
    url: "https://developers.google.com/analytics/devguides/collection/gtagjs/cookie-usage",
    regex_validation: ""
  },
  {
    key: "gjid",
    name: "gjid",
    description: "",
    url: "",
    regex_validation: ""
  },
  {
    key: "_r",
    name: "_r",
    description: "",
    url: "",
    regex_validation: ""
  },
  {
    key: "sct",
    name: "Session Count",
    description: "The index of this session.",
    url: "",
    regex_validation: ""
  },
  {
    key: "sid",
    name: "Session ID",
    description: "Timestamp when the current session started.",
    url: "",
    regex_validation: ""
  },
  {
    key: "_et",
    name: "Engagement Time",
    description: "The number of milliseconds elapsed.",
    url: "",
    regex_validation: ""
  },
  {
    key: "en",
    name: "Event Name",
    description: "The name of the hit type.",
    url: "",
    regex_validation: ""
  },
  {
    key: "_s",
    name: "Hit Sequence",
    description: "The indexed number of the hit sent to the property for that page.",
    url: "",
    regex_validation: ""
  },
  {
    key: "_dbg",
    name: "Debug Mode",
    description: "When GA Debug is ON",
    url: "",
    regex_validation: ""
  },
  {
    key: "statusCode",
    name: "Status Code",
    description: "Status codes are issued by a server in response to a client's request made to the server.",
    url: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes",
    regex_validation: ""
  }
]
