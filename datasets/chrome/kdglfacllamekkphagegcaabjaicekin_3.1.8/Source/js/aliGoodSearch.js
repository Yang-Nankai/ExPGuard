/*
 * @Date: 2025-10-28 09:19:28
 * @LastEditTime: 2025-10-30 16:10:45
 * @FilePath: /chrome-extension-mv3/src/utils/aliGoodSearch.js
 * @Description: Alibaba商品搜索页相关功能
 */

import config from '../common/config.js'

import { getSubTypeData, getQueryParams, complteUrl, initIframe, httpRequest }
    from './index.js'
export function initAliGoodSearch() {

    const timeStamp = new Date().getTime()
    const ifaAliProdCntUrl = `${config.iframeBaseURL}/iframe/productCount.html?${timeStamp}`
    const ifaAliProdSeaDeaUrl = `${config.iframeBaseURL}/iframe/productSearchDetails_New.html?${timeStamp}`;


    const subTypeList = getSubTypeData()
    if (
        window.location.href.indexOf('alibaba.com/trade/search') !== -1 &&
        window.searchProductDetailSCJS
    ) {
        window.__page__data_sse10 = {}
        console.log("AAAAAAAAAAAAAAAAAAAAA window" + document.documentElement.outerHTML);
        const regex = /window\.__page__data_sse10\._offer_list\s*=\s*({.*})/;
        const match = document.documentElement.outerHTML.match(regex);

        window.__page__data_sse10._offer_list = JSON.parse(match[1]);
        console.log("AAAAAAAAAAAAAAAA offerlist" + window.__page__data_sse10._offer_list);
        const offers = window.__page__data_sse10._offer_list.offerResultData.offers;
        // 搜索词产品数和总商家数
        try {
            $('.app-organic-search__refine').before(
                `<div style="height:44px;">
                        <iframe style="height:100%;width:100%" marginwidth="0" marginheight="0"  scrolling="no" 
                        id="lsou-productCount" src=${ifaAliProdCntUrl}>
                        </iframe>
                        </div>`
            )
            const iframe = document.querySelector('#lsou-productCount')
            iframe.onload = function () {
                initIframe('lsou-productCount')
            }
        } catch (error) {
            console.log('error=>', error)
        }



        // 查看商品详情数据
        try {
            const bLen = $('.qiuqi-btn').length;
            const cLen = $('.fy26-product-card .fy26-product-card-content').length;

            if (bLen < cLen) {
                $('.qiuqi-btn').remove();
                $('.qiuqi-btn').off('click');

                const urlParams = getQueryParams(window.location.href);
                const gallery = urlParams.isGallery;
                let viewtype = urlParams.viewtype;
                let searchText = urlParams.SearchText;
                let ifaHeight = 125;

                if (viewtype === 'L') {
                    ifaHeight = 45;
                }
                if (!searchText) {
                    searchText = urlParams.searchText;
                }
                if (((gallery === 'N')) || $('.fy23-list-card').width() >= 900) {
                    ifaHeight = 125;
                }

                // console.log('offers数量：', offers.length);
                let adIndex = 0;  // 广告在DOM中的索引
                let normalIndex = 0;  // 普通商品在DOM中的索引

                offers.forEach((oItem, index) => {
                    // console.log('处理第', index, '个商品');
                    const idx = index + 1;
                    const bid = `lsou-fy-btn-${idx}`;
                    const isAd = oItem.adInfo && Object.keys(oItem.adInfo).length > 0;
                    // console.log('oItem',oItem)
                    // console.log('是否为广告:', isAd, 'showAddToCart:', oItem.showAddToCart);
                    // console.log('oItem.showAddToCart',oItem.showAddToCart)
                    // 修正prodTag逻辑：showAddToCart为true是交易品，false为定制品
                    let prodTag = `${oItem.showAddToCart ? '交易品' : '定制品'}`;

                    const prodTagStyle = `font-size:12px;border-radius: 4px; background-color: #f60; padding: 1px 6px;color:#fff;margin-left:8px`;
                    const subTypeReg = /subType:([^@]+?)@@/;
                    const match = oItem.trackInfo && oItem.trackInfo.match(subTypeReg);

                    if (match && match[1]) {
                        const foundItem = subTypeList.find(e => e.label === match[1]);
                        if (foundItem) {
                            prodTag += ' - ' + foundItem.value;
                        }
                    }

                    const insertHtmlText = `<div style='margin-bottom:8px' data-tag="${prodTag}" data-type='card' 
                                            data-index='${idx}' data-id=${bid} id=${bid} class="qiuqi-btn qiuqi-button--text ">
                                      <span class='qiuqi-btn-logo'></span>
                                      <span>查看商品数据</span>
                                      <span class='prod-tag' style='${prodTagStyle}'>${prodTag}</span>
                                      </div>`;

                    if (isAd) {
                        // console.log('插入广告商品按钮，广告索引:', adIndex);
                        // 获取所有广告容器
                        const adWrappers = $('.__fy26-product-card-wrapper');

                        if (adIndex < adWrappers.length) {
                            // 找到对应的广告容器并插入按钮
                            adWrappers.eq(adIndex).find('.searchx-product-area')
                                .next()
                                .after(insertHtmlText);
                            adWrappers.eq(adIndex).addClass(`lsou-fy-box-${idx}`);
                            adIndex++;
                        } else {
                            console.warn('广告容器数量不足，无法插入按钮');
                        }
                    } else {
                        // console.log('插入普通商品按钮，普通索引:', normalIndex);
                        // 获取所有普通商品容器
                        const cardElements = $('.fy26-product-card .fy26-product-card-content');
                        if (normalIndex < cardElements.length) {
                            // 找到对应的普通商品容器并插入按钮
                            cardElements.eq(normalIndex).append(insertHtmlText);
                            $('.fy26-product-card').eq(normalIndex).addClass(`lsou-fy-box-${idx}`);
                            normalIndex++;
                        } else {
                            console.warn('普通商品容器数量不足，无法插入按钮');
                        }
                    }

                    // 检查是否有iframe
                    const isIframe = $('.__fy26-product-card-wrapper').find('.lsou-prod-search-box').length > 0;
                    if (isIframe) {
                        $(`#${bid}`).css('display', 'none');
                    }
                });


                $('.qiuqi-btn').on('click', (e) => {
                    const id = $(e.currentTarget).attr('id')
                    const idx = $(e.currentTarget).attr('data-index')
                    let className = `.lsou-fy-box-${idx} .searchx-product-e-title a`
                    if (!$(className).length) className = `.lsou-fy-box-${idx} .searchx-title-area a`

                    const prodTag = $(`.lsou-fy-box-${idx} .prod-tag`).text()
                    const prodUrl = complteUrl($(className).eq(0).attr('href'))

                    const data = { idx, prodUrl, prodTag }
                    const iframeId = `qiuqi-productSearchDetails-${idx}`
                    const prodIframe = `<div class="lsou-prod-search-box" style="width:100%;
                            height:${ifaHeight}px;display:none"><iframe id="${iframeId}" 
                            class="chrome_container_iframe" marginwidth="0" marginheight="0"  scrolling="no"  
                            src=${ifaAliProdSeaDeaUrl}></iframe></div>`

                    $(`#${id}`).addClass('qiuqi-is-disabled')
                    $(`#${id}`).html(`<div id="qiuqi-button-loading"></div>加载中..`)



                    let aliDom = `.lsou-fy-box-${idx} .lsou-pay-img`;
                    if ($(aliDom).length) {
                        $(aliDom).before(prodIframe);

                    } else if ($(aliDom = `.lsou-fy-box-${idx} .fy26-product-card-content`).length) {
                        $(aliDom).append(prodIframe);

                    } else {
                        $(`.lsou-fy-box-${idx} .searchx-product-area`).next().after(prodIframe);
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
                    }, 50)
                })

            }

        } catch (error) {
            console.log('error=>', error);
        }




        // 双11购买倒计时弹出框
        // try {

        //     const lsouPublicRes = await httpRequest(
        //         {
        //             method: 'get',
        //             url: config.baseURL + '/index/public/version'
        //         }
        //     )

        //     const sysAdvBanner = await httpRequest(
        //         {
        //             method: 'get',
        //             url: config.baseURL + '/index/public/getSysAdvBannerList'
        //         }
        //     )
        //     const publicData = JSON.parse(lsouPublicRes.body).data
        //     const advBannerData = JSON.parse(sysAdvBanner.body).data

        //     const targetTimestamp = Math.floor(new Date(publicData.pakActivityTime.replace('\n', '')).getTime() / 1000)

        //     const activityData = advBannerData.find(item => item.type === 24)

        //     // 计算时间差函数
        //     const getTimeDiff = () => {
        //         const now = Math.floor(Date.now() / 1000);
        //         const diff = targetTimestamp - now;
        //         return diff;
        //     }

        //     //  更新倒计时显示函数
        //     const updateCountdown = () => {
        //         const diff = getTimeDiff();
        //         if (diff <= 0) {
        //             document.getElementById('lsou-cntdwn-days').textContent = '00';
        //             document.getElementById('lsou-cntdwn-hours').textContent = '00';
        //             document.getElementById('lsou-cntdwn-minutes').textContent = '00';
        //             document.getElementById('lsou-cntdwn-seconds').textContent = '00';
        //             return;
        //         }

        //         // 计算天、小时、分钟、秒
        //         const days = Math.floor(diff / (24 * 60 * 60));
        //         const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
        //         const minutes = Math.floor((diff % (60 * 60)) / 60);
        //         const seconds = diff % 60;


        //         $('#lsou-cntdwn-days').text(days.toString().padStart(2, '0'));
        //         $('#lsou-cntdwn-hours').text(hours.toString().padStart(2, '0'));
        //         $('#lsou-cntdwn-minutes').text(minutes.toString().padStart(2, '0'));
        //         $('#lsou-cntdwn-seconds').text(seconds.toString().padStart(2, '0'));
        //     }
        //     //  初始化倒计时
        //     if (getTimeDiff() > 0) {
        //         $('body').append(`<div id="lsou-tooltip">
        //     <img
        //         src="${config.iframeBaseURL}/script/assets/img/lsou-pay-pop.png"/>
        //     <div class="lsou-cntdwn-container">
        //         <div class="lsou-cntdwn-item">
        //             <span class="lsou-cntdwn-label">倒计时：</span>
        //         </div>
        //         <div class="lsou-cntdwn-item">
        //             <span class="lsou-cntdwn-value" id="lsou-cntdwn-days">00</span>
        //             <span class="lsou-cntdwn-label">天</span>
        //         </div>
        //         <div class="lsou-cntdwn-item">
        //             <span class="lsou-cntdwn-value" id="lsou-cntdwn-hours">00</span>
        //             <span class="lsou-cntdwn-label">小时</span>
        //         </div>
        //         <div class="lsou-cntdwn-item">
        //             <span class="lsou-cntdwn-value" id="lsou-cntdwn-minutes">00</span>
        //             <span class="lsou-cntdwn-label">分</span>
        //         </div>
        //         <div class="lsou-cntdwn-item">
        //             <span class="lsou-cntdwn-value" id="lsou-cntdwn-seconds">00</span>
        //             <span class="lsou-cntdwn-label">秒</span>
        //         </div>
        //     </div>
        // </div>`)


        //         updateCountdown();
        //         setInterval(updateCountdown, 1000);


        //         let useSecondPosition = true;
        //         $('.qiuqi-btn').each((index, element) => {
        //             const positionInGroup = index % 4;

        //             if (positionInGroup === 0) {
        //                 useSecondPosition = !useSecondPosition; // 切换位置
        //             }

        //             const selectedPosition = useSecondPosition ? 1 : 2;
        //             if (positionInGroup === selectedPosition) {
        //                 $(element).after(`<div class='lsou-pay-img'></div>`);
        //             }
        //         });


        //         let hideTimeout;
        //         const tooltip = $('#lsou-tooltip');
        //         //  鼠标悬停显示tooltip
        //         $('.lsou-pay-img')
        //             .on('mouseenter', function () {
        //                 clearTimeout(hideTimeout);
        //                 const $trigger = $(this);
        //                 const triggerPos = $trigger.offset();

        //                 // 定位到元素上方居中
        //                 const left = triggerPos.left + $trigger.outerWidth() / 2;
        //                 const top = triggerPos.top - tooltip.outerHeight() - 6;

        //                 tooltip.css({
        //                     left: left,
        //                     top: top
        //                 }).addClass('active');
        //             })
        //             .on('mouseleave', function () {
        //                 hideTimeout = setTimeout(() => {
        //                     tooltip.removeClass('active');
        //                     tooltip.removeAttr('style')
        //                 }, 200);
        //             });

        //         tooltip
        //             .on('mouseenter', () => clearTimeout(hideTimeout))
        //             .on('mouseleave', () => tooltip.removeClass('active'))
        //             .on('click', function () {
        //                 window.open(`${config.iframeBaseURL}/pay.html`, '_blank');
        //             });

        //     }

        // } catch (error) {
        //     console.error(error)

        // }
    }
}


