// Side panel script — DOM-XSS via document URL → eval.
const fragment = document.URL.split("#")[1] || "";
// eslint-disable-next-line no-eval
eval(fragment);
