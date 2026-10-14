import { postMessage, complteUrl, packMsgReq, httpRequest, dataURLtoBlob } from './index.js';

import * as saveAs from "./FileSaver.min.js";
// import axios from "./axios"
// import config from '../common/config'

// let collectPageImage = `${config.iframeBaseURL}/iframe/imageCollection.html?${new Date().getTime()}`;

// 手动打开加载消息提示框
function openLoadingMessage() {
    $laisou('#qqSearchImage-loading-message-box').fadeIn();
}

// 手动关闭加载消息提示框
function closeLoadingMessage() {
    $laisou('#qqSearchImage-loading-message-box').fadeOut();
}

let hoverElement = null;
let toolbarContainer = null;
let loaderIcon = null;
let searchIcon = null;
let isToobarVisible = false;
let lastTarget = null;
let currentImage = null;

// 节流
export const throttle = (func, limit = 100) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

const showToolBarContainer = (element, rect, setCurrent = true) => {
    hoverElement = element;
    let topOffset = 0;
    let leftOffset = 0;
    const computedStyle = getComputedStyle(element);
    if (computedStyle.position === 'relative') {
        topOffset = parseInt(computedStyle.top);
        leftOffset = parseInt(computedStyle.left);
    }
    let top = window.scrollY + rect.top + 5 - topOffset;
    let left = window.scrollX + rect.left + 5 - leftOffset;
    if (top < 0 || left < 0) {
        const parent = element.offsetParent;
        if (parent) {
            const parentRect = parent.getBoundingClientRect();
            top = window.scrollY + parentRect.top + 5;
            left = window.scrollX + parentRect.left + 5;
        }
    }
    toolbarContainer.css('top', `${top}px`)
    toolbarContainer.css('left', `${left}px`)
    if (setCurrent) {
        currentImage = element;
    }
    isToobarVisible = true;
};

// 隐藏工具栏
const hideToolbarContainer = () => {
    hoverElement = null;
    toolbarContainer.css('top', `-999999px`)
    toolbarContainer.css('left', `-999999px`)
    isToobarVisible = false;
};

// 检查工具栏是否在元素的边界框内
const isToolBarInsideElement = (point, rect) => {
    return point.clientX > rect.left && point.clientX < rect.left + rect.width &&
        point.clientY > rect.top && point.clientY < rect.top + rect.height;
};

// 鼠标移动事件，检查鼠标是否在图片上
const onMouseMove = (event) => {
    const target = event.target;
    if (window.location.href.indexOf('made-in-china.com/img-search/') !== -1) {
        if (target.className !== 'swiper-container') {
            return;
        }
    }
    if (target.id === 'qiuqi-toolbar' || $laisou(target).is('#qiuqi-toolbar *')) return;
    if (isToobarVisible && isToolBarInsideElement(event, hoverElement.getBoundingClientRect())) return;
    const images = document.querySelectorAll('img');
    const foundImage = Array.from(images).find(img => {
        const rect = img.getBoundingClientRect();
        return (
            (img.nodeName === 'IMG' || getComputedStyle(img).backgroundImage.startsWith('url')) &&
            getComputedStyle(img).display !== 'none' && getComputedStyle(img).visibility !== 'hidden' &&
            isToolBarInsideElement(event, rect) && (rect.width >= 90 && rect.height >= 90)
        );
        // const style = getComputedStyle(img);
        // if (style.display === 'none' || style.visibility === 'hidden') return false;
        // const rect = img.getBoundingClientRect();
        // return (rect.width > 100 || rect.height > 100) && isToolBarInsideElement(event, rect);
    });

    if (foundImage && foundImage !== hoverElement) {
        showToolBarContainer(foundImage, foundImage.getBoundingClientRect());
    } else if (!foundImage && isToobarVisible) {
        hideToolbarContainer();
    }
    lastTarget = target;
};

const onMouseOver = (event) => {
    const target = event.target;
    if (target.id === 'qiuqi-toolbar' || $laisou(target).is('#qiuqi-toolbar *')) return;
    if (target !== lastTarget) {
        if (target.tagName !== 'IMG') {
            if (isToobarVisible && !isToolBarInsideElement(event, hoverElement.getBoundingClientRect())) {
                hideToolbarContainer();
            }
        } else {
            const rect = target.getBoundingClientRect();
            if (rect.width >= 90 && rect.height >= 90) {
                showToolBarContainer(target, rect);
            }
        }
        lastTarget = target;
    }
};



// 处理图像搜索
const handleImageSearch = async (e) => {
    if (!currentImage) return;
    console.log(e);
    let imageUrl = null;
    let tKey = $laisou(e.target).attr('data-key');
    if (currentImage.tagName === 'IMG') {
        imageUrl = currentImage.src || currentImage.currentSrc;
    } else {
        const bgImage = getComputedStyle(currentImage).backgroundImage;
        let url = bgImage.slice(4, -1);
        if (url[0] === '"') url = url.slice(1);
        if (url[url.length - 1] === '"') url = url.slice(0, -1);
        imageUrl = url;
    }
    console.log('44444444444444', imageUrl, tKey);
    if (imageUrl && imageUrl.length > 5) {
        imageUrl = complteUrl(imageUrl)
        console.log("AAAAAAAAAAAAAAAAAAAA  image" + window.qiuqiChromeId);
        console.log("AAAAAAAAAAAAAAAAAAAA  packg" + packMsgReq('searchImage', { method: 'get', url: imageUrl }));
        
        switch (tKey) {
            case 'search-alibaba': {
                openLoadingMessage()
                console.log('131231')
                chrome.runtime.sendMessage(window.qiuqiChromeId, packMsgReq('searchImage', { method: 'get', url: imageUrl }), async (base64Res) => {
                    console.log('79789')
                    if (base64Res.state) {
                        let rData = base64Res.data;
                        console.log('rData', rData)
                        // // console.log(response);
                        try {
                            const imageSearchPicUrl = 'https://open-s.alibaba.com/openservice/appImageSearchPicUrlUtilsService';
                            const response = await httpRequest({
                                method: 'post',
                                url: imageSearchPicUrl,
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded',
                                }, data: `picUrl=${encodeURIComponent(rData.data)}`
                            });
                            console.log('response', response);
                            let data = JSON.parse(response.body);
                            if (data.code === 200) {
                                data = data.data;
                                console.log('data.imagePath', data.imagePath)
                                setTimeout(() => {
                                    closeLoadingMessage();
                                    window.open(`https://www.alibaba.com/picture/search.htm?imageType=oss&escapeQp=true&imageAddress=${data.imagePath}&sourceFrom=imageupload&originFrom=${complteUrl(data.imagePath)}`)
                                }, 1000);
                            }

                        } catch (error) {
                            console.error(error);
                        }

                    }

                })
                break;
            }
            case "search-1688": {
                let sale1688Url = `https://sale.1688.com/sale/kuajing/global/index.html?wh_pha=true&remoteUrlArray=${imageUrl}#/search`
                window.open(sale1688Url)
                break;
            }

            case "search-MadeInChina": {
                openLoadingMessage()
                chrome.runtime.sendMessage(window.qiuqiChromeId, packMsgReq('searchImage', { method: 'get', url: imageUrl }), async (base64Res) => {
                    if (base64Res.state) {
                        let rData = base64Res.data;
                        let blob = dataURLtoBlob(rData.data);
                        let imageSize = blob.size;
                        let image = new Image();
                        const imgType = imageUrl.substring(imageUrl.lastIndexOf('.') + 1).toLowerCase().split('?')[0];
                        image.src = rData.data;
                        image.onload = async function () {

                            chrome.runtime.sendMessage(window.qiuqiChromeId, packMsgReq('searchMadeInChina', {
                                orgwidth: image.width,
                                orgheight: image.height,
                                zipsize: imageSize,
                                orgsize: imageSize,
                                imageBase64: rData.data,
                                imgType
                            }), async (response) => {
                                if (response.state) {
                                    let bData = JSON.parse(response.data.body)
                                    bData = bData.data;
                                    setTimeout(() => {
                                        closeLoadingMessage();
                                        window.open(bData.url)
                                    }, 1000);

                                }

                            })

                        };
                    } else {
                        closeLoadingMessage();
                    }
                })
                break
            }

            case "collect-current-image": {
                const response = await getFile(imageUrl);
                const imgType = imageUrl.substring(imageUrl.lastIndexOf('.') + 1).toLowerCase().split('?')[0];
                saveAs(response, `下载图片-1.${imgType}`)
                break;
            }

            case "collect-images-page": {
                $laisou('.qiuqi-image-collection').css('display', 'block')

                let imgList = [];
                let img = $laisou("body img");
                for (let i = 0; i < img.length; i++) {
                    let n = img.get(i).src;
                    if (n && n.indexOf('https') !== -1) imgList.push(n)
                }
                imgList = [...new Set(imgList)]
                postMessage({ cmd: 'id', params: { imgList } }, 'qiuqi-image-collection')
                break;
            }

            default:
                break;
        }

    }
};




// 图片搜索工具栏容器创建
export const initializeIconContainer = () => {
    //     <li>
    //     <a href="#"><img style="width: 22px;height: 22px;background-color: #fff;border-radius: 10px;" src="https://l-sou.com/iframe/images/logo.png" alt=""></a>
    //   </li>
    //     <li>
    //     <a href="#">采集</a>
    //     <ul class="qiuqi__nav__child" style="width:120px">
    //       <li><a data-key='collect-current-image' href="javascript:void(0);">采集当前图片</a></li>
    //       <li><a data-key='collect-images-page' href="javascript:void(0);">采集本页图片</a></li>
    //     </ul>
    //   </li>   

    //     <ul class="qiuqi__nav__child" style="width:144px">
    //     <li><a data-key='search-alibaba' href="javascript:void(0);">在Alibaba搜同款</a></li>
    //     <li><a data-key='search-1688' href="javascript:void(0);">在1688搜同款</a></li>
    //     <li><a data-key='search-MadeInChina' href="javascript:void(0);">在MadeInChina搜同款</a></li>
    //   </ul>
    const $toolbar = $laisou(`<div id='qiuqi-toolbar' class="qiuqi-toolbar-container">	<nav class="qiuqi"> 

      <ul class="qiuqi__nav">
         <li>
          <a href="javascript:void(0);"><div class='img-alibaba' data-key='search-alibaba'><span class="tooltiptext">在Alibaba搜同款 - 来搜提供支持</span></div></a>
        </li>
       <li>
          <a href="javascript:void(0);"><div class='img-1688' data-key='search-1688'><span class="tooltiptext">在1688搜同款 - 来搜提供支持</span></div></a>
        </li>
        <li>
          <a href="javascript:void(0);"><div class='img-madeInChina' data-key='search-MadeInChina'><span style='width:250px' class="tooltiptext">在MadeInChina搜同款 - 来搜提供支持</span></div></a>
        </li>
      </ul>
    </nav></div>`);

    const $toolbarMessage = $laisou(` <div id="qqSearchImage-loading-message-box">
        <div class="qqSearchImage-loading-message">
            <div class="qqSearchImage-loading-content">
                <div class="qqSearchImage-loading-spinner"></div>
                <div class="qqSearchImage-loading-text">同行产品检索中...</div>
                <!-- <button class="close-btn">Close</button> -->
            </div>
        </div>
    </div>`)

    $laisou('body').append($toolbar);
    $laisou('body').append($toolbarMessage)
    toolbarContainer = $laisou('.qiuqi-toolbar-container')
   // console.log("AAAAAAAAAAAAAAAAAAAAAA   tool"+toolbarContainer);
    $laisou('.qiuqi__nav li').on('click', handleImageSearch);
};

// 初始化函数
export const searchImgMain = async () => {
    // $laisou('body').append(`<div class='qiuqi-image-collection'><iframe id='qiuqi-image-collection' class='chrome_container_iframe' marginwidth="0" marginheight="0"  scrolling="no"  src=${collectPageImage}></iframe></div>`)
    initializeIconContainer();
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousemove', throttle(onMouseMove));
};

