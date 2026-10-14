import { e as ref, D as computed, aE as addSignalListener, G as watch, aC as dispatchSignal } from './index.js';
import { a as appCurrency } from './currency2.js';
import { dh as doPostInitApp } from './app2.js';

const doLoadPriceOfDay = "doLoadPriceOfDay";
const onPriceOfDayUpdated = "onPriceOfDayUpdated";

const storeId = "priceOfDayStore";
const _priceOfDayData = ref(null);
const priceOfDayData = computed(() => _priceOfDayData.value);
const isLoadingPriceOfDay = ref(false);
const updatePriceOfDay = (priceOfDay) => {
  _priceOfDayData.value = priceOfDay;
  return dispatchSignal(onPriceOfDayUpdated);
};
const getPriceOfDay = (dateId) => {
  if (_priceOfDayData.value) {
    const entry = _priceOfDayData.value.data.find(
      (e) => e.d.year === dateId.year && e.d.month === dateId.month && e.d.day === dateId.day
    );
    return { pd: entry?.p ?? 0, unit: _priceOfDayData.value?.to };
  }
  return { pd: 0, unit: void 0 };
};
const load = async () => {
  await dispatchSignal(doLoadPriceOfDay);
};
addSignalListener(doPostInitApp, storeId, load);
watch([appCurrency], () => {
  load();
}, { immediate: true, deep: true });

export { doLoadPriceOfDay as d, getPriceOfDay as g, isLoadingPriceOfDay as i, priceOfDayData as p, updatePriceOfDay as u };
