const gmp_keys = [ {
  key: "src",
  description: "Advertiser ID or Floodlight Configuration ID. ",
  required: "Absolutely",
  name: "Source",
  url: 'https://support.google.com/dcm/answer/2825584?hl=en'
},{
  key: "t",
  description: "The type of hit. ",
  required: "Absolutely",
  name: "Type",
  url: 'https://google.com'
},{
  key: "cid",
  description: "The Google Analytics Client ID",
  required: "Absolutely",
  name: "Client ID",
  url: 'https://google.com'
},{
  key: "tid",
  description: "The Google Analytics Property ID",
  required: "Absolutely",
  name: "Property ID",
  url: 'https://google.com'
},{
  key: "gtm",
  description: "The hit was sent by Google Tag Manager or gtag.",
  required: "Absolutely",
  name: "Google Tag Manager",
  url: 'https://google.com'
},{
  key: "type",
  description: "The ID of the activity group.",
  required: "Absolutely",
  name: "Group Tag",
  url: 'https://support.google.com/dcm/answer/2823234?hl=en'
},{
  key: "cat",
  description: "The ID of the activity.",
  required: "Absolutely",
  name: "Activity Tag",
  url: 'https://support.google.com/dcm/answer/2823234?hl=en'
},{
  key: "ord",
  description: "Floodlight tags use ord values to prevent caching, a browser feature that can have a negative effect on the accuracy of tracking and reporting.",
  required: "Absolutely",
  name: "Cache buster",
  url: 'https://support.google.com/dcm/answer/2828443?hl=en'
},{
  key: "~oref",
  description: "The URL of the page where the Floodlight tag is implemented. To ensure that Campaign Manager can record the conversion referrer, make sure that you use secure tags (https://) on secure pages.",
  required: "Absolutely",
  name: "Conversion referrer",
  url: 'https://support.google.com/dcm/answer/6180721?hl=en'
},{
  key: "num",
  description: "The value of the num= parameter in a Floodlight activity tag. For counter activity tags that count unique users within a 24-hour period, the value is a random number. Otherwise, the num= parameter isn't used.",
  required: "",
  name: "NUM value",
  url: 'https://support.google.com/dcm/answer/6188434?hl=en'
}]
