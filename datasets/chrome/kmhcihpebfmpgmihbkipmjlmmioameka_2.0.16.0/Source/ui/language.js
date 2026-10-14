import { D as computed, c1 as getLanguageTag, c2 as getFormatTag, c3 as getTimezone, c4 as getUseUtc, c5 as setUseUtc$1, c6 as supportedTimezones, c7 as setTimezone, G as watch, E as languageTags, c8 as setLanguageTag, c9 as setI18NextLanguageTag, ca as setFormatTag, cb as defaultTimezone } from './index.js';

const _appLanguageTag = getLanguageTag("en-US");
const _appTimezone = getTimezone(defaultTimezone);
const _appUseUtc = getUseUtc();
const _appFormatTag = getFormatTag();
watch(_appLanguageTag, () => {
});
const appLanguageTag = computed(() => _appLanguageTag.value);
const appTimezone = computed(() => _appTimezone.value);
const appUseUtc = computed(() => _appUseUtc.value);
const appFormatTag = computed(() => _appFormatTag.value);
const setAppLanguageTag = (tag) => {
  setLanguageTag(tag);
  setI18NextLanguageTag(tag);
};
const setAppTimezone = (tz) => {
  if (supportedTimezones.includes(tz)) {
    setTimezone(tz);
  }
};
const setUseUtc = (useUtc) => {
  setUseUtc$1(useUtc);
};
const setAppFormatTag = (tag) => {
  setFormatTag(tag);
};
const appLanguage = computed(
  () => languageTags.find((item) => item.languageTag === appLanguageTag.value) ?? languageTags.find((item) => item.languageTag === "en-US")
);
const appFormatLanguage = computed(
  () => languageTags.find((item) => item.languageTag === appFormatTag.value) ?? languageTags.find((item) => item.languageTag === "en-US")
);

export { appLanguageTag as a, appTimezone as b, appFormatTag as c, appUseUtc as d, setAppTimezone as e, appLanguage as f, appFormatLanguage as g, setAppLanguageTag as h, setAppFormatTag as i, setUseUtc as s };
