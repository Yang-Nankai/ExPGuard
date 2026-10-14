import { D as computed } from './index.js';
import { u as useFormatter } from './useFormatter.js';

const {
  mapCryptoSymbol,
  mapAdaCurrency
} = useFormatter();
function useAdaSymbol() {
  const adaSymbol = computed(() => mapCryptoSymbol("ADA"));
  const adaCurrency = computed(() => mapAdaCurrency());
  return {
    adaSymbol,
    adaCurrency
  };
}

export { useAdaSymbol as u };
