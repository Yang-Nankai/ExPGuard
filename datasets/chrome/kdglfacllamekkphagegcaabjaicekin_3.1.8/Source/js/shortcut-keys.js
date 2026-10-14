
import config from "../common/config.js"
import { postMessage, getQueryParams, complteUrl, initIframe, httpRequest, loadScript, loadStyles, showToast, delayTimes } from "./index.js"
import ClipboardJS from './clipboard.min.js';
// console.log("AAAAAAAAAAAAAA    AAA"+initIframe);
const localHref = window.location.href;
let loadGenerator = false;
let currentLoadingIframe = null;
const timeStamp = new Date().getTime()
const mbConfig = { attributes: false, childList: true, subtree: true, characterData: true, characterDataOldValue: true, attributDataOldValue: true };

const subTypeList = [
    { label: "star_brand_industry_flow_supplement", value: "问鼎" },
    { label: "topranking_allsite_flow_supplement", value: "顶展" },
    { label: "whole_store", value: "全站推" },
    { label: "whole_store_product", value: "全站推" },
    { label: "whole_store_hot_product", value: "全站推优品助推" },
    { label: "whole_store_new_product", value: "全站推新品成长" },
    { label: "ai_whole_site", value: "AI智投" },
    { label: "budget_300", value: "控预算300" },
    { label: "budget_500", value: "控预算500" },
    { label: "normal", value: "自然" }
]

// 阿里后台管理页面注入插件中心-快捷键
export const shortKeysHtml = {
    // rfq报价管理
    aliRfqQbBuyer: `${config.iframeBaseURL}/iframe/shortcut-keys/aliRfqQbBuyer.html?${timeStamp}`,
    // p4p直通车
    aliThroughTrain: `${config.iframeBaseURL}/iframe/shortcut-keys/aliThroughTrain.html?${timeStamp}`,
    // 周月诊断报表
    excelDiagnosis: `${config.iframeBaseURL}/iframe/shortcut-keys/excelDiagnosis.html?${timeStamp}`,
    // 访客详情
    aliFangke: `${config.iframeBaseURL}/iframe/shortcut-keys/aliFangke.html?${timeStamp}`,
    //商品运营工作台->产品分层
    excelProductLayering: `${config.iframeBaseURL}/iframe/shortcut-keys/excelProductLayering.html?${timeStamp}`,
    //定向征品
    aliProductSelection: `${config.iframeBaseURL}/iframe/shortcut-keys/aliProductSelection.html?${timeStamp}`,
    // 选词参谋
    trafficKeyword: `${config.iframeBaseURL}/iframe/shortcut-keys/trafficKeyword.html?${timeStamp}`,
    // 产品参谋->产品发现页面
    aliInterProducts: `${config.iframeBaseURL}/iframe/shortcut-keys/aliInterProducts.html?${timeStamp}`,
    // 产品参谋
    productOverview: `${config.iframeBaseURL}/iframe/shortcut-keys/productOverview.html?${timeStamp}`,
    // 市场参谋
    adviserMarket: `${config.iframeBaseURL}/iframe/shortcut-keys/adviserMarket.html?${timeStamp}`,
    // 商品管理
    manageProducts: `${config.iframeBaseURL}/iframe/shortcut-keys/manageProducts.html?${timeStamp}`,
    // 采购直达
    aliSourcing: `${config.iframeBaseURL}/iframe/shortcut-keys/aliSourcing.html?${timeStamp}`,
    // 流量参谋
    aliTrafficSource: `${config.iframeBaseURL}/iframe/shortcut-keys/aliTrafficSource.html?${timeStamp}`,
    // 类目商品Popular榜
    aliPopular: `${config.iframeBaseURL}/iframe/shortcut-keys/aliPopular.html?${timeStamp}`,
    // 类目商品Popular榜页面=> tab标签下标
    aliPopularTabIdx: 0,
    // 类目商品Popular榜页面=> 排名前五产品信息
    topFiveProdInfoList: [],
    // 关键词搜索页商品详情显示
    productSearchDetails: `${config.iframeBaseURL}/iframe/productSearchDetails_New.html?${timeStamp}`,
    // 店铺商品统计
    shopProductCount: `${config.iframeBaseURL}/iframe/shopProductCount.html?${timeStamp}`,
    // 商家店铺-插件中心快捷键
    aliShopShortCutKey: `${config.iframeBaseURL}/iframe/shortcut-keys/aliShop.html?${timeStamp}`,
    // 商家店铺搜索产品-插件中心快捷键
    // aliShopSearchShortCutKey: `${config.iframeBaseURL}/iframe/shortcut-keys/aliShopSearchGood.html?${timeStamp}`,
    // 阿里类目TopRanking榜单
    aliCategoryRanking: `${config.iframeBaseURL}/iframe/shortcut-keys/aliCategoryRanking.html?${timeStamp}`,
    // 市场参谋->热品分析
    aliCountryRankProducts: `${config.iframeBaseURL}/iframe/shortcut-keys/aliCountryRankProducts.html?${timeStamp}`,
    // 客户管理->客户列表
    aliCustomer: `${config.iframeBaseURL}/iframe/shortcut-keys/aliCustomer.html?${timeStamp}`,
    // 客户管理->公海客户列表
    aliPublicCustomer: `${config.iframeBaseURL}/iframe/shortcut-keys/aliPublicCustomer.html?${timeStamp}`,
    // 营销中心->顶级展位
    aliBrandTopRanking: `${config.iframeBaseURL}/iframe/shortcut-keys/aliBrandTopRanking.html?${timeStamp}`,
    // 营销中心->问鼎
    aliBrandWending: `${config.iframeBaseURL}/iframe/shortcut-keys/aliBrandWending.html?${timeStamp}`,
    // 阿里新热门榜单
    aliNewPopularRankings: `${config.iframeBaseURL}/iframe/shortcut-keys/aliPopularRankings_new.html?${timeStamp}`,
    // 数据参谋->买家参谋
    aliIndustryBuyer: `${config.iframeBaseURL}/iframe/shortcut-keys/aliIndustryBuyer.html?${timeStamp}`,
    // 商机沟通->询价单管理->所有询价单
    aliBizCommInquirySheet: `${config.iframeBaseURL}/iframe/shortcut-keys/aliBizCommInquirySheet.html?${timeStamp}`,
    // 产品参谋->历史数据
    aliProductOverview: `${config.iframeBaseURL}/iframe/productOverview.html?v=${timeStamp}`,
    // 产品参谋->产品分析快捷键
    productAdvisor: `${config.iframeBaseURL}/iframe/shortcut-keys/productAdvisor.html?v=${timeStamp}`,
    // 聊天详情页 - 复制聊天内容
    chatDetail: `${config.iframeBaseURL}/iframe/shortcut-keys/chatDetail.html?v=${timeStamp}`,
    // 聊天详情页 - 复制客户信息
    chatDetailInfo: `${config.iframeBaseURL}/iframe/shortcut-keys/chatDetailInfo.html?v=${timeStamp}`,
}

export function monitorElementChange(func, domId = 'html') {
    const callback = function (mutationRecoard, observer) {
        func();
    };
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(document.querySelector(domId), mbConfig);
}

// 产品列->查看商品数据按钮 
export function insertProductSearchDetails(type) {


    (function ($) {
        // 商品列表添加查看详情按钮
        if (window.productSearchDetailsSCJS) {
            if (!$('.qiuqi-btn').get(0) || type === 4 || type === 2 || type === 5) {
                if (type !== 4 && type !== 2 && type !== 5) {
                    $('.qiuqi-btn').remove()
                }

                try {
                    const urlParams = getQueryParams(window.location.href);
                    let viewtype = urlParams.viewtype
                    const gallery = urlParams.isGallery
                    const sceneId = urlParams.sceneId
                    let searchText = urlParams.SearchText

                    if (!searchText) {
                        searchText = urlParams.searchText
                    }
                    let height = 200
                    if (!$('.fy26-product-card-wrapper').get(0)) {
                        height = 180
                    }

                    // console.log(viewtype, searchText);

                    if (((gallery === 'N')) || $('.fy23-list-card').width() >= 900) {
                        height = 105
                    }

                    if (sceneId || localHref.indexOf('https://www.alibaba.com/picture/search.htm') === 0) {
                        height = 200
                    }

                    if (localHref.indexOf('https://sale.alibaba.com/p/rank/detail.html') === 0) {
                        height = 238
                    }

                    // 是否在店铺产品列表页
                    if (type === 1) {
                        $('.component-product-list .product-info').each(function (index, element) {
                            let idx = index + 1
                            $(element).addClass(`lsou-fy-box-${idx}`)
                            $(
                                element
                            ).append(`<button style='margin-bottom:8px' data-index='${idx}' data-id='lsou-fy-btn-${idx}' id='lsou-fy-btn-${idx}' class="qiuqi-btn qiuqi-button--text ">
          <div class='qiuqi-btn-logo' ></div> 查看商品数据
      </button>`)
                        })

                    } else if (type === 2) {


                    } else if (type === 3) {

                        $('.top-ranking-floor .top-ranking-card').each(function (index, element) {
                            let idx = index + 1
                            $(element).addClass(`lsou-fy-box-${idx}`)
                            $(
                                element
                            ).append(`<button style='margin-top:5px;' data-index='${idx}' data-id='lsou-fy-btn-${idx}' id='lsou-fy-btn-${idx}' class="qiuqi-btn qiuqi-button--text ">
            <div class='qiuqi-btn-logo'></div>查看商品数据
        </button>`)
                        })

                    } else if (type === 4) {
                        $('.mt-offer__content').each(function (index, element) {
                            let idx = index + 1
                            $(element).addClass(`lsou-fy-box-${idx}`)
                            $(
                                element
                            ).append(`<button style='margin-top:5px' data-index='${idx}' data-id='lsou-fy-btn-${idx}' id='lsou-fy-btn-${idx}' class="qiuqi-btn qiuqi-button--text qiuqi-btn-mt ">
          <div class='qiuqi-btn-logo' ></div> 查看商品数据
      </button>`)
                        })

                    } else if (type === 5) {
                        // list-card-layout__info
                        $('.fy23-search-card .card-info').each(function (index, element) {
                            let idx = index + 1
                            let bid = `lsou-fy-btn-${idx}`;
                            let isIframe = $(element).find('.lsou-prod-search-box').length;
                            $(element).addClass(`lsou-fy-box-${idx}`)
                            $(
                                element
                            ).append(`<button  style='margin-bottom:8px' data-index='${idx}' data-id=${bid} id=${bid} class="qiuqi-btn qiuqi-button--text ">
          <div class='qiuqi-btn-logo' ></div> 查看商品数据
      </button>`)

                            if (isIframe) {
                                $(`#${bid}`).css('display', 'none')
                            }

                        })

                    } else if (type === 6) {
                        $('.top-rank-floor-pc .hugo4-pc-grid-item .product-card').css({ 'margin-bottom': '5px' })
                        $('.top-rank-floor-pc .hugo4-pc-grid-item').each(function (index) {
                            let idx = index + 1
                            let bid = `lsou-fy-btn-${idx}`;
                            let isIframe = $(this).find('.lsou-prod-search-box').length;
                            $(this).addClass(`lsou-fy-box-${idx}`)
                            $(this).append(`<button data-index='${idx}' data-id=${bid} id=${bid} class="qiuqi-btn qiuqi-button--text"><div class='qiuqi-btn-logo'></div>查看商品数据</button>`)

                            if (isIframe) {
                                $(`#${bid}`).css('display', 'none')
                            }
                        })
                    }

                    $('.qiuqi-btn').on('click', (e) => {
                        const id = $(e.currentTarget).attr('id')
                        const idx = $(e.currentTarget).attr('data-index')

                        let parent, prodUrl, prodTag = ''

                        if (type === 1) {
                            parent = $(`#${id}`).parent('.product-info')
                            prodUrl = complteUrl($(parent).find('.title .title-link').attr('href'))

                        } else if (type === 2) {
                            let className = `.lsou-fy-box-${idx} .searchx-product-e-title a`
                            if (!$(className).length) className = `.lsou-fy-box-${idx} .searchx-title-area a`
                            prodTag = $(`.lsou-fy-box-${idx} .prod-tag`).text()
                            prodUrl = complteUrl($(className).eq(0).attr('href'))

                        } else if (type === 3) {
                            parent = $(`#${id}`).parent('.top-ranking-card')
                            prodUrl = $(parent).find('a').attr('href')

                        } else if (type === 4) {
                            parent = $(`#${id}`).parent('.mt-offer__content')
                            prodUrl = complteUrl($(parent).find('a.mt-offer__title').attr('href'))
                            // console.log(prodUrl);
                        } else if (type === 5) {
                            parent = $(`#${id}`).parent('.card-info')
                            prodUrl = complteUrl($(parent).find('.search-card-e-title a').attr('href'))

                        } else if (type === 6) {
                            prodUrl = $(`.lsou-fy-box-${idx} .product-card`).attr('href')
                        }

                        const data = { idx, prodUrl, prodTag }
                        const iframeId = `qiuqi-productSearchDetails-${idx}`
                        const urlParams = getQueryParams(window.location.href);
                        let viewtype = urlParams.viewtype
                        let baseHeight = 120; // 默认高度
                        if (viewtype === 'L') {
                            baseHeight = 45;
                        }
                        const prodIframe = `<div class="lsou-prod-search-box" style="width:100%;height:${baseHeight}px;display:none"><iframe id="${iframeId}" class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no"  src=${shortKeysHtml.productSearchDetails}></iframe></div>`

                        $(`#${id}`).addClass('qiuqi-is-disabled')
                        $(`#${id}`).html(`<div id="qiuqi-button-loading"></div>加载中..`)


                        if (type === 2) {
                            let className = `.lsou-fy-box-${idx} .fy26-product-card-content`
                            if ($(className).length) {
                                $(className).append(prodIframe)

                            } else {
                                className = `.lsou-fy-box-${idx} .searchx-product-area`
                                $(className).next().after(prodIframe)
                            }


                        } else {
                            $(`.lsou-fy-box-${idx}`).append(prodIframe)
                            if (type === 3) {
                                $('.lsou-prod-search-box').css('margin-top', '5px')
                            }
                        }


                        const iframe = document.querySelector(`#${iframeId}`)
                        iframe.onload = function () {
                            initIframe(`${iframeId}`, data)
                        }

                        setTimeout(() => {
                            $(`#${id}`).css('display', 'none')
                            $(`.lsou-fy-box-${idx} .lsou-prod-search-box`).css(
                                'display',
                                'block'
                            )
                        }, 100)
                    })


                } catch (error) {
                    console.error('error=>', error)
                }
            }
        }
    })($laisou)
}

export function insertShortcutKeys() {
    (function ($) {
        let aliUrl = window.location.href;
        const isRfqBuyer = aliUrl.indexOf('rfq/quotation/rfq_quotation_list_v2.htm') !== -1;
        const isAliBackendHomepage = aliUrl.indexOf('https://i.alibaba.com/?spm=') !== -1;
        const isDataOverview = aliUrl.indexOf('data.alibaba.com') && $('.page-title').text() === '数据概览'
        const isFangke = aliUrl.indexOf('data.alibaba.com/marketing/visitor') !== -1;
        const isProductStaff = aliUrl.indexOf('data.alibaba.com/product/overview') !== -1;
        const isW3 = aliUrl.indexOf('www2.alibaba.com') !== -1 || aliUrl.indexOf('i.alibaba.com') !== -1;
        const isProdOper = aliUrl.indexOf('https://hz-productposting.alibaba.com/product_operate/product_growth.htm') !== -1;
        const isProductSelection = aliUrl.indexOf('https://hz-productposting.alibaba.com/product/collect_product.htm') !== -1;
        const isTrafficKeyword = aliUrl.indexOf('data.alibaba.com/traffic/keyword') !== -1 || aliUrl.indexOf('data.alibaba.com/adviser/keyword') !== -1;
        const isTrafficKeywordDetail = aliUrl.indexOf('data.alibaba.com/adviser/keyword') !== -1;
        const isAdviserProduct = aliUrl.indexOf('data.alibaba.com/adviser/product') !== -1;
        const isAdviserMarket = aliUrl.indexOf('data.alibaba.com/adviser/market') !== -1;
        const isManageProducts = aliUrl.indexOf('hz-productposting.alibaba.com/product/manage_products.htm') !== -1;
        const isAliSourcing = aliUrl.indexOf('sourcing.alibaba.com') !== -1;
        const isAliTrafficSource = aliUrl.indexOf('https://data.alibaba.com/traffic/source') !== -1;
        const isAliCategoryRanking = aliUrl.indexOf('https://sale.alibaba.com/p/rank/detail.html') !== -1;
        const isIndPeoIdx = aliUrl.indexOf('https://data.alibaba.com/industry/peopleIndex') !== -1;
        const isNewAliPopularRankings = aliUrl.indexOf('https://sale.alibaba.com/p/dviiav4th/index.html') !== -1;
        const isAliMarketingInsight = aliUrl.indexOf('https://data.alibaba.com/marketing/insight') !== -1;
        const isAliMessageDefault = aliUrl.indexOf('https://message.alibaba.com/message/default.htm') !== -1
        const isChatDetail = aliUrl.indexOf('message.alibaba.com/message/maDetail.htm') !== -1;
        const height = '35px';
        const height_new = '54px';

        // 是否在rfq报价管理页面
        if (isRfqBuyer) {
            $('.search-input').css({ 'display': 'flex', 'align-items': 'center' })
            $('.rfq-search-form .search-input').append(`<div style='height:${height};max-width:300px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliRfqQbBuyer" src=${shortKeysHtml.aliRfqQbBuyer}></iframe></div>`);
        }
        // 是否在直通车报表页面
        if (isW3) {
            let isRealContent = false
            window.onpopstate = function (event) {
                $('.laisou-iframe-box').remove();
                console.log(event);

            };
            function insertIframe(type) {
                const locationHref = window.location.href
                const checkUrl = isp4pReport(locationHref);

                if (checkUrl.isP4P) {

                    const type = checkUrl.type;
                    let ifaType = ''

                    let className = '.next-tabs-content .next-tabs-bar .next-tabs-nav-container .next-tabs-nav-scroll'
                    if (type === 2) {
                        className = '#ads_p4p .next-tabs-scrollable .next-tabs-nav-scroll'

                    } else if (type === 3) {
                        className = '.new-count-content'

                    } else if (type === 4) {
                        className = '.next-tabs-nav'
                        if (locationHref.indexOf('cate=whole&detail=open') !== -1) {
                            className = '.c-campaign-prop-modify-id'
                            ifaType = '2'


                            // 是否已有绑定点击事件
                            const navItem = $('.bp4Drawer__F1Kz5 .bp-drawer .bp-drawer-nav .nav-item')
                            if (!navItem.data('bound')) {
                                navItem.data('bound', true)
                                navItem.on('click', function (ele) {
                                    isRealContent = $(this).text() === '数据'
                                })
                            }


                            if (isRealContent && $('.realContent').length > 1 && !$('#laisou-campaignManage-deital').get(0)) {
                                const target = $($('.realContent').get(1)).find('.next-tabs-pure')
                                target.before(`<div class='laisou-iframe-box' style='margin-top: -28px;margin-left: 134px;height:${height};width:300px'>
                                <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" 
                                id="laisou-campaignManage-deital" src=${shortKeysHtml.aliThroughTrain}&type=${ifaType}></iframe></div>`)
                            }
                        }
                    }


                    if ($(className).length > 0 && !$(`#qiuqi-aliThroughTrain-${type}`).get(0) && !isRealContent) {
                        if (type === 3) {
                            $(className).css({ 'flex-wrap': 'wrap' })
                            $(className).css('margin-bottom', '10px')
                            $(className).after(`<div class='laisou-iframe-box' style='height:${height};width:100%;margin-bottom:10px;'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliThroughTrain-${type}" src=${shortKeysHtml.aliThroughTrain}&type=1></iframe></div>`);

                        } else {
                            if (type === 2) {
                                className = $(className)[0]
                            }

                            $(className).css({ 'display': 'flex', 'align-items': 'center' })
                            $(className).append(`<div class='laisou-iframe-box' style='margin-left:5px;height:${height};width:${ifaType ? '300px' : '450px'};'>
                                <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" 
                                id="qiuqi-aliThroughTrain-${type}" src=${shortKeysHtml.aliThroughTrain}&type=${ifaType}></iframe></div>`);

                        }
                    }
                } else if (locationHref.indexOf('https://www2.alibaba.com/brand/topRanking/') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/brand/topRanking/') !== -1) {
                    if ($('.navigation-header') && !$('#laisou-aliBrandTopRanking').length) {
                        $('.laisou-iframe-box').remove();
                        $($('.navigation-header div')[0]).append(`<div class='laisou-iframe-box' style='margin-left:10px;width:350px;height:${height}'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliBrandTopRanking" src=${shortKeysHtml.aliBrandTopRanking}></iframe></div>`)
                    }

                } else if (locationHref.indexOf('https://www2.alibaba.com/brand/supreme/') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/brand/supreme/') !== -1) {
                    if ($('.navigation-header') && !$('#laisou-aliBrandWending').length) {
                        $('.laisou-iframe-box').remove();
                        $($('.navigation-header div')[0]).append(`<div class='laisou-iframe-box' style='margin-left:10px;width:350px;height:${height}'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliBrandWending" src=${shortKeysHtml.aliBrandWending}></iframe></div>`)

                    }

                } else if (locationHref.indexOf('https://www2.alibaba.com/ads/p4p/campaign-info') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/ads/p4p/campaign-info') !== -1) {
                    const className = `.next-tabs-scrollable .next-tabs-nav-scroll`
                    $(className).each(function () {
                        if ($(this).text().indexOf('操作日志') !== -1) {
                            if (!$('#laisou-campaignInfo').length) {
                                const urlParams = getQueryParams(locationHref)
                                const ifaType = urlParams.productLineId === '110106' ? 3 : 2
                                $(this).css({ 'display': 'flex', 'align-items': 'center' })
                                $(this).append(`<div class='laisou-iframe-box' style='width:440px;height:30px;margin-left:10px;'>
                        <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" 
                        id="laisou-campaignInfo" src=${shortKeysHtml.aliThroughTrain}&type=${ifaType}></iframe></div>`);
                            }
                        }

                    })


                } else if (
                    locationHref.indexOf('https://www2.alibaba.com/ads/wide/campaign-manage.htm') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/ads/wide/campaign-manage.htm') !== -1
                ) {
                    const className = '.next-tabs-scrollable .next-tabs-nav-scroll';
                    console.log('className=>', $(className));
                    $(className).each(function () {
                        if ($(this).text().indexOf('全站推-日预算版') !== -1) {
                            if (!$('#laisou-campaignManage').length) {
                                $(this).css({ 'display': 'flex', 'align-items': 'center' })
                                $(this).append(`<div class='laisou-iframe-box' style='width:100%;height:${height};margin-left:10px;'>
                        <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" 
                        id="laisou-campaignManage" src=${shortKeysHtml.aliThroughTrain}&type=3></iframe></div>`)
                            }
                        }

                    })


                } else if (locationHref.indexOf('https://www2.alibaba.com/ads/p4p/campaign-manage.htm') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/ads/p4p/campaign-manage.htm') !== -1) {
                    const className = '#manage-touer-dom'
                    if ($(className).length && !$('#laisou-p4pCampaignManage').length) {
                        $(className).after(`<div class='laisou-iframe-box' style='width:100%;height:${height};margin-left:10px;'>
                        <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" 
                        id="laisou-p4pCampaignManage" src=${shortKeysHtml.aliThroughTrain}&type=4></iframe></div>`)
                    }

                } else if (locationHref.indexOf('https://www2.alibaba.com/brand/report/store-summary.htm') !== -1 ||
                    locationHref.indexOf('https://i.alibaba.com/brand/report/store-summary.htm') !== -1) {
                    const className = '.next-tabs-scrollable .next-tabs-nav-scroll';
                    monitorElementChange(() => {
                        $(className).each(function () {
                            if ($(this).text().indexOf('店铺概况') !== -1) {
                                const ifaId = `laisou-brandReportStoreSummary`
                                const tabsNav = $(className).get(1)
                                if (!$(`#${ifaId}`).get(0) && tabsNav) {
                                    $(tabsNav).css({ 'display': 'flex', 'align-items': 'center' })
                                    $(tabsNav).append
                                        (`<div style='margin-left:10px;width:400px;height:${height}'>
                        <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="${ifaId}" src=${shortKeysHtml.aliBrandWending}>
                        </iframe></div>`)
                                }

                            }
                        })
                    })
                }

            }
            function isp4pReport(url) {
                let checkList = [
                    { name: '/ads/p4p_report.htm', type: 1 },
                    { name: 'ads/campaign_manage.htm', type: 2 },
                    { name: 'ads/index.htm', type: 3 },
                    { name: 'ads/wide/campaignManage.htm', type: 4 },
                ]
                let foundItem = checkList.find(v => url.indexOf(v.name) !== -1);
                let isP4P = false;
                if (foundItem) {
                    isP4P = true;
                }
                return { isP4P, type: foundItem ? foundItem.type : '' }
            }


            monitorElementChange(insertIframe);


        }

        // 是否在数据概览页面
        if (isDataOverview) {
            const insertDataOverviewIframe = () => {
                if (!$('#qiuqi-excelDiagnosis').get(0)) {
                    $('.dataportal-base-area-title').after(`
                    <div style='height: 32px;
                        padding: 0 22px;
                        margin: 14px 0px 5px 0px;'>
                        <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no"
                         id="qiuqi-excelDiagnosis" src=${shortKeysHtml.excelDiagnosis}?type=3></iframe>
                    </div>`)

                }
            }
            monitorElementChange(insertDataOverviewIframe);
        }


        // 是否在访客详情页面
        if (isFangke) {
            function insertFangke() {
                if (!$('#qiuqi-aliFangke').get(0)) {
                    $('.conditions-line2').css({ 'display': 'flex', 'align-items': 'center' });
                    $('.conditions-line2').append(`<div style='flex:1;height:${height};'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliFangke" src=${shortKeysHtml.aliFangke}></iframe></div>`)
                }

            }

            monitorElementChange(insertFangke);

        }

        // console.log(isProductStaff);
        // 是否在产品参谋页面
        if (isProductStaff) {
            const imgSrcBaseUrl = config.iframeBaseURL.indexOf('https') !== -1 ? `${config.iframeBaseURL}/script` : `${config.iframeBaseURL}`
            $('body').append(`<div> <div class="laisou-overlay"></div>
    <div class="laisou-prodView-dialog">
        <img id="laisou-product-close" class="close-icon" src="${imgSrcBaseUrl}/assets/img/pop_close.png" />
        <h3>产品历史数据</h3>
        <div style="height:400px;margin-top:-44px"><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliProductOverview" src=${shortKeysHtml.aliProductOverview}></iframe></div>
    </div> </div>`)


            $('#laisou-product-close').click(function () {
                $('.laisou-overlay').fadeOut(300);
                $('.laisou-prodView-dialog').fadeOut(300);
            });

            function getProdId(prodUrl) {
                // 匹配并提取.html前面的数字部分
                let regex = /(\d+)\.html/;
                let match = regex.exec(prodUrl);
                let prodId = ''
                if (match) {
                    prodId = match[1]
                } else {
                    console.log("未找到匹配的数字");
                }
                return prodId
            }
            // https://data.alibaba.com/product/overview?spm=a2700.7756200.0.0.3d2171d2l2JaPB
            const insertProdStaIframe = () => {

                if (!$('.prod-360').get(0) || !$('.copy-prodId').get(0)) {
                    // $('.prod-360').remove()
                    // $('.copy-prodId').remove()
                    $(".detail-table.detail-table--compact  .custom-td-content").each(function (idx, e) {
                        let prodUrl = $(e).find('a').attr('href');
                        let prodId = getProdId(prodUrl)
                        const quickEle = `<div style="display:flex;color:#ff6600;cursor: pointer;font-weight:500;text-align:left;padding:2px 0">
                        <span class="prod-360" style="margin-right:5px">360报表</span>
                        <span class="prod-history" >历史数据</span>
                        </div> `
                        const prodIdEle = `<div class="copy-prodId" data-clipboard-text=${prodId} style='text-align:left;color:#333'>ID：${prodId}</div>`
                        if ($(this).find(".icon").length > 0) {
                            $(this).find(".icon").after(quickEle)
                            $(this).find('.icon').after(prodIdEle)
                        } else {
                            $(this).find('.media-content p').append(prodIdEle)
                            $(this).find('.media-content p').append(quickEle)

                        }
                    });

                    $('.detail-table.detail-table--compact  .custom-td-content  .prod-360').on('click', (e) => {
                        let parentNode = $(e.currentTarget).parents('.custom-td-content');
                        let prodUrl = parentNode.find('a').attr('href');
                        let prodId = getProdId(prodUrl)
                        window.open(`${config.iframeBaseURL}/excel/#/?qiuType=1&qiuName=exportProkeyword&prodId=${prodId}`);
                    })


                    $('.detail-table.detail-table--compact  .custom-td-content  .prod-history').on('click', (e) => {
                        const parentNode = $(e.currentTarget).parents('.custom-td-content');
                        const prodUrl = parentNode.find('a').attr('href');
                        const prodId = getProdId(prodUrl)
                        $('.laisou-prodView-dialog h3').text(`${prodId} 产品历史数据`)
                        $('.laisou-overlay').fadeIn(300);
                        $('.laisou-prodView-dialog').fadeIn(300);
                        initIframe('laisou-aliProductOverview', { prodId })
                        // window.open(`${config.iframeBaseURL}/excel/#/?qiuType=1&qiuName=expSingleProd&prodId=${prodId}`);
                    })


                    $('.detail-table.detail-table--compact  .custom-td-content  .copy-prodId').on('click', (e) => {
                        let clipboard = new ClipboardJS(".copy-prodId");

                        clipboard.on("success", () => {
                            // this.showToast('复制成功')
                            // 释放内存
                            showToast(`复制成功`)
                            clipboard.destroy();
                        });

                        clipboard.on("error", () => {
                            // 不支持复制
                            showToast(`复制失败`)
                            // 释放内存
                            clipboard.destroy();
                        });

                    })
                }


            }



            // 产品参谋-产品分析功能快捷键
            const insertProdAdv = () => {
                if (!$('#laisou-prodAdv').get(0)) {
                    $('.area-title').each(function () {
                        if ($(this).text().indexOf('产品详情') !== -1) {
                            $(this).append(`<div style='width:450px;height:${height};'>
                            <iframe marginwidth="0" marginheight="0"  class="chrome_container_iframe"
                            id="laisou-prodAdv" src=${shortKeysHtml.productAdvisor}></iframe></div>`)
                        }

                    })
                }

            }

            // 当观察到变动时执行的回调函数
            const callback = function (mutationRecoard, observer) {
                // insertProdStaIframe();
                const bLen = $('.prod-360').length;
                const mLen = $('.detail-table.detail-table--compact  .custom-td-content').length
                if (bLen < mLen) {
                    $('.prod-360').remove();
                    $('.prod-history').remove();
                    $('.prod-360').off('click'); //解绑指定的事件
                    $('.prod-history').off('click')
                    insertProdStaIframe()
                    insertProdAdv()
                }
            };

            // 创建一个观察器实例并传入回调函数
            const observer = new MutationObserver(callback);

            // 以上述配置开始观察目标节点
            observer.observe(document.querySelector('html'), mbConfig);

        }


        // 是否在商品运营工作台页面
        if (isProdOper) {
            function insertExcelProdLayerIframe() {
                if (!$('#qiuqi-excelProductLayering').get(0)) {
                    $('._selectBox_1ra44_70').append(`<div style='width:350px;height:${height};'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-excelProductLayering" src=${shortKeysHtml.excelProductLayering}></iframe></div>`)
                }

            }

            monitorElementChange(insertExcelProdLayerIframe)
        }


        // 是否在定向征品页面
        if (isProductSelection) {
            function insertExcelProdLayerIframe() {
                if (!$('#qiuqi-aliProductSelection').get(0)) {
                    $('.new-filter-check-wrapper .filter-check-content').append(`<div style='width:350px;height:${height};'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliProductSelection" src=${shortKeysHtml.aliProductSelection}></iframe></div>`)
                }

            }

            monitorElementChange(insertExcelProdLayerIframe)
        }

        // 是否在选词参谋页面
        if (isTrafficKeyword) {
            function insertTrafficKeywordIframe() {
                if (!$('#qiuqi-trafficKeyword').get(0)) {
                    let mt = 15
                    if (aliUrl.indexOf('data.alibaba.com/adviser/keyword') !== -1) {
                        mt = 8;
                    }
                    $('.header-tabs').after(`<div id="qiuqi-trafficKeyword" style='height:${height};margin-bottom:${mt}px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no"  src=${shortKeysHtml.trafficKeyword}></iframe></div>`)

                }
                // $('.next-search-simple input').on('input',(e)=>{
                //     let val=$('.next-search-simple input').val()
                //     if(val){
                //         $('#qiuqi-trafficKeyword').css('display','block')
                //     }else{
                //         $('#qiuqi-trafficKeyword').css('display','none')
                //     }
                // })
            }

            monitorElementChange(insertTrafficKeywordIframe)

        }

        // 是否在选词参谋详情页面
        if (isTrafficKeywordDetail) {
            function insertTrafficKwsDetailIframe() {
                if (!$('#qiuqi-trafficKeywordDetail').get(0)) {
                    $('.forcast-cate').css({ 'display': 'flex', 'justify-content': 'flex-end', 'align-items': 'center', 'margin-bottom': '12px', 'height': '35px', 'line-height': '0px' });
                    $('.forcast-cate').prepend(`<div id="qiuqi-trafficKeywordDetail" style='display:none;height:${height};flex:1'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no"  src=${shortKeysHtml.trafficKeyword}></iframe></div>`)
                    if ($('.next-search-simple input').val()) {
                        $('#qiuqi-trafficKeywordDetail').css('display', 'block')
                    }
                    $('.next-search-simple input').on('input', (e) => {
                        let val = $('.next-search-simple input').val()
                        if (val) {
                            $('#qiuqi-trafficKeywordDetail').css('display', 'block')
                        }
                    })
                }

                if ($('.phrase-container .three').get(0) && !$('.phrase-container .laisou-href').get(0)) {
                    $('.phrase-container .three').each(function (idx, ele) {

                        const targetEle = $(ele)
                        const parenEle = targetEle.parent()
                        const keyword = parenEle.find('.phrase-keyword').text();
                        const searchUrl = `https://www.alibaba.com/trade/search?spm=a2700.product_home_fy25.home_login_first_screen_fy23_pc_search_bar.historyItem_pos_0&tab=all&SearchText=${keyword}`

                        targetEle.css('display', 'flex')
                        targetEle.append(`<a target="_blank" href='${searchUrl}' style='color:#f60;margin-left:2px' class='laisou-href'>搜首页</a>`)


                    })
                }
            }

            monitorElementChange(insertTrafficKwsDetailIframe)
        }

        // 是否在产品参谋->产品发现页面
        if (isAdviserProduct) {
            function insertProductOverviewIframe() {
                if (!$('#qiuqi-productOverview').get(0)) {
                    $('.slider').after(`<div style='height:${height};margin-bottom:15px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-productOverview" src=${shortKeysHtml.productOverview}></iframe></div>`)
                }

            }
            monitorElementChange(insertProductOverviewIframe)
        }

        // 是否在产品参谋->产品发现页面
        if (isAdviserProduct) {
            function insertAliInterProductsIframe() {
                if (!$('#qiuqi-aliInterProducts').get(0)) {
                    $('.rank-tabs .play-video').after(`<div style='height:${height};margin-bottom:15px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliInterProducts" src=${shortKeysHtml.aliInterProducts}></iframe></div>`)
                }
            }
            monitorElementChange(insertAliInterProductsIframe)
        }

        // 是否在市场参谋页面
        if (isAdviserMarket) {
            function insertAdviserMarketIframe() {
                if (!$('#qiuqi-adviserMarket').get(0)) {
                    $('.config-list-container .config-list-header').append(`<div style='flex:1;height:${height};margin-left:15px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-adviserMarket" src=${shortKeysHtml.aliCountryRankProducts}&type=1></iframe></div>`)
                }

            }
            monitorElementChange(insertAdviserMarketIframe)
        }

        // 是否在商品管理页面
        if (isManageProducts) {
            function insertManageProductsIframe() {
                console.log('insertManageProductsIframe');
                if (!$('.prod-match').get(0)) {
                    $('.prod-match').remove();
                    $('.prod-match').off('click'); //解绑指定的事件

                    $('.next-tabs-nav').append(`<li class='next-tabs-tab'><div class='prod-match' style='color:#ff6600;cursor:pointer'>词与产品匹配质量分</div></li>`)
                    // $('.posting-manage .list-item .next-row .list-edit-popup').each(function (idx, v) {
                    //     $(v).css('margin-bottom', '4px')
                    //     $(v).append(`<div class='prod-match' style='color:#ff6600;cursor:pointer'>词与产品匹配质量分</div>`)

                    // })


                    $(`.prod-match`).on('click', (e) => {
                        // let parentNode = $(e.currentTarget).parents('.list-edit-popup')
                        // let prodUrl = parentNode.find('.component-product-actions-buttons a').attr('href');
                        // let prodId = getQueryParams(prodUrl, 'itemId')
                        postMessage(
                            {
                                cmd: 'shortcutKeys',
                                key: 'fenxi-aliQualityScoreDiagnosis',
                                value: 'aliQualityScoreDiagnosis',
                                type: 'fenxi',
                                // prodId
                            }
                        )
                        // console.log(prodId);
                    })
                }

            }

            // 当观察到变动时执行的回调函数
            const callback = function (mutationRecoard, observer) {
                insertManageProductsIframe();

            };

            // 创建一个观察器实例并传入回调函数
            const observer = new MutationObserver(callback);

            // 以上述配置开始观察目标节点
            observer.observe(document.querySelector('body'), mbConfig);

        }


        // 是否在rfq采购直达页面
        if (isAliSourcing) {
            function insertAliSourcingIframe() {
                if (!$('#qiuqi-aliSourcing').get(0)) {
                    $('.crumb').css({ 'display': 'flex', 'align-items': 'center' })
                    $('.crumb').append(`<div style='height:${height};flex:1'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliSourcing" src=${shortKeysHtml.aliSourcing}></iframe></div>`)
                    const hIframe = document.querySelector('#qiuqi-aliSourcing')
                    if (hIframe) {
                        hIframe.onload = function () {
                            let params = {
                                injectId: window.qiuqiChromeId,
                                qiuqiToken: window.qiuToken,
                                aliCookie: document.cookie,
                                parentUrl: window.location.href,
                                parentOriginUrl: window.location.origin,
                            }
                            postMessage({ cmd: 'id', params }, 'qiuqi-aliSourcing')
                        }
                    }
                }

            }

            const callback = function (mutationRecoard, observer) {
                insertAliSourcingIframe();
            };

            const observer = new MutationObserver(callback);

            observer.observe(document.querySelector('body'), mbConfig);
        }

        // 是否在阿里流量参谋页面
        if (isAliTrafficSource) {
            // 当观察到变动时执行的回调函数
            const callback = function (mutationRecoard, observer) {
                if (!$('#qiuqi-aliTrafficSource').get(0)) {
                    console.log('fffffff');
                    $('.scene-assistant').prepend(`<div style='height:${height};margin-bottom:10px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliTrafficSource" src=${shortKeysHtml.aliTrafficSource}></iframe></div>`);
                }

            };

            // 创建一个观察器实例并传入回调函数
            const observer = new MutationObserver(callback);

            // 以上述配置开始观察目标节点
            observer.observe(document.querySelector('body'), mbConfig);

        }


        // 是否在类目Popular榜页面 ==== start ====
        if (getQueryParams(localHref, 'sceneId')) {
            let isLoading = false;
            // 获取当前页面排名前五产品
            async function getTopFiveProd(idx) {
                if (isLoading) {
                    return
                }
                // $('.qiu-mt__content_count').remove();
                isLoading = true;
                const searchText = getQueryParams(localHref, 'SearchText')
                const dataSpm = $($('.multi-floor__floor-tab-panel .mt-floor')[idx]).attr('data-spm')

                try {
                    const response = await httpRequest({
                        method: 'get',
                        url: localHref
                    });
                    const reg = /bannerData: (.*?)\s+ offerResultData:\s+/
                    const html = response.body.replace(/\n/g, '')
                    const result = html.match(reg)
                    const sliceData = result[1].substring(0, result[1].lastIndexOf(',')) //去掉最后一个多余的逗号
                    const resultData = JSON.parse(sliceData)
                    const rankList =
                        resultData.operateTheme.templateData.cardList[dataSpm == 'feed' ? 0 : 1].rankList
                    await getTopFiveProdInfo(0, rankList, searchText, dataSpm)

                    const classStr = '.multi-floor__floor-tab-panel .mt-floor .mt-floor__list-wrapper'
                    const multiFloor = $($(classStr)[idx])
                    console.log(shortKeysHtml.topFiveProdInfoList);
                    multiFloor.children().each(async function (i, n) {
                        if (i <= 4) {
                            const count = shortKeysHtml.topFiveProdInfoList[i].count || 0
                            const text = dataSpm == 'feed' ? '近90天询盘数：' : '近90天订单数：'
                            $(n)
                                .find('.mt-offer__content')
                                .append(`<div class='qiu-mt__content_count'>${text}<span class='qiuqi-pcolor'>${count}</span></div>`)
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
                isLoading = false;
            }

            // 获取排名前五产品的近九十天询盘数和订单数
            async function getTopFiveProdInfo(i, rankList, searchText, dataSpm) {
                try {
                    const feedUrl = `https://open-s.alibaba.com/openservice/themePageResultService?appKey=a5m1ismomeptugvfmkkjnwwqnwyrhpb1&appName=magellan&sceneId=leaderBoard&pageIndex=${i}&themeScene=subCloudTheme&SearchScene=themePage&themeId=feed&SearchText=${searchText}`
                    const orderUrl = `https://open-s.alibaba.com/openservice/themePageResultService?appKey=a5m1ismomeptugvfmkkjnwwqnwyrhpb1&appName=magellan&sceneId=leaderBoard&pageIndex=${i}&themeScene=subCloudTheme&SearchScene=themePage&themeId=order&SearchText=${searchText}`
                    const url = dataSpm === 'feed' ? feedUrl : orderUrl
                    const response = await httpRequest({
                        method: 'get',
                        url
                    });
                    let body = JSON.parse(response.body)
                    if (body.code === 200) {
                        const dataList = body.data.offerList
                        const resultList = dataList.map((item) => {
                            rankList.forEach((rankitem) => {
                                if (rankitem.productId == item.id) {
                                    item.count = rankitem.count
                                }
                            })
                            item.price = item.promotionInfoVO.localOriginalPriceRangeStr.split('-')
                            return item;
                        })
                        shortKeysHtml.topFiveProdInfoList = resultList.slice(0, 5);
                        shortKeysHtml.aliPopularTabIdx = dataSpm == 'feed' ? 1 : 0;

                    }


                } catch (error) {
                    console.error(error);

                }
            }


            function insertPopularIframe() {
                if (!$('#qiuqi-aliPopular').get(0)) {
                    $('.mt-floor-nav__wrapper').after(`<div style='width:1200px;height:${height};margin:0 auto 22px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliPopular" src=${shortKeysHtml.aliPopular}></iframe></div>`);
                }
            }

            // 插入查看商品详情按钮
            function insertDetail() {
                const bLen = $('.qiuqi-btn-mt').length;
                const mLen = $('.mt-offer__content').length
                if (bLen < mLen) {
                    $('.qiuqi-btn-mt').remove();
                    $('.qiuqi-btn').off('click'); //解绑指定的事件

                    insertProductSearchDetails(4);
                }
                $('.lsou-prod-search-box').css('margin-top', '5px')
            }


            function initPopular() {
                if ($('.mt-offer__inner').get(0) && !$('.qiu-mt__content_count').get(0)) {
                    getTopFiveProd(shortKeysHtml.aliPopularTabIdx);
                }

                // tab标签监听
                if ($('.mt-floor-nav__item').get(0)) {
                    $('.mt-floor-nav__item').on('click', (e) => {
                        if (shortKeysHtml.aliPopularTabIdx === 0) {
                            return
                        }
                        shortKeysHtml.topFiveProdInfoList = []

                        getTopFiveProd(shortKeysHtml.aliPopularTabIdx)
                    })
                }
                insertDetail()
                insertPopularIframe();
            }

            monitorElementChange(initPopular, 'html');

        }


        // 是否在类目Popular榜页面 ==== end ====




        // 是否在图片识别列表页面 ==== start ====
        if (localHref.indexOf('https://www.alibaba.com/picture/search.htm?') === 0) {
            const callback = function (mutationRecoard, observer) {
                const bLen = $('.qiuqi-btn').length;
                const cLen = $('.fy23-search-card .card-info').length
                if (bLen < cLen) {
                    $('.qiuqi-btn').remove();
                    $('.qiuqi-btn').off('click'); //解绑指定的事件

                    insertProductSearchDetails(5);
                }
            };
            monitorElementChange(callback)
        }
        // 是否在图片识别列表页面 ==== end ====




        // 是否在阿里店铺 ==== start ====
        if (
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/productgrouplist/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/productlist/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/featureproductlist/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/company_profile/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/promotionPage/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/contactinfo/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/index/)) {

            //  店铺产品统计沙盒
            function insertShopProductCount(t = 0) {
                if (window.shopProductCountSCJS && !$('.qiuqi-shopProductCount-box').get(0)) {
                    // 移除未登录版本
                    $('#qiuqi-shopProductCount-unlogin').parent().remove();

                    $('.qiuqi-shopProductCount-box').remove();
                    try {
                        let cName = '.component-operation-panel .title'
                        console.log('timer=>');
                        if ($(`.module-product-list ${cName}`).length > 0) {
                            $(`.module-product-list ${cName}`).css({
                                display: 'flex',
                                // 'justify-content': 'space-between',
                            })

                            $(`.module-product-list ${cName}`).append(
                                `<div class="qiuqi-shopProductCount-box" style="height: 36px;min-width: 450px;flex: 1;"><iframe class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no" id="qiuqi-shopProductCount" src=${shortKeysHtml.shopProductCount}></iframe></div>`
                            )
                            const iframe = document.querySelector('#qiuqi-shopProductCount')
                            iframe.onload = function () {
                                // console.log("AAAAAAAAAAAAAA  BBBB"+initIframe);

                                initIframe('qiuqi-shopProductCount')
                            }
                        }
                    } catch (error) {
                        console.log('error=>', error)
                    }
                }

            }

            // 店铺快捷键沙盒
            function insertShopSotCutKeysIframe() {
                // 移除未登录版本
                $('#qiuqi-aliShop-unlogin').parent().remove();

                if (!$('#qiuqi-aliShopShortCutKey').get(0)) {
                    $('.module-product-list .component-view-control').prepend(`<div class="qiuqi-aliShopShortCutKey-box" style="height: 36px;min-width: 600px;flex: 1;"><iframe class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no" id="qiuqi-aliShopShortCutKey" src=${shortKeysHtml.aliShopShortCutKey}></iframe></div>`)
                    const iframe = document.querySelector('#qiuqi-aliShopShortCutKey')
                    iframe.onload = function () {
                        initIframe('qiuqi-aliShopShortCutKey')
                    }
                }

            }


            const callback = function (mutationRecoard, observer) {
                insertShopProductCount();
                insertShopSotCutKeysIframe();
                insertProductSearchDetails(1);
            };

            monitorElementChange(callback)
        }
        if (
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/search\/product/) ||
            localHref.match(/^https:\/\/.+\.\w+\.alibaba\.com\/collection_product/)) {

            //  店铺产品统计沙盒
            // function insertShopSearchProductCount(t = 0) {
            //     if (window.shopSearchProductCountSCJS && !$('.qiuqi-shopSearchProductCount-box').get(0)) {
            //         console.log('111')
            //         $('.qiuqi-shopSearchProductCount-box').remove();
            //         try {
            //             let cName = '.component-operation-panel .title'
            //             console.log('timer=>');
            //             if ($(`.module-product-list ${cName}`).length > 0) {
            //                 $(`.module-product-list ${cName}`).css({
            //                     display: 'flex',
            //                     // 'justify-content': 'space-between',
            //                 })

            //                 $(`.module-product-list ${cName}`).append(
            //                     `<div class="qiuqi-shopSearchProductCount-box" style="height: 36px;min-width: 450px;flex: 1;"><iframe class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no" id="qiuqi-shopSearchProductCount" src=${shortKeysHtml.shopSearchProductCount}></iframe></div>`
            //                 )
            //                 const iframe = document.querySelector('#qiuqi-shopSearchProductCount')
            //                 iframe.onload = function () {
            //                     initIframe('qiuqi-shopSearchProductCount')
            //                 }
            //             }
            //         } catch (error) {
            //             console.log('error=>', error)
            //         }
            //     }

            // }

            // 店铺产品搜索快捷键沙盒
            // function insertShopSearchSotCutKeysIframe() {
            //     if (!$('#qiuqi-aliShopSearchShortCutKey').get(0)) {
            //         $('.module-product-list.search-list .component-view-control').prepend(`<div class="qiuqi-aliShopSearchShortCutKey-box" style="height: 36px;min-width: 600px;flex: 1;"><iframe class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no" id="qiuqi-aliShopSearchShortCutKey" src=${shortKeysHtml.aliShopSearchShortCutKey}></iframe></div>`)
            //         const iframe = document.querySelector('#qiuqi-aliShopSearchShortCutKey')
            //         iframe.onload = function () {
            //             initIframe('qiuqi-aliShopSearchShortCutKey')
            //         }
            //     }

            // }



            const callback = function (mutationRecoard, observer) {
                // insertShopSearchProductCount();
                insertShopSearchSotCutKeysIframe();
            };

            monitorElementChange(callback)
        }
        // 是否在阿里店铺 ==== end ====


        //  ==== 是否在阿里类目TopRanking榜单页面 start ==== 
        if (isAliCategoryRanking) {
            $('.alimod-fy24-product-ranking .hugo4-pc-navi-flex-container .tab-wrapper.level-1 .tab-inner-wrapper.text .tab-item').on('click', (e) => {
                setTimeout(() => {
                    $('.qiuqi-btn').remove();
                }, 50);
            })
            function insertAliTopRanking() {
                if (!$('#qiuqi-aliCategoryRanking').get(0)) {
                    $('.top-banner-wrapper').after(`<div style='height:40px;width:1200px;margin:0 auto'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="qiuqi-aliCategoryRanking" src=${shortKeysHtml.aliCategoryRanking}></iframe></div>`);
                }
                if ($('.top-ranking-floor .top-ranking-card .hugo4-product').length > 0) {
                    insertProductSearchDetails(3)
                }

            }

            monitorElementChange(insertAliTopRanking)
        }

        //  ==== 是否在阿里类目TopRanking榜单页面 end ==== 




        // ==== 是否在阿里市场洞察页面（市场参谋->查国家(地区)->查看详情 ） start ==== 
        if (isIndPeoIdx) {
            $('.ant-tabs-nav .ant-tabs-tab').on('click', function (event) {
                const target = $(event.target)
                if (target.text() === '热品分析') {
                    setTimeout(() => {
                        if ($('#laisou-aliCountryRankProducts').length) {
                            return
                        }
                        const currentTabpane = $('.ant-tabs-content .ant-tabs-tabpane')[2]
                        const tableGroups = $(currentTabpane).find('.table-group')
                        // 产品访客偏好排行Top20
                        const prodVisitorTarget = tableGroups[0]
                        insertAliIndPeoIdx(prodVisitorTarget)

                        // 产品询盘偏好排行Top20
                        const prodInquiryTarget = tableGroups[1]
                        insertAliIndPeoIdx(prodInquiryTarget)

                    }, 500);

                }
            })
            function insertAliIndPeoIdx(element) {
                const title = $(element).children('div').children('span')
                title.after(`<div style='height: 40px;margin-top: -40px;position: relative;left:190px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliCountryRankProducts" src=${shortKeysHtml.aliCountryRankProducts}></iframe></div>`)
            }


            monitorElementChange(() => {
                if (!$('#industry-peopleIndex-tab').length && $('.ant-tabs-nav').length) {
                    $($('.ant-tabs-nav').children()[0]).append(`<div style='height: 40px;margin-top: -48px;position: relative;left:488px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="industry-peopleIndex-tab" src=${shortKeysHtml.aliCountryRankProducts}&type=1></iframe></div>`)
                }
            })


        }

        // ==== 是否在阿里市场洞察页面（市场参谋->查国家(地区)->查看详情 ） end ==== 



        // ==== 是否在阿里客户管理 start ==== 
        if (localHref.indexOf('https://alicrm.alibaba.com/') !== -1) {
            window.onhashchange = function (event) {
                const { newURL } = event;
                $('.laisou-iframe').remove();
            }
            myInitIframe();
            function myInitIframe() {

                monitorElementChange(() => {
                    const isAliCustomer = window.location.href.indexOf('my-customer') !== -1
                    const isAliPublicCustomer = window.location.href.indexOf('public-customer') !== -1

                    if (!$('#laisou-aliCustomer').length && isAliCustomer) {
                        $('.crm-app-main-container').before(`<div class="laisou-iframe" style='height:${height};margin-top:20px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliCustomer" src=${shortKeysHtml.aliCustomer}></iframe></div>`)
                    }

                    if (!$('#laisou-aliPublicCustomer').length && isAliPublicCustomer) {

                        $('.crm-app-main-container').before(`<div class="laisou-iframe" style='height:${height};margin-top:20px'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliPublicCustomer" src=${shortKeysHtml.aliPublicCustomer}></iframe></div>`)
                    }
                })
            }


        }

        // ==== 是否在阿里客户管理 end ==== 


        // ==== 是否在新-阿里热门产品榜单 start ====
        if (isNewAliPopularRankings) {
            function insertAliPopularRankings() {
                if (!$('#laisou-aliPopularRankings').get(0)) {
                    const targetEle = $('.alimod-product-rank-waterfall .tab-wrapper.level-2 .tab-inner-wrapper')
                    targetEle.css({ 'width': '1200px' })
                    targetEle.append(`<div class="laisou-iframe" style='height:${height};margin:16px 20px 0 0;width:400px;'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliPopularRankings" src=${shortKeysHtml.aliNewPopularRankings}></iframe></div>`)
                }


                const bLen = $('.qiuqi-btn').length;
                const mLen = $('.top-rank-floor-pc .hugo4-pc-grid-item').length
                if (bLen < mLen) {
                    $('.qiuqi-btn').remove()
                    $('.qiuqi-btn').off('click')
                    insertProductSearchDetails(6)
                }
            }
            monitorElementChange(insertAliPopularRankings)
        }

        // ==== 是否在新-阿里热门产品榜单 end ====



        // ==== 是否在阿里后台->买家参谋 start ==== 
        if (isAliMarketingInsight) {
            window.onhashchange = function (event) {
                const { newURL } = event;
                $('.laisou-iframe').remove();
            }
            function insertAliMarketingInsight() {
                monitorElementChange(() => {
                    if (window.location.href.indexOf('#industry') !== -1) {
                        if (!$('#laisou-aliIndustryBuyer').length && $('.customer-filter')) {
                            $('.customer-filter').after(`
                            <div class="laisou-iframe" style='border:1px solid #e5e7eb;box-sizing:border-box;height:${height_new};margin-bottom:20px;background:#fff;border-radius:10px;padding:10px'>
                            <iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliIndustryBuyer" src=${shortKeysHtml.aliIndustryBuyer}></iframe>
                            </div>
                                `)
                        }
                    }

                })
            }
            insertAliMarketingInsight();
        }

        // ==== 是否在阿里后台->买家参谋 end ==== 


        // ==== 阿里后台 -> 商机沟通 -> 所有询价单 start ====
        if (isAliMessageDefault) {
            monitorElementChange(() => {
                if (!$('#laisou-aliBizCommInquirySheet').length && $('.ui2-tab-nav')) {
                    $('.ui2-tab-nav').append(`<li style="margin-left: 10px;position:relative;z-index:1"><div class="laisou-iframe" style='height:${height};width: 315px;'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-aliBizCommInquirySheet" src=${shortKeysHtml.aliBizCommInquirySheet}></iframe></div></li>`)
                }
            })
        }
        // ==== 阿里后台 -> 商机沟通 -> 所有询价单 end ====

        // ==== 聊天详情页 - 复制聊天内容 start ====

        if (isChatDetail) {
            monitorElementChange(() => {
                if (!$('#laisou-chatDetail').length && $('.send-header-menu')) {
                    $('.send-header-menu').append(`<span style="margin-left: 10px;background-color:#fff;border-radius:12px;box-shadow:0 1px 1px #ccc;cursor:pointer;font-size:12px;z-index:1"><div class="laisou-iframe" style='height:24px;width:85px;'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-chatDetail" src=${shortKeysHtml.chatDetail}></iframe></div></span>`)
                }
            })
        }
        // ==== 聊天详情页 - 复制聊天内容 end ====

        // ==== 聊天详情页 - 复制客户信息 start ====

        if (isChatDetail) {
            monitorElementChange(() => {
                if (!$('#laisou-chatDetailInfo').length && $('.send-header-menu')) {
                    $('.send-header-menu').append(`<span style="margin-left: 10px;background-color:#fff;border-radius:12px;box-shadow:0 1px 1px #ccc;cursor:pointer;font-size:12px;z-index:1"><div class="laisou-iframe" style='height:24px;width:85px;'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-chatDetailInfo" src=${shortKeysHtml.chatDetailInfo}></iframe></div></span>`)
                }
            })
        }
        // ==== 聊天详情页 - 复制客户信息 end ====

        // ====  rfq采购直达 start ==== 



        // ==== rfq采购直达 end ==== 



        // 是否在阿里后台首页
        if (isAliBackendHomepage) {
            monitorElementChange(() => {
                if (!$('#laisou-excelDiagnosis').get(0) && $('.next-tabs-nav-scroll')) {
                    $($('.home-container .next-tabs-nav-scroll')[0]).css({ 'display': 'flex', 'position': 'relative' })
                    $($('.home-container .next-tabs-nav-scroll')[0]).append(`<div class="laisou-iframe" style='height:${height};'><iframe marginwidth="0" marginheight="0" class="chrome_container_iframe" scrolling="no" id="laisou-excelDiagnosis" src=${shortKeysHtml.excelDiagnosis}&type=1></iframe></div>`)
                }
            })
        }


    })($laisou)


}

// 显示rfq推荐等级
export function insertShowRfqLevel($) {
    if (localHref.indexOf('https://sourcing.alibaba.com/rfq_detail.htm') === -1) {
        return
    }
    function getRelatedRfqRecommend() {
        const rfqPid = getQueryParams(localHref, 'p')
        chrome.runtime.sendMessage(window.qiuqiChromeId, { type: 'getAliCookie' }).then(async cookieRes => {
            const { cook, isLoged } = cookieRes.data;
            if (isLoged) {
                let ctoken = "";
                let _tb_token_ = "";
                let is_xman_us_t = false;
                let is_sign = false;
                let xsrfToken = "";
                let loginId = "";
                cook.forEach(v => {
                    if (v.name == "xman_us_t") {
                        is_xman_us_t = true;
                        is_sign = v.value.indexOf("sign=y") !== -1;
                        ctoken = v.value.match(/(?:^|&)\s*ctoken\s*=\s*([^&]+)/)[1]
                        loginId = v.value.match(/(?:^|&)\s*x_lid\s*=\s*([^&]+)/)[1]
                    } else if (v.name == "XSRF-TOKEN") {
                        xsrfToken = v.value;
                    } else if (v.name == "_tb_token_") {
                        _tb_token_ = v.value;
                    }
                })
                // 获取相关rfq推荐数据
                const url = `https://sourcing.alibaba.com/rfq/ajax/RelatedRfqRecommendAjax.do?market=seller&sceneId=seller_detail_related&recommendNum=3&p=${rfqPid}&ctoken=${ctoken}&_tb_token_=${_tb_token_}&_=${new Date().getTime()}`
                try {
                    const response = await httpRequest({ method: 'get', url });
                    const relatRfqRecomRes = JSON.parse(response.body)
                    if (relatRfqRecomRes.code === '200') {
                        const { data: { rfqList } } = relatRfqRecomRes
                        for (let index = 0; index < rfqList.length; index++) {
                            const item = rfqList[index]
                            const quoRes = await httpRequest({ method: 'get', url: item.quoUrl });



                        }
                    }

                } catch (error) {
                    console.error(error);

                }



            }

        })

    }

    function insertRfqLevelSwitch() {
        if (!$('.lsou-rfq-box').length) {
            $('.brh-rfq-detail .topic').append(`<div class="lsou-rfq-box">
            <img src="${config.iframeBaseURL}/assets/logo.png" class="lsou-logo" alt="">
            <span class="lsou-rfq-label">显示RFQ客户等级：</span>
            <label class="lsou-rfq-switch">
                <input type="checkbox" id="lsouToggleSwitch">
                <span class="lsou-rfq-slider"></span>
            </label>
        </div>`)
            getRelatedRfqRecommend();
            $('#lsouToggleSwitch').on('change', function () {
                const isChecked = $(this).is(':checked');
                console.log(isChecked);

                // $('#status').text(`Switch is ${isChecked ? 'ON' : 'OFF'}`);
            });
        }
    }
    monitorElementChange(insertRfqLevelSwitch)
}

// 执行任务->产品列->查看商品数据
export function runSandboxTask() {
    (async function ($) {
        try {
            loadGenerator = true;
            // 商品列表
            const offers = window.__page__data_sse10._offer_list.offerResultData.offers || []
            // console.log('offers数组：', offers); 
            if (offers.length === 0) {
                showToast('未获取到商品数据');
                loadGenerator = false;
                return;
            }
            console.log('offers总数:', offers.length);

            // 分别统计广告和普通商品
            const adOffers = [];
            const normalOffers = [];

            offers.forEach((oItem, index) => {
                const isAd = oItem.adInfo && Object.keys(oItem.adInfo).length > 0;
                if (isAd) {
                    adOffers.push({ ...oItem, originalIndex: index, isAd: true });
                } else {
                    normalOffers.push({ ...oItem, originalIndex: index, isAd: false });
                }
            });

            console.log(`广告商品: ${adOffers.length}个，普通商品: ${normalOffers.length}个`);

            // 获取DOM中的卡片
            const adCards = $('.__fy26-product-card-wrapper');
            const normalCards = $('.fy26-product-card');

            console.log(`DOM中广告卡片: ${adCards.length}个，普通卡片: ${normalCards.length}个`);

            // 复用单个点击的高度计算逻辑
            const urlParams = getQueryParams(window.location.href);
            const gallery = urlParams.isGallery;
            const sceneId = urlParams.sceneId;
            const localHref = window.location.href;
            let viewtype = urlParams.viewtype
            let baseHeight = 120
            if (viewtype === 'L') {
                baseHeight = 80;
            }
            if (!$('.fy26-product-card-wrapper').get(0)) baseHeight = 175;
            if (((gallery === 'N')) || $('.fy23-list-card').width() >= 900) baseHeight = 105;
            if (sceneId || localHref.indexOf('https://www.alibaba.com/picture/search.htm') === 0) baseHeight = 200;
            if (localHref.indexOf('https://sale.alibaba.com/p/rank/detail.html') === 0) baseHeight = 238;
            if (localHref.indexOf('https://sale.alibaba.com/p/picture/search.htm') === 0) baseHeight = 238;

            // 循环处理每个商品
            for (let adIndex = 0; adIndex < adOffers.length; adIndex++) {
                if (!loadGenerator) break;


                // console.log(`处理第${idx}个商品（广告），广告索引: ${adIndex}`);

                // 检查对应的DOM广告卡片是否存在
                if (adIndex >= adCards.length) {
                    console.warn(`广告卡片不足，跳过第${adIndex + 1}个广告`);
                    continue;
                }


                const $card = $(adCards[adIndex]);
                // 先找到按钮
                const $btn = $card.find('[id^="lsou-fy-btn-"]');
                if (!$btn.length) {
                    console.warn(`第${adIndex + 1}个卡片未找到按钮，跳过`);
                    continue;
                }
                // 从按钮ID里提取排名
                const idx = $btn.attr('id').replace('lsou-fy-btn-', '');
                // 获取商品数据
                const oItem = offers[adIndex]
                if (!oItem) {
                    console.warn(`第${idx}个卡片无对应商品数据，跳过`);
                    continue;
                }

                const isNewAd = !!oItem.adInfo; // 广告标识
                const eIdx = offers.find(v => v.adInfo) ? index - 1 : index;

                // const $btn = $card.find(`#lsou-fy-btn-${idx}`);
                // const prodTag = $btn.find(`.prod-tag`).text()

                // const $btn = $card.find('[id^="lsou-fy-btn-"]');
                const prodTag = $btn.find('.prod-tag').text().trim();
                if (!$btn.length) {
                    console.warn(`第${idx}个卡片未找到"查看商品数据"按钮，跳过`);
                    continue;
                }

                // 校验是否已加载
                const existingIframe = $card.find(`.lsou-prod-search-box`);
                if (existingIframe.length) {
                    console.log(`第${idx}个卡片已存在数据，跳过`);
                    $btn.hide();
                    continue;
                }

                // 商品链接
                const titleLink = isNewAd
                    ? $card.find('.searchx-product-e-slider__wrapper a')
                    : $card.find('.fy26-product-card-content .searchx-title-area .searchx-product-e-title a');
                if (!titleLink.length) {
                    console.warn(`第${idx}个卡片未找到商品链接，跳过`);
                    continue;
                }
                const prodUrl = complteUrl(titleLink.attr('href'));
                // console.log(`第${idx}个卡片：isNewAd=${isNewAd}，prodUrl=${prodUrl}`);

                // 提示状态
                $btn.addClass('qiuqi-is-disabled').html(`<div id="qiuqi-button-loading"></div>加载中..`).show();

                const prodIframe = `<div class="lsou-prod-search-box" data-index="${idx}" 
                    style="width:100%;height:${baseHeight}px;display:none;margin-bottom:8px;">
                    <iframe id="qiuqi-productSearchDetails-${idx}" class="chrome_container_iframe" marginwidth="0" marginheight="0" 
                        scrolling="no" src="${shortKeysHtml.productSearchDetails}">
                    </iframe>
                </div>`;

                // 广告商品数据位置
                let parentEle = $card.find('.lsou-pay-img');
                if (parentEle.length) {
                    parentEle.before(prodIframe);
                } else if ($card.find('.searchx-product-area').next().length) {
                    $card.find('.searchx-product-area').next().after(prodIframe);
                } else {
                    $card.find('.searchx-product-area').after(prodIframe);
                }

                // 初始化iframe
                const iframe = document.getElementById(`qiuqi-productSearchDetails-${idx}`);
                if (iframe) {
                    iframe.onload = function () {
                        initIframe(`qiuqi-productSearchDetails-${idx}`, { idx, prodUrl, prodTag });
                    };
                } else {
                    console.error(`第${idx}个广告iframe未创建成功`);
                    continue;
                }

                setTimeout(() => {
                    const $iframeBox = $(`.lsou-prod-search-box[data-index="${idx}"]`);
                    if ($iframeBox.length) {
                        $iframeBox.css('display', 'block');
                        $btn.css('display', 'none');
                    } else {
                        console.error(`第${idx}个广告iframe容器未找到`);
                    }
                }, 50);

                await delayTimes(1000);
            }

            // 处理普通商品
            for (let normalIndex = 0; normalIndex < normalOffers.length; normalIndex++) {
                if (!loadGenerator) break;

                const oItem = normalOffers[normalIndex];
                const $card = $(normalCards[normalIndex]);

                // 检查对应的DOM普通卡片是否存在
                if (normalIndex >= normalCards.length) {
                    console.warn(`普通卡片不足，跳过第${normalIndex + 1}个普通商品`);
                    continue;
                }
                const $btn = $card.find('[id^="lsou-fy-btn-"]');
                const idx = $btn.attr('id').replace('lsou-fy-btn-', '');
                // console.log(`处理第${idx}个商品（普通），普通索引: ${normalIndex}`);


                if (!$btn.length) {
                    console.warn(`第${idx}个普通卡片未找到"查看商品数据"按钮，跳过`);
                    continue;
                }

                // 校验是否已加载
                const existingIframe = $card.find(`.lsou-prod-search-box`);
                if (existingIframe.length) {
                    console.log(`第${idx}个普通卡片已存在数据，跳过`);
                    $btn.hide();
                    continue;
                }

                // 普通商品链接
                const titleLink = $card.find('.fy26-product-card-content .searchx-title-area .searchx-product-e-title a');
                if (!titleLink.length) {
                    console.warn(`第${idx}个普通卡片未找到商品链接，跳过`);
                    continue;
                }

                const prodUrl = complteUrl(titleLink.attr('href'));
                const prodTag = $btn.find(`.prod-tag`).text() || `${oItem.showAddToCart ? '交易品' : '定制品'}`;

                // 提示状态
                $btn.addClass('qiuqi-is-disabled').html(`<div id="qiuqi-button-loading"></div>加载中..`).show();

                const prodIframe = `<div class="lsou-prod-search-box" data-index="${idx}" 
                    style="width:100%;height:${baseHeight}px;display:none;margin-bottom:8px;">
                    <iframe id="qiuqi-productSearchDetails-${idx}" class="chrome_container_iframe" marginwidth="0" marginheight="0" 
                        scrolling="no" src="${shortKeysHtml.productSearchDetails}">
                    </iframe>
                </div>`;

                // 普通商品数据位置
                let parentEle = $card.find('.lsou-pay-img');
                if (parentEle.length) {
                    parentEle.before(prodIframe);
                } else {
                    const cardContent = $card.find('.fy26-product-card-content');
                    if (cardContent.length) {
                        cardContent.append(prodIframe);
                    } else {
                        $card.append(prodIframe);
                    }
                }

                // 初始化iframe
                const iframe = document.getElementById(`qiuqi-productSearchDetails-${idx}`);
                // console.log('iframe', iframe)
                if (iframe) {
                    iframe.onload = function () {
                        initIframe(`qiuqi-productSearchDetails-${idx}`, { idx, prodUrl, prodTag });
                        // console.log(`第${idx}个iframe加载完成`);
                    };
                } else {
                    console.error(`第${idx}个iframe未创建成功`);
                    continue;
                }

                setTimeout(() => {
                    const $iframeBox = $(`.lsou-prod-search-box[data-index="${idx}"]`);
                    if ($iframeBox.length) {
                        $iframeBox.css('display', 'block');
                        $btn.css('display', 'none');
                        // console.log(`第${idx}个iframe已显示`);
                    } else {
                        console.error(`第${idx}个iframe容器未找到`);
                    }
                }, 50);

                await delayTimes(1000);
            }

            loadGenerator = false;
            showToast('批量加载完成');
        } catch (error) {
            loadGenerator = false;
            currentLoadingIframe = null;
            console.error('批量加载报错：', error);
            showToast('批量加载失败');
        }
    })($laisou);
}
// 关闭任务->产品列->隐藏商品数据
export function hideProductData() {
    (function ($) {
        try {
            // 中断加载
            if (loadGenerator) {
                loadGenerator = false;
                showToast('已中断批量加载');
            }

            // 处理正在加载的iframe
            if (currentLoadingIframe) {
                currentLoadingIframe.src = 'about:blank';
                if (currentLoadingIframe.parentNode) {
                    currentLoadingIframe.remove();
                }
                currentLoadingIframe = null;
            }

            // 恢复所有按钮+清理
            const productCards = $('.fy26-product-card-wrapper, .component-product-list .product-info, .top-ranking-floor .top-ranking-card, .mt-offer__content, .fy23-search-card .card-info, .top-rank-floor-pc .hugo4-pc-grid-item');
            productCards.each((cardIndex, card) => {
                const $card = $(card);
                const $btn = $card.find('.qiuqi-btn'); // 获取当前卡片的按钮
                const iframeBox = $card.find('.lsou-prod-search-box');
                const iframe = iframeBox.find('.chrome_container_iframe')[0]

                // 清理iframe
                if (iframeBox.length) iframeBox.remove();
                if (iframe) {
                    iframe.src = 'about:blank';
                    if (iframe.parentNode) iframe.remove();
                }

                //  恢复状态
                if ($btn.length) {
                    const btnType = $btn.attr('data-type'); // 按钮类型
                    const btnIdx = $btn.attr('data-index'); // 按钮索引
                    const btnId = $btn.attr('id'); // 按钮ID
                    let btnHtml = '';

                    // type===2
                    if (btnType === '2' || btnType === 'card') {
                        const offers = window.__page__data_sse10._offer_list.offerResultData.offers || []
                        const targetOffer = offers[btnIdx - 1]

                        if (targetOffer) {
                            // 交易品/定制品
                            let prodTag = targetOffer.showAddToCart ? '交易品' : '定制品';
                            const prodTagStyle = `font-size:12px;border-radius: 6px; background-color: #f60; padding: 1px 5px;color:#fff;margin-left:8px`;


                            const subTypeReg = /subType:([^@]+?)@@/;
                            const match = targetOffer.trackInfo.match(subTypeReg);

                            if (match && match[1]) {
                                const foundItem = subTypeList.find(e => e.label === match[1]);
                                if (foundItem) prodTag += ' - ' + foundItem.value;
                            }

                            btnHtml = `<div class='qiuqi-btn-logo' data-tag=${prodTag}></div>
                                      <span>查看商品数据</span>
                                      <span class='prod-tag' style='${prodTagStyle}'>${prodTag}</span>`;
                        } else {
                            // 基础结构
                            btnHtml = `<div class='qiuqi-btn-logo'></div> 查看商品数据`;
                        }
                        $btn.css('margin-bottom', '8px').removeClass('qiuqi-btn-mt');
                    } else if (btnType === '1') {
                        btnHtml = `<div class='qiuqi-btn-logo'></div> 查看商品数据`;
                        $btn.css('margin-bottom', '8px').removeClass('qiuqi-btn-mt');

                    } else if (btnType === '3') {
                        btnHtml = `<div class='qiuqi-btn-logo'></div>查看商品数据`;
                        $btn.css('margin-top', '5px').removeClass('qiuqi-btn-mt');

                    } else if (btnType === '4') {
                        btnHtml = `<div class='qiuqi-btn-logo'></div> 查看商品数据`;
                        $btn.css('margin-top', '5px').addClass('qiuqi-btn-mt');

                    } else if (btnType === '5') {
                        btnHtml = `<div class='qiuqi-btn-logo'></div> 查看商品数据`;
                        $btn.css('margin-bottom', '8px').removeClass('qiuqi-btn-mt');

                    } else if (btnType === '6') {
                        btnHtml = `<div class='qiuqi-btn-logo'></div>查看商品数据`;
                        $btn.css('margin', '0').removeClass('qiuqi-btn-mt');

                    } else {
                        btnHtml = `<div class='qiuqi-btn-logo'></div> 查看商品数据`;
                        $btn.css('margin-bottom', '8px').removeClass('qiuqi-btn-mt');
                    }

                    // 恢复按钮状态
                    $btn
                        .css('display', 'flex')
                        .removeClass('qiuqi-is-disabled')
                        .html(btnHtml);
                }
            });
            console.log('商品数据已隐藏，加载已中断');
        } catch (error) {
            console.error('hideProductData 执行报错：', error);
            showToast('隐藏商品数据失败，请重试');
        }
    })($laisou);
}