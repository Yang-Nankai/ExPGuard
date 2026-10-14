import { Base64 } from "../libs/base64.min.js";

(async () => {
  const VERSION = "0.1.17";
  const NEUROMARKET_CHROME_ID = document.getElementById('neuromarket-extension-id')?.dataset?.extensionId;
  const CDN_HOST = "https://cdn.neuromarket.online/";
  const CURRENT_APPTYPE = 64;

  const UPDATE_MESSAGE_READ = isLocalStorageAvailable()
    ? localStorage.getItem("neuromarket-" + VERSION + "-read") || false
    : true;

  const CLIENT_LOCATIONS = [
    "https://wildberries.ru",
    "https://www.wildberries.ru",
    "https://wildberries.kz",
    "https://www.wildberries.kz",
    "https://wildberries.by",
    "https://www.wildberries.by",
    "https://wildberries.uz",
    "https://www.wildberries.uz",
  ];

  const _authData = await new Promise((resolve) =>
    chrome.runtime.sendMessage(NEUROMARKET_CHROME_ID, { type: "getAuthData" }, resolve)
  ).catch(() => ({})) || {};

  let WB_AUTH_V3_RAW = _authData["neuromarket-auth-v3"] || null;
  let WB_TOKEN = _authData["neuromarket-token"] ? atob(_authData["neuromarket-token"]) : null;
  let WB_DEVICEID = _authData["neuromarket-deviceid"] || null;

  let WB_AUTH_V3 = WB_AUTH_V3_RAW
    ? Base64.decode(decodeURIComponent(WB_AUTH_V3_RAW))
    : null;

  let lastHref = location.href;

  setInterval(() => {
    if (window.location.href !== lastHref) {
      lastHref = window.location.href;
      window.dispatchEvent(new Event("locationchange"));
    }
  }, 100);

  class NeuromarketClientEngine {
    #isAuthSupplier = null;

    isInjected = false;
    lastLocation;

    catalogMenu;

    #isWidgetOpen = false;
    #userXinfo = {};
    #subjects = [];
    subjectsNameById = new Map();

    // SEARCH DATA
    lastSearchKeyword;
    injectedSearchResults = false;
    #searchData;
    #searchResource;
    supplierAllProducts = [];

    searchQueryMonthFrequency;
    searchQueryWeekFrequency;

    searchCalculations = {};

    calculatedProductsTable = [];

    // SEARCH VIEWS
    searchViews = {};

    //Search Window Elements
    searchPagination;
    searchQueryData;
    productDotsChart;
    productDotsRatioData;

    // ------------

    constructor() {
      let interval = setInterval(() => {
        if (window?.wb && window?.wb?.user?.getXinfo) {
          wb.user.getXinfo().then((res) => (this.userXinfo = res))
          clearInterval(interval)
        }
      }, 33)
      this.lastLocation = window.location.href;
      this.currentLocation = window.location.href;

      if ('navigation' in window) {
        navigation.addEventListener('navigate', e => {
          this.lastLocation = this.currentLocation;
          this.currentLocation = window.location.href;
          this.changeLocation();
        });
      } else {
        window.addEventListener("locationchange", () => {
          this.lastLocation = this.currentLocation;
          this.currentLocation = window.location.href;
          this.changeLocation();
        });
      }
      // navigation.addEventListener("navigate", () => {
      //   this.lastLocation = this.currentLocation;
      //   this.currentLocation = window.location.href;
      //   this.changeLocation();
      // });
      this.changeLocation();
    }

    async requestSubjects() {
      fetch(
        "https://static-basket-01.wbbasket.ru/vol0/data/subject-base.json",
        {
          method: "GET",
          credentials: "omit",
        }
      );
    }

    get userXinfo() { }

    get subjects() {
      return this.#subjects;
    }

    set subjects(data) {
      this.#subjects = data;

      const flattenSubjects = (arr) => {
        arr.forEach((item) => {
          const { id, name, childs } = item;
          this.subjectsNameById.set(id, name);
          if (childs) flattenSubjects(childs);
        });
      };

      flattenSubjects(data);
    }

    set userXinfo(value) {
      const result = {};
      const data = value.split("&");
      data.forEach((item) => {
        const [param, value] = item.split("=");
        result[param] = value;
      });
      this.#userXinfo = result;
    }

    get isWidgetOpen() {
      return this.#isWidgetOpen;
    }

    set isWidgetOpen(value) {
      this.#isWidgetOpen = value;
      try {
        if (value) {
          this.mainWindowElement.style.display = "block";
          this.hiddenWindowElement.style.display = "none";
          if (this.ParallelComparisonChartInstance) {
            this.ParallelComparisonChartInstance?.resize();
          }
        } else {
          this.mainWindowElement.style.display = "none";
          this.hiddenWindowElement.style.display = "block";
        }
      } catch (e) { }
      localStorage.setItem("neuromarket_should_widget_open", Number(value));
    }

    get isAuthSupplier() {
      return this.#isAuthSupplier;
    }

    set isAuthSupplier(value) {
      this.#isAuthSupplier = value;
    }

    get searchData() {
      return this.#searchData;
    }

    set searchData(value) {
      this.lastSearchKeyword = this.#searchData?.metadata?.name;
      if (value?.products) {
        this.#searchData = {
          data: { products: value.products },
          metadata: value.metadata
        };
      } else {
        this.#searchData = value;
      }
      if (
        this.isInjected &&
        this.injectedSearchResults &&
        this.lastLocation.includes("/catalog/0/search.aspx") &&
        !this.CatalogObserver &&
        !this.injectingSearchResults
      ) {
        this.renderSearchResultsElements();
        this.injectProductsPositions();
      } else {
        if (
          this.isInjected &&
          !this.injectedSearchResults &&
          !this.injectingSearchResults
        ) {
          const alreadyInjected = !!document.getElementById("ns-main-window");
          if (
            !alreadyInjected &&
            !this.injectedSearchResults &&
            !this.CatalogObserver
          ) {
            this.injectSearchResults();
          }
        }
      }
    }

    get searchResource() {
      return this.#searchResource;
    }

    set searchResource(value) {
      this.#searchResource = value;
    }

    calculateSearchWarehouses(product) {
      const { nmId: id, wh, time1, time2 } = product;

      const whSchema = {
        products: [],
        deliveryTime: {
          min: {
            productId: null,
            time: 0,
          },
          avg: 0,
          max: {
            productId: null,
            time: 0,
          },
        },
        deliveryTimeArr: [],
      };
      const whData = this.searchCalculations.warehouses.get(wh) || whSchema;
      const deliveryTime = time1 + time2;

      whData.products.push(product.id);
      whData.deliveryTimeArr.push(deliveryTime);

      const deliveryTimeSum = whData.deliveryTimeArr.reduce((acc, current) => {
        return acc + current;
      }, 0);
      const totalProducts = whData.products.length;

      if (deliveryTime < whData.deliveryTime.min.time) {
        whData.deliveryTime.min.time = deliveryTime;
        whData.deliveryTime.min.productId = id;
      }
      if (deliveryTime > whData.deliveryTime.max.time) {
        whData.deliveryTime.max.time = deliveryTime;
        whData.deliveryTime.max.productId = id;
      }

      whData.deliveryTime.avg =
        totalProducts > 0 ? deliveryTimeSum / totalProducts : 0;

      this.searchCalculations.warehouses.set(wh, whData);
    }

    calculateSubjects(product) {
      const { subjectId } = product;

      const Schema = {
        products: [],
      };

      const data = this.searchCalculations.subjects.get(subjectId) || Schema;
      data.products.push(product.id);
      this.searchCalculations.subjects.set(subjectId, data);
    }

    calculateSubjectsPerPosition(product, position) {
      const { subjectId } = product;

      const Schema = {
        subjectId,
      };

      this.searchCalculations.subjectsPerPosition.set(position, Schema);
    }

    calculateGroupByPrice(product) {

      const detail = this.detailData.find(
        (p) => p.id === product.id);

      const price = Math.round(detail?.sizes?.find(({ price }) => price)?.price?.product / 100) || 0;
      const groupByRange = this.searchCalculations.groupByPrice.range;
      const range = precise.floor(price / groupByRange) * groupByRange;
      if (this.searchCalculations.groupByPrice.maxPrice < price) {
        this.searchCalculations.groupByPrice.maxPrice = price;
      }
      if (this.searchCalculations.groupByPrice.minPrice > price) {
        this.searchCalculations.groupByPrice.minPrice = price;
      }
      const productToAdd =
        this.searchCalculations.groupByPrice.data.get(range) || [];
      productToAdd.push(product.id);
      this.searchCalculations.groupByPrice.data.set(range, productToAdd);
    }

    calculateSearchWarehousesPerPosition(product, position) {
      const details = this.detailData.find((p) => p.id === product.id);
      const warehouses = new Set();

      details?.sizes?.forEach((size) => {
        size.stocks.forEach((stock) => {
          warehouses.add(stock.wh);
        });
      });

      const whData = {
        warehouses: [...warehouses],
        count: warehouses.size,
      };

      this.searchCalculations.warehousesPerPosition.set(position, whData);
    }

    calculateSearchFeedbacksPerPosition(product, position) {
      const details = this.detailData.find((p) => p.id === product.id);

      const data = {
        feedbacks: details.feedbacks,
        rating: details.reviewRating,
      };

      this.searchCalculations.feedbacksPerPosition.set(position, data);
    }

    calculateSearchPricePerPosition(product, position) {
      const price = product?.sizes?.[0]?.price?.product / 100;
      const priceData = {
        price,
      };

      this.searchCalculations.pricePerPosition.set(position, priceData);
    }

    resetData() {
      this.isInjected = false;
      this.injectedSearchResults = false;

      this.WarehousesPerPositionChartInstance = undefined;
      this.GroupByPriceChartInstance = undefined;
      this.FeedbacksPerPositionChartInstance = undefined;

      this.#searchData = undefined;
      this.detailData = undefined;
      this.buyoutData = undefined;

      this.CatalogObserver = undefined;
      this.ProductsListObserver = undefined;

      this.resetCharts();
    }

    resetCharts() {
      this.renderGroupByPriceChartFirstRender = undefined;
      this.WarehousesPerPositionChartInstance = undefined;
      this.FeedbacksPerPositionChartInstance = undefined;
      this.ParallelComparisonChartInstance = undefined;
    }

    async changeLocation() {
      // this.resetData();
      const SEARCH_LOCATION_PARTS = ["/catalog/0/search.aspx"];
      this.currentLocation = window.location.href;
      if (
        SEARCH_LOCATION_PARTS.some((pattern) =>
          window.location.href.includes(pattern)
        )
      ) {
        if (!this.isInjected || this.currentLocation !== this.lastLocation) {
          const alreadyInjected = !!document.getElementById("ns-main-window");
          if (!alreadyInjected) {
            this.injectSearchResults();
            this.isInjected = true;
          } else {
            this.isInjected = true;
            this.resetCharts();
          }
        }
      } else {
        this.resetData();
      }
    }

    async refreshCatalog() {
      if (window?.wb?.spa?.refresh) {
        window.wb.spa.refresh()
      }
    }

    async injectSearchResults() {
      const globalSettings = JSON?.parse(localStorage.getItem("global-settings-v2")) || undefined;
      const splitInfoV2 = JSON?.parse(localStorage.getItem("splitInfoV2")) || undefined;
      if (globalSettings && globalSettings?.data?.switches?.enableInfiniteScroll) {
        globalSettings.data.switches.enableInfiniteScroll = false
        localStorage.setItem("global-settings-v2", JSON.stringify(globalSettings))
        location.reload()
      }

      if (splitInfoV2 && splitInfoV2?.splitInfo?.common?.length > 0) {
        const enableAutoNextPageOptionIndex = splitInfoV2?.splitInfo?.common?.findIndex((option) => option?.key === "ab_enableAutoNextPage")
        if (enableAutoNextPageOptionIndex > -1 && splitInfoV2.splitInfo.common[enableAutoNextPageOptionIndex]?.value === "yes") {
          splitInfoV2.splitInfo.common[enableAutoNextPageOptionIndex].value = "no"
          localStorage.setItem("splitInfoV2", JSON.stringify(splitInfoV2))
          location.reload()
        }
      }

      let catalogContentElement = document.getElementsByClassName(
        "catalog-page__content"
      )?.[0];
      if (window?.wb && !this.catalogMenu) {
        wb.spa.getCatalogMenu().then(res => {
          this.catalogMenu = res
        });
      }
      if (!catalogContentElement) {
        if (this.CatalogObserver) return;
        this.CatalogObserver = new MutationObserver(async () => {
          if (document.getElementsByClassName("catalog-page__content")?.[0]) {
            const alreadyInjected = !!document.getElementById("ns-main-window");
            if (!alreadyInjected) {
              this.injectSearchResults();
              this.CatalogObserver.disconnect();
              this.CatalogObserver = undefined;
            }
          }
        });

        this.CatalogObserver.observe(document.getElementById("mainContainer"), {
          childList: true,
          subtree: true,
        });
        return;
      } else {

        this.injectingSearchResults = true;
        if (this.isAuthSupplier === null) {
          await new Promise(async (resolve) => {
            const timeout = setTimeout(() => {
              this.isAuthSupplier = false;
              resolve();
            }, 3000);
            this.isAuthSupplier = await this.getSuppliers();
            clearTimeout(timeout);
            resolve();
          });
        }

        if (!this.searchData) {
          if (this.refreshCatalog) this.refreshCatalog()
          this.injectingSearchResults = false;
          setTimeout(this.injectSearchResults, 200);
          return;
        }

        if (this.#subjects.length === 0) {
          await this.getSubjects();
        }

        catalogContentElement.insertAdjacentHTML(
          "beforebegin",
          this.renderSearchResultsWindow()
        );

        this.detectSearchResultsElements();
        this.listenWindowElements();
        this.renderSearchResultsElements();
        this.injectProductsPositions();

        if (this.isAuthSupplier === true) {
          document.getElementById("n-help-message").style.display = "none";
        }

        if (this.isAuthSupplier === false) {
          document.getElementById("n-help-message").style.display = "flex";
        }

        const adBtn = document.getElementById("n-ad-btn");
        const adDescription = document.getElementById("n-ad-description");
        let isOverAdDescription = false;

        if (adBtn.getAttribute("listener") !== "true") {
          adBtn.setAttribute("listener", "true");
          adBtn.addEventListener("mouseenter", (e) => {
            isOverAdDescription = true;
            adDescription.style.display = "flex";
          });

          adBtn.addEventListener("mouseleave", (e) => {
            isOverAdDescription = false;
            setTimeout(() => {
              if (isOverAdDescription) return;
              adDescription.style.display = "none";
            }, 200);
          });

          adBtn.addEventListener("click", (e) => { });

          adDescription.addEventListener("mouseover", (e) => {
            isOverAdDescription = true;
          });

          adDescription.addEventListener("mouseout", (e) => {
            isOverAdDescription = false;
            if (isOverAdDescription) return;
            setTimeout(() => {
              if (isOverAdDescription) return;
              adDescription.style.display = "none";
            }, 200);
          });
        }
        this.injectedSearchResults = true;
        this.injectingSearchResults = false;


      }
    }

    injectProductsPositions() {
      const productsListElement = document.getElementsByClassName("catalog-page")?.[0]
      if (!productsListElement) {
        return;
      } else {
        this.showPositionsOnProducts(productsListElement)
      }
      this.ProductsListObserver = new MutationObserver((rec) => {
        this.showPositionsOnProducts(productsListElement)
      });

      this.ProductsListObserver.observe(productsListElement, {
        childList: true,
        subtree: true,
      });
    }

    showPositionsOnProducts(productsListElement) {
      const productsElement = productsListElement.querySelectorAll("article")
      productsElement.forEach((element) => {
        const productId = Number(element.dataset.nmId)
        const foundWrapElement = element.querySelector(".nm-product-position-wrap")
        if (element.getAttribute("nm-showed") && foundWrapElement) {
          if (productId === Number(foundWrapElement?.dataset?.nmId)) {
            return;
          }
        }
        this.renderPositionOnProduct(element)
        element.setAttribute("nm-showed", true)
      })
    }

    renderPositionOnProduct(productElement) {
      const productId = Number(productElement.dataset.nmId)
      if (!productId || !this.searchData) return;
      const productIndex = this.searchData.data.products?.findIndex(product => product.id === productId)
      if (productIndex === -1) return;

      const productData = this.searchData.data.products[productIndex];

      const productFromSearch = this?.searchData?.data?.products?.find(
        (item) => item?.id === productData.nmId
      );

      const isNew = productFromSearch?.isNew || false;
      const position = (this.getCurrentPage() - 1) * 100 + (productIndex + 1)

      const hasAd = !!productData?.logs
      const adType = hasAd ?
        productData?.log?.tp === 'c' ?
          9 :
          8 :
        null;
      const positionBefore = hasAd ? productData?.log?.position : null;
      const cpm = hasAd ? productData?.log?.cpm : null;

      productElement.insertAdjacentHTML("afterbegin", `
        <div class="nm-product-position-wrap" data-nm-id="${productData.id}" id="nm-product-position-wrap">
          <div class="nm-product-position-row">
          ${hasAd ?
          adType === 9 ?
            `
            <div class="nm-product-position-overlay-logo nm-product-position-overlay-auction">
              <img src="https://cdn.neuromarket.online/images/logo_symbol_32.png"/>
                <span>АУКЦИОН</span>
              </div>
              <div class="nm-product-position-overlay nm-product-position-overlay-auction">
                <span>${position}</span></div>
            </div>` :
            `
            <div class="nm-product-position-overlay-logo nm-product-position-overlay-auto">
              <img src="https://cdn.neuromarket.online/images/logo_symbol_32.png"/>
              <span>РК</span>
              </div>
            <div class="nm-product-position-overlay nm-product-position-overlay-auto">
              <span>${position}</span>
            </div>
          </div>` :
          `<div class="nm-product-position-overlay-logo">
              <img src="https://cdn.neuromarket.online/images/logo_symbol_32.png"/>
              <span>${position}<span>
            </div>`}
            ${isNew ?
          `<div class="nm-product-position-row">
                 <div class="nm-product-position-overlay nm-product-position-overlay-new">NEW</div>
              </div>` :
          ""
        }
        </div>  
      `)
    }

    listenWindowElements() {
      if (this.expandWindowElement.getAttribute("listener") !== "true") {
        this.expandWindowElement.setAttribute("listener", "true");
        this.expandWindowElement.addEventListener("click", () => {
          this.isWidgetOpen = true;
        });

        this.collapseWindowElement.addEventListener("click", () => {
          this.isWidgetOpen = false;
        });
      }

      this.isWidgetOpen = isLocalStorageAvailable()
        ? Number(localStorage.getItem("neuromarket_should_widget_open")) ||
        false
        : false;
    }

    getCurrentPage() {
      const url = new URL(window.location.href);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : 1;
    }

    buildUrlWithPage(pageNumber) {
      const url = new URL(window.location.href);

      if (pageNumber === 1) {
        // Удаляем параметр page, если задана страница 1
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", pageNumber);
      }

      return url.toString();
    }

    // Elements
    calculateProductsTable() {
      const productsFromCatalog =
        this.searchData.data.products;
      // const productsFromCatalog =
      //   this.searchViews.productsCatalog.data.allProducts;
      const productsFromSearch = this.searchData.data.products;
      const calculatedProducts = productsFromCatalog.map(
        (productFromCatalog, index) => {

          const detail = this.detailData.find(
            (p) => p.id === productFromCatalog.id);

          const position =
            (this.getCurrentPage() - 1) * 100 +
            (index + 1);

          const adTypes = [
            { type: "b", title: "РК" },
            { type: "c", title: "Аукцион" },
          ];

          // const productFromSearch = productsFromSearch.find(
          //   (item) => item.id === productFromCatalog.nmId
          // );

          // CALCULATIONS
          this.calculateSubjects(productFromCatalog);
          this.calculateSubjectsPerPosition(productFromCatalog, position);
          this.calculateSearchWarehouses(productFromCatalog);
          this.calculateSearchWarehousesPerPosition(
            productFromCatalog,
            position
          );
          this.calculateSearchFeedbacksPerPosition(productFromCatalog, position);
          this.calculateSearchPricePerPosition(productFromCatalog, position);
          this.calculateGroupByPrice(productFromCatalog);
          // ---

          const price = Math.round(detail?.sizes?.find(({ price }) => price)?.price?.product / 100) || 0;
          const sale = Math.round(detail?.sizes?.find(({ price }) => price)?.price?.product / detail?.sizes?.find(({ price }) => price)?.price?.basic * 100);
          const premiumSale =
            (productFromCatalog?.saleConditions >> 22) & 31 || 0;
          const isNew = detail?.isNew || false;
          const hasPromo = detail?.panelPromoId > 0;

          const parentSubject = this.subjects?.find(
            (s) => s.id === productFromCatalog.subjectParentId
          );
          const subject = parentSubject?.childs?.find(
            (s) => s.id === productFromCatalog.subjectId
          );
          const subjectText = subject?.name || "";

          const ad = productFromCatalog?.logs
            ? productFromCatalog?.log?.tp === "c"
              ? adTypes[1]
              : adTypes[0]
            : undefined;
          const adTypeStyle =
            ad?.type === "b"
              ? "background: #2563eb61;"
              : ad?.type === "c"
                ? "background: #fd01fe61;"
                : "";
          const adTypeToShow = ad?.title || null;
          const boostedFrom = ad ? productFromCatalog?.log?.position : null;
          const positionDelta = ad ? boostedFrom - position : null;
          const cpm = ad ? productFromCatalog?.log?.cpm : null;
          const bpc = ad ? precise.round(cpm / positionDelta, 2) : null;
          const advertId = ad ? productFromCatalog?.log?.advertId : null;

          const ownBySupplier =
            productFromCatalog?.supplierId === this.supplierId;

          const reducedStocks = detail.sizes?.reduce((acc, size) => acc + size.stocks.reduce((stockAcc, stock) => stockAcc + stock.qty, 0), 0) || 0
          const calcs = {
            id: productFromCatalog.id,
            price: price,
            sale: sale,
            premiumSale: premiumSale,
            reviewRating: productFromCatalog.reviewRating,
            feedbacks: productFromCatalog.feedbacks,
            isNew: isNew,
            hasPromo: hasPromo,
            promoId: productFromCatalog.panelPromoId,
            promoText: hasPromo ? detail.promoTextCard ?? "Распродажа" : "",
            quantity: productFromCatalog.totalQuantity > reducedStocks ? productFromCatalog.totalQuantity : reducedStocks,
            position: position,
            adTypeStyle: adTypeStyle,
            adTypeToShow: adTypeToShow,
            boostedFrom: boostedFrom,
            positionDelta: positionDelta,
            cpm: cpm,
            bpc: bpc,
            advertId: advertId,
            brandId: productFromCatalog.brandCod,
            brand: productFromCatalog.brand,
            supplierId: productFromCatalog.supplierId,
            supplier: productFromCatalog.supplier,
            supplierRating: productFromCatalog.supplierRating,
            subjectText: subjectText,
            time1: productFromCatalog.time1,
            time2: productFromCatalog.time2,
            deliveryHours: productFromCatalog.time1 + productFromCatalog.time2,
            fastestStore: productFromCatalog.fastestStore,
            dist: productFromCatalog.dist,
            ownBySupplier: ownBySupplier,
          };
          return calcs;
        }
      );

      this.calculatedProductsTable = calculatedProducts;
    }

    async renderProductsTable(sortBy, orderBy = "desc") {
      const renderProductRow = (product) => {
        const {
          id,
          ownBySupplier,
          price,
          sale,
          premiumSale,
          reviewRating,
          feedbacks,
          isNew,
          hasPromo,
          promoText,
          quantity,
          position,
          adTypeStyle,
          adTypeToShow,
          boostedFrom,
          positionDelta,
          cpm,
          bpc,
          advertId,
          brandId,
          brand,
          supplierId,
          supplier,
          supplierRating,
          subjectText,
          time1,
          time2,
          deliveryHours,
          fastestStore,
          dist,
        } = product;
        return `
      <div class="n-kw-list-item n-no-left-border" id="ns-table-product-row" data-product-id="${id}" style="${ownBySupplier ? "background:#142c2d;" : ""
          } justify-content: flex-start; padding-left: 0 !important; gap:0;">
        <span class="n-date-cell" style="${ownBySupplier ? "background:#142c2d;" : ""
          }"><img src="${imageURL(
            id
          )}" style="opacity:0.8; width: 23px; height: 30px; border-radius: 2px;background: #efeff4;"/></span>
        <div style="display:flex; gap:0; height:100%;">
          <div class="n-fixed-cell" style="${ownBySupplier ? "background:#142c2d;" : ""
          }">
            <span class="n-count" style="width:70px;padding-left:6px; justify-content:center; min-width:70px; white-space: nowrap;">
              <a href="https://www.wildberries.ru/catalog/${id}/detail.aspx">${id}</a>
            </span>
            <span class="n-count" style="width:80px; min-width:80px; justify-content:center;">
              <div class="ns-clamp-2 ns-text-center">${subjectText}</div>
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${price}₽
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${sale}%
            </span>
            <span class="n-count" style="width:65px; min-width:65px; justify-content:center;">
              ${premiumSale}%
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${reviewRating}
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${feedbacks}
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${isNew ? "Да" : "Нет"}
            </span>
            <span class="n-count " style="width:50px; min-width:50px; justify-content:center;">
              <div class="ns-clamp-1">${hasPromo ? promoText : ""}</div>
            </span>
            <span class="n-count" style="width:60px; min-width:60px; justify-content:center; border-right:1px solid #334155; padding-right:6px;">
              ${quantity}
            </span>
          </div>
          <div style="display:flex; gap:12px; height:100%; padding-inline:6px; border-right:1px solid #334155;">
            <span class="n-count" style="width:60px; min-width:60px; justify-content:center;">
              ${position}
            </span>
            <span class="n-count" style="${adTypeStyle} width:60px; min-width:60px; justify-content:center;">
              ${adTypeToShow ? adTypeToShow : "---"}
            </span>
            <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">
              ${boostedFrom ? boostedFrom : "---"}
            </span>
            <span class="n-count" style="width:60px; min-width:60px; justify-content:center;">
              ${positionDelta ? positionDelta : "---"}
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${cpm ? cpm + "₽" : "---"}
            </span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">
              ${bpc ? bpc + "₽" : "---"}
            </span>
            <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">
              ${advertId ? advertId : "---"}
            </span>
          </div>
          <div style="display:flex; gap:12px; height:100%; padding-inline:6px; border-right:1px solid #334155;">
            <span class="n-count" style="width:70px; min-width:70px; justify-content:center; text-align:center;">${WAREHOUSES[fastestStore] || "FBS"
          }</span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${time1}</span>
            <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${time2}</span>
            <span class="n-count" style="width:55px; min-width:55px; justify-content:center;">${deliveryHours}</span>
            <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${dist}</span>
            </div>
          </div>
          <div style="display:flex; gap:12px; height:100%; padding-inline:6px; border-right:1px solid #334155;">
            <span class="n-count" style="width:80px; min-width:80px; justify-content:center;">
              <div class="ns-clamp-2 ns-text-center"><a href="https://www.wildberries.ru/brands/${brandId}" target="_blank">${brand}</a></div>
            </span>
            <span class="n-count" style="width:80px; min-width:80px; justify-content:center;">
              <div class="ns-clamp-2 ns-text-center"><a href="https://www.wildberries.ru/seller/${supplierId}" target="_blank">${supplier}</a></div>
            </span>
            <span class="n-count" style="width:80px; min-width:80px; justify-content:center;">
              ${supplierRating}
            </span>
          </div>
    </div>`;
      };

      requestAnimationFrame(() => {
        let products = this.calculatedProductsTable;
        if (sortBy) {
          products.sort((a, b) => {
            if (orderBy === "desc") {
              return b[sortBy] - a[sortBy];
            } else {
              return a[sortBy] - b[sortBy];
            }
          });
        }
        this.productsTable.innerHTML = products.map(renderProductRow).join("");

        [...document.querySelectorAll("#ns-table-product-row")].forEach(
          (el) => {
            if (el.getAttribute("listener") !== "true") {
              el.setAttribute("listener", "true");
              el.addEventListener("mouseover", function (event) {
                const productId = el.dataset.productId;
                const target = document.querySelector(
                  `#ns-product-dots-chart-dot[data-nm-id="${productId}"]`
                );
                target.classList.add("ns-product-dots-chart-dot-highlight");
              });
              el.addEventListener("mouseout", function (event) {
                const productId = el.dataset.productId;
                const target = document.querySelector(
                  `#ns-product-dots-chart-dot[data-nm-id="${productId}"]`
                );
                target.classList.remove("ns-product-dots-chart-dot-highlight");
              });
            }
          }
        );
        this.renderTooltips();
        const columnsSortable = [
          ...document.querySelectorAll("[data-sort-by]"),
        ];
        columnsSortable.forEach((el) => {
          if (el.getAttribute("listener") !== "true") {
            el.setAttribute("listener", "true");
            el.addEventListener("click", () => {
              const sortBy = el.dataset.sortBy;
              let orderBy =
                el.dataset?.orderBy === undefined
                  ? "desc"
                  : el.dataset?.orderBy;

              const sortedBefore = document.querySelector("[data-order-by]");
              if (sortedBefore) {
                delete sortedBefore.dataset.orderBy;
              }
              if (orderBy === "asc") {
                el.dataset.orderBy = "desc";
              } else {
                el.dataset.orderBy = "asc";
              }
              this.renderProductsTable(sortBy, orderBy);
            });
          }
        });
      });
    }

    renderProductDotsChart() {
      const {
        data: { products = [] },
      } = this.searchData;
      const totalProducts = products.length;
      if (totalProducts === 0) return;

      const diffCount = 100 - products.length;
      const tooltipPosition = `<div class="ns-dot-tooltip" id="ns-dot-position"></div>`;
      const resultDots = [tooltipPosition];

      const boltSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" style="color: #4ade80cc"viewBox="0 0 16 16" fill="currentColor" class="size-4">
      <path fill-rule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clip-rule="evenodd" />
    </svg>`;

      products.forEach(({ id, supplierId, name, log, logs }, index) => {
        let isSuppliersProduct = false;
        const revealOwnDuration = index * 5;
        const revealDuration = index * 15;
        const position =
          ((this.searchViews?.pagination?.data?.currentPage || 1) - 1) * 100 +
          (index + 1);
        if (this.isAuthSupplier) {
          isSuppliersProduct = supplierId === this?.supplierId;
        }
        let dotTemplate = `<div class="ns-product-dots-chart-dot" id="ns-product-dots-chart-dot" data-position="${position}" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
          }ms">${isSuppliersProduct ? boltSVG : ""}</div>`;
        if (log?.tp === "c") {
          dotTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-ad-search" data-position="${position}" id="ns-product-dots-chart-dot" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
            }ms">${isSuppliersProduct ? boltSVG : ""}</div>`;
        }
        if (logs !== undefined && log?.tp !== "c") {
          dotTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-ad-auto" data-position="${position}" id="ns-product-dots-chart-dot" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
            }ms">${isSuppliersProduct ? boltSVG : ""}</div>`;
        }
        resultDots.push(dotTemplate);
      });

      const revealDuration = products.length * 15;

      for (let i = 0; i < diffCount; i++) {
        const emptyTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-empty" style="--dot-animation-duration:${revealDuration}ms"></div>`;
        resultDots.push(emptyTemplate);
      }

      this.productDotsChart.innerHTML = resultDots.join("");
      const dotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      let isMouseOverDot = false;
      let hideTimeout;
      const dotsChartElement = this.productDotsChart;
      const tooltip = document.getElementById("ns-dot-position");
      tooltip.style.display = "none";

      dotElements.forEach((dot, index) => {
        dot.addEventListener("mouseover", (e) => {
          clearTimeout(hideTimeout);
          isMouseOverDot = true;
          this.renderDotTooltipByIndex(index);
        });

        dot.addEventListener("mouseout", (e) => {
          isMouseOverDot = false;
          hideTimeout = setTimeout(() => {
            if (!isMouseOverDot) {
              tooltip.innerText = "";
              tooltip.style.display = "none";
            }
          }, 200);
        });

        dot.addEventListener("click", () => {
          const productId = dot.dataset.nmId;
          let needleElement = document.querySelector(
            `article[data-nm-id="${productId}"]`
          );
          needleElement?.scrollIntoView({ block: "center" });
          needleElement?.classList.add("ns-scale-product-card");
          setTimeout(() => {
            needleElement?.classList.remove("ns-scale-product-card");
          }, 2200);
        });
      });
    }

    hideDotTooltip() {
      const tooltip = document.getElementById("ns-dot-position");
      tooltip.style.display = "none";
    }

    renderDotTooltipByIndex(index) {
      const dotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];



      if (index > dotElements.length - 1) return;

      const tooltip = document.getElementById("ns-dot-position");

      const products = this.searchData.data.products;

      const dot = dotElements[index];
      const position = dot.dataset.position;
      const productId = Number(dot.dataset.nmId);

      const detail = this.detailData.find(
        (p) => p.id === productId);

      const product = products.find((item) => item.id === productId);
      const price = detail?.sizes?.find(({ price }) => price)?.price?.product / 100;
      const brand = detail?.brand;
      if (tooltip.style.display === "none") {
        tooltip.style.display = "block";
      }

      tooltip.innerHTML = `
        <div style="display:flex; z-index:10; position:relative; gap:4px; flex-direction: column; min-width: 200px;">
          <img src="${imageURL(
        productId
      )}" style="flex:1; opacity:0.95; width: 200px; height: 380px; border-radius: 8px;background: #efeff4;"/>
          <div style="position:absolute; top:4px; left:4px;">
            <div style="display: flex;gap: 4px;padding: 2px 10px 2px 4px;align-items: center;font-weight: 600 !important;background: #162033;border-radius: 7px;">
              <img style="height:24px; padding-top:1px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
              <span>${position}</span>
            </div>
          </div>
          <span style="font-size: 1.4em; font-weight: 600;">${price}<small>₽</small></span>
          <div>${brand !== undefined ? `<span>${brand} / </span>` : ""
        }<span style="color: #cbd5e1;">${detail?.name || ""}</span></div>
        </div>
      `;
    }

    renderProductsDotsRatioData() {
      const productsbyType = {
        organic: 0,
        auto: 0,
      };

      const sumCPMbyType = {
        auto: 0,
      };

      const ratioByType = {
        organic: 0,
        auto: 0,
      };
      const resultRatios = [];

      const totalProducts = this.searchData?.data?.products?.length || 0;
      this.searchData?.data?.products?.map((product) => {
        if (product?.logs) {
          if (product?.log?.tp === "c") {
            productsbyType.search += 1;
            sumCPMbyType.search += product?.log?.cpm;
          } else {
            productsbyType.auto += 1;
            sumCPMbyType.auto += product?.log?.cpm;
          }
        } else {
          productsbyType.organic += 1;
        }
      });

      for (let [type, value] of Object.entries(productsbyType)) {
        const types = {
          organic: { title: "Органика", color: "#334155" },
          auto: { title: "Рекламные Кампании", color: "#2563eb" },
        };
        const ratio = precise.round((100 / totalProducts) * value);
        const maxRatioWidth = 80;
        const ratioWidth = maxRatioWidth * (ratio / 100);
        const template = `
      <div style="border-left: 4px solid ${types[type].color
          }; padding-left: 4px;">
        <div style="font-size: 0.8em; font-weight: 400;">${types[type].title
          }</div>
        <div class="ns-product-dots-ratio-values">
          <div class="ns-product-dots-ratio-chart" style="background: ${types[type].color + "61"
          }; --ns-ratio-width: ${ratioWidth}px; height: 18px; margin-left: -4px;margin-top: 1px;"></div>
          <span style="font-weight: 600;">${ratio}%</span>
          <span style="font-weight: 200; font-size: 0.8em;">(${value}шт.)</span>
        </div>
      </div>
      `;
        resultRatios.push(template);
      }

      this.productDotsRatioData.innerHTML = resultRatios.join("");
    }

    detectSearchResultsElements() {
      const pagination = document.querySelector(".pagination__wrapper");
      const productsLayout = document.querySelector(".card-sizes");
      const productsCatalog = document.querySelector(".catalog-page__content");

      this.searchViews = {
        pagination: pagination ? $.view(pagination) : {},
        productsLayout: productsLayout ? $.view(productsLayout) : {},
        productsCatalog: productsCatalog ? $.view(productsCatalog) : {},
      };

      this.mainWindowElement = document.getElementById("ns-main-window");
      this.hiddenWindowElement = document.getElementById("ns-hidden-window");

      this.expandWindowElement = document.getElementById("ns-expand-btn");
      this.collapseWindowElement = document.getElementById("ns-collapse-btn");

      this.prioritySubjectsElement = document.getElementById(
        "ns-priority-subjects"
      );

      this.groupByPriceElement = document.getElementById("ns-groupby-price");
      this.warehousesPerPositionElement = document.getElementById(
        "ns-warehouses-per-position"
      );

      this.keywordViewElement = document.getElementById("ns-keyword-view");
      this.productsTable = document.getElementById("n-products-list");
      this.keywordFrequencyViewElement = document.getElementById(
        "ns-keyword-frequency-view"
      );
      this.keywordClusterFrequencyViewElement = document.getElementById(
        "ns-keyword-cluster-frequency-view"
      );

      this.searchOptionsToggleViewElement = document.getElementById(
        "ns-search-options-toggle-view"
      );

      this.searchPagination = document.getElementById("ns-search-pagination");
      this.searchQueryData = document.getElementById("ns-search-query-data");
      this.productDotsChart = document.getElementById("ns-product-dots-chart");
      this.productDotsRatioData = document.getElementById(
        "ns-product-dots-ratio-data"
      );
    }

    async renderTooltips() {
      if (window.tippy === undefined) {
        await import("../libs/popper.min.js");
        await import("../libs/tippy-bundle.umd.js");
      }

      tippy("[data-tip]", {
        content(reference) {
          const desc = reference.dataset.tip;
          return `
          <div class="n-column-tip">
            ${desc}
          </div>
          `;
        },
        arrow: false,
        followCursor: false,
        placement: "top",
        allowHTML: true,
      });

      tippy("[data-subject-tip]", {
        content(reference) {
          const desc = reference.dataset.subjectTip;
          return `
          <div class="n-subject-tip">
            ${desc}
          </div>
          `;
        },
        arrow: false,
        followCursor: false,
        placement: "top",
        allowHTML: true,
      });
    }

    async renderSearchResultsElements() {
      try {
        this.searchCalculations = {
          subjects: new Map(),
          subjectsPerPosition: new Map(),
          groupByPrice: {
            range: 100,
            maxPrice: 0,
            minPrice: 9999999999,
            data: new Map(),
          },
          warehouses: new Map(),
          warehousesPerPosition: new Map(),
          feedbacksPerPosition: new Map(),
          pricePerPosition: new Map(),
        };
        await this.checkEchartsLoaded();
        this.renderProductDotsChart();
        this.renderProductsDotsRatioData();
        await this.renderSearchQueryData();
        this.renderPrioritySubjects();
        this.renderGroupByPriceChart();
        this.renderWarehousesPerPositionChart();
        this.renderFeedbacksPerPositionChart();
        this.renderParallelComparisonChart();
      } catch (e) {
        console.error(e);
      }
    }

    async checkEchartsLoaded() {
      if (window.echarts === undefined) {
        await import(
          "../libs/echarts.min.js?fixed=1"
        );
      }
    }

    renderParallelComparisonChart() {
      const data = [];
      this.searchData.data.products.forEach(
        (product, index) => {
          const detail = this.detailData.find(
            (p) => p.id === product.id);
          const position =
            (this.getCurrentPage() - 1) * 100 +
            (index + 1);
          const feedbacks = product.feedbacks || 0;
          const reviewRating = product.reviewRating || 0;
          const price = Math.round(detail?.sizes?.find(({ price }) => price)?.price?.product / 100) || 0;
          const deliveryHours = product.time1 + product.time2 || 0;
          const supplierRating = product.supplierRating || 0;
          const distance = product.dist || 0;
          const cpmAuto = product?.log?.tp !== "c" ? product?.log?.cpm || 0 : 0;
          const cpmSeacat =
            product?.log?.tp === "c" ? product?.log?.cpm || 0 : 0;
          const cpm = product?.log?.cpm || 0;
          const premiumSale = (product?.saleConditions >> 22) & 31 || 0;
          const time1 = product.time1;
          const time2 = product.time2;
          const positionBefore = product?.log?.position || position;
          const totalQuantity = product.totalQuantity;
          const rs = product.rs || 1;
          const details = this.detailData.find((p) => p.id === product.nmId);
          const hasPromo = detail.panelPromoId > 0 ? 1 : 0;
          const promoText = detail?.promoTextCard ?? "Распродажа";
          const volume = product.volume;
          const isNew = product?.isNew;
          const viewFlags = product.viewFlags;
          data.push([
            product?.logs ? (product?.log?.tp === "c" ? "Поиск" : "РК") : "Нет",
            isNew ? "Да" : "Нет",
            hasPromo
              ? promoText[0] + promoText.slice(1, 3).toLowerCase()
              : "Нет",
            reviewRating,
            supplierRating,
            feedbacks,
            price,
            deliveryHours,
            position,
          ]);
        }
      );

      const chart =
        this.ParallelComparisonChartInstance ||
        echarts.init(document.getElementById("ns-parallel-comparison-chart"));

      this.ParallelComparisonChartInstance = chart;

      const lineStyle = {
        width: 1.5,
        opacity: 0.15,
        shadowColor: "rgba(255,255,255,.1)",
        shadowBlur: 4,
      };

      const lineStyleHovered = {
        width: 2,
        opacity: 0.95,
        shadowColor: "rgba(255,255,255,.2)",
        shadowBlur: 4,
        inactiveOpacity: 0,
      };

      const options = {
        grid: { top: 0, left: 0, right: 0, bottom: 0 },
        visualMap: {
          show: false,
          type: "piecewise",
          inRange: {
            color: ["#20b356", "#2563eb", "#fd01fe"],
          },
          min: (this.getCurrentPage() - 1) * 100 + 1,
          max: (this.getCurrentPage() - 1) * 100 + 100,
          dimensions: [9],
          outOfRange: {
            color: ["#ccc"], //['#d94e5d','#eac736','#50a3ba']
          },
          top: 20,
          textStyle: {
            color: "#fff",
          },
          realtime: true,
        },
        parallelAxis: [
          {
            dim: 0,
            realtime: true,
            type: "category",
            data: ["Нет", "РК"],
            name: `Реклама`,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
              padding: [0, 0, 0, 10],
            },
          },
          {
            dim: 1,
            realtime: true,
            type: "category",
            name: `Новый\nТовар`,
            data: ["Нет", "Да"],
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 2,
            realtime: true,
            type: "category",
            name: `Есть в\nАкции`,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 3,
            realtime: true,
            name: `Рейтинг\nТовара`,
            min: 4, //"dataMin",
            max: "dataMax",
            realtime: true,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 4,
            realtime: true,
            name: `Рейтинг\nПродавца`,
            min: "dataMin",
            max: "dataMax",
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 5,
            name: `Отзывы`,
            min: "dataMin",
            max: "dataMax",
            realtime: true,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 6,
            realtime: true,
            name: "Цена",
            type: "log",
            min: "dataMin",
            max: "dataMax",
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 7,
            realtime: true,
            name: "Доставка",
            min: "dataMin",
            max: "dataMax",
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              verticalAlign: "center",
            },
          },
          {
            dim: 8,
            realtime: true,
            name: `Текущая\nПозиция`,
            min: "dataMin",
            max: "dataMax",
            nameLocation: "start",
            inverse: true,
            nameTextStyle: {
              verticalAlign: "center",
            },
          },
        ],
        parallel: {
          top: 38,
          left: "0%",
          right: 35,
          bottom: 0,
          height: 270,
          layout: "horizontal",
          realtime: true,
          areaStyle: {
            width: 20,
            borderWidth: 1,
            borderColor: "red",
            color: "red",
            fill: "red",
          },
          parallelAxisDefault: {
            type: "value",
            name: "Товар",
            nameLocation: "end",
            animation: true,
            nameGap: 20,
            realtime: true,
            areaSelectStyle: {
              width: 20,
              borderWidth: 1,
              borderColor: "rgba(160,197,232)",
              color: "rgba(160,197,232)",
              z: -1,
              opacity: 0.3,
            },
            nameTextStyle: {
              color: "#cbd5e1",
              width: 150,
              fontSize: 10,
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff1a",
              },
            },
            minorTick: {
              show: true,
              lineStyle: {
                color: "#ffffff1a",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#cbd5e1",
              },
            },
            splitLine: {
              show: true,
            },
            axisLabel: {
              color: "#cbd5e1",
            },
            realtime: false,
            animation: false,
          },
        },
        animation: false,
        series: [
          {
            name: "Товар",
            type: "parallel",
            lineStyle: lineStyle,
            emphasis: {
              lineStyle: lineStyleHovered,
            },
            inactiveOpacity: 0,
            activeOpacity: 0.35,
            smooth: true,
            data: data,
          },
        ],
      };

      chart.setOption(options);
      window.onresize = () => this.ParallelComparisonChartInstance.resize();

      this.ParallelComparisonChartInstance.resize();

      const mainChartDotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      chart.on("mouseover", (params) => {
        const isHidden = params?.event?.target?.style?.opacity === 0;
        const dataIndex = params.dataIndex;
        const productId =
          this.searchData.data.products[dataIndex].id;
        if (!isHidden) {
          chart.dispatchAction({ type: "highlight", dataIndex });
          this.renderDotTooltipByIndex(dataIndex);
        } else {
          chart.dispatchAction({ type: "downplay", dataIndex });
          this.hideDotTooltip();
        }
        mainChartDotElements.forEach((el) => {
          const elProductId = Number(el.dataset.nmId);
          if (!isHidden && elProductId === productId) {
            el.classList.remove("ns-product-dots-chart-dot-hide");
            el.classList.add("ns-product-dots-chart-dot-highlight");
          } else {
            el.classList.remove("ns-product-dots-chart-dot-highlight");
            if (!isHidden) {
              el.classList.add("ns-product-dots-chart-dot-hide");
            }
          }
        });
      });

      chart.on("mouseout", (params) => {
        const dataIndex = params.dataIndex;
        chart.dispatchAction({ type: "downplay", dataIndex });
        this.hideDotTooltip();
        mainChartDotElements.forEach((el) => {
          el.classList.remove("ns-product-dots-chart-dot-highlight");
          el.classList.remove("ns-product-dots-chart-dot-hide");
        });
      });
    }

    renderGroupByPriceChart() {
      const range = this.searchCalculations.groupByPrice.range;
      if (this.renderGroupByPriceChartFirstRender === undefined) {
        this.renderGroupByPriceChartFirstRender = true;
        let needleRange = 100;
        if (this.searchCalculations.groupByPrice.maxPrice < 5000) {
          needleRange = 100;
        }

        if (
          this.searchCalculations.groupByPrice.maxPrice >= 5000 &&
          this.searchCalculations.groupByPrice.maxPrice < 10000
        ) {
          needleRange = 500;
        }

        if (
          this.searchCalculations.groupByPrice.maxPrice >= 10000 &&
          this.searchCalculations.groupByPrice.maxPrice < 30000
        ) {
          needleRange = 1000;
        }

        if (this.searchCalculations.groupByPrice.maxPrice >= 30000) {
          needleRange = 5000;
        }

        if (range !== needleRange) {
          this.searchCalculations.groupByPrice.range = needleRange;
          this.searchCalculations.groupByPrice.data = new Map();
          this.searchData?.data?.products?.forEach(
            (product) => {
              this.calculateGroupByPrice(product);
            }
          );
          return this.renderGroupByPriceChart();
        }
      }

      const groupByKeys = this.searchCalculations.groupByPrice.data.keys();
      const sortedKeys = [...groupByKeys].sort((a, b) => a - b);
      if (sortedKeys.length > 1) {
        let shouldBeItems =
          (Number(sortedKeys[sortedKeys.length - 1]) - Number(sortedKeys[0])) /
          range;
        shouldBeItems = shouldBeItems < 14 ? 14 : shouldBeItems;
        for (let i = 1; i <= shouldBeItems; i++) {
          if (i * range < sortedKeys[0]) continue;
          if (!this.searchCalculations.groupByPrice.data.get(i * range)) {
            this.searchCalculations.groupByPrice.data.set(i * range, []);
          }
        }
      }

      const axisData = [...this.searchCalculations.groupByPrice.data.entries()];
      axisData.sort((a, b) => a[0] - b[0]);
      const xAxisData = [];
      const yAxisData = [];
      axisData.forEach(([priceGroup, products]) => {
        xAxisData.push(priceGroup);
        yAxisData.push(products.length);
      });

      const chart =
        this.GroupByPriceChartInstance ||
        echarts.init(document.getElementById("ns-groupby-price-chart"));

      this.GroupByPriceChartInstance = chart;

      chart.off("highlight");
      chart.off("globalout");

      var option = {
        grid: {
          top: "1%",
          left: "0%",
          right: "0%",
          bottom: "1%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params) => {
            const { axisValue, value } = params[0];
            const fromPrice = Number(axisValue);
            const toPrice =
              fromPrice + this.searchCalculations.groupByPrice.range;
            return `
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 0.9em; color: #707f95">Диапазон цен</span>
              <span style="font-size: 1.2em;">${fromPrice} - ${toPrice}</span>
              <span style="font-size: 0.9em; color: #707f95">Товаров</span>
              <span style="font-size: 1.2em;">${value}</span>
            </div>
            `;
          },
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: {
          data: xAxisData,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            type: "bar",
            name: "Товаров",
            data: yAxisData,
            itemStyle: {
              barBorderRadius: [8, 8],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
              shadowColor: "#22c55e10",
              shadowBlur: 6.5,
            },
          },
        ],
      };

      const mainChartDotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      chart.setOption(option);

      chart.on("highlight", function (params) {
        const dataIndex = params.batch[0].dataIndex;
        const value = Number(xAxisData[dataIndex]);
        const products = axisData.find(([key, _]) => key === value)[1];
        mainChartDotElements.forEach((el) => {
          const elProductId = Number(el.dataset.nmId);
          if (products.includes(elProductId)) {
            el.classList.remove("ns-product-dots-chart-dot-hide");
            el.classList.add("ns-product-dots-chart-dot-highlight");
          } else {
            el.classList.remove("ns-product-dots-chart-dot-highlight");
            el.classList.add("ns-product-dots-chart-dot-hide");
          }
        });
      });

      chart.on("globalout", function (params) {
        mainChartDotElements.forEach((el) => {
          el.classList.remove("ns-product-dots-chart-dot-highlight");
          el.classList.remove("ns-product-dots-chart-dot-hide");
        });
      });

      window.onresize = () => this.GroupByPriceChartInstance.resize();

      const minPriceElement = document.getElementById("ns-groupby-price-min");
      const maxPriceElement = document.getElementById("ns-groupby-price-max");
      minPriceElement.innerHTML =
        this.searchCalculations.groupByPrice.minPrice +
        `<span style="font-weight: 600; font-size:0.7em;">₽</span>`;
      maxPriceElement.innerHTML =
        this.searchCalculations.groupByPrice.maxPrice +
        `<span style="font-weight: 600; font-size:0.7em;">₽</span>`;

      const groupByButtonsToInsert = [];
      if (this.searchCalculations.groupByPrice.maxPrice < 5000) {
        groupByButtonsToInsert.push(...[50, 100, 500]);
      }

      if (
        this.searchCalculations.groupByPrice.maxPrice >= 5000 &&
        this.searchCalculations.groupByPrice.maxPrice < 10000
      ) {
        groupByButtonsToInsert.push(...[100, 500, 1000]);
      }

      if (
        this.searchCalculations.groupByPrice.maxPrice >= 10000 &&
        this.searchCalculations.groupByPrice.maxPrice < 30000
      ) {
        groupByButtonsToInsert.push(...[500, 1000, 5000]);
      }
      if (this.searchCalculations.groupByPrice.maxPrice >= 30000) {
        groupByButtonsToInsert.push(...[1000, 5000, 10000]);
      }

      const groupByButtonsWrapper = document.getElementById(
        "ns-groupby-price-range-buttons"
      );

      groupByButtonsWrapper.innerHTML = groupByButtonsToInsert
        .map(
          (value, index) => `
        <div class="n-nav-btn" style="height:20px; border-radius: 3px;" id="ns-groupby-price-chart-btn" data-group-by-value="${value}">
          <span>${value}₽</span>
        </div>
      `
        )
        .join("");

      const groupByBtns = [
        ...document.querySelectorAll("#ns-groupby-price-chart-btn"),
      ];

      groupByBtns.forEach((el) => {
        const btnPrice = Number(el.dataset.groupByValue);
        if (btnPrice === range) {
          el.classList.add("n-nav-btn-active");
        } else {
          el.classList.remove("n-nav-btn-active");
        }
        if (el.getAttribute("listener") !== "true") {
          el.setAttribute("listener", true);
          el.addEventListener("click", (e) => {
            this.searchCalculations.groupByPrice.range = btnPrice;
            this.searchCalculations.groupByPrice.data = new Map();
            const products = this.searchData?.data?.products || [];
            products.forEach((product) => {
              this.calculateGroupByPrice(product);
            });
            this.renderGroupByPriceChart();
          });
        }
      });
    }

    renderWarehousesPerPositionChart() {
      const axisData = [
        ...this.searchCalculations.warehousesPerPosition.entries(),
      ];
      const xAxisData = [];
      const yAxisData = [];

      let minCount = 9999;
      let maxCount = 0;
      axisData.forEach(([position, { count }]) => {
        if (maxCount < count) {
          maxCount = count;
        }
        if (minCount > count) {
          minCount = count;
        }

        xAxisData.push(position);
        yAxisData.push(count);
      });

      const CalcMovingAverage = (data, qualifier = 3) => {
        const qualifiedArr = [];
        const qualifiedAxisArr = [];
        const preQualified = [];
        data.forEach((item, index) => {
          preQualified.push(item);
          if ((index + 1) % qualifier === 0) {
            qualifiedArr.push(
              precise.round([...preQualified].sum() / qualifier)
            );
            qualifiedAxisArr.push(qualifier * qualifiedArr.length);
            preQualified.length = 0;
          }
        });
        return [qualifiedArr, qualifiedAxisArr];
      };

      const movingAverageData = CalcMovingAverage(yAxisData, 5);
      const [movingAverage, movingAverageAxis] = movingAverageData;

      const chart =
        this.WarehousesPerPositionChartInstance ||
        echarts.init(
          document.getElementById("ns-warehouses-per-position-chart")
        );

      this.WarehousesPerPositionChartInstance = chart;

      chart.off("highlight");
      chart.off("globalout");

      var option = {
        grid: {
          top: "10%",
          left: "1%",
          right: "0%",
          bottom: "1%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          hideDelay: 0,
          appendTo: this.mainWindowElement,
          formatter: (params) => {
            if (params.length === 1) return;
            const { axisValue, value } = params[0];
            const { axisValue: maAxisValue, value: maValue } = params[1];
            const position = Number(axisValue);
            const data =
              this.searchCalculations.warehousesPerPosition.get(position);
            return `
            <div style="position: relative; display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 0.9em; color: #707f95">Позиция</span>
              <span style="font-size: 1.2em;">${position}</span>
              <span style="font-size: 0.9em; color: #707f95">Cредняя (${Number(maAxisValue) - 4
              } - ${maAxisValue})</span>
              <span style="font-size: 1.2em;">${maValue}</span>
              <span style="font-size: 0.9em; color: #707f95">Количество складов</span>
              <span style="font-size: 1.2em;">${value}</span>
              <div class="n-mini-charts-tooltip" style="position: absolute; left: 170px; top: -11px; border-radius: 3px;  display: flex; flex-direction: column; gap: 4px; padding: 10px; ">
                <span style="font-size: 0.9em; color: #707f95">Склады</span>
                ${data.warehouses
                .map(
                  (whId) =>
                    `<span style="font-size: 1em;">${WAREHOUSES[whId] || "FBS"
                    }</span>`
                )
                .join("")}
              </div>
              <div class="n-mini-charts-tooltip" style="position: absolute; left: 130px; top: 0px; border-radius: 0; border: none; height: 16px; width:41px; border-left: none !important; border-right: none !important; display: block;">
              </div>
            </div>
            `;
          },
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: [
          {
            data: xAxisData,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            data: movingAverageAxis,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "transparent" },
                  { offset: 0.15, color: "#ffffff10" },
                ]),
              },
            },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "transparent" },
                  { offset: 0.05, color: "#ffffff10" },
                ]),
              },
            },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
        series: [
          {
            type: "scatter",
            name: "Складов",
            data: yAxisData,
            symbolSize: 6,
            itemStyle: {
              barBorderRadius: [8, 8],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#22c55eAA",
                },
              ]),
              shadowColor: "#22c55e50",
              shadowBlur: 6.5,
            },
          },
          {
            type: "line",
            name: "Средняя скользящая",
            symbol: "circle",
            symbolSize: 2,
            smooth: true,
            data: movingAverage,
            xAxisIndex: 1,
            itemStyle: {
              color: "#d1a724",
              borderColor: "#ffffff",
              borderWidth: 1,
            },
            lineStyle: {
              width: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#d1a724",
                },
                {
                  offset: 1,
                  color: "#d1a724",
                },
              ]),
            },
          },
        ],
      };

      const mainChartDotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      chart.setOption(option);
      window.onresize = () => this.WarehousesPerPositionChartInstance.resize();

      chart.on("highlight", (params) => {
        const dataIndex = params.batch[0].dataIndex;
        this.renderDotTooltipByIndex(dataIndex);
        mainChartDotElements.forEach((el, elIndex) => {
          if (elIndex === dataIndex) {
            el.classList.remove("ns-product-dots-chart-dot-hide");
            el.classList.add("ns-product-dots-chart-dot-highlight");
          } else {
            el.classList.remove("ns-product-dots-chart-dot-highlight");
            el.classList.add("ns-product-dots-chart-dot-hide");
          }
        });
      });

      chart.on("globalout", (params) => {
        this.hideDotTooltip();
        mainChartDotElements.forEach((el) => {
          el.classList.remove("ns-product-dots-chart-dot-highlight");
          el.classList.remove("ns-product-dots-chart-dot-hide");
        });
      });

      const minCountElement = document.getElementById(
        "ns-warehouses-per-position-min"
      );
      const maxCountElement = document.getElementById(
        "ns-warehouses-per-position-max"
      );
      minCountElement.innerHTML = minCount;
      maxCountElement.innerHTML = maxCount;
    }

    renderFeedbacksPerPositionChart() {
      const axisData = [
        ...this.searchCalculations.feedbacksPerPosition.entries(),
      ];
      const xAxisData = [];
      const yAxisData = [];

      let minCount = 9999;
      let maxCount = 0;
      axisData.forEach(([position, { feedbacks }]) => {
        if (maxCount < feedbacks) {
          maxCount = feedbacks;
        }
        if (minCount > feedbacks && !isNaN(feedbacks)) {
          minCount = isNaN(feedbacks) ? 0 : feedbacks;
        }
        if (isNaN(feedbacks)) {
          minCount = 0;
        }

        xAxisData.push(position);
        yAxisData.push(feedbacks > 0 ? feedbacks : NaN);
      });

      const CalcMovingAverage = (data, qualifier = 3) => {
        const qualifiedArr = [];
        const qualifiedAxisArr = [];
        const preQualified = [];
        data.forEach((item, index) => {
          preQualified.push(item);
          if ((index + 1) % qualifier === 0) {
            qualifiedArr.push(
              precise.round(
                [...preQualified].map((x) => (isNaN(x) ? 0 : x)).sum() /
                qualifier
              )
            );
            qualifiedAxisArr.push(qualifier * qualifiedArr.length);
            preQualified.length = 0;
          }
        });
        return [qualifiedArr, qualifiedAxisArr];
      };

      const movingAverageData = CalcMovingAverage(yAxisData, 5);
      const [movingAverage, movingAverageAxis] = movingAverageData;

      const chart =
        this.FeedbacksPerPositionChartInstance ||
        echarts.init(
          document.getElementById("ns-feedbacks-per-position-chart")
        );

      this.FeedbacksPerPositionChartInstance = chart;

      chart.off("highlight");
      chart.off("globalout");

      var option = {
        grid: {
          top: "5%",
          left: "0%",
          right: "0%",
          bottom: "1%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params) => {
            if (params.length === 1) return;
            const { axisValue, value } = params?.[0];
            const { axisValue: maAxisValue, value: maValue } = params?.[1];
            const position = Number(axisValue);
            const data =
              this.searchCalculations.feedbacksPerPosition.get(position);
            return `
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 0.9em; color: #707f95">Позиция</span>
              <span style="font-size: 1.2em;">${position}</span>
              <span style="font-size: 0.9em; color: #707f95">Cредняя (${Number(maAxisValue) - 4
              } - ${maAxisValue})</span>
              <span style="font-size: 1.2em;">${maValue}</span>
              <span style="font-size: 0.9em; color: #707f95">Количество отзывов</span>
              <span style="font-size: 1.2em;">${isNaN(value) ? 0 : value}</span>
              <span style="font-size: 0.9em; color: #707f95">Рейтинг</span>
              <span style="font-size: 1.2em;">${data.rating}</span>
            </div>
            `;
          },
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: [
          {
            data: xAxisData,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            data: movingAverageAxis,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: "#ffffff10",
              },
            },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
        yAxis: [
          {
            min: "dataMin",
            max: "dataMax",
            type: "log",
            logBase: 10,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            min: "dataMin",
            max: "dataMax",
            type: "log",
            logBase: 10,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
        series: [
          {
            type: "bar",
            name: "Отзывы",
            data: yAxisData,
            barMinHeight: 1,
            itemStyle: {
              barBorderRadius: [8, 8],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
              shadowColor: "#22c55e10",
              shadowBlur: 6.5,
            },
          },

          {
            type: "line",
            name: "Средняя скользящая",
            symbol: "circle",
            symbolSize: 2,
            smooth: true,
            data: movingAverage,
            xAxisIndex: 1,
            itemStyle: {
              color: "#d1a724",
              borderColor: "#ffffff",
              borderWidth: 1,
            },
            lineStyle: {
              width: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#d1a724",
                },
                {
                  offset: 1,
                  color: "#d1a724",
                },
              ]),
            },
          },
        ],
      };

      const mainChartDotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      chart.setOption(option);

      window.onresize = () => this.FeedbacksPerPositionChartInstance.resize();

      chart.on("highlight", (params) => {
        const dataIndex = params.batch[0].dataIndex;
        this.renderDotTooltipByIndex(dataIndex);
        mainChartDotElements.forEach((el, elIndex) => {
          if (elIndex === dataIndex) {
            el.classList.remove("ns-product-dots-chart-dot-hide");
            el.classList.add("ns-product-dots-chart-dot-highlight");
          } else {
            el.classList.remove("ns-product-dots-chart-dot-highlight");
            el.classList.add("ns-product-dots-chart-dot-hide");
          }
        });
      });

      chart.on("globalout", (params) => {
        this.hideDotTooltip();
        mainChartDotElements.forEach((el) => {
          el.classList.remove("ns-product-dots-chart-dot-highlight");
          el.classList.remove("ns-product-dots-chart-dot-hide");
        });
      });

      const minCountElement = document.getElementById(
        "ns-feedbacks-per-position-min"
      );
      const maxCountElement = document.getElementById(
        "ns-feedbacks-per-position-max"
      );
      minCountElement.innerHTML = minCount;
      maxCountElement.innerHTML = maxCount;
    }

    async renderPrioritySubjects() {
      const subjects = [
        ...this.searchCalculations.subjectsPerPosition.values(),
      ];
      const products = this.searchData.data.products;
      const findTopSubject = (subjects, topNumber) => {
        const counter = {};
        const slicedSubjects = subjects.slice(0, topNumber);

        slicedSubjects.forEach(({ subjectId }) => {
          const count = counter?.[subjectId] || 0;
          counter[subjectId] = count + 1;
        });
        const dataArray = [...Object.entries(counter)]
          .sort(([, v1], [, v2]) => v2 - v1)
          .map(([subjectId, count]) => ({
            subjectId: Number(subjectId),
            count,
            name: this.subjectsNameById.get(Number(subjectId)),
          }));

        return dataArray || [];
      };

      const top_10 = findTopSubject(subjects, 10);
      const top_50 = findTopSubject(subjects, 50);
      const top_100 = findTopSubject(subjects, 100);

      const subjectsSchema = {
        weight: 0,
        count: 0,
        name: null,
        color: null,
      };

      const preparedSubjects = {};

      const _colors = [
        "#A162F7",
        "#6278f7",
        "#2563eb",
        "#25b3eb",
        "#01f1a1",
        "#2fbe03",
        "#e4e72b",
        "#FF8743",
        "#DB3031",
      ];
      const _colors_postfix = ["EE", "70", "30"];

      const colors = [];
      _colors_postfix.forEach((postFix) => {
        colors.push(..._colors.map((color) => color + postFix));
      });

      let minCount = 0;
      let maxCount = 0;

      subjects.forEach(({ subjectId }) => {
        if (preparedSubjects?.[subjectId] === undefined) {
          preparedSubjects[subjectId] = { ...subjectsSchema };
          const color = colors.shift() || "#eeeeee80";
          const name = this.subjectsNameById.get(subjectId);
          preparedSubjects[subjectId].color = color;
          preparedSubjects[subjectId].name = name;
        }
        preparedSubjects[subjectId].count =
          preparedSubjects[subjectId].count + 1;
        if (maxCount < preparedSubjects[subjectId].count) {
          maxCount = preparedSubjects[subjectId].count;
        }
        if (minCount === null || minCount > preparedSubjects[subjectId]) {
          minCount = preparedSubjects[subjectId].count;
        }
      });

      const normalize = (val, max, min) => ((val - min) / (max - min)) * 10;
      const normalizeBetweenTwoRanges = (
        val,
        minVal,
        maxVal,
        newMin,
        newMax
      ) => {
        return parseInt(
          newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal)
        );
      };
      const dotsChart = [];

      let revealOwnDuration = 0;
      const dotRenderer = (subject, weight, color, index) => {
        revealOwnDuration += 20;
        return `
        <div class="ns-priority-subjects-dot" id="ns-priority-subjects-dot" style="--dot-animation-duration:${revealOwnDuration}ms;" data-dot-index="${index}" data-subject-tip="${this.subjectsNameById.get(
          subject
        )}">
          <div style="width:${weight}px; height:${weight}px; border-radius: 50%; background: ${color}">
          </div>
        </div>`;
      };

      const maxDotSize =
        Object.keys(preparedSubjects).length + 2 > 13
          ? 13
          : Object.keys(preparedSubjects).length + 2;

      Object.keys(preparedSubjects).forEach((subject) => {
        preparedSubjects[subject].weight = normalizeBetweenTwoRanges(
          preparedSubjects[subject].count,
          minCount,
          maxCount,
          3,
          maxDotSize
        );
      });

      products.forEach((product, index) => {
        const subject = Number(product.subjectId);
        const { weight, color } = preparedSubjects[subject];
        dotsChart.push(dotRenderer(subject, weight, color, index));
      });

      this.prioritySubjectsElement.innerHTML = `
        <div style="display:flex; gap: 8px; padding: 12px;">
          <div style="display: flex; gap:3px; align-content: flex-start; width:74px; min-width: 74px; flex-wrap:wrap;">
            ${dotsChart.join("")}
          </div>
          <div style="display:flex; flex-direction: column; gap: 2px;">
            <div style="display:flex; height: 29px; gap:4px; align-items:center;">
              <div style="width:3px; height: 29px; border-radius:8px; background: #99a8cb;"></div>
              <div style="display: flex; flex-direction:column; line-height: 0.8em;">
                <span style="font-size: 0.6em;">TOP 10</span>
                <div style="display:flex; align-items:center; gap:2px;">
                  <span style="width:5px; height:5px; background: ${preparedSubjects[top_10[0].subjectId].color
        }; border-radius:50%;"></span>
                  <span style="font-size: 0.9em;">${top_10[0].name} ${top_10[0].count
        }<small>/10</small></span>
                </div>
              </div>
            </div>
            <div style="display:flex; height: 119px; gap:4px; align-items:center;">
              <div style="width:3px; height: 119px; border-radius:8px; background: #566077;"></div>
              <div style="display: flex; flex-direction:column; line-height: 0.8em;">
                <span style="font-size: 0.6em;">TOP 50</span>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${top_50
          .slice(0, 5)
          .map(
            (top, index) => `
                  <div style="display:flex; align-items:center; gap:2px;">
                    <span style="width: ${index > 0 ? 3 : 6}px; height: ${index > 0 ? 3 : 6
              }px; background: ${preparedSubjects[top.subjectId].color
              }; border-radius:50%;"></span>
                    <span style="font-size: ${index > 0 ? 0.75 : 0.9
              }em; opacity: ${index > 0 ? 0.5 : 1}">${top.name} ${top.count
              }<small>/50</small></span>
                  </div>
                  `
          )
          .join("")}
                </div>
              </div>
            </div>
            <div style="display:flex; height: 146px; gap:4px; align-items:center;">
              <div style="width:3px; height: 146px; border-radius:8px; background: #31394d;"></div>
              <div style="display: flex; flex-direction:column; line-height: 0.8em;">
                <span style="font-size: 0.6em;">TOP 100</span>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${top_100
          .slice(0, 6)
          .map(
            (top, index) => `
                  <div style="display:flex; align-items:center; gap:2px;">
                    <span style="width: ${index > 0 ? 3 : 6}px; height: ${index > 0 ? 3 : 6
              }px; background: ${preparedSubjects[top.subjectId].color
              }; border-radius:50%;"></span>
                    <span style="font-size: ${index > 0 ? 0.75 : 0.9
              }em; opacity: ${index > 0 ? 0.5 : 1}">${top.name} ${top.count
              }<small>/100</small></span>
                  </div>
                  `
          )
          .join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const dots = [...document.querySelectorAll("#ns-priority-subjects-dot")];
      const mainChartDotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];
      let hideTimeout;
      let isMouseOverDot;

      dots.forEach((dot) => {
        if (dot.getAttribute("listener") !== "true") {
          dot.setAttribute("listener", true);
          dot.addEventListener("mouseover", () => {
            isMouseOverDot = true;
            clearTimeout(hideTimeout);
            const dotIndex = Number(dot.dataset.dotIndex);
            this.renderDotTooltipByIndex(dotIndex);
            mainChartDotElements.forEach((el, index) => {
              if (dotIndex === index) {
                el.classList.add("ns-product-dots-chart-dot-highlight");
              } else {
                el.classList.remove("ns-product-dots-chart-dot-highlight");
              }
            });
          });

          dot.addEventListener("mouseout", () => {
            mainChartDotElements.forEach((el) => {
              el.classList.remove("ns-product-dots-chart-dot-highlight");
            });
            isMouseOverDot = false;
            hideTimeout = setTimeout(() => {
              if (!isMouseOverDot) {
                this.hideDotTooltip();
              }
            }, 200);
          });
        }
      });
    }

    async renderPaginationView() {
      const { pagination } = this.searchViews;
      const currentPage = this.getCurrentPage();
      let totalPages = 5//pagination?.data?.pagingInfo?.totalPages;
      let isLoading = true;

      const skeleton = `<div class="ns-skeleton" style="width:450px; height:36px; border-radius:4px;"></div>`;
      const template = () => {
        const pagesToRender = new Array(totalPages > 5 ? 5 : totalPages)
          .fill(1)
          .map((_, i) => i + 1);

        return `
        ${isLoading
            ? skeleton
            : `<div style="display: flex; gap:4px; align-items:center; font-size: 0.9em;">
                <div class="n-nav-btn" style="height:36px;" id="ns-update-current-page">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>Обновить страницу</span>
                </div>
                <span style="color: #cbd5e1">Страница:</span>
                ${pagesToRender
              .map(
                (page) => `
                  <div class="n-nav-btn ${page === currentPage ? "n-nav-btn-selected" : ""
                  }" id="ns-set-current-page" data-page="${page}" style="height:36px; width:36px;">${page}</div>
                `
              )
              .join("")}
              </div>`
          }
      `;
      };

      this.searchPagination.innerHTML = template();

      if (!currentPage) {
        return await this.renderPaginationView();
      }

      if (currentPage && !totalPages) {
        await new Promise(async (resolve) => {
          while (!totalPages) {
            await delay(1000);
            totalPages = pagination?.data?.pagingInfo?.totalPages;
            if (totalPages) resolve(totalPages);
          }
        });
      }

      isLoading = false;
      this.searchPagination.innerHTML = template();
      const refreshBtn = document.getElementById("ns-update-current-page");
      const pageElements = [
        ...document.querySelectorAll("#ns-set-current-page"),
      ];

      refreshBtn.addEventListener("click", () => {
        // pagination.data.updatePage(currentPage);
        window.location.href = this.buildUrlWithPage(currentPage);
      });

      pageElements.forEach((pageElement) => {
        pageElement.addEventListener("click", () => {
          const page = pageElement.dataset.page;
          // pagination.data.updatePage(page);
          window.location.href = this.buildUrlWithPage(page);
        });
      });
    }

    renderKeywordView() {
      const isEmpty = this.searchData?.metadata?.is_empty || false;
      const keyword = this.searchData?.metadata?.name;
      const capitalizedKeyword =
        keyword.toLowerCase().charAt(0).toUpperCase() +
        keyword.toLowerCase().slice(1);
      const template = `
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: baseline;">
        <div style="display:flex; gap:8px; align-items:baseline;">
          <span>Запрос</span>
          ${isEmpty
          ? `
                  <span style="border-radius: 4px; font-size: 0.7em; padding:2px 3px; border:1px solid #e11d48; background: #e11d4860; color: #ffffff;">Пустая выдача</span>
                  <span style="border-radius: 4px; font-size: 0.7em; padding:2px 3px; border:1px solid #6366f1; background: #6366f160; color: #ffffff;">Редирект на приближенный запрос</span>`
          : ""
        }
        </div>
        <span class="ns-search-query-value ns-search-query-keyword-capitalize">${capitalizedKeyword || ""
        }</span>
      </div>
    `;
      this.keywordViewElement.innerHTML = template;
    }

    async renderKeywordFrequencyView() {
      const keyword = this.searchData?.metadata?.name;
      let isLoading = true;

      if (!this.isAuthSupplier) {
        return (this.keywordFrequencyViewElement.innerHTML = "");
      }

      const template = () => {
        const skeleton = `<div class="ns-skeleton" style="width:80px; height:15px; border-radius:4px;"></div>`;
        return `
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: baseline;">
      <span>Частота за <u>месяц</u></span>
      <span class="ns-search-query-value">
      ${isLoading
            ? skeleton
            : numberWithSpaces(this.searchQueryMonthFrequency || "Нет данных")
          }</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: baseline;">
      <span>Частота за <u>неделю</u></span>
      <span class="ns-search-query-value">
      ${isLoading
            ? skeleton
            : numberWithSpaces(this.searchQueryWeekFrequency || "Нет данных")
          }</span>
    </div>`;
      };

      if (this.shouldUpdateSearchKeyword()) {
        this.keywordFrequencyViewElement.innerHTML = template();

        const [monthFreq, weekFreq] = await Promise.all([
          this.getKeywordFrequency(keyword),
          this.getKeywordFrequency(keyword, "week"),
        ]);

        this.searchQueryMonthFrequency = monthFreq;
        this.searchQueryWeekFrequency = weekFreq;
      }

      isLoading = false;
      this.keywordFrequencyViewElement.innerHTML = template();
    }

    async renderSearchOptionsToggleView() {
      this.searchOptionsToggleViewElement.innerHTML = `
        <div style="display:flex; flex-direction:column">
          <div class="n-nav-btn" id="ns-search-toggle-personalization" data-status="on" style="justify-content:flex-start; padding:6px;">
            <div id="ns-search-toggle-personalization-icon" style="display:flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <span id="ns-search-toggle-personalization-text">Отключить персонализацию</span>
            <span class="n-wtf" style="margin-left: 4px; font-size: 0.7em; color: #cbd5e1;" data-tip="Отключает/Включает Пользовательские Персонализированные векторы из-за которых поисковая выдача становится персональной для конкретного пользователя. После включения обязательно (!) нажмите на 'Обновить Страницу' или Обновите страницу самостоятельно.">?</span>
          </div>
          <div class="n-nav-btn" id="ns-search-toggle-ab-tests" data-status="on" style="justify-content:flex-start; padding:6px;">
            <div id="ns-search-toggle-ab-tests-icon" style="display:flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <span id="ns-search-toggle-ab-tests-text">Отключить А/Б тесты</span>
            <span class="n-wtf" style="margin-left: 4px; font-size: 0.7em; color: #cbd5e1;" data-tip="WB Иногда тестирует различные изменения в поисковой выдаче на определенных пользовательских группах. Данная кнопка позволяет Включить или Отключить участие в таких группах.">?</span>
          </div>
        </div>
      `;

      const personalizationToggleBtnElement = document.getElementById(
        "ns-search-toggle-personalization"
      );
      const personalizationToggleIconElement = document.getElementById(
        "ns-search-toggle-personalization-icon"
      );
      const personalizationToggleTextElement = document.getElementById(
        "ns-search-toggle-personalization-text"
      );
      const abTestsToggleBtnElement = document.getElementById(
        "ns-search-toggle-ab-tests"
      );
      const abTestsToggleIconElement = document.getElementById(
        "ns-search-toggle-ab-tests-icon"
      );
      const abTestsToggleTextElement = document.getElementById(
        "ns-search-toggle-ab-tests-text"
      );

      const iconOff = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      `;

      const iconOn = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>
      `;

      const basketMgrtStorageKey = "wb___basketMgrt";
      const basketMgrt = localStorage.getItem(basketMgrtStorageKey);
      const hasBasketMgrt = !!basketMgrt;

      const vectorStorageKey = hasBasketMgrt
        ? "user-vector-" + basketMgrt
        : undefined;

      const userClusterStoragekey = hasBasketMgrt
        ? "user-clusters-" + basketMgrt
        : undefined;

      const ABTestsStorageKey = "splitInfoV2";

      const isPersonalizationEnabled =
        !!JSON?.parse(localStorage.getItem(vectorStorageKey))?.data?.search
          ?.value ||
        !!JSON?.parse(localStorage.getItem(userClusterStoragekey))?.data
          ?.length ||
        false;
      const isPersonalizationDisabledByUser =
        localStorage.getItem("neuromarket-search-toggle-personalization") ===
        "false";

      const isABTestsEnabled =
        !!JSON?.parse(localStorage.getItem("splitInfoV2"))?.splitInfo?.search
          ?.length || false;
      const isABTestsDisabledByUser =
        localStorage.getItem("neuromarket-search-toggle-ab-tests") === "false";

      if (!isABTestsEnabled && !isABTestsDisabledByUser) {
        abTestsToggleBtnElement.dataset.status = "disabled";
        abTestsToggleBtnElement.classList.remove("n-nav-btn-active");
        abTestsToggleBtnElement.classList.remove("n-nav-btn");
        abTestsToggleBtnElement.classList.add("n-nav-btn-disabled");
        abTestsToggleTextElement.innerText = "А/Б тесты отсутствуют";
        abTestsToggleIconElement.innerHTML = "";
      } else {
        if (isABTestsDisabledByUser) {
          abTestsToggleBtnElement.dataset.status = "off";
          abTestsToggleBtnElement.classList.remove("n-nav-btn-active");
          abTestsToggleTextElement.innerText = "Включить А/Б тесты";
          abTestsToggleIconElement.innerHTML = iconOn;
        } else {
          abTestsToggleBtnElement.dataset.status = "on";
          abTestsToggleBtnElement.classList.add("n-nav-btn-active");
          abTestsToggleTextElement.innerText = "Отключить А/Б тесты";
          abTestsToggleIconElement.innerHTML = iconOff;
        }
      }

      if (!isPersonalizationEnabled && !isPersonalizationDisabledByUser) {
        personalizationToggleBtnElement.dataset.status = "disabled";
        personalizationToggleBtnElement.classList.remove("n-nav-btn-active");
        personalizationToggleBtnElement.classList.remove("n-nav-btn");
        personalizationToggleBtnElement.classList.add("n-nav-btn-disabled");
        personalizationToggleTextElement.innerText =
          "Персонализация отсутствует";
        personalizationToggleIconElement.innerHTML = "";
      } else {
        if (isPersonalizationDisabledByUser) {
          personalizationToggleBtnElement.dataset.status = "off";
          personalizationToggleBtnElement.classList.remove("n-nav-btn-active");
          personalizationToggleTextElement.innerText =
            "Включить персонализацию";
          personalizationToggleIconElement.innerHTML = iconOn;
        } else {
          personalizationToggleBtnElement.dataset.status = "on";
          personalizationToggleBtnElement.classList.add("n-nav-btn-active");
          personalizationToggleTextElement.innerText =
            "Отключить персонализацию";
          personalizationToggleIconElement.innerHTML = iconOff;
        }
      }

      if (abTestsToggleBtnElement.getAttribute("listener") !== "true") {
        abTestsToggleBtnElement.setAttribute("listener", true);
        abTestsToggleBtnElement.addEventListener("click", () => {
          const status = abTestsToggleBtnElement.dataset.status;
          if (status === "disabled") return;

          const currentStatus = status === "on" ? true : false;
          if (currentStatus) {
            localStorage.removeItem(ABTestsStorageKey);
            abTestsToggleBtnElement.dataset.status = "off";
            abTestsToggleBtnElement.classList.remove("n-nav-btn-active");
            abTestsToggleTextElement.innerText = "Включить А/Б тесты";
            abTestsToggleIconElement.innerHTML = iconOn;
            localStorage.setItem("neuromarket-search-toggle-ab-tests", "false");
          } else {
            localStorage.removeItem(ABTestsStorageKey);
            abTestsToggleBtnElement.dataset.status = "on";
            abTestsToggleBtnElement.classList.add("n-nav-btn-active");
            abTestsToggleTextElement.innerText = "Отключить А/Б тесты";
            abTestsToggleIconElement.innerHTML = iconOff;
            localStorage.setItem("neuromarket-search-toggle-ab-tests", "true");
          }
          location.reload();
        });
      }

      if (personalizationToggleBtnElement.getAttribute("listener") !== "true") {
        personalizationToggleBtnElement.setAttribute("listener", true);
        personalizationToggleBtnElement.addEventListener("click", () => {
          const status = personalizationToggleBtnElement.dataset.status;
          if (status === "disabled") return;

          const currentStatus = status === "on" ? true : false;
          if (currentStatus) {
            localStorage.removeItem(vectorStorageKey);
            try {
              const userClusterData = JSON.parse(
                localStorage.getItem(userClusterStoragekey)
              );
              localStorage.setItem(
                userClusterStoragekey,
                JSON.stringify({ ...userClusterData, data: [] })
              );
            } catch (e) {
              console.log("User Cluster problem:", userClusterData);
            }
            personalizationToggleBtnElement.dataset.status = "off";
            personalizationToggleBtnElement.classList.remove(
              "n-nav-btn-active"
            );
            personalizationToggleTextElement.innerText =
              "Включить персонализацию";
            personalizationToggleIconElement.innerHTML = iconOn;
            localStorage.setItem(
              "neuromarket-search-toggle-personalization",
              "false"
            );
          } else {
            personalizationToggleBtnElement.dataset.status = "on";
            personalizationToggleBtnElement.classList.add("n-nav-btn-active");
            personalizationToggleTextElement.innerText =
              "Отключить персонализацию";
            personalizationToggleIconElement.innerHTML = iconOff;
            localStorage.setItem(
              "neuromarket-search-toggle-personalization",
              "true"
            );
          }
          location.reload();
        });
      }
    }

    async renderKeywordClusterDataView() {
      const keyword = this.searchData?.metadata?.name;
      let isLoading = true;

      const template = () => {
        const skeleton = `<div class="ns-skeleton" style="width:80px; height:15px; border-radius:4px;"></div>`;
        return `
    <div style="display: flex; flex-direction:column; gap: 4px; align-items: baseline;">
      <span>Кластер</span>
      <span class="ns-search-query-value">${isLoading
            ? skeleton
            : this.searchClusterData?.cluster_id || "Не найдено"
          }</span>
    </div>
    <div style="display: flex; flex-direction:column; gap: 4px; align-items: baseline;">
      <span>Частота за <u>месяц</u></span>
      <span class="ns-search-query-value">${isLoading
            ? skeleton
            : numberWithSpaces(this.searchClusterData?.max_views || "Нет данных")
          }</span>
    </div>`;
      };


      const templateKeywordFrequency = () => {
        const skeleton = `<div class="ns-skeleton" style="width:80px; height:15px; border-radius:4px;"></div>`;
        return `
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: baseline;">
      <span>Частота за <u>месяц</u></span>
      <span class="ns-search-query-value">
      ${isLoading
            ? skeleton
            : numberWithSpaces(this.searchClusterData?.wb_views || "Нет данных")
          }</span>
    </div>`;
      };

      if (this.shouldUpdateSearchKeyword()) {
        this.keywordClusterFrequencyViewElement.innerHTML = template();
        this.keywordFrequencyViewElement.innerHTML = templateKeywordFrequency();
        this.searchClusterData =
          (await this.getKeywordClusterData(keyword))?.[0] || {};
      }

      isLoading = false;
      this.keywordClusterFrequencyViewElement.innerHTML = template();
      this.keywordFrequencyViewElement.innerHTML = templateKeywordFrequency();
    }

    shouldUpdateSearchKeyword() {
      const keyword = this.searchData?.metadata?.name;
      return keyword !== this.lastSearchKeyword;
    }

    async renderSearchQueryData() {
      this.renderKeywordView();
      // this.renderKeywordFrequencyView();
      this.renderKeywordClusterDataView();
      this.renderSearchOptionsToggleView();
      this.renderPaginationView();
      this.calculateProductsTable();
      this.renderProductsTable();
    }

    renderSearchResultsWindow() {
      return `
      <div class="ns-main-window sentry-block" id="ns-hidden-window">
        <button type="button" id="ns-expand-btn" class="ns-expand-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="ns-arrow-btn" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 18.586V3h2v15.586l6.293-6.293 1.414 1.414L12 22.414l-8.707-8.707 1.414-1.414L11 18.586Z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <div style="display: flex; position:relative;">
          <img style="height:24px; margin: 0px 0 0 0; padding-right: 2px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
          <img style="height:16px; margin: 2px 0 0 0;" src="https://cdn.neuromarket.online/images/logo.png" />
            <span style="margin-left: 4px;"> — Анализ поисковой выдачи</span>
            <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #2563ebAA; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #2563ebeb; margin-top: 2px; height:20px;">v${VERSION}</span>
        </div>
      </div>

      <div class="ns-main-window sentry-block" id="ns-main-window">
    <button type="button" id="ns-collapse-btn" class="ns-expand-button ns-collapse-button">
      <svg xmlns="http://www.w3.org/2000/svg" class="ns-arrow-btn" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11 18.586V3h2v15.586l6.293-6.293 1.414 1.414L12 22.414l-8.707-8.707 1.414-1.414L11 18.586Z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <div style="display: flex; position:relative;">
      <img style="height:24px; margin: 0px 0 0 0; padding-right: 2px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
      <img style="height:16px; margin: 2px 0 0 0;" src="https://cdn.neuromarket.online/images/logo.png" />
        <span style="margin-left: 4px;"> — Анализ поисковой выдачи</span>
        <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #2563ebAA; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #2563ebeb; margin-top: 2px; height:20px;">v${VERSION}</span>
    </div>
    
    <div class="n-nav-buttons">
      <a class="n-nav-tg-btn" target="_blank" href="https://t.me/neuromarket_chat">Телеграм-чат</a>
      <a class="n-nav-btn" target="_blank" href="https://docs.neuromarket.online/extension">Инструкция</a>
      <a class="n-nav-btn" target="_blank" href="https://docs.neuromarket.online/extension/updates/search">Обновления</a>
      
      <div style="display: none; position: relative; margin-left:20px;" id="n-wow-effect">
        <a class="n-nav-btn" id="n-ad-btn" style="display:flex; padding:0; padding-inline: 8px; gap:4px; display: flex;gap: 4px; border-radius: 6px;" target="_blank" href="https://wow-effect.studio/neyromarket?utm_source=neuromarket&utm_campaign=cmp">
        <img style="height: 18px; box-sizing: content-box; opacity:0.9;" src="https://cdn.neuromarket.online/ad/wow.svg"/>
        <span>Прокачать CTR</span>
        </a>
        <div style="position: absolute; box-sizing: border-box; gap: 2px; width: 540px; z-index: 100; top: 44px; background: #253144;display: none;border: 1px solid #ffffff1a;border-radius: 6px;" id="n-ad-description">
          <div style="height:255px; width:220px; overflow:hidden; border-top-left-radius:6px; border-bottom-left-radius:6px;">
            <video
              style="height:100%; aspect-ratio:9/16; border-top-left-radius: 5px; border-bottom-left-radius: 5px;"
              autoplay loop muted>
              <source
                src=""
                type="video/mp4" />
              <source
              src=""
                type="video/webm" />
            </video>
          </div>
          <div style="padding:8px; display:flex; flex-direction: column; justify-content: space-between;">
           <div style="display:flex; gap:8px; font-size: 1.0em; align-items:center;">
            <img style="height: 22px;box-sizing: content-box; padding: 2px; border-radius: 3px;" src="https://cdn.neuromarket.online/ad/wow.svg"/>
            <span><b>СОЗДАЕМ ОХР🔥НИТЕЛЬНЫЙ КОНТЕНТ</b></span>
          </div>
           <div style="display:flex; flex-direction:column;">
            <span style="margin-top:4px;">Сделаем контент для вашего товара с <b>зашкаливающим CTR</b> за <span style="color:#e74646;"><s>8800₽</s></span> <i><b>6500₽</b></i></span>
            <span>по промокоду <span style="font-weight:bold; font-size:0.8em">«<span style="color:#7375ff">НЕЙРОМАРКЕТ</span>»</span></span>
           </div>
           <div style="display:flex; flex-direction: column; gap: 8px; margin-top:8px;">
            <div style="display:flex; gap: 4px; align-items:center;">
              <svg style="width: 20px; min-width:20px; box-sizing: content-box; padding: 6px;background: #47576d;border-radius: 8px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span>Вау эффект фиксируем в договоре!</span>
            </div>
            <div style="display:flex; gap: 4px; align-items:center;">
            <svg style="width: 20px; min-width:20px; box-sizing: content-box; padding: 6px;background: #47576d;border-radius: 8px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
              <span style="line-height: 1.1em; font-size: 0.95em;">Не озадачиваем брифами — персональный менеджер подготовит ТЗ за вас.</span>
            </div>
           </div>
           <div style="display: flex; gap: 8px; width: 100%;">
            <a class="n-nav-btn n-nav-btn-wow" style="margin-top:10px; flex:1;" href="https://wow-effect.studio/neyromarket?utm_source=neuromarket&utm_campaign=cmp" target="_blank">Перейти к Портфолио</a>
            <a class="n-nav-btn n-nav-btn-wow-tg" style="margin-top:10px; width: 130px;" href="https://t.me/wow_effect_studio?utm_source=neuromarket&utm_campaign=cmp" target="_blank">Наш канал в ТГ</a>
           </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-top:12px; justify-content:space-between;">
      <div class="ns-search-query-data" id="ns-search-query-data">
        <div style="display:flex; gap:12px; padding:12px; border: 1px solid #ffffff1a; background-color: #0f172a;">
          <div id="ns-keyword-view" style="display:flex; gap:12px;"></div>
          <div id="ns-keyword-frequency-view" style="display:flex; gap:12px;"></div>
        </div>
        <div style="display:flex; gap:12px; padding:12px; border: 1px solid #ffffff1a; background-color: #0f172a;">
          <div id="ns-keyword-cluster-frequency-view" style="display:flex; gap:12px;"></div>
        </div>
      </div>
      <div>
        <div style="display:flex; gap:12px; padding:0px;">
          <div id="ns-search-options-toggle-view" style="display:flex; gap:12px;"></div>
        </div>
      </div>
    </div>
    <div class="n-help-message" id="n-help-message">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="height: 20px; color: #c18c0e;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <span>Авторизуйтесь на сайте <a href="https://seller.wildberries.ru/" target="_blank">ВБ.Партнёры</a>, чтобы получить дополнительные метрики по вашим товарам в поисковой выдаче.</span>
    </div>
    <div style="display: flex; margin-top:12px; gap: 12px;">
      <div style="display: flex; flex-direction:column; width: 100%; flex:1; padding: 12px; gap: 12px; border: 1px solid #ffffff1a; background-color: #0f172a;">
      
      <div style="display:flex; justify-content:space-between; flex-flow: wrap-reverse; gap: 12px;">
        <div class="ns-product-dots-ratio-data" id="ns-product-dots-ratio-data"></div>
        <div class="ns-search-pagination" id="ns-search-pagination"></div>
      </div> 
      <div style="display: flex; gap:12px;">
        <div class="ns-product-dots-chart" id="ns-product-dots-chart">${[
          ...Array(
            `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-empty"></div>`
          ),
        ].join("")}</div>
          <div class="" style="display:flex; flex-direction: column; gap:12px; flex:1; max-width: calc(100% - 73px)">
            <div class="ns-products-table" id="ns-products-table">
              <div class="n-kw-wrap" id="n-products-table" style="height: 337px; overflow:scroll; resize:vertical">
                <div class="n-kw-list" style="display:table; border-left:none; border-top:none; height: initial">
                  <div class="n-title" style="justify-content: flex-start; z-index: 1; border-left:none; border-right:none; position:sticky; top:0;padding-left:0 !important; padding-right: 12px !important;">
                    <div style="display:flex; gap:6px; position: sticky; left:0;">
                      <div style="min-width: 73px; width:85px; box-sizing: content-box; display: flex;background: #1e293b; height: 40px; border-left: 1px solid #ffffff1a; border-right: 2px solid #ffffff1a; align-items: center;">
                        <button class="n-tools-button" style="height:40px;" id="n-export-days-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"></path>
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"></path>
                          </svg>
                          Экспорт
                        </button>
                      </div>
                    </div>
                    <div class="n-title-flex">
                      <div class="n-title-flex" style="display:flex; background: #1e293b; position: sticky; left: 88px; border-right:1px solid #334155;">
                        <span style="width:651px; text-align:center;">Товар</span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="width:492px; text-align:center;">Реклама и Позиции</span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="width:343px; text-align:center;">Логистика</span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="width:264px; text-align:center;">Поставщик</span>
                      </div>
                    </div>
                  </div>
                  <div class="n-title" style="justify-content: flex-start; z-index: 1; border-left:none; border-right:none; position:sticky; top:0;padding-left:0 !important; padding-right: 12px !important;">
                    <div style="display:flex; gap:6px; position: sticky; left:0;z-index:10;">
                      <span style="min-width: 42px; width: 42px; box-sizing: content-box; display: flex;background: #1e293b; height: 40px; border-left: 1px solid #ffffff1a; border-right: 1px solid #ffffff1a;padding-left: 12px; align-items: center;">Фото</span>
                    </div>
                    <div class="n-title-flex">
                      <div class="n-title-flex" style="display:flex; z-index:10; background: #1e293b; position: sticky; left: 56px; border-right:1px solid #334155;">
                        <span style="position:relative; width:70px; text-align:center;" data-sort-by="id">Артикул</span>
                        <span style="position:relative; width:80px; text-align:center;" data-sort-by="subjectText">Категория</span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="price">Цена <span class="n-wtf" data-tip="Цена указана после Скидки Поставщика и СПП. Без скидки WB Кошелька">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="sale">Скидка</span>
                        <span style="position:relative; width:65px; text-align:center;" data-sort-by="premiumSale">Клуб %<span class="n-wtf" data-tip="Скидка поставщика для подписчиков WB Клуба">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="reviewRating">Рейтинг</span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="feedbacks">Отзывы</span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="isNew">Новый</span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="hasPromo">Акция</span>
                        <span style="position:relative; width:60px; text-align:center;" data-sort-by="quantity">Остатки</span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="position:relative; width:60px; text-align:center;" data-sort-by="position">Позиция</span></span>
                        <span style="position:relative; width:60px; text-align:center;" data-sort-by="adTypeToShow">Реклама</span>
                        <span style="position:relative; width:70px; text-align:center;" data-sort-by="boostedFrom">Позиция До</span>
                        <span style="position:relative; width:60px; text-align:center;" data-sort-by="positionDelta">Дельта <span class="n-wtf" data-tip="Разница между органической позицией и фактической после буста">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="cpm">CPM <span class="n-wtf" data-tip="Рекламная ставка за 1000 показов">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="bpc">BPC <span class="n-wtf" data-tip="Стоимость буста одной позиции">?</span></span>
                        <span style="position:relative; width:70px; text-align:center;" data-sort-by="advertId">ID РК <span class="n-wtf" data-tip="Идентификатор Рекламной Кампании">?</span></span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="position:relative; width:70px; text-align:center;" data-sort-by="fastestStore">Склад <span class="n-wtf" data-tip="Приоритетный склад">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="time1">Сборка <span class="n-wtf" data-tip="Количество часов необходимое на сборку товара с момента заказа товара">?</span></span>
                        <span style="position:relative; width:50px; text-align:center;" data-sort-by="time2">Отгрузка <span class="n-wtf" data-tip="Количество часов необходимое на перевозку товара до ПВЗ или Курьером с момента его сборки">?</span></span>
                        <span style="position:relative; width:55px; text-align:center;" data-sort-by="deliveryHours">Доставка <span class="n-wtf" data-tip="Суммарное время с момента заказа товара и до поступления в ПВЗ">?</span></span>
                        <span style="position:relative; width:70px; text-align:center;" data-sort-by="dist">Расстояние <span class="n-wtf" data-tip="Расстояние от склада до ПВЗ">?</span></span>
                      </div>
                      <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
                        <span style="position:relative; width:80px; text-align:center;" data-sort-by="brand">Бренд</span></span>
                        <span style="position:relative; width:80px; text-align:center;" data-sort-by="supplier">Поставщик</span>
                        <span style="position:relative; width:80px; text-align:center;" data-sort-by="supplierRating">Рейтинг <span class="n-wtf" data-tip="Рейтинг Поставщика">?</span></span>
                      </div>
                    </div>
                  </div>
                  <div style="display:flex; flex-direction: column;" id="n-products-list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div style="display: flex; margin-top:12px; gap: 12px;">
        <div style="display:flex; flex-direction: column; gap: 12px;">
          <div style="position:relative; display: flex; flex-direction:column; gap: 12px; border-radius:8px; border: 1px solid #ffffff1a; background-color: #0f172a;">
            <div style="position: relative; display: flex; gap: 8px; z-index: 10;" id="ns-groupby-price">
              <div style="color:#707f95; font-size: 0.9em; display:flex; padding:12px; flex-direction: column; height: 98px">
                <span>Разбивка по ценам</span>
                <div style="margin-top: 12px; display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Макс.</span>
                  <span style="font-size: 1.3em; color: #cbd5e1; font-weight: 700" id="ns-groupby-price-max"></span>
                </div>
                <div style="display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Мин.</span>
                  <span style="font-size: 1.3em; color:#cbd5e1; font-weight: 700" id="ns-groupby-price-min"></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; width: 240px; height: 98px" id="ns-groupby-price-chart"></div>
              <div style="position:absolute; top: 12px; right: 12px; display:flex; gap: 4px; z-index: 20; font-size: 0.9em;" id="ns-groupby-price-range-buttons">
              </div>
            </div>
          </div>
          <div style="position:relative; display: flex; flex-direction:column; gap: 12px; border-radius:8px; border: 1px solid #ffffff1a; background-color: #0f172a;">
            <div style="position: relative; display: flex; gap: 8px; z-index: 10;" id="ns-warehouses-per-position">
              <div style="color:#707f95; font-size: 0.9em; display:flex; padding:12px; flex-direction: column; height: 98px">
                <span>Склады по позициям</span>
                <div style="margin-top: 12px; display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Макс. складов</span>
                  <span style="font-size: 1.3em; color: #cbd5e1; font-weight: 700" id="ns-warehouses-per-position-max"></span>
                </div>
                <div style="display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Мин. складов</span>
                  <span style="font-size: 1.3em; color:#cbd5e1; font-weight: 700" id="ns-warehouses-per-position-min"></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; width: 240px; height: 98px" id="ns-warehouses-per-position-chart"></div>
            </div>
          </div>
          <div style="position:relative; display: flex; flex-direction:column; gap: 12px; border-radius:8px; border: 1px solid #ffffff1a; background-color: #0f172a;">
            <div style="position: relative; display: flex; gap: 8px; z-index: 10;" id="ns-feedbacks-per-position">
              <div style="color:#707f95; font-size: 0.9em; display:flex; padding:12px; flex-direction: column; height: 98px">
                <span>Отзывы по позициям</span>
                <div style="margin-top: 12px; display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Макс.</span>
                  <span style="font-size: 1.3em; color: #cbd5e1; font-weight: 700" id="ns-feedbacks-per-position-max"></span>
                </div>
                <div style="display:flex; gap: 4px; align-items: baseline;">
                  <span style="font-size: 0.9em;">Мин.</span>
                  <span style="font-size: 1.3em; color:#cbd5e1; font-weight: 700" id="ns-feedbacks-per-position-min"></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; width: 240px; height: 98px" id="ns-feedbacks-per-position-chart"></div>
              <div style="position:absolute; top: 12px; right: 12px; display:flex; gap: 4px; z-index: 20; font-size: 0.9em;">
                <div class="n-nav-btn" style="height:20px; border-radius: 3px; background: #0f172aAA; color: #525d6f; height: 20px;cursor: default;">
                  <span>Логарифмический</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="position:relative; overflow:hidden; display: flex; flex-direction:column; gap: 12px; border-radius:8px; border: 1px solid #ffffff1a; background-color: #0f172a;">
          <div style="display: flex; flex-direction:column; gap: 8px; z-index: 10;" id="ns-priority-subjects"></div>
        </div>
        <div style="position:relative; overflow:hidden; display: flex; flex-direction:column;flex: 1; gap: 12px; border-radius:8px; border: 1px solid #ffffff1a; background-color: #0f172a;">
          <div class="n-main-chart-bg-glow-green"></div>
          <div class="n-main-chart-bg-glow-red"></div>
          <div class="n-main-chart-bg-glow-blue"></div>
          <div style="display: flex; flex-direction:column; gap: 8px; z-index: 10; height: 322px; width:100%;" id="ns-parallel-comparison-chart"></div>
        </div>
      </div>
    </div>`;
    }

    async handleFetchResponse(response, resource) {
      if (
        response.url.includes("search") &&
        response.url.includes("resultset=catalog")
      ) {
        return await this.handleSearchResponse(response, resource);
      }

      if (response.url.includes("/subject-base.json")) {
        return await this.handleSubjectResponse(response, resource);
      }
    }

    async requestProductsDetails(products) {
      const productNms = products.map((p) => p.id).join(";");
      const { dest, spp } = this.#userXinfo;
      const url = `https://www.wildberries.ru/__internal/card/cards/v4/detail?appType=${CURRENT_APPTYPE}&curr=rub&dest=${dest}&spp=${spp}&nm=${productNms}`;
      const headers = {
        deviceid: WB_DEVICEID,
      }
      if (WB_TOKEN) {
        headers.authorization = `Bearer ${WB_TOKEN}`;
      }
      const request = await fetch(url, {
        headers: headers,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const response = await request.json();
      return response.products;
    }

    async requestProductsBuyouts(products) {
      const productNms = products.map((p) => p.id).join(",");
      const url = `https://product-order-qnt.wildberries.ru/v2/by-nm/?nm=${productNms}`;
      const request = await fetch(url, {
        method: "GET",
        mode: "cors",
      });
      const response = await request.json();
      return response;
    }

    async handleSearchResponse(response, resource) {
      const res = await response.json();
      if (res?.data?.products?.length > 0) {
        this.detailData = await this.requestProductsDetails(res.data.products);
        // this.buyoutData = await this.requestProductsBuyouts(res.data.products);
      }
      if (res?.products?.length > 0) {
        this.detailData = await this.requestProductsDetails(res.products);
        // this.buyoutData = await this.requestProductsBuyouts(res.data.products);
      }
      this.searchData = res;
      this.searchResource = resource;
    }

    async getSubjects() {
      const request = await fetch(
        "https://static-basket-01.wbbasket.ru/vol0/data/subject-base.json"
      );
    }

    async handleSubjectResponse(response, resource) {
      const res = await response.json();
      this.subjects = res;
    }

    //BACKEND REQUEST

    async getKeywordClusterData(_keyword) {
      const keyword = _keyword.toLowerCase();
      const request = await fetch(
        "https://ext.neuromarket.online/clusterize-v4",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: [keyword],
          }),
          method: "POST",
        }
      );
      const response = await request.json();
      return response;
    }

    // CHROME REQUESTS

    upgradeSupplierCookie() {
      fetch("https://seller.wildberries.ru/upgrade-cookie-authv3", {
        headers: {
          authorizev3:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTcwMDgwNDQsInZlcnNpb24iOjIsInVzZXIiOiI0Nzk4MTAxNCIsInNoYXJkX2tleSI6IjEiLCJjbGllbnRfaWQiOiJzZWxsZXItcG9ydGFsIiwic2Vzc2lvbl9pZCI6IjdjNGUzZWYyOTY2ZDQ0Y2Q4N2NkZmZkZjY3MjcwY2NjIiwidXNlcl9yZWdpc3RyYXRpb25fZHQiOjE2NTYwMDkxMDksInZhbGlkYXRpb25fa2V5IjoiN2EwNjEzMjQwNTk3NmZjZjgwZTQzYTdhYmFhNDI5MWY3MTMyNTZiYWQ0MTI3OTYyMGI0MDUyYjk3MDhhZDFmYiIsInBob25lIjoiSkNXTkg0OGNYVGpXbUY3UmZhVmtqZz09In0.P8V6n5M0njgXLIigJeHnn_CUcneK-qEf2hi12P0woRbc6QeejXCKse4GXhN0W9FvQWbFmqCdClMXU0VhUzUTephJn6RH0Ggi03BtEWEi8rrHnfSdTseAsODAYPL2DSUqPS9miTExjXWN8xgljJnLMMiL8IcTJI-MdSznG-GyABvuRbPIbLhQ91Evsg_5752PKAbjx-f2BI_TlzOy7rn_mxXiXuvTtuijI6Hir9bvP8kSV5vXlgDqLCbCDYSQwAyAzAaCs7O-5HHUcLA1mrbJrhjTSAUKJJniIK6kG-HgFOiLepzNQIAKwTPVoLOM8J2sXtFjLkIvplSDVeNMVS8NBA",
          "content-type": "application/json",
        },
        referrer: "https://seller.wildberries.ru/popular-search-requests",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "POST",
        mode: "cors",
        credentials: "include",
      });
    }

    getKeywordFrequency(_keyword, period = "month") {
      return new Promise((resolve, reject) => {
        if (_keyword === "") reject();
        const keyword = _keyword.toLowerCase();

        setTimeout(() => resolve(false), 5000);

        const onResponse = (response) => {
          if (response?.data?.list?.length) {
            const keywordsList = response?.data?.list;
            const matchedKeyword = keywordsList.find(
              (item) => item.text.trim() === keyword
            );
            if (matchedKeyword) {
              resolve(matchedKeyword.requestCount);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        };

        const url = `https://seller-weekly-report.wildberries.ru/ns/trending-searches/suppliers-portal-analytics/api?itemsPerPage=10&offset=0&period=${period}&query=${encodeURIComponent(
          keyword
        )}&sort=desc`;
        chrome.runtime.sendMessage(
          NEUROMARKET_CHROME_ID,
          {
            type: "fetchJson",
            url,
            options: {
              headers: {
                "content-type": "application/json",
              },
              method: "GET",
              mode: "cors",
              credentials: "include",
            },
          },
          onResponse
        );
      });
    }

    getSuppliers() {
      return new Promise((resolve, reject) => {
        const supplierExternalId = getCookie("x-supplier-id-external");
        const onResponse = (response) => {
          const suppliers = response?.[0]?.result?.suppliers;
          if (suppliers && supplierExternalId) {
            this.supplierRawData = suppliers.find(
              (item) => item.id === supplierExternalId
            );
            this.supplierId = this.supplierRawData?.oldID || null;
            resolve(true);
          } else {
            resolve(false);
          }
        };

        const options = {
          headers: {
            accept: "application/json",
            "accept-language":
              "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "content-type": "application/json",
            "sec-ch-ua":
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
          },
          body: '[{"method":"getUserSuppliers","params":{},"id":"json-rpc_5","jsonrpc":"2.0"}]',
          method: "POST",
          mode: "cors",
          credentials: "include",
        };

        if (WB_AUTH_V3) {
          options.headers['AuthorizeV3'] = WB_AUTH_V3
        }

        const url =
          "https://seller.wildberries.ru/ns/suppliers/suppliers-portal-core/suppliers";
        chrome.runtime.sendMessage(
          NEUROMARKET_CHROME_ID,
          {
            type: "fetchJson",
            url,
            options,
          },
          onResponse
        );
      });
    }

    getAllSupplierProducts() {
      return new Promise((resolve, reject) => {
        const onResponse = (response) => {
          if (response?.data?.nomenclatures) {
            this.supplierAllProducts = response.data.nomenclatures;
            resolve(true);
          }
          resolve(false);
        };

        const url =
          "https://seller-content.wildberries.ru/ns/analytics-api/content-analytics/api/v2/filters/nms";
        const data = {
          subjects: [],
          brands: [],
          tags: [],
          vendorCodePrefix: "",
        };

        chrome.runtime.sendMessage(
          NEUROMARKET_CHROME_ID,
          {
            type: "fetchJson",
            url,
            options: {
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
              method: "POST",
              mode: "cors",
              credentials: "include",
            },
          },
          onResponse
        );
      });
    }
  }

  if (CLIENT_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
    (async () => {


      window.Engine = new NeuromarketClientEngine();

      const { fetch: originalFetch } = window;
      window.fetch = async function (...args) {
        let [resource, config] = args;
        try {
          if (
            localStorage.getItem("neuromarket-search-toggle-ab-tests") ===
            "false"
          ) {
            const ABTestsStorageKey = "splitInfoV2";
            const splitInfoData =
              JSON?.parse(localStorage.getItem(ABTestsStorageKey)) || {};
            if (splitInfoData?.splitInfo?.search) {
              splitInfoData.splitInfo.search = [];
              localStorage.setItem(
                ABTestsStorageKey,
                JSON.stringify(splitInfoData)
              );
            }
          }
          if (resource instanceof URL) {
            resource = resource?.href;
          }

          if (resource instanceof Request) {
            resource = resource?.url;
          }
          if (
            resource?.includes("user-vector-info.wb.ru/api/v1/vector") ||
            resource?.includes(
              "personal-clusters.wildberries.ru/api/v1/clusters"
            )
          ) {
            if (
              localStorage.getItem(
                "neuromarket-search-toggle-personalization"
              ) === "false"
            ) {
              return Promise.reject();
            } else {
              return response;
            }
          }

          let response;
          if (resource?.includes("appType=1")) {
            let newResource = resource
              .replace("appType=1", `appType=${CURRENT_APPTYPE}`)
              .replace("/female/v", "/common/v")
              .replace("/male/v", "/common/v");

            if (
              localStorage.getItem(
                "neuromarket-search-toggle-personalization"
              ) === "false"
            ) {
              config.headers.delete('x-userdata');
            }
            response = await originalFetch(newResource, config);
          } else {
            response = await originalFetch(resource, config);
          }

          if (window.location.href.includes("/catalog/0/search.aspx")) {
            const clonedResponse = response.clone();
            Engine.handleFetchResponse(clonedResponse, resource);
          }

          return response;
        } catch (e) {
          console.log(e);
        }
      };

      await Engine.requestSubjects();
    })();
  }

  function isLocalStorageAvailable() {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function numberWithSpaces(x) {
    if (x === undefined) return;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  const BASKETS = [
    [0, 143],
    [144, 287],
    [288, 431],
    [432, 719],
    [720, 1007],
    [1008, 1061],
    [1062, 1115],
    [1116, 1169],
    [1170, 1313],
    [1314, 1601],
    [1602, 1655],
    [1656, 1919],
    [1920, 2045],
    [2046, 2189],
    [2190, 2405],
    [2406, 2621],
    [2622, 2837],
    [2838, 3053],
    [3054, 3269],
    [3270, 3485],
    [3486, 3701],
    [3702, 3917],
    [3918, 4133],
    [4134, 4349],
    [4350, 4565],
    [4566, 4877],
    [4878, 5189],
    [5190, 5501],
    [5502, 5813],
    [5814, 6125],
    [6126, 6437],
    [6438, 6749],
    [6750, 7061],
    [7062, 7373],
    [7374, 7685],
    [7686, 7997],
    [7998, 8309],
  ];

  function imageURL(productId, order = 1) {
    const vol = parseInt(productId / 100000, 10);
    const part = parseInt(productId / 1000, 10);
    const basket = getBasketNumber(productId);
    const basketWithZero = basket < 10 ? `0${basket}` : basket;
    const URL = `https://basket-${basketWithZero}.wbbasket.ru/vol${vol}/part${part}/${productId}/images/c516x688/${order}.webp`;

    return URL;
  }

  function getBasketNumber(productId) {
    const vol = parseInt(productId / 100000, 10);
    const basket = BASKETS.reduce((accumulator, current, index) => {
      if (vol >= current[0] && vol <= current[1]) {
        return index + 1;
      }
      return accumulator;
    }, 1);
    return basket;
  }
  var FBS = "FBS";
  var WAREHOUSES = {
    0: FBS,
    507: "Коледино",
    686: "Новосибирск",
    1193: "Хабаровск",
    1733: "Екатеринбург",
    2737: "Уткина Заводь",
    117442: "Калуга",
    117501: "Подольск",
    117866: "Тамбов",
    117986: "Казань",
    120762: "Электросталь",
    121709: "Электросталь",
    130744: "Краснодар",
    159402: "Шушары",
    161812: "Санкт-Петербург",
    172430: "Барнаул",
    204615: "Томск",
    204939: "Астана",
    205104: "Ульяновск",
    205205: "Киров",
    205228: "Белая дача",
    206236: "Белые Столбы",
    206348: "Алексин",
    206708: "Новокузнецк",
    206844: "Калининград",
    206968: "Новосёлки",
    208277: "Невинномысск",
    208941: "Домодедово",
    209513: "Домодедово",
    210001: "Новосёлки-2",
    210515: "Вёшки",
    208768: FBS + " Абакан",
    209649: FBS + " Алексин",
    208769: FBS + " Алматы",
    212038: FBS + " Алматы-2",
    209902: FBS + " Артём",
    214110: FBS + " Архангельск",
    122495: FBS + " Астана",
    204492: FBS + " Астрахань",
    204493: FBS + " Барнаул",
    206239: FBS + " Белая Дача (Москва)",
    213892: FBS + " Белгород",
    214112: FBS + " Белогорск",
    209112: FBS + " Белые Столбы",
    208814: FBS + " Бишкек",
    204494: FBS + " Брянск",
    204495: FBS + " Владикавказ",
    117392: FBS + " Владимир",
    152588: FBS + " Волгоград",
    204496: FBS + " Вологда",
    211895: FBS + " Воронеж",
    209111: FBS + " Гольяново (Москва)",
    208771: FBS + " Гомель (Беларусь)",
    210967: FBS + " Домодедово",
    208815: FBS + " Екатеринбург",
    211790: FBS + " Екатеринбург-2",
    208816: FBS + " Ереван",
    208772: FBS + " Иваново",
    172073: FBS + " Ижевск",
    131643: FBS + " Иркутск",
    208817: FBS + " Казань",
    208761: FBS + " Калининград",
    144046: FBS + " Калуга",
    208773: FBS + " Киров",
    119261: FBS + " Коледино",
    209109: FBS + " Комсомольский (Москва)",
    208818: FBS + " Краснодар",
    118365: FBS + " Красноярск",
    208774: FBS + " Крыловская (Краснодар)",
    172075: FBS + " Курск",
    209108: FBS + " Курьяновская (Москва)",
    208776: FBS + " Липецк",
    168826: FBS + " Лобня (Москва)",
    121700: FBS + " Минск",
    211672: FBS + " Минск-2",
    212032: FBS + " Вешки",
    211730: FBS + " Внуково",
    117673: FBS + " Москва",
    122259: FBS + " Москва",
    208777: FBS + " Мурманск",
    208778: FBS + " Набережные Челны",
    209107: FBS + " Нахабино (Москва)",
    209601: FBS + " Невинномысск",
    118535: FBS + " Нижний Новгород",
    213651: FBS + " Нижний Тагил",
    208789: FBS + " Новокузнецк",
    117419: FBS + " Новосибирск",
    209591: FBS + " Омск",
    208780: FBS + " Оренбург",
    157848: FBS + " Пенза",
    209592: FBS + " Пермь",
    208781: FBS + " Печатники",
    214111: FBS + " Псков",
    208782: FBS + " Пушкино (Москва)",
    204497: FBS + " Пятигорск",
    118019: FBS + " Ростов-на-Дону",
    152594: FBS + " Рязань",
    146666: FBS + " Самара",
    132043: FBS + " Санкт-Петербург",
    117414: FBS + " Санкт-Петербург (Уткина Заводь)",
    208819: FBS + " Санкт-Петербург (Шушары)",
    158929: FBS + " Саратов",
    204498: FBS + " Серов",
    144154: FBS + " Симферополь",
    208783: FBS + " Смоленск",
    204212: FBS + " Солнцево",
    158448: FBS + " Ставрополь",
    208784: FBS + " Сургут",
    115651: FBS + " Тамбов",
    152610: FBS + " Тверь",
    208785: FBS + " Темрюк (Краснодарский край)",
    208786: FBS + " Томск",
    146725: FBS + " Тюмень",
    209950: FBS + " Ульяновск",
    152700: FBS + " Уфа",
    208820: FBS + " Хабаровск",
    210815: FBS + " Хоргос",
    204499: FBS + " Чебоксары",
    152611: FBS + " Челябинск",
    209113: FBS + " Черная грязь (Москва)",
    209106: FBS + " Чертановский (Москва)",
    208787: FBS + " Чита",
    209510: FBS + " Электросталь",
    209110: FBS + " Южные ворота (Москва)",
    152612: FBS + " Ярославль",
  };

  var precise = (function () {
    if (Math.trunc === undefined) {
      Math.trunc = function (v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
    }
    var powers = [
      1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
    ];
    var intpow10 = function (power) {
      if (power < 0 || power > 22) {
        return Math.pow(10, power);
      }
      return powers[power];
    };
    var toPrecision = function (num, significantDigits) {
      if (!num || !Number.isFinite(num)) return num;
      var shift = significantDigits - 1 - Math.floor(Math.log10(Math.abs(num)));
      var decimalPlaces = 0;
      for (var p = 1; num != Math.round(num * p) / p; p *= 10) decimalPlaces++;
      if (shift >= decimalPlaces) return num;
      var scale = intpow10(Math.abs(shift));
      return shift > 0
        ? Math.round(num * scale) / scale
        : Math.round(num / scale) * scale;
    };
    var stripError = function (num) {
      if (Number.isInteger(num)) return num;
      return toPrecision(num, 15);
    };
    var decimalAdjust = function myself(type, num, decimalPlaces) {
      if (type === "round" && num < 0)
        return -myself(type, -num, decimalPlaces);
      var p = intpow10(decimalPlaces || 0);
      var n = stripError(num * p);
      return Math[type](n) / p;
    };
    return {
      round: function (num, decimalPlaces) {
        return decimalAdjust("round", num, decimalPlaces);
      },
      ceil: function (num, decimalPlaces) {
        return decimalAdjust("ceil", num, decimalPlaces);
      },
      floor: function (num, decimalPlaces) {
        return decimalAdjust("floor", num, decimalPlaces);
      },
      trunc: function (num, decimalPlaces) {
        return decimalAdjust("trunc", num, decimalPlaces);
      },
      toFixed: function (num, decimalPlaces) {
        return decimalAdjust("round", num, decimalPlaces).toFixed(
          decimalPlaces
        );
      },
    };
  })();

  function injectStyle(src) {
    return new Promise(function (resolve, reject) {
      let link = document.createElement("link");
      link.href = src;
      link.rel = "stylesheet";

      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`Style load error for ${src}`));

      document.head.append(link);
    });
  }

  function isLocalStorageAvailable() {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
})();
