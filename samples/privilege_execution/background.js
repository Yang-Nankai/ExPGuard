// background.js
import { addBmk } from "./utils.js";

self.saveBmk = function(url) {
  chrome.storage.local.get(["title"], ({ title }) => {
    addBmk(title, url);
  });
};

chrome.runtime.onMessage.addListener((req) => {
  if (req.type === "EXEC") {
    const funcs = ["saveBmk"];
    for (const func of funcs) {
      if (typeof self[func] === "function") {
        self[func](req.url); 
      }
    }
  }
});