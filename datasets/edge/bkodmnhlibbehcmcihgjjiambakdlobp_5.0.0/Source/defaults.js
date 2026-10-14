// Default options for the Search eBay extension
export const DEFAULT_OPTIONS = {
    default_ebay_site: "https://www.ebay.com/sch/i.html?",
    default_ebay_site_text: "United States",
    location_pref: null,
    search_completed: false,
    search_sold: false,
    search_title_desc: false, // LH_TitleDesc=1 - Search in title and description
    search_sort: '12', // Best Match (was '1' - Ending Soonest)
    // Buying format options
    buying_auction: false,    // LH_Auction=1 - Auction only
    buying_best_offer: false, // LH_BO=1 - Accepts offers
    buying_buy_now: false,    // LH_BIN=1 - Buy It Now
    // Price range filters
    price_min: '',  // _udlo param - minimum price
    price_max: '',  // _udhi param - maximum price
    free_shipping: false, // LH_FS=1 - Free shipping only
    display_mode: '0', // 0=default, 1=list, 2=gallery (_dmd param)
    wintype_pref: "newtab",
    search_history: [],
    use_saved_options_for_freeform: true,
    use_options: true,
    history_limit: 5,
    theme_preference: 'auto' // 'light', 'dark', or 'auto'
};