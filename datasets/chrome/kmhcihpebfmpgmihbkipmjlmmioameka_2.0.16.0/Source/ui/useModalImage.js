import { e as ref } from './index.js';

const _show = ref(false);
const _title = ref("");
const _imageURL = ref("");
const _scaleUp = ref(false);
const open = (url, title = "", scaleUp = false) => {
  _imageURL.value = url.value;
  _title.value = title;
  _show.value = true;
  _scaleUp.value = scaleUp;
};
const close = () => {
  _show.value = false;
};
const useModalImage = () => {
  return {
    showModalImage: _show,
    imageURL: _imageURL,
    title: _title,
    scaleUp: _scaleUp,
    openModalImage: open,
    closeModalImage: close
  };
};

export { useModalImage as u };
