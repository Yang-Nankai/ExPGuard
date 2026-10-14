import { i as getEpochLength, j as getCalculatedEpochSlot } from './chain.js';
import { e as ref, D as computed, P as networkId, bc as watchEffect } from './index.js';
import { c as chainTip } from './chainTip.js';

const calcSlotInEpoch = computed(() => getCalculatedEpochSlot(networkId.value));
const calcSlotsInEpoch = computed(() => getEpochLength(networkId.value ?? "mainnet"));
const epochPercent = computed(() => calcSlotInEpoch.value / calcSlotsInEpoch.value);
const slotInEpoch = computed(() => {
  const _slotsInEpoch = chainTip.value.epochSlots.toString();
  let _slotInEpoch = chainTip.value.epochSlot.toString() ?? "0";
  while (_slotInEpoch.length < _slotsInEpoch.length) {
    _slotInEpoch = "0" + _slotInEpoch;
  }
  return _slotInEpoch;
});
const remainingTimeShort = ref("");
const remainingTimeFull = ref("");
function calculateRemainingTime(slotsRemaining) {
  const minutes = Math.floor(slotsRemaining / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let value = "";
  let valueFull = "";
  if (days > 0) {
    value += days + "d";
    valueFull += days + " days, ";
  }
  let tmpHours = hours % 24;
  value += " " + (tmpHours < 10 ? "0" + tmpHours : tmpHours) + ":";
  valueFull += " " + (tmpHours < 10 ? "0" + tmpHours : tmpHours) + " hours, ";
  let tmpMinutes = minutes % 60;
  value += (tmpMinutes < 10 ? "0" + tmpMinutes : tmpMinutes) + ":";
  valueFull += (tmpMinutes < 10 ? "0" + tmpMinutes : tmpMinutes) + " min";
  let tmpSeconds = slotsRemaining % 60;
  value += tmpSeconds < 10 ? "0" + tmpSeconds : tmpSeconds;
  if (days < 0 || hours < 0 || tmpMinutes < 0 || tmpSeconds < 0) {
    remainingTimeShort.value = "";
    return;
  }
  remainingTimeShort.value = " ~" + value;
  remainingTimeFull.value = valueFull;
}
watchEffect(() => {
  calculateRemainingTime(chainTip.value.epochSlots - chainTip.value.epochSlot);
});
const useChainProgress = () => {
  return {
    calcSlotInEpoch,
    calcSlotsInEpoch,
    epochPercent,
    slotInEpoch,
    remainingTimeShort,
    remainingTimeFull
  };
};

export { useChainProgress as u };
