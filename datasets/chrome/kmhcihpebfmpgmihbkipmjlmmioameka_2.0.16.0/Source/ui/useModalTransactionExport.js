import { d6 as createTxSearchConfig } from './app2.js';
import { D as computed, e as ref } from './index.js';

const config = ref(createTxSearchConfig());
const useTransactionSearchConfig = () => {
  const hasSlotStartFilter = computed(() => !!config.value.slotStart && config.value.slotStart > 0);
  const hasSlotEndFilter = computed(() => !!config.value.slotEnd && config.value.slotEnd > 0);
  const hasCoinLowFilter = computed(() => !!config.value.coinLow && config.value.coinLow > 0);
  const hasCoinHighFilter = computed(() => !!config.value.coinHigh && config.value.coinHigh > 0);
  const hasSearchStrFilter = computed(() => !!config.value.searchStr && config.value.searchStr.length > 0);
  const hasSearchStrListFilter = computed(() => config.value.searchStrList.length > 0);
  const hasActiveFilter = computed(() => hasSlotStartFilter.value || hasSlotEndFilter.value || hasCoinLowFilter.value || hasCoinHighFilter.value || hasSearchStrFilter.value || hasSearchStrListFilter.value);
  return {
    createTxSearchConfig,
    hasSlotStartFilter,
    hasSlotEndFilter,
    hasCoinLowFilter,
    hasCoinHighFilter,
    hasSearchStrFilter,
    hasSearchStrListFilter,
    hasActiveFilter,
    config
  };
};

const _show = ref(false);
const openModalTransactionExport = () => {
  _show.value = true;
};
const closeModalTransactionExport = () => {
  _show.value = false;
};
const useModalTransactionExport = () => {
  return {
    showModalTransactionExport: _show,
    openModalTransactionExport,
    closeModalTransactionExport
  };
};

export { useModalTransactionExport as a, useTransactionSearchConfig as u };
