export const requestRules = [
  {
    "id": 1,
    "priority": 1,
    "condition": {
      "urlFilter": "www.alibaba.com",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        {
          "header": "Access-Control-Allow-Origin",
          "operation": "set",
          "value": "*"
        }
      ]
    }
  },
  {
    "id": 2,
    "priority": 1,
    "condition": {
      "urlFilter": "https://profile.alibaba.com",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://profile.alibaba.com/profile/detail_buyer_select.htm"
        }
      ]
    }
  },
  {
    "id": 3,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/data/dynamic",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/p4p_report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    }
  },
  {
    "id": 5,
    "priority": 2,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/customer/getBpPrivilege",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://i.alibaba.com"
        },
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://i.alibaba.com"
        }
      ]
    }
  },
  {
    "id": 6,
    "priority": 2,
    "condition": {
      "urlFilter": "https://hz-productposting.alibaba.com/product/greatpro/product_list.do",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://hz-productposting.alibaba.com/product/product_growth.htm"
        }
      ]
    }
  },

  {
    "id": 7,
    "priority": 1,
    "condition": {
      "urlFilter": "https://file.made-in-china.com/img-search/upload",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www.made-in-china.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www.made-in-china.com"
        }
      ]
    },
  }
  ,
  {
    "id": 9,
    "priority": 1,
    "condition": {
      "urlFilter": "https://message.alibaba.com/message/ajax/feedback",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://message.alibaba.com/message/default.htm?spm=a2793.11769229.0.0.252f3e5fImXMMV"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://message.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 10,
    "priority": 1,
    "condition": {
      "urlFilter": "https://message.alibaba.com/message/maDetail.htm",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://message.alibaba.com/message/default.htm?spm=a2793.11769229.0.0.52a23e5fGm1ZkO"
        }
      ]
    },
  },
  {
    "id": 11,
    "priority": 1,
    "condition": {
      "urlFilter": "https://alicrm.alibaba.com/jsonp/customerPluginQueryServiceI",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://message.alibaba.com/"
        }
      ]
    },
  },
  {
    "id": 12,
    "priority": 1,
    "condition": {
      "urlFilter": "https://alicrm.alibaba.com/eggCrmQn/crm/orderQueryServiceI/queryCountOrders.json",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://alicrm.alibaba.com/?spm=a2700.8443322.0.0.33c53e5fFgPVxh"
        }
      ]
    },
  },
  {
    "id": 13,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/supreme/queryRecommendKeywordList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/supreme/keywordHelper.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 14,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/topRanking/queryRecommendKeywordList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/topRanking/keywordHelper.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 15,
    "priority": 1,
    "condition": {
      "urlFilter": "https://showcase.alibaba.com/api/showcase/effect/total",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 16,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/supreme/queryExactKeywordList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/supreme/keywordHelper.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 17,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/topRanking/queryExactKeywordList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/topRanking/keywordHelper.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 18,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/campaign/type/allList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/wide/campaignManage.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },

  {
    "id": 19,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/data/dynamic/component/data",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/wide/campaignManage.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 20,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/log",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/wide/campaignManage.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 21,
    "priority": 1,
    "condition": {
      "urlFilter": "https://mydata.alibaba.com//self/.json?action=OneAction",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://data.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 22,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/csrf",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://data.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 23,
    "priority": 1,
    "condition": {
      "urlFilter": "https://hz-productposting.alibaba.com/product_operate/layer/stage_kpi.do",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://hz-productposting.alibaba.com/product_operate/product_growth.htm"
        }
      ]
    },
  },
  {
    "id": 24,
    "priority": 1,
    "condition": {
      "urlFilter": "https://hz-productposting.alibaba.com/product_operate/layer/product_diagnosis.do",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://hz-productposting.alibaba.com/product_operate/product_growth.htm"
        }
      ]
    },
  },
  {
    "id": 25,
    "priority": 1,
    "condition": {
      "urlFilter": "https://hz-productposting.alibaba.com/product_operate/layer/product_list.do",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://hz-productposting.alibaba.com/product_operate/product_growth.htm"
        }
      ]
    },
  },
  {
    "id": 26,
    "priority": 1,
    "condition": {
      "urlFilter": "https://mydata.alibaba.com/self/.json?action=OneAction&iName=crowdInsight/getIdx",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://data.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 27,
    "priority": 1,
    "condition": {
      "urlFilter": "https://data.alibaba.com//json/productAdviser/scene/querySceneList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/adviser/product?key=0"
        }
      ]
    },
  },
  {
    "id": 28,
    "priority": 1,
    "condition": {
      "urlFilter": "https://alicrm.alibaba.com/eggCrmQn/crm/customerQueryServiceI/queryPublicCustomerList.json",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://alicrm.alibaba.com/?spm=a278r.12126329.0.0"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://alicrm.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 29,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/data/dynamic/filter/data",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/p4p_report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    },
  },
  {
    "id": 30,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/dataReport/findReservationProdEffect",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/report/product-report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    }
  },
  {
    "id": 31,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/dataReport/findTrafficPackageKeyword",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/report/keyword-report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com"
        }
      ]
    }
  },
  {
    "id": 32,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/report/export/record/findReservationProdEffect",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/report/product-report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com "
        }
      ]
    },
  },
  {
    "id": 33,
    "priority": 1,
    "condition": {
      "urlFilter": "https://hz-productposting.alibaba.com/semi/managed/product/list.do",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://hz-productposting.alibaba.com/product/semi_managed.htm"
        }
      ]
    },
  },
  {
    "id": 34,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/dataReport/findKeywordEffect",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/report/keyword-report.htm?pageTabKey=brandKeyword"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com "
        }
      ]
    },
  },
  {
    "id": 35,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/data/dynamic/scene/data",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/ads/p4p_report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com "
        }
      ]
    },
  },
  {
    "id": 36,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/brand/napi/dataReport/findKeywordList",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://www2.alibaba.com/brand/report/product-report.htm"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://www2.alibaba.com "
        }
      ]
    }
  },
  {
    "id": 37,
    "priority": 1,
    "condition": {
      "urlFilter": "  https://mydata.alibaba.com/self/.json?action=OneAction&iName=vip%2Fhome%2FgetShopSummaryNew",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/"
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": "https://data.alibaba.com"
        }
      ]
    }
  },
  {
    "id": 38,
    "priority": 1,
    "condition": {
      "urlFilter": "https://data.alibaba.com/json/homepage/customize/newOptions",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": "https://data.alibaba.com/newsummary?spm=a2700.29482153.0.0.3d2171d2jaOePM"
        }
      ]
    }
  },
   {
    "id": 39,
    "priority": 1,
    "condition": {
      "urlFilter": "https://data.alibaba.com/json/homepage/customize/newSelections",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": `https://data.alibaba.com/newsummary?spm=a2700.29482153.0.0.3d2171d2jaOePM`
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": `https://data.alibaba.com`
        }
      ]
    }
  }
  ,
   {
    "id": 40,
    "priority": 1,
    "condition": {
      "urlFilter": "https://www2.alibaba.com/api/showcase/effect/total",
      "resourceTypes": ["xmlhttprequest"]
    },
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        {
          "header": "Referer",
          "operation": "set",
          "value": `https://www2.alibaba.com/showcase/index.htm?spm=a2756.trade-list-seller.0.0.5e71601aUNQyU`
        },
        {
          "header": "Origin",
          "operation": "set",
          "value": `https://www2.alibaba.com`
        }
      ]
    }
  }
]



export async function addBrandNapiReferer(referer) {
    new Promise((resolve) => {
        let tRules = JSON.parse(JSON.stringify(requestRules));
        tRules.push({
            "id": 100,
            "priority": 1,
            "condition": {
                "urlFilter": "https://www2.alibaba.com/brand/napi/dataReport/queryStoreData",
                "resourceTypes": ["xmlhttprequest"]
            },
            "action": {
                "type": "modifyHeaders",
                "requestHeaders": [
                    {
                        "header": "Referer",
                        "operation": "set",
                        "value": referer
                    },
                    {
                        "header": "Origin",
                        "operation": "set",
                        "value": 'https://www2.alibaba.com'
                    }
                ]
            }
        })
        chrome.runtime.sendMessage(window.qiuqiChromeId, { type: 'updateRules', data: tRules }, resolve(true))
    })
}