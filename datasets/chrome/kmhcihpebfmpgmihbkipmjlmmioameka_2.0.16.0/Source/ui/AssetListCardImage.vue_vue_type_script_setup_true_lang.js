import { v as isVerified, I as ITokenRegistrySource, w as loadAssetMetadata, o as MediaSize, p as getAssetCDNImage } from './useAppAccountBalances.js';
import { p as pow, d as divide, e as bigToNum, m as multiply } from './bigmath.js';
import { D as computed, G as watch, d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, e as ref, m as createElementBlock, t as createCommentVNode, o as openBlock, V as normalizeClass, p as createBaseVNode, c as createBlock, B as toDisplayString, u as unref, z as resolveComponent, F as Fragment, y as withCtx, n as createVNode, P as networkId } from './index.js';
import { u as useGuard } from './useGuards.js';
import { n as noLogo, c as cardanoLogo } from './image.js';
import { u as useModalImage } from './useModalImage.js';
import { I as IconLinkSquare01 } from './IconLinkSquare01.js';

const useAssetInfos = (assetDetails, isCollection) => {
  const assetInfo = computed(() => assetDetails.value?.ai ?? null);
  const assetMeta = computed(() => assetDetails.value?.am ?? null);
  const assetTokenRegistry = computed(() => assetInfo.value?.tr ?? null);
  const hasAssetInfo = computed(() => !!assetInfo.value);
  const hasAssetMeta = computed(() => {
    if (!assetMeta.value) {
      return false;
    }
    if (assetMeta.value.hasOwnProperty("meta68")) {
      return true;
    }
    if (assetMeta.value.hasOwnProperty("meta721")) {
      return true;
    }
    if (assetMeta.value.hasOwnProperty("meta1155")) {
      return true;
    }
    if ((assetMeta.value.list?.length ?? 0) > 0) {
      return true;
    }
    return false;
  });
  const showAssetMeta = computed(() => {
    if (!assetMeta.value) {
      return false;
    }
    if (assetMeta.value.hasOwnProperty("meta68")) {
      return true;
    }
    if (assetMeta.value.hasOwnProperty("meta721")) {
      return true;
    }
    if (assetMeta.value.hasOwnProperty("meta1155")) {
      return true;
    }
    return false;
  });
  const hasAssetTokenRegistry = computed(() => {
    if (!assetTokenRegistry.value) {
      return false;
    }
    return Object.keys(assetTokenRegistry.value).length > 0;
  });
  const isADA = computed(() => {
    if (!assetDetails.value) {
      return false;
    }
    return assetDetails.value.p.length === 0 || assetDetails.value.p === ".";
  });
  const isNFT = computed(() => {
    if (!assetInfo.value) {
      return false;
    }
    return assetInfo.value.ts === "1";
  });
  const onlyHasOneToken = computed(() => {
    if (!assetInfo.value) {
      return false;
    }
    return (assetDetails.value?.t.q ?? "0") === "1";
  });
  const isToken = computed(() => {
    if (!assetInfo.value) {
      return false;
    }
    return assetInfo.value.ts !== "1";
  });
  const isVerifiedAsset = computed(() => {
    if (!assetDetails.value) {
      return false;
    }
    return isVerified(assetDetails.value.p, assetDetails.value.t.a);
  });
  const assetAmount = computed(() => {
    if (!assetDetails.value) {
      return "0";
    }
    return assetDetails.value.t.q;
  });
  const assetDecimals = computed(() => {
    if (!assetInfo.value) {
      return 0;
    }
    return assetTokenRegistry.value?.d ?? 0;
  });
  const assetAmountWithDecimals = computed(() => {
    const q = assetAmount.value;
    const d = assetDecimals.value;
    if (d === 0) {
      return q;
    }
    const _d = pow(10, d);
    return divide(q, _d);
  });
  const getAssetAmountWithoutDecimals = (amountWithDecimals) => {
    if (!amountWithDecimals) {
      return "0";
    }
    const d = assetDecimals.value;
    if (d === 0) {
      return amountWithDecimals.toString();
    }
    const _d = pow(10, d);
    return multiply(amountWithDecimals, _d);
  };
  const getAssetAmountWithDecimals = (amountWithoutDecimals) => {
    if (!amountWithoutDecimals) {
      return 0;
    }
    const d = assetDecimals.value;
    if (d === 0) {
      return bigToNum(amountWithoutDecimals.toString());
    }
    const _d = pow(10, d);
    return bigToNum(divide(amountWithoutDecimals, _d));
  };
  const hasAssetDecimals = computed(() => {
    if (!assetTokenRegistry.value) {
      return false;
    }
    return assetTokenRegistry.value.hasOwnProperty("d");
  });
  const assetName = computed(() => {
    if (!assetDetails.value) {
      return "";
    }
    return assetDetails.value.n;
  });
  const collectionName = computed(() => {
    if (!assetDetails.value) {
      return "";
    }
    return assetDetails.value.n.split("#")[0];
  });
  const tokenCardLabel = computed(() => {
    if (!assetDetails.value) {
      return "";
    }
    if (isADA.value) {
      return "ADA";
    }
    let name = "";
    if (assetTokenRegistry.value?.t) {
      name = "$" + assetTokenRegistry.value.t;
    } else if (isCollection.value) {
      name = collectionName.value;
    } else {
      name = assetName.value;
    }
    if (name.length > 22) {
      name = name.slice(0, 18) + "...";
    }
    return name;
  });
  const getTokenCardLabel = (length) => {
    if (!assetDetails.value) {
      return "";
    }
    if (isADA.value) {
      return "ADA";
    }
    let name = "";
    if (assetTokenRegistry.value?.t) {
      name = "$" + assetTokenRegistry.value.t;
    } else if (isCollection.value) {
      name = collectionName.value;
    } else {
      name = assetName.value;
    }
    if (name.length > length) {
      name = name.slice(0, length - 4) + "...";
    }
    return name;
  };
  const getTokenRegistrySource = ($t) => {
    if (!$t) {
      return "";
    }
    if (assetTokenRegistry.value?.s == null) {
      return $t("assets:registry.source.unknown");
    }
    switch (+assetTokenRegistry.value.s) {
      case ITokenRegistrySource.TokenRegistry:
        return $t("assets:registry.source.tr");
      case ITokenRegistrySource.CIP20:
        return $t("assets:registry.source.cip20");
      case ITokenRegistrySource.CIP68:
        return $t("assets:registry.source.cip68");
    }
    return ITokenRegistrySource[assetTokenRegistry.value.s] ?? $t("assets:registry.source.unknown");
  };
  watch(assetDetails, () => {
    if (assetDetails.value) {
      loadAssetMetadata(assetDetails.value);
    }
  }, { immediate: true });
  return {
    assetDetails,
    assetInfo,
    assetMeta,
    assetTokenRegistry,
    hasAssetInfo,
    hasAssetMeta,
    hasAssetTokenRegistry,
    showAssetMeta,
    isADA,
    isNFT,
    onlyHasOneToken,
    isToken,
    isVerifiedAsset,
    assetDecimals,
    assetAmount,
    assetAmountWithDecimals,
    getAssetAmountWithoutDecimals,
    getAssetAmountWithDecimals,
    hasAssetDecimals,
    assetName,
    collectionName,
    tokenCardLabel,
    getTokenCardLabel,
    getTokenRegistrySource
  };
};

const _imports_0 = "/images/eternl-guard-512.png";

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AssetListCardScamOverlay",
  props: /* @__PURE__ */ mergeModels({
    assetDetailsList: { type: Array, required: true },
    isSelectable: { type: Boolean, required: false, default: false },
    showClose: { type: Boolean, required: false, default: false },
    largeLogo: { type: Boolean, required: false, default: false }
  }, {
    "isScam": { type: Boolean, required: true, default: false },
    "isScamModifiers": {}
  }),
  emits: ["update:isScam"],
  setup(__props) {
    const isScam = useModel(__props, "isScam");
    const props = __props;
    const $t = useTranslation().t;
    const { spamAssets } = useGuard();
    const isVisible = ref(true);
    const _isScam = computed(() => {
      for (const assetDetails of props.assetDetailsList) {
        if (spamAssets.value.includes(assetDetails.f)) {
          return true;
        }
      }
      return false;
    });
    watch(_isScam, () => isScam.value = _isScam.value, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return isScam.value && isVisible.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["absolute inset-x-0 top-0 bottom-2 p-2 lg:p-4 flex flex-col et-jc-ic et-gap-md bg-black/70 backdrop-blur-modal", __props.isSelectable ? "pb-12!" : ""])
      }, [
        createBaseVNode("img", {
          class: normalizeClass(["w-full aspect-square", __props.largeLogo ? "max-w-42" : "max-w-32"]),
          src: _imports_0,
          alt: "Eternl Guard Logo"
        }, null, 2),
        createBaseVNode("div", {
          class: normalizeClass(["font-bold uppercase", __props.largeLogo ? "et-text-3xl" : "et-text-lg"])
        }, toDisplayString(unref($t)("common:scam")) + " !", 3),
        __props.showClose ? (openBlock(), createBlock(_component_Button, {
          key: 0,
          severity: "secondary",
          rounded: "",
          outlined: "",
          label: unref($t)("scam:showScamInfo"),
          onClick: _cache[0] || (_cache[0] = ($event) => isVisible.value = false)
        }, null, 8, ["label"])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = ["src", "alt"];
const _hoisted_2$1 = {
  key: 0,
  class: "py-1 px-5 sm:px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex et-jc-ic rounded-full font-semibold bg-bg-negative text-txt-negative"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AssetImage",
  props: {
    assetDetails: { type: Object, required: true },
    mediaSize: { type: Number, required: false, default: MediaSize.LOW },
    alt: { type: String, required: false, default: "Asset image" },
    canOpenModalImage: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const { isSpamAsset } = useGuard();
    const { openModalImage } = useModalImage();
    const isScam = computed(() => isSpamAsset(props.assetDetails));
    const imgSrc = ref(noLogo);
    const doOpenModalImage = () => {
      if (!props.canOpenModalImage) {
        return;
      }
      openModalImage(imgSrc);
    };
    const setImageSrc = async (force = false) => {
      const assetDetails = props.assetDetails;
      if (!assetDetails) {
        imgSrc.value = cardanoLogo;
        return;
      }
      const isAda = assetDetails.p.length === 0 || assetDetails.p === ".";
      if (isAda) {
        imgSrc.value = cardanoLogo;
        return;
      }
      if (networkId.value === "guild" || networkId.value === "sancho") {
        imgSrc.value = noLogo;
        return;
      }
      imgSrc.value = await getAssetCDNImage(assetDetails.f, props.mediaSize) ?? noLogo;
    };
    watch(() => props.assetDetails, () => setImageSrc(), { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("img", {
          loading: "lazy",
          class: normalizeClass(["w-full", (isScam.value ? "grayscale opacity-20" : "") + " " + (__props.canOpenModalImage ? "cursor-pointer" : "")]),
          src: imgSrc.value,
          alt: __props.alt,
          onClick: doOpenModalImage
        }, null, 10, _hoisted_1$1),
        isScam.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, "SCAM")) : createCommentVNode("", true),
        __props.canOpenModalImage ? (openBlock(), createBlock(_component_Button, {
          key: 1,
          class: "absolute top-2 right-2 p-0.5 bg-gray-500/50 text-light",
          link: "",
          onClick: doOpenModalImage
        }, {
          default: withCtx(() => [
            createVNode(IconLinkSquare01, { class: "size-6" })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1 = { class: "assetlist-card-image relative aspect-square flex flex-col et-jc-ic overflow-hidden" };
const _hoisted_2 = {
  key: 0,
  class: "relative w-full"
};
const _hoisted_3 = { class: "w-full rounded-lg overflow-hidden opacity-0" };
const _hoisted_4 = { class: "absolute bottom-0 left-0 w-5/6 rounded-lg overflow-hidden" };
const _hoisted_5 = { class: "absolute top-0 right-0 w-5/6 rounded-lg overflow-hidden" };
const _hoisted_6 = {
  key: 1,
  class: "w-full rounded-lg overflow-hidden"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AssetListCardImage",
  props: {
    assetDetailsList: { type: Array, required: true },
    mediaSize: { type: Number, required: false, default: MediaSize.LOW },
    isCollection: { type: Boolean, required: false, default: false },
    canOpenModalImage: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.isCollection && __props.assetDetailsList.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$1, {
              "asset-details": __props.assetDetailsList[0],
              "media-size": __props.mediaSize,
              canOpenModalImage: __props.canOpenModalImage
            }, null, 8, ["asset-details", "media-size", "canOpenModalImage"])
          ]),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_sfc_main$1, {
              "asset-details": __props.assetDetailsList[0],
              "media-size": __props.mediaSize,
              canOpenModalImage: __props.canOpenModalImage
            }, null, 8, ["asset-details", "media-size", "canOpenModalImage"])
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_sfc_main$1, {
              "asset-details": __props.assetDetailsList[1],
              "media-size": __props.mediaSize,
              canOpenModalImage: __props.canOpenModalImage
            }, null, 8, ["asset-details", "media-size", "canOpenModalImage"])
          ])
        ])) : __props.assetDetailsList.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createVNode(_sfc_main$1, {
            "asset-details": __props.assetDetailsList[0],
            "media-size": __props.mediaSize,
            canOpenModalImage: __props.canOpenModalImage
          }, null, 8, ["asset-details", "media-size", "canOpenModalImage"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { _sfc_main as _, _sfc_main$2 as a, _imports_0 as b, useAssetInfos as u };
