function gtag_evaluation(push){

}

const gtag_commands =[{
  command: "config",
  description: "Allows you to add additional configuration information to targets. This is typically product-specific configuration such as Google Analytics tracking information."
},{
  command: "set",
  description: "Allows you to set values that persist across all the subsequent gtag() calls on the page.",
  parameters: ["command", "parameter", "parameter_value_pair"]
},{
  command: "event",
  description: "Use the event command to send event data.",
  parameters: ["command", "event_name", "event_params"]
}]

const gtag_control_parameters = [ {
  parameter: "groups",
  type: "string or array of strings",
  example: "'default,ga",
  description: "Used by the config command to assign a target to one or more groups."
}, {
  parameter: "send_to",
  type: "string or array of strings",
  example: "'AW-CONVERSION_ID",
  description: "Sets the target account/property that is to receive the event data."
}, {
  parameter: "event_callback",
  type: "function",
  example: "function() { form.submit(); }",
  description: "JavaScript callback function called when processing of an event command has completed."
}, {
  parameter: "event_timeout",
  type: "integer",
  example: "2000",
  description: "Timeout used for event_callback in milliseconds."
} ]

const gtag_events = [ {
  event_name: "add_payment_info",
  parameters: [ "" ],
  send_when: "a user adds billing information"
}, {
  event_name: "add_to_cart",
  parameters: [ "value", "currency", "items" ],
  send_when: "a user adds items to cart"
}, {
  event_name: "add_to_wishlist",
  parameters: [ "value", "currency", "items" ],
  send_when: "a user adds items to wishlist"
}, {
  event_name: "begin_checkout",
  parameters: [ "value", "currency", "items", "coupon" ],
  send_when: "a user begins checkout"
}, {
  event_name: "checkout_progress",
  parameters: [ "value", "currency", "items", "coupon", "checkout_step", "checkout_option" ],
  send_when: "a user completes a checkout step"
}, {
  event_name: "exception",
  parameters: [ "description", "fatal" ],
  send_when: "an error occurs"
}, {
  event_name: "generate_lead",
  parameters: [ "value", "currency", "transaction_id" ],
  send_when: ""
}, {
  event_name: "login",
  parameters: [ "method" ],
  send_when: "a user logs in to the site"
}, {
  event_name: "page_view",
  parameters: [ "" ],
  send_when: "a user loads a web page."
}, {
  event_name: "conversion",
  parameters: [ "transaction_id", "value", "currency", "tax", "shipping", "items", "coupon", "send_to" ],
  send_when: "a user completes a purchase"
}, {
  event_name: "purchase",
  parameters: [ "transaction_id", "value", "currency", "tax", "shipping", "items", "coupon" ],
  send_when: "a user completes a purchase"
}, {
  event_name: "refund",
  parameters: [ "transaction_id", "value", "currency", "tax", "shipping", "items" ],
  send_when: "a product is refunded"
}, {
  event_name: "remove_from_cart",
  parameters: [ "value", "currency", "items" ],
  send_when: "a user removes items from cart"
}, {
  event_name: "screen_view",
  parameters: [ "screen_name" ],
  send_when: "a user loads a new screen or new content."
}, {
  event_name: "search",
  parameters: [ "search_term" ],
  send_when: "a user searches on the site"
}, {
  event_name: "select_content",
  parameters: [ "items", "promotions", "content_type", "content_id" ],
  send_when: "a user clicks on a product or product link for one or more products"
}, {
  event_name: "set_checkout_option",
  parameters: [ "checkout_step", "checkout_option" ],
  send_when: "a user has selected an option value for a given checkout step"
}, {
  event_name: "share",
  parameters: [ "method", "content_type", "content_id" ],
  send_when: "a user shares content"
}, {
  event_name: "sign_up",
  parameters: [ "method" ],
  send_when: "a user signs up using a Google account, email address, or other method"
}, {
  event_name: "timing_complete",
  parameters: [ "name", "value" ],
  send_when: "a timed activity completes"
}, {
  event_name: "view_item",
  parameters: [ "items" ],
  send_when: "a user views product or item details"
}, {
  event_name: "view_item_list",
  parameters: [ "items" ],
  send_when: "a user views a list of items / impressions"
}, {
  event_name: "view_promotion",
  parameters: [ "promotions" ],
  send_when: "a user clicks on an internal promotion"
}, {
  event_name: "view_search_results",
  parameters: [ "search_term" ],
  send_when: "a user views search results"
} ]


const gtag_event_parameters = [ {
  parameter: "checkout_option",
  type: "string",
  example: "Visa",
  description: "Used for ecommerce events"
}, {
  parameter: "checkout_step",
  type: "integer",
  example: "2",
  description: "Used for ecommerce events"
}, {
  parameter: "content_id",
  type: "string",
  example: "article-8704",
  description: "Content Id (context specific)"
}, {
  parameter: "content_type",
  type: "string",
  example: "article",
  description: "type of content that was selected"
}, {
  parameter: "coupon",
  type: "string",
  example: "spring_fun",
  description: "Coupon code for a purchasable item"
}, {
  parameter: "currency",
  type: "string",
  example: "USD",
  description: "Purchase currency in 3-letter ISO_4217 format"
}, {
  parameter: "description",
  type: "string",
  example: "",
  description: "Human readable definition or information"
}, {
  parameter: "send_to",
  type: "string or array",
  example: [
    'AW-GOOGLE_CONVERSION_ID_1/CONVERSION_LABEL_1',
    'AW-GOOGLE_CONVERSION_ID_2/CONVERSION_LABEL_2',
    'AW-GOOGLE_CONVERSION_ID_3/CONVERSION_LABEL_3',
  ],
  description: "to specify which account(s) should receive the data."
}, {
  parameter: "fatal",
  type: "boolean",
  example: "FALSE",
  description: "Used for exception tracking"
}, {
  parameter: "items",
  type: "array",
  example: "",
  description: "An array of items (typically a list of products). Used for ecommerce events."
}, {
  parameter: "items[].brand",
  type: "string",
  example: "Google",
  description: "Brand of the item"
}, {
  parameter: "items[].category",
  type: "string",
  example: "Apparel/T-Shirts",
  description: "Item category"
}, {
  parameter: "items[].creative_name",
  type: "string",
  example: "spring_banner_2",
  description: "Name of a creative used"
}, {
  parameter: "items[].creative_slot",
  type: "string",
  example: "banner_slot_1",
  description: "Name of the creative slot"
}, {
  parameter: "items[].id",
  type: "string",
  example: "P12345",
  description: "Unique ID/SKU for the item"
}, {
  parameter: "items[].location_id",
  type: "string",
  example: "Mountain View",
  description: "Location of the item"
}, {
  parameter: "items[].name",
  type: "string",
  example: "Android Warhol T-Shirt",
  description: "Item name"
}, {
  parameter: "items[].price",
  type: "currency",
  example: "29.2",
  description: "Purchase price of the item"
}, {
  parameter: "items[].quantity",
  type: "integer",
  example: "2",
  description: "Item quantity"
}, {
  parameter: "method",
  type: "string",
  example: "Google",
  description: "Used with login, signup, and share methods"
}, {
  parameter: "name",
  type: "string",
  example: "",
  description: "Context specific value"
}, {
  parameter: "promotions",
  type: "array",
  example: "",
  description: "An array of promotion items ( typically a list of products)."
}, {
  parameter: "promotions[].creative_name",
  type: "string",
  example: "summer_banner_2",
  description: "The name of a creative used"
}, {
  parameter: "promotions[].creative_slot",
  type: "string",
  example: "banner_slot_1",
  description: "The name of the creative slot"
}, {
  parameter: "promotions[].id",
  type: "string",
  example: "promotion8",
  description: "Promotion ID"
}, {
  parameter: "promotions[].name",
  type: "string",
  example: "20% discount",
  description: "Name of promotion"
}, {
  parameter: "screen_name",
  type: "string",
  example: "",
  description: "Required screen_view event parameter (along with app_name)."
}, {
  parameter: "search_term",
  type: "string",
  example: "watches",
  description: "Search term that user entered"
}, {
  parameter: "shipping",
  type: "currency",
  example: "5.99",
  description: "Shipping cost for transaction"
}, {
  parameter: "tax",
  type: "currency",
  example: "2.43",
  description: "Tax amount for transaction"
}, {
  parameter: "transaction_id",
  type: "string",
  example: "T12345",
  description: "Transaction ID"
}, {
  parameter: "value",
  type: "number",
  example: "22",
  description: "Value (i.e. revenue) associated with the event"
} ]
