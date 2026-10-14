import './index.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';

const { pullCurrencyData } = useCurrencyAPI();
const init = async () => {
  await pullCurrencyData();
};
init();
