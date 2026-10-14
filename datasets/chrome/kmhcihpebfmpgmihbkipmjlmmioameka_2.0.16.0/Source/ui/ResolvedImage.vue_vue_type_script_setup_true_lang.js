import { d as defineComponent, Y as toRefs, w as useTranslation, e as ref, D as computed, G as watch, c as createBlock, o as openBlock, z as resolveComponent, u as unref, y as withCtx, p as createBaseVNode, B as toDisplayString, m as createElementBlock, V as normalizeClass, t as createCommentVNode, n as createVNode, U as withModifiers } from './index.js';
import { u as useModalImage } from './useModalImage.js';
import { d5 as getDefaultErrorMessage } from './app2.js';

const _hoisted_1$1 = { class: "flex flex-col gap-0 rounded overflow-hidden" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PopoverError",
  props: {
    rootEl: { type: Object, required: false, default: void 0 },
    error: { type: String, required: false, default: "" },
    errorType: { type: String, required: false, default: "default" }
  },
  setup(__props) {
    const props = __props;
    const {
      rootEl,
      error,
      errorType
    } = toRefs(props);
    const $t = useTranslation().t;
    const poError = ref();
    const errorMessage = computed(() => {
      const message = error.value;
      if (!message) {
        return "";
      }
      if (errorType.value === "translate") {
        return $t(message);
      } else if (errorType.value === "default") {
        return getDefaultErrorMessage(message);
      }
      return message;
    });
    const hidePopover = () => {
      poError.value?.hide();
    };
    const showPopover = () => {
      if (!rootEl?.value || !poError.value) {
        return;
      }
      const _rootEl = rootEl?.value;
      poError.value?.show(
        {
          currentTarget: _rootEl
        },
        _rootEl
      );
    };
    watch(error, (newError) => {
      if (newError) {
        showPopover();
      } else {
        hidePopover();
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createBlock(_component_Popover, {
        ref_key: "poError",
        ref: poError,
        "append-to": unref(rootEl),
        pt: { root: "bg-bg-negative after:border-b-bg-negative" }
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, toDisplayString(errorMessage.value), 1)
        ]),
        _: 1
      }, 8, ["append-to"]);
    };
  }
});

const _hoisted_1 = ["src"];
const _hoisted_2 = {
  key: 1,
  class: "pi pi-spin pi-spinner"
};
const _hoisted_3 = {
  key: 2,
  class: "pi pi-exclamation-triangle text-txt-negative"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResolvedImage",
  props: {
    addressResolverSendMode: { type: Object, required: false },
    size: { type: String, required: false, default: "w-20" },
    title: { type: String, required: false, default: "" },
    image: { type: String, required: false },
    rounded: { type: String, required: false, default: "rounded-md" },
    inject: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const { openModalImage } = useModalImage();
    const _resolvedImage = ref(props.image ?? "");
    const _resolveImageError = ref("");
    const _resolveImageErrorType = ref("");
    const _isImageResolving = ref(false);
    watch(() => props.addressResolverSendMode, (arsm) => {
      if (arsm) {
        const { addressResolver } = arsm;
        const {
          resolvedImage,
          resolveImageError,
          resolveImageErrorType,
          isImageResolving
        } = addressResolver;
        _resolvedImage.value = resolvedImage.value;
        _resolveImageError.value = resolveImageError.value;
        _isImageResolving.value = isImageResolving.value;
        _resolveImageErrorType.value = resolveImageErrorType.value;
        watch(resolvedImage, (img) => {
          if (img) {
            _resolvedImage.value = img;
          }
        });
      }
    }, { immediate: true, deep: true });
    watch(() => props.image, (img) => {
      if (img) {
        _resolvedImage.value = img;
      }
    });
    const poRootEl = ref();
    const doScale = ref(false);
    const doOpenModalImage = () => {
      if (_resolvedImage.value) {
        openModalImage(_resolvedImage, props.title);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "poRootEl",
        ref: poRootEl,
        class: normalizeClass(["resolve-image-ada-handle shrink-0 relative aspect-square flex flex-col et-jc-ic", __props.size + " " + __props.rounded + " " + (_resolvedImage.value ? "p-0.5 border border-border-2" : _resolveImageError.value ? "rounded-2xl border border-border-negative opacity-50" : "rounded-2xl border border-border-2")])
      }, [
        _resolvedImage.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: normalizeClass(["w-full aspect-square origin-bottom sm:origin-bottom-left transition-all overflow-hidden", doScale.value ? "scale-[200%] cursor-zoom-out" : "cursor-zoom-in " + __props.rounded]),
          src: _resolvedImage.value,
          alt: "ADA Handle preview",
          onClick: withModifiers(doOpenModalImage, ["prevent", "stop"])
        }, null, 10, _hoisted_1)) : _isImageResolving.value ? (openBlock(), createElementBlock("i", _hoisted_2)) : _resolveImageError.value ? (openBlock(), createElementBlock("i", _hoisted_3)) : createCommentVNode("", true),
        createVNode(_sfc_main$1, {
          rootEl: poRootEl.value,
          error: _resolveImageError.value,
          errorType: _resolveImageErrorType.value
        }, null, 8, ["rootEl", "error", "errorType"])
      ], 2);
    };
  }
});

export { _sfc_main as _ };
