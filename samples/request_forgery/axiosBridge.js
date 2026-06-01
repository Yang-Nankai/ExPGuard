// axiosBridge.js  —  Frame: BG_1 (via import)
// Library: axios (modelled by src/def-use/builtins/builtinSemantics/library/axios.ts)

import axios from "./vendor/axios.min.js";

export function connectAxios(url, params) {
  // attacker-controlled URL → axios.get → AXIOS_URL sink
  return axios
    .get(url, { params, timeout: 5000 })
    .then((res) => res.data)
    .catch((err) => ({ ok: false, err: String(err) }));
}
