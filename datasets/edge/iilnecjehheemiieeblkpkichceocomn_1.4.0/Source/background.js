function sendMessageToContentScript (message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      if (callback) callback(response)
    })
  })
}

chrome.webRequest.onCompleted.addListener(function () {
  sendMessageToContentScript({type: 'api', data: 'change'})
},
  {
    urls: [
      // 'https://sellercentral.amazon.com/analytics/data/dashboard/searchTerms/report/searchTermsDetail?*',
      'https://www.amazon.com/s/query*',
      'https://www.amazon.com/*/nextPage*',
      'https://www.amazon.com/gp/twister/ajaxv2*'
    ]
    // ,
    // types: ['xmlhttprequest']
  },
  [
    'responseHeaders'
  ]
)


const AREA_CODE = {
  us: 'com',
  jp: 'co.jp',
  uk: 'co.uk',
  de: 'de',
  fr: 'fr',
}

const AREA_FUNC = {
  us: (res) => res.replaceAll(' ', '').replaceAll(',', '').match(/totalratings(\S*)withreviews/)[1],
  jp: (res) => res.replaceAll(',', '').match(/件の合計評価、レビュー付き:(\S*)/)[1],
  uk: (res) => res.replaceAll(' ', '').replaceAll(',', '').match(/totalratings(\S*)withreviews/)[1],
  de: (res) => res.replace(/\u202f/g, '').replaceAll('.', '').replaceAll(' ', '').replaceAll(',', '').match(/Gesamtbewertungen(\S*)mitRezensionen/)[1],
  fr: (res) => res.replace(/\u202f/g, '').replaceAll('.', '').replaceAll(' ', '').replaceAll(',', '').match(/évaluationsautotal(\S*)avecavis/)[1],
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function cutArr(arr, step) {
  let index = 0
  const newArr = []
  while (index < arr.length) {
    newArr.push(arr.slice(index, index += step))
  }
  return newArr
}

// 获取评论数量
async function getReviewsCount(asin, area='us') {
  const domRes = await fetch(`https://www.amazon.${AREA_CODE[area]}/product-reviews/${asin}/ref=cm_cr_getr_d_show_all?ie=UTF8&showViewpoints=1&pageNumber=1&reviewerType=all_reviews&filterByStar=all_stars&sortBy=recent`, {
    cache: 'no-cache', 	 
    credentials: 'same-origin',  
    headers: {	
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get', 
    mode: 'cors'
  })

  if (!domRes.ok) {
    console.log('count error');
    throw new Error('Amazon Api Error')
  }

  const text = await domRes.text()
  
  // const reviewCount = text.replaceAll(' ', '').replaceAll(',', '').match(/totalratings(\S*)withreviews/)[1]
  const reviewCount = AREA_FUNC[area](text)

  return Number(reviewCount)
}

// 获取listing'
async function getListing(asin, area='us') {
  const domRes = await fetch(`https://www.amazon.${AREA_CODE[area]}/dp/${asin}?psc=1`, {
    cache: 'no-cache', 	 
    credentials: 'same-origin',  
    headers: {	
      'Content-Type': 'application/json;'
    },
    method: 'get', 
    mode: 'cors'
  })

  if (!domRes.ok) {
    console.log('listing error');
    throw new Error('Amazon Api Error')
  }

  const text = await domRes.text()

  return text
}

// 获取评论内容
async function getReviewDom(asin, page, area) {
  const req = {
    scope: 'reviewsAjax1',
    deviceType: 'desktop',
    reviewerType: 'all_reviews',
    mediaType: 'all_contents',
    pageSize: 20,
    asin: asin,
    filterByStar: 'all_stars',
    pageNumber: page,
    sortBy: 'helpful'
  }
  const data = Object.keys(req).map(item => req[item] ? item + '=' + req[item] : item).join('&')
  const res = await fetch(`https://www.amazon.${AREA_CODE[area]}/hz/reviews-render/ajax/reviews/get/ref=cm_cr_getr_d_paging_btm_next_${page}`, {
    body: data,
    cache: 'no-cache', 	 
    credentials: 'same-origin',  
    headers: {	
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', 
    mode: 'cors'
  })

  if (!res.ok) {
    console.log('rv error');
    throw new Error('Amazon Api Error')
  }

  const text = await res.text()

  return text
}

// 获取下一页数据
async function getNextPage (kw, page) {
  const res = await fetch(`https://www.amazon.com/s?k=${kw}&page=${page}&ref=sr_pg_${page}`, {
    cache: 'no-cache', 	 
    credentials: 'same-origin',  
    // headers: {	
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    method: 'POST', 
    mode: 'cors'
  })

  if (!res.ok) {
    console.log('rv error');
    throw new Error('Amazon Api Error')
  }

  const text = await res.text()

  return text
}

// 循环获取前一百条asin
const getTopAsin = async (kw, p) => {
  let domList = []
  let page = 1
  while (page < p) {
    const nextDom = await getNextPage(kw, page)
    domList.push(nextDom) 
    page += 1
  }

  return domList
}

// 获取bsr top数据
async function getBsrTop (t, c, n, p) {
  const res = await fetch(`https://www.amazon.com/gp/${t ? 'bestsellers' : 'new-releases'}/${c}/${n || ''}?pg=${p}`, {
    cache: 'no-cache', 	 
    headers: {	
      'Content-Type': 'application/json;'
    },
    credentials: 'same-origin',  
    method: 'get', 
    mode: 'cors'
  })

  if (!res.ok) {
    console.log('rv error');
    throw new Error('Amazon Api Error')
  }

  const text = await res.text()

  return text
}

// 循环获取bsr top
const getBsrAsinList = async (t, c, n, p) => {
  let domList = []
  let page = 1
  while (page <= p) {
    const nextDom = await getBsrTop(t, c, n, page)
    domList.push(nextDom) 
    page += 1
  }

  return domList
}

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
  console.log(request);
  if (request.kind === 1) {
    try {
      const listing = await getListing(request.asin, request.area)
      const count = await getReviewsCount(request.asin, request.area)
      const reqNum = Math.ceil(count / 20) > 500 ? 500 : Math.ceil(count / 20)
      console.log(reqNum);
      const rv = await Promise.all(
        Array.from({length: reqNum > request.step ? request.step : reqNum},(_, i)=>i + request.current).map(async (item, i) => {
          await sleep(10 * i)
          return await getReviewDom(request.asin, item, request.area)
        })
      )
      await sendResponse({listing, rv, asin: request.asin, reqNum, area: request.area})
    } catch (error) {
      await sendResponse({error: 'Amazon Api Error'})
    }
  } else if (request.kind === 2) {
    try {
      const rv = await Promise.all(
        Array.from({length: 50},(_, i)=>i + request.current).map(async (item, i) => {
          await sleep(10 * i)
          return await getReviewDom(request.asin, item, request.area)
        })
      )
      await sendResponse({rv, asin: request.asin})
    } catch (error) {
      await sendResponse({error: 'Amazon Api Error'})
    }
  } else if (request.kind === 3) {
    try {
      const listing = await getListing(request.asin)
      await sendResponse({listing})
    } catch (error) {
      await sendResponse({error: 'Amazon Api Error'})
    }
  } else if (request.kind === 4) {
    // 获取搜索页前N页数据
    try {
      const res = await getTopAsin(request.kw, request.page)
      await sendResponse({domList: res})
    } catch (error) {
      await sendResponse({error: 'Amazon Api Error'})
    }
  } else if (request.kind === 5) {
    // 获取bsr top数据
    try {
      const res1 = await getBsrAsinList(1, request.cate, request.node, request.page)
      const res2 = await getBsrAsinList(0, request.cate, request.node, request.page)
      await sendResponse({bsr: res1, new: res2})
    } catch (error) {
      await sendResponse({error: 'Amazon Api Error'})
    }
  }
})
