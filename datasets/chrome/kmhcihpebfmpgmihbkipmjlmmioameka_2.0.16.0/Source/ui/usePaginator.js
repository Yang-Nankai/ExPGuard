import { e as ref, D as computed, G as watch } from './index.js';

const usePaginator = (itemList, numItemsPerPage = 10) => {
  const EMPTY_ARRAY = [];
  const _numItemsPerPage = ref(numItemsPerPage);
  const _itemList = computed(() => itemList.value ?? EMPTY_ARRAY);
  const numItems = computed(() => _itemList.value.length);
  const numPages = computed(() => Math.ceil(numItems.value / _numItemsPerPage.value));
  const lastPage = ref(0);
  const restoreLastPage = ref(false);
  const first = ref(0);
  const pageNo = ref(1);
  const page = computed(() => {
    const pageStart = (pageNo.value - 1) * _numItemsPerPage.value;
    return _itemList.value.slice(pageStart, pageStart + _numItemsPerPage.value);
  });
  const onPageStateUpdate = (state) => {
    setPage(state.page + 1);
  };
  const setPage = (no) => {
    first.value = 0;
    pageNo.value = no;
  };
  const setRestoreLastPage = (enable, pageToRestore = 1) => {
    restoreLastPage.value = enable;
    lastPage.value = pageToRestore;
  };
  watch([itemList, numItems], () => {
    if (!restoreLastPage.value) {
      setPage(1);
    } else {
      setPage(lastPage.value);
    }
  }, { immediate: true });
  return {
    numItemsPerPage: _numItemsPerPage,
    numItems,
    numPages,
    first,
    pageNo,
    page,
    setRestoreLastPage,
    itemList: _itemList,
    setPage,
    onPageStateUpdate
  };
};

export { usePaginator as u };
